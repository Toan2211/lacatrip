import React from 'react'
import CardProfile from './CardProfile'
import CardChangePassword from './CardChangePassword'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@pages/Auth/auth.slice'
import CardPaymentAccount from './CardPaymentAccount'

function Profile() {
    useEffect(() => {
        document.title = 'System Profile'
    }, [])
    const user = useSelector(selectUser)
    return (
        <div>
            <CardProfile />
            {user.serviceManagerId && <CardPaymentAccount />}
            <CardChangePassword />
        </div>
    )
}

export default Profile
