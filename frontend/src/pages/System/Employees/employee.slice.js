import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import employeeApi from '@api/employeeApi'
export const getEmployees = createAsyncThunk(
    'employees/getAllEmployees',
    payloadCreator(employeeApi.getEmployees)
)
export const createEmployee = createAsyncThunk(
    'employees/createEmployee',
    payloadCreator(employeeApi.createEmployee)
)
const handleLoadingFalse = (state) => {
    state.loading = false
}
const handleLoadingTrue = (state) => {
    state.loading = true
}
const handleGetAllEmployeesPending = (state) => {
    state.loading = true
}
const handleGetAllEmployeesFulfilled = (state, action) => {
    const { users, pagination } = action.payload.data
    state.loading = false
    state.employees = users
    state.pagination = pagination
}
const handleGetAllEmployeesRejected = (state) => {
    state.loading = false
}
const handleCreateEmployeeFulfilled = (state, action) => {
    const { user } = action.payload.data
    state.loading = false
    state.employees = [...state.employees, user]
}
const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        loading: false,
        pagination : {}
    },
    reducers: {
    },
    extraReducers: {
        [getEmployees.pending]: handleGetAllEmployeesPending,
        [getEmployees.fulfilled]: handleGetAllEmployeesFulfilled,
        [getEmployees.rejected]: handleGetAllEmployeesRejected,
        [createEmployee.pending]: handleLoadingTrue,
        [createEmployee.fulfilled]: handleCreateEmployeeFulfilled,
        [createEmployee.rejected]: handleLoadingFalse
    }
})
export const employeesSelector = (state) => state.employees.employees
export const paginationEmployeeSelector = (state) => state.employees.pagination
export const loadingEmployees = (state) => state.employees.loading
const { reducer } = employeeSlice
export default reducer
