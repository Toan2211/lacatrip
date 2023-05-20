import React from 'react'
import Skeleton from 'react-loading-skeleton'

function RecommendSkeletonCard() {
    return (
        <div className=" overflow-hidden rounded-2xl bg-white shadow-md flex flex-col h-[468px] hover:shadow-2xl cursor-pointer group">
            <div className=" overflow-hidden">
                <Skeleton height={260} />
            </div>
            <div className="p-4 flex-1">
                <div className=" text-yellow-400 flex gap-1">
                    <Skeleton />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold line-clamp-2">
                        <Skeleton />
                    </span>
                    <span className="font-medium text-gray-400">
                        <Skeleton />
                    </span>
                </div>
            </div>
            <div className="px-4 pb-4 border-t-2 border-b-slate-100 pt-4">
                <span>
                    <span className="font-normal text-gray-400">
                        <Skeleton />
                    </span>
                </span>
                <div className="mt-4">
                    <span className="font-normal text-gray-400">
                    </span>
                    <span className="font-bold">
                        <Skeleton />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RecommendSkeletonCard
