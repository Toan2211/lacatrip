import { provincesSelector } from '@pages/CommonProperty/baseproperty'
import ItemListInstance from '@page-components/ItemListInstance'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import {
    getHotelsClient,
    hotelsClientSelector
} from './hotelclient.slice'
import { HOTELTYPE } from '@constants/instanceType'
import queryString from 'query-string'
import Sidebar from './Sidebar'
import { useTranslation } from 'react-i18next'

function HotelList() {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const provinces = useSelector(provincesSelector)
    const [province, setProvince] = useState('')
    const hotels = useSelector(hotelsClientSelector)
    const dispatch = useDispatch()
    const provinceId = useParams().id
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            key: params.key || '',
            minPrice: params.minPrice || '',
            maxPrice: params.maxPrice || '',
            star: params.star || ''
        }
    }, [location.search])
    useEffect(() => {
        const provinceInarr = provinces.find(
            province => province.id == provinceId
        )
        if (provinceInarr) {
            setProvince(provinceInarr)
        }
    }, [provinceId, provinces])
    useEffect(() => {
        if (queryParams.minPrice && i18n.language === 'vn') {
            queryParams.minPrice = queryParams.minPrice /23000
        }
        if (queryParams.maxPrice && i18n.language === 'vn') {
            queryParams.maxPrice = queryParams.maxPrice /23000
        }
        if (province) {
            dispatch(
                getHotelsClient({
                    ...queryParams,
                    provinceId: provinceId
                })
            )
        }
    }, [provinceId, province, dispatch, queryParams, i18n.language])

    return (
        <div className="max-w-[1535px] px-8 py-5 md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px] min-h-[200vh]">
            <div className="flex items-center h-[330px] pb-4 relative">
                <div className="flex justify-center items-center absolute z-10 w-full">
                    <div className="font-semibold text-2xl text-white">
                        {t('hotel')} {t('in')} {province.name}
                    </div>
                </div>
                <div className="w-full h-full">
                    <img
                        src={province.image}
                        className="w-full h-full object-cover brightness-75"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <div className="w-1/4">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <ul className="flex flex-col gap-4">
                        {hotels.map(hotel => (
                            <ItemListInstance
                                item={hotel}
                                key={hotel.id}
                                type={HOTELTYPE}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HotelList
