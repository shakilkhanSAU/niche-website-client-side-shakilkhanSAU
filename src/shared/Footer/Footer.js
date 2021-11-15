import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';

const Footer = () => {
    return (
        <div style={{ marginBottom: '-30px', paddingTop: '30px', paddingBottom: '20px', background: '#151931' }}>
            <Container sx={{ flexGrow: 1, }}>
                <Grid style={{ textAlign: 'left' }} container>
                    <Grid item xs={12} sm={6} md={4}>
                        <h2 style={{ color: '#1976d2', fontSize: '26px' }}>Our Support Team</h2>
                        <Box style={{ fontSize: '17px', fontWeight: '400', color: 'gray' }}>
                            <p style={{ fontSize: '17px' }}>Tech Support</p>
                            <p style={{ fontSize: '17px' }}>Software Support</p>
                            <p style={{ fontSize: '17px' }}>Online Support</p>
                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <h2 style={{ color: '#1976d2', fontSize: '26px' }}>Services</h2>
                        <Box style={{ fontSize: '17px', fontWeight: '400', color: 'gray' }}>
                            <p style={{ fontSize: '17px' }}>Emergency Serives</p>
                            <p style={{ fontSize: '17px' }}>Offline Services</p>
                            <p style={{ fontSize: '17px' }}>Online Services</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <h2 style={{ color: '#1976d2', fontSize: '26px' }}>Company Address</h2>
                        <Box style={{ fontSize: '17px', fontWeight: '400', color: 'gray' }}>
                            <p style={{ fontSize: '16px' }}>New York , Houstoon Yard -32-001</p>
                            <p style={{ marginBottom: '4px', fontSize: '18px', fontWeight: 'bold' }}>Call Now</p>
                            <div>
                                <Button variant="contained">+999 00 22 11 666</Button>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
                <p style={{ fontSize: '17px', fontWeight: '300', color: 'gray', paddingTop: '20px', textAlign: 'center' }}>Copyright 2021 All Rights Reserved</p>
            </Container>
        </div>
    );
};

export default Footer;