import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import './usercard.css';

class UserCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className={`UserCard_${this.props.size}`}>
                    <Row className={`UserCardNameRow_${this.props.size}`}>
                        <Col>
                            <span className={`UserCardFullName_${this.props.size}`}>{this.props.user.firstName + " " + this.props.user.lastName}</span>
                        </Col>
                    </Row>
                    <Row className={`UserCardUsernameRow_${this.props.size}`}>
                        <Col>
                            <span className={`UserCardUsername_${this.props.size}`}>{this.props.user.username}</span>
                            {
                                this.props.user.socialMediaHandles.twitter
                                    ? <p className={`UserCardTwitter_${this.props.size}`}><a href={`https://www.twitter.com/${this.props.user.socialMediaHandles.twitter}`}><i class="fab fa-twitter"></i></a></p>
                                    : null
                            }
                        </Col>

                    </Row>
                    {/* <Row className={`UserCardBioRow_${this.props.size}`}>
                        <Col>
                            <span className={`UserCardBio_${this.props.size}`}>{this.props.user.bio}</span>
                        </Col>
                    </Row> */}
                </div>
            </React.Fragment>
        )
    }
};

export default UserCard;