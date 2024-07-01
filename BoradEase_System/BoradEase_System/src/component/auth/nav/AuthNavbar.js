import React from 'react'

import logo  from './Blue White Elegant Homes Tech Logo .png'

import './Navbar.css';

const AuthNavbar = () => {
    return (
        <div className='container-fluid bg-dark bg-gradient footer py-3'>
            <div className='container'>
                <a class="navbar-brand" href="#">
                    <img src={logo} alt="" className='logo' />
                </a>
            </div>
        </div>
    )
}

export default AuthNavbar