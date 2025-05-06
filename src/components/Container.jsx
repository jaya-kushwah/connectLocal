import React from 'react'
import Sidebar from './UserPanel/Sidebar'
import Navbar from './UserPanel/Navbar'


function Container({ children }) {
    return (
        <div className='d-flex w-100 position-relative'>
            <Sidebar />
            <div >
                <Navbar />
                <div className='mainLayout-content position-absolute top-1' >
                    {children}
                </div>
            </div>
        </div>
    )
}
  

export default Container

