import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import destinationApi from '@api/destinationApi'
export const getDestinations = createAsyncThunk(
    'destinationClients/getAll',
    payloadCreator(destinationApi.getAll)
)
export const getDestinationsLoadMore = createAsyncThunk(
    'destinationClients/getAllLoadMore',
    payloadCreator(destinationApi.getAll)
)
export const getDetailDestination = createAsyncThunk(
    'destinationClients/getDetai',
    payloadCreator(destinationApi.getDetail)
)
const getAllFulfilled = (state, action) => {
    const { destinationTravels, pagination } = action.payload.data
    state.destinations = destinationTravels
    state.pagination = pagination
}
const getAllLoadMoreFulfilled = (state, action) => {
    const { destinationTravels, pagination } = action.payload.data
    state.destinations = [...state.destinations, ...destinationTravels]
    state.pagination = pagination
}
const getDetailFulfilled = (state, action) => {
    state.currentDestination = action.payload.data
}
const destinationClientSlice = createSlice({
    name: 'destinationClients',
    initialState: {
        destinations: [],
        currentDestination: {},
        loading: 0,
        pagination: {}
    },
    reducers: {
        setCurrentDestination(state, action) {
            state.currentDestination = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getDestinations.fulfilled, getAllFulfilled)
            .addCase(getDetailDestination.fulfilled, getDetailFulfilled)
            .addCase(getDestinationsLoadMore.fulfilled, getAllLoadMoreFulfilled)
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
export const currentDestinationClientSelector = state =>
    state.destinationClients.currentDestination
export const destinationsClientSelector = state =>
    state.destinationClients.destinations
export const loadingDestinationClientSelector = state =>
    state.destinationClients.loading
export const paginationDestinationClientSelector = state =>
    state.destinationClients.pagination
const { actions, reducer } = destinationClientSlice
export default reducer
export const { setCurrentDestination } = actions
