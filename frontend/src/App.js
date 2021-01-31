import './App.css';
import Header from './Header/Header';
import SignIn from './SignIn/SignIn'
import { Row, Col, Container } from 'react-bootstrap';

function App() {
	return (
		<div className="App">
			<Container fluid>
				<Header></Header>
				<SignIn></SignIn>
			</Container>
		</div>
	);
}

export default App;
