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
import { AuthProvider, AuthContextType } from './authcontext';
import Auth from './Components/Auth/Auth';
import Authenticate from './Components/Authentication/Authenticate';
import Can from './Components/Can/Can';
import './App.css';
import { Profiler } from 'react';

class App extends Component {
	static contextType = AuthContextType;
	constructor(props) {
		super(props);
	}

	render(props) {
		console.log("App render called");
		// let ctxt = this.context;
		return (
			<Auth>
				<div className="App">
					<Container fluid>
						<Header />
						<Router>
							<Switch>
								<Route path="/404" exact render={(props) => (
									<Page404 {...props} />
								)}>
								</Route>

								<Route path="/signin" exact render={(props) => (
									<SignIn {...props} />
								)}>
								</Route>

								<Route path="/signup" exact render={(props) => (
									<SignUp {...props} />
								)}>
								</Route>

								<Route path="/authenticate/:randomString" exact render={(props) => (
									<Authenticate {...props} />
								)}>
								</Route>

								<Route path="/story/edit/:storyId" exact render={(props) => (
									<Editor {...props} mode="edit" />
								)}>
								</Route>

								<Route path="/story/new" exact render={(props) => (
									<Editor {...props} mode="new" />
								)}>
								</Route>

								<Route path="/story/:storyId" exact render={(props) => (
									<Editor {...props} mode="view" />
								)}>
								</Route>

								<Route path="/:username" render={(props) => (
									<UserProfile {...props} />
								)}>
								</Route>

								<Route path="/" exact render={(props) => (
									this.context.authenticated
										? <UserProfile me="true" {...props} />
										: <SignIn {...props} />
								)}>
								</Route>
							</Switch>
						</Router>
						<Footer />
					</Container>
				</div>
			</Auth>
		);
	}
};

export default App;
