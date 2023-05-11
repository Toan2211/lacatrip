import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import restaurantApi from '@api/restaurantApi'
import { payloadCreator } from '@utils/helper'
export const getRestaurants = createAsyncThunk(
    'restaurants/getAll',
    payloadCreator(restaurantApi.getAll)
)
export const createRestaurant = createAsyncThunk(
    'restaurants/createRestaurant',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await restaurantApi.create(payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const updateRestaurant = createAsyncThunk(
    'restaurants/updateRestaurant',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await restaurantApi.update(payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const togglePublic = createAsyncThunk(
    'restaurants/togglePublic',
    payloadCreator(restaurantApi.togglePublic)
)
export const getRestaurantDetail = createAsyncThunk(
    'restaurants/getDetailHotel',
    payloadCreator(restaurantApi.getDetail)
)
const getRestaurantFulfilled = (state, action) => {
    const { restaurants, pagination } = action.payload.data
    state.restaurants = restaurants
    state.pagination = pagination
}
const getRestaurantDetailFulfilled = (state, action) => {
    state.currentRestaurant = action.payload.data
}
const togglePublicFulfilled = (state, action) => {
    const rs = state.restaurants.find(rs => rs.id === action.payload.data.id)
    rs.public = !rs.public
}
const restaurantSlice = createSlice({
    name: 'restaurants',
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
            .addCase(getRestaurants.fulfilled, getRestaurantFulfilled)
            .addCase(getRestaurantDetail.fulfilled, getRestaurantDetailFulfilled)
            .addCase(togglePublic.fulfilled, togglePublicFulfilled)
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
export const currentRestauRantSelector = state =>
    state.restaurants.currentRestaurant
export const restaurantsSelector = state =>
    state.restaurants.restaurants
export const loadingRestaurant = state => state.restaurants.loading
export const paginationRestaurant = state =>
    state.restaurants.pagination
const { actions, reducer } = restaurantSlice
export default reducer
export const { setCurrentRestaurant } = actions
