import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import Footer from '../../shared/Footer/Footer';
import Header from '../../shared/Header/Header';
import './UserDetails.css'

const UserDetails = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <div className="spinner"><Spinner animation="grow" /></div>
    }
    return (
        <>
            <Header></Header>
            <div className="user">
                <div className="user-details">
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: 'center' }} md={5} lg={4} xs={12}>
                            <div className="user-details-image">
                                {
                                    user.photoURL ? <img src={user.photoURL} alt="user" /> :
                                        <div>
                                            <i className="fas fa-user user-fake-logo"></i>
                                        </div>
                                }
                            </div>
                        </Col>
                        <Col md={7} lg={8} xs={12}>
                            <h5 className="pt-3 pt-md-0 pb-2">Hey! <span style={{ color: '#00B28F' }}>{user.displayName}</span></h5>
                            <div className="user-welcome-text">
                                <span className="user-welcome pt-2">Thank your for choosing us. <span className="fw-bold text-dark">Time<span className="text-danger">Keeper</span></span> is reliable watch seller and service company with specialized advantage and trusted watch provider around the world.</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div >
            <Footer></Footer>
        </>
    );
};

export default UserDetails;