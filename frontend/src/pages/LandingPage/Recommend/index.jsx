import {
    destinationsClientSelector,
    getDestinationClient,
    getDetailDestination
} from '@pages/DestinationTravelList/destinationclient.slice'
import { setCurrentDestinationClient } from '@pages/DestinationTravelList/destinationclient.slice'
import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
const RecommendItem = () => {
    return (
        <div className=" overflow-hidden rounded-2xl bg-white shadow-md">
            <div>
                <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/feature-19-450x300.png" />
            </div>
            <div className="p-4">
                <div className=" text-yellow-400 flex gap-1">
                    <span>
                        <AiFillStar />
                    </span>
                    <span>
                        <AiFillStar />
                    </span>
                    <span>
                        <AiFillStar />
                    </span>
                    <span>
                        <AiFillStar />
                    </span>
                    <span>
                        <AiFillStar />
                    </span>
                </div>
                <div className="flex flex-col  border-b-2 border-b-slate-100 pb-2">
                    <span className="font-semibold">
                        Redac Gateway HotelRedac Gateway Hotel
                    </span>
                    <span className="font-medium text-gray-400">
                        Los Angeles
                    </span>
                </div>
            </div>
            <div className="px-4 pb-4">
                <span>
                    <span className="text-blue-800 bg-blue-100 border-[1px] border-blue-400 font-medium rounded-md text-md p-1 mr-4">
                        {' '}
                        5 / 5
                    </span>
                    <span className="font-normal text-gray-400">
                        3 Reviews
                    </span>
                </span>
                <div className="mt-4">
                    <span className="font-normal text-gray-400">
                        From:{' '}
                    </span>
                    <span className="font-bold">$150.0</span>
                </div>
            </div>
        </div>
    )
}
// 0 hotel 1 restaurant 2 destination travel
function Recommend() {
    const dispatch = useDispatch()
    const destinations = useSelector(destinationsClientSelector)
    const [typeFlag, setTypeFlag] = useState(0)

    useEffect(() => {
        const getAllData = async () => {
            await dispatch(getDestinationClient())
        }
        dispatch(
            getDetailDestination(
                '9aa3ec54-a287-4c77-8333-c24fcfe9a1d4'
            )
        )
        dispatch(setCurrentDestinationClient('kaka'))
        getAllData()
    }, [dispatch, destinations])
    console.log(destinations)
    return (
        <section className="max-w-[1535px] px-8 py-5 mt-[26vh] md:mt-40 md:px-10 lg:mt-16 lg:px-20 bg-slate-50 mb-[20vh] pb-[100px]">
            <header className="text-center font-semibold text-3xl mb-5">
                Recommend For You
            </header>
            <div className="flex gap-3 justify-center font-semibold mb-10">
                <button
                    onClick={() => setTypeFlag(0)}
                    className={`${
                        typeFlag === 0
                            ? 'bg-blue-500 text-white '
                            : 'bg-white'
                    } border-gray-300 border  p-2 rounded-md`}
                >
                    Hotel
                </button>
                <button
                    onClick={() => setTypeFlag(1)}
                    className={`${
                        typeFlag === 1
                            ? 'bg-blue-500 text-white '
                            : 'bg-white'
                    } border-gray-300 border  p-2 rounded-md`}
                >
                    Restaurant
                </button>
                <button
                    onClick={() => setTypeFlag(2)}
                    className={`${
                        typeFlag === 2
                            ? 'bg-blue-500 text-white '
                            : 'bg-white'
                    } border-gray-300 border  p-2 rounded-md`}
                >
                    Activity
                </button>
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                <RecommendItem />
                <RecommendItem />
                <RecommendItem />
                <RecommendItem />
                <RecommendItem />
                <RecommendItem />
                <RecommendItem />
                <RecommendItem />
            </div>
        </section>
    )
}

export default Recommend
