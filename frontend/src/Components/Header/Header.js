import axios from 'axios';
import React, { useState, useEffect, useContext, Component } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import './header.css';
import Axios from 'axios';
import { AuthConsumer, AuthContextType, AuthProvider } from '../../authcontext';

class Header extends Component {
    static contextType = AuthContextType;
    constructor(props) {
        super(props);
        const currentDate = new Date();
        const hourOfDay = currentDate.getHours();
        const timeOfDay = "";
        if (hourOfDay >= 0 && hourOfDay < 12) {
            this.timeOfDay = "morning";
        } else if (hourOfDay >= 12 && hourOfDay <= 16) {
            this.timeOfDay = "afternoon";
        } else if (hourOfDay > 16 && hourOfDay <= 23) {
            this.timeOfDay = "evening";
        }
    };


    componentDidMount(props) {
        console.log("this.context in the header:\t", this.context);
        this.setState({user: this.context.user});
    }


    state = {
        user: null
    }

    render(props) {
        return (
            <AuthConsumer>
                {
                    (value) => (
                        <Row className="Header">
                            <Col lg={6} md={6} sm={5} id="headerWordmark" className="text-lg-left text-md-left text-sm-left text-xs-center">
                                <span><img src="/images/Wordmark.svg"></img></span>
                            </Col>
                            <Col lg={6} md={6} sm={7} id="headerGreeting" className="text-left text-lg-right text-md-left text-sm-right d-inline d-lg-inline d-md-inline d-sm-inline">
                                {`Good ${this.timeOfDay}${this.state.user ? ', ' + this.state.user.firstName : ""}!`}
                            </Col>
                        </Row>
                    )
                }
            </AuthConsumer>
        )
    }
}

export default Header;