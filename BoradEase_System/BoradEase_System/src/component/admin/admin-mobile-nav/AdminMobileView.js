import React from 'react'
import user from './user.png'
import './AdminMobileView.css'
import {useNavigate } from 'react-router-dom';
const AdminMobileView = () => {

    var userName = localStorage.getItem('auth');
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className='container-fliud text-white bg-dark bg-gradient py-4 sticky-top'>
            <div className='container d-flex justify-content-between'>
                <div className='d-lg-none'>
                    <a href="#" className="text-white" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar">
                        <i className="fas fa-bars"></i>
                    </a>
                    <span className='ms-3'>Board <span className='daily'>Ease</span></span>
                </div>

                <div className='d-none d-lg-block'>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

                <div className=''>
                    <div className="dropdown ms-3">
                        <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={user} width={30} className='user' /> {userName}
                        </div>
                        <ul className="dropdown-menu bg-dark bg-gradient">
                            <li><a className="dropdown-item text-white" href="#"><i className='bx bxs-user'></i> <span className='drop'>My Profile</span></a></li>
                            <li><a className="dropdown-item text-white" href="#"><i className='fa fa-cog'></i> <span className='drop'>Settings</span></a></li>
                            <li><a className="dropdown-item text-white" href="#" onClick={logout}><i className='bx bx-log-out'></i> <span className='drop'>Logout</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMobileView