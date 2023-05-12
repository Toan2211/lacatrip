import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import corpTourApi from '@api/corpTourApi'
export const getCorpTours = createAsyncThunk(
    'corpTours/getAllcorpTours',
    payloadCreator(corpTourApi.getAll)
)
export const getDetailCorpTour = createAsyncThunk(
    'corpTours/getDetail',
    payloadCreator(corpTourApi.getDetail)
)
export const createCorpTour = createAsyncThunk(
    'corpTours/create',
    payloadCreator(corpTourApi.create)
)
export const updateCorpTour = createAsyncThunk(
    'corpTours/update',
    payloadCreator(corpTourApi.update)
)
const getAllFulfilled = (state, action) => {
    const { corpTours, pagination } = action.payload.data
    state.corpTours = corpTours
    state.pagination = pagination
}
const getDetailFulfilled = (state, action) => {
    state.currentCorpTour = action.payload.data
}
const corpTourSlice = createSlice({
    name: 'corpTours',
    initialState: {
        corpTours: [],
        currentCorpTour: {},
        loading: 0,
        pagination: {}
    },
    reducers: {
        setCurrentCorpTour(state, action) {
            state.currentCorpTour = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCorpTours.fulfilled, getAllFulfilled)
            .addCase(getDetailCorpTour.fulfilled, getDetailFulfilled)
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
export const currentCorpTourSelector = state => state.corpTours.currentCorpTour
export const corpToursSelector = state => state.corpTours.corpTours
export const loadingCorpTourSelector = state => state.corpTours.loading
export const paginationCorpTourSelector = state => state.corpTours.pagination
const { actions, reducer } = corpTourSlice
export default reducer
export const { setCurrentCorpTour } = actions
