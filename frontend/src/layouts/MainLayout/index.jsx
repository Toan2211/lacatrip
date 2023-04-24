import Header from '@components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import Footer from '@components/Footer'
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
            <div className='mt-[80px] max-w-[1535px]'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default MainLayout
