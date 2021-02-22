import './App.css';
import Header from './Components/Header/Header';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Footer from './Components/Footer/Footer';
import Stories from './Components/Stories/Stories';
import Page404 from './Components/404Page/404';
import { Container } from 'react-bootstrap';
import React from 'react';
import Router, { Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'

// import axios from "axios";

const signInAttempt = async () => {
	alert("You're trying to sign in but nothing's set up yet dumdum!");
}

function App() {
	return (
		<div className="App">
			<Container fluid>
				<Header />
				<SignIn />
				<SignUp />
				{/* <BrowserRouter>
					<Switch>
						<Route path="/404" exact>
							<Page404 />
						</Route>
						<Route path="/signin">
						</Route>
						<Route path="/signup">
							<SignUp />
						</Route>
					</Switch>
				</BrowserRouter> */}
				<Footer />
			</Container>
		</div>
	);
};

export default App;
