import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './footer.css';

const footer = () => {
    return (
        <Row className="Footer">
            <Col md={4} sm={12} className="text-lg-center text-md-left" id="footerWordmark">
                <span><a href="/"><img src="/images/WordmarkWhite.svg"></img></a></span>
            </Col>
            <Col md={4} sm={12} className="text-lg-center text-md-left text-sm-left FooterText">
                    <span>Made by Utkarsh Pant.</span>
                    <a href="https://github.com/utkarshpant" className="FooterLink"><i class="fab fa-github"></i></a>
                    <a href="https://twitter.com/utkarshpant15" className="FooterLink"><i class="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/in/utkarshpant" className="FooterLink"><i class="fab fa-linkedin"></i></a>
            </Col>
            <Col md={4} sm={12} className="text-lg-center text-md-left">
                <span>Like all stories, this story is always evolving.</span>
            </Col>
        </Row>
    )
};

export default footer;