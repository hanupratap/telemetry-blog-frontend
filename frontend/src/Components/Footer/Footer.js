import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './footer.css';

const footer = () => {
    return(
        <Row className="Footer">
            <Col lg={4} md={4} sm={12} className="text-lg-center text-md-left" id="footerWordmark">
                <span><img src="/images/WordmarkWhite.svg"></img></span>
            </Col>
            <Col lg={4} md={4} sm={12} className="text-lg-center text-md-left">
                <span>Made by Utkarsh Pant.</span>
            </Col>
            <Col lg={4} md={4} sm={12} className="text-lg-center text-md-left">
                <span>twitter.com/Utkarshpant15</span>
            </Col>
        </Row>
    )
};

export default footer;