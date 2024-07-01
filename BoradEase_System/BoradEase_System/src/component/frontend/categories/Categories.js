import React, { useEffect, useState } from 'react';
import './Categories.css';
import { LazyLoadImage } from "react-lazy-load-image-component";

export const BASE_URL = 'http://localhost:8000';

const Categories = () => {
    const [movieData, setMovieData] = useState([]);

    const getMovieList = async () => {
        const url = `${BASE_URL}/api/category_products`;

        try {
            const response = await fetch(url);
            const responseJson = await response.json();
            console.log(responseJson);
            setMovieData(responseJson);
        } catch (error) {
            console.error('Error fetching movie list:', error);
        }
    };

    useEffect(() => {
        getMovieList();
    }, []);

    const calculateElapsedTime = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const elapsedTimeInMilliseconds = currentDate - createdDate;
        const elapsedTimeInMinutes = Math.floor(elapsedTimeInMilliseconds / (1000 * 60)); // Convert milliseconds to minutes
        return elapsedTimeInMinutes;
    };

    return (
        <div className='container' id='Categories'>
            <h1 className="heading" data-aos-duration="2000" data-aos="zoom-in-down">Home <span>Categories</span></h1>

            <div className='pro-scrolling-wrapper row flex-row flex-nowrap pb-2'>
                {movieData && movieData.map((movie) => (
                    <div className='col-3 cat-col' key={movie.id}>
                        <div className="card shadow h-100 categories">
                            <div className='cat-inner'>
                                <LazyLoadImage src={`${BASE_URL}/categories/${movie.image}`}  className="card-img-top" alt="..." effect="blur"/>
                            </div>
                            <div className="card-body text-center">
                                <h5 className="card-title cat-title">{movie.name}</h5>
                                <p className="card-text para">{movie.description}</p>
                                <a href="#" className="btn btn-primary btn-block">Go somewhere</a>
                            </div>
                            <div className="card-footer text-center">
                                <small className="text-body-secondary">Last updated {calculateElapsedTime(movie.created_at)} mins ago</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
