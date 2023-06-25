import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import revenueApi from '@api/revenueApi'
import { payloadCreator } from '@utils/helper'

export const getAllRevenue = createAsyncThunk(
    'revenues/getAllRevenue',
    payloadCreator(revenueApi.getAll)
)

const getAllRevenueFulfilled = (state, action) => {
    state.revenues = action.payload.data
}

const revenueSlice = createSlice({
    name: 'revenues',
    initialState: {
        revenues: [],
        loading: 0,
        pagination: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            getAllRevenue.fulfilled,
            getAllRevenueFulfilled
        )
    }
})
export const revenuesSelector = state => state.revenues.revenues
const { actions, reducer } = revenueSlice
export default reducer
