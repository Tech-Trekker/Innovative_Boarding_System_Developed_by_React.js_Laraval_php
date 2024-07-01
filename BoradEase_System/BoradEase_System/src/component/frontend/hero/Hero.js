import React from 'react'

import './Hero.css'
import { Link } from 'react-scroll'

const Hero = () => {
    return (
        <section className='hero-section container-fluid' id='Home'>
            <div className="content container text-center">
                <h3>Welcome <span> To</span> BoardEase! </h3>

                <Link to="banner" smooth={true} offset={-70} duration={500} className='btn-get'>Post Your Add</Link>
            </div>
        </section>
    )
}

export default Hero
