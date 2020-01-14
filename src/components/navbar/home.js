import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faGavel, faHandPointRight, faUser, faEnvelope, faMobileAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const initial_state = {
  error: "",
  message: "",
  created: false,
  verified: false,
  sign_up_modal: false,
  user: {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    verification_code: "",
  },
  user_first_name_error: "",
  user_last_name_error: "",
  user_phone_number_error: "",
  user_email_error: "",
  user_password_error: "",
  user_confirm_password_error: "",
  user_verification_error: "",
}
export default class Home extends Component{
  _isMounted = false

  constructor(props){
    super(props);
    this.state = initial_state;
  }
  componentDidMount () {
    this._isMounted = true;
  }

  openSignUpModal = () => {
    this.setState({
      sign_up_modal: true,
    });
  }
  hideSignUpModal = () => {
    this.setState({
      sign_up_modal: false,
    });
  }
  updateUser = (event) => {
    const{ name, value } = event.target;
    this.setState({
      user: {
      ...this.state.user,
      [name]: value
      }
    }, function () {
      this.customCheckFormValidation(name);
    });
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

  submitVerificationHandler = () => {
    if (this._isMounted){
      let formIsValid = this.checkVerificationFormValidation();
      if (formIsValid){
        this.submitVerificationForm()
      }
    }
  }
  submitVerificationForm = () => {
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
        localStorage.removeItem("auction_user_name");
        if (this._isMounted){
          this.setState({verified: result.user.is_verified});
        }
        window.location.href = "/user"
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

  checkVerificationFormValidation = () => {
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
        this.setState({message: ""})
        localStorage.setItem("auction_user_temp_token", result.user.token);
        this.setState({
          created: true,
        });
      }else {
        this.setState({message: result.message,
        variant: "danger"});
      }
      this.clearMessageTimeout = setTimeout(() => {
        this.setState(() => ({message: ""}))
      }, 2000);
		}, (error) => {
      this.props.history.push('/sign_up')
		});
  }

  checkFormValidation = () => {
    let user_first_name_error = "";
    let user_last_name_error = "";
    let user_phone_number_error = "";
    let user_email_error = "";
    let user_password_error = "";
    let user_confirm_password_error = "";
    if (this.state.user.first_name === ""){
      user_first_name_error = "First name can't be blank!"
    }
    if (this.state.user.last_name === ""){
      user_last_name_error = "Last name can't be blank!"
    }
    if (this.state.user.phone_number === ""){
      user_phone_number_error = "Phone number can't be blank!"
    }else if (isNaN(this.state.user.phone_number)) {
      user_phone_number_error = "Phone should be Numeric"
    }else if (this.state.user.phone_number.length < 10){
      user_phone_number_error = "Phone number length is small."
    }else if (this.state.user.phone_number.length > 10) {
      user_phone_number_error = "Phone number length is too large."
    }
    if (this.state.user.email === ""){
      user_email_error = "Email can't be blank!"
    }else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.user.email)))
    {
      user_email_error = "Invalid email!"
    }

    if (this.state.user.password === ""){
      user_password_error = "Password can't be blank!"
    }else if (this.state.user.password.length < 6) {
      user_password_error = "Password is too short!"
    }
    if (this.state.user.confirm_password === ""){
      user_confirm_password_error = "Confirm Password can't be blank!"
    }else if (this.state.user.confirm_password !== this.state.user.password) {
      user_confirm_password_error = "Confirm Password is not matching password!"
    }
    this.setState({
      user_first_name_error,
      user_last_name_error,
      user_phone_number_error,
      user_email_error,
      user_password_error,
      user_confirm_password_error,
    },function () {
      if (user_first_name_error !== "" || user_last_name_error !== "" || user_phone_number_error !== "" || user_email_error !== "" || user_password_error !== "" || user_confirm_password_error !== "" ){
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

  submitHandler = () => {
    let formIsValid = this.checkFormValidation();
    if (formIsValid){
      this.submitForm()
    }
  }

  customCheckFormValidation = (name) => {
    let user_first_name_error = "";
    let user_last_name_error = "";
    let user_phone_number_error = "";
    let user_email_error = "";
    let user_password_error = "";
    let user_confirm_password_error = "";
    if (name === "first_name"){
      if (this.state.user.first_name === ""){
        user_first_name_error = "First name can't be blank!"
      }
      this.setState({
        user_first_name_error
      });
    }else if (name === "last_name"){
      if (this.state.user.last_name === ""){
        user_last_name_error = "Last name can't be blank!"
      }
      this.setState({
        user_last_name_error
      });
    }else if (name === "email") {
      if (this.state.user.email === ""){
        user_email_error = "Email can't be blank!"
      }else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.user.email)))
      {
        user_email_error = "Invalid email!"
      }
      this.setState({
        user_email_error
      });
    }else if (name === "phone_number") {
      if (this.state.user.phone_number === ""){
        user_phone_number_error = "Phone number can't be blank!"
      }else if (isNaN(this.state.user.phone_number)) {
        user_phone_number_error = "Phone should be Numeric"
      }else if (this.state.user.phone_number.length < 10){
        user_phone_number_error = "Phone number length is small."
      }else if (this.state.user.phone_number.length > 10) {
        user_phone_number_error = "Phone number length is too large."
      }
      this.setState({
        user_phone_number_error
      });
    }else if (name === "password") {
      if (this.state.user.password === ""){
        user_password_error = "Password can't be blank!"
      }else if (this.state.user.password.length < 6) {
        user_password_error = "Password is too short!"
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

  addErrorMessage = (msg) => {
    if (msg === ""){
      return ;
    }else{
      return (<span className="error-class"> {msg} </span>);
    }
  }
  render(){
    return(
      <div className="container-fluid home_main px-0">
        <div className="video_col">
          <video id="videobcg" preload="auto" autoPlay={true} loop="loop" muted="muted" volume="0">
            <source src="./videos/produce.mp4" type="video/mp4"/>
          </video>
        </div>
        <button className="btn red-btn" onClick={this.openSignUpModal}> Start free 60 days trial</button>
        <div className="help_col">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home1.png" alt=""/></div>
                  <h5>TOP 15 REASONS</h5>
                  <p>Top 15 reasons to post your Wholesale/Fixer upper deals at AuctionMyDeal.com</p>
                  <div className="learnmore"><Link to="#">Learn More</Link></div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home2.png" alt=""/></div>
                  <h5>LANDLORD ANALYSER</h5>
                  <p>Landlord Analyser is used to show landlords how to levergae Short Term Financing to get a Better Return on their Money</p>
                  <div className="learnmore"><Link to="#">Get Started</Link></div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home3.png" alt=""/></div>
                  <h5>GUARANTY SALE PROGRAM</h5>
                  <p>Auction Your Wholesale Deal to the Highest Bidder or Angel Investors, LLC will make you an offer!</p>
                  <div className="learnmore"><Link to="#">Learn More</Link></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home4.png" alt=""/></div>
                  <h5>FREE EXPERT DEAL ANALYSIS</h5>
                  <p>Great for New Investors or ones wanting a 2nd opinion. Our Experts provide you with the following:</p>
                  <div className="learnmore"><Link to="#">Free Expert Deal Analysis</Link></div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home5.png" alt=""/></div>
                  <h5>Get Approved</h5>
                  <p>Get Approved with Houston’s #1 Hard Money Lender to qualify to buy our Best Auction Deals</p>
                  <div className="learnmore"><Link to="#">Get Started</Link></div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home6.png" alt=""/></div>
                  <h5>Bidders Blueprint</h5>
                  <p>Auctionmydeal.com Blueprint for Bidders</p>
                  <div className="learnmore"><Link to="#">Bidders Blueprint</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="featured_col pb-5">
          <div className="container">
            <h2>Featured Properties</h2>
            <div className="row mx-0">
              <div className="col-sm-3 px-2">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div>
                          <img src="./images/home4.png" alt="" style={{width: "236px", height: "140px" }}/>
                        </div>
                        <h5>24566 Creekwood Drive, Splendora, TX</h5>
                        <p>Great Landlord Opportunity in Splendora, Texas</p>
                      </div>
                      <div className="flip-card-back">
                        <h5>Residential Single Family</h5>
                        <div className="flip-data">
                          <ul className="list-inline">
                            <li className="list-inline-item">After Repaired Value</li>
                            <li className="list-inline-item">$140,000</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Sellers Asking Price</li>
                            <li className="list-inline-item">$49,900</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Estimated Rehab Cost</li>
                            <li className="list-inline-item">$30,000</li>
                          </ul>
                        </div>
                        <ul className="list-inline">
                          <li className="list-inline-item">Potential Profit</li>
                          <li className="list-inline-item">$60,100</li>
                        </ul>
                        <Link to="#" className="details_btn">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 px-2">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div>
                          <img src="./images/home4.png" alt="" style={{width: "236px", height: "140px" }}/>
                        </div>
                        <h5>24414 Pine Canyon Dr, Spring</h5>
                        <p>WOODLANDS/SPRING Landlord Opportunity with Great Cash Flow!</p>
                      </div>
                      <div className="flip-card-back">
                        <h5>Residential Single Family</h5>
                        <p>Great Home to Buy, Rehab & Rent for Excellent CASH Flow*Roof, AC, Heater & ducts less than 6 months old, 2 Master suites, separate studio garage apartment*Property is vacant, text 713-553-1331 to schedule an appt</p>
                        <Link to="#" className="details_btn">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 px-2">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div>
                          <img src="./images/home4.png" alt="" style={{width: "236px", height: "140px" }}/>
                        </div>
                        <h5>3025 Sherwood Forest Drive, Dickinson</h5>
                        <p>GREAT Landlord Opportunity to Buy & Hold!!!</p>
                      </div>
                      <div className="flip-card-back">
                        <h5>Residential Single Family</h5>
                        <div className="flip-data">
                          <ul className="list-inline">
                            <li className="list-inline-item">After Repaired Value</li>
                            <li className="list-inline-item">$140,000</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Sellers Asking Price</li>
                            <li className="list-inline-item">$49,900</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Estimated Rehab Cost</li>
                            <li className="list-inline-item">$30,000</li>
                          </ul>
                        </div>
                        <ul className="list-inline">
                          <li className="list-inline-item">Potential Profit</li>
                          <li className="list-inline-item">$60,100</li>
                        </ul>
                        <Link to="#" className="details_btn">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 px-2">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div>
                          <img src="./images/home4.png" alt="" style={{width: "236px", height: "140px" }}/>
                        </div>
                        <h5>1611 Pannell St, Houston</h5>
                        <p>Great Rehab & Flip or Landlord Property for Excellent Cash Flow</p>
                      </div>
                      <div className="flip-card-back">
                        <h5>Residential Single Family</h5>
                        <div className="flip-data">
                          <ul className="list-inline">
                            <li className="list-inline-item">After Repaired Value</li>
                            <li className="list-inline-item">$140,000</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Sellers Asking Price</li>
                            <li className="list-inline-item">$49,900</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Estimated Rehab Cost</li>
                            <li className="list-inline-item">$30,000</li>
                          </ul>
                        </div>
                        <ul className="list-inline">
                          <li className="list-inline-item">Potential Profit</li>
                          <li className="list-inline-item">$60,100</li>
                        </ul>
                        <Link to="#" className="details_btn">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dealofweek">
          <div className="container">
            <div className="row">
              <div className="col-md-6 px-2">
                <iframe width="560" height="315" title="youtube" src="https://www.youtube.com/embed/X080gIJFE3M?controls=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
              </div>
              <div className="col-md-6 px-2 ">
                <div className="pleft80">
                  <h2>Deal of the Week</h2>
                  <p>See if your Deal qualifies to be our next Deal of the Day and we will Help you Market Your Deal for FREE to over 20,000 investors.</p>
                  <Link to="#" className=" apply-btn">Apply Here</Link>
                  <p className="sbold">If your deal qualifies <span>YOU WIN</span> the following</p>
                  <Link to="#" className="freems">FREE Marketing Services</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="invest_col">
          <div className="container">
            <h2>Investor Auctions Made Easy</h2>
            <div className="row">
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner"> <FontAwesomeIcon icon={faSearch} /> </div>
                        <h5>Browse</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>Find a property to bid or buy now,
                        Click the Watch button and the property will be saved to your Watched</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner"><FontAwesomeIcon icon={faGavel} /> </div>
                        <h5>Submit Bid</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>Find the property right for you? Place your bid or make your offer on the property page. Monitor bidding through our buyer dashboard </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner"><FontAwesomeIcon icon={faCreditCard} /> </div>
                        <h5>Buy Now</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>This price is typically higher than what the seller is expecting to get for the property, but it could still be a great deal for a landlord </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner"><FontAwesomeIcon icon={faHandPointRight} /></div>
                        <h5>Close</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>If your offer is accepted, you’ll either work with our team or your agent to coordinate document signing and the closing date.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal className="status_modal" show={this.state.sign_up_modal} onHide={this.hideSignUpModal} centered>
          <Modal.Header closeButton>
            <div className=" offset-md-1 col-md-10 text-center">
              <h5 className="mb-0 text-uppercase"> CREATE YOUR ACCOUNT</h5>
            </div>
          </Modal.Header>
          <div className="modal-body">
            {
              this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
            }
            {
              this.state.created === false ?
                <div className="signup-code row mx-0">
                  <div className="col-md-6">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text group-box-chat" id="basic-addon1">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                      </div>
                      <input type="text" name="first_name" onChange={this.updateUser} placeholder="First Name" autoComplete="off" className="form-control" />
                    </div>
                    {this.addErrorMessage(this.state.user_first_name_error)}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text group-box-chat" id="basic-addon1">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                      </div>
                      <input type="text" className="form-control" name="last_name" placeholder="Last Name" onChange={this.updateUser} autoComplete="off" />
                    </div>
                    {this.addErrorMessage(this.state.user_last_name_error)}
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text group-box-chat" id="basic-addon1">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                      </div>
                      <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.updateUser} autoComplete="off" />
                    </div>
                    {this.addErrorMessage(this.state.user_email_error)}
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text group-box-chat" id="basic-addon1">
                          <FontAwesomeIcon icon={faMobileAlt} />
                        </span>
                      </div>
                      <input type="text" className="form-control numeric" placeholder="Phone" name="phone_number" onChange={this.updateUser} maxLength="10" onKeyPress={this.checkNumeric}/>
                    </div>
                    {this.addErrorMessage(this.state.user_phone_number_error)}
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text group-box-chat" id="basic-addon1">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                      </div>
                      <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.updateUser} autoComplete="false" />
                    </div>
                    {this.addErrorMessage(this.state.user_password_error)}
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text group-box-chat" id="basic-addon1">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                      </div>
                      <input type="password" className="form-control" placeholder="Confirm Password" name="confirm_password" onChange={this.updateUser} autoComplete="off" />
                    </div>
                    {this.addErrorMessage(this.state.user_confirm_password_error)}
                  </div>
                  <div className="col-md-12 mt-3 text-center">
                    <button className="red-btn submit-btn my-0 mx-auto" type="submit" onClick={this.submitHandler} >Start FREE 60 Day Trial Now</button>
                  </div>
                </div>
              :
              <div className="verify-code">
                <div className="heading text-center">Verify</div>
                <p>Enter the Verification code sent on your Email.</p>
                <div className="form-group">
                  <input type="text" name="verification_code" className="enter-code form-control" onChange={this.updateUser} maxLength="6" onKeyPress={this.checkNumeric}/>
                  {this.addErrorMessage(this.state.user_verification_error)}
                </div>
                <div className="form-group">
                  <button className="red-btn submit-btn" onClick={this.submitVerificationHandler}>Submit</button>
                </div>
                <div className="not-get-code text-center">
                  <p>Didn't get Verification Code?</p>
                  <Link to="#" onClick={this.resendVerificationCode} ><i className="fa fa-refresh" aria-hidden="true"></i> Resend Code</Link>
                </div>
              </div>
            }
          </div>
        </Modal>
      </div>
    )
  }
}
