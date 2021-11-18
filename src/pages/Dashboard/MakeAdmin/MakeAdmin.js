import React, { useState } from 'react';
import { Alert, Button, Snackbar, TextField } from '@mui/material';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const [responseMessage, setResponseMessage] = useState('')


    const handleOnBlur = (e) => {
        setEmail(e.target.value)
    }

    const handleAdminSubmit = (e) => {
        const user = { email }
        e.preventDefault()
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true)
                    setResponseMessage('Successfully added an admin!')
                    e.target.reset()
                }
                if (data.matchedCount === 0) {
                    setResponseMessage('User Not Found')
                    setError(true)
                }
                if (data.matchedCount && !data.modifiedCount) {
                    setError(true)
                    setResponseMessage('User Already an Admin!')
                }
            })
    }

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false)
    };

    return (
        <div>
            <h2>Make an admin</h2>
            <form onSubmit={handleAdminSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
                <TextField
                    required
                    type="email"
                    label="Enter Email"
                    onBlur={handleOnBlur}
                    variant="standard"
                    style={{ width: '80%' }}
                />
                <Button style={{ marginTop: '20px', background: '#151931' }} type="submit" variant="contained">Make Admin</Button>
            </form>
            <Snackbar open={success} autoHideDuration={3000}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {responseMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {responseMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default MakeAdmin;