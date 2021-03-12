import React, { Component } from "react";
import './stories.css';
import StoryCard from '../StoryCard/StoryCard';
import axios from 'axios';
import { Row, Col, Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AuthConsumer, AuthContextType } from '../../authcontext';
import Can from "../Can/Can";
import { withRouter } from 'react-router-dom';

class Stories extends Component {
    static contextType = AuthContextType;
    constructor(props) {
        super(props);
        this.user = this.props.user;
        this.handleDeletion.bind(this);
        this.newStoryButtonHandler.bind(this);
    }

    state = {
        stories: []
    }

    handleDeletion = (deletedStoryId) => {
        const newStoryList = this.state.stories.filter((story) => {
            return story._id != deletedStoryId
        });
        this.setState({ stories: newStoryList });
    }

    componentDidMount = () => {
        axios.get(`http://localhost:4000/api/user/get/${this.user}/stories`)
            .then(storiesRes => {
                this.setState({ stories: storiesRes.data.data });
                console.log("Stories", storiesRes.data.data);
                // alert(JSON.stringify(this.state.stories));
            })
            .catch(err => {
                // alert(JSON.stringify(err));
            })
    };

    newStoryButtonHandler = () => {
        if (this.context.authenticated) {
            this.props.history.push('/story/new');
        } else {
            this.props.history.push('/signin');
        }
    }

    render() {
        console.log("Rendering stories for user", this.user);
        return (
            <AuthConsumer>
                {(value) => (
                    <Container fluid className="StoriesContainer">
                        <Row className="StoriesContainerHeader">
                            <Col className=" text-left text-lg-left text-md-left text-sm-left">
                                <span id="ContainerHeaderText">Stories</span>
                            </Col>
                            <Col className="text-left text-lg-right text-md-right text-sm-left">
                                <input type="submit" value="Inspired? Start a new story." id="newStoryBtn" onClick={() => {
                                    this.newStoryButtonHandler();
                                }}></input>
                            </Col>
                            <hr></hr>
                        </Row>
                        <Row className="StoriesContainerBody">
                            {
                                this.state.stories
                                    ? <Can
                                        role={value.role}
                                        perform="posts:edit"
                                        data={{
                                            username: value.authenticated ? value.user.username : null,
                                            postOwner: this.user
                                        }}
                                        yes={() => (
                                            <React.Fragment>
                                                {   
                                                    this.state.stories.length != 0
                                                    ? this.state.stories.map((story) => {
                                                        return (
                                                            <StoryCard story={story} key={story._id} handleDeletion={this.handleDeletion} />
                                                        )
                                                    })
                                                    : <p>
                                                        Looks like you haven't published anything yet. Go on, tell the world your story.
                                                    </p>
                                                }
                                            </React.Fragment>
                                        )}
                                        no={() => (
                                            <React.Fragment>
                                                {
                                                    this.state.stories.filter((story) => {
                                                        return story.isPublished;
                                                    }).length != 0
                                                        ? this.state.stories.filter((story) => {
                                                            return story.isPublished;
                                                        }).map((story) => {
                                                            return <StoryCard story={story} key={story._id} />
                                                        })
                                                        : <p>Looks like this user hasnt published anything yet. Come back later!</p>
                                                }
                                            </React.Fragment>
                                        )}
                                    />
                                    : <Skeleton count={1} height={100} />
                            }

                        </Row>
                    </Container>
                )}
            </AuthConsumer>
        )
    }
};


export default withRouter(Stories);