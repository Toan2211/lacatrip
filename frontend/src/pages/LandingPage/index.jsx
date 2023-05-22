import { useSystemAuthenticated } from '@hooks/useSystemAuthenticated'
import { path } from '@constants/path'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from './Banner'
import SearchMain from './SearchMain'
import TopProvince from './TopProvince'
import Recommend from './Recommend'
import { useDispatch, useSelector } from 'react-redux'
import { provincesSelector } from '@pages/CommonProperty/baseproperty'
import { getProvinces } from '@pages/CommonProperty/baseproperty'

function LandingPage() {
    const isSystem = useSystemAuthenticated()
    const navigate = useNavigate()
    const provinces = useSelector(provincesSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isSystem) navigate(path.system)
    }, [navigate, isSystem])
    useEffect(() => {
        document.title = 'Lacatrip'
        if (provinces.length === 0)
            dispatch(getProvinces())
    }, [dispatch, provinces])
    return (
        <div className="">
            <div className="relative">
                <Banner />
                <div className='absolute top-[66vh] max-w-[1535px] z-20 w-full mx-auto'>
                    <SearchMain />
                </div>
                <TopProvince provinces = {provinces} />
                <Recommend />
            </div>
        </div>
    )
}

export default LandingPage
