import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import TextField from '@mui/material/TextField';
import useProducts from '../../hooks/useProduct';
import Footer from '../../shared/Footer/Footer';
import Header from '../../shared/Header/Header';
import { Alert, Container } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import useAuth from '../../hooks/useAuth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const BuyNow = () => {
    const { id } = useParams();
    const { open, setOpen, user } = useAuth();
    const [myOrders, setMyOrders] = useState([]);
    const { products } = useProducts();
    const initialOrderInfo = { clientName: user.displayName, email: user.email, phone: '', address: '', status: 'pending' }
    const [orderInfo, setOrderInfo] = useState(initialOrderInfo);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const email = user.email;
    useEffect(() => {
        fetch(`https://whispering-tor-67182.herokuapp.com/myOrders/${email}`)
            .then(res => res.json())
            .then(data => {
                setMyOrders(data)
                console.log(data)
            })
    }, [email, successMessage])
    console.log('this is myOrders', myOrders)

    const findProduct = products?.find(product => product?._id === id);
    // alert set up
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setSuccessMessage(false)
        setErrorMessage(false)
    };

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newOrderInfo = { ...orderInfo }
        newOrderInfo[field] = value;
        setOrderInfo(newOrderInfo)
    }

    const handleBookSubmit = (e) => {
        e.preventDefault();
        // send data to server
        const exist = myOrders.find(order => order._id === id)
        const order = {
            ...orderInfo, ...findProduct
        }

        if (exist) {
            setErrorMessage(true)
            return;
        }
        if (!exist) {
            fetch('https://whispering-tor-67182.herokuapp.com/addOrder', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(order)
            }).then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccessMessage(true)
                        e.target.reset();
                    }
                })
        }
    }
    return (
        <>
            <Header></Header>
            <div className="destination">
                <h2 className="fw-bold text-center mt-4">Confirm Your Purchase of</h2>
                <h3 className="fw-bold text-center text-success">{findProduct?.name}</h3>
            </div>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ py: 3 }}>
                <Box sx={{ p: 3 }}>
                    <form onSubmit={handleBookSubmit}>
                        <TextField
                            id="outlined-basic"
                            label="Your Name"
                            variant="outlined"
                            defaultValue={user.displayName}
                            name="clientName"
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Your Phone Number"
                            variant="outlined"
                            name="phone"
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Your Address"
                            variant="outlined"
                            name="address"
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 2, mt: 1 }}
                        />
                        <TextField
                            disabled
                            id="outlined-basic"
                            label="Your Email"
                            variant="outlined"
                            name="email"
                            onBlur={handleOnBlur}
                            defaultValue={user.email}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        <Button variant="contained" type="submit">Place Order</Button>
                    </form>
                </Box>
                {/* snackbar */}
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        User Login Successfull!
                    </Alert>
                </Snackbar>
                {/* snackbar */}
                <Snackbar open={successMessage} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Order Placed Successfully!
                    </Alert>
                </Snackbar>
                {/* snackbar */}
                <Snackbar open={errorMessage} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Order is already Placed!
                    </Alert>
                </Snackbar>
            </Container>

            <Footer></Footer>
        </>
    );
};

export default BuyNow;