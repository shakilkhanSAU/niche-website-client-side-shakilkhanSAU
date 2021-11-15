import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useMyOrder from '../../hooks/useMyOrder';
import useProduct from '../../hooks/useProduct';

const Booking = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { orders } = useMyOrder();
    const { tours } = useProduct();
    const { register, handleSubmit } = useForm();
    const findTour = tours.find(tour => tour._id === id);
    const onSubmit = (data) => {
        const exist = orders.find(tour => tour._id === id)
        findTour.email = user.email;
        findTour.status = 'pending';
        if (!exist) {
            fetch('https://warm-chamber-38340.herokuapp.com/addOrder', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(findTour)
            })
            alert("Order Placed Successfully")
        } else {
            alert("This Orders is Already Submitted!")
        }
    };
    return (
        <div>
            <div className="destination">
                <h2 className="fw-bold text-center mt-4">Confirm Your Destination To</h2>
                <h3 className="fw-bold text-center text-success">{findTour?.title}</h3>
            </div>
            <div className="add-tour">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} readOnly value={user.displayName || ''} required />
                    <textarea {...register("Description")} placeholder="Enter description" required />
                    <input {...register("address")} placeholder="Enter Your Address" required />
                    <input {...register("email")} readOnly value={user.email || ''} required />
                    <button className="add-btn" type="submit">Confirm Booking</button>
                    {/* <input{...register("name")} />
                    <input {...register("address")} placeholder="Enter your address" />
                    <input type="email" {...register("email")} value={user.email} />
                    <button type="submit">Confirm Booking</button> */}
                </form>
            </div>
        </div>
    );
};

export default Booking;