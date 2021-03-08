import React, { Component } from "react";
import ReactQuill, { Quill } from 'react-quill';
import { Row, Col, Container } from 'react-bootstrap';
import 'react-quill/dist/quill.bubble.css'; // ES6
import './editor.css';
import Input from "../Input/Input";
import { AuthContextType, AuthConsumer } from '../../authcontext';
import axios from "axios";

/*
    This component is the Editor for stories,
    designed to be used for reading as well as editing stories.

    When a new story is created or an existing story is to be edited,
    the following workflow should run in order to set up the story and the editor
    for the task at hand:

    Existing story being edited:
    1. Check if the story being edited actually belongs to the currently signed in user
    2. Load the story and its contents in the relevant inputs.
    3. 
*/
class Editor extends Component {
    static contextType = AuthContextType;

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.reactQuillRef = null;      //react component;
        this.quillRef = null;           //quill instance reference;
    };

    state = {
        storyId: "",
        storyTitle: "",
        storySubtitle: "",
        storyBody: "",
    };

    handleChange(content, delta, source, editor) {
        this.setState({ storyBody: content });
    };

    /*
        if the editor is opened in 'edit' mode, 
        the story must be retrieved and the editor must be populated with it.
        But before that, ownership needs to be checked!
    */
    componentDidMount() {
        this.attachQuillRef();
        this.quillRef.focus();
        
        // if editing an existing story, retrieve it and check ownership
        // if all good, set editor values;
        if (this.props.mode == "edit") {
            axios.get(`http://localhost:4000/api/story/get/${this.props.match.params.storyId}`)
                .then(response => {
                    const story = response.data;
                    if (story.owner == this.context.user.username) {
                        this.setState({
                            storyId: story._id,
                            storyTitle: story.content.title,
                            storySubtitle: story.content.subtitle,
                            storyBody: story.content.body
                        })
                    } else {
                        alert("You aren't allowed to do that!");
                        this.props.history.push('/signin');
                    }
                })
                .catch(err => {
                    console.log("Error occured in getting story", err);
                })
        }

        // if viewing an existing story, retrieve it and set
        // the editor values, with all fields disabled;
        if (this.props.mode == "view") {
            this.quillRef.disable(true);
            axios.get(`http://localhost:4000/api/story/get/${this.props.match.params.storyId}`)
                .then(response => {
                    const story = response.data;
                    this.setState({
                        storyId: story._id,
                        storyTitle: story.content.title,
                        storySubtitle: story.content.subtitle,
                        storyBody: story.content.body
                    })
                })
                .catch(err => {
                    console.log("Error occured in getting story", err);
                })
        }

        // if creating a new story,
        // create a new blank story and save it to the database;
        // then set its ID and values to state;
        // after this it is equivalent to editing an existing story;
        if (this.props.mode == "new") {
            axios.post(`http://localhost:4000/api/story/new/`, {
                owner: this.context.user.username,
                storyTitle: this.state.storyTitle,
                storyBody: this.state.storyBody,
                storySubtitle: this.state.storySubtitle,
                tags: []
            }, {
                headers: {
                    'x-auth-token': this.context.token
                }
            })
                .then(response => {
                    const story = response.data.data;
                    console.log("New story reponse", response.data.data);
                    this.setState({
                        storyId: story._id,
                        storyTitle: story.content.title,
                        storySubtitle: story.content.subtitle,
                        storyBody: "The ID of this new story is " + story._id
                    })
                })
                .catch(err => {
                    console.log("Error occured in creating a story", err);
                })

        }
    };

    componentDidUpdate() {
        this.attachQuillRef();
    };

    attachQuillRef = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    };

    render() {
        return (
            <Container fluid className="EditorContainer">
                <Row className="EditorHeader">
                    <input
                        className="StoryTitle"
                        name="storyTitle"
                        value={this.state.storyTitle}
                        placeholder="Give your story a title...."
                        disabled={this.props.mode == "edit" ? false : true}
                        onChange={(event) => {
                            event.preventDefault();
                            this.setState({ storyTitle: event.target.value });
                        }} />
                    <input
                        className="StorySubtitle"
                        name="storySubtitle"
                        value={this.state.storysubTitle}
                        placeholder="and an optional subtitle."
                        disabled={this.props.mode == "edit" ? false : true}
                        onChange={(event) => {
                            event.preventDefault();
                            this.setState({ storySubtitle: event.target.value });
                        }} />
                </Row>
                <Row className="Editor">
                    <ReactQuill
                        ref={(el) => { this.reactQuillRef = el }}
                        value={this.state.storyBody}
                        onChange={this.handleChange}
                        theme="bubble"
                        style={
                            { fontFamily: "Newsreader" }
                        }
                        modules={
                            {
                                toolbar: [
                                    [{ 'header': [1, 2, 3, 4, false] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                                    [{ 'script': 'sub' }, { 'script': 'super' }],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                    ['link', 'image', 'video'],
                                    ['clean'],
                                    [{ 'align': [] }]
                                ]
                            }
                        }
                        placeholder="Now, begin your story here." />
                </Row>
            </Container>
        )
    }
};

export default Editor;