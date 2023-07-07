import Drawer from '@components/Drawer'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRoomDetail, currentRoomSelector } from '../room.slice'
import { currentHotelSelector } from '../../hotel.slice'
import Mybutton from '@components/MyButton'
// import ToggleButton from '@components/ToggleButton'
import { useTranslation } from 'react-i18next'
import { selectUser } from '@pages/Auth/auth.slice'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
const DetailRoomCard = ({ roomDetail }) => {
    return (
        <li className="flex gap-4 mb-3 items-center">
            <div className=" border-blue-500 border px-5 py-2 font-semibold w-[100px] rounded-md text-center">
                {roomDetail.roomNo}
            </div>
            {/* <div>
                <ToggleButton
                    status={roomDetail.isOpen}
                    // onClick={() => console.log('a')}
                />
            </div> */}
        </li>
    )
}
function RoomDetailForm({ onClose, open }) {
    const { t } = useTranslation()
    const currentHotel = useSelector(currentHotelSelector)
    const currentRoom = useSelector(currentRoomSelector)
    const dispatch = useDispatch()
    const profile = useSelector(selectUser)
    const [roomNoInput, setRoomNoInput] = useState('')
    const handleAddRoomDetail = async () => {
        if (roomNoInput === '') {
            return
        }
        if (currentRoom.roomDetails.map(room => Number(room.roomNo)).includes(Number(roomNoInput))) {
            toast.error(t('roomDetailerror'), {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
            return
        }
        try {
            await dispatch(addRoomDetail({
                hotelId: currentHotel.id,
                roomNo: roomNoInput,
                roomTypeId: currentRoom.id
            }))
            setRoomNoInput('')
            toast.success(t('roomDetailsuccess'), {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    const handleKeyDown = (e) => {
        if (!((e.keyCode === 8) || (e.keyCode >= 48 && e.keyCode <= 57))) {
            e.preventDefault()
        }
    }
    const onChange = (e) => {
        setRoomNoInput(e.target.value)
    }
    return (
        <Drawer isOpen={open} onClose={onClose}>
            <header className="font-bold bg-slate-50 p-4">
                {t('manageRoomType')}{' '}
                {currentRoom && currentRoom.title} {t('of')}{' '}
                {currentHotel.name}
            </header>
            <ul className="p-6">
                {currentRoom.roomDetails &&
                    [...currentRoom.roomDetails]
                        .sort((a, b) => a.roomNo - b.roomNo)
                        .map(roomDetail => (
                            <DetailRoomCard
                                key={roomDetail.id}
                                roomDetail={roomDetail}
                            />
                        ))}
                {profile.serviceManagerId && (
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-4 mb-3 items-center">
                            <input
                                className=" border-blue-500 border font-semibold w-[100px] rounded-md text-center"
                                type="number"
                                min={1}
                                value={roomNoInput}
                                onChange={(e) => onChange(e)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div>
                            <Mybutton
                                className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleAddRoomDetail}
                            >
                                {t('add') + ' ' + t('room')}
                            </Mybutton>
                        </div>
                    </div>
                )}
            </ul>
        </Drawer>
    )
}

export default RoomDetailForm
