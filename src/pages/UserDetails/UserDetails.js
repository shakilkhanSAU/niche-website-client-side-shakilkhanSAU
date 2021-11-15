import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import './UserDetails.css'

const UserDetails = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <div className="spinner"><Spinner animation="grow" /></div>
    }
    return (
        <div className="user">
            <div className="user-details">
                <Row>
                    <Col md={5} lg={4} xs={12}>
                        <div className="user-details-image">
                            {
                                user.photoURL ? <img src={user.photoURL} alt="user" /> :
                                    <i className="fas fa-user fs-1"></i>
                            }
                        </div>
                    </Col>
                    <Col md={7} lg={8} xs={12}>
                        <h5 className="pt-3 pt-md-0">Hey! {user.displayName}</h5>
                        <span className="user-welcome pt-2">Thank your for choosing us. <span className="fw-bold text-dark">Tour<span className="text-danger">X</span></span> is reliable tour guide and booking company with specialized advantage and trusted guide around the world.</span>
                    </Col>
                </Row>
            </div>
        </div >
    );
};

export default UserDetails;