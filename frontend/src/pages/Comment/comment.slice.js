import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import commentApi from '@api/commentApi'
export const getComments = createAsyncThunk(
    'comments/getAllComment',
    payloadCreator(commentApi.getCommendByInstanceId)
)
export const getCommentsLoadMore = createAsyncThunk(
    'comments/getAllCommentLoadMore',
    payloadCreator(commentApi.getCommendByInstanceId)
)
export const createComment = createAsyncThunk(
    'comments/createComment',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await commentApi.create(payload, {
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
const getCommentsLoadMoreFulfilled = (state, action) => {
    const { comments, pagination } = action.payload.data
    state.comments = [...state.comments, comments]
    state.pagination = pagination
}
const getCommentsFulfilled = (state, action) => {
    const { comments, pagination } = action.payload.data
    state.comments = comments
    state.pagination = pagination
}
const createCommentFulfilled = (state, action) => {
    state.comments = [action.payload.data, ...state.comments]
}
const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        loading: 0,
        pagination: {}
    },
    extraReducers: builder => {
        builder
            .addCase(getComments.fulfilled, getCommentsFulfilled)
            .addCase(getCommentsLoadMore.fulfilled, getCommentsLoadMoreFulfilled)
            .addCase(createComment.fulfilled, createCommentFulfilled)
    }
})
export const commentsSelector = state => state.comments.comments
export const paginationSelector = state => state.comments.pagination
const { reducer } = commentSlice
export default reducer
