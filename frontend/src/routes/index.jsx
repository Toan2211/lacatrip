import { path } from '@constants/path'
import AuthLayout from '@layouts/AuthLayout'
import Signin from '@pages/Auth/Signin'
import Signup from '@pages/Auth/Signup'
import ForgotPassword from '@pages/Auth/ForgotPassword'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function RoutesComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path={path.signin} element={<Signin />} />
                    <Route path={path.signup} element={<Signup />} />
                    <Route path={path.forgotPass} element={<ForgotPassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent
