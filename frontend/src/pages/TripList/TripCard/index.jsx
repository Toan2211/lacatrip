import React from 'react'

function TripCard() {
    return (
        <div className="overflow-hidden rounded-2xl bg-white flex flex-col h-[300px] cursor-pointer group">
            <div className=" overflow-hidden rounded-xl">
                <img
                    className="h-[200px] w-full object-cover group-hover:scale-125 transition-transform rounded-xl"
                    src={
                        'https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImage/ItdeP0WWcQ6NhVHGPJIPDFtU36du76JG'
                    }
                />
            </div>
            <div className="p-2 flex-1">
                <div className="flex flex-col pb-2">
                    <span className="font-semibold line-clamp-2">
                        Trip to Ba Na Hill
                    </span>
                </div>
                <div className="flex text-sm text-gray-400 gap-2">
                    <span className="block w-6 h-6 rounded-full overflow-hidden">
                        <img
                            src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImage/ItdeP0WWcQ6NhVHGPJIPDFtU36du76JG"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </span>
                    <span>•</span>
                    <span>14 Apr – 22 Jun</span>
                    <span>•</span>
                    <span>10 places</span>
                </div>
            </div>
        </div>
    )
}

export default TripCard
