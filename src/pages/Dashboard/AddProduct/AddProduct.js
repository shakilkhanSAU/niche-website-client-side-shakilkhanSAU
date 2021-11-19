import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



const AddProduct = () => {
    const [productInfo, setProductInfo] = useState({});

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newProductInfo = { ...productInfo }
        newProductInfo[field] = value;
        setProductInfo(newProductInfo)
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        fetch('https://whispering-tor-67182.herokuapp.com/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully added new Product')
                    e.target.reset();
                }
            })
    }

    return (
        <>
            <div className="destination">
                <h2 className="fw-bold text-center mt-4">Add a New Product</h2>
            </div>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ py: 3 }}>
                <Box sx={{ p: 3 }}>
                    <form onSubmit={handleAddProduct}>
                        <TextField
                            id="outlined-basic"
                            label="Name of Product"
                            variant="outlined"
                            name="name"
                            required
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Price of Product"
                            variant="outlined"
                            name="price"
                            type="number"
                            required
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 2, mt: 1 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Descritpion of Product"
                            variant="outlined"
                            name="description"
                            required
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 2, mt: 1 }}
                        />
                        <TextField
                            required
                            id="outlined-basic"
                            label="Image Url"
                            variant="outlined"
                            name="img"
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 1, mt: 1 }}
                        />
                        <Button variant="contained" type="submit">Add Product</Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default AddProduct;