import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from '@api/authApi'
import LocalStorage from '@constants/localStorage'
import { payloadCreator } from '@utils/helper'
import userApi from '@api/userApi'
export const signin = createAsyncThunk(
    'auth/signin',
    payloadCreator(authApi.signin)
)
export const signup = createAsyncThunk(
    'auth/signup',
    payloadCreator(authApi.signup)
)
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    payloadCreator(authApi.forgotPassword)
)
export const updateUser = createAsyncThunk(
    'auth/updateProfile',
    payloadCreator(userApi.update)
)
export const changePassword = createAsyncThunk(
    'auth/changepassword',
    payloadCreator(userApi.changePassword)
)
const handleSigninPending = state => {
    state.loading = true
}
const handleSigninFulfilled = (state, action) => {
    const { user, access_token } = action.payload.data
    state.profile = user
    localStorage.setItem(LocalStorage.PROFILE, JSON.stringify(user))
    localStorage.setItem(
        LocalStorage.ACCESS_TOKEN,
        `Bear ${access_token}`
    )
    state.loading = false
}
const handleSigninReject = state => {
    state.loading = false
}
const handleSignupPending = state => {
    state.loading = true
}
const handleSignupFulfilled = state => {
    state.loading = false
}
const handleSignupReject = state => {
    state.loading = false
}
const handleForgotPasswordPending = state => {
    state.loading = true
}
const handleForgotPasswordFulfilled = state => {
    state.loading = false
}
const handleForgotPasswordReject = state => {
    state.loading = false
}
const handleUpdateUserFulfilled = (state, action) => {
    state.profile = action.payload.data.user
    localStorage.setItem(LocalStorage.PROFILE, JSON.stringify(action.payload.data.user))
    state.loading = false
}
const handleChangePassPending = state => {
    state.loadingChangePass = true
}
const handleChangePasswordFulfilled = state => {
    state.loading = false
}
const handlechangePassReject = state => {
    state.loadingChangePass = false
}
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        profile:
            JSON.parse(localStorage.getItem(LocalStorage.PROFILE)) ||
            {},
        loading: false,
        loadingChangePass: false
    },
    reducers: {
        logout(state) {
            localStorage.removeItem(LocalStorage.PROFILE)
            localStorage.removeItem(LocalStorage.ACCESS_TOKEN)
            state.profile = {}
        }
    },
    extraReducers: {
        [signin.pending]: handleSigninPending,
        [signin.fulfilled]: handleSigninFulfilled,
        [signin.rejected]: handleSigninReject,
        [signup.pending]: handleSignupPending,
        [signup.fulfilled]: handleSignupFulfilled,
        [signup.rejected]: handleSignupReject,
        [forgotPassword.pending]: handleForgotPasswordPending,
        [forgotPassword.fulfilled]: handleForgotPasswordFulfilled,
        [forgotPassword.rejected]: handleForgotPasswordReject,
        [updateUser.pending]: handleSigninPending,
        [updateUser.fulfilled]: handleUpdateUserFulfilled,
        [updateUser.rejected]: handleSigninReject,
        [changePassword.pending]: handleChangePassPending,
        [changePassword.fulfilled]: handleChangePasswordFulfilled,
        [changePassword.rejected]: handlechangePassReject
    }
})
export const selectLoadingAuth = state => state.auth.loading
export const selectUser = state => state.auth.profile
export const loadingChangePassSelector = state => state.auth.loadingChangePass
const { actions, reducer } = authSlice
export const { logout } = actions
export default reducer
