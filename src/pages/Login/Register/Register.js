import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, CircularProgress, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/system';
import loginBg from '../Login/login.jpg'
import googleimg from '../Login/google.png'
import { Link } from "react-router-dom";
import Header from '../../../shared/Header/Header';
import Footer from '../../../shared/Footer/Footer';
import useAuth from '../../../hooks/useAuth';


const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { registerNewUser, error, googleSignin, isLoading, user } = useAuth();

    const history = useHistory();

    // input field data finding function
    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData)
        console.log(loginData)
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        if (user.email) {
            alert('Please logout first')
        } else {
            if (loginData.password !== loginData.password1) {
                alert("Password does not matched!")
                return;
            }
            registerNewUser(loginData.name, loginData.email, loginData.password, history)
        }
    }

    // handlegoogle sign in
    const handleGoogleSignIn = () => {
        if (!user.email) {
            googleSignin()
        } else {
            alert('Please logout first')
        }
    }

    return (
        <>
            <Header></Header>
            <Container sx={{ py: 5 }}>
                <Grid container spacing={1}>
                    <Grid style={{ display: 'flex', alignItems: 'center' }} item xs={12} md={6}>
                        <Box style={{ width: '100%' }}>
                            <h3 style={{ fontSize: '33px', color: '#385a64' }}>
                                Register New Account
                            </h3>
                            {!isLoading ? <form onSubmit={handleRegistration}>
                                <TextField
                                    style={{ width: '90%', marginBottom: '20px' }}
                                    id="standard-basic"
                                    label="Name"
                                    variant="standard"
                                    name="name"
                                    onBlur={handleOnChange}
                                    required
                                />
                                <TextField
                                    style={{ width: '90%', marginBottom: '20px' }}
                                    id="standard-basic"
                                    label="Email"
                                    variant="standard"
                                    name="email"
                                    onBlur={handleOnChange}
                                    required
                                />
                                <TextField
                                    style={{ width: '90%', marginBottom: '20px' }}
                                    id="standard-basic"
                                    type="password"
                                    label="Password"
                                    variant="standard"
                                    name="password"
                                    onBlur={handleOnChange}
                                    required
                                />
                                <TextField
                                    style={{ width: '90%', marginBottom: '20px' }}
                                    id="standard-basic"
                                    type="password"
                                    label="Re-enter Password"
                                    variant="standard"
                                    name="password1"
                                    onBlur={handleOnChange}
                                    required
                                />

                                <Box>
                                    <Button
                                        type="submit"
                                        style={{ width: '90%', padding: '10px', backgroundColor: '#385a64', marginTop: '10px' }} variant="contained">Submit</Button>
                                </Box>
                                <p className="error-txt text-danger">
                                    <Link style={{ color: 'crimson' }} to="/login">Already Have An Account?</Link>
                                </p>
                            </form>
                                :
                                <CircularProgress />
                            }

                            <div className="py-4 w-100">
                                <button onClick={handleGoogleSignIn} className="google-btn">
                                    <img className="img-fluid" src={googleimg} alt="" />
                                    Sign in with Google
                                </button>
                                <small className="error-txt text-danger">{error}</small>
                            </div>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img style={{ width: '100%' }} src={loginBg} alt="" />
                    </Grid>
                </Grid>


            </Container>
            <Footer></Footer>
        </>
    );
};

export default Login;