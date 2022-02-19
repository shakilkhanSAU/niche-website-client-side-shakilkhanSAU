import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/payment/${orderId}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [orderId])
    return (
        <div>
            <h2 className="fw-bold text-center pt-3 pb-2">Payment For: {order?.name}</h2>
            <h5 className="fw-bold text-center text-danger pt-3 pb-2">Please pay: ${order?.price}</h5>

        </div>
    );
};

export default Payment;