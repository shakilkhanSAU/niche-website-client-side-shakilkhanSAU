import { Grid, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { name, price, img, description, _id } = props?.product;
    const url = `/buyNow/${_id}`

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ pb: 5 }} elevation={3}>
                <img style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} className="img-fluid" src={img} alt="" />
                <Box style={{ textAlign: 'left', paddingLeft: '30px', paddingTop: '30px', paddingRight: '30px' }}>
                    <Typography style={{ fontWeight: 'bold', color: '#151931' }} variant="h5" gutterBottom component="div">
                        {name}
                    </Typography>
                    <Typography style={{ fontWeight: '600', color: 'crimson' }} variant="h5" gutterBottom component="div">
                        ${price}
                    </Typography>
                    <Typography style={{ fontWeight: '400' }} variant="p" gutterBottom component="div">
                        {description.slice(0, 70)}...
                    </Typography>
                    <Link to={url} style={{ textDecoration: 'none' }}>
                        <Button style={{ background: '#151931', marginTop: '10px' }} variant="contained">Buy Now</Button>
                    </Link>
                </Box>
            </Paper>
        </Grid>
    );
};

export default Product;