import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import './header.css';

import Axios from 'axios';


const Header = (props) => {
    const [headerData, setHeaderData] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            Axios.get("http://localhost:4000/api/user/get/601ed9638310d35dbc01997a")
                .then(userData => {
                    // console.log(userData.data.name);
                    console.log(userData.data.firstName);
                    setHeaderData(userData.data);
                })
                .catch(err => {
                    setHeaderData("");
                });

        };

        fetchUserData();
    }, []);

    return (
        <Row className="Header">
            <Col lg={6} md={6} sm={12} id="headerWordmark" className="text-lg-left text-md-left text-sm-left text-xs-center">
                <span><img src="/images/Wordmark.svg"></img></span>
            </Col>
            <Col lg={6} md={6} sm={6} id="headerGreeting" className="text-left text-lg-right text-md-right text-sm-left d-none d-lg-inline d-md-inline d-sm-none">
                {`Good morning${(headerData) ? ", " : ""}${(headerData) ? headerData.firstName : ""}!`}
            </Col>
        </Row>
    )
}

export default Header;