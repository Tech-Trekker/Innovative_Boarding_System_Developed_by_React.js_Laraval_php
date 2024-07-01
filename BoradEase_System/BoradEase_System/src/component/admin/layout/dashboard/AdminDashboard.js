import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const AdminDashboard = () => {

    const [getTotalProduct, setTotalProduct] = useState(0);
    const [getTotalOrder, setTotalOrder] = useState(0);
    const [getTotalCustomer, setTotalCustomer] = useState(0);

    useEffect(() => {
        countProduct();
        countOrder();
        countCustomer();
    }, []);

    const countProduct = () =>{
        axios.get(BASE_URL+'/count').then(res => {
            console.log(res.data);
            setTotalProduct(res.data);
        }).catch((e) => {
            console.log(e)
        })
    }

    const countOrder = () =>{
        axios.get(BASE_URL+'/count-order').then(res => {
            console.log(res.data);
            setTotalOrder(res.data);
        }).catch((e) => {
            console.log(e)
        })
    }

    const countCustomer = () =>{
        axios.get(BASE_URL+'/countByRoleZero').then(res => {
            console.log(res.data);
            setTotalCustomer(res.data);
        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>{getTotalCustomer}<br /><span>Customers</span></p>
                        <i className="fa fa-users box-icon"></i>
                    </div>
                </div>

                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>{getTotalProduct}<br /><span>Products</span></p>
                        <i className='bx bxl-product-hunt box-icon' ></i>
                    </div>
                </div>

                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>{getTotalOrder}<br /><span>Orders</span></p>
                        <i className="fa fa-shopping-bag box-icon"></i>
                    </div>
                </div>

                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>04<br /><span>Category</span></p>
                        <i className='bx bxs-category box-icon'></i>
                    </div>
                </div>
            </div>


            <div className='row mt-5'>
                <div className='col-12'>
                    <div className="col-div-4">
                        <div className="box-4">
                            <div className="content-box">
                                <p>Total Sale <span>Sell All</span></p>

                                <div className="circle-wrap">
                                    <div className="circle">
                                        <div className="mask full">
                                            <div className="fill"></div>
                                        </div>
                                        <div className="mask half">
                                            <div className="fill"></div>
                                        </div>
                                        <div className="inside-circle"> 70% </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard