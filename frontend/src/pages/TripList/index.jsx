import React, { useEffect, useState } from 'react'
import TripCard from './TripCard'
import { Modal } from 'flowbite-react'
import InputField from '@components/InputField'
import { useForm } from 'react-hook-form'

function TripList() {
    const [showModal, setShowModal] = useState(false)
    const onClose = () => setShowModal(false)
    useEffect(() => {
        document.title = 'Trips'
    }, [])
    const form = useForm()
    return (
        <>
            <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px] min-h-[100vh]">
                <div className="flex justify-between mb-10">
                    <header className="font-bold text-3xl">
                        Your Plan Trip
                    </header>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold px-3 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 flex items-center"
                    >
                        <span className="font-semibold text-lg mr-3 mb-1">
                            +
                        </span>
                        <span className="text-sm">Plan new trip</span>
                    </button>
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                    <TripCard />
                    <TripCard />
                    <TripCard />
                    <TripCard />
                    <TripCard />
                    <TripCard />
                    <TripCard />
                </div>
            </div>
            <Modal show={showModal} onClose={onClose} size="md">
                <Modal.Header>Create Trip</Modal.Header>
                <Modal.Body>
                    <div className="relative w-full mb-2">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Trip Name
                        </label>
                        <InputField
                            placeholder="Trip Name"
                            type="input"
                            form={form}
                            name="name"
                        />
                    </div>
                    <button className='bg-blue-500 text-white active:bg-blue-800 text-sm font-bold px-4 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 flex items-center ml-auto'>Create</button>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default TripList
