import React, { useEffect, useState } from 'react'

function OnePhotoUpload({ form, name }) {
    const [previewSource, setPreviewSource] = useState('')
    const handleChangeImg = e => {
        const file = e.target.files[0]
        if (file) form.setValue(name, file)
        previewFile(file)
    }
    const previewFile = file => {
        if (!file) return
        const reader = new FileReader(file)
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    useEffect(() => {
        if (!form.getValues(name))
            setPreviewSource('')
        // return () => {
        //     setPreviewSource('')
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.getValues(name), form, name])
    return (
        <div className="flex gap-4">
            <div>
                {previewSource && (
                    <img
                        alt="img preview Source"
                        src={previewSource}
                        className="w-auto mx-auto rounded-2xl object-cover object-center h-20"
                    />
                )}
                {!previewSource && form.getValues(name) && (
                    <img
                        alt="img form avatar"
                        src={form.getValues(name)}
                        className="w-auto mx-auto rounded-2xl object-cover object-center h-20"
                    />
                )}
                {!previewSource && !form.getValues(name) && (
                    <img
                        alt="img mac dinh"
                        src="https://via.placeholder.com/300"
                        className="w-auto mx-auto rounded-2xl object-cover object-center h-20"
                    />
                )}
            </div>
            <div className="mt-5">
                <label
                    htmlFor="chooseAvatar"
                    className="mt-2 leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full cursor-pointer"
                >
                    Select Photo
                </label>
                <input
                    type="file"
                    id="chooseAvatar"
                    accept='.svg, .png, .jpg'
                    className="hidden"
                    onChange={handleChangeImg}
                    value={''}
                />
            </div>
        </div>
    )
}

export default OnePhotoUpload
