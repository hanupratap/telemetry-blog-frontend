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

    const onDeleteHandler = (deletedStoryId) => {
        console.log("Deletion handler called");
        axios.delete(`http://localhost:4000/api/story/delete/${deletedStoryId}`)
            .then(response => {
                props.handleDeletion(deletedStoryId);
            })
            .catch(err => {
                console.log("Error in deletion", err);
            })
        // TODO: Set up the DELETE request here
        // using axios;
    }

    return (
        <Container fluid className="StoryCard">
            <a href={`/story/${props.story._id}`} className="StoryCardLink">

                <Row>
                    <span className="storyTitle">{props.story.content.title}</span>
                </Row>
                <Row>
                    <span className="storySubtitle">{props.story.content.subtitle}</span>
                </Row>
            </a>
            {
                props.story.tags.length != 0
                    ? <Row className="storyTags">
                        {props.story.tags.map((tag, tagIndex) => (
                            <span className="storyTag" key={tagIndex}>{tag}</span>
                        ))}
                    </Row>
                    : null
            }
            <Can
                role={authContext.role}
                perform="posts:edit"
                data={{ username: authContext.user ? authContext.user.username : null, postOwner: props.story.owner }}
                yes={() => (
                    <Row className="StoryEditControlsContainer">
                        <Col lg={1} md={1} sm={12} xs={12} className="text-left">
                            <Link to={`story/edit/${props.story._id}`} id="editStoryLink" className="StoryOptions">Edit</Link>
                        </Col>
                        <Col lg={2} md={2} sm={12} xs={12} className="text-md-center text-sm-left">
                            <a href={`localhost:4000/api/story/${props.story.isPublished ? "unpublish" : "publish"}/${props.story._id}`} id="unpublishStoryLink" className="StoryOptions">{props.story.isPublished ? "Unpublish" : "Publish"}</a>
                        </Col>
                        <Col lg={1} md={1} sm={12} xs={12} className="text-md-right text-sm-left">
                            <span id="deleteStoryLink" className="StoryOptions" onClick={(event) => {
                                onDeleteHandler(props.story._id);
                            }}>Delete</span>
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