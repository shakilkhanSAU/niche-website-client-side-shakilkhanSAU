import React, { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, Container, Snackbar } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAuth from '../../../hooks/useAuth';


const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)

    const price = order.price;
    const _id = order._id;
    console.log(_id)
    const { user } = useAuth();

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

        setProcessing(true)
        // create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            setErrorMessage(error?.message)

        } else {
            setSuccessMessage('Payment Complete Successfully!')
        }
        //confirm payment intent
        const { paymentIntent, intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            },
        )
        if (intentError) {
            setErrorMessage(intentError.message)
            setSuccessMessage('')
        }
        else {
            setErrorMessage('')
            setSuccessMessage(`Payment Complete confirmed`)
            console.log(paymentIntent)
            setProcessing(false)

            // save payment info to servre
            const payment = {
                amount: paymentIntent.amount,
                transaction: paymentIntent.client_secret.slice('_secret')[0],
                created: paymentIntent.created
            }
            const url = `https://whispering-tor-67182.herokuapp.com/payment/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => console.log(data))
        }

    }

    // fetching  payment intent
    useEffect(() => {
        fetch('https://whispering-tor-67182.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))

    }, [price])

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
                    {processing ? <CircularProgress></CircularProgress>
                        :
                        <Button type="submit" disabled={!stripe}>
                            Pay ${price}
                        </Button>
                    }
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