import React from 'react';
import useProducts from '../../../../hooks/useProduct';
import './Products.css'
import { Container, Grid, Typography } from '@mui/material';
import SingleProduct from '../SingleProduct/SingleProduct';


const Products = () => {
    const { products } = useProducts();

    return (
        <Container sx={{ px: 3, py: 5 }}>
            <Typography style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '20px' }} variant="h4" gutterBottom component="div">
                Our Products
            </Typography>
            <Grid container spacing={2}>
                {
                    products?.slice(6, 12)?.map(product => <SingleProduct
                        product={product}
                        key={product?._id}
                    ></SingleProduct>)
                }
            </Grid>
        </Container>
    );
};

export default Products;