import React from 'react'
import CardProfile from './CardProfile'
import CardChangePassword from './CardChangePassword'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@pages/Auth/auth.slice'
import CardPaymentAccount from './CardPaymentAccount'
import { useTranslation } from 'react-i18next'

function Profile() {
    const { t } = useTranslation()
    useEffect(() => {
        document.title = t('systemProfile')
    }, [t])
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
