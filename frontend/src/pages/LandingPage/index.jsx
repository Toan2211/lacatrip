import { useSystemAuthenticated } from '@hooks/useSystemAuthenticated'
import { path } from '@constants/path'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from './Banner'
import SearchMain from './SearchMain'
import TopProvince from './TopProvince'
import Recommend from './Recommend'

function LandingPage() {
    const isSystem = useSystemAuthenticated()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSystem) navigate(path.system)
    }, [navigate, isSystem])
    useEffect(() => {
        document.title = 'Lacatrip'
    }, [])
    return (
        <div className="">
            <div className="relative">
                <Banner />
                <div className='absolute top-[66vh] max-w-[1535px] z-20 w-full mx-auto'>
                    <SearchMain />
                </div>
                <TopProvince />
                <Recommend />
            </div>
        </div>
    )
}

export default LandingPage
