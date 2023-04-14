import React from 'react'
import logo from '@assets/img/logo-off.svg'
import { Outlet } from 'react-router-dom'
function AuthLayout() {
    return (
        <div className="relative h-scree bg-auth-layout">
            <header className="hidden lg:h-[10vh] lg:pl-7 lg:block">
                <img
                    alt="logo"
                    src={logo}
                    className="h-full w-[16%] ml-10"
                />
            </header>
            <main className="lg:h-[90vh] flex justify-center items-center h-screen">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-center items-center content-center h-full">
                        <div className="w-full lg:w-4/12 px-4">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AuthLayout
