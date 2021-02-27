import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import './header.css';

import Axios from 'axios';


const Header = (props) => {
    const [headerData, setHeaderData] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            Axios.get("http://localhost:4000/api/user/me", {
                headers: {
                    "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJjMDI5M2E1OTUwODIxYmNjYTdhMzAiLCJzaWduZWRJbiI6dHJ1ZSwidXNlcm5hbWUiOiJ1dGthcnNocGFudCIsImlhdCI6MTYxNDEwMTk2OX0.uf0Gz_pCAvbRIhK9hOBbExfOTRoTtwSeJaIv3-FJHnk"
                }
            })
                .then(userData => {
                    // console.log(userData.data.name);
                    console.log(userData.data.data);
                    setHeaderData(userData.data.data);
                })
                .catch(err => {
                    setHeaderData("");
                });

        };

        fetchUserData();
    }, []);

    return (
        <Row className="Header">
            <Col lg={6} md={6} sm={5} id="headerWordmark" className="text-lg-left text-md-left text-sm-left text-xs-center">
                <span><img src="/images/Wordmark.svg"></img></span>
            </Col>
            <Col lg={6} md={6} sm={7} id="headerGreeting" className="text-left text-lg-right text-md-right text-sm-left d-inline d-lg-inline d-md-inline d-sm-inline">
                {`Good morning!`}
            </Col>
        </Row>
    )
}

export default Header;