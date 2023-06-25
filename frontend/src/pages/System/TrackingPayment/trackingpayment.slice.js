import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import trackingPaymentApi from '@api/trackingPaymentApi'

export const getAllTrackingPayment = createAsyncThunk(
    'trackingPayments/getAllTrackingPayment',
    payloadCreator(trackingPaymentApi.getAll)
)

const getAllTrackingPaymentFulfilled = (state, action) => {
    const { trackingPayments, pagination } = action.payload.data
    state.trackingPayments = trackingPayments
    state.pagination = pagination
}

const revenueSlice = createSlice({
    name: 'trackingPayments',
    initialState: {
        trackingPayments: [],
        loading: 0,
        pagination: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            getAllTrackingPayment.fulfilled,
            getAllTrackingPaymentFulfilled
        )
    }
})
export const trackingPaymentListSelector = state =>
    state.trackingPayments.trackingPayments
export const trackingPaymentPaginationSelector = state =>
    state.trackingPayments.trackingPayments
const { reducer } = revenueSlice
export default reducer
