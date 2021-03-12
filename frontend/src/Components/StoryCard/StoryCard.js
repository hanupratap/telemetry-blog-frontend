import React, { useContext } from "react";
import Can from "../Can/Can";
import { AuthContextType } from './../../authcontext';
import './storycard.css';
import axios from 'axios';
import { Container, Row, Col, } from "react-bootstrap";
import { Link } from 'react-router-dom';
import _ from 'lodash';


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
        <div className="StoryCard">
            <div className="StoryDetails">
                <a href={`/story/${props.story._id}`} className="StoryCardLink">

                    <div className="StoryCardTitle">
                        <span>{props.story.content.title}</span>
                    </div>
                    <div className="StoryCardSubtitle">
                        <span >{props.story.content.subtitle.substring(0, 30) + '...'}</span>
                    </div>
                </a>
            </div>
            <Can
                role={authContext.role}
                perform="posts:edit"
                data={{ username: authContext.user ? authContext.user.username : null, postOwner: props.story.owner }}
                yes={() => (
                    <div className="StoryEditControlsContainer">
                        <div className="text-left">
                            <a href={`story/edit/${props.story._id}`} id="editStoryLink" className="StoryOptions">Edit</a>
                        </div>
                        <div className="text-md-left text-sm-left">
                            <a href={`localhost:4000/api/story/${props.story.isPublished ? "unpublish" : "publish"}/${props.story._id}`} id="unpublishStoryLink" className="StoryOptions">{props.story.isPublished ? "Unpublish" : "Publish"}</a>
                        </div>
                        <div className="text-md-left text-sm-left">
                            <span id="deleteStoryLink" className="StoryOptions" onClick={(event) => {
                                onDeleteHandler(props.story._id);
                            }}>Delete</span>
                        </div>
                        {
                            console.log("authcontext username:", authContext.user.username, "post owner:", props.story.owner)
                        }
                    </div>
                )}
                no={() => {
                    return null;
                }}
            />
        </div>
    )
};

export default Storycard;