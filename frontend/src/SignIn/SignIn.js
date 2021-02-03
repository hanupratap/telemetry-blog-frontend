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
		show: true
	}

	render = (props) => {
		return (
			<Row className="SignIn">
				<Col lg={6} md={6} sm={12} id="signinillustration" className="text-center">
					<span><img src="/images/PeopleIllustration1.svg"></img></span>
				</Col>
				<Col lg={6} md={6} sm={12} className="text-center">
					<Row id="signinform">
						<form>
							<input type="email"
								name="email"
								placeholder="support@telemetryblog.in"
								id="emailTextBox"
								value={this.state.email}
								className="DetailsTextBox"
								onChange={(event) => {
									this.setState({ email: event.target.value });
								}}
							/><br></br>

							<input type="submit"
								className="FormBtn"
								id="signInBtn"
								value="Sign me in."
								onClick={(event) => {
									event.preventDefault();
									this.triggerSignIn();
								}}
							/>
							{/* <input type="submit" id="signUpBtn" value="Sign me up." /> */}
						</form>
					</Row>
				</Col>
			</Row>
		)
	}

	triggerSignIn = async () => {
		await axios.post("http://localhost:4000/api/user/signin", { email: this.state.email })
			.then(response => {
				this.setState({ res: response.data });
				alert(this.state.res);
			})
			.catch(err => {
				this.setState({ res: err.response.data });
				alert(this.state.res);
			});
		console.log(this.state.res);
		// this.setState({res: this.state.res + 1});
	}
}

export default SignIn;