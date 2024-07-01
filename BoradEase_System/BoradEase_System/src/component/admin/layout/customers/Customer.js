import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const Customer = () => {
    const [getUsers, setUsers] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL+'/api/customers')
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const deleteCustomer = (e, id) => {
        const clickBtn = e.currentTarget;
        clickBtn.innerText = 'Deleting';

        axios.delete(BASE_URL+'/api/customers/' + id,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
           })
            .then(res => {
                setUsers(prevProducts => prevProducts.filter(product => product.id !== id));
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                console.error('Error deleting product:', err);
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'An error occurred while deleting the product.',
                    button: 'Ok'
                });
            })
            .finally(() => {
                clickBtn.innerText = 'Delete';
            });
    };
    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Customer</div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i className='bx bxs-user-detail'></i> Customers</div>
                </h5>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-primary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Join Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getUsers.length > 0 ?
                                        getUsers.map((user, index) => (
                                            <tr key={user.id}>
                                                <th scope="row">{++index}</th>
                                                <td>{user.name}</td>
                                                <td className='text-lowercase'>{user.email}</td>
                                                <td>{user.created_at}</td>
                                                <td className='text-center'>
                                                    <button onClick={(e) => deleteCustomer(e, user.id)} className='btn btn-danger btn-table'>
                                                        <i className='bx bxs-message-square-x'></i> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No Customers found</td>
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

export default Customer;
