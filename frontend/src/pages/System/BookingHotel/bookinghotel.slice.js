import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import bookingHotelApi from '@api/bookingHotel'
import { payloadCreator } from '@utils/helper'

export const getAllBooking = createAsyncThunk(
    'bookingHotels/getAllBooking',
    payloadCreator(bookingHotelApi.getAll)
)

const getAllBookingHotelFullfilled = (state, action) => {
    const { bookingHotels, pagination } = action.payload.data
    state.bookings = bookingHotels
    state.pagination = pagination
}
const bookingHotelSlice = createSlice({
    name: 'bookingHotels',
    initialState: {
        bookings: [],
        loading: 0,
        pagination: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            getAllBooking.fulfilled,
            getAllBookingHotelFullfilled
        )
    }
})
export const bookingHotelListSelector = state =>
    state.bookingHotels.bookings
export const bookingHotelListPaginationSelector = state =>
    state.bookingHotels.pagination
export const bookingHotelLoadingSelector = state =>
    state.bookingHotels.loading
const { reducer } = bookingHotelSlice
export default reducer
