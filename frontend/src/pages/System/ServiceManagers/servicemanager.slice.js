import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import userApi from '@api/userApi'
import serviceManagerApi from '@api/servicemangerApi'
export const getServiceManagers = createAsyncThunk(
    'serviceManagers/getAllServiceManagers',
    payloadCreator(serviceManagerApi.getServiceManagers)
)
export const createServiceManager = createAsyncThunk(
    'serviceManagers/createServiceManager',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await serviceManagerApi.create(payload, {
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
export const updateServiceManager = createAsyncThunk(
    'serviceManagers/updateServiceManager',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await serviceManagerApi.update(payload, {
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
export const toggleStatusServiceManager = createAsyncThunk(
    'serviceManagers/toggleStatus',
    payloadCreator(userApi.toggleStatus)
)
const handleLoadingFalse = state => {
    state.loading = false
}
const handleLoadingTrue = state => {
    state.loading = true
}
const handleGetAllServiceManagers = (state, action) => {
    const { users, pagination } = action.payload.data
    state.loading = false
    state.serviceManagers = users
    state.pagination = pagination
}
const handleToggleStatusFulfilled = (state, action) => {
    const serviceManagerChange = state.serviceManagers.find(
        serviceManager =>
            serviceManager.userId === action.payload.data.id
    )
    serviceManagerChange.user.block = !serviceManagerChange.user.block
}
const serviceManagerSlice = createSlice({
    name: 'serviceManagers',
    initialState: {
        serviceManagers: [],
        currentServiceManager: {},
        loading: false,
        pagination: {}
    },
    reducers: {
        setCurrentServicemanager(state, action) {
            state.currentServiceManager = action.payload
        }
    },
    extraReducers: {
        [getServiceManagers.pending]: handleLoadingTrue,
        [getServiceManagers.fulfilled]: handleGetAllServiceManagers,
        [getServiceManagers.rejected]: handleLoadingFalse,
        [createServiceManager.pending]: handleLoadingTrue,
        [createServiceManager.fulfilled]: handleLoadingFalse,
        [createServiceManager.rejected]: handleLoadingFalse,
        [updateServiceManager.pending]: handleLoadingTrue,
        [updateServiceManager.fulfilled]: handleLoadingFalse,
        [updateServiceManager.rejected]: handleLoadingFalse,
        [toggleStatusServiceManager.fulfilled]:
            handleToggleStatusFulfilled
    }
})
export const serviceManagersSelector = state =>
    state.serviceManagers.serviceManagers
export const paginationServiceManagerSelector = state =>
    state.serviceManagers.pagination
export const loadingServiceManager = state =>
    state.serviceManagers.loading
export const currentServiceManagerSelector = state =>
    state.serviceManagers.currentServiceManager
const { actions, reducer } = serviceManagerSlice
export const { setCurrentServicemanager } = actions
export default reducer
