import './App.css';
import Header from './Header/Header';
import SignIn from './SignIn/SignIn';
import Footer from './Footer/Footer';
import Stories from './Stories/Stories';
import Page404 from './404Page/404';
import { Row, Col, Container } from 'react-bootstrap';
import axios from "axios";

const signInAttempt = async () => {
	alert("You're trying to sign in but nothing's set up yet dumdum!");
}

function App() {
	return (
		<div className="App">
			<Container fluid>
				<Header></Header>
				<SignIn onLoginFunc={signInAttempt}></SignIn>
				<Page404></Page404>
				<Footer></Footer>
			</Container>
		</div>
	);
};

export default App;
