import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Input from '../Input/Input';
import _ from 'lodash';
import './signin.css';
import Toast from 'react-bootstrap/Toast'
import axios from 'axios';

/*
	The state in this component manages the form as a controlled component,
	and also other functions like form validation, etc.

	The signInForm object contains all input fields and their validations,
	the loading property is toggled on 'successful' form submits (when all validations pass),
	and the errors object is populated with the 
*/

class SignInForm extends React.Component {
	constructor(props) {
		super(props);
	}


	state = {
		signInForm: {
			username: {
				type: "text",
				placeholder: "What's your username?",
				value: '',
				validations: {
					required: true,
					min: 5,
					max: 35
				},
			},
		},
		loading: false,
		errors: {},
		success: false
	}

	// run this everytime a keystroke is recorded, 
	// for that particular element;
	inputChangeHandler = (event) => {
		const inputIdentifier = event.target.id;
		const updatedSignInForm = {
			...this.state.signInForm,
		}
		const updatedElement = {
			...updatedSignInForm[inputIdentifier]
		}
		updatedElement.value = event.target.value;
		updatedSignInForm[inputIdentifier] = updatedElement;

		this.setState({
			signInForm: updatedSignInForm,
			errors: {},
			statusText: null
		});
	}

	// handling form submission and validations;
	onSubmitHandler = async () => {
		this.setState({ loading: true });

		const formData = {};
		for (let element in this.state.signInForm) {
			formData[element] = this.state.signInForm[element].value;
		}

		const validationErrors = this.checkValidations(formData);
		if (validationErrors) {
			this.setState({ errors: validationErrors });
		} else {
			this.triggerSignIn(formData);
		}
	}

	checkValidations(formData) {
		let errors = this.state.errors;
		for (let element in formData) {

			const rules = this.state.signInForm[element].validations;
			for (let rule in rules) {
				if (rule == "required" && this.state.signInForm[element].value.length == 0) {
					errors[element] = `This is required`;
				}

				if (rule == "min" && this.state.signInForm[element].value.length < parseInt(rules[rule])) {
					errors[element] = `This must be at least ${rules[rule]} character${rules[rule] == 1 ? '' : 's'} long.`;
				}

				if (rule == "max" && this.state.signInForm[element].value.length > parseInt(rules[rule])) {
					errors[element] = `This must be lesser than ${rules[rule]} characters long.`;
				}
			}

			if (this.state.signInForm[element].type == "email") {
				let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
				if (re.test(formData[element])) {
					continue;
				} else {
					errors[element] = "This email is invalid. Try another!";
				}
			}
		}

		console.log("Final errors", errors);

		if (JSON.stringify(errors) != '{}') {
			console.log("The following errors were detected", errors);
			return errors;
		} else {
			return null;
		}
	}

	render = (props) => {
		const formElements = [];
		for (let element in this.state.signInForm) {
			formElements.push({
				id: element,
				config: this.state.signInForm[element]
			})
		}

		return (
			<Row className="SignIn" >
				<Col lg={6} md={6} sm={12} className="IllustrationPanel text-center">
					<span><img className="Illustration" src="/images/PeopleIllustration1.svg"></img></span>
				</Col>
				<Col lg={6} md={6} sm={12} className="ContentPanel text-center">
					<Row>
						<form>
							{formElements.map((formElement) => (
								<Input
									error={this.state.errors[formElement.id] == null ? "none" : this.state.errors[formElement.id]}
									type={formElement.config.type}
									value={formElement.config.value}
									placeholder={formElement.config.placeholder}
									key={formElement.id}
									name={formElement.id}
									id={formElement.id}
									onChange={(event) => this.inputChangeHandler(event)}
								/>
							))}
							<input
								type="submit"
								value="Sign me in."
								className="FormBtn"
								onClick={(event) => {
									event.preventDefault();
									this.onSubmitHandler();
								}}
							/>
						</form>
					</Row>
					<Row>
						<span className={`StatusText text-left ${this.state.statusText ? " Show" : " HideLabel"}`}>
							{this.state.statusText}
						</span>
					</Row>
					Don't have an account? <a href='/signup'>Sign up</a> for one.
				</Col>
			</Row>
		)
	};

	triggerSignIn = (formData) => {
		this.setState({ loading: true });
		// console.log(formData);
		axios.post("https://telemetry-blog.herokuapp.com/api/user/signin", formData)
			.then(response => {
				this.setState({
					statusText: "Check your email for the sign-in link. Don't forget to check your spam!",
					loading: false
				})
			})
			.catch(err => {
				console.log(JSON.stringify(err.response.data.error));

				// this.setState({
				// 	statusText: "An error occured. Try again.",
				// 	loading: false
				// })

				if (err.response.data.error.username == "NO_SUCH_USERNAME") {
					this.setState({
						errors: { username: "Sorry, this username doesn't seem right. If you don't have an account, sign up for one!" },
						statusText: "An error occured. Try again.",
						loading: false
					})
				}
				// const errors = {};
				// for (let field in err.response.error) {
				// 	errors[field] = err.response.error[field];
				// }
			});
		this.setState({ loading: false });

	}
}

export default SignInForm;
