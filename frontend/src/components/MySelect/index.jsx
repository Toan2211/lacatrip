import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
function MySelect(props) {
    const { form, name, options, placeholder } = props
    const {
        formState: { errors }
    } = form
    const error = errors[name]

    return (
        <div className="flex flex-col">
            <Controller
                control={form.control}
                // defaultValue={default_value}
                name={name}
                render={({ field: { onChange, value, ref } }) => (
                    <Select
                        inputRef={ref}
                        classNamePrefix="addl-class"
                        placeholder={placeholder}
                        options={options}
                        value={options.find(c => c.value === value)}
                        onChange={val => onChange(val.value)}
                    />
                )}
            />
            <span className="text-[14px] text-red-500 pl-2 mt-1">
                {error && error.message}
            </span>
        </div>
    )
}

export default MySelect
