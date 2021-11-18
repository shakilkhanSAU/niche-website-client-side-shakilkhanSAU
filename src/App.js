import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home/Home';
import Login from './pages/Login/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import AllProducts from './pages/AllProducts/AllProducts';
import BuyNow from './pages/BuyNow/BuyNow';
import Register from './pages/Login/Register/Register'
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard'

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<BrowserRouter>
					<Switch>
						<Route exact path="/">
							<Home></Home>
						</Route>
						<Route path="/home">
							<Home></Home>
						</Route>
						<Route path="/login">
							<Login></Login>
						</Route>
						<Route path="/register">
							<Register></Register>
						</Route>
						<Route path="/allProducts">
							<AllProducts></AllProducts>
						</Route>
						<PrivateRoute path="/buyNow/:id">
							<BuyNow></BuyNow>
						</PrivateRoute>
						<PrivateRoute path="/dashboard">
							<Dashboard></Dashboard>
						</PrivateRoute>
						<Route path="*">
							<NotFound></NotFound>
						</Route>
					</Switch>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
