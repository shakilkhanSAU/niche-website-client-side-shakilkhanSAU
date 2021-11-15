import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './AddTour.css'

const AddTour = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        axios.post('https://warm-chamber-38340.herokuapp.com/services', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert("Tour Destination Added Successfully!")
                    reset();
                }
            })

    };

    return (
        <div className="add-tour">
            <h2>Add a New Tour Destination</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("title")} placeholder="Enter a destination title" required />
                <textarea {...register("Description")} placeholder="Enter description" required />
                <input type="number" {...register("price")} placeholder="Enter Budget" required />
                <input {...register("img")} placeholder="Image Url" required />
                <button className="add-btn" type="submit">Add Destination</button>
            </form>
        </div>
    );
};

export default AddTour;