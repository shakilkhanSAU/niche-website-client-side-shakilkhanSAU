import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col xs={12} md={4} className="footer-title">
                        <h2>Tour X</h2>
                        <p>Discover best tourist place around the world by using TourX. The requested records directly to fuctional qualified doctors the day before or the day of the appointment</p>
                    </Col>
                    <Col className="footer-contact" xs={12} md={4}>
                        <h3>Contact Info</h3>
                        <p><i className="fas fa-map-marker-alt pe-2"></i>Road No: 123/A, Hironpur, Netrokona</p>
                        <p><i className="fas fa-clock pe-2"></i>9:00am - 4:00pm</p>
                        <p><i className="fas fa-phone-alt pe-2"></i>+880 112 323 243</p>
                    </Col>
                    <Col className="footer-contact" xs={12} md={4}>
                        <h3>Quick Access</h3>
                        <Link to="/about" className="footer-link">About</Link>
                        <br />
                        <Link to="/contact" className="footer-link">Contact Us</Link>
                        <br />
                        <Link to="/home" className="footer-link">Privacy Policy</Link>
                        <br />
                        <Link to="/home" className="footer-link">Terms & Conditions</Link>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default Footer;