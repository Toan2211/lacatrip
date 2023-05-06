import React from 'react'
import { Controller } from 'react-hook-form'

function InputField(props) {
    const { form, type, name, placeholder, accept, disabled, className, min, max } = props
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
                        min={min}
                        max={max}
                        accept={accept}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        onChange={field.onChange}
                        value={form.getValues(name)}
                        disabled = {disabled}
                        className={`${error ? ' border-red-500': ''} border border-gray-300 px-2 py-2 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${className}`}
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
