import React, { useEffect, useState } from 'react';
import AuthFooter from '../nav/AuthFooter';
import AuthNavbar from '../nav/AuthNavbar';
import LoadingPage from '../../frontend/loading/LoadingPage';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../App';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { name: '', email: '', password: '' };

        if (!inputs.name.trim()) {
            newErrors.name = 'User Name is required';
            valid = false;
        }

        if (!inputs.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!isValidEmail(inputs.email)) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }

        if (!inputs.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const isValidEmail = (email) => {
        // Basic email validation, you may need a more comprehensive solution
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            let data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                password_confirmation: inputs.password_confirmation,
            };

            axios.post(BASE_URL+'/api/register', data)
                .then(res => {
                    console.log(res);
                    if (res.status === 201 || res.status === 200) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: "User Registration Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });

                        localStorage.setItem('auth', res.data.name);
                        localStorage.setItem('role', res.data.email);
                        navigate('/login');
                    }
                })
                .catch((e) => {
                    if (e.message === "Request failed with status code 409") {
                        setEmailError("Email is already in use");
                        Swal.fire({
                            title: "Warning !",
                            icon: 'warning',
                            text: "Email is already in use",
                            button: "Ok!"
                        });
                    } else {
                        Swal.fire({
                            title: "Warning !",
                            icon: 'warning',
                            text: "Please connect your database",
                            button: "Ok!"
                        });
                    }
                });
        }
    };

    return (
        <div>
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <AuthNavbar />
                    <div className="container mt-2">
                        <div className="row justify-content-center">
                            <div className="col-md-6 mb-2">
                                <div className="card">
                                    <div className="card-header bg-success text-white text-center">
                                        <h1 className="text-uppercase display-4 fw-bold">Registration</h1>
                                    </div>
                                    <div className="card-body">
                                        <form className="row g-3" onSubmit={handleFormSubmit}>
                                            <div className="col-md-12">
                                                <label htmlFor="name" className="form-label">User Name <span className="text-danger">*</span></label>
                                                <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} id="name" name='name' value={inputs.name} onChange={handleChange} placeholder='Enter your name' />
                                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="inputEmail4" className="form-label">Email <span className="text-danger">*</span></label>
                                                <input type="email" className={`form-control text-lowercase ${errors.email && 'is-invalid'}`} id="inputEmail4" name='email' value={inputs.email} onChange={handleChange} placeholder='Enter your email' />
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputPassword4" className="form-label">Password <span className="text-danger">*</span></label>
                                                <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} id="inputPassword4" name='password' value={inputs.password} onChange={handleChange} placeholder='Password' />
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputPassword4" className="form-label">Password Confirmation <span className="text-danger">*</span></label>
                                                <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} id="inputPassword4" name='password_confirmation' value={inputs.password_confirmation} onChange={handleChange} placeholder='Password' />
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-success"><i className="fa fa-user-plus mr-1" aria-hidden="true"></i> Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center">
                                        <span className="text-muted">
                                            Already have an account? <Link to="/auth">Login Here</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AuthFooter />
                </>
            )}
        </div>
    );
}

export default RegisterPage;
