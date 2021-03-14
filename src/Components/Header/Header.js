import axios from 'axios';
import React, { useState, useEffect, useContext, Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import './header.css';
import Axios from 'axios';
import { AuthConsumer, AuthContextType, AuthProvider } from '../../authcontext';
import IdleTimer from 'react-idle-timer';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import UserCard from '../../Components/UserCard/UserCard';
import StoryCard from './../StoryCard/StoryCard';
import SearchStoryCard from './../SearchStoryCard/SearchStoryCard';
import Collapse from 'react-bootstrap/Collapse';

class Header extends Component {
    static contextType = AuthContextType;
    constructor(props) {
        super(props);
        const currentDate = new Date();
        const hourOfDay = currentDate.getHours();
        const timeOfDay = "";
        if (hourOfDay >= 0 && hourOfDay < 12) {
            this.timeOfDay = "morning";
        } else if (hourOfDay >= 12 && hourOfDay <= 16) {
            this.timeOfDay = "afternoon";
        } else if (hourOfDay > 16 && hourOfDay <= 23) {
            this.timeOfDay = "evening";
        }
    };

    state = {
        user: null,
        searchOpen: false,
        query: "",
        results: null,
        loadingResults: false
    }

    fireSearch = () => {
        this.setState({ loadingResults: true });
        alert("Search fired");
        axios.get(`https://telemetry-blog.herokuapp.com/api/search?querystring=${this.state.query}`)
            .then(response => {
                this.setState({ results: response.data.data, loadingResults: false });
                // alert(JSON.stringify(response.data.data));
            })
            .catch(err => {
                console.log(err.response);
                // alert(JSON.stringify(err.response));
            })
    }

    render(props) {
        return (
            <AuthConsumer>
                {
                    (value) => (
                        <React.Fragment>
                            <Row className="Header">
                                <Col lg={2} md={12} id="headerWordmark" className="text-left text-lg-left text-md-left text-sm-left text-xs-center">
                                    <span><a href="/"><img src="/images/Wordmark.svg"></img></a></span>
                                </Col>
                                <Col lg={6} md={12} id="headerSearch" className="text-center text-lg-center d-inline d-lg-inline d-md-inline d-sm-inline">
                                    <IdleTimer
                                        timeout={3000}
                                        ref={ref => { this.idleTimer = ref }}
                                        startOnMount={false}
                                        onIdle={this.fireSearch}
                                        events={['keydown']}>
                                        <input
                                            type="text"
                                            className="SearchBar"
                                            placeholder="Search by authors or story titles/subtitles."
                                            value={this.state.query}
                                            onClick={(event) => {
                                                this.setState({ searchOpen: true });
                                            }}
                                            onChange={(event) => {
                                                event.preventDefault();
                                                if (event.target.value == "") {
                                                    this.setState({ results: null });
                                                }
                                                this.setState({ query: event.target.value });
                                            }}
                                        />
                                    </IdleTimer>
                                </Col>
                                <Col lg={2} md={12} id="headerGreeting" className="text-right text-md-right text-sm-left d-inline d-lg-inline d-md-inline d-sm-inline">
                                    {`Good ${this.timeOfDay}${value.authenticated ? ', ' + value.user.firstName : ""}!`}
                                </Col>
                                <Col lg={2} sm={12} className="text-right text-md-right text-sm-right">
                                    {
                                        this.context.authenticated
                                            ? <button className="Logout" onClick={() => {
                                                this.context.logout();
                                            }}>
                                                Log me out.
                                            </button>
                                            : <a href="/signin">Sign me in.</a>
                                    }
                                </Col>
                            </Row>
                            <Collapse in={this.state.searchOpen}>
                                <div>
                                    <Row className={`SearchResultsContainer`} >
                                        <Container fluid>
                                            <Row className="SearchResultsHeader">
                                                <Col lg={6} md={6} sm={10} xs={10} className="SearchHeaderText">
                                                    <span>Search</span>
                                                </Col>
                                                <Col lg={6} md={6} sm={2} xs={2} className="SearchHeaderClose text-right text-md-right" onClick={() => {
                                                    this.setState({
                                                        searchOpen: false
                                                    });
                                                }}>
                                                    <span>&times;</span>
                                                </Col>
                                            </Row>
                                            <Row className="SearchResults">
                                                <span className="AuthorColumnHeader">Authors</span>
                                                <Col md={12} className="AuthorResults">
                                                    <SkeletonTheme color="#6a6a6a20" highlightColor="##7a7a7a80">
                                                        {
                                                            this.state.results
                                                                ? this.state.results[0].map((author) => (
                                                                    <a href={`/${author.username}`}>
                                                                        <UserCard user={author} size="small" />
                                                                    </a>
                                                                ))
                                                                : <Skeleton count={1} height={125} width={200} />
                                                        }
                                                    </SkeletonTheme>
                                                </Col>
                                                <span className="StoryColumnHeader">Stories</span>
                                                <Col md={12} className="StoryResults">
                                                    <SkeletonTheme color="#6a6a6a20" highlightColor="##7a7a7a80">
                                                        {
                                                            this.state.results
                                                                ? this.state.results[1].map((story) => (
                                                                    <a href={`/story/${story._id}`}>
                                                                        <SearchStoryCard story={story} key={story._id} />
                                                                    </a>
                                                                ))
                                                                : <Skeleton count={1} height={200} width={250} />
                                                        }
                                                    </SkeletonTheme>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Row>
                                </div>
                            </Collapse>
                        </React.Fragment>
                    )
                }
            </AuthConsumer>
        )
    }
}

export default Header;