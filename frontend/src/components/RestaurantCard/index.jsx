import { RESTAURANTTYPE } from '@constants/instanceType'
import LikeToTrip from '@page-components/LikeToTrip'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { formatMoney } from '@utils/formatMoney'

function RestaurantCard({ data }) {
    const { t } = useTranslation()
    return (
        <div className="relative">
            <NavLink
                to={`/restaurant/${data.id}`}
                className=" overflow-hidden rounded-2xl bg-white shadow-md flex flex-col h-[468px]  hover:shadow-2xl cursor-pointer group"
            >
                <div className="overflow-hidden">
                    <img
                        className="h-[260px] w-full object-cover  group-hover:scale-125 transition-transform"
                        src={
                            (data.images || []).length > 0 &&
                            data.images[0].url
                        }
                    />
                </div>
                <div className="p-4 flex-1">
                    <div className="flex flex-col pb-2">
                        <span className="font-semibold line-clamp-2">
                            {data.name}
                        </span>
                        <span className="font-medium text-gray-400">
                            {data?.province?.name || ''}
                        </span>
                    </div>
                </div>
                <div className="px-4 pb-4 border-t-2 border-b-slate-100 pt-4">
                    <span>
                        <span className="text-blue-800 bg-blue-100 border-[1px] border-blue-400 font-medium rounded-md text-md p-1 mr-4">
                            {data.rating} / 5
                        </span>
                        <span className="font-normal text-gray-400">
                            {data.totalRating} {t('review')}
                        </span>
                    </span>
                    <div className="mt-4">
                        <span className="font-normal text-gray-400">
                            {t('from')}:{' '}
                        </span>
                        <span className="font-bold">
                            {formatMoney(data.minPrice, t('moneyType'))} - {formatMoney(data.maxPrice, t('moneyType'))}
                        </span>
                    </div>
                </div>
            </NavLink>
            <LikeToTrip id={data.id} type={RESTAURANTTYPE} />
        </div>
    )
}

export default RestaurantCard
