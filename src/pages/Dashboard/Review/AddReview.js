import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import useAuth from '../../../hooks/useAuth'

const AddReview = () => {
    const [review, setReview] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);
    const { user } = useAuth();


    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const reviewInfo = { ...review, userName: user.displayName }
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
                    setSuccessMessage(true)
                }
                e.target.reset()
            })
    }

    // alert set up
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(false)

    };

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
                            label="Your Name"
                            variant="outlined"
                            defaultValue={user.displayName}
                            name="userName"
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
                                maxLength: 100,
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
                {/* snackbar */}
                <Snackbar open={successMessage} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Thank's {user.displayName} for your feedback!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

export default AddReview;