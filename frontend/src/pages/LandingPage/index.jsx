import { useSystemAuthenticated } from '@hooks/useSystemAuthenticated'
import { path } from '@constants/path'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const isSystem = useSystemAuthenticated()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSystem)
            navigate(path.system)
    }, [navigate, isSystem])
    useEffect(() => {
        document.title = 'Lacatrip'
    }, [])
    return <div >kaka</div>
}

export default LandingPage
