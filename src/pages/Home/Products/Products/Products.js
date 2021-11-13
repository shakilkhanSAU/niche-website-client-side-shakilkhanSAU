import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';


const Products = () => {
    const [services, setServices] = useState()
    const url = "http://localhost:5000/products"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setServices(data)
                console.log(data)
            })
    }, []);
    return (
        <div>
            <h3>this is service</h3>
            {
                services?.slice(0, 6)?.map(service => <h3>{service.name}</h3>)
            }

        </div>
    );
};

export default Products;