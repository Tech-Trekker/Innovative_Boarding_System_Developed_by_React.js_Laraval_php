import React from 'react'
import Hero from '../hero/Hero'
import Feature from '../feature/Feature'
import Product from '../product/Product'
import Categories from '../categories/Categories'
import Review from '../reviews/Reviews'
import Contact from '../contact/Contact'
import Map from '../map/Map'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'


const Main = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Feature />
            <Product />
            <Categories />
            <Review />
            <Contact />
            <Map />
            <Footer />
        </>
    )
}

export default Main
