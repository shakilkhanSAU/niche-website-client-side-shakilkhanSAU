import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="notfound">
            <div>
                <img src="https://i.ibb.co/K5SkQnz/404.jpg" className="img-fluid" alt="" />
                <div className="text-center">
                    <Link to="/home"><button className="btn-details">Back to Home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;