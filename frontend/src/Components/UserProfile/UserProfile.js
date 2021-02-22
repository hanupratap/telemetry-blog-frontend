import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        user: this.props.user
    }

    componentDidMount(props) {
        axios.get("")
    }

};