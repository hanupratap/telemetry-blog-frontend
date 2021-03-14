import React, { Component } from "react";
import ReactQuill, { Quill } from 'react-quill';
import { Row, Col, Container, ThemeProvider } from 'react-bootstrap';
import 'react-quill/dist/quill.bubble.css'; // ES6
import './editor.css';
import Input from "../Input/Input";
import { AuthContextType, AuthConsumer } from '../../authcontext';
import axios from "axios";
import IdleTimer from 'react-idle-timer';
import Can from '../../Components/Can/Can';
import Chips from 'react-chips';

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
        this.save = this.save.bind(this);
        this.idleTimer = null;
    };

    state = {
        storyId: null,
        storyTitle: "",
        storySubtitle: "",
        storyBody: "",
        storyOwner: "",
        saveTime: null,
        isPublished: null,
        hasChanges: false,
        tags: []
    };


    handleChange(content, delta, source, editor) {
        this.setState({ storyBody: content, hasChanges: true });
    };

    save() {
        if (this.props.mode != "view") {
            const dateModified = Date();
            axios.post(`https://telemetry-blog.herokuapp.com/api/story/update/${this.state.storyId}`, {
                owner: this.context.user.username,
                content: {
                    title: this.state.storyTitle == "" ? "A story you saved without a title" : this.state.storyTitle,
                    subtitle: this.state.storySubtitle == "" ? "A story you saved without a subtitle" : this.state.storySubtitle,
                    body: this.state.storyBody
                },
                dateModified: dateModified
            }, {
                headers: {
                    'x-auth-token': this.context.token
                }
            })
                .then(response => {
                    console.log("Saved story response", response.data.data);
                    const story = response.data.data;
                    const dateSaved = new Date(story.dateModified);
                    this.setState({
                        saveTime: String(dateSaved.toLocaleTimeString('en-IN')),
                        hasChanges: false
                    })
                })
                .catch(err => {
                    console.log("Update story error response", err.response.data);
                })
        }
    }

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
            axios.get(`https://telemetry-blog.herokuapp.com/api/story/get/${this.props.match.params.storyId}`)
                .then(response => {
                    const story = response.data.data;
                    if (story.owner == this.context.user.username) {
                        const dateCreated = new Date(story.dateModified);

                        this.setState({
                            storyId: story._id,
                            storyTitle: story.content.title,
                            storySubtitle: story.content.subtitle,
                            storyBody: story.content.body,
                            saveTime: String(dateCreated.toLocaleTimeString('en-IN')),
                            hasChanges: false,
                            storyOwner: story.owner,
                            isPublished: story.isPublished
                        })
                    } else {
                        this.props.history.push('/404');
                    }
                })
                .catch(err => {
                    if (err.response.data.err == "NO_STORY_FOUND") {
                        this.props.history.push('/404');
                    }
                })
        }

        // if viewing an existing story, retrieve it and set
        // the editor values, with all fields disabled;
        if (this.props.mode == "view") {
            this.quillRef.disable(true);
            axios.get(`https://telemetry-blog.herokuapp.com/api/story/get/${this.props.match.params.storyId}`)
                .then(response => {
                    const story = response.data.data;
                    console.log("View story response", response.data);
                    const dateCreated = new Date(story.dateModified);
                    this.setState({
                        storyId: story._id,
                        storyTitle: story.content.title,
                        storySubtitle: story.content.subtitle,
                        storyBody: story.content.body,
                        saveTime: String(dateCreated.toLocaleTimeString('en-IN')),
                        storyOwner: story.owner,
                        isPublished: story.isPublished
                    })
                })
                .catch(err => {
                    this.props.history.push('/404');
                })
        }

        // if creating a new story,
        // create a new blank story and save it to the database;
        // then set its ID and values to state;
        // after this it is equivalent to editing an existing story;
        if (this.props.mode == "new") {
            axios.post(`https://telemetry-blog.herokuapp.com/api/story/new/`, {
                owner: this.context.user.username,
                storyTitle: "Give your story a title...",
                storyBody: this.state.storyBody,
                storySubtitle: this.state.storySubitle,
                tags: []
            }, {
                headers: {
                    'x-auth-token': this.context.token
                }
            })
                .then(response => {
                    const story = response.data.data;
                    console.log("New story reponse", response.data.data);
                    const dateCreated = new Date();

                    this.setState({
                        storyId: story._id,
                        storyTitle: story.content.title,
                        storySubtitle: story.content.subtitle,
                        storyBody: story.content.body,
                        saveTime: String(dateCreated.toLocaleTimeString('en-IN')),
                        hasChanges: false,
                        storyOwner: story.owner,
                        isPublished: story.isPublished
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
            <AuthConsumer>
                {(context) => (
                    <Container fluid className="EditorContainer">
                        <Row className="AutosaveInformation">
                            <Col md={3} sm={12}>
                                <span>
                                    This story was last saved at {`${this.state.saveTime}`}
                                </span>
                            </Col>
                            {
                                this.state.storyOwner
                                    ? <Can
                                        role={context.role}
                                        perform="posts:edit"
                                        data={{
                                            username: context.authenticated ? context.user.username : null,
                                            postOwner: this.state.storyOwner
                                        }}
                                        yes={() => (
                                            <React.Fragment>
                                                <Col md={3} sm={12}>
                                                    <input
                                                        type="submit"
                                                        value={this.state.isPublished ? `Unpublish` : `Publish`}
                                                        className="EditorButton"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            axios.post(`https://localhost:4000/api/story/${this.state.isPublished ? "unpublish" : "publish"}/${this.state.storyId}`)
                                                                .then(response => {
                                                                    window.location.reload();
                                                                })
                                                                .catch(err => {
                                                                    alert("Something went wrong. Try that again.");
                                                                })
                                                        }}
                                                    />
                                                </Col>
                                                {
                                                    this.props.mode == "view"
                                                        ? <Col md={3} sm={12}>
                                                            <a href={`/story/edit/${this.state.storyId}`}>
                                                                <input
                                                                    type="submit"
                                                                    value="Edit"
                                                                    className="EditorButton"
                                                                    onClick={(event) => {
                                                                        // event.preventDefault();
                                                                        // this.props.history.push(`http://localhost:3000/story/edit/:storyId/${this.state.storyId}`);
                                                                        // console.log('Hello!', this.state.storyId);
                                                                    }}
                                                                />
                                                            </a>
                                                        </Col>
                                                        : null
                                                }
                                            </React.Fragment>
                                        )}
                                    />
                                    : null
                            }
                            <Col md={3} sm={12}>
                                <a href={`/${this.state.storyOwner}`}>
                                    <input
                                        type="submit"
                                        value={`Back to ${this.state.storyOwner}'s stories.`}
                                        className="EditorButton"
                                        onClick={(event) => {
                                            // event.preventDefault();
                                            // this.props.history.push(`http://localhost:3000/story/edit/:storyId/${this.state.storyId}`);
                                            // console.log('Hello!', this.state.storyId);
                                        }}
                                    />
                                </a>
                            </Col>
                        </Row>
                        <IdleTimer
                            timeout={1500}
                            ref={ref => { this.idleTimer = ref }}
                            startOnMount={false}
                            events={["keydown"]}
                            onIdle={this.save}>
                            <Row className="EditorHeader">
                                <input
                                    type='textarea'
                                    className="StoryTitle"
                                    name="storyTitle"
                                    value={this.state.storyTitle}
                                    placeholder="Give your story some title...."
                                    disabled={this.props.mode == "view" ? true : false}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        this.setState({ storyTitle: event.target.value, hasChanges: true });
                                    }} />
                                <input
                                    className="StorySubtitle"
                                    name="storySubtitle"
                                    value={this.state.storySubtitle}
                                    placeholder="and an optional subtitle."
                                    disabled={this.props.mode == "view" ? true : false}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        this.setState({ storySubtitle: event.target.value, hasChanges: true });
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
                        </IdleTimer>
                    </Container>
                )}
            </AuthConsumer>
        )
    }
};

export default Editor;