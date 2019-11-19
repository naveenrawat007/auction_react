import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
const initial_state = {
  user: {
    verification_code: "",
  },
  verified: false,
  user_verification_error: "",
  message: "",
}
export default class VerificationModal extends Component{
  constructor(props){
    super(props);
    this.state = initial_state;
  }
  componentDidMount () {
  }

  submitForm = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/verify"
  	fetch(url ,{
			method: "put",
			headers: {
				"Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: JSON.stringify({verification_code: this.state.user.verification_code}),
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 201) {
        this.setState({verified: result.user.is_verified});
      }else {
        this.setState({message: result.message});
      }
		}, (error) => {
      this.setState({message: "server error"});
		});
  }

  resendVerificationCode = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/resend_code"
  	fetch(url ,{
			method: "put",
			headers: {
				"Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
			}
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 208) {
        this.setState({
          message: result.message
        });
      }
		}, (error) => {
		});
  }

  submitHandler = (event) => {
		event.preventDefault();
    let formIsValid = this.checkFormValidation();
    if (formIsValid){
      this.submitForm()
    }
  }

  checkFormValidation = () => {

    let user_verification_error = "";
    if (this.state.user.verification_code === ""){
      user_verification_error = "Code cant be blank!"
    }

    this.setState({
      user_verification_error,
    },function () {
      if (user_verification_error !== "" ){
        return false;
      }else {
        return true;
      }
    });

    if (user_verification_error !== "" ){
      this.setState({
        user_verification_error
      });
      return false;
    }else {
      return true;
    }
  }

  updateUserCode = (event) => {
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


  render(){
    return(
      <div id="verfiyModal" className="modal " role="dialog">
        { this.state.verified ? <Redirect to='/'/> : null }
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="verify-code">
                <div className="heading text-center">Verify</div>
                <p>Enter the Verification code sent on your Email.</p>
                <form onSubmit = {this.submitHandler}>
                  {this.state.message}
                  <div className="form-group">
                    <input type="text" name="verification_code" className="enter-code form-control" onChange={this.updateUserCode}/>
                    {this.addErrorMessage(this.state.user_verification_error)}
                  </div>
                  <div className="form-group">
                    <button className="red-btn submit-btn" type="submit">Submit</button>
                  </div>
                  <div className="not-get-code text-center">
                    <p>Didn't get Verification Code?</p>
                    <Link to="#" onClick={this.resendVerificationCode} ><i className="fa fa-refresh" aria-hidden="true"></i> Resend Code</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}