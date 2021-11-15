import { Typography } from '@mui/material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './ContactUs.css'
import contactImage from './contactus.jpg'

const ContactUs = () => {
    return (
        <div className="contact-page" style={{ background: '#dee9ff', paddingTop: '30px', paddingBottom: '30px' }}>
            <div className="container">
                <Typography style={{ fontWeight: 'bold', marginBottom: '20px' }} variant="h4" gutterBottom component="div">
                    Contact Us
                </Typography>
                <Row>
                    <Col style={{ display: 'flex', alignItems: 'center' }} xs={12} md={6}>
                        <div style={{ width: '100%' }} className="contact-form">
                            <form>
                                <input type="text" placeholder="Enter Your Name" required />
                                <br />
                                <input type="email" placeholder="Enter Your Email" required id="" />
                                <br />
                                <textarea placeholder="Describe Your Problem in Details"></textarea>
                                <br />
                                <button className="contact-btn" type="submit">Send Mail</button>
                            </form>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src={contactImage} className="img-fluid" alt="" />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ContactUs;