import React from 'react'
import { Controller } from 'react-hook-form'

function TextArea(props) {
    const {
        form,
        name,
        placeholder,
        disabled,
        className,
        rows
    } = props
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
                    <textarea
                        type="text"
                        className={`${
                            error ? ' border-red-500' : ''
                        } border border-gray-300 px-3 py-3 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${className} resize-none`}
                        placeholder={placeholder}
                        rows={rows ? rows : '4'}
                        onChange={field.onChange}
                        value={form.getValues(name)}
                        name={name}
                        disabled = {disabled}
                    ></textarea>
                )}
            />
            <span className="text-[14px] text-red-500 pl-2 mt-1">
                {error && error.message}
            </span>
        </div>
    )
}

export default TextArea
