import React, { useContext } from "react";
import Can from "../Can/Can";
import { AuthContextType } from './../../authcontext';
import './searchstorycard.css';
import axios from 'axios';
import { Container, Row, Col, } from "react-bootstrap";
import { Link } from 'react-router-dom';
import _ from 'lodash';


const SearchStoryCard = (props) => {
    const authContext = useContext(AuthContextType);

    return (
        <div className="SearchStoryCard">
            <div className="StoryDetails">
                <a href={`/story/${props.story._id}`} className="SearchStoryCardLink">
                    <div className="SearchStoryTitle">
                        <span>{props.story.content.title}</span>
                    </div>
                    <div className="SearchStorySubtitle">
                        <span >{props.story.content.subtitle ? props.story.content.subtitle.substring(0, 30) + '...' : ""}</span>
                    </div>
                </a>
                <div className="OwnerDetails">
                    by <strong>{props.story.owner}</strong>
                </div>
            </div>
        </div>
    )
};

export default SearchStoryCard;