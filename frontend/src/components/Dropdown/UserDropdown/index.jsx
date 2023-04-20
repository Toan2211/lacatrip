import React, { useRef, useState } from 'react'
import { createPopper } from '@popperjs/core'
import { logout } from '@pages/Auth/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '@pages/Auth/auth.slice'

const UserDropdown = () => {
    // dropdown props
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false)
    const btnDropdownRef = useRef()
    const popoverDropdownRef = useRef()
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, { placement: 'bottom-end' })
        setDropdownPopoverShow(true)
    }
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false)
    }
    return (
        <>
            <div
                className="text-blueGray-500 block cursor-pointer"
                ref={btnDropdownRef}
                onClick={() => {
                    dropdownPopoverShow
                        ? closeDropdownPopover()
                        : openDropdownPopover()
                }}
            >
                <div className="items-center flex">
                    <span className="w-10 h-10 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                        <img
                            alt="..."
                            className="w-full rounded-full align-middle border-none shadow-lg"
                            src={user.avatar}
                        />
                    </span>
                </div>
            </div>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? 'block ' : 'hidden ') +
                    'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-[120px]'
                }
            >
                <div
                    className={
                        'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent cursor-pointer'
                    }
                    onClick={() => dispatch(logout())}
                >
                    Profile
                </div>
                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                <div
                    className={
                        'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent cursor-pointer'
                    }
                    onClick={() => dispatch(logout())}
                >
                    Logout
                </div>
            </div>
        </>
    )
}

export default UserDropdown