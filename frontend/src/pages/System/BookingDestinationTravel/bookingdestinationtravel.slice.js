import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import bookingDestinationTravelApi from '@api/bookingDestinationTravel'

export const getAllBooking = createAsyncThunk(
    'bookingDestinationTravels/getAllBooking',
    payloadCreator(bookingDestinationTravelApi.getAll)
)

const getAllBookingFullfilled = (state, action) => {
    const { bookingDestinationTravels, pagination } = action.payload.data
    state.bookings = bookingDestinationTravels
    state.pagination = pagination
}
const bookingDestinationTravelSlice = createSlice({
    name: 'bookingDestinationTravels',
    initialState: {
        bookings: [],
        loading: 0,
        pagination: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            getAllBooking.fulfilled,
            getAllBookingFullfilled
        )
    }
})
export const bookingDestinationTravelListSelector = state =>
    state.bookingDestinationTravels.bookings
export const bookingDestinationTravelListPaginationSelector = state =>
    state.bookingDestinationTravels.pagination
export const bookingDestinationTravelLoadingSelector = state =>
    state.bookingDestinationTravels.loading
const { reducer } = bookingDestinationTravelSlice
export default reducer
