import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import './header.css';

import Axios from 'axios';


const Header = (props) => {
    const [headerData, setHeaderData] = useState("");

    useEffect(() => {
        const fetchUserData =  async () => {
            const userData = await Axios.get("http://localhost:4000/api/user/get/6014507547ebb658d4e80d2d");
            // console.log(userData.data.name);
            if (userData.status == "404") {
                setHeaderData(""); 
            } else {
                setHeaderData(userData.data); 
            }       
        };

        fetchUserData();
    }, []);

    return (
        <Row className="Header">
            <Col lg={6} md={6} sm={12} id="headerWordmark" className="text-lg-left text-md-left text-sm-left text-xs-center">
                <span><img src="/images/Wordmark.svg"></img></span>
            </Col>
            <Col lg={6} md={6} sm={6} id="headerGreeting" className="text-left text-lg-right text-md-right text-sm-left d-none d-lg-inline d-md-inline d-sm-none">
                {`Good morning${(headerData) ? ", " : ""}${(headerData) ? headerData.name : ""}!`}
            </Col>
        </Row>
    )
}

export default Header;