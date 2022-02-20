import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import './Payment.css'

const stripePromise = loadStripe('pk_test_51JxmMsFeiyYXbAR2bhYELH7vj4QB5OM0X5MV75kH4LZf4hNles2nGhujkvvzAAVU2iA5jkRQ8w0EEBRemSACOetN00VZJpS3Op')

const Payment = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        appearance,
    };
    useEffect(() => {
        fetch(`https://whispering-tor-67182.herokuapp.com/payment/${orderId}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [orderId])
    return (
        <div>
            <h2 className="fw-bold text-center pt-3 pb-2">Payment For: {order?.name}</h2>
            <h5 className="fw-bold text-center text-danger pt-3 pb-2">Please pay: ${order?.price}</h5>
            {
                order?.price && <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                    />
                </Elements>
            }
        </div>
    );
};

export default Payment;