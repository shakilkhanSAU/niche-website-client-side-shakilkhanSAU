import React from 'react';
import useProducts from '../../../../hooks/useProduct';
// import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Products.css'
import { Container, Grid, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';


const Products = () => {
    const { services } = useProducts();
    return (
        // <Container className="product-area">
        //     <h2>Our Products</h2>

        <Container>
            <h2>Available Appointments on</h2>
            <Grid container spacing={2}>
                {
                    services?.map(service => <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ py: 5 }} elevation={3}>
                            <Typography style={{ fontWeight: 'bold', color: '#2FBFB6' }} variant="h5" gutterBottom component="div">
                                {service?.name}
                            </Typography>
                            <Typography style={{ fontWeight: 'bold' }} variant="p" gutterBottom component="div">
                                {service?.price}
                            </Typography>
                            <Button style={{ background: '#2FBFB6', marginTop: '10px' }} variant="contained">Book Appointment</Button>
                        </Paper>
                    </Grid>)
                }
            </Grid>
        </Container>
    );
};

export default Products;