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
					<input type="email" name="email" placeholder="support@telemetryblog.in"/><br></br>
					<input type="submit" value="Sign me in." />
				</form>
			</Col>
		</Row>
	)
}

export default signin;