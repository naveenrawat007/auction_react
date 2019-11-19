import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const initial_state = {
  error: "",
  message: "",
  user: {
    email: "",
  },
  "user_email_error": "",
}
export default class ForgotPassword extends Component{
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
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/forgot_password?email=" + this.state.user.email
  	fetch(url ,{
			method: "GET",
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
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        this.setState({
          message: result.message
        });
      }else {
        this.setState({message: result.message});
      }
		}, (error) => {
      this.props.history.push('/forgot_password')
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
    let user_email_error = "";
    if (this.state.user.email === ""){
      user_email_error = "Email cant be blank!"
    }else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.user.email)))
    {
      user_email_error = "Invalid email!"
    }
    this.setState({
      user_email_error,
    },function () {
      if (user_email_error !== "" ){
        return false;
      }else {
        return true;
      }
    });

    if (user_email_error !== ""){
      this.setState({
        user_email_error,
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
    },
    function () {
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
      <div className="registration-outer">
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
                <span>Forgot Password?</span>
                <p>Don't worry! Reseting your password is easy. Just type in the email you registered to AutionMyDeal.com</p>
              </div>
              <div className="registration-form">
                {this.state.message}
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" className="form-control" onChange={this.updateUser} name="email"/>
                  {this.addErrorMessage(this.state.user_email_error)}
                </div>
                <div className="form-group mb-0">
                  <button className="red-btn submit-btn" type="submit" onClick={this.submitHandler}>Send</button>
                </div>
                <div className="already-user">
                  Did you remember your password <Link to="login" >Try Logging in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
