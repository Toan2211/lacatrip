import Mybutton from '@components/MyButton'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadingRestaurantClientSelector, paginationRestaurantClientSelector, restaurantsClientSelector, getRestaurantsClient } from '@pages/RestaurantList/restaurantclient.slice'
import { getRestaurantsClientLoadMore } from '@pages/RestaurantList/restaurantclient.slice'
import RestaurantCard from '@components/RestaurantCard'
import RecommendSkeletonCard from '@components/RecommendSkeletonCard'

function RecommendRestaurant() {
    const dispatch = useDispatch()
    const restaurants = useSelector(restaurantsClientSelector)
    const loading = useSelector(loadingRestaurantClientSelector)
    const pagination = useSelector(paginationRestaurantClientSelector)
    useEffect(() => {
        dispatch(getRestaurantsClient({ limit: 8 }))
    }, [dispatch])
    const handleLoadMoreClick = () => {
        if (pagination.page < pagination.totalPages)
            dispatch(
                getRestaurantsClientLoadMore({
                    limit: 8,
                    page: pagination.page + 1
                })
            )
    }
    return (
        <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                {restaurants &&
                    restaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} data={restaurant} />
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

export default RecommendRestaurant
