import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import bookingHotelApi from '@api/bookingHotel'
import { payloadCreator } from '@utils/helper'

export const createBookingHotel = createAsyncThunk(
    'bookingHotelClients/createBooking',
    payloadCreator(bookingHotelApi.create)
)
export const getAllBookingHotelMe = createAsyncThunk(
    'bookingHotelClients/getAllBookingHotelMe',
    payloadCreator(bookingHotelApi.getAllByMe)
)
const getAllBookingHotelMeFullfilled = (state, action) => {
    const { bookingHotels, pagination } = action.payload.data
    state.bookings = bookingHotels
    state.pagination = pagination
}
const bookingHotelClientSlice = createSlice({
    name: 'bookingHotelClients',
    initialState: {
        bookings: [],
        loading: 0,
        pagination: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllBookingHotelMe.fulfilled, getAllBookingHotelMeFullfilled)
    }
})
export const bookingHotelListSelector = state => state.bookingHotelClients.bookings
export const bookingHotelListPaginationSelector = state => state.bookingHotelClients.pagination
export const bookingHotelLoadingSelector = state => state.bookingHotelClients.loading
const { actions, reducer } = bookingHotelClientSlice
export default reducer
