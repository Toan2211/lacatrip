import React from 'react'

function Mybutton(props) {
    return (
        <button {...props}>
            {props.isloading ? (
                <div className="inline-block h-[18px] w-[18px] animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            ) : (
                props.children
            )}
        </button>
    )
}

export default Mybutton
