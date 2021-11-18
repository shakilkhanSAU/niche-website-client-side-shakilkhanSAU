import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './logo/logo-black.png'
import './Header.css'
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut()
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="navbar" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/home">
                    <img src={logo} className="img-fluid header-logo" alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className="me-lg-3 nav-link fonts" as={Link} to="/home">Home</Link>
                        <Nav.Link className="me-lg-3 nav-link fonts" as={Link} to="/allProducts">Explore Products</Nav.Link>

                        {/* <Nav.Link className="me-lg-2 fonts nav-link" as={Link} to="/myOrders">My Orders</Nav.Link>
                        <Nav.Link className="me-lg-2 fonts nav-link" as={Link} to="/allOrders">Manage Orders</Nav.Link>
                        <Nav.Link className="me-lg-2 fonts nav-link" as={Link} to="/add-tour">Add New Services</Nav.Link> 
                        
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                        */}

                        {
                            user.email ? <>
                                <Nav.Link className="me-lg-2 fonts nav-link" as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link onClick={handleLogOut} as={Link} to="/home" className="me-lg-3 fonts">Sign Out</Nav.Link>
                            </>
                                :
                                <Nav.Link className="me-lg-3 nav-link fonts" as={Link} to="/login">Sign In</Nav.Link>
                        }


                        <Navbar.Text>
                            <Link to="/user">

                                {/* <img className="user-img" src={user?.photoURL} alt="" /> : */}
                                <span className="user-logo fonts"><i className="fas fa-user"></i></span>

                            </Link>
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;