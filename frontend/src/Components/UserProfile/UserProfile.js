import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import axios from 'axios';
import "./userProfile.css";
import Stories from '../Stories/Stories';

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        user: null
    }

    componentDidMount(props) {
        axios.get("http://localhost:4000/api/user/me", {
            headers: {
                "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJjMDI5M2E1OTUwODIxYmNjYTdhMzAiLCJzaWduZWRJbiI6dHJ1ZSwidXNlcm5hbWUiOiJ1dGthcnNocGFudCIsImlhdCI6MTYxNDEwMTk2OX0.uf0Gz_pCAvbRIhK9hOBbExfOTRoTtwSeJaIv3-FJHnk"
            }
        })
            .then(response => {
                const user = response.data.data;
                this.setState({
                    user: user
                })
                // alert(JSON.stringify(user));
            })
            .catch(err => {
                // alert("Err!");
            })
    }

    render(props) {
        return (
            <Row className="UserProfile">
                <Col lg={12}>
                    <Row className="HeaderRow">
                        <SkeletonTheme color="#ffffff80" highlight="#ffffff">
                            <span className="HeaderText">{this.state.user ? this.state.user.firstName + " " + this.state.user.lastName : <Skeleton count={1} width={300} />}</span>
                            <SkeletonTheme color="#ffffff22">
                                <span className="HeaderTwitterText">{this.state.user ? "@" + this.state.user.socialMediaHandles.twitter + " on Twitter" : <Skeleton count={1} width={200}/>}</span>
                            </SkeletonTheme>
                        </SkeletonTheme>
                    </Row>
                    <Row className="AboutRow">
                        <Col lg={6} className="About">
                            <span>About {this.state.user ? this.state.user.firstName : null}</span>
                        </Col>
                        <Col lg={6} className="BioText">
                            <span>{this.state.user ? this.state.user.bio : "..."}</span>
                        </Col>
                    </Row>
                    <Row className="BodyRow">
                        <Stories />
                    </Row>
                </Col>
            </Row>
        )
    }

};

export default UserProfile;