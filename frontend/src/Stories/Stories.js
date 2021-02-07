import React, { Component } from "react";
import './stories.css';
import StoryCard from '../StoryCard/StoryCard';
import axios from 'axios';
import { Row, Col, Container } from "react-bootstrap";

class Stories extends Component {
    state = {
        stories: []
    }

    getStories = async () => {
        const stories = await axios.get('http://localhost:4000/api/user/get/6014507547ebb658d4e80d2d/stories');
        return (stories.data);
    }

    componentDidMount = async () => {
        const retrievedStories = await this.getStories();
        this.setState({ stories: retrievedStories });
        console.log("state", this.state);
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