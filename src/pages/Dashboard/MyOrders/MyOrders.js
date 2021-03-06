import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './MyOrder.css'
import Box from '@mui/material/Box';
import useMyOrders from '../../../hooks/useMyOrders';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
// import MyOrder from './MyOrder';

const MyOrders = () => {
    const { myOrders, setMyOrders } = useMyOrders();

    const handleDelete = (id) => {
        const proceed = window.confirm('Are You Sure! Want to delete? ')
        if (proceed) {
            const url = `https://whispering-tor-67182.herokuapp.com/cancelOrder/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert("Deleted Successfully!")
                        const remainingOrders = myOrders.filter(user => user._id !== id)
                        console.log(remainingOrders)
                        setMyOrders(remainingOrders)
                    }
                })
        }
    }
    return (
        <Box sx={{ width: '100%' }}>
            <h4 style={{ color: 'crimson' }}>Your Orders</h4>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    myOrders.map(myOrder => <Grid item xs={12}>
                        <Paper elevation={3}>
                            <div className="order-list">
                                <img className="order-image" src={myOrder?.img} alt="" />
                                <div className="description-area">
                                    <h5 className="fw-bold">{myOrder?.name}</h5>
                                    <h6 className="fw-bold text-danger">${myOrder?.price}</h6>
                                    {
                                        <small className="status">Status: {myOrder?.status}</small>
                                    }
                                </div>
                                <div>
                                    {
                                        myOrder?.payment ?
                                            <h6 className="fw-bold text-success">paid</h6>
                                            :
                                            <Link style={{ textDecoration: 'none' }} to={`dashboard/payment/${myOrder._id}`}>
                                                <Button style={{ color: 'crimson' }}>Pay Now</Button>
                                            </Link>
                                    }
                                </div>
                                <div className="manage-area">
                                    <span onClick={() => handleDelete(myOrder._id)} className="text-danger btn"><i class="fas fa-trash"></i></span>
                                </div>
                            </div>
                        </Paper>
                    </Grid>)
                }
            </Grid>
        </Box>

    );
};

export default MyOrders;