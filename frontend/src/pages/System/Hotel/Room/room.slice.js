import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import roomApi from '@api/roomApi'
export const getRooms = createAsyncThunk(
    'rooms/getAllRooms',
    payloadCreator(roomApi.getAll)
)
export const getDetailRoom = createAsyncThunk(
    'rooms/getDetailRoom',
    payloadCreator(roomApi.getDetail)
)
export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await roomApi.create(payload, {
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
export const updateRoom = createAsyncThunk(
    'rooms/updateRoom',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await roomApi.update(payload, {
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
const getAllFulfilled = (state, action) => {
    const { rooms, pagination } = action.payload.data
    state.rooms = rooms
    state.pagination = pagination
}
const getDetailRoomFulfilled = (state, action) => {
    state.currentRoom = action.payload.data
}
export const addRoomDetail = createAsyncThunk(
    'hotels/addRoomDetail',
    payloadCreator(roomApi.addRoomDetail)
)
const handleAddRoomDetailFullfilled = (state, action) => {
    const room = { ...state.currentRoom }
    room.roomDetails.push(action.payload.data)
    state.currentRoom = room
}
const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [],
        currentRoom: {},
        loading: 0,
        pagination: {}
    },
    reducers: {
        setCurrentRoom(state, action) {
            state.currentRoom = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getRooms.fulfilled, getAllFulfilled)
            .addCase(getDetailRoom.fulfilled, getDetailRoomFulfilled)
            .addCase(addRoomDetail.fulfilled, handleAddRoomDetailFullfilled)
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
export const currentRoomSelector = state => state.rooms.currentRoom
export const roomsSelector = state => state.rooms.rooms
export const loadingRoom = state => state.rooms.loading
export const paginationRoom = state => state.rooms.pagination
const { actions, reducer } = roomSlice
export default reducer
export const { setCurrentRoom } = actions
