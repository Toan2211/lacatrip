import Mybutton from '@components/MyButton'
import {
    destinationsClientSelector,
    getDestinationsLoadMore,
    loadingDestinationClientSelector,
    paginationDestinationClientSelector
} from '@pages/DestinationTravelList/destinationclient.slice'
import DestinationCard from '@components/DestinationCard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDestinations } from '@pages/DestinationTravelList/destinationclient.slice'
import RecommendSkeletonCard from '@components/RecommendSkeletonCard'
import { useTranslation } from 'react-i18next'

function RecommendDestination() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const destinations = useSelector(destinationsClientSelector)
    const loading = useSelector(loadingDestinationClientSelector)
    const pagination = useSelector(
        paginationDestinationClientSelector
    )
    useEffect(() => {
        dispatch(getDestinations({ limit: 8 }))
    }, [dispatch])
    const handleLoadMoreClick = () => {
        if (pagination.page < pagination.totalPages)
            dispatch(
                getDestinationsLoadMore({
                    limit: 8,
                    page: pagination.page + 1
                })
            )
    }
    return (
        <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                {destinations &&
                    destinations.map(destination => (
                        <DestinationCard
                            key={destination.id}
                            data={destination}
                        />
                    ))}
                {!!loading &&
                    Array.from(Array(8).keys()).map(index => (
                        <RecommendSkeletonCard key={index} />
                    ))}
            </div>
            {pagination.page < pagination.totalPages && (
                <div className="text-center mt-4">
                    <Mybutton
                        className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-2 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/5 ease-linear transition-all duration-150"
                        isloading={+loading}
                        onClick={handleLoadMoreClick}
                    >
                        {t('loadMore')}
                    </Mybutton>
                </div>
            )}
        </>
    )
}

export default RecommendDestination
