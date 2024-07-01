import React, { useEffect, useState } from 'react';
import './Product.css'
import { LazyLoadImage } from "react-lazy-load-image-component";

export const BASE_URL = 'http://localhost:8000';
const Product = () => {
    const [movieData, setMovieData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    const getMovieList = async () => {
        const url = `${BASE_URL}/api/products`;

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
    useEffect(() => {
        // Filter movies based on the search query
        const filtered = movieData.filter(movie =>
            movie.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [searchQuery, movieData]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

 return (
        <section className='container' id='Products'>
            <h1 className="heading" data-aos-duration="2000" data-aos="zoom-in-down">Explore rentals on <span>BoardEase</span></h1>
            <div className='col-md-3' style={{padding:'10px'}}>
                <form className="d-flex">
                <input type="search"
                    placeholder="Search..."
                    className="form-control me-2"
                    value={searchQuery}
                    onChange={handleSearchInputChange} 
                />
                </form>
            </div><br/>
            <div className='row g-1 g-lg-3'>
                    {(searchQuery ? filteredMovies : movieData).map((movie) => (
                        <div className='col-6 col-lg-3 pb-1' key={movie.id}>
                            <div className="card shadow h-100">
                                <span class="discount">{movie.discount}</span>
                                <div className='pro-inner'>
                                    <LazyLoadImage src={`${BASE_URL}/products/${movie.image}`}
className="card-img-top pro-img" alt="..." effect="blur"/>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title pro-title">{movie.name}</h5>
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div class="card-text my-3">LKR {movie.price} / Days</div>
                                    <button className='btn pro-btn'>More</button>
                                </div>
                                <div className="card-footer text-center pro-footer">
                                    <small className="text-body-secondary">Last updated {calculateElapsedTime(movie.created_at)} mins ago</small>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Product