import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import hotelApi from '@api/hotelApi'
import { payloadCreator } from '@utils/helper'
export const getHotels = createAsyncThunk(
    'hotels/getAllHotel',
    payloadCreator(hotelApi.getHotels)
)
export const createHotel = createAsyncThunk(
    'hotels/createHotel',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await hotelApi.create(payload, {
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
export const updateHotel = createAsyncThunk(
    'hotels/updateHotel',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await hotelApi.update(payload, {
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
export const togglePublic = createAsyncThunk(
    'hotels/togglePublic',
    payloadCreator(hotelApi.togglePublic)
)
const togglePublicFulfilled = (state, action) => {
    const hotel = state.hotels.find(hotel => hotel.id === action.payload.data.id)
    hotel.public = !hotel.public
}
const getHotelsFulfilled = (state, action) => {
    const { hotels, pagination } = action.payload.data
    state.hotels = hotels
    state.pagination = pagination
}
const hotelSlice = createSlice({
    name: 'hotels',
    initialState: {
        hotels: [],
        currentHotel: {},
        loading: 0,
        pagination: {}
    },
    reducers: {
        setCurrentHotel(state, action) {
            state.currentHotel = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getHotels.fulfilled, getHotelsFulfilled)
            .addCase(togglePublic.fulfilled, togglePublicFulfilled)
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
export const currentHotelSelector = state => state.hotels.currentHotel
export const hotelsSelector = state => state.hotels.hotels
export const loadingHotel = state => state.hotels.loading
export const paginationHotel = state => state.hotels.pagination
const { actions, reducer } = hotelSlice
export default reducer
export const { setCurrentHotel } = actions
