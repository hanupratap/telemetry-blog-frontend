import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import './404.css';

const page404 = () => {
    return(
        <Row className="Container404">
            <Col className="text-center" id="text404">
                <h1>Sorry, we couldn't find what you're looking 4-04.</h1>
            </Col>
            <Col className="text-center">
                <img src="images/Illustration404.svg" id="image404"></img>
            </Col>
        </Row>
    )
};

export default page404;