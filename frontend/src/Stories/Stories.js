import React, { Component } from "react";
import './stories.css';
import StoryCard from '../StoryCard/StoryCard';
import axios from 'axios';
import { Row, Col, Container } from "react-bootstrap";
import { render } from "@testing-library/react";

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
                <Row>
                    <span id="ContainerHeaderText">Your Stories</span>
                </Row>
                <Row>
                    <input type="submit" value="Inspired? Start a new story." id="newStoryBtn"></input>
                </Row>
                <Row >
                    {this.state.stories.map((story) => {
                        return (
                            <StoryCard story={story.content} />
                        )
                    })}
                </Row>
            </Container>
        )
    }
}

export default Stories;