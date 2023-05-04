import InputField from '@components/InputField'
import TextArea from '@components/TextArea'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function FormHotel() {
    useEffect(() => {
        document.title = 'Form Hotel'
    }, [])
    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
            phone: ''
        },
        // resolver: yupResolver(schema)
    })
    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                Add Hotels
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto px-4">
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Name
                        </label>
                        <InputField
                            placeholder="Name Hotel"
                            form={form}
                            name="name"
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Description
                        </label>
                        <TextArea
                            placeholder="Description Hotel..."
                            form={form}
                            name="description"
                            rows = {2}
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Phone
                        </label>
                        <InputField
                            placeholder="Phone hotel to contact"
                            form={form}
                            name="phone"
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Website
                        </label>
                        <InputField
                            placeholder="Website of hotel"
                            form={form}
                            name="website"
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Hotel Class
                        </label>
                        <InputField
                            placeholder="Range Hotel from 1 to 5 stars"
                            form={form}
                            name="hotelClass"
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Hotel Style
                        </label>
                        <InputField
                            placeholder="Style of Hotel. Ex: Romantic, Loves,..."
                            form={form}
                            name="hotelStyle"
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Staring Price ($)
                        </label>
                        <InputField
                            placeholder="Staring Price (Price of normal room)"
                            form={form}
                            name="cheapestPrice"
                            type = "number"
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Address
                        </label>
                        <InputField
                            placeholder="Address is required, it will show in Maps"
                            form={form}
                            name="address"
                        />
                    </div>
                    <div className="relative w-full mb-2 flex space-x-4 ">
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Longtitude
                            </label>
                            <InputField
                                placeholder="Longtitude of hotel"
                                type="number"
                                form={form}
                                name="longtitude"
                                disabled = {true}
                            />
                        </div>
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Latitude
                            </label>
                            <InputField
                                placeholder="Latitude of hotel"
                                type="number"
                                form={form}
                                name="latitude"
                                disabled = {true}
                            />
                        </div>
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Amenities Of Hotel
                        </label>
                        <InputField
                            placeholder="Address is required, it will show in Maps"
                            form={form}
                            name="address"
                            type="checkbox"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormHotel
