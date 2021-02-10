import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './signup.css';
import axios from 'axios';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		email: "",
		name: "",
		bio: "",
		twitter: "",
		status: false,
		res: "",
		disabled: false
	}

	render = (props) => {
		return (
			<Row className="SignUp">
				<Col lg={6} md={6} sm={12} id="signupillustration" className="text-center">
					<span><img src="/images/PeopleIllustration2.svg"></img></span>
				</Col>
				<Col lg={6} md={6} sm={12} id="signupform" className="text-center">
					<form>
						<label for="email"
							className={`text-left statusText${this.state.status == false ? ' hide' : ' show'}`}>
							{this.state.res}
						</label>
						<input type="text"
							name="name"
							placeholder="Your name."
							id="nameTextBox"
							value={this.state.name}
							className="DetailsTextBox" 
							onChange={
								(event) => {
									this.setState({ name: event.target.value, status: false, disabled: false });
								}
							} />
						<input type="email"
							name="email"
							placeholder="support@telemetryblog.in"
							id="emailTextBox"
							value={this.state.email}
							className={`DetailsTextBox${this.state.status == true ? " dtbError" : ""}`}
							onChange={
								(event) => {
									this.setState({ email: event.target.value, status: false, disabled: false });
								}
							} />
						<input type="text"
							name="bio"
							placeholder="Tell us about you."
							id="bioTextBox"
							value={this.state.bio}
							className="DetailsTextBox" 
							onChange={
								(event) => {
									this.setState({ bio: event.target.value, status: false, disabled: false });
								}
							} />
						<input type="text"
							name="twitter"
							placeholder="Are you on @twitter?"
							id="socailTextBox"
							value={this.state.twitter}
							className="DetailsTextBox"
							onChange={
								(event) => {
									this.setState({ twitter: event.target.value, status: false, disabled: false });
								}
							}  />
						<input type="submit"
							className={`FormBtn`}
							disabled={this.state.disabled}
							id="signUpBtn"
							value="Sign me up."
							onClick={
								(event) => {
									event.preventDefault();
									this.setState({disabled: true})
									this.triggerSignUp();
								}
							} />
					</form>
				</Col>
			</Row>
		)
	}

	triggerSignUp = async () => {
		//validating email, return if invalid;
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(this.state.email)) {
			await axios.post("http://localhost:4000/api/user/signup", {
					email: this.state.email,
					name: this.state.name,
					bio: this.state.bio,
					twitter: this.state.twitter
				})
				.then(response => {
					this.setState({ res: response.data, status: false });
					this.setState({disabled: false});
					console.log(response);
				})
				.catch(err => {
					this.setState({ res: err.response.data, status: true });
					// alert(JSON.stringify(err));
				});
			console.log(this.state.res);
		}
		else {
			return this.setState({ status: true, res: "That's not a valid email address.", disabled: true });
		}
		const reqObj = {
			email: this.state.email,
			name: this.state.name,
			bio: this.state.bio,
			twitter: this.state.twitter
		}

		console.log(reqObj);

	}
};

export default SignUp;