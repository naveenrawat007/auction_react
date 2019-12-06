import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const initial_state = {
  error: "",
  message: "",
  user: {
    password: "",
    confirm_password: "",
  },
  "user_password_error": "",
  "user_confirm_password_error": "",
}
export default class NewPassword extends Component{
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
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/password/new"
  	fetch(url ,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
        "Authorization": parsed.reset_token,
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
      if (result.status === 200) {
        this.setState({
          message: result.message
        });
        this.props.history.push('/login')
      }else {
        this.setState({message: result.message});
      }
      this.clearMessageTimeout = setTimeout(() => {
        this.setState(() => ({message: ""}))
      }, 2000);
		}, (error) => {
      this.props.history.push('/forgot_password')
		});
  }
  componentWillUnmount() {
    clearTimeout(this.clearMessageTimeout);
  }

  submitHandler = (event) => {
    event.preventDefault();
    let formIsValid = this.checkFormValidation()
    if (formIsValid){
      this.submitForm()
    }
  }
  checkFormValidation = () => {
    let user_password_error = "";
    let user_confirm_password_error = "";
    if (this.state.user.password === ""){
      user_password_error = "Password can't be blank!"
    }
    if (this.state.user.confirm_password === ""){
      user_confirm_password_error = "Confirm Password can't be blank!"
    }else if (this.state.user.confirm_password !== this.state.user.password) {
      user_confirm_password_error = "Confirm Password is not matching password!"
    }
    this.setState({
      user_password_error,
      user_confirm_password_error,
    },function () {
      if (user_password_error !== "" || user_confirm_password_error !== "" ){
        return false;
      }else {
        return true;
      }
    });

    if (user_password_error !== "" || user_confirm_password_error !== "" ){
      this.setState({
        user_password_error,
        user_confirm_password_error,
      });
      return false;
    }else {
      return true;
    }
  }

  customCheckFormValidation = (name) => {
    let user_password_error = "";
    let user_confirm_password_error = "";
    if (name === "password") {
      if (this.state.user.password === ""){
        user_password_error = "Password can't be blank!"
      }
      this.setState({
        user_password_error
      });
    }else if (name === "confirm_password") {
      if (this.state.user.confirm_password === ""){
        user_confirm_password_error = "Confirm Password can't be blank!"
      }else if (this.state.user.confirm_password !== this.state.user.password) {
        user_confirm_password_error = "Confirm Password is not matching password!"
      }
      this.setState({
        user_confirm_password_error
      });
    }
  }
  updateUser = (event) => {
    const{ name, value } = event.target;
    this.setState({
      user: {
      ...this.state.user,
      [name]: value
      }
    },
    function () {
      this.customCheckFormValidation(name);
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
      <div className="col-md-8 offset-md-2 my-4">
        <div className="registration">
          <div className="registration-in">
            <div className="left-side">
              <Link to='/' className="logo">
                <img src="images/logo.png" alt="Aution My Deal Logo"/>
              </Link>
              <div className="house">
                <img src="images/house-lock.png" alt="house lock "/>
              </div>
              <ul>
                <li>Find the best property for you</li>
              </ul>
            </div>
            <div className="right-side forgot-password-side">
              <div className="heading">
                <span>New Password</span>
                <p>Reseting your password is easy. Just type in new password to AutionMyDeal.com</p>
              </div>
              <div className="registration-form">
                {this.state.message}
                <form onSubmit={this.submitHandler}>
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" onChange={this.updateUser} name="password" autoComplete="new-password"/>
                    {this.addErrorMessage(this.state.user_password_error)}
                  </div>
                  <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" className="form-control" onChange={this.updateUser} name="confirm_password" autoComplete="new-password"/>
                    {this.addErrorMessage(this.state.user_confirm_password_error)}
                  </div>
                  <div className="form-group mb-0">
                    <button className="red-btn submit-btn" type="submit" >Send</button>
                  </div>
                </form>
                <div className="already-user">
                  Did you remember your password
                  <Link to="login" >Try Logging in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
