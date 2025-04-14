import React from 'react'
import Sidebar from './UserPanel/Sidebar'
import Navbar from './UserPanel/Navbar'


function Container({ children }) {
    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='mainLayout-content'>
                <Navbar />
                <div >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Container