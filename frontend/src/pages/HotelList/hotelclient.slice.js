import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import hotelApi from '@api/hotelApi'
import { payloadCreator } from '@utils/helper'
import roomApi from '@api/roomApi'
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
export const getRoomAvailable = createAsyncThunk(
    'hotelClients/getRoomAvailable',
    payloadCreator(hotelApi.getRoomAvailable)
)
export const getRoomClient = createAsyncThunk(
    'hotelClients/getRoomClient',
    payloadCreator(roomApi.getDetail)
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
const getRoomClientFulfilled = (state, action) => {
    state.currentRoom = action.payload.data
}
const getRoomAvailableFulfilled = (state, action) => {
    state.roomAvailable = action.payload.data
}
const hotelClientSlice = createSlice({
    name: 'hotelClients',
    initialState: {
        hotels: [],
        currentHotel: {},
        currentRoom: {},
        roomAvailable: [],
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
            .addCase(getRoomClient.fulfilled, getRoomClientFulfilled)
            .addCase(getHotelsClient.fulfilled, getHotelsFulfilled)
            .addCase(
                getDeailHotelClient.fulfilled,
                getHotelByIdFulfilled
            )
            .addCase(
                getHotelsClientLoadMore.fulfilled,
                getHotelsLoadMore
            )
            .addCase(
                getRoomAvailable.fulfilled,
                getRoomAvailableFulfilled
            )
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
export const currentRoomClientSelector = state =>
    state.hotelClients.currentRoom
export const currentHotelClientSelector = state =>
    state.hotelClients.currentHotel
export const hotelsClientSelector = state => state.hotelClients.hotels
export const loadingHotelClient = state => state.hotelClients.loading
export const paginationHotelClient = state =>
    state.hotelClients.pagination
export const getRoomAvailableSelector = state =>
    state.hotelClients.roomAvailable
const { actions, reducer } = hotelClientSlice
export default reducer
export const { setCurrentHotel } = actions
