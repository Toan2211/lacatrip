import { Tooltip } from 'flowbite-react'
import React from 'react'
import { BiArea, BiBed } from 'react-icons/bi'
import { FaChild } from 'react-icons/fa'
import { MdChildCare } from 'react-icons/md'

function RoomCard() {
    return (
        <div className="flex lg:h-[200px] border-[1px] border-slate-200 rounded-xl overflow-hidden">
            <div className="flex-1">
                <img
                    className="w-full h-full object-cover"
                    src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Gulf-Court-Hotel-Business-Bay-800x600.png"
                />
            </div>
            <div className="flex-1 border-r-[1px] border-slate-200 p-3">
                <span className="text-sm text-blue-700 font-semibold">
                    Queen Room Discovery
                </span>
                <ul className="mt-10 flex gap-2 mx-auto">
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content="Area" style="light">
                                <BiArea />
                            </Tooltip>
                        </span>
                        <span className="text-sm">150m2</span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content="Bed" style="light">
                                <BiBed />
                            </Tooltip>
                        </span>
                        <span className="text-sm">x1</span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content="Adult" style="light">
                                <FaChild />
                            </Tooltip>
                        </span>
                        <span className="text-sm">x1</span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content="Children" style="light">
                                <MdChildCare />
                            </Tooltip>
                        </span>
                        <span className="text-sm">x1</span>
                    </li>
                </ul>
            </div>
            <div className="flex-1  justify-center flex items-center font-medium lg:text-lg text-sm">
                $350 / night
            </div>
        </div>
    )
}

export default RoomCard
