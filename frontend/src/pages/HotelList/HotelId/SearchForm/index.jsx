import Mybutton from '@components/MyButton'
import { currentHotelClientSelector } from '@pages/HotelList/hotelclient.slice'
import moment from 'moment'
import queryString from 'query-string'
import React, {
    forwardRef,
    useEffect,
    useMemo,
    useState
} from 'react'
import ReactDatePicker from 'react-datepicker'
import { AiFillStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDateString } from '@utils/getDateString'
import { getRoomAvailable } from '@pages/HotelList/hotelclient.slice'

function SearchForm() {
    const hotelId = useParams().id
    const dispatch = useDispatch()
    const location = useLocation()

    const currentHotel = useSelector(currentHotelClientSelector)
    const navigate = useNavigate()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            checkIn:
                params.checkIn || getDateString(new Date(moment())),
            checkOut:
                params.checkOut ||
                getDateString(new Date(moment().add(1, 'days'))),
            hotelId: currentHotel.id
        }
    }, [location.search, currentHotel])
    const [checkIn, setCheckIn] = useState(() => new Date(queryParams.checkIn))
    const [checkOut, setCheckOut] = useState(
        new Date(queryParams.checkOut)
    )
    const ExampleCustomCheckIn = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex-1 flex gap-3 items-center cursor-pointer justify-center  border-r border-gray-400 p-4"
                onClick={onClick}
            >
                <div className="flex flex-col">
                    <span className="font-medium text-md">
                        Ngày nhận phòng
                    </span>
                    <span className="text-gray-400 text-sm" ref={ref}>
                        {value || 'Thêm ngày'}
                    </span>
                </div>
            </div>
        )
    )
    const ExampleCustomCheckOut = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex-1 flex gap-3 items-center cursor-pointer justify-center p-4"
                onClick={onClick}
            >
                <div className="flex flex-col">
                    <span className="font-medium text-md">
                        Ngày trả phòng
                    </span>
                    <span className="text-gray-400 text-sm" ref={ref}>
                        {value || 'Thêm ngày'}
                    </span>
                </div>
            </div>
        )
    )
    const handleCheckAvailability = () => {
        const filters = {
            ...queryParams,
            checkIn: getDateString(checkIn),
            checkOut: getDateString(checkOut)
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    useEffect(() => {
        navigate(`?${queryString.stringify(queryParams)}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        dispatch(
            getRoomAvailable({
                id: hotelId,
                ...queryParams
            })
        )
    }, [queryParams, hotelId, dispatch])
    return (
        <div className="lg:mt-2">
            <div className=" border-gray-100 shadow-md border-1 lg:w-[30vw] w-full h-[40vh] border-[1px] px-5 py-10 rounded-2xl">
                <div className="px-4 pb-4 flex justify-between items-center">
                    <div className="mt-4">
                        <span className="font-normal text-gray-400">
                            Giá chỉ từ:
                        </span>
                        <span className="font-bold text-xl">
                            ${currentHotel.cheapestPrice}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className=" text-yellow-400 flex gap-1">
                            <span>
                                <AiFillStar />
                            </span>
                        </div>
                        <span className="font-normal text-gray-400">
                            {currentHotel.rating}{' '}
                        </span>
                        <span className="font-normal text-gray-400">
                            ({currentHotel.totalRating} Đánh giá)
                        </span>
                    </div>
                </div>
                <div className="border border-gray-300 rounded-2xl w-full">
                    <div className="border-b border-gray-300 w-full flex justify-between items-center">
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={checkIn}
                            onChange={date => setCheckIn(date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            customInput={<ExampleCustomCheckIn />}
                        />
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={checkOut}
                            onChange={date => setCheckOut(date)}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn}
                            customInput={<ExampleCustomCheckOut />}
                        />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <Mybutton
                        className=" bg-blue-500 text-white active:bg-blue-800 text-base font-semibold px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                        onClick={handleCheckAvailability}
                    >
                        Kiểm tra phòng trống
                    </Mybutton>
                </div>
            </div>
        </div>
    )
}

export default SearchForm
