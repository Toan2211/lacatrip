import { path } from '@constants/path'
import AuthLayout from '@layouts/AuthLayout'
import Signin from '@pages/Auth/Signin'
import Signup from '@pages/Auth/Signup'
import ForgotPassword from '@pages/Auth/ForgotPassword'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '@pages/LandingPage'
import UnauthenticatedGuard from '@guards/UnauthenticatedGuard'
import SystemAuthenticated from '@guards/SystemAuthenticated'
import SystemLayout from '@layouts/SystemLayout'
import Employees from '@pages/System/Employees'
import Clients from '@pages/System/Clients'
import ServiceManger from '@pages/System/ServiceManagers'
import Profile from '@pages/System/Profile'
import MainLayout from '@layouts/MainLayout'
import ProfileClients from '@pages/Profile'
import AuthenticatedGuard from '@guards/AuthenticatedGuard'
import ChangePassword from '@pages/ChangePassword'
import Hotel from '@pages/System/Hotel'
import FormHotel from '@pages/System/Hotel/Form'
import Rooms from '@pages/System/Hotel/Room'
import Restaurants from '@pages/System/Restaurant'
import RestaurantForm from '@pages/System/Restaurant/Form'
import DestinationTravel from '@pages/System/DestinationTravel'
import DestinationForm from '@pages/System/DestinationTravel/Form'
import DestinationTravelClient from '@pages/DestinationTravelList/DestinationTravel'
import HotelId from '@pages/HotelList/HotelId'
import RestaurantId from '@pages/RestaurantList/RestaurantId'
import TripId from '@pages/TripList/TripId'
import TripList from '@pages/TripList'
import AccountInvite from '@pages/Auth/AccountInvite'
import Notification from '@pages/Notification'
import DestinationList from '@pages/DestinationTravelList'
import HotelList from '@pages/HotelList'
import RestaurantList from '@pages/RestaurantList'
import DetailProvince from '@pages/DetailProvince'
import BookingHotel from '@pages/BookingHotel'
import PaymentSuccess from '@pages/Payment/Success'
import PaymentFail from '@pages/Payment/Fail'
import BookingList from '@pages/BookingList'
import BookingHotelListSystem from '@pages/System/BookingHotel'
import NotificationSystem from '@pages/System/Notification'
import BookingDestinationTravel from '@pages/BookingDestinationTravel'
import BookingDestinationTravelSystem from '@pages/System/BookingDestinationTravel'
import BookingListDestinationTravel from '@pages/BookingDestinationTravel/BookingList'
import Revenue from '@pages/System/Revenue'
import TrackingPayment from '@pages/System/TrackingPayment'
function RoutesComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route
                        path={path.landingPage}
                        element={<LandingPage />}
                    />
                    <Route
                        path={path.profile}
                        element={<ProfileClients />}
                    />
                    <Route
                        path={path.clientDestinationTravelDetail}
                        element={<DestinationTravelClient />}
                    />
                    <Route
                        path={path.clientHotelDetail}
                        element={<HotelId />}
                    />
                    <Route
                        path={path.clientRestaurantDetail}
                        element={<RestaurantId />}
                    />
                    <Route
                        path={path.destinationList}
                        element={<DestinationList />}
                    />
                    <Route
                        path={path.hotelList}
                        element={<HotelList />}
                    />
                    <Route
                        path={path.restaurantList}
                        element={<RestaurantList />}
                    />
                    <Route
                        path={path.detailProvince}
                        element={<DetailProvince />}
                    />
                </Route>
                <Route element={<AuthenticatedGuard />}>
                    <Route element={<MainLayout />}>
                        <Route
                            path={path.profile}
                            element={<ProfileClients />}
                        />
                        <Route
                            path={path.changePassword}
                            element={<ChangePassword />}
                        />
                        <Route
                            path={path.clientTrips}
                            element={<TripList />}
                        />
                        <Route
                            path={path.clientTripDetail}
                            element={<TripId />}
                        />
                        <Route
                            path={path.notification}
                            element={<Notification />}
                        />
                        <Route
                            path={path.bookingHotel}
                            element={<BookingHotel />}
                        />
                        <Route
                            path={path.bookingmeHotel}
                            element={<BookingList />}
                        />
                        <Route
                            path={path.bookingmeDestinationTravel}
                            element={<BookingListDestinationTravel />}
                        />
                        <Route
                            path={path.bookingDestiantionTravel}
                            element={<BookingDestinationTravel />}
                        />
                    </Route>
                </Route>
                <Route element={<SystemAuthenticated />}>
                    <Route
                        path={path.system}
                        element={<SystemLayout />}
                    >
                        <Route
                            path={path.employees}
                            element={<Employees />}
                        />
                        <Route
                            path={path.clients}
                            element={<Clients />}
                        />
                        <Route
                            path={path.serviceManagers}
                            element={<ServiceManger />}
                        />
                        <Route
                            path={path.profileSystem}
                            element={<Profile />}
                        />
                        <Route
                            path={path.hotels}
                            element={<Hotel />}
                        />
                        <Route
                            path={path.formHotel}
                            element={<FormHotel />}
                        />
                        <Route
                            path={path.formUpdateHotel}
                            element={<FormHotel />}
                        />
                        <Route
                            path={path.rooms}
                            element={<Rooms />}
                        />
                        <Route
                            path={path.restaurants}
                            element={<Restaurants />}
                        />
                        <Route
                            path={path.formRestaurant}
                            element={<RestaurantForm />}
                        />
                        <Route
                            path={path.formUpdateRestaurant}
                            element={<RestaurantForm />}
                        />
                        <Route
                            path={path.destinations}
                            element={<DestinationTravel />}
                        />
                        <Route
                            path={path.formDestination}
                            element={<DestinationForm />}
                        />
                        <Route
                            path={path.formUpdateDestination}
                            element={<DestinationForm />}
                        />
                        <Route
                            path={path.bookingHotelSystem}
                            element={<BookingHotelListSystem />}
                        />
                        <Route
                            path={path.notificationSystem}
                            element={<NotificationSystem />}
                        />
                        <Route
                            path={path.bookingDestinationTravelSystem}
                            element={
                                <BookingDestinationTravelSystem />
                            }
                        />
                        <Route
                            path={path.revenue}
                            element={<Revenue />}
                        />
                        <Route
                            path={path.trackingPayment}
                            element={<TrackingPayment />}
                        />
                    </Route>
                </Route>
                <Route element={<UnauthenticatedGuard />}>
                    <Route element={<AuthLayout />}>
                        <Route
                            path={path.signin}
                            element={<Signin />}
                        />
                        <Route
                            path={path.signup}
                            element={<Signup />}
                        />
                        <Route
                            path={path.forgotPass}
                            element={<ForgotPassword />}
                        />
                        <Route
                            path={path.accountInvite}
                            element={<AccountInvite />}
                        />
                    </Route>
                </Route>
                <Route
                    path={path.paymentSuccess}
                    element={<PaymentSuccess />}
                />
                <Route
                    path={path.paymentFail}
                    element={<PaymentFail />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent
