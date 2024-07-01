import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const AddProducts = () => {
    const [getCategory, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(true);
    const navigate = useNavigate();

    const[name, setName]= useState('');
    const[description, setDescription]= useState('');
    const[slug, setSlug]= useState('');
    const[discount, setDiscount]= useState('');
    const[price, setPrice]= useState('');
    const[category_id, setCategoryId]= useState('');
    const[image, setPhoto]= useState('');

    useEffect(() => {
        axios.get(BASE_URL+'/api/category_products')
            .then(res => {
                setCategory(res.data);
                setLoading(false);
                setErrorLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);
    const uploadProduct= async()=>{
        console.log(image)
        const formData= new FormData();
        formData.append('name', name);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('slug',slug);
        formData.append('category_id',category_id);
        formData.append('discount',discount);
        formData.append('image', image);
        axios.post(BASE_URL+'/api/products', formData,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Property Inserted Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/auth/view-products');
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
      await uploadProduct();
 
   }
    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Add Product </div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i className='fa fa-cart-plus' aria-hidden='true'></i> Add Products</div>
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
                                onChange={(e)=>setPhoto(e.target.files[0])}
                            />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='name' className='form-label'>Product Name</label>
                            <input
                                type='text'
                                className={`form-control`}
                                name='name'
                                id='name'
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
                                onChange={ (e)=>setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='pur_price' className='form-label'>Price</label>
                            <input
                                type='number'
                                className={`form-control`}
                                name='price'
                                id='pur_price'
                                onChange={ (e)=>setPrice(e.target.value)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='selling_price' className='form-label'>Slug</label>
                            <input
                                type='text'
                                className={`form-control`}
                                name='slug'
                                id='selling_price'
                                onChange={ (e)=>setSlug(e.target.value)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='category_id' className='form-label'>Category</label>
                            <select
                             className={`form-select`}
                             name='category_id'
                             id='category_id'
                             onChange={ (e)=>setCategoryId(e.target.value)}
                            >
                            {getCategory.map((category) => (
                            <>
                             <option value={category.id}>{category.name}</option>
                            </>
                            )
                            )}
                            </select>
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='discount' className='form-label'>Discount</label>
                            <input
                                type='text'
                                className={`form-control`}
                                name='discount'
                                id='discount'
                                onChange={ (e)=>setDiscount(e.target.value)}
                            />
                        </div>
                        <div className='col-12'>
                            <button type='submit' className='btn btn-success'>
                                <i className='fa fa-check-circle' aria-hidden='true'></i> Submit Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
