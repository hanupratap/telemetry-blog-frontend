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
			email: {
				type: "email",
				placeholder: "support@telemetryblog.in",
				value: '',
				validations: {
					required: true,
					min: 5,
					max: 30
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
		const errors = this.state.errors;

		for (let element in formData) {
			const rules = this.state.signInForm[element].validations;
			for (let rule in rules) {
				if (rule == "required") {
					errors[element] = (
						this.state.signInForm[element].value.length > 0
							? `The ${element} is required.`
							: undefined
					)
				}

				if (rule == "min") {
					errors[element] = (
						this.state.signInForm[element].value.length < parseInt(rules[rule])
							? `The ${element} must be at least ${rules[rule]} characters long.`
							: undefined
					)
				}

				if (rule == "max") {
					errors[element] = (
						this.state.signInForm[element].value.length > parseInt(rules[rule])
							? `The ${element} must be lesser than ${rules[rule]} characters long.`
							: undefined
					)
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

		if (JSON.stringify(errors) != '{}') {
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
				</Col>
			</Row>
		)
	};

	triggerSignIn = (formData) => {
		this.setState({ loading: true });
		// console.log(formData);
		axios.post("http://localhost:4000/api/user/signin", formData)
			.then(response => {
				this.setState({
					statusText: "Check your email for the sign-in link. Don't forget to check your spam!",
					loading: false
				})
			})
			.catch(err => {
				// console.log(JSON.stringify(err.response.data));
				this.setState({
					statusText: "An error occured. Try again.",
					loading: false
				})
				// const errors = {};
				// for (let field in err.response.error) {
				// 	errors[field] = err.response.error[field];
				// }
			});
		this.setState({ loading: false });

	}
}

export default SignInForm;
