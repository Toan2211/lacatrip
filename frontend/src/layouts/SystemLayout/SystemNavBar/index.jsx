import UserDropdown from '@components/Dropdown/UserDropdown'
import React from 'react'

function SystemNavBar() {
    return (
        <>
            <nav className="relative top-0 left-0 w-full z-10 bg-slate-100 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    <div
                        className=" text-sm uppercase hidden lg:inline-block font-semibold"
                    >
                        Dashboard
                    </div>
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <UserDropdown />
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default SystemNavBar
