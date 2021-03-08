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
								<Route path="/404" exact>
									<Page404 />
								</Route>
								
								<Route path="/signin" exact>
									<SignIn />
								</Route>
								
								<Route path="/signup" exact>
									<SignUp />
								</Route>
								
								<Route path="/authenticate/:randomString" exact component={Authenticate}>
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
								
								<Route path="/:username" component={UserProfile}>
									{/* <UserProfile user={this.props.match.username}/> */}
								</Route>
								
								<Route path="/" exact>
									{
										this.context.authenticated
											? <UserProfile me="true" />
											: <SignIn />
									}
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
