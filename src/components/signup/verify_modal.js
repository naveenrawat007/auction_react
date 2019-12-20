import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert';
import $ from 'jquery';
const initial_state = {
  user: {
    verification_code: "",
  },
  verified: false,
  user_verification_error: "",
  message: "",
}
export default class VerificationModal extends Component{
  _isMounted = false

  constructor(props){
    super(props);
    this.state = initial_state;
  }
  componentDidMount () {
    $('#verfiyModal').show();
    this._isMounted = true;
  }

  submitForm = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/verify"
  	fetch(url ,{
			method: "put",
			headers: {
				"Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_user_temp_token"),
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
        localStorage.setItem("auction_user_token", result.user.token);
        if (this._isMounted){
          this.setState({verified: result.user.is_verified});
        }
        this.props.history.push('/user')
      }else {
        if (this._isMounted){
          this.setState({message: result.message, variant: "danger"});
        }
      }
      if (this._isMounted){
        this.clearMessageTimeout = setTimeout(() => {
          this.setState(() => ({message: ""}))
        }, 2000);
      }
		}, (error) => {
      if (this._isMounted){
        this.setState({message: "server error"});
      }
		});
  }
  componentWillUnmount() {
    clearTimeout(this.clearMessageTimeout);
    this._isMounted = false;
  }

  resendVerificationCode = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/resend_code"
  	fetch(url ,{
			method: "put",
			headers: {
				"Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_user_temp_token"),
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
        if (this._isMounted){
          this.setState({
            message: result.message,
            variant: "success"
          });
        }
      }
		}, (error) => {
		});
  }

  submitHandler = (event) => {
    if (this._isMounted){
  		event.preventDefault();
      let formIsValid = this.checkFormValidation();
      if (formIsValid){
        this.submitForm()
      }
    }
  }

  checkFormValidation = () => {

    let user_verification_error = "";
    if (this.state.user.verification_code === ""){
      user_verification_error = "Code can't be blank!"
    }else if (this.state.user.verification_code.length < 6) {
      user_verification_error = "Too short!"
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
    if (this._isMounted){
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
	}

  addErrorMessage = (msg) => {
    if (msg === ""){
      return ;
    }else{
      return (<span className="error-class"> {msg} </span>);
    }
  }
  checkNumeric = (e) => {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(
      !e.charCode
      ? e.which
      : e.charCode);
    if (!regex.test(str)) {
      e.preventDefault();
      return false;
    }
  }


  render(){
    return(
      <Modal className="status_modal verify_modal" show={true} onHide={(e) => {}}>
        { this.state.verified ? <Redirect to='/'/> : null }
        <div className="modal-body">
          <div className="verify-code">
            <div className="heading text-center">Verify</div>
            <p>Enter the Verification code sent on your Email.</p>
            <form onSubmit = {this.submitHandler}>
              {
                this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
              }
              <div className="form-group">
                <input type="text" name="verification_code" className="enter-code form-control" onChange={this.updateUserCode} maxLength="6" onKeyPress={this.checkNumeric}/>
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
      </Modal>
    );
  }
}
