import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../../App';

const OrderView = () => {
    const [getTotalOrder, setTotalOrder] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [invoiceDate, setInvoiceDate] = useState();
    const [customerName, setCustomerName] = useState();
    const [products, setProducts] = useState([]);
    const [invoiceNumber, setInvoiceNumber] = useState([]);

    let totalAmount = 0;

    useEffect(() => {
        axios.get(BASE_URL + '/totalOrder')
            .then(res => {
                setTotalOrder(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const openModal = (order) => {
        setSelectedOrder(order);

        totalOrder(order);
    };

    const totalOrder = (order) => {
        axios.get(BASE_URL + '/invoice/' + order[0])
            .then(res => {
                setInvoice(res.data);
                setInvoiceDate(res.data[0].date);
                setCustomerName(res.data[0].userName)
                setInvoiceNumber(res.data[0].invoiceNumber);
                setProducts(res.data);
                console.log(res.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Order View</div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i className='bx bxs-doughnut-chart'></i> Order View</div>
                </h5>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-primary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Invoice Number</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getTotalOrder.length > 0 ?
                                        getTotalOrder.map((order, index) => (
                                            <tr key={index}>
                                                <th scope="row">{++index}</th>
                                                <td>#{order[0]}</td>
                                                <td>{order[1]}</td>
                                                <td>{order[2]}</td>
                                                <td className='text-end'>{order[3].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                                <td className='text-center'><button className='btn btn-warning'>Pending</button></td>
                                                <td className='text-center'><button className='btn btn-primary' type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => openModal(order)}>View Order</button></td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-danger">No orders found</td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade modal-lg" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Order Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive mt-3">
                                <table className="table table-bordered text-center table-info">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Invoice Number</th>
                                            <th className="fw-bold">CUSTOMER NAME</th>
                                            <th className="fw-bold">ORDER DATE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#{invoiceNumber}</td>
                                            <td>{customerName}</td>
                                            <td>{invoiceDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="table-responsive mt-3">
                                <table className="table table-striped table-bordered table-hover table-success">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Description</th>
                                            <th scope="col" className="text-center">
                                                QTY
                                            </th>
                                            <th scope="col" className="text-center">
                                                UNIT PRICE
                                            </th>
                                            <th scope="col" className="text-center">
                                                AMOUNT
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => {
                                            totalAmount += product.qty * product.price;
                                            return (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>{product.name}</td>
                                                    <td className="text-center">{product.qty}</td>
                                                    <td className="text-end">
                                                        {product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    </td>
                                                    <td className="text-end">
                                                        {(product.qty * product.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        <tr>
                                            <td colSpan={3}></td>
                                            <td className="text-center">-</td>
                                            <td className="text-center">-</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} className="text-center font-monospace fst-italic">
                                                Thank you for your business!
                                            </td>
                                            <td colSpan={2} className="font-monospace fw-bold">
                                                Total
                                            </td>
                                            <td className="text-end text-primary">
                                                Rs {totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderView;
