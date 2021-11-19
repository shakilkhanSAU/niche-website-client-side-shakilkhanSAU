import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useAuth from '../../../hooks/useAuth'

const AddReview = () => {
    const [review, setReview] = useState({});
    const { user } = useAuth();


    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const reviewInfo = { ...review }
        reviewInfo[field] = value;
        setReview(reviewInfo)
    }

    const handleAddReview = (e) => {
        e.preventDefault();
        fetch('https://whispering-tor-67182.herokuapp.com/addReview', {
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
                <h2 className="fw-bold text-center mt-4">Add a Review</h2>
            </div>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ py: 3 }}>
                <Box sx={{ p: 3 }}>
                    <form onSubmit={handleAddReview}>
                        <TextField
                            id="outlined-basic"
                            label="User Name"
                            variant="outlined"
                            name="userName"
                            value={user.displayName}
                            required
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Write Your Short Feedback"
                            variant="outlined"
                            name="comment"
                            required
                            inputProps={{
                                maxLength: 60,
                            }}
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 2, mt: 1 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Give Rating out of Five"
                            variant="outlined"
                            name="rating"
                            type="number"
                            max="5"
                            required
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 2, mt: 1 }}
                        />
                        <Button variant="contained" type="submit">Add Review</Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default AddReview;