import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import useProducts from '../../hooks/useProduct';
import Footer from '../../shared/Footer/Footer';
import Header from '../../shared/Header/Header';
import Product from './Product';

const AllProducts = () => {
    const { products } = useProducts();
    console.log(products)
    return (
        <>
            <Header></Header>
            <Container sx={{ px: 3, py: 5 }}>
                <Typography style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '20px' }} variant="h4" gutterBottom component="div">
                    Our Products
                </Typography>
                <Grid container spacing={2}>
                    {
                        products?.map(product => <Product
                            product={product}
                            key={product?._id}
                        ></Product>)
                    }
                </Grid>
            </Container>
            <Footer></Footer>
        </>
    );
};

export default AllProducts;