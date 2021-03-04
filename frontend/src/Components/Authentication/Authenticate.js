import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthConsumer, AuthContextType, AuthProvider } from '../../authcontext';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './authenticate.css';

/*
    This component is rendered when the user clicks
    on the sign-in link in the email.

    It receives the setter method 'setUserData' from the AuthContext Provider,
    to set the state and thus the context that is passed down to all Consumers.

    The data (username) to be set in the context is passed down as a prop.
*/
class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.randomString = this.props.match.params.randomString;
        this.email = new URLSearchParams(this.props.location.search).get('email');
        // this.email = query.entries()[1];
        console.log("Email", this.email);
    }


    static contextType = AuthContextType;

    componentDidMount(props) {
        const ctxt = this.context;
        axios.get(`http://localhost:4000/api/user/authenticate/${this.randomString}?email=${this.email}`)
            .then(response => {
                console.log("Response", response);
                const username = response.data.data.username;
                const role = response.data.role;
                const token = response.data.token;
                ctxt.setUserData({
                    username: username,
                    role: role,
                    token: token
                });
            })
            .catch(err => {
                alert("Sorry, we couldn't sign you in. Try signing in again.");
                console.log("Error:\t", err);
            })
    }

    render() {
        return (
            <Row className="AuthenticateContainer">
                <span>Trying to sign you in with email {this.email}. If that works, we'll take you home.</span>
            </Row>
        )
    }
};

export default Authenticate;