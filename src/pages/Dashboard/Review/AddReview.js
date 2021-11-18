import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const AddReview = () => {
    const [review, setReview] = useState({});


    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const reviewInfo = { ...review }
        reviewInfo[field] = value;
        setReview(reviewInfo)
    }

    const handleAddReview = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully added review')
                }
                e.target.reset()
            })
    }

    return (
        <>
            <div className="destination">
                <h2 className="fw-bold text-center mt-4">Add a New Product</h2>
            </div>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ py: 3 }}>
                <Box sx={{ p: 3 }}>
                    <form onSubmit={handleAddReview}>
                        <TextField
                            id="outlined-basic"
                            label="Name of Product"
                            variant="outlined"
                            name="userName"
                            required
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Descritpion of Product"
                            variant="outlined"
                            name="comment"
                            required
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 2, mt: 1 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Descritpion of Product"
                            variant="outlined"
                            name="rating"
                            required
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 2, mt: 1 }}
                        />
                        <Button variant="contained" type="submit">Place Order</Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default AddReview;