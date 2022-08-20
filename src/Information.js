import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Info() {
    const { inf } = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        console.log(inf);
    }, [])

    return (
        <div>
            <div className='container-fluid bg-dark bg-gradient'>
                <div className='container py-4'>
                    <div className='row'>
                        <div className='col-md-4 p-0'>
                            <img src={"https://image.tmdb.org/t/p/w300" + inf.poster_path} className="rounded m-5 my-3" style={{ boxShadow: "0px 0px 10px 0px #0ff" }} />
                            <p className='m-0 p-0 text-center text-warning h6'>Rating - {inf.vote_average.toFixed(1)} ( {inf.vote_count} Votes )</p>
                        </div>
                        <div className='col-md-8 p-0'>
                            <span className='display-4 text-light px-4 mx-4 d-flex'><b>{inf.title || inf.original_name} ({inf.release_date || inf.first_air_date})</b></span>
                            <p className='h4 text-info px-4 mx-4 mt-4'>{inf.overview} </p>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="btn btn-outline-secondary btn-lg btn-block" style={{float:"right"}}>← Back</button>
                </div>
            </div>
        </div>
    )
}
export default Info;