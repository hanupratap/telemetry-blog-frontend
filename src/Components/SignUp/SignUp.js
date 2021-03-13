import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './signup.css';
import axios from 'axios';
import Input from './../Input/Input';

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
	};

	state = {
		signUpForm: {
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
			name: {
				type: "text",
				placeholder: "Your full name",
				value: '',
				validations: {
					required: true,
					min: 5,
					max: 35
				},
			},
			username: {
				type: "text",
				placeholder: "Pick a username",
				value: '',
				validations: {
					required: true,
					min: 5,
					max: 35
				},
			},
			bio: {
				type: "text",
				placeholder: "Tell us about yourself...",
				value: '',
				validations: {
					required: true,
					min: 1,
					max: 200
				},
			},
			twitter: {
				type: "text",
				placeholder: "Your twitter username minus the @",
				value: '',
				validations: {
					max: 20
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
		const updatedSignUpForm = {
			...this.state.signUpForm,
		}
		const updatedElement = {
			...updatedSignUpForm[inputIdentifier]
		}
		updatedElement.value = event.target.value;
		updatedSignUpForm[inputIdentifier] = updatedElement;

		this.setState({
			signUpForm: updatedSignUpForm,
			errors: {},
			statusText: null
		});
	}

	// handling form submission and validations;
	onSubmitHandler = async () => {
		this.setState({ loading: true });

		const formData = {};
		for (let element in this.state.signUpForm) {
			formData[element] = this.state.signUpForm[element].value;
		}

		const validationErrors = this.checkValidations(formData);
		if (validationErrors) {
			console.log("Validation errors:", validationErrors);
			this.setState({ errors: validationErrors });
		} else {
			this.triggerSignUp(formData);
			// console.log("Sign up triggered");
		}
	}

	checkValidations(formData) {
		let errors = this.state.errors;
		for (let element in formData) {

			const rules = this.state.signUpForm[element].validations;
			for (let rule in rules) {
				if (rule == "required" && this.state.signUpForm[element].value.length == 0) {
					errors[element] = `This is required`;
				} 
				
				if (rule == "min" && this.state.signUpForm[element].value.length < parseInt(rules[rule])) {
					errors[element] = `This must be at least ${rules[rule]} character${rules[rule] == 1 ? '' : 's'} long.`;
				} 
				
				if (rule == "max" && this.state.signUpForm[element].value.length > parseInt(rules[rule])) {
					errors[element] = `This must be lesser than ${rules[rule]} characters long.`;
				}
			}

			if (this.state.signUpForm[element].type == "email") {
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
		for (let element in this.state.signUpForm) {
			formElements.push({
				id: element,
				config: this.state.signUpForm[element]
			})
		}

		return (
			<Row className="SignUp" >
				<Col lg={6} md={6} sm={12} className="IllustrationPanel text-center">
					<span><img className="Illustration" src="/images/PeopleIllustration2.svg"></img></span>
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
								value="Sign me up."
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
					Already have an account? <a href='/signin'>Sign in.</a>
				</Col>
			</Row>
		)
	}

	triggerSignUp = (formData) => {
		this.setState({ loading: true });
		// console.log(formData);
		axios.post("https://telemetry-blog.herokuapp.com/api/user/signup", formData)
			.then(response => {
				console.log(response.data);
				this.setState({
					statusText: "Check your email for the sign-in link. Don't forget to check your spam!",
					loading: false
				})
			})
			.catch(err => {
				console.log(JSON.stringify(err.response.data.error));
				if (err.response.data.error == "USERNAME_TAKEN")
				this.setState({
					errors: {username: "This username is taken. Try another one?"},
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
};

export default SignUpForm;