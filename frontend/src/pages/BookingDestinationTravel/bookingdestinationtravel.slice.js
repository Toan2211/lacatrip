import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import bookingDestinationTravelApi from '@api/bookingDestinationTravel'

export const createBookingDestinationTravel = createAsyncThunk(
    'bookingDestinationTravelClients/createBooking',
    payloadCreator(bookingDestinationTravelApi.create)
)
export const getAllBookingDestinationTravelMe = createAsyncThunk(
    'bookingDestinationTravelClients/getAllBookingDestinationTravelMe',
    payloadCreator(bookingDestinationTravelApi.getAllByMe)
)
const getAllBookingDestinationTravelMeFullfilled = (state, action) => {
    const { bookingDestinationTravels, pagination } =
        action.payload.data
    state.bookings = bookingDestinationTravels
    state.pagination = pagination
}
const bookingDestinationTravelSlice = createSlice({
    name: 'bookingDestinationTravelClients',
    initialState: {
        bookings: [],
        loading: 0,
        pagination: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            getAllBookingDestinationTravelMe.fulfilled,
            getAllBookingDestinationTravelMeFullfilled
        )
    }
})
export const bookingDestinationTravelListSelector = state =>
    state.bookingDestinationTravelClients.bookings
export const bookingDestinationTravelListPaginationSelector = state =>
    state.bookingDestinationTravelClients.pagination
export const bookingDestinationTravelLoadingSelector = state =>
    state.bookingDestinationTravelClients.loading
const { reducer } = bookingDestinationTravelSlice
export default reducer
