import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import './signin.css';

const signin = (props) => {
	return (
		<Row className="SignIn">
			<Col lg={6} md={6} sm={12} id="signinillustration" className="text-center">
				<span><img src="/images/PeopleIllustration1.svg"></img></span>
			</Col>
			<Col lg={6} md={6} sm={12} id="signinform" className="text-center">
				<form>
					<input type="email" name="email" placeholder="support@telemetryblog.in" id="emailTextBox"/><br></br>
					<input type="submit" id="signInBtn" value="Sign me in." onClick={props.onLoginFunc}/>
					<input type="submit" id="signUpBtn" value="Sign me up." />
				</form>
			</Col>
		</Row>
	)
}

export default signin;