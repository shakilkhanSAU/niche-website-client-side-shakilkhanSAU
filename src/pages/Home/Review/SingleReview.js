import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Rating from '@mui/material/Rating';

const SingleReview = (props) => {
    const { userName, comment, rating } = props?.review;
    return (
        <Grid item xs={12} sm={6} md={6} lg={4}>
            <Paper elevation={3} >
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '40px', paddingLeft: '25px', padding: '5px', background: '#dee9ff' }}>
                        <i className="fas fa-user"></i>
                        <hr style={{ marginBottom: '10px', marginTop: '5px' }} />
                    </div>
                    <div style={{ textAlign: 'left', paddingLeft: '30px', paddingRight: '30px', paddingBottom: '20px', background: '#dee9ff' }}>
                        <h5>{userName}</h5>
                        <Typography style={{ fontWeight: '400', fontSize: '15px' }} variant="p" gutterBottom component="div">
                            {comment}
                        </Typography>
                        <Rating style={{ fontSize: '20px' }} name="read-only" value={rating} readOnly />
                    </div>
                </Box>
            </Paper>
        </Grid>
    );
};

export default SingleReview;