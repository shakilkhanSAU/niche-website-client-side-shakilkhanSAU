import React from 'react';
import useReviews from '../../../hooks/useReviews';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import SingleReview from './SingleReview';

const Reviews = () => {
    const { reviews } = useReviews();
    return (
        <Container sx={{ width: '100%', px: 3, py: 5 }}>
            <Typography style={{ fontWeight: 'bold', marginBottom: '20px' }} variant="h4" gutterBottom component="div">
                Our Customers Say's
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                {
                    reviews?.map(review => <SingleReview
                        review={review}
                        key={review._id}
                    ></SingleReview>)
                }
            </Grid>
        </Container>
    );
};

export default Reviews;