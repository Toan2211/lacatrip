import React from 'react'
const CardTopProvince = () => {
    return (
        <div className="relative cursor-pointer h-[300px] scale-95 hover:scale-100 ease-in duration-300 overflow-hidden">
            <img
                src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/California.jpg"
                className="rounded-2xl cursor-pointer object-cover brightness-75"
            />
            <div className="absolute top-0 text-white flex flex-col items-center w-full h-full justify-center">
                <span className="font-bold text-xl">Ha Noi</span>
                <span className="font-semibold flex gap-2">
                    <span>18 Activities</span>
                    <span>•</span>
                    <span>18 Hotels</span>
                    <span>•</span>
                    <span>18 Restaurants</span>
                </span>
            </div>
        </div>
    )
}
function TopProvince() {
    return (
        <section className="max-w-[1535px] px-8 py-5 mt-[26vh] md:mt-40 md:px-10 lg:mt-16 lg:px-20">
            <header className="text-center font-semibold text-3xl mb-5">
                Top destinations
            </header>
            <div className="grid gap-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <CardTopProvince />
                <CardTopProvince />
                <CardTopProvince />
                <CardTopProvince />
                <CardTopProvince />
                <CardTopProvince />
            </div>
        </section>
    )
}

export default TopProvince
