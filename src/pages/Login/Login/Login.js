import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import googleimg from '../../../images/google.png'
import loginBackground from '../../../images/tourismlogin.jpg'
import './Login.css'

const Login = () => {
    const [error, setError] = useState('');
    const { signInWithGoogle, setUser, setIsLoading } = useAuth();

    // redirect url
    const location = useLocation();
    const redirect_uri = location.state?.from || '/home'
    const history = useHistory();

    // signin
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                setUser(result.user)
                history.push(redirect_uri)
                setError('')
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="login py-5">
            <Row className="container">
                <Col className="login-form my-auto mx-auto" sm={6}>
                    <div className="py-4 w-100">
                        <button onClick={handleGoogleSignIn} className="google-btn">
                            <img src={googleimg} alt="" />
                            Sign in with Google
                        </button>
                        <small className="error-txt text-danger">{error}</small>
                    </div>
                </Col>
                <Col sm={6}>
                    <img src={loginBackground} className="img-fluid mt-md-5" alt="" />
                </Col>
            </Row>
        </div >
    );
};

export default Login;