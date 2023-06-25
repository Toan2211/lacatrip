import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@pages/Auth/auth.slice'
import employeesReducer from '@pages/System/Employees/employee.slice.js'
import clientsReducer from '@pages/System/Clients/client.slice.js'
import serviceManagersReducer from '@pages/System/ServiceManagers/servicemanager.slice.js'
import baseProperty from '@pages/CommonProperty/baseproperty'
import hotelsReducer from '@pages/System/Hotel/hotel.slice.js'
import roomsReducer from '@pages/System/Hotel/Room/room.slice.js'
import restaurantsReducer from '@pages/System/Restaurant/restaurant.slice.js'
import destinationReducer from '@pages/System/DestinationTravel/destination.slice.js'
import itineraryReducer from '@pages/System/DestinationTravel/itinerary.slice.js'
import destinationClientReducer from '@pages/DestinationTravelList/destinationclient.slice.js'
import restaurantClientReducer from '@pages/RestaurantList/restaurantclient.slice.js'
import hotelClientReducer from '@pages/HotelList/hotelclient.slice.js'
import commentReducer from '@pages/Comment/comment.slice.js'
import tripReducer from '@pages/TripList/trip.slice.js'
import socketReducer from '@pages/Chat/socket.slice.js'
import messageReducer from '@pages/Chat/message.slice.js'
import notificationReducer from '@pages/Notification/notification.slice.js'
import bookingHotelClientReducer from '@pages/BookingHotel/bookinghotelclient.slice.js'
import bookingHotelReducer from '@pages/System/BookingHotel/bookinghotel.slice.js'
import bookingDestinationReducer from '@pages/System/BookingDestinationTravel/bookingdestinationtravel.slice.js'
import bookingDestinationClientReducer from '@pages/BookingDestinationTravel/bookingdestinationtravel.slice.js'
import revenueReducer from '@pages/System/Revenue/revenue.slice.js'
import trackingPaymentReducer from '@pages/System/TrackingPayment/trackingpayment.slice.js'
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
    destinations: destinationReducer,
    itineraries: itineraryReducer,
    bookingHotels: bookingHotelReducer,
    bookingDestinationTravels: bookingDestinationReducer,
    // client page
    destinationClients: destinationClientReducer,
    restaurantsClient: restaurantClientReducer,
    hotelClients: hotelClientReducer,
    comments: commentReducer,
    trips: tripReducer,
    //chat
    socket: socketReducer,
    messages: messageReducer,
    notifications: notificationReducer,
    //booking
    bookingHotelClients: bookingHotelClientReducer,
    bookingDestinationTravelClients: bookingDestinationClientReducer,
    //revenue
    revenues: revenueReducer,
    trackingPayments : trackingPaymentReducer
}
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})
export default store
