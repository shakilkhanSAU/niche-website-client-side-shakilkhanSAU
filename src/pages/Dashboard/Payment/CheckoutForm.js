import React, { useState } from 'react';
import { Alert, Button, Container, Snackbar } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';


const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')

    // alert set up
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        // setOpen(false);
        setSuccessMessage(false)
        setErrorMessage(false)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        // create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            setErrorMessage(error?.message)

        } else {
            if (paymentMethod.id) {
                setSuccessMessage('Payment Complete Successfully!')
            }
        }
    }

    return (
        <div>
            <Container>
                <form style={{ textAlign: 'center', color: 'crimson' }} onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <Button type="submit" disabled={!stripe}>
                        Pay ${order.price}
                    </Button>
                </form>
            </Container>
            {/* snackbar */}
            <Snackbar open={successMessage} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            {/* snackbar */}
            <Snackbar open={errorMessage} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CheckoutForm;