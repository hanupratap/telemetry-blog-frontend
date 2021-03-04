import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthProvider } from '../../authcontext';
class Auth extends Component {
    constructor(props) {
        super(props);
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
        authenticated: localStorage.getItem('authenticated') ? localStorage.getItem('authenticated') : false,
        username: localStorage.getItem('username') ? localStorage.getItem('username') : "",
        role: localStorage.getItem('role') ? localStorage.getItem('role') : "visitor",
        token: localStorage.getItem('token') ? localStorage.getItem('token') : "" 
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
            username: "",
            role: "visitor"
        });
        return (
            <Redirect to="/signin" />
        )
    };

    setUserData = (authResult) => {
        this.setState({
            authenticated: true,
            username: authResult.username,
            role: authResult.role,
            token: authResult.token
        });
        localStorage.setItem('username', authResult.username);
        localStorage.setItem('authenticated', true);
        localStorage.setItem('role', authResult.role);
        localStorage.setItem('token', authResult.token);
    };

    render() {
        const authProviderValue = {
            ...this.state,
            initiateLogin: this.initiateLogin,
            logout: this.logout,
            setUserData: this.setUserData
        };
        console.log("The following state is set for auth:\n", this.state);
        return (
            <AuthProvider value={authProviderValue}>
                {this.props.children}
            </AuthProvider>
        );
    };
};

export default Auth;