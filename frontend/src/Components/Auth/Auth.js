import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthProvider } from '../../authcontext';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.user = JSON.parse(localStorage.getItem('user'));
    };

    /*
        This component is meant to hold information regarding
        any currently logged-in users and to provide methods 
        to children consuming this information, to update it.

        initiateLogin: redirects to the log-in page.

        logout: clears localstorage and resets the state.

        setUserData: method to set the state and save this data to localStorage.

        Since this component's state is passed down as context data,
        this is the place to check existing values in localStorage
        and pass them down via context data.
    */

    state = {
        authenticated: Boolean(localStorage.getItem('authenticated')) || false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        role: localStorage.getItem('role') || 'visitor',
        token: localStorage.getItem('token') || '',
    };

    initiateLogin = () => {
        return (
            this.props.history.push('/signin')
        )
    };

    logout = () => {
        localStorage.clear();
        this.setState({
            authenticated: false,
            user: "",
            role: "visitor",
            token: null
        });
        window.location.reload();
    };

    setUserData = (authResult) => {
        console.log("Auth provider setUserData called");
        this.setState({
            authenticated: true,
            user: authResult.user,
            role: authResult.role,
            token: authResult.token,
        });
        localStorage.setItem('user', JSON.stringify(authResult.user));
        localStorage.setItem('authenticated', true);
        localStorage.setItem('role', authResult.role);
        localStorage.setItem('token', authResult.token);
    };

    render() {
        console.log("Auth provider render called");
        const authProviderValue = {
            ...this.state,
            initiateLogin: this.initiateLogin,
            logout: this.logout,
            setUserData: this.setUserData
        };
        return (
            <AuthProvider value={authProviderValue}>
                {this.props.children}
            </AuthProvider>
        );
    };
};

export default Auth;