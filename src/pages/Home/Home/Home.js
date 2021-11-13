import React from 'react';
import Header from '../../../shared/Header/Header';
import Banner from '../Banner/Banner';
import Products from '../Products/Products/Products';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <Products></Products>
        </div>
    );
};

export default Home;