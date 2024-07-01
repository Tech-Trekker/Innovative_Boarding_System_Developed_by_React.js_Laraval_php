import React from 'react'

import footerLogo from './payment (2).png';

const AuthFooter = () => {
    return (
        <section className='container-fluid bg-dark bg-gradient footer'>
            <div className='container'>
                <div className='row gx-4'>
                    <div className='col-12 col-md-6 col-xl-4'>
                        <h1 className='footer-title fw-bold'>Board  <span>Ease</span></h1>

                        <p>The aim of the BoardEase is to design, create, and put into use a cutting edge boarding system to develop a user friendly web site to connect homeowners and accommodation seekers.</p>
                    </div>

                    <div className='col-12 col-md-6 col-xl-4 contact'>
                        <h1 className='footer-title fw-bold'>Contact Info</h1>

                        <a href="" className="links"><i className="fas fa-phone"></i>+94775311974</a>
                        <a href="" className="links"><i className="fas fa-phone"></i>+94751311974</a>
                        <a href="" className="links"><i className="fas fa-envelope"></i>boardease@gmail.com</a>
                        <a href="" className="links"><i className="fas fa-map-marker-alt"></i>Sri lanka, Batticaloa</a>
                    </div>

                    <div className='col-12 col-md-6 col-xl-4'>
                        <h1 className='footer-title fw-bold'>Newsletter</h1>

                        <p>Sign up to get 10% off your first add and stay up to date on the latest explore, special offers and news.</p>
                        <input type="email" name="" id="" placeholder="your email" className="email" />
                        <input type="submit" value="subscribe" className="btn btn-primary sub-btn my-2" /><br />
                        <img src={footerLogo} className="payment-img" alt="" />
                    </div>
                </div>
            </div>

            <div className="credit">Created By <span><a href="#">BoardEase</a></span> | ©
            2024 All Rights Reserved.
            </div>
        </section>
    )
}

export default AuthFooter
