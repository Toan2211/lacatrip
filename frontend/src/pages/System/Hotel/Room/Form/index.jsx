import Drawer from '@components/Drawer'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import TextArea from '@components/TextArea'
import React from 'react'
import { useForm } from 'react-hook-form'

function RoomForm({ onClose, open }) {
    const form = useForm()
    const handleSubmit = data => {
        return data
    }
    return (
        <Drawer isOpen={open} onClose={onClose}>
            <header className="font-bold bg-slate-50 p-4">
                Add Room
            </header>
            <div className="p-5">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Title
                        </label>
                        <InputField
                            placeholder="Title"
                            type="input"
                            form={form}
                            name="title"
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
                            rows={2}
                        />
                    </div>
                    <div className="relative w-full mb-2 flex space-x-4 ">
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Price
                            </label>
                            <InputField
                                placeholder="Price"
                                type="number"
                                form={form}
                                name="price"
                            />
                        </div>
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Original Price
                            </label>
                            <InputField
                                placeholder="Price"
                                type="number"
                                form={form}
                                name="originalPrice"
                            />
                        </div>
                    </div>
                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Max People
                        </label>
                        <InputField
                            placeholder="Max people"
                            type="number"
                            form={form}
                            name="maxPeople"
                        />
                    </div>
                    <div className="mt-6 text-right">
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4 ease-linear transition-all duration-150"
                            type="submit"
                        >
                            Create
                        </Mybutton>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}

export default RoomForm
