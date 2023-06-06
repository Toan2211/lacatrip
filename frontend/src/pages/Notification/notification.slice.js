import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import notificationApi from '@api/notificationApi'

export const getNotifications = createAsyncThunk(
    'notifications/getNotifications',
    payloadCreator(notificationApi.getAllNotifications)
)

export const createNotification = createAsyncThunk(
    'notifications/createNotification',
    payloadCreator(notificationApi.create)
)
export const readNotification = createAsyncThunk(
    'notifications/readNotification',
    payloadCreator(notificationApi.readedNotifi)
)
const getAllFullfilled = (state, action) => {
    const { notifications, pagination } = action.payload.data
    state.notifications = notifications
    state.pagination = pagination
    state.countNotReaded = action.payload.countNotReaded
}
const readNotificationFulfilled = (state, action) => {
    if (action.payload.data) {
        const notify = state.notifications.find(
            notify => notify.id === action.payload.data.id
        )
        if (notify) {
            notify.isReaded = true
            state.countNotReaded = state.countNotReaded - 1
        }
    }
}
const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        pagination: {},
        countNotReaded: 0
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getNotifications.fulfilled, getAllFullfilled)
        builder.addCase(
            readNotification.fulfilled,
            readNotificationFulfilled
        )
    }
})

export const notificationsSelector = state =>
    state.notifications.notifications
const { actions, reducer } = notificationSlice
export default reducer
