import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const UpdateCategory = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const { id } = useParams();

    const [inputs, setInputs] = useState({
        name: "",
        description: ""
    })

    useEffect(() => {
        axios.get(BASE_URL+"/api/categories/show/" + id).then(res => {
            console.log(res)
            setInputs({
                name: res.data.name,
                description: res.data.description
            })
        });
    }, []);

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleFormsubmit = (event) => {
        event.preventDefault();

        let data = {
            name: inputs.name,
            description: inputs.description
        }

        axios.put(BASE_URL+'/api/categories/' + id, data,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Record Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(-1);
        }).catch((e) => {
            Swal.fire({
                title: "Warning !",
                icon: 'warning',
                text: e,
                button: "Ok!"
            });
        })
    }

    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Update Category </div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='d-flex justify-content-between'>
                        <div className='admin-text fw-bold fs-3'><i class="fa fa-cart-plus" aria-hidden="true"></i> Update Category</div>
                        <div><button type="button" className="btn btn-primary" onClick={goBack}><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Go Back</button></div>
                    </div>
                </h5>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-12'>
                            <form className="row g-3" onSubmit={handleFormsubmit}>
                                <div className="col-12 col-md-12">
                                    <label for="name" className="form-label">Category Name</label>
                                    <input type="text" className="form-control" name='name' value={inputs.name} onChange={handleChange} id="name" required />
                                </div>
                                <div className="col-12">
                                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea className="form-control text-lowercase" name='description' value={inputs.description} onChange={handleChange} id="exampleFormControlTextarea1" rows="3" required></textarea>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-success"><i className="fa fa-check-circle" aria-hidden="true"></i> Update Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCategory