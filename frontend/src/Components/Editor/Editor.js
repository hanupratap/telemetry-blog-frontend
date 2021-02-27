import React, { Component } from "react";
import ReactQuill, { Quill } from 'react-quill';
import { Row, Col, Container } from 'react-bootstrap';
import 'react-quill/dist/quill.bubble.css'; // ES6
import './editor.css';
import Input from "../Input/Input";

class Editor extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.reactQuillRef = null;      //react component;
        this.quillRef = null;           //quill instance reference;
    }

    state = {
        storyTitle: "",
        storySubtitle: "",
        storyBody: ""
    }

    handleChange(content, delta, source, editor) {
        this.setState({...this.state, storyBody: content });
    }

    componentDidMount() {
        this.attachQuillRef();
        this.quillRef.focus();
    }

    componentDidUpdate() {
        this.attachQuillRef();
    }

    attachQuillRef = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    render() {
        return (
            <Container fluid className="EditorContainer">
                <Row className="EditorHeader">
                    <input
                        className="StoryTitle"
                        name="storyTitle"
                        value={this.state.storyTitle}
                        placeholder="Give your story a title...."
                        onChange={(event) => {
                            event.preventDefault();
                            this.setState({ ...this.state, storyTitle: event.target.value });
                            console.log(this.state);
                        }} />
                        <input
                        className="StorySubtitle"
                        name="storySubtitle"
                        value={this.state.storysubTitle}
                        placeholder="and an optional subtitle."
                        onChange={(event) => {
                            event.preventDefault();
                            this.setState({ ...this.state, storySubtitle: event.target.value });
                            console.log(this.state);
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
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                    ['link', 'image'],
                                    ['clean']
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