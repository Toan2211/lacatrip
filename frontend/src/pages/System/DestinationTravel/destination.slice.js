import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import destinationApi from '@api/destinationApi'
export const getDestinations = createAsyncThunk(
    'destinations/getAll',
    payloadCreator(destinationApi.getAll)
)
export const createDestination = createAsyncThunk(
    'destinations/createDestination',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await destinationApi.create(payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const updateDestination = createAsyncThunk(
    'destinations/updateDestination',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await destinationApi.update(payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const togglePublic = createAsyncThunk(
    'destinations/togglePublic',
    payloadCreator(destinationApi.togglePublic)
)
export const getDetail = createAsyncThunk(
    'destinations/getDetai',
    payloadCreator(destinationApi.getDetail)
)
const togglePublicFulfilled = (state, action) => {
    const destination = state.destinations.find(
        destination => destination.id === action.payload.data.id
    )
    destination.public = !destination.public
}
const getAllFulfilled = (state, action) => {
    const { destinationTravels, pagination } = action.payload.data
    state.destinations = destinationTravels
    state.pagination = pagination
}
const getDetailFulfilled = (state, action) => {
    state.currentDestination = action.payload.data
}
const destinationSlice = createSlice({
    name: 'destinations',
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
            .addCase(getDetail.fulfilled, getDetailFulfilled)
            .addCase(togglePublic.fulfilled, togglePublicFulfilled)
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
export const currentDestinationSelector = state =>
    state.destinations.currentDestination
export const destinationsSelector = state =>
    state.destinations.destinations
export const loadingDestinationSelector = state =>
    state.destinations.loading
export const paginationDestinationSelector = state =>
    state.destinations.pagination
const { actions, reducer } = destinationSlice
export default reducer
export const { setCurrentDestination } = actions
