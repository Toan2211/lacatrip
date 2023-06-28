import HotelCard from '@components/HotelCard'
import {
    getHotelsClient,
    hotelsClientSelector
} from '@pages/HotelList/hotelclient.slice'
import Mybutton from '@components/MyButton'
import { loadingHotelClient } from '@pages/HotelList/hotelclient.slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelsClientLoadMore } from '@pages/HotelList/hotelclient.slice'
import { paginationHotelClient } from '@pages/HotelList/hotelclient.slice'
import RecommendSkeletonCard from '@components/RecommendSkeletonCard'

function RecommendHotel() {
    const dispatch = useDispatch()
    const hotels = useSelector(hotelsClientSelector)
    const loading = useSelector(loadingHotelClient)
    const pagination = useSelector(paginationHotelClient)
    useEffect(() => {
        dispatch(getHotelsClient({ limit: 8 }))
    }, [dispatch])
    const handleLoadMoreClick = () => {
        if (pagination.page < pagination.totalPages)
            dispatch(
                getHotelsClientLoadMore({
                    limit: 8,
                    page: pagination.page + 1
                })
            )
    }
    return (
        <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                {hotels &&
                    hotels.map((hotel, index) => (
                        <HotelCard key={index} data={hotel} />
                    ))}
                {
                    !!loading && Array.from(Array(8).keys()).map(index => <RecommendSkeletonCard key={index}/>)
                }
            </div>
            {pagination.page < pagination.totalPages && (
                <div className="text-center mt-4">
                    <Mybutton
                        className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-2 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/5 ease-linear transition-all duration-150"
                        isloading={+loading}
                        onClick={handleLoadMoreClick}
                    >
                        Xem thêm
                    </Mybutton>
                </div>
            )}
        </>
    )
}

export default RecommendHotel
