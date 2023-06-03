import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payloadCreator } from '@utils/helper'
import tripApi from '@api/tripApi'
import {
    HOTELTYPE,
    RESTAURANTTYPE,
    DESTINATIONTYPE
} from '@constants/instanceType'
export const createTrip = createAsyncThunk(
    'trips/createTrip',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await tripApi.create(payload, {
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
export const updateTrip = createAsyncThunk(
    'trips/updateTrip',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await tripApi.update(payload, {
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
export const getAllTrip = createAsyncThunk(
    'trips/getAll',
    payloadCreator(tripApi.getAll)
)
export const getTripDetail = createAsyncThunk(
    'trips/getDetailHotel',
    payloadCreator(tripApi.getDetail)
)
export const addInstanceToTripList = createAsyncThunk(
    'trips/addInstanceToTripList',
    payloadCreator(tripApi.addInstance)
)
export const removeInstaceFromTripList = createAsyncThunk(
    'trips/removeInstaceFromTripList',
    payloadCreator(tripApi.removeInstance)
)
export const updateItineraries = createAsyncThunk(
    'trips/handleUpdateItineraries',
    payloadCreator(tripApi.handleUpdateItinerary)
)
export const inviteMember = createAsyncThunk(
    'trips/inviteMember',
    payloadCreator(tripApi.inviteMember)
)
const handleUpdateItinerariesFulfilled = (state, action) => {
    state.currentTrip = action.payload.data
}
const handleAddInstanceToTripList = (state, action) => {
    const { data, type, tripId } = action.payload.data
    const tripIndex = state.trips.findIndex(
        trip => trip.id === tripId
    )
    if (type === HOTELTYPE) {
        state.trips[tripIndex].hotels.push(data)
    } else if (type === RESTAURANTTYPE) {
        state.trips[tripIndex].restaurants.push(data)
    } else if (type === DESTINATIONTYPE) {
        state.trips[tripIndex].destinationTravels.push(data)
    }
}
const handleRemoveInstanceFromTripList = (state, action) => {
    const { data, type, tripId } = action.payload.data
    const tripIndex = state.trips.findIndex(
        trip => trip.id === tripId
    )
    if (type === HOTELTYPE) {
        const hotelIndex = state.trips[tripIndex].hotels.findIndex(
            hotel => hotel.id === data.id
        )
        state.trips[tripIndex].hotels.splice(hotelIndex, 1)
    } else if (type === RESTAURANTTYPE) {
        const restaurantIndex = state.trips[
            tripIndex
        ].restaurants.findIndex(
            restaurant => restaurant.id === data.id
        )
        state.trips[tripIndex].restaurants.splice(restaurantIndex, 1)
    } else if (type === DESTINATIONTYPE) {
        const destinationTravelIndex = state.trips[
            tripIndex
        ].destinationTravels.findIndex(
            destinationTravel => destinationTravel.id === data.id
        )
        state.trips[tripIndex].destinationTravels.splice(
            destinationTravelIndex,
            1
        )
    }
}
const handleGetAllTripFullfilled = (state, action) => {
    const { trips, pagination } = action.payload.data
    state.trips = trips
    state.pagination = pagination
}
const getTripDetailFullfilled = (state, action) => {
    state.currentTrip = action.payload.data
}
const handleCreateTripFulfilled = (state, action) => {
    state.trips = [...state.trips, action.payload.data]
}
const handleUpdateTripFulfilled = (state, action) => {
    state.currentTrip = action.payload.data
    let tripId = state.trips.findIndex(
        trip => action.payload.data.id === trip.id
    )
    const tripsClone = [...state.trips]
    tripsClone.splice(tripId, 1)
    tripsClone.push(action.payload.data)
    state.trips = [...tripsClone]
}

const tripSlice = createSlice({
    name: 'trips',
    initialState: {
        trips: [],
        currentTrip: {},
        loading: 0,
        pagination: {}
    },
    reducers: {
        setCurrentTrip(state, action) {
            state.currentTrip = action.payload
        },
        getSocket(action) {
            const { socket } = action.payload
            console.log('trip slice js', socket)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllTrip.fulfilled, handleGetAllTripFullfilled)
            .addCase(getTripDetail.fulfilled, getTripDetailFullfilled)
            .addCase(createTrip.fulfilled, handleCreateTripFulfilled)
            .addCase(updateTrip.fulfilled, handleUpdateTripFulfilled)
            .addCase(
                addInstanceToTripList.fulfilled,
                handleAddInstanceToTripList
            )
            .addCase(
                removeInstaceFromTripList.fulfilled,
                handleRemoveInstanceFromTripList
            )
            .addCase(
                updateItineraries.fulfilled,
                handleUpdateItinerariesFulfilled
            )
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
export const allTripsSelector = state => state.trips.trips
export const currentTripSelector = state => state.trips.currentTrip
export const loadingTripSelector = state => state.trips.loading
const { actions, reducer } = tripSlice
export default reducer
export const { setCurrentTrip } = actions
