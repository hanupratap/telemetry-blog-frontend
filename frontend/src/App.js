// standard imports;
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
// import { Switch } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// component imports;
import Page404 from './Components/404Page/404';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Stories from './Components/Stories/Stories';
import UserProfile from './Components/UserProfile/UserProfile';
import Editor from './Components/Editor/Editor';
import { AuthProvider } from './authcontext';
import Auth from './Components/Auth/Auth';
import Authenticate from './Components/Authentication/Authenticate';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render(props) {
		return (
			<div className="App">
				<Auth>
					<Container fluid>
						<Header />
						<Router>
							<Switch>
							<Route path="/" exact component={SignIn}>
								</Route>
								<Route path="/404" exact>
									<Page404 />
								</Route>
								<Route path="/signin" exact>
									<SignIn />
								</Route>
								<Route path="/signup" exact>
									<SignUp />
								</Route>
								<Route path="/authenticate/:randomString" component={Authenticate}>
									{/* <UserProfile /> */}
								</Route>
								<Route path="/:username" component={UserProfile}>
									{/* <UserProfile /> */}
								</Route>
							</Switch>
						</Router>
						<Footer />
					</Container>
				</Auth>
			</div>
		);
	}
};

export default App;
