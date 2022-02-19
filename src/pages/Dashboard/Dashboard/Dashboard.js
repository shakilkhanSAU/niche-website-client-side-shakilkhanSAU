import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom'
import MyOrders from '../MyOrders/MyOrders';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import AddProduct from '../AddProduct/AddProduct';
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
import ManageAllOrders from '../ManageAllOrders/ManageAllOrders';
import AddReview from '../Review/AddReview';
import Payment from '../Payment/Payment';

const drawerWidth = 200;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();
    const { admin, logOut } = useAuth();

    const handleLogOut = () => {
        logOut();
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List style={{ paddingLeft: '0px' }}>
                <ListItem button>
                    <NavLink
                        style={{ fontWeight: '500', fontSize: '16px', textDecoration: 'none', color: '#151931', width: '100%' }}
                        to="/"
                    >
                        Home
                    </NavLink>
                </ListItem>
                <ListItem button>
                    <NavLink
                        style={{ fontWeight: '500', fontSize: '16px', textDecoration: 'none', color: '#151931', width: '100%' }}
                        to="/allProducts"
                    >
                        Explore Products
                    </NavLink>
                </ListItem>
                {/* <ListItem button>
                    <NavLink
                        style={{ fontWeight: '500', fontSize: '16px', textDecoration: 'none', color: '#151931', width: '100%' }}
                        to={`${url}/pay`}
                    >
                        Pay Now
                    </NavLink>
                </ListItem> */}
                {/* <ListItem button>
                    <NavLink
                        style={{ fontWeight: '500', fontSize: '16px', textDecoration: 'none', color: '#151931', width: '100%' }}
                        to={`${url}`}
                    >
                        Manage Orders
                    </NavLink>
                </ListItem> */}
                {
                    admin && <>
                        <ListItem button>
                            <NavLink
                                style={{ fontWeight: '500', fontSize: '16px', textDecoration: 'none', color: '#151931', width: '100%' }}
                                to={`${url}/manageAllOrders`}
                            >
                                Manage All Orders
                            </NavLink>
                        </ListItem>
                        <ListItem button>
                            <NavLink
                                style={{ fontWeight: '500', fontSize: '16px', textDecoration: 'none', color: '#151931', width: '100%' }}
                                to={`${url}/addProduct`}
                            >
                                Add New Product
                            </NavLink>
                        </ListItem>
                        <ListItem button>
                            <NavLink
                                style={{ fontWeight: '500', fontSize: '16px', textDecoration: 'none', color: '#151931', width: '100%' }}
                                to={`${url}/makeAdmin`}
                            >
                                Make Admin
                            </NavLink>
                        </ListItem>

                    </>
                }
                <ListItem button>
                    <NavLink
                        style={{ fontWeight: '500', fontSize: '16px', textDecoration: 'none', color: '#151931', width: '100%' }}
                        to={`${url}/review`}
                    >
                        Review
                    </NavLink>
                </ListItem>
                <ListItem button>
                    <button onClick={handleLogOut} style={{ backgroundColor: 'transparent', border: 'none', fontWeight: '500', fontSize: '16px' }}>Log out</button>
                </ListItem>
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar style={{ background: '#151931' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Box>
                    <Switch>
                        <Route exact path={path}>
                            <MyOrders></MyOrders>
                        </Route>
                        <Route path={`${path}/payment/:orderId`}>
                            <Payment></Payment>
                        </Route>
                        <AdminRoute path={`${path}/makeAdmin`}>
                            <MakeAdmin></MakeAdmin>
                        </AdminRoute>
                        <Route path={`${path}/review`}>
                            <AddReview></AddReview>
                        </Route>
                        <AdminRoute path={`${path}/addProduct`}>
                            <AddProduct></AddProduct>
                        </AdminRoute>
                        <AdminRoute path={`${path}/manageAllOrders`}>
                            <ManageAllOrders></ManageAllOrders>
                        </AdminRoute>
                    </Switch>
                </Box>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
