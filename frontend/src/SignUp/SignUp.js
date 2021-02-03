import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './signup.css';

const signup = (props) => {
	return (
		<Row className="SignUp">
			<Col lg={6} md={6} sm={12} id="signupillustration" className="text-center">
				<span><img src="/images/PeopleIllustration2.svg"></img></span>
			</Col>
			<Col lg={6} md={6} sm={12} id="signupform" className="text-center">
				<form>
						<input type="name" name="name" placeholder="Your name" id="nameTextBox" className="DetailsTextBox" />
						<input type="email" name="email" placeholder="support@telemetryblog.in" id="emailTextBox" className="DetailsTextBox" />
						<input type="text" name="bio" placeholder="Tell us about you." id="bioTextBox" className="DetailsTextBox"/>
						<input type="text" name="twitter" placeholder="Are you on @twitter?" id="socailTextBox" className="DetailsTextBox"/>
						<input type="submit" className="FormBtn" id="signUpBtn" value="Sign me up." onClick={props.onLoginFunc} />
				</form>
			</Col>
		</Row>
	)
}

export default signup;