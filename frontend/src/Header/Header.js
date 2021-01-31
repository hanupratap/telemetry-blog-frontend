import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import './header.css';


const header = (props) => {
    let headerGreeting;
    if (props.name) {
        headerGreeting = <span>Good afternoon, <strong>{props.user}!</strong></span>
    } else {
        headerGreeting = "";
    }
    return (
        <Row className="Header">
            <Col lg={6} md={6} sm={12} id="headerWordmark" className="text-lg-left text-md-left text-sm-left text-xs-center">
                <span><img src="/images/Wordmark.svg"></img></span>
            </Col>
            <Col lg={6} md={6} sm={12} id="headerGreeting" className="text-lg-right text-md-right text-sm-left text-xs-center">
                {headerGreeting}
            </Col>
        </Row>
    )
}

export default header;