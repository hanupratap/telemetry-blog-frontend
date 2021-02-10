import React from 'react';
import { Col, Row, Toast } from 'react-bootstrap';
import './signin.css';

import Axios from 'axios';
import axios from 'axios';
import { render } from '@testing-library/react';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		email: "",
		status: false,
		res: "",
		loading: false,
		noUser: true
	}

	render = (props) => {
		return (
			<Row className="SignIn" >
				<Col lg={6} md={6} sm={12} id="signinillustration" className="text-center text-sm-center">
					<span><img src="/images/PeopleIllustration1.svg"></img></span >
				</Col>
				<Col lg={6} md={6} sm={12} className="text-center">
					<Row id="signinform" lg={12}>
						<form>
							<label for="email"
								className={`text-left statusText${this.state.status == false ? ' hide' : ' show'}`}>
								{this.state.res}
							</label>
							<input type="email"
								name="email"
								placeholder="support@telemetryblog.in"
								id="emailTextBox"
								value={this.state.email}
								className={`DetailsTextBox${this.state.status == true ? " dtbError" : ""}`}
								onChange={
									(event) => {
										this.setState({ email: event.target.value, status: false });
									}
								} />
							<br />

							<input type="submit"
								className={`FormBtn${this.state.loading == true ? " loading" : ""}`}
								id="signInBtn"
								value="Sign me in."
								disabled={this.state.loading}
								onClick={
									(event) => {
										event.preventDefault();
										this.setState({ loading: true });
										this.triggerSignIn();
									}
								} />
						</form>
					</Row>
				</Col>
			</Row>
		)
	};

	triggerSignIn = async () => {
		//validating email, return if invalid;
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(this.state.email)) {
			await axios.post("http://localhost:4000/api/user/signin", { email: this.state.email })
				.then(response => {
					this.setState({ res: response.data, status: true, loading: false });
				})
				.catch(err => {
					this.setState({ res: err.response.data, status: true, loading: false });
				});
			console.log(this.state.res);
		}
		else {
			return this.setState({ status: true, res: "That's not a valid email address.", loading: false });
		}
	}
}

export default SignIn;