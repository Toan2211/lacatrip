import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import employeeApi from '@api/employeeApi'
import userApi from '@api/userApi'
export const getEmployees = createAsyncThunk(
    'employees/getAllEmployees',
    payloadCreator(employeeApi.getEmployees)
)
export const createEmployee = createAsyncThunk(
    'employees/createEmployee',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await employeeApi.create(payload, {
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
export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await employeeApi.update(payload, {
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
export const toggleStatusEmployee = createAsyncThunk(
    'employees/toggleStatus',
    payloadCreator(userApi.toggleStatus)
)
const handleLoadingFalse = state => {
    state.loading = false
}
const handleLoadingTrue = state => {
    state.loading = true
}
const handleGetAllEmployeesPending = state => {
    state.loading = true
}
const handleGetAllEmployeesFulfilled = (state, action) => {
    const { users, pagination } = action.payload.data
    state.loading = false
    state.employees = users
    state.pagination = pagination
}
const handleGetAllEmployeesRejected = state => {
    state.loading = false
}
const handleCreateEmployeeFulfilled = state => {
    state.loading = false
}
const handleUpdateEmployeeFulfilled = state => {
    state.loading = false
}
const handleToggleStatusFulfilled = (state, action) => {
    const userChange = state.employees.find(employee => employee.id === action.payload.data.id)
    userChange.block = !userChange.block
}
const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        currentEmployee: {},
        loading: false,
        pagination: {}
    },
    reducers: {
        setCurrentEmployee(state, action) {
            state.currentEmployee = action.payload
        }
    },
    extraReducers: {
        [getEmployees.pending]: handleGetAllEmployeesPending,
        [getEmployees.fulfilled]: handleGetAllEmployeesFulfilled,
        [getEmployees.rejected]: handleGetAllEmployeesRejected,
        [createEmployee.pending]: handleLoadingTrue,
        [createEmployee.fulfilled]: handleCreateEmployeeFulfilled,
        [createEmployee.rejected]: handleLoadingFalse,
        [updateEmployee.pending]: handleLoadingTrue,
        [updateEmployee.fulfilled]: handleUpdateEmployeeFulfilled,
        [updateEmployee.rejected]: handleLoadingFalse,
        [toggleStatusEmployee.fulfilled]: handleToggleStatusFulfilled
    }
})
export const employeesSelector = state => state.employees.employees
export const paginationEmployeeSelector = state =>
    state.employees.pagination
export const loadingEmployees = state => state.employees.loading
export const currentEmployeeSelector = state =>
    state.employees.currentEmployee
const { actions, reducer } = employeeSlice
export const { setCurrentEmployee } = actions
export default reducer
