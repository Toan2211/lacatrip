import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import userApi from '@api/userApi'
import clientApi from '@api/clientApi'
export const getClients = createAsyncThunk(
    'clients/getAllClients',
    payloadCreator(clientApi.getClients)
)
export const toggleStatusClient = createAsyncThunk(
    'clients/toggleStatus',
    payloadCreator(userApi.toggleStatus)
)
const handleGetAllClientsPending = state => {
    state.loading = true
}
const handleGetAllClientsFulfilled = (state, action) => {
    const { users, pagination } = action.payload.data
    state.loading = false
    state.clients = users
    state.pagination = pagination
}
const handleGetAllClientsRejected = state => {
    state.loading = false
}
const handleToggleStatusFulfilled = (state, action) => {
    const userChange = state.clients.find(client => client.id === action.payload.data.id)
    userChange.block = !userChange.block
}
const clientSlice = createSlice({
    name: 'clients',
    initialState: {
        clients: [],
        currentClient: {},
        loading: false,
        pagination: {}
    },
    reducers: {
        setCurrentClient(state, action) {
            state.currentClient = action.payload
        }
    },
    extraReducers: {
        [getClients.pending]: handleGetAllClientsPending,
        [getClients.fulfilled]: handleGetAllClientsFulfilled,
        [getClients.rejected]: handleGetAllClientsRejected,
        [toggleStatusClient.fulfilled]: handleToggleStatusFulfilled
    }
})
export const clientsSelector = state => state.clients.clients
export const paginationClientSelector = state =>
    state.clients.pagination
export const loadingClients = state => state.clients.loading
export const currentClientSelector = state =>
    state.clients.currentClient
const { actions, reducer } = clientSlice
export const { setCurrentClient } = actions
export default reducer
