import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import itineraryApi from '@api/itineraryApi'
import { payloadCreator } from '@utils/helper'
export const createItinerary = createAsyncThunk(
    'itineraries/createItinerary',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await itineraryApi.create(payload, {
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
export const updateItinerary = createAsyncThunk(
    'itineraries/updateItinerary',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await itineraryApi.update(payload, {
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
export const deleteItinerary = createAsyncThunk(
    'itineraries/deleteItinerary',
    payloadCreator(itineraryApi.delete)
)
const itinerarySlice = createSlice({
    name: 'itineraries',
    initialState: {
        currentItinerary: {},
        loading: 0,
        pagination: {}
    },
    reducers: {
        setCurrentItinerary(state, action) {
            state.currentItinerary = action.payload
        }
    },
    extraReducers: builder => {
        builder
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
export const currentItinerarySelector = state =>
    state.itineraries.currentItinerary
export const loadingItinerarySelector = state =>
    state.itineraries.loading
const { actions, reducer } = itinerarySlice
export default reducer
export const { setCurrentItinerary } = actions
