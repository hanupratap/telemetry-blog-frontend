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
    static contextType = AuthContextType;
    constructor(props) {
        super(props);
        this.randomString = this.props.match.params.randomString;
        this.email = new URLSearchParams(this.props.location.search).get('email');
    }

    componentDidMount(props) {
        console.log("this.context in authenticate:\t", this.context);
        axios.get(`https://telemetry-blog.herokuapp.com/api/user/authenticate/${this.randomString}?email=${this.email}`)
            .then(response => {
                console.log("User data:\t", response.data.data);
                const user = response.data.data;
                const role = response.data.role;
                const token = response.data.token;
                this.context.setUserData({
                    // username: username,
                    user: user,
                    role: role,
                    token: token
                });
                this.props.history.push(`/${user.username}`);
            })
            .catch(err => {
                this.props.history.push('/signin');
            })
    }

    render() {
        return (
            <Row className="AuthenticateContainer">
                <span className="AuthenticateMessage">Trying to sign you in with email <strong>{this.email}</strong>. <br /><br />If that works, we'll take you home.</span>
            </Row>
        )
    }
};

export default Authenticate;