import React from 'react'
import Sidebar from './Sidebar'
import SystemNavBar from './SystemNavBar'
import { Outlet } from 'react-router-dom'

function SystemLayout() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <div className='fixed top-0 z-10 w-[calc(100%-16rem)]'>
                    <SystemNavBar />
                </div>
                <div className="px-4 md:px-10 mx-auto w-full mt-[100px]">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default SystemLayout
