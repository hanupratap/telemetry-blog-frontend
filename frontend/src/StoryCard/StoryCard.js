import React from "react";
import './storycard.css';
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";

const storycard = (props) => {
    return (
        <Container fluid className="StoryCard">
            <Row>
                <span className="storyTitle">{props.story.title}</span>
            </Row>
            <Row>
                <span className="storySubtitle">{props.story.subtitle}</span>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={12} xs={12} className="text-left">
                    <a href="" id="editStoryLink" className="StoryOptions">Edit</a>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12}>
                    <a href="" id="unpublishStoryLink" className="StoryOptions">Unpublish</a>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12}>
                    <a href="" id="deleteStoryLink" className="StoryOptions">Delete</a>
                </Col>
            </Row>
        </Container>
    )
};

export default storycard;