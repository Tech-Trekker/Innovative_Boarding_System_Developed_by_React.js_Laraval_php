import React, { useEffect, useState } from 'react'
import { AdminNavBank } from './AdminNavBank'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-scroll';

import logo from './logo.png'
import { UserNavBank } from './UserNavBank';

const AdminNavbar = () => {

    const navigate = useNavigate()

    const [activeLink, setActiveLink] = useState('');

    const handleClick = (link) => {
        setActiveLink(link);
    };

    useEffect(() => {
        setActiveLink('Dashboard');
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div id="bdSidebar" className="d-flex flex-column flex-shrink-0 p-4 position-fixed overflow-auto vh-100 bg-dark bg-gradient text-white offcanvas-lg offcanvas-start" style={{ width: '280px' }}>

            <a className="navbar-brand navbar-brand text-center" href="#">
                <img src={logo} alt="" width={150} />
            </a>
            <hr />

                    <ul className="mynav nav nav-pills flex-column mb-auto">
                        {
                            AdminNavBank.map((linkBank) => (
                                <li className="nav-item" key={linkBank.id}>
                                    <RouterLink
                                        to={linkBank.link}
                                        className={`${activeLink === linkBank.linkName ? 'active' : 'notactive'}`}
                                        onClick={() => handleClick(linkBank.linkName)}
                                    >
                                        <i className={linkBank.icon}></i> {linkBank.linkName}
                                    </RouterLink>
                                </li>
                            ))
                        }
                    </ul>
            <Button className='btn btn-danger' onClick={logout}><i className='bx bx-log-out'></i> Logout</Button>
        </div>
    )
}

export default AdminNavbar