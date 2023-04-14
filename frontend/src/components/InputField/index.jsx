import React from 'react'
import { Controller } from 'react-hook-form'

function InputField(props) {
    const { form, type, name, placeholder, accept, disabled } = props
    const {
        formState: { errors }
    } = form
    const error = errors[name]

    return (
        <div className="flex flex-col">
            <Controller
                name={name}
                control={form.control}
                render={({ field }) => (
                    <input
                        accept={accept}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        onChange={field.onChange}
                        value={form.getValues(name)}
                        disabled = {disabled}
                        className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                )}
            />
            <span className="text-[14px] text-red-500 pl-2 mt-1">
                {error && error.message}
            </span>
        </div>
    )
}

export default InputField
