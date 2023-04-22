import Header from '@components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
MainLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
}
function MainLayout() {
    return (
        <>
            <Header />
            <div className='mt-[80px] px-10 max-w-[1535px]'>
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout
