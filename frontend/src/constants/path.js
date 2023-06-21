class Path {
    constructor() {
        this.landingPage = '/'
        this.signin = '/signin'
        this.signup = '/signup'
        this.forgotPass = '/forgotPassWord'
        this.system = '/system'
        this.profileSystem = '/system/profile'
        this.employees = '/system/employees'
        this.clients = '/system/clients'
        this.serviceManagers = '/system/service-manager'
        this.profile = '/profile'
        this.changePassword = '/changePassword'
        this.hotels = '/system/hotels'
        this.formHotel = '/system/hotels/form'
        this.formUpdateHotel = '/system/hotels/form/:id'
        this.rooms = '/system/hotels/:hotelId/rooms'
        this.restaurants = '/system/restaurants'
        this.formRestaurant = '/system/restaurants/form'
        this.formUpdateRestaurant = '/system/restaurants/form/:id'
        this.destinations = '/system/destination-travel'
        this.formDestination = '/system/destination-travel/form'
        this.formUpdateDestination = '/system/destination-travel/form/:id'
        this.bookingHotelSystem = '/system/booking-hotel'
        this.notificationSystem = '/system/notifications'
        this.bookingDestinationTravelSystem = '/system/booking-destination-travel'
        //client
        this.clientDestinationTravelDetail = '/destination-travel/:id'
        this.clientHotelDetail = '/hotel/:id'
        this.clientRestaurantDetail = '/restaurant/:id'
        this.clientTrips = '/trip'
        this.clientTripDetail = '/trip/:id'
        this.accountInvite = '/create/user-invite'
        this.notification = '/notifications'
        this.destinationList = '/destination-travels/province/:id'
        this.hotelList = '/hotels/province/:id'
        this.restaurantList = '/restaurants/province/:id'
        this.detailProvince = '/province/:id'
        //booking
        this.bookingmeHotel = '/booking/me/hotel'
        this.bookingmeDestinationTravel = '/booking/me/destination-travel'
        this.bookingHotel = '/hotel/booking'
        this.bookingDestiantionTravel = '/destination-travel/booking'
        this.paymentSuccess = '/payment/success'
        this.paymentFail = '/payment/fail'
    }
}

export const path = new Path()