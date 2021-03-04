import React, { Component } from "react";
import './stories.css';
import StoryCard from '../StoryCard/StoryCard';
import axios from 'axios';
import { Row, Col, Container } from "react-bootstrap";

class Stories extends Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        stories: []
    }

    componentDidMount = () => {
        axios.get('http://localhost:4000/api/user/get/utkarshpant/stories')
            .then(storiesRes => {
                this.setState({ stories: storiesRes.data.data });
                // alert(JSON.stringify(this.state.stories));
            })
            .catch(err => {
                // alert(JSON.stringify(err));
            })
    };

    render() {
        return (
            <Container fluid className="StoriesContainer">
                <Row className="StoriesContainerHeader">
                    <Col lg={6} md={6} sm={12} className=" text-left text-lg-left text-md-left text-sm-left">
                        <span id="ContainerHeaderText">Stories</span>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="text-left text-lg-right text-md-right text-sm-left">
                        <input type="submit" value="Inspired? Start a new story." id="newStoryBtn"></input>
                    </Col>
                    <hr></hr>
                </Row>
                <Row className="StoriesContainerBody">
                    {this.state.stories
                        ? this.state.stories.map((story) => {
                            return (
                                <StoryCard story={story} key={story._id} />
                            )
                        })
                        : "hehe"
                    }
                </Row>
            </Container>
        )
    }
}

export default Stories;