import { unwrapResult } from '@reduxjs/toolkit'
import { deleteImage } from '@pages/CommonProperty/baseproperty'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

function PhotoUploads({ addedPhotos, onChange }) {
    const dispatch = useDispatch()
    const handleFileChosen = async file => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader()
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = reject
            fileReader.readAsDataURL(file)
        })
    }
    const readAllFiles = async AllFiles => {
        const results = await Promise.all(
            Array.from(AllFiles).map(async file => {
                const fileContents = await handleFileChosen(file)
                return {
                    url: fileContents,
                    file: file
                }
            })
        )
        return results
    }
    const uploadPhoto = async (event) => {
        const files = event.target.files
        const data = await readAllFiles(files)
        onChange([...addedPhotos, ...data])
    }
    function removePhoto(event, indexItem) {
        event.preventDefault()
        try {
            if (addedPhotos[indexItem].id)
                dispatch(deleteImage(addedPhotos[indexItem].id)).then(res => unwrapResult(res))
            onChange([
                ...addedPhotos.filter((photo, index) => index !== indexItem)
            ])
            toast.success('Delete image successfully',
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                }
            )
        } catch (error) {
            toast.error(error.message ? error.message : 'Error', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }

    }
    return (
        <>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 &&
                    addedPhotos.map((photo, index) => (
                        <div
                            className="h-32 flex relative"
                            key={index}
                        >
                            <img
                                className="rounded-2xl w-full object-cover"
                                src={photo.url}
                                alt={''}
                            />
                            <button
                                onClick={ev => removePhoto(ev, index)}
                                className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={uploadPhoto}
                        accept=".jpg,.jpeg,.png,.svg"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}

export default PhotoUploads
