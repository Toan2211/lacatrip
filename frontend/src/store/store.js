import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@pages/Auth/auth.slice'
import employeesReducer from '@pages/System/Employees/employee.slice.js'
import clientsReducer from '@pages/System/Clients/client.slice.js'
import serviceManagersReducer from '@pages/System/ServiceManagers/servicemanager.slice.js'
import baseProperty from '@pages/CommonProperty/baseproperty'
import hotelsReducer from '@pages/System/Hotel/hotel.slice.js'
import roomsReducer from '@pages/System/Hotel/Room/room.slice.js'
import restaurantsReducer from '@pages/System/Restaurant/restaurant.slice.js'
import corpToursReducer from '@pages/System/CorpTour/corptour.slice.js'
import destinationReducer from '@pages/System/DestinationTravel/destination.slice.js'
import itineraryReducer from '@pages/System/DestinationTravel/itinerary.slice.js'
const rootReducer = {
    propertys: baseProperty,
    auth: authReducer,
    // system manage
    employees: employeesReducer,
    clients: clientsReducer,
    serviceManagers: serviceManagersReducer,
    hotels: hotelsReducer,
    rooms: roomsReducer,
    restaurants: restaurantsReducer,
    corpTours: corpToursReducer,
    destinations: destinationReducer,
    itineraries: itineraryReducer
}
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})
export default store
