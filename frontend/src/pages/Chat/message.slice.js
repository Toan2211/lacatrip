import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import messageApi from '@api/messageApi'
import { payloadCreator } from '@utils/helper'

export const createMessage = createAsyncThunk(
    'messages/createMessage',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await messageApi.create(payload, {
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
export const getConversationByTripId = createAsyncThunk(
    'messages/getConversations',
    payloadCreator(messageApi.getConversationByTripId)
)
const handleCreateMessageFulfilled = (state, action) => {
    state.currentConversation = [...state.currentConversation, action.payload.data]
}
const handleGetConversationByTripIdFullfilled = (state, action) => {
    state.currentConversation = [...action.payload.data.messages].reverse()
}
const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        currentConversation: [],
        currentOnline: []
    },
    reducers: {
        setCurrentConversation(state, action) {
            state.currentConversation = action.payload
        },
        addMessage(state, action) {
            state.currentConversation.push(action.payload)
        },
        setCurrentOnline(state, action) {
            state.currentOnline = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createMessage.fulfilled, handleCreateMessageFulfilled)
            .addCase(getConversationByTripId.fulfilled, handleGetConversationByTripIdFullfilled)
    }
})

export const currentConversationSelector = state => state.messages.currentConversation
export const currentOnelineSelector = state => state.messages.currentOnline
const { actions, reducer } = messageSlice
export default reducer
export const { setCurrentConversation, addMessage, setCurrentOnline } = actions
