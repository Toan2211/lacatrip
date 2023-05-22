import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import restaurantApi from '@api/restaurantApi'
import { payloadCreator } from '@utils/helper'
export const getRestaurantsClient = createAsyncThunk(
    'restaurantsClient/getAll',
    payloadCreator(restaurantApi.getAll)
)
export const getRestaurantsClientLoadMore = createAsyncThunk(
    'restaurantsClient/getAllLoadMore',
    payloadCreator(restaurantApi.getAll)
)
export const getRestaurantDetailClient = createAsyncThunk(
    'restaurantsClient/getDetailHotel',
    payloadCreator(restaurantApi.getDetail)
)
const getRestaurantFulfilled = (state, action) => {
    const { restaurants, pagination } = action.payload.data
    state.restaurants = restaurants
    state.pagination = pagination
}
const getRestaurantLoadMoreFulfilled = (state, action) => {
    const { restaurants, pagination } = action.payload.data
    state.restaurants = [...state.restaurants, ...restaurants]
    state.pagination = pagination
}
const getRestaurantDetailFulfilled = (state, action) => {
    state.currentRestaurant = action.payload.data
}
const restaurantClientSlice = createSlice({
    name: 'restaurantsClient',
    initialState: {
        restaurants: [],
        currentRestaurant: {},
        loading: 0,
        pagination: {}
    },
    reducers: {
        setCurrentRestaurant(state, action) {
            state.currentRestaurant = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getRestaurantsClient.fulfilled, getRestaurantFulfilled)
            .addCase(getRestaurantDetailClient.fulfilled, getRestaurantDetailFulfilled)
            .addCase(getRestaurantsClientLoadMore.fulfilled, getRestaurantLoadMoreFulfilled)
            .addMatcher(
                action => action.type.endsWith('/pending'),
                state => {
                    state.loading = state.loading + 1
                }
            )
            .addMatcher(
                action =>
                    action.type.endsWith('/fulfilled') ||
                    action.type.endsWith('/rejected'),
                state => {
                    state.loading = state.loading - 1
                }
            )
    }
})
export const currentRestauRantClientSelector = state =>
    state.restaurantsClient.currentRestaurant
export const restaurantsClientSelector = state =>
    state.restaurantsClient.restaurants
export const loadingRestaurantClientSelector = state => state.restaurantsClient.loading
export const paginationRestaurantClientSelector = state =>
    state.restaurantsClient.pagination
const { actions, reducer } = restaurantClientSlice
export default reducer
export const { setCurrentRestaurant } = actions
