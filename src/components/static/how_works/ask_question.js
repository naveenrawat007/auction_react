import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Alert from 'react-bootstrap/Alert';

export default class SellerOverview extends Component{
  _isMounted = false
  constructor(props){
    super(props);
    this.state = {
      visitor: {
        name: "",
        email: "",
        phone_number: "",
        question: ""
      },
      message: "",
      nameError: "",
      emailError: "",
      phone_numberError: "",
      questionError: ""
    };
  }
  componentDidMount () {
    this._isMounted = true
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
  updateQuestionForm = (event) => {
    const{ name, value } = event.target;
    this.setState({
      visitor: {
        ...this.state.visitor,
        [name]: value
      }
    }, function () {
      this.customFormValidation(name);
    });
  }
  customFormValidation = (name) => {
    let error = ""
    if (name === "name") {
      if (this.state.visitor.name === ""){
        error = "Name can't be blank!"
      }
    }
    else if (name === "email") {
      if (this.state.visitor.email === ""){
        error = "Email can't be blank!"
      }else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.visitor.email)))
      {
        error = "Email is Invalid!"
      }
    }else if (name === "phone_number") {
      if (this.state.visitor.phone_number === ""){
        error = "Phone number can't be blank!"
      }else if (isNaN(this.state.visitor.phone_number)) {
        error = "Phone should be Numeric!"
      }else if (this.state.visitor.phone_number.length < 10){
        error = "Phone number length is small!"
      }else if (this.state.visitor.phone_number.length > 10) {
        error = "Phone number length is too large!"
      }
    }else if (name === "question") {
      if (this.state.visitor.question === ""){
        error = "Question can't be blank!"
      }
    }
    this.setState({
      [name+"Error"]: error,
    });
    if (error !== ""){
      return false
    }else {
      return true;
    }
  }
  addErrorClass = (msg) => {
    if (msg === ""){
      return ""
    }else {
      return "error-class"
    }
  }
  submitQuestion = (event) => {
    event.preventDefault()
    let error_count = 0
    for(let i = 0; i < Object.keys(this.state.visitor).length; i++){
      let formIsValid = this.customFormValidation(Object.keys(this.state.visitor)[i])
      if (formIsValid == false){
        error_count+=1
      }
    }
    if (error_count > 0) {
      return ""
    }
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/visitor/question"
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({visitor: this.state.visitor})
    }).then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 200){
          this.setState({
            message: result.message,
            variant: "success",
            visitor: {
              name: "",
              email: "",
              phone_number: "",
              question: "",
            },
          });
        }else {
          this.setState({
            variant: "danger",
            message: result.message,
          });
        }
        this.clearMessageTimeout = setTimeout(() => {
          this.setState(() => ({message: ""}))
        }, 2000);
      }
    })
  }
  render(){
    return(
      <div className="tab-pane show active landlord-analyzer" role="tabpanel" aria-labelledby="landlord-analyzer">

        {
          this.state.message ? <div className="mt-2"><Alert variant={this.state.variant}>{this.state.message}</Alert></div> : null
        }
        <h3 className="font-darkred">Ask us question</h3>
        <div className="col-md-6 offset-md-3">
          <form className="ask_form mb-5" onSubmit={this.submitQuestion}>
            <div className="form-group">
              <label >Name</label>
              <input type="text" className={"form-control " + this.addErrorClass(this.state.nameError) } name="name"  aria-describedby="emailHelp" onChange={this.updateQuestionForm}/>
            </div>
            <div className="form-group">
              <label >Email</label>
              <input type="email" className={"form-control " + this.addErrorClass(this.state.emailError) } name="email"  aria-describedby="emailHelp" onChange={this.updateQuestionForm}/>
            </div>
            <div className="form-group">
              <label >Phone</label>
              <input type="text" className={"form-control " + this.addErrorClass(this.state.phone_numberError) } maxLength={10} name="phone_number"  aria-describedby="emailHelp" onChange={this.updateQuestionForm} onKeyPress={this.checkNumeric}/>
            </div>
            <div className="form-group">
              <label >Ask a Question?</label>
              <textarea className={"form-control " + this.addErrorClass(this.state.questionError) } name="question"  rows="3" onChange={this.updateQuestionForm}></textarea>
					  </div>
					  <div className="col-md-12 text-center">
					  	<button type="submit" className="btn red-btn">Submit</button>
					  </div>
					</form>
				</div>
      </div>
    )
  }
}
