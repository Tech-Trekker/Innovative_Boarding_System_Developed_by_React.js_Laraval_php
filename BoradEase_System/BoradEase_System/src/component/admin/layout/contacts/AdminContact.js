import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const Contact = () => {
    const [getContacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL+'/api/contacts',
           {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}
        )
            .then(res => {
                setContacts(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Contact</div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i className='bx bxs-user-detail'></i> Contacts</div>
                </h5>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-primary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ContactName</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getContacts.length > 0 ?
                                        getContacts.map((contact, index) => (
                                            <tr key={contact.id}>
                                                <th scope="row">{++index}</th>
                                                <td>{contact.first_name}{contact.last_name}</td>
                                                <td className='text-lowercase'>{contact.email}</td>
                                                <td>{contact.phone}</td>
                                                <td>{contact.message}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No Contacts found</td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
