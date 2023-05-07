import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import provinceApi from '@api/provinceApi'
import amenitieshotelApi from '@api/amenitieshotelApi'
import imageApi from '@api/imageApi'
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
export const deleteImage = createAsyncThunk(
    'images/deleteImage',
    payloadCreator(imageApi.delete)
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
                        state.loading = state.loading - 1
                    }
                )
        }
    }
})
export const provincesSelector = (state) => state.propertys.provinces
export const amenitiesHotelSelector = state => state.propertys.amenitiesHotel
export const loadingPropertySelector = state => state.propertys.loading
const { reducer } = basepropertySlice
export default reducer
