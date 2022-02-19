import React from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const { orderId } = useParams();
    return (
        <div>
            <h2 className="fw-bold text-center pt-3 pb-2">Payment For: {orderId}</h2>
        </div>
    );
};

export default Payment;