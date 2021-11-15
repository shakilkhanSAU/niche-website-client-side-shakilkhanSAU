import React from 'react';
import Footer from '../../../shared/Footer/Footer';
import Header from '../../../shared/Header/Header';
import Banner from '../Banner/Banner';
import ContactUs from '../ContactUs/ContactUs';
import Products from '../Products/Products/Products';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <Products></Products>
            <Reviews></Reviews>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;