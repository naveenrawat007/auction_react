import React, {Component} from 'react';
import {Link} from 'react-router-dom'

const initial_state = {
  error: "",
  message: "",
  user: {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
  },
  user_first_name_error: "",
  user_last_name_error: "",
  user_phone_number_error: "",
  user_email_error: "",
  user_password_error: "",
  user_confirm_password_error: "",
}
export default class Login extends Component{
	constructor(props){
    super(props);
    this.state = initial_state;
  }
  componentDidMount () {
    if (localStorage.getItem("auction_user_token")){
			this.props.history.push('/')
		}
  }

  submitForm = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users"
  	fetch(url ,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
        "Accept": "application/vnd.auction_backend.v1",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: JSON.stringify({user: this.state.user}),
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 201) {
        localStorage.setItem("auction_user_token", result.user.token);
        this.props.history.push('/login')
      }else {
        this.setState({message: result.message});
      }
		}, (error) => {
      this.props.history.push('/sign_up')
		});
  }
  submitHandler = (event) => {
		event.preventDefault();
    let formIsValid = this.checkFormValidation()
    if (formIsValid){
      this.submitForm()
    }
  }

  checkFormValidation = () => {
    let user_first_name_error: "";
    let user_last_name_error: "";
    let user_phone_number_error: "";
    let user_email_error: "";
    let user_password_error: "";
    let user_confirm_password_error: "";
    if (this.state.user.first_name === ""){
      user_first_name_error = "First name cant be blank!"
    }
    if (this.state.user.last_name === ""){
      user_last_name_error = "Last name cant be blank!"
    }
    if (this.state.user.phone_number === ""){
      user_phone_number_error = "Phone number cant be blank!"
    }
    if (this.state.user.email === ""){
      user_email_error = "email cant be blank!"
    }
    if (this.state.user.password === ""){
      user_password_error = "Password cant be blank!"
    }
    if (this.state.user.confirm_password === ""){
      user_confirm_password_error = "Confirm Password cant be blank!"
    }
    this.setState({
      user_first_name_error,
      user_last_name_error,
      user_phone_number_error,
      user_email_error,
      user_password_error,
      user_confirm_password_error,
    },function () {
      if (user_first_name_error !== "" || user_last_name_error !== "" || user_phone_number_error !=="" || user_email_error !== "" || user_password_error !== "" || user_confirm_password_error !== "" ){
        return false;
      }else {
        return true;
      }
    });

    if (user_first_name_error !== "" || user_last_name_error !== "" || user_phone_number_error !=="" || user_email_error !== "" || user_password_error !== "" || user_confirm_password_error !== "" ){
      this.setState({
        user_first_name_error,
        user_last_name_error,
        user_phone_number_error,
        user_email_error,
        user_password_error,
        user_confirm_password_error,
      });
      return false;
    }else {
      return true;
    }
  }
  updateUser = (event) => {
    const{ name, value } = event.target;
    this.setState({
      user: {
      ...this.state.user,
      [name]: value
      }
    }, function () {
      this.checkFormValidation();
    });
	}

  addErrorMessage = (msg) => {
    if (msg === ""){
      return ;
    }else{
      return (<span className="error-class"> {msg} </span>);
    }
  }
	render() {
		return (
      <div className="container custom_container px-0">
        <div className="register_body">
          <div className="register_main">
            <div className="register-head text-center">
              <p>please fill in the form below to register</p>
            </div>
            { this.state.message}
            <form onSubmit = {this.submitHandler}>
              <div className="signup-code row mx-0">
                <div className="col-md-6">
                  <label className="">First Name</label>
                  <div className="input-group mb-2 ">
                    <div className="input-group-prepend">
                      <span className="input-group-text group-box" id="basic-addon1">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input type="text" name="first_name" onChange={this.updateUser} autoComplete="off" className="form-control" />
                  </div>
                  {this.addErrorMessage(this.state.user_first_name_error)}
                </div>
                <div className="col-md-6">
                  <label className="">Last Name</label>
                  <div className="input-group mb-2 ">
                    <div className="input-group-prepend">
                      <span className="input-group-text group-box" id="basic-addon1">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control" name="last_name" onChange={this.updateUser} autoComplete="off" />
                  </div>
                  {this.addErrorMessage(this.state.user_last_name_error)}
                </div>
                <div className="col-md-6">
                  <label className="">Email</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text group-box" id="basic-addon1">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input type="email" className="form-control" name="email" onChange={this.updateUser} autoComplete="off" />
                  </div>
                  {this.addErrorMessage(this.state.user_email_error)}
                </div>
                <div className="col-md-6">
                  <label className="">Phone</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text group-box" id="basic-addon1">
                        <i className="fa fa-mobile"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control" name="phone_number" onChange={this.updateUser}  />
                  </div>
                  {this.addErrorMessage(this.state.user_phone_number_error)}
                </div>
                <div className="col-md-6">
                  <label className="">Password</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text group-box" id="basic-addon1">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input type="password" className="form-control" name="password" onChange={this.updateUser} autoComplete="false" />
                  </div>
                  {this.addErrorMessage(this.state.user_password_error)}
                </div>
                <div className="col-md-6">
                  <label className="">Confirm Password</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text group-box" id="basic-addon1">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input type="password" className="form-control" name="confirm_password" onChange={this.updateUser} autoComplete="off" />
                  </div>
                  {this.addErrorMessage(this.state.user_confirm_password_error)}
                </div>
                <div className="col-md-12 mb-2 text-center">
                  <button className="red-btn submit-btn my-0 mx-auto" type="submit" data-toggle="modal" data-target="#verfiyModal">Sign Up</button>
                  <div className="already-user">
                    <span>Already registered? </span>
                    <Link to="/login" href="login.html" title="Login Now">Login Now</Link>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="imp-box">
                    <h5>important:</h5>
                    <p>By logging in you agree that we may use the contact information you previously provided to contact you by  email, telephone or postal mail in connection with our services, including for marketing purposes, in accordance with our Privacy Statement. You can change your communcation preferences in your profile. </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
	}
}
