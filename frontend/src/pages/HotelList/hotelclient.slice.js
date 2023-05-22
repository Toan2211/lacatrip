import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import hotelApi from '@api/hotelApi'
import { payloadCreator } from '@utils/helper'
export const getHotelsClient = createAsyncThunk(
    'hotelClients/getAllHotel',
    payloadCreator(hotelApi.getHotels)
)
export const getHotelsClientLoadMore = createAsyncThunk(
    'hotelClients/getAllHotelLoadMore',
    payloadCreator(hotelApi.getHotels)
)
export const getDeailHotelClient = createAsyncThunk(
    'hotelClients/getDetailHotel',
    payloadCreator(hotelApi.getDetail)
)
const getHotelsFulfilled = (state, action) => {
    const { hotels, pagination } = action.payload.data
    state.hotels = hotels
    state.pagination = pagination
}
const getHotelsLoadMore = (state, action) => {
    const { hotels, pagination } = action.payload.data
    state.hotels = [...state.hotels, ...hotels]
    state.pagination = pagination
}
const getHotelByIdFulfilled = (state, action) => {
    state.currentHotel = action.payload.data
}
const hotelClientSlice = createSlice({
    name: 'hotelClients',
    initialState: {
        hotels: [],
        currentHotel: {},
        loading: 0,
        pagination: {}
    },
    reducers: {
        setCurrentHotel(state, action) {
            state.currentHotel = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getHotelsClient.fulfilled, getHotelsFulfilled)
            .addCase(getDeailHotelClient.fulfilled, getHotelByIdFulfilled)
            .addCase(getHotelsClientLoadMore.fulfilled, getHotelsLoadMore)
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
export const currentHotelClientSelector = state => state.hotelClients.currentHotel
export const hotelsClientSelector = state => state.hotelClients.hotels
export const loadingHotelClient = state => state.hotelClients.loading
export const paginationHotelClient = state => state.hotelClients.pagination
const { actions, reducer } = hotelClientSlice
export default reducer
export const { setCurrentHotel } = actions
