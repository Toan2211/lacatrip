import React from 'react'

export default function SidebarMobile({ children, isOpen, onClose }) {
    return (
        <main
            className={
                'fixed z-30 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out mt-20 overflow-hidden lg:hidden' +
                (isOpen
                    ? ' transition-opacity opacity-100 duration-500 translate-x-0'
                    : ' transition-all delay-500 opacity-0 translate-x-[-300px]')
            }
        >
            <section
                className={
                    ' w-1/2 max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform overflow-hidden'+
                    (isOpen
                        ? ' translate-x-0'
                        : ' translate-x-[-300px]')
                }
            >
                <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
                    {children}
                </article>
            </section>
            <section
                className=" w-screen h-full cursor-pointer "
                onClick={onClose}
            ></section>
        </main>
    )
}
