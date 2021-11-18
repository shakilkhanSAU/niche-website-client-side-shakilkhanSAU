import React from 'react';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Footer from '../../../shared/Footer/Footer';
import Header from '../../../shared/Header/Header';
import Banner from '../Banner/Banner';
import ContactUs from '../ContactUs/ContactUs';
import Products from '../Products/Products/Products';
import Review from '../Review/Review'
import useAuth from '../../../hooks/useAuth';

const Home = () => {
    const { open, setOpen } = useAuth();
    // alert set up
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <Products></Products>
            <Review></Review>
            <ContactUs></ContactUs>
            <Footer></Footer>
            {/* snackbar */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Congratulations! Wellcome to TimeKeeper.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Home;