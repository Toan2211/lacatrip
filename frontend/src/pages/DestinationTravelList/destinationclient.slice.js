import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import destinationApi from '@api/destinationApi'
import { payloadCreator } from '@utils/helper'
export const getDestinationClient = createAsyncThunk(
    'destinationClients/getAll',
    payloadCreator(destinationApi.getAll)
)
export const getDetailDestination = createAsyncThunk(
    'destinationClients/getDetail',
    payloadCreator(destinationApi.getDetail)
)
const getAllFulfilled = (state, action) => {
    console.log('helppppppppppppppppppp')
    const { destinationTravels, pagination } = action.payload.data
    state.destinationClients = destinationTravels
    state.pagination = pagination
}
const getDetailFulfilled = (state, action) => {
    state.currentDestinationClient = action.payload.data
}
const destinationClientsSlice = createSlice({
    name: 'destinationClients',
    initialState: {
        destinationClients: [],
        currentDestinationClient: {},
        loading: 0,
        pagination: {}
    },
    reducers: {
        setCurrentDestinationClient(state, action) {
            state.currentDestinationClient = action.payload
        }
    },
    extraReducers: {
        extraReducers: builder => {
            builder
                .addCase(
                    getDestinationClient.fulfilled,
                    getAllFulfilled
                )
                .addCase(
                    getDetailDestination.fulfilled,
                    getDetailFulfilled
                )
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
    }
})
export const destinationsClientSelector = state =>
    state.destinationClients.destinationClients
export const currentDestinationClientSelector = state =>
    state.destinationClients.currentDestinationClient
export const loadingDestinationClientSelector = state =>
    state.destinationClients.loading
export const paginationDestinationClientSelector = state =>
    state.destinationClients.pagination
const { actions, reducer } = destinationClientsSlice
export const { setCurrentDestinationClient } = actions
export default reducer
