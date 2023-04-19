import React from 'react'
import Sidebar from './Sidebar'
import SystemNavBar from './SystemNavBar'
import { Outlet } from 'react-router-dom'

function SystemLayout() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <SystemNavBar />
                <div className="px-4 md:px-10 mx-auto w-full mt-10">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default SystemLayout
