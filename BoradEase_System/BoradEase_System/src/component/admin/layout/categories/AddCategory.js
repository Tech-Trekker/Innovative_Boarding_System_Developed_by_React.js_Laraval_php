import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const AddCategory = () => {
    const navigate = useNavigate();

    const[name, setName]= useState('');
    const[description, setdescription]= useState('');
    const[image, setPhoto]= useState('');

    const uploadCategory= async()=>{
        console.log(image)
        const formData= new FormData();
        formData.append('name', name);
        formData.append('description',description);
        formData.append('image', image);
        axios.post(BASE_URL+'/api/categories', formData,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Category Inserted Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/auth/view-categories');
            })
            .catch((e) => {
                Swal.fire({
                    title: 'Warning !',
                    icon: 'warning',
                    text: e,
                    button: 'Ok!'
                });
            });
    }
 
    const handleSubmit= async(e)=>{
      e.preventDefault();
      await uploadCategory();
 
   }
    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Add Category </div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i className='fa fa-cart-plus' aria-hidden='true'></i> Add Categories</div>
                </h5>
                <div className='card-body'>
                    <form className='row g-3'  onSubmit={handleSubmit}>
                        <div className='col-md-6'>
                            <label htmlFor='inputURL' className='form-label'>Image URL</label>
                            <input
                                type='file'
                                className={`form-control`}
                                name='image'
                                id='inputURL'
                                required
                                onChange={(e)=>setPhoto(e.target.files[0])}
                            />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='name' className='form-label'>Category Name</label>
                            <input
                                type='text'
                                className={`form-control`}
                                name='name'
                                id='name'
                                required
                                onChange={ (e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='exampleFormControlTextarea1' className='form-label'>Description</label>
                            <textarea
                                className={`form-control text-lowercase`}
                                name='description'
                                id='exampleFormControlTextarea1'
                                rows='3'
                                required
                                onChange={(e)=>setdescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className='col-12'>
                            <button type='submit' className='btn btn-success'>
                                <i className='fa fa-check-circle' aria-hidden='true'></i> Submit Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
