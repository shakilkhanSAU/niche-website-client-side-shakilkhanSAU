import React from 'react';
import Card from '@mui/material/Card';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { name, description, price, img } = props.service;
    return (
        <Col>
            <div className="service-card">
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <div className="body-text pe-4">
                        <h3>{name}</h3>
                        {/* <h5>${price}</h5> */}
                        <p>{description.slice(0, 90)}....</p>
                        <Link to="/"><button className="btn-details">Book Now</button></Link>
                    </div>
                </Card.Body>
            </div>
        </Col>
    );
};

export default Product;