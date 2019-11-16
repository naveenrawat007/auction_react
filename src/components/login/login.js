import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const initial_state = {
  error: "",
  message: "",
  user: {
    email: "",
    password: ""
  }
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
  submitHandler = (event) => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/sign_in"
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
      if (result.status === 202) {
        this.setState({logged_in: true});
        localStorage.setItem("auction_user_token", result.user.token);
        this.props.history.push('/')
      }else {
        this.setState({message: result.message});
      }
		}, (error) => {
      this.props.history.push('/login')
		});
		event.preventDefault();
  }
  updateUser = (event) => {
    const{ name, value } = event.target;
    this.setState({
      user: {
      ...this.state.user,
      [name]: value
      }
    });
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
            <div className="right-side">
              <div className="heading">
                <span>Please login in to your account below.</span>
              </div>
              <div className="registration-form">
                { this.state.message}
                <form onSubmit = {this.submitHandler}>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.updateUser} autoComplete="false" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.updateUser} autoComplete="false" className="form-control"/>
                  </div>
                  <div className="form-group mb-0">
                    <button className="red-btn submit-btn" type="submit">Login</button>
                  </div>
                </form>
                <div className="forgot-pwd">
                  <a href="forgot-password.html">Forgot Password?</a>
                </div>
                <div className="already-user">
                  Not a member?
                  <Link to="sign_up"href="signup.html" title="Login Now">Get Stated for FREE</Link>
                </div>
                <div className="imp-note text-center">
                  <h3>Important:</h3>
                  <p>By logging in you agree that we may use the contact information you previously provided to contact you by email,
                    telephone or postal mail in connection with our services, including for marketing purposes, in accordance with our Privacy
                  Statemen. You can change your communication preferences in your Profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
