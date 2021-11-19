import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Banner.css'

const Banner = () => {
    return (
        <div className="hero">
            <Row className="container">
                <Col sm={7}>
                    <h1>Time Wait For None</h1>
                    <p>We have made the most advanced, constumizable & user friendly hand watch in the world.</p>
                    <div className="btn-area">
                        <div>
                            <NavLink to="allProducts"><button className="btn-banner">Explore More</button></NavLink>
                        </div>
                    </div>
                </Col>
                <Col sm={5}></Col>
            </Row>
        </div>
    );
};

export default Banner;