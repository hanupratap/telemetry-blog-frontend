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
        this.me = (this.props.me || false);
    }

    state = {
        user: null
    }


    componentDidMount(props) {
        console.log("this.context in UserProfile:\t", this.context);
        this.props.me ?
            axios.get(`http://localhost:4000/api/user/me`,
                {
                    headers: {
                        'x-auth-token': this.context.token
                    }
                })
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
            :
            axios.get(`http://localhost:4000/api/user/get/${this.props.match.params.username}`)
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
                <Col>
                    <Row className="UserProfileHeader">
                        <Container fluid>
                            <Row className="UserProfileNameRow">
                                <Col>
                                    <SkeletonTheme color="#ffffff80" highlight="#ffffff">
                                        <span className="UserProfileFullName">{this.state.user ? this.state.user.firstName + " " + this.state.user.lastName : <Skeleton count={1} width={300} />}</span>
                                    </SkeletonTheme>
                                </Col>
                            </Row>
                            <Row className="UserProfileUsernameRow">
                                <Col>
                                    <span className="UserProfileUsername">{this.state.user ? this.state.user.username : <Skeleton height={25} />}</span>
                                </Col>
                            </Row>
                            <Row className="UserProfileBioRow">
                                <Col>
                                    <span className="UserProfileBio">{this.state.user ? this.state.user.bio : <Skeleton height={25} width={200} count={2} />}</span>
                                </Col>
                            </Row>
                            {
                                (this.state.user && (this.state.user.socialMediaHandles.twitter != ""))
                                    ? <Row className="UserProfileSocialRow">
                                        <Col>
                                            <p className="UserProfileTwitter"><a href={`https://www.twitter.com/${this.state.user.socialMediaHandles.twitter}`}><i class="fab fa-twitter"></i></a></p>
                                        </Col>
                                    </Row>
                                    : null
                            }
                        </Container>
                    </Row>
                    <Row className="BodyRow">
                        {
                            this.state.user
                                // ? `stories for ${this.state.user.username} should appear here` : <Skeleton count={1} width={300} />
                                ? <Stories user={this.state.user.username} /> : <Skeleton count={1} width={300} />
                        }
                    </Row>
                </Col>
            </Row>
        )
    }

};

export default UserProfile;