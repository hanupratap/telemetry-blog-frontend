import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import axios from 'axios';
import "./userProfile.css";
import Stories from '../Stories/Stories';
import { AuthContextType } from '../../authcontext';

class UserProfile extends Component {
    static contextType = AuthContextType;
    constructor(props) {
        super(props);
        this.me = this.props.me || false;
    }

    state = {
        user: null
    }


    componentDidMount(props) {
        console.log("this.context in userprofile:\t", this.context);
        this.props.me ?
            axios.get(`http://localhost:4000/api/user/me`,
                {
                    headers: {
                        'x-auth-token': this.context.token
                    }
                })
                .then(response => {
                    console.log("Me was called");
                    const user = response.data.data;
                    this.setState({
                        user: user
                    })
                })
                .catch(err => {
                    // check if the error is 404. Then redirect to 404!
                    // console.log(err.data);
                    this.props.history.push('/404');
                })
            : axios.get(`http://localhost:4000/api/user/get/${this.props.match.params.username}`)
                .then(response => {
                    const user = response.data.data;
                    this.setState({
                        user: user
                    })
                })
                .catch(err => {
                    // check if the error is 404. Then redirect to 404!
                    // console.log(err.data);
                    this.props.history.push('/404');
                })

    };

    render(props) {
        return (
            <Row className="UserProfile">
                <Col lg={12}>
                    <Row className="HeaderRow">
                        <SkeletonTheme color="#ffffff80" highlight="#ffffff">
                            <span className="HeaderText">{this.state.user ? this.state.user.firstName + " " + this.state.user.lastName : <Skeleton count={1} width={300} />}</span>
                            <SkeletonTheme color="#ffffff22">
                                <span className="HeaderTwitterText">{this.state.user ? <a className="TwitterLink" href={`https://twitter.com/${this.state.user.socialMediaHandles.twitter}`}>{"@" + this.state.user.socialMediaHandles.twitter + " on Twitter"}</a> : <Skeleton count={1} width={200} />}</span>
                            </SkeletonTheme>
                        </SkeletonTheme>
                    </Row>
                    <Row>
                        <Col lg={6} md={12} className="About">
                            <span className="AboutRow">About {this.state.user ? this.state.user.firstName : null}</span>
                        </Col>
                        <Col lg={6} md={12}>
                            <p className="BioText">{this.state.user ? this.state.user.bio : "..."}</p>
                        </Col>
                    </Row>
                    <Row className="BodyRow">
                        {
                            this.state.user ? <Stories user={this.state.user.username }/> : <Skeleton count={1} width={300} />
                        }
                    </Row>
                </Col>
            </Row>
        )
    }

};

export default UserProfile;