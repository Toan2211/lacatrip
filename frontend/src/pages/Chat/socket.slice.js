import { createSlice } from '@reduxjs/toolkit'

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null
    },
    reducers: {
        setSocket(state, action) {
            state.socket = action.payload
        }
    }
})

export const socketSelector = state => state.socket.socket
const { actions, reducer } = socketSlice
export default reducer
export const { setSocket } = actions
