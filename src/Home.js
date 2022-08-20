import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import Badge from 'react-bootstrap/Badge';
import HeadPhone from './headphones.svg';
import MovieRoll from './movie-roll.svg';
import Fire from './fire.svg';
import Movie from './movie.svg';
import Tv from './tv.svg';
import Search from './search.svg';
import Fire1 from './fire1.svg';
import Tv1 from './tv1.svg';
import './Main.css';
import $ from 'jquery';

function Home() {
    const [res, setRes] = useState([]);
    const [pageCount, setPagecount] = useState(0);
    const [count, setCount] = useState(1);
    const [dep, setDep] = useState(0);
    const [selected, setSelected] = useState(null);

    const getData = async (count) => {
        try {
            if (dep === 0) {
                const data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8b445d0567755b890836df8987cafeb7&page=${count}`);
                console.log(data);
                setRes(data.data.results);
                setPagecount(data.data.total_pages);
                setSelected(null);
            }
            else if (dep === 1) {
                const data = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=8b445d0567755b890836df8987cafeb7&page=${count}`);
                console.log(data);
                setRes(data.data.results);
                setPagecount(data.data.total_pages);
                setSelected(null);
            }
            else if (dep === 2) {
                const data = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=8b445d0567755b890836df8987cafeb7&page=${count}`);
                console.log(data);
                setRes(data.data.results);
                setPagecount(data.data.total_pages);
                setSelected(null);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData(count);
    }, [count, dep]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCount(selectedPage + 1);
    }

    return (
        <div>
            <div className='container-fluid bg-dark bg-gradient mb-5 pb-3'>
                <div className="container bg-dark bg-gradient">
                    {
                        dep === 0
                            ? <div className="row p-3 bg-dark bg-opacity-50 justify-content-center">
                                <img src={HeadPhone} className="col-3 px-0 mx-0" style={{ height: "10%", width: "6%" }} />
                                <span className='col-5 text-light display-4 text-center px-0 mx-0'>MOVIES NOW</span>
                                <img src={MovieRoll} className="col-3 px-0 mx-0" style={{ height: "10%", width: "6%" }} />
                            </div>
                            : dep === 1
                                ? <div className="row p-3 bg-dark bg-opacity-50 justify-content-center">
                                    <span className='col-4 text-light display-4 text-center px-0 mx-0'>TRENDING</span>
                                    <img src={Fire1} className="col-3 px-0 mx-0" style={{ height: "10%", width: "5%" }} />
                                </div>
                                : <div className="row p-3 bg-dark bg-opacity-50 justify-content-center">
                                    <span className='col-4 text-light display-4 text-center px-0 mx-0'>TV SERIES</span>
                                    <img src={Tv1} className="col-3 px-0 mx-0" style={{ height: "10%", width: "6%" }} />
                                </div>
                    }
                    <div className="row">
                        {
                            res.map((path) => {
                                return (
                                    <div className='col-md-3'>
                                        <Link to="/info" style={{ textDecoration: "none" }} state={{ inf: path }}>
                                            <div className='my-4 rounded' style={{ position: 'relative' }}>
                                                <img className="w-100 rounded" src={"https://image.tmdb.org/t/p/w200" + path.poster_path} alt={path.original_title} />
                                                <Badge pill bg="primary" style={{ position: 'absolute', top: 0, right: 0 }}>{path.vote_average.toFixed(1)}</Badge>
                                                <div className="desc p-2 bg-info bg-opacity-25">
                                                    <p className="desc_content h5 text-light text-center"><b>{path.title || path.original_name}</b></p>
                                                </div>
                                                <div className="row desc p-1 m-0 text-center text-light bg-info bg-opacity-25 rounded-bottom">
                                                    <span className="col-6 desc_content">{dep === 0 ? "Movie" : dep === 1 ? "Trending" : "TV Series"}</span>
                                                    <span className="col-6 desc_content">{path.release_date || path.first_air_date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={10}
                        onPageChange={handlePageClick}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        containerClassName={'pagination justify-content-center color-dark pb-4'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                        forcePage={selected}
                    />
                </div >
            </div>
            <div className='container-fluid bg-info bg-gradient pt-2' style={{ position: "fixed", bottom: "0%", zIndex: "3", height: "100px" }}>
                <div className="container bg-info bg-gradient">
                    <div className='row justify-content-center text-center'>
                        <span className='col-3 btnn'>
                            <button onClick={() => { setDep(1); setCount(1); setSelected(0); }} className="btn">
                                <img src={Fire} style={{ height: "20%", width: "20%" }} />
                                <p>Trending</p>
                            </button>
                        </span>
                        <span className='col-3 btnn'>
                            <button onClick={() => { setDep(0); setCount(1); setSelected(0); }} className="btn">
                                <img src={Movie} style={{ height: "20%", width: "20%" }} />
                                <p>Movies</p>
                            </button>
                        </span>
                        <span className='col-3 btnn'>
                            <button onClick={() => { setDep(2); setCount(1); setSelected(0); }} className="btn">
                                <img src={Tv} style={{ height: "20%", width: "20%" }} />
                                <p>TV Series</p>
                            </button>
                        </span>
                        <span className='col-3 btnn'>
                            <Link to="search">
                                <button className="btn">
                                    <img src={Search} style={{ height: "20%", width: "20%" }} />
                                    <p>Search</p>
                                </button>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;