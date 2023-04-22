import React from 'react'
import CardProfile from './CardProfile'
import CardChangePassword from './CardChangePassword'
import { useEffect } from 'react'

function Profile() {
    useEffect(() => {
        document.title = 'System Profile'
    }, [])
    return (
        <div>
            <CardProfile />
            <CardChangePassword />
        </div>
    )
}

export default Profile
