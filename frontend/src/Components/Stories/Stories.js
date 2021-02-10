import React, { Component } from "react";
import './stories.css';
import StoryCard from '../StoryCard/StoryCard';
import axios from 'axios';
import { Row, Col, Container } from "react-bootstrap";

class Stories extends Component {
    state = {
        stories: []
    }

    componentDidMount = () => {
        axios.get('http://localhost:4000/api/user/get/6014507547ebb658d4e80d2d/stories')
            .then(storiesRes => {
                this.setState({stories: storiesRes});
            })
            .catch(err => {
                alert("An error occured in retrieving the user's Stories. Try again in a bit!");
            })
    };

    render() {
        return (
            <Container fluid className="StoriesContainer">
                <Row className="ContainerHeader">
                    <Col lg={6} md={6} sm={12} className=" text-left text-lg-left text-md-left text-sm-left">
                        <span id="ContainerHeaderText">Your stories.</span>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="text-left text-lg-right text-md-right text-sm-left">
                        <input type="submit" value="Inspired? Start a new story." id="newStoryBtn"></input>
                    </Col>
                    <hr></hr>
                </Row>
                <Row >
                    {this.state.stories.map((story) => {
                        return (
                            <StoryCard story={story.content} key={story._id}/>
                        )
                    })}
                </Row>
            </Container>
        )
    }
}

export default Stories;