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

function RoutesComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = {path.landingPage} element = {<LandingPage />}/>
                <Route element = {<SystemAuthenticated />}>
                    <Route path = {path.system} element = {<SystemLayout />}>
                        <Route path = {path.employees} element = {<Employees />}/>
                    </Route>
                </Route>
                <Route element = {<UnauthenticatedGuard />}>
                    <Route element={<AuthLayout />}>
                        <Route path={path.signin} element={<Signin />} />
                        <Route path={path.signup} element={<Signup />} />
                        <Route path={path.forgotPass} element={<ForgotPassword />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent
