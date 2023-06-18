import Drawer from '@components/Drawer'
import React from 'react'
import { useSelector } from 'react-redux'
import { currentRoomSelector } from '../room.slice'
import { currentHotelSelector } from '../../hotel.slice'
import Mybutton from '@components/MyButton'
import ToggleButton from '@components/ToggleButton'
const DetailRoomCard = ({ roomDetail }) => {
    return (
        <li className="flex gap-4 mb-3 items-center">
            <div className=" border-blue-500 border px-5 py-2 font-semibold w-[100px] rounded-md text-center">
                {roomDetail.roomNo}
            </div>
            <div>
                <ToggleButton
                    status={roomDetail.isOpen}
                    // onClick={() => console.log('a')}
                />
            </div>
        </li>
    )
}
function RoomDetailForm({ onClose, open }) {
    const currentHotel = useSelector(currentHotelSelector)
    const currentRoom = useSelector(currentRoomSelector)
    return (
        <Drawer isOpen={open} onClose={onClose}>
            <header className="font-bold bg-slate-50 p-4">
                Manage room type {currentRoom && currentRoom.title} of{' '}
                {currentHotel.name}
            </header>
            <ul className="p-6">
                {currentRoom.roomDetails &&
                    currentRoom.roomDetails.map(roomDetail => (
                        <DetailRoomCard
                            key={roomDetail.id}
                            roomDetail={roomDetail}
                        />
                    ))}
                <div className="flex gap-4 items-center">
                    <div className="flex gap-4 mb-3 items-center">
                        <input
                            className=" border-blue-500 border font-semibold w-[100px] rounded-md text-center"
                            type="number"
                            min={1}
                        />
                    </div>
                    <div>
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Add Room Detail
                        </Mybutton>
                    </div>
                </div>
            </ul>
        </Drawer>
    )
}

export default RoomDetailForm
