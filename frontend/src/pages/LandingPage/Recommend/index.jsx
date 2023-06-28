import React, { useState } from 'react'
import RecommendHotel from './RecommendHotel'
import RecommendDestination from './RecommendDestination'
import RecommendRestaurant from './RecommendRestaurant'
// 0 hotel 1 restaurant 2 destination travel
function Recommend() {
    const [typeFlag, setTypeFlag] = useState(0)
    return (
        <section className="max-w-[1535px] px-8 py-5 mt-[26vh] md:mt-40 md:px-10 lg:mt-16 lg:px-20 bg-slate-50 mb-[20vh] pb-[100px]">
            <header className="text-center font-semibold text-3xl mb-5">
                Gợi ý dành cho bạn
            </header>
            <div className="flex gap-3 justify-center font-semibold mb-10">
                <button
                    onClick={() => setTypeFlag(0)}
                    className={`${
                        typeFlag === 0
                            ? 'bg-blue-500 text-white '
                            : 'bg-white'
                    } border-gray-300 border  p-2 rounded-md`}
                >
                    Khách sạn
                </button>
                <button
                    onClick={() => setTypeFlag(1)}
                    className={`${
                        typeFlag === 1
                            ? 'bg-blue-500 text-white '
                            : 'bg-white'
                    } border-gray-300 border  p-2 rounded-md`}
                >
                    Nhà hàng
                </button>
                <button
                    onClick={() => setTypeFlag(2)}
                    className={`${
                        typeFlag === 2
                            ? 'bg-blue-500 text-white '
                            : 'bg-white'
                    } border-gray-300 border  p-2 rounded-md`}
                >
                    Tour du lịch
                </button>
            </div>
            {typeFlag === 0 && <RecommendHotel />}
            {typeFlag === 1 && <RecommendRestaurant />}
            {typeFlag === 2 && <RecommendDestination />}

        </section>
    )
}

export default Recommend
