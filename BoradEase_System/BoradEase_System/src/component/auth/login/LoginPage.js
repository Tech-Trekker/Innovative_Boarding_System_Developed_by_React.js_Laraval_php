import React, { useEffect, useState } from 'react';
import AuthNavbar from '../nav/AuthNavbar';
import LoadingPage from '../../frontend/loading/LoadingPage';
import Swal from 'sweetalert2';
import AuthFooter from '../nav/AuthFooter';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../App';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

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
                email: inputs.email,
                password: inputs.password,
            };

            axios.post(BASE_URL+'/api/login', data)
                .then(res => {
                    console.log(res.status);
                    if (res.status === 201 || res.status === 200) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: "User Login Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        localStorage.setItem('auth', res.data.user.name);
                        localStorage.setItem('id', res.data.user.id);
                        localStorage.setItem('token', res.data.token);
                        navigate('/auth');
                    }
                })
                .catch((e) => {
                    if (e.message === "Request failed with status code 401") {
                        setErrors({ ...errors, email: 'Invalid credentials' });
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

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

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
                                    <div className="card-header bg-primary text-white text-center">
                                        <h1 className="text-uppercase display-4 fw-bold">Login</h1>
                                    </div>
                                    <div className="card-body">
                                        <form autoComplete="off" onSubmit={handleFormSubmit}>
                                            {/* Email */}
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input
                                                    type="text"
                                                    className={`form-control text-lowercase ${errors.email && 'is-invalid'}`}
                                                    id="email"
                                                    name="email"
                                                    value={inputs.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter your email"
                                                />
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>

                                            {/* Password */}
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    className={`form-control ${errors.password && 'is-invalid'}`}
                                                    id="password"
                                                    name="password"
                                                    value={inputs.password}
                                                    onChange={handleChange}
                                                    placeholder="Enter your password"
                                                />
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>

                                            {/* Login Button */}
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary">
                                                    Login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center">
                                        <span className="text-muted">
                                            Don't have an account? <Link to="/new-user">Register Here</Link>
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
};

export default LoginPage;
