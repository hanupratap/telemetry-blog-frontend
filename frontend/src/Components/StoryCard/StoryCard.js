import React, { useContext } from "react";
import Can from "../Can/Can";
import { AuthContextType } from './../../authcontext';
import './storycard.css';
import axios from 'axios';
import { Container, Row, Col, } from "react-bootstrap";
import { Link } from 'react-router-dom';


const Storycard = (props) => {

    const authContext = useContext(AuthContextType);

    const onUnpublishHandler = (event) => {
        event.preventDefault();
        
        // TODO: Set up the unpublish POST request here
        // using axios;
    }

    const onDeleteHandler = (event) => {
        event.preventDefault();

        // TODO: Set up the DELETE request here
        // using axios;
    }

    return (
        <Container fluid className="StoryCard">
            <Row>
                <span className="storyTitle">{props.story.content.title}</span>
            </Row>
            <Row>
                <span className="storySubtitle">{props.story.content.subtitle}</span>
            </Row>
            <Row className="storyTags">
                {props.story.tags.map((tag, tagIndex) => (
                    <span className="storyTag" key={tagIndex}>{tag}</span>
                ))}
                {/* {alert(JSON.stringify(props.story.tags))} */}
            </Row>
            <Can
                role={authContext.role}
                perform="posts:edit"
                data={{ username: authContext.user ? authContext.user.username : null, postOwner: props.story.owner }}
                yes={() => (
                    <Row className="StoryEditControlsContainer">
                        <Col lg={1} md={1} sm={12} xs={12} className="text-left">
                            <Link to={`/edit/${props.story._id}`} id="editStoryLink" className="StoryOptions">Edit</Link>
                        </Col>
                        <Col lg={2} md={2} sm={12} xs={12} className="text-md-center text-sm-left">
                            <a href={`localhost:4000/api/story/unpublish/${props.story._id}`} id="unpublishStoryLink" className="StoryOptions">Unpublish</a>
                        </Col>
                        <Col lg={1} md={1} sm={12} xs={12} className="text-md-right text-sm-left">
                            <a href={`localhost:4000/api/story/delete/${props.story._id}`} id="deleteStoryLink" className="StoryOptions">Delete</a>
                        </Col>
                        {
                            console.log("authcontext username:", authContext.user.username, "post owner:", props.story.owner)
                        }
                    </Row>
                )}
                no={() => {
                    return null;
                }}
            />
        </Container>
    )
};

export default Storycard;