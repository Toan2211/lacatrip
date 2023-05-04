import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import provinceApi from '@api/provinceApi'
import amenitieshotelApi from '@api/amenitieshotelApi'
export const getProvinces = createAsyncThunk(
    'provinces/getAllProvinces',
    payloadCreator(provinceApi.getAllProvince)
)
const handlegetAllProvincesFulfilled = (state, action) => {
    state.provinces = action.payload.data
}
export const getAmenitiesHotel = createAsyncThunk(
    'amenitieshotel/getAll',
    payloadCreator(amenitieshotelApi.getAll)
)
const handlegetAllAmenitiesHotelFulfilled = (state, action) => {
    state.amenitiesHotel = action.payload.data
}
const basepropertySlice = createSlice({
    name: 'propertys',
    initialState: {
        provinces: [],
        amenitiesHotel: [],
        loading: 0
    },
    reducers: {},
    extraReducers: {
        [getProvinces.fulfilled]: handlegetAllProvincesFulfilled,
        [getAmenitiesHotel.fulfilled]:
            handlegetAllAmenitiesHotelFulfilled,
        extraReducers: builder => {
            builder
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
                    (state, action) => {
                        state.status = action.payload.status
                        state.loading = state.loading - 1
                    }
                )
        }
    }
})
const { actions, reducer } = basepropertySlice
export default reducer
