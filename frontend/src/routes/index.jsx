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
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent
