import React from 'react'
import { toast } from 'react-toastify'

function LikeAndShare() {
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success('Copied Link', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            hideProgressBar: true
        })
    }
    return (
        <div className="flex-end flex gap-4">
            <div className="flex gap-1 cursor-pointer hover:bg-slate-100 hover:border-slate-200  border-2  border-transparent px-2 py-1 rounded-xl">
                <span>
                    <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="red"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Interface / Heart_02">
                            <path
                                id="Vector"
                                d="M19.2373 6.23731C20.7839 7.78395 20.8432 10.2727 19.3718 11.8911L11.9995 20.0001L4.62812 11.8911C3.15679 10.2727 3.21605 7.7839 4.76269 6.23726C6.48961 4.51034 9.33372 4.66814 10.8594 6.5752L12 8.00045L13.1396 6.57504C14.6653 4.66798 17.5104 4.51039 19.2373 6.23731Z"
                                stroke="red"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </span>
                <span>Save</span>
            </div>
            <div
                className="flex gap-1 cursor-pointer hover:bg-slate-100 hover:border-slate-200  border-2  border-transparent px-2 py-1 rounded-xl"
                onClick={handleShare}
            >
                <span>
                    <svg
                        fill="#000000"
                        width="20px"
                        height="20px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>share</title>
                        <path d="M0 25.472q0 2.368 1.664 4.032t4.032 1.664h18.944q2.336 0 4-1.664t1.664-4.032v-8.192l-3.776 3.168v5.024q0 0.8-0.544 1.344t-1.344 0.576h-18.944q-0.8 0-1.344-0.576t-0.544-1.344v-18.944q0-0.768 0.544-1.344t1.344-0.544h9.472v-3.776h-9.472q-2.368 0-4.032 1.664t-1.664 4v18.944zM5.696 19.808q0 2.752 1.088 5.28 0.512-2.944 2.24-5.344t4.288-3.872 5.632-1.664v5.6l11.36-9.472-11.36-9.472v5.664q-2.688 0-5.152 1.056t-4.224 2.848-2.848 4.224-1.024 5.152zM32 22.080v0 0 0z"></path>
                    </svg>
                </span>
                <span>Share</span>
            </div>
        </div>
    )
}

export default LikeAndShare
