import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CurrencyInput from 'react-currency-input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { faExclamationCircle, faBed, faBath, faCar, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import MultiSelect from "@khanacademy/react-multi-select";

export default class PropertyOfferSubmit extends Component {
  _isMounted = false
  _timerArray = []
  constructor(props){
    super(props);
    this.state = {
      message: "",
      variant: "",
      payment:{
        cvv: '',
        expiryMonth: '',
        expiryYear:'',
        cardNumber: ''
      },
      paymentProcess: false,
      card_token: '',
      amount: '',
      submitted: false,
      step: 1,
      generated_promo_code: '',
      // enter_promo_code: '',
      // has_promo_code: false,
      // user_promo_code: '',
      promo_modal: false,
      promo_code_applied: false,
      promo_code_availed: false,
      chat_room: '',
      terms_agreed: false,
      terms_agreed1: false,
      terms_agreed2: false,
      terms_agreed3: false,
      terms_agreed4: false,
      terms_agreed5: false,
      terms_agreed6: false,
      terms_agreed7: false,
      terms_agreed8: false,
      offer_type: this.props.match.params.offer_type,
      unique_address: this.props.match.params.id,
      buy_option: [],
      property_buy_options: [],
      purchase_property_as_options: [],
      hold_bid_days_options: [],
      business_documents: [],
      fund_proof: "",
      fund_proof_error: "",
      property: {},
      bidding_options: {
        user_first_name: "",
        user_middle_name: "",
        user_last_name: "",
        user_email: "",
        user_phone_no: "",
        realtor_first_name: "",
        realtor_last_name: "",
        realtor_license: "",
        realtor_company: "",
        realtor_phone_no: "",
        realtor_email: "",
        business_document_text: "",
        purchase_property_as: "Business",
        internet_transaction_fee: 97,
        total_due: "",
        promo_code: "",
        property_closing_date: new Date(),
        hold_bid_days: "",
        self_buy_property: "false",

        highest_bid: 0,
        current_offer: 0,
        current_best_offer: 0,
        buy_now_price: "",
        best_offer_price: "",
        best_offer_buy_now_price: "",
      },
      user_first_name_error: "",
      user_last_name_error: "",
      user_phone_number_error: "",
      user_email_error: "",
      user_middle_name_error: "",
      realtor_first_name_error: "",
      realtor_last_name_error: "",
      realtor_email_error: "",
      realtor_company_error: "",
      realtor_license_error: "",
      realtor_phone_no_error: "",
      business_document_text_error: "",
      business_documents_error: "",
      property_closing_date_error: "",
      cardnumber_error: "",
      cvv_error: "",
      expirymonth_error: "",
      expiryyear_error: ""
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
    for (let i=0; i < this._timerArray.length; i++ ){
      clearInterval(this._timerArray[i]);
      clearTimeout(this.clearMessageTimeout);
    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.getProperty();
    window.scrollTo(0,0)
    window.loadStripe(process.env.REACT_APP_STRIPE_PK)
    // this.showCurrentSlide(1);
  }

  handleFundProofSelector = (event) => {
    const name = event.target.name
    event.target.nextElementSibling.innerHTML = event.target.files[0].name
    const value = event.target.files[0]
    if (this._isMounted){
      this.setState({
        [name]: value
      });
      this.setState({
        fund_proof_error: "",
      });
    }
  }
  multipleFileSelector = (event) => {
    const name = event.target.name
    const value = event.target.files
    this.setState({
      [name]: value,
    }, function () {
    });
  }

  showProperty = () => {
    window.open("/property/"+ this.state.property.unique_address, '_self')
  }

  getProperty = () => {
    // console.log(this.props.match.params.id); //  params.id == this.props.match.params.id
    // const { match: { params } } = this.props;
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/ " + this.state.unique_address
    fetch(url,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Max-Age": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      }
    })
    .then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 200){
          this.setState({
            isLoaded: true,
            property_buy_options: result.buy_options,
            property: result.property,
            purchase_property_as_options: result.purchase_property_as_options,
            hold_bid_days_options: result.hold_bid_days_options,
            promo_code_availed: result.user.code_availed,
            bidding_options: {
              ...this.state.bidding_options,
              user_first_name: result.user.first_name,
              user_last_name: result.user.last_name,
              user_email: result.user.email,
              user_phone_no: result.user.phone_number,
              purchase_property_as: result.purchase_property_as_options[0],
              hold_bid_days: result.hold_bid_days_options[0],
              highest_bid: result.property.highest_bid,
              current_offer: result.property.highest_bid ? (result.property.highest_bid + 1000) : 1000,
              buy_now_price: result.property.buy_now_price,
              current_best_offer: result.property.best_offer_price ? (result.property.best_offer_price + 1000) : 1000 ,
              best_offer_price: result.property.best_offer_price,
              best_offer_buy_now_price: result.property.best_offer_sellers_reserve_price,
            }
          }, function () {
            this.updateTotalDue();
          });
        }else if (result.status === 401) {
          localStorage.removeItem("auction_user_token");
          window.location.href = "/login"
        }
        else{
        }
      }
    })
    .catch(
      (error) => {
        if (this._isMounted){
          this.setState({
            // isLoaded: true,
            message: "",
          });
        }
      }
    )
  }

  calculateApproveTime = (time) => {
    if (time){
      let now = new Date().getTime();
      let end = new Date(time).getTime();
      let t = (end/1000) - (now/1000);
      if ((t%60) > 0){
        this.timer_interval = setInterval(() => {
          if (time){
            let now = new Date().getTime();
            let end = new Date(time).getTime();
            let t = (end/1000) - (now/1000);
            let days = Math.floor(t/(60*60*24))
            let hours = Math.floor((t%(60*60*24))/(60*60));
            let minutes = Math.floor((t%(60*60))/60);
            let seconds = Math.floor((t%(60)))
            if (t<0){
              if (document.getElementById("days-timer-item")){
                // document.getElementById("days-timer-item").innerHTML = "--"
                // document.getElementById("hours-timer-item").innerHTML = "--"
                // document.getElementById("minutes-timer-item").innerHTML = "--"
                // document.getElementById("seconds-timer-item").innerHTML = "--"
                if (seconds === -1){
                  clearInterval(this.timer_interval);
                  this.setState({
                    timer_complete: true ,
                  });
                }
              }
            }else {
              if (document.getElementById("days-timer-item")){
                document.getElementById("days-timer-item").innerHTML = days
                document.getElementById("hours-timer-item").innerHTML = hours
                document.getElementById("minutes-timer-item").innerHTML = minutes
                document.getElementById("seconds-timer-item").innerHTML = seconds
              }
            }
          }else {
            clearInterval(this.timer_interval);
            // document.getElementById("days-timer-item").innerHTML = "--"
            // document.getElementById("hours-timer-item").innerHTML = "--"
            // document.getElementById("minutes-timer-item").innerHTML = "--"
            // document.getElementById("seconds-timer-item").innerHTML = "--"
          }
        }, 1000)
        this._timerArray.push(this.timer_interval)
      }
    }else {
    }
  }

  renderTimerBlock = () => {
    let block;
    if (this.state.property.status === "Draft" || this.state.property.status === "Under Review"){
      block = <p> <h4>Under Review</h4></p>
    }
    else if ((this.state.property.status === "Approve") || (this.state.property.status === "Best Offer") || (this.state.property.status === "Live Online Bidding")) {
      // const starting_date = new Date(this.state.property.auction_started_at).getTime()
      // const ending_date = new Date(this.state.property.auction_ending_at).getTime()
      const bidding_starting_date = new Date(this.state.property.auction_bidding_started_at).getTime()
      const bidding_ending_date = new Date(this.state.property.auction_bidding_ending_at).getTime()
      const now = new Date().getTime()
      if (this.state.property.best_offer_time_pending){
        const best_offer_starting_date = new Date(this.state.property.best_offer_auction_started_at).getTime()
        const best_offer_ending_date = new Date(this.state.property.best_offer_auction_ending_at).getTime()
        if (now < best_offer_starting_date){
          block = <>
            <div className="time_status justify-content-end">
              <ul>
                <li id="days-timer-item">00</li>
                <li>Days</li>
              </ul>
              <ul>
                <li id="hours-timer-item">00</li>
                <li>Hours</li>
              </ul>
              <ul>
                <li id="minutes-timer-item">00</li>
                <li>Minutes</li>
              </ul>
              <ul>
                <li id="seconds-timer-item">00</li>
                <li>Seconds</li>
              </ul>
            </div>{this.calculateApproveTime(this.state.property.best_offer_auction_started_at)}
            <p>Remaining Time Before Best Offer Starts. </p>
          </>
        }
        else if (now < best_offer_ending_date){
          block = <>
            <div className="time_status justify-content-end">
              <ul>
                <li id="days-timer-item">00</li>
                <li>Days</li>
              </ul>
              <ul>
                <li id="hours-timer-item">00</li>
                <li>Hours</li>
              </ul>
              <ul>
                <li id="minutes-timer-item">00</li>
                <li>Minutes</li>
              </ul>
              <ul>
                <li id="seconds-timer-item">00</li>
                <li>Seconds</li>
              </ul>
            </div>{this.calculateApproveTime(this.state.property.best_offer_auction_ending_at)}
            <p>Remaining Time Before Best Offer Ends. </p>
          </>
        }
        else if (now < bidding_starting_date){
          block = <>
            <div className="time_status justify-content-end">
              <ul>
                <li id="days-timer-item">00</li>
                <li>Days</li>
              </ul>
              <ul>
                <li id="hours-timer-item">00</li>
                <li>Hours</li>
              </ul>
              <ul>
                <li id="minutes-timer-item">00</li>
                <li>Minutes</li>
              </ul>
              <ul>
                <li id="seconds-timer-item">00</li>
                <li>Seconds</li>
              </ul>
            </div>{this.calculateApproveTime(this.state.property.auction_bidding_started_at)}
            <p>Remaining Time Before Auction starts. </p>
          </>
        }
        else if (now < bidding_ending_date){
          block = <>
            <div className="time_status justify-content-end">
              <ul>
                <li id="days-timer-item">00</li>
                <li>Days</li>
              </ul>
              <ul>
                <li id="hours-timer-item">00</li>
                <li>Hours</li>
              </ul>
              <ul>
                <li id="minutes-timer-item">00</li>
                <li>Minutes</li>
              </ul>
              <ul>
                <li id="seconds-timer-item">00</li>
                <li>Seconds</li>
              </ul>
            </div>{this.calculateApproveTime(this.state.property.auction_bidding_ending_at)}
            <p>Remaining Time Before Auction Ends. </p>
          </>
        }
        else {
          block = <p> <h4>Post Auction</h4></p>
        }
      }
      else if (now < bidding_starting_date){
        block = <>
          <div className="time_status">
            <ul>
              <li id="days-timer-item">00</li>
              <li>Days</li>
            </ul>
            <ul>
              <li id="hours-timer-item">00</li>
              <li>Hours</li>
            </ul>
            <ul>
              <li id="minutes-timer-item">00</li>
              <li>Minutes</li>
            </ul>
            <ul>
              <li id="seconds-timer-item">00</li>
              <li>Seconds</li>
            </ul>
          </div>{this.calculateApproveTime(this.state.property.auction_bidding_started_at)}
          <p>Remaining Time Before Auction starts. </p>
        </>
      }
      else if (now < bidding_ending_date){
        block = <>
          <div className="time_status">
            <ul>
              <li id="days-timer-item">00</li>
              <li>Days</li>
            </ul>
            <ul>
              <li id="hours-timer-item">00</li>
              <li>Hours</li>
            </ul>
            <ul>
              <li id="minutes-timer-item">00</li>
              <li>Minutes</li>
            </ul>
            <ul>
              <li id="seconds-timer-item">00</li>
              <li>Seconds</li>
            </ul>
          </div>{this.calculateApproveTime(this.state.property.auction_bidding_ending_at)}
          <p>Remaining Time Before Auction Ends. </p>
        </>
      }
      else {
        block = <div className="time_status font-red"> <h4>Post Auction</h4></div>
      }
    }
    else {
      block = <p> <h4>{this.state.property.status}</h4></p>
    }
    return block
  }

  humanizeOfferType = (offer_type) => {
    if (offer_type === "bid"){
      return "Bid";
    }else if (offer_type === "best_offer") {
      return "Best Offer";
    }else if (offer_type === "buy_now" || offer_type === "best_buy_now") {
      return "Buy Now";
    }
  }

  handleBuyOption = (event) => {
    const{ name, checked } = event.target;
    let buy_option = this.state.buy_option
    if (checked === true){
      buy_option.push(name)
    }else {
      let index = buy_option.indexOf(name);
      if (index > -1) {
        buy_option.splice(index, 1);
      }
    }
    this.setState({
      buy_option: buy_option,
    });
  }
  updateTermsAgreed = (event) => {
    const{ name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  }

  updatePropertyOfferFields = (event) => {
    const{ name, value } = event.target;
    if (this._isMounted){
      this.setState({
        ...this.state,
        bidding_options:{
          ...this.state.bidding_options,
          [name]: value
        }
      }, function () {
      })
    }
  }

  updatePaymentFields = (event) => {
    const{ name, value} = event.target;

    this.setState({
      ...this.state,
      payment:{
        ...this.state.payment,
        [name]: value
      }
    }, function () {
    })
  }

  createStripeToken = () => {
    window.Stripe.card.createToken({
      number: this.state.payment.cardNumber,
      exp_month: this.state.payment.expiryMonth,
      exp_year: this.state.payment.expiryYear,
      cvc: this.state.payment.cvv
    }, (status, response) => {
      if (status === 200) {
        this.btn.setAttribute("disabled", "disabled");
        this.setState({
          paymentProcess: true,
          card_token: response.id
        });
        if (this.state.offer_type === "bid"){
          this.submitBiddingOffer()
        }else if (this.state.offer_type === "best_offer") {
          this.submitBestOffer()
        }else {
          this.submitBuyNowOffer()
        }
      } else {
        this.btn.removeAttribute("disabled");
        this.setState({
          message: response.error.message,
          paymentProcess: false,
          variant:"danger"
        });
        return false
      }
      this.clearMessageTimeout = setTimeout(() => {
        this.setState(() => ({message: ""}))
      }, 2000);
    });


  }

  addErrorClass = (msg) => {
    if (msg === ""){
      return ""
    }else {
      return " error-class"
    }
  }

  stepOneValidation = () => {
    let validate = true;
    let user_first_name_error = "";
    let user_last_name_error = "";
    let user_email_error = "";
    let user_phone_number_error = "";
    let realtor_first_name_error = "";
    let realtor_last_name_error = "";
    let realtor_email_error = "";
    let realtor_license_error = "";
    let realtor_company_error = "";
    let realtor_phone_no_error = "";
    let business_document_text_error = "";
    let business_documents_error = "";
    let fund_proof_error = "";

    if (this.state.bidding_options.user_first_name === ""){
      validate = false
      user_first_name_error= "error"
    }
    if (this.state.bidding_options.user_last_name === ""){
      user_last_name_error= "error"
      validate = false
    }
    if ((this.state.bidding_options.user_email === "") || (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.bidding_options.user_email)))){
      user_email_error= "error"
      validate = false
    }
    if (this.state.bidding_options.user_phone_no === ""){
      user_phone_number_error= "error"
      validate = false
    }else if (isNaN(this.state.bidding_options.user_phone_no)) {
      user_phone_number_error = "Phone should be Numeric!"
      validate = false
    }else if (this.state.bidding_options.user_phone_no.length < 10){
      user_phone_number_error = "Phone number length is small!"
      validate = false
    }else if (this.state.bidding_options.user_phone_no.length > 10) {
      user_phone_number_error = "Phone number length is too large!"
      validate = false
    }
    if (this.state.fund_proof === ""){
      fund_proof_error= "error"
      validate = false
    }
    if (this.state.bidding_options.self_buy_property === "false"){
      if (this.state.bidding_options.realtor_first_name === ""){
        realtor_first_name_error= "error"
        validate = false
      }
      if (this.state.bidding_options.realtor_last_name === ""){
        realtor_last_name_error= "error"
        validate = false
      }
      if ((this.state.bidding_options.realtor_email === "") || (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.bidding_options.realtor_email)))){
        realtor_email_error= "error"
        validate = false
      }
      if (this.state.bidding_options.realtor_license === ""){
        realtor_license_error= "error"
        validate = false
      }
      if (this.state.bidding_options.realtor_company === ""){
        realtor_company_error= "error"
        validate = false
      }
      if (this.state.bidding_options.realtor_phone_no === ""){
        realtor_phone_no_error= "error"
        validate = false
      }else if (isNaN(this.state.bidding_options.realtor_phone_no)) {
        realtor_phone_no_error = "Phone should be Numeric!"
        validate = false
      }else if (this.state.bidding_options.realtor_phone_no.length < 10){
        realtor_phone_no_error = "Phone number length is small!"
        validate = false
      }else if (this.state.bidding_options.realtor_phone_no.length > 10) {
        realtor_phone_no_error = "Phone number length is too large!"
        validate = false
      }
      if (this.state.business_documents.length === 0){
        business_documents_error = "error"
        validate = false
      }
      if (this.state.bidding_options.business_document_text === ""){
        business_document_text_error = "error"
        validate = false
      }
    }
    this.setState({
      user_first_name_error,
      user_last_name_error,
      user_email_error,
      user_phone_number_error,
      realtor_first_name_error,
      realtor_last_name_error,
      realtor_email_error,
      realtor_license_error,
      realtor_company_error,
      realtor_company_error,
      realtor_phone_no_error,
      business_documents_error,
      business_document_text_error,
      fund_proof_error,
    })
    return validate;
  }
  stepTwoValidation = () => {
    let property_closing_date_error = "";
    let cardnumber_error = "";
    let cvv_error = "";
    let expirymonth_error = "";
    let expiryyear_error = "";
    if (this.state.bidding_options.property_closing_date === ""){
      property_closing_date_error = "error"
    }
    if (this.state.promo_code_applied === false){
      if (this.state.payment.cardNumber === ""){
        cardnumber_error = "error"
      }
      if (this.state.payment.cvv === ""){
        cvv_error = "error"
      }
      if (this.state.payment.expiryMonth === ""){
        expirymonth_error = "error"
      }
      if (this.state.payment.expiryYear === ""){
        expiryyear_error = "error"
      }
    }
    this.setState({
      property_closing_date_error,
      cardnumber_error,
      cvv_error,
      expirymonth_error,
      expiryyear_error
    })
    if (property_closing_date_error === "" || cardnumber_error === "" || cvv_error === "" || expirymonth_error === "" || expiryyear_error === "" ){
      return true
    }else {
      return false
    }
  }
  submitOffer = () => {
    if (this.stepTwoValidation()){
      this.btn.setAttribute("disabled", "disabled");
      if (this.state.promo_code_applied === true){
        this.createStripeToken();
      }else {
        if (this.state.offer_type === "bid"){
          this.submitBiddingOffer()
        }else if (this.state.offer_type === "best_offer") {
          this.submitBestOffer()
        }else {
          this.submitBuyNowOffer()
        }
      }
    }else {
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

  updateCurrentOffer = (event, maskedvalue, floatvalue) => {
    // const{ value } = event.target;
    let price = parseFloat(maskedvalue.replace(/[$,.]/g,""))/100
    if (price > this.state.bidding_options.highest_bid){
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          current_offer: price,
          total_due: (price + this.state.bidding_options.internet_transaction_fee)
        }
      })
    }else {
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          current_offer: this.state.bidding_options.highest_bid,
          total_due: (this.state.bidding_options.highest_bid + this.state.bidding_options.internet_transaction_fee)
      },
    });
    }
  }

  updateCurrentBestOffer = (event, maskedvalue, floatvalue) => {
    // const{ value } = event.target;
    let price = parseFloat(maskedvalue.replace(/[$,.]/g,""))/100
    if (price > this.state.bidding_options.best_offer_price){
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          current_best_offer: price,
          total_due: (price + this.state.bidding_options.internet_transaction_fee)
        }
      })
    }else {
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          current_best_offer: this.state.bidding_options.best_offer_price,
          total_due: (this.state.bidding_options.best_offer_price + this.state.bidding_options.internet_transaction_fee)
      },
    });
    }
  }

  decrementCurrentOffer = () => {
    let new_offer = this.state.bidding_options.current_offer
    new_offer = new_offer - 1000
    if ((new_offer > 0) && (new_offer >= this.state.bidding_options.highest_bid) ){
      this.setState({
        bidding_options:{
          ...this.state.bidding_options,
          current_offer: new_offer,
          total_due: (new_offer + this.state.bidding_options.internet_transaction_fee)
        }
      });
    }
    else {
      this.setState({
        bidding_options:{
          ...this.state.bidding_options,
          current_offer: this.state.bidding_options.highest_bid,
        }
      });
    }
  }
  incrementCurrentOffer = () => {
    let new_offer = this.state.bidding_options.current_offer
    new_offer += 1000
    this.setState({
      bidding_options:{
        ...this.state.bidding_options,
        current_offer: new_offer,
        total_due: (new_offer + this.state.bidding_options.internet_transaction_fee)
      }
    });
  }

  decrementCurrentBestOffer = () => {
    let new_offer = this.state.bidding_options.current_best_offer
    new_offer = new_offer - 1000
    if ((new_offer > 0) && (new_offer >= this.state.bidding_options.best_offer_price) ){
      this.setState({
        bidding_options:{
          ...this.state.bidding_options,
          current_best_offer: new_offer,
          total_due: (new_offer + this.state.bidding_options.internet_transaction_fee)
        }
      });
    }
    else {
      this.setState({
        bidding_options:{
          ...this.state.bidding_options,
          current_best_offer: this.state.bidding_options.current_best_offer,
        }
      });
    }
  }
  incrementCurrentBestOffer = () => {
    let new_offer = this.state.bidding_options.current_best_offer
    new_offer += 1000
    this.setState({
      bidding_options:{
        ...this.state.bidding_options,
        current_best_offer: new_offer,
        total_due: (new_offer + this.state.bidding_options.internet_transaction_fee)
      }
    });
  }

  goToStepTwo = (event) => {
    event.preventDefault();
    if (this.stepOneValidation()){
      this.setState({
        step: 2
      },function () {
        window.scrollTo(0,0)
      })
    }
  }

  renderHighestOffer = () => {
    if (this.state.offer_type === "bid"){
      return (<h4 className="font-red text-right">{window.format_currency(this.state.bidding_options.highest_bid)}</h4>);
    }else if (this.state.offer_type === "best_offer") {
      return (<h4 className="font-red text-right">{window.format_currency(this.state.bidding_options.best_offer_price)}</h4>);
    }else if (this.state.offer_type === "buy_now") {
      return (<h4 className="font-red text-right">{window.format_currency(this.state.bidding_options.buy_now_price)}</h4>);
    }else if (this.state.offer_type === "best_buy_now") {
      return (<h4 className="font-red text-right">{window.format_currency(this.state.bidding_options.best_offer_buy_now_price)}</h4>);
    }
  }

  renderHighestOfferText = () => {
    if (this.state.offer_type === "bid"){
      return (window.format_currency(this.state.bidding_options.highest_bid));
    }else if (this.state.offer_type === "best_offer") {
      return (window.format_currency(this.state.bidding_options.best_offer_price));
    }else if (this.state.offer_type === "buy_now") {
      return (window.format_currency(this.state.bidding_options.buy_now_price));
    }else if (this.state.offer_type === "best_buy_now") {
      return (window.format_currency(this.state.bidding_options.best_offer_buy_now_price));
    }
  }

  updateTotalDue = () => {
    if (this.state.offer_type === "bid"){
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          total_due: (this.state.bidding_options.current_offer + this.state.bidding_options.internet_transaction_fee)
        }
      })
    }else if (this.state.offer_type === "best_offer") {
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          total_due: (this.state.bidding_options.current_best_offer + this.state.bidding_options.internet_transaction_fee)
        }
      })
    }else if (this.state.offer_type === "buy_now") {
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          total_due: (this.state.bidding_options.buy_now_price + this.state.bidding_options.internet_transaction_fee)
        }
      })
    }else if (this.state.offer_type === "best_buy_now") {
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          total_due: (this.state.bidding_options.best_offer_buy_now_price + this.state.bidding_options.internet_transaction_fee)
        }
      })
    }
  }

  isTermsAgreed = () => {
    if (this.state.terms_agreed1 && this.state.terms_agreed2 && this.state.terms_agreed3 && this.state.terms_agreed4 && this.state.terms_agreed5 && this.state.terms_agreed6 && this.state.terms_agreed7 && this.state.terms_agreed8){
      return true;
    }
    else {
       return false;
    }
  }

  updatePropertyClosingDate = (date) => {
    if (this._isMounted){
      this.setState({
        bidding_options: {
        ...this.state.bidding_options,
        property_closing_date: date
        }
      })
    }
  }

  submitBiddingOffer = () => {
    for (let i=0; i < this._timerArray.length; i++ ){
      clearInterval(this._timerArray[i]);
    }
    this.setState({
      isLoaded: false ,
    });
    const fd = new FormData();
    fd.append('payment[card_token]', this.state.card_token)
    fd.append('property[id]', this.state.property.id)
    fd.append('bid[amount]', this.state.bidding_options.current_offer)
    fd.append('bid[fund_proof]', this.state.fund_proof, this.state.fund_proof.name)
    fd.append('bid[buy_option]', JSON.stringify(this.state.buy_option))
    fd.append('bid[user_first_name]', this.state.bidding_options.user_first_name)
    fd.append('bid[user_middle_name]', this.state.bidding_options.user_middle_name)
    fd.append('bid[user_last_name]', this.state.bidding_options.user_last_name)
    fd.append('bid[user_email]', this.state.bidding_options.user_email)
    fd.append('bid[user_phone_no]', this.state.bidding_options.user_phone_no)
    fd.append('bid[self_buy_property]', this.state.bidding_options.self_buy_property)
    fd.append('bid[realtor_first_name]', this.state.bidding_options.realtor_first_name)
    fd.append('bid[realtor_last_name]', this.state.bidding_options.realtor_last_name)
    fd.append('bid[realtor_license]', this.state.bidding_options.realtor_license)
    fd.append('bid[realtor_company]', this.state.bidding_options.realtor_company)
    fd.append('bid[realtor_phone_no]', this.state.bidding_options.realtor_phone_no)
    fd.append('bid[realtor_email]', this.state.bidding_options.realtor_email)
    fd.append('bid[purchase_property_as]', this.state.bidding_options.purchase_property_as)
    fd.append('bid[business_document_text]', this.state.bidding_options.business_document_text)
    for (let i = 0 ; i < this.state.business_documents.length ; i++) {
      fd.append('bid[business_documents][]', this.state.business_documents[i], this.state.business_documents[i].name)
    }
    fd.append('bid[promo_code]', this.state.bidding_options.promo_code)
    fd.append('bid[property_closing_date]', this.state.bidding_options.property_closing_date)
    fd.append('bid[hold_bid_days]', this.state.bidding_options.hold_bid_days)
    fd.append('bid[internet_transaction_fee]', this.state.bidding_options.internet_transaction_fee)
    fd.append('bid[total_due]', this.state.bidding_options.total_due)
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/bids"
    fetch(url,{
      method: 'POST',
      headers: {
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Max-Age": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: fd
    })
    .then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 201){
          this.setState({
            submitted: true,
            step: 3,
            chat_room: result.chat_room,
            isLoaded: true,
            open_bidding_modal: false,
            fund_proof: "",
            message: result.message,
            variant: "success",
            terms_agreed: false,
            property: result.property,
            bidding_options: {
              ...this.state.bidding_options,
              highest_bid: result.property.highest_bid,
              current_offer: result.property.highest_bid ? (result.property.highest_bid + 1000) : 1000 ,
              buy_now_price: result.property.buy_now_price,
              best_offer_price: result.property.best_offer_price ? result.property.best_offer_price : 0 ,
              best_offer_buy_now_price: result.property.best_offer_sellers_reserve_price,
            }
          });
          this.showProperty();
        }
        else if (result.status === 400 || result.status === 404) {
          this.setState({
            message: result.message,
            variant: "danger",
            terms_agreed: false,
            open_bidding_modal: false,
            isLoaded: true,
          });
          this.btn.removeAttribute("disabled");
        }
        else if (result.status === 401) {
          localStorage.removeItem("auction_user_token");
          window.location.href = "/login"
        }
        else{
        }
        this.clearMessageTimeout = setTimeout(() => {
          this.setState(() => ({message: ""}))
        }, 2000);
      }
    })
    .catch(
      (error) => {
        if (this._isMounted){
          this.setState({
            // isLoaded: true,
          });
        }
      }
    )
  }

  submitBestOffer = () => {
    this.setState({
      isLoaded: false ,
    });
    const fd = new FormData();
    fd.append('property[id]', this.state.property.id)
    fd.append('payment[card_token]', this.state.card_token)
    fd.append('best_offer[amount]', this.state.bidding_options.current_best_offer)
    fd.append('best_offer[fund_proof]', this.state.fund_proof, this.state.fund_proof.name)
    fd.append('best_offer[buy_option]', JSON.stringify(this.state.buy_option))
    fd.append('best_offer[user_first_name]', this.state.bidding_options.user_first_name)
    fd.append('best_offer[user_middle_name]', this.state.bidding_options.user_middle_name)
    fd.append('best_offer[user_last_name]', this.state.bidding_options.user_last_name)
    fd.append('best_offer[user_email]', this.state.bidding_options.user_email)
    fd.append('best_offer[user_phone_no]', this.state.bidding_options.user_phone_no)
    fd.append('best_offer[self_buy_property]', this.state.bidding_options.self_buy_property)
    fd.append('best_offer[realtor_first_name]', this.state.bidding_options.realtor_first_name)
    fd.append('best_offer[realtor_last_name]', this.state.bidding_options.realtor_last_name)
    fd.append('best_offer[realtor_license]', this.state.bidding_options.realtor_license)
    fd.append('best_offer[realtor_company]', this.state.bidding_options.realtor_company)
    fd.append('best_offer[realtor_phone_no]', this.state.bidding_options.realtor_phone_no)
    fd.append('best_offer[realtor_email]', this.state.bidding_options.realtor_email)
    fd.append('best_offer[purchase_property_as]', this.state.bidding_options.purchase_property_as)
    fd.append('best_offer[business_document_text]', this.state.bidding_options.business_document_text)
    for (let i = 0 ; i < this.state.business_documents.length ; i++) {
      fd.append('best_offer[business_documents][]', this.state.business_documents[i], this.state.business_documents[i].name)
    }
    fd.append('best_offer[promo_code]', this.state.bidding_options.promo_code)
    fd.append('best_offer[property_closing_date]', this.state.bidding_options.property_closing_date)
    fd.append('best_offer[hold_bid_days]', this.state.bidding_options.hold_bid_days)
    fd.append('best_offer[internet_transaction_fee]', this.state.bidding_options.internet_transaction_fee)
    fd.append('best_offer[total_due]', this.state.bidding_options.total_due)
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/best_offers"
    fetch(url,{
      method: 'POST',
      headers: {
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Max-Age": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: fd
    })
    .then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 201){
          this.setState({
            submitted: true,
            step: 3,
            chat_room: result.chat_room,
            isLoaded: true,
            open_best_offer_modal: false,
            fund_proof: "",
            message: result.message,
            variant:"success",
            terms_agreed: false,
            property: result.property,
            bidding_options: {
              ...this.state.bidding_options,
              highest_bid: result.property.highest_bid,
              current_offer: result.property.highest_bid ? (result.property.highest_bid + 1000) : 1000 ,
              buy_now_price: result.property.buy_now_price,
              current_best_offer: result.property.best_offer_price ? (result.property.best_offer_price + 1000) : 1000 ,
              best_offer_price: result.property.best_offer_price ? (result.property.best_offer_price ) : 0,
              best_offer_buy_now_price: result.property.best_offer_sellers_reserve_price,
            }
          });

        }
        else if (result.status === 400 || result.status === 404 ) {
          this.setState({
            message: result.message,
            terms_agreed: false,
            open_best_offer_modal: false,
            isLoaded: true,
            variant: "danger",
          });
          this.btn.removeAttribute("disabled");
        }
        else if (result.status === 401) {
          localStorage.removeItem("auction_user_token");
          window.location.href = "/login"
        }
        else{
        }
        this.clearMessageTimeout = setTimeout(() => {
          this.setState(() => ({message: ""}))
        }, 2000);
      }
    })
    .catch(
      (error) => {
        if (this._isMounted){
          this.setState({
            // isLoaded: true,
          });
        }
      }
    )
  }
  submitBuyNowOffer = () => {
    this.setState({
      isLoaded: false ,
    });
    const fd = new FormData();
    fd.append('property[id]', this.state.property.id)
    fd.append('payment[card_token]', this.state.card_token)
    fd.append("best_offer", this.state.best_offer )
    fd.append('buy_now[amount]', this.state.best_offer === true ? this.state.bidding_options.best_offer_buy_now_price : this.state.bidding_options.buy_now_price)
    fd.append('buy_now[fund_proof]', this.state.fund_proof, this.state.fund_proof.name)
    fd.append('buy_now[buy_option]', JSON.stringify(this.state.buy_option))
    fd.append('buy_now[user_first_name]', this.state.bidding_options.user_first_name)
    fd.append('buy_now[user_middle_name]', this.state.bidding_options.user_middle_name)
    fd.append('buy_now[user_last_name]', this.state.bidding_options.user_last_name)
    fd.append('buy_now[user_email]', this.state.bidding_options.user_email)
    fd.append('buy_now[user_phone_no]', this.state.bidding_options.user_phone_no)
    fd.append('buy_now[self_buy_property]', this.state.bidding_options.self_buy_property)
    fd.append('buy_now[realtor_first_name]', this.state.bidding_options.realtor_first_name)
    fd.append('buy_now[realtor_last_name]', this.state.bidding_options.realtor_last_name)
    fd.append('buy_now[realtor_license]', this.state.bidding_options.realtor_license)
    fd.append('buy_now[realtor_company]', this.state.bidding_options.realtor_company)
    fd.append('buy_now[realtor_phone_no]', this.state.bidding_options.realtor_phone_no)
    fd.append('buy_now[realtor_email]', this.state.bidding_options.realtor_email)
    fd.append('buy_now[purchase_property_as]', this.state.bidding_options.purchase_property_as)
    fd.append('buy_now[business_document_text]', this.state.bidding_options.business_document_text)
    for (let i = 0 ; i < this.state.business_documents.length ; i++) {
      fd.append('buy_now[business_documents][]', this.state.business_documents[i], this.state.business_documents[i].name)
    }
    fd.append('buy_now[promo_code]', this.state.bidding_options.promo_code)
    fd.append('buy_now[property_closing_date]', this.state.bidding_options.property_closing_date)
    fd.append('buy_now[hold_bid_days]', this.state.bidding_options.hold_bid_days)
    fd.append('buy_now[internet_transaction_fee]', this.state.bidding_options.internet_transaction_fee)
    fd.append('buy_now[total_due]', this.state.bidding_options.total_due)
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/buy_now_offers"
    fetch(url,{
      method: 'POST',
      headers: {
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Max-Age": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: fd
    })
    .then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 201){
          this.setState({
            step: 3,
            submitted: true,
            chat_room: result.chat_room,
            isLoaded: true,
            open_buy_now_modal: false,
            fund_proof: "",
            message: result.message,
            variant: "success",
            terms_agreed: false,
            property: result.property
          });

        }
        else if (result.status === 400 || result.status === 404 ) {
          this.setState({
            message: result.message,
            terms_agreed: false,
            open_buy_now_modal: false,
            isLoaded: true,
            variant: "danger",
          });
          this.btn.removeAttribute("disabled");
        }
        else if (result.status === 401) {
          localStorage.removeItem("auction_user_token");
          window.location.href = "/login"
        }
        else{
        }
        this.clearMessageTimeout = setTimeout(() => {
          this.setState(() => ({message: ""}))
        }, 2000);
      }
    })
    .catch(
      (error) => {
        if (this._isMounted){
          this.setState({
            // isLoaded: true,
          });
        }
      }
    )
  }
  alphaNumeric = (e) => {
    var keyCode = e.keyCode || e.which;
    //Regex for Valid Characters i.e. Alphabets and Numbers.
    var regex = /^[A-Za-z0-9]+$/;
    //Validate TextBox value against the Regex.
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
      e.preventDefault();
      return false;
    }
  }
  generateCode = () => {
    this.setState({
      isLoaded: false
    })
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/promo_codes"
  	fetch(url ,{
			method: "GET",
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
      if (result.status === 200) {
        this.setState({
          generated_promo_code: result,
          promo_modal: true,
          isLoaded: true,
          generated_promo_code: result.promo_code,
        });
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        this.setState({
          isLoaded: true,
          message: result.message,
          variant: 'danger',
        });
      }
      this.clearMessageTimeout = setTimeout(() => {
        if (this._isMounted){
          this.setState(() => ({message: ""}))
        }
      }, 2000);
		}, (error) => {
		});
    // var result = '';
    // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // var charactersLength = characters.length;
    // for ( var i = 0; i < 7; i++ ) {
    //   result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // }
    // this.setState({
    //   generated_promo_code: result,
    //   promo_modal: true
    // })
  }

  updateCode = (event) => {
    const {name, value} = event.target;
    this.setState({
      bidding_options: {
        ...this.state.bidding_options,
        [name]: value,
      }
    })
  }

  applyCode = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/promo_codes/apply"
  	fetch(url ,{
			method: "POST",
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
			body: JSON.stringify({promo_code: this.state.bidding_options.promo_code}),
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        this.setState({
          isLoaded: true,
          promo_code_applied: true,
          message: result.message,
          variant: 'success',
          bidding_options: {
            ...this.state.bidding_options,
            internet_transaction_fee: 0
          }
        })
        this.updateTotalDue();
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        this.setState({
          isLoaded: true,
          promo_code_applied: false,
          message: result.message,
          variant: 'danger',
          bidding_options: {
            ...this.state.bidding_options,
            internet_transaction_fee: 97
          }
        })
        this.updateTotalDue();
      }
      this.clearMessageTimeout = setTimeout(() => {
        if (this._isMounted){
          this.setState(() => ({message: ""}))
        }
      }, 2000);
		}, (error) => {
		});
  }

  copyPromo = () => {
    this.code.select();
    document.execCommand('copy');
    this.setState({
      promo_modal: false
    })
  }

  hidePromo = () => {
    this.setState({
      promo_modal: false
    })
  }

  render(){
    const purchase_property_as_options = this.state.purchase_property_as_options.map((value, index) => {
      return(
        <option key={index} value={value} >{value}</option>
      )
    })
    const buy_options = this.state.property_buy_options.map((value, index) => ({
      value: value,
      label: value
    }))
    const hold_bid_days_options = this.state.hold_bid_days_options.map((value, index) => {
      return(
        <option key={index} value={value} >{value} days</option>
      )
    })
    if (this.state.isLoaded === true && (Object.keys(this.state.property).length > 0)){
      return (
        <div className="profile-setting">
          <div className="container custom_container px-0">
          {
            this.state.message ? <Alert className="mt-0 mb-0" variant={this.state.variant}>{this.state.message}</Alert> : null
          }
          {
            this.state.chat_room ?
            (
              ((Object.entries(this.state.chat_room).length > 0) && (this.state.chat_room.constructor === Object)) ?
                <Redirect to={{
                  pathname: "/user/chat",
                  state: { chat_room: this.state.chat_room }
                }}/>
              : null
            ) : null
          }
            <div className="row mx-0 profile_row my-5 register_bids_new">
              <div className="col-md-12 py-3">
                <div className="bg_white">
                  <div className="register_bid_detail row d-flex justify-content-between align-items-center p-3">
                    <div className="full_img col-md-3">
                      <img src={this.state.property.thumbnail_img ? this.state.property.thumbnail_img : "/images/home1.png" } alt="property image" />
                    </div>
                    <div className="register_bid_head col-md-6">
                      <div>
                        <h3>{this.state.property.address.split(",")[0]}</h3>
                        <h4>{this.state.property.address.split(",").slice(1, this.state.property.address.split(",").length).join(',')} </h4>
                      </div>
                      {this.state.property.category === "Residential" ?
                        <div className="head_icon">
                          <Link to="#" className="head_icon_box">
                            <FontAwesomeIcon icon={faBed}  />
                            <p>{this.state.property.residential_attributes.bedrooms} Beds</p>
                          </Link>
                          <Link to="#" className="head_icon_box">
                            <FontAwesomeIcon icon={faBath}  />
                            <p>{this.state.property.residential_attributes.bathrooms} Baths</p>
                          </Link>
                          <Link to="#" className="">
                            <FontAwesomeIcon icon={faCar}  />
                            <p>{this.state.property.residential_attributes.garage} Car</p>
                          </Link>
                        </div>
                      : null}
                    </div>
                    <div className="register_bid_price col-md-3 px-0">
                      <div className="register_timing">
                        {this.renderTimerBlock()}
                      </div>
                      <div className="register_pricing">
                        <p>Current Highest Offer</p>
                        {this.renderHighestOffer()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                this.state.step === 1 ?
                <>
                  <div className="col-md-12 py-3">
                    <div className="bg_white">
                      <div className="register_bid_description p-3">
                        <p className="mb-0">Registering to bid on a property takes 3 easy steps. Step 1 is to: A. verify who is the buyer. B. are you being represented by an agent and if yes their name and contact information. C. Is buyer an individual or bussiness entity. D. Upload your proof of funds and/or preapproval status. This information will be used in the event that you are the winning bidder and to be able to provide the correct information to the seller. Without the correct information your offer could be rejected by the seller even if you are the highest offer.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 py-3">
                    <div className="bg_white">
                      <div className="register_bid_form py-3 px-5">
                        <form onSubmit={this.goToStepTwo}>
                          <div className="register_bid_title mb-2 col-md-8">
                            <h4>A. Register to { this.humanizeOfferType(this.state.offer_type)}</h4>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-right">First Name&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className={"form-control"+ this.addErrorClass(this.state.user_first_name_error)} name="user_first_name" onChange={this.updatePropertyOfferFields} value={this.state.bidding_options.user_first_name}/>
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Middle Name&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className={"form-control"+this.addErrorClass(this.state.user_middle_name_error)} name="user_middle_name" onChange={this.updatePropertyOfferFields}/>
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-right">Last Name&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className={"form-control"+this.addErrorClass(this.state.user_last_name_error)} name="user_last_name" onChange={this.updatePropertyOfferFields} value={this.state.bidding_options.user_last_name}/>
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Email Address&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className={"form-control"+this.addErrorClass(this.state.user_email_error)} name="user_email" onChange={this.updatePropertyOfferFields} value={this.state.bidding_options.user_email}/>
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Mobile No.&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className={"form-control"+this.addErrorClass(this.state.user_phone_number_error)} name="user_phone_no" onChange={this.updatePropertyOfferFields} onKeyPress={this.checkNumeric} maxLength={10} value={this.state.bidding_options.user_phone_no}/>
                            </div>
                          </div>
                          <div className="register_bid_title mb-2 col-md-8 d-flex align-items-center justify-content-between">
                            <h4>B. Are you buying this property for yourself?</h4>
                            <select className="form-control" name="self_buy_property" defaultValue={false} onChange={this.updatePropertyOfferFields}>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </div>
                          {
                            (this.state.bidding_options.self_buy_property === "true")
                            ?
                            <div className="col-md-8 warning_alert p-2 d-flex align-items-center justify-content-between">
                              <FontAwesomeIcon icon={faExclamationCircle}/>
                              <p>Buyer is not being represented bu a licensed Realtor and understand and acknowledges that they will not be getting any representation with respect to this property.</p>
                            </div>
                            :
                            <>
                              <div className="col-md-8 relator_info">
                                <h5>Relator Information</h5>
                                <p>There will be no fee or comission paid by AuctionMyDeal.com or any seller unless they are listed on the MLS and then you will recieve the comission offered on MLS by the sponsoring broker.</p>
                              </div>
                              <div className="form-group row mx-0">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-right">First Name&nbsp;&nbsp;:</label>
                                <div className="col-sm-6">
                                  <input type="text" className={"form-control"+ this.addErrorClass(this.state.realtor_first_name_error)} name="realtor_first_name" onChange={this.updatePropertyOfferFields}/>
                                </div>
                              </div>
                              <div className="form-group row mx-0">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-right">Last Name&nbsp;&nbsp;:</label>
                                <div className="col-sm-6">
                                  <input type="text" className={"form-control"+ this.addErrorClass(this.state.realtor_last_name_error)} name="realtor_last_name" onChange={this.updatePropertyOfferFields}/>
                                </div>
                              </div>
                              <div className="form-group row mx-0">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">License&nbsp;&nbsp;:</label>
                                <div className="col-sm-6">
                                  <input type="text" className={"form-control"+ this.addErrorClass(this.state.realtor_license_error)} name="realtor_license" onChange={this.updatePropertyOfferFields}/>
                                </div>
                              </div>
                              <div className="form-group row mx-0">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Company Name&nbsp;&nbsp;:</label>
                                <div className="col-sm-6">
                                  <input type="text" className={"form-control"+ this.addErrorClass(this.state.realtor_company_error)} name="realtor_company" onChange={this.updatePropertyOfferFields}/>
                                </div>
                              </div>
                              <div className="form-group row mx-0">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Mobile No.&nbsp;&nbsp;:</label>
                                <div className="col-sm-6">
                                  <input type="text" className={"form-control"+ this.addErrorClass(this.state.realtor_phone_no_error)} name="realtor_phone_no" onKeyPress={this.checkNumeric} maxLength={10} onChange={this.updatePropertyOfferFields}/>
                                </div>
                              </div>
                              <div className="form-group row mx-0">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Email Address&nbsp;&nbsp;:</label>
                                <div className="col-sm-6">
                                  <input type="text" className={"form-control"+ this.addErrorClass(this.state.realtor_email_error)} name="realtor_email" onChange={this.updatePropertyOfferFields}/>
                                </div>
                              </div>

                            </>

                          }

                          <div className="register_bid_title mb-2 col-md-8 d-flex align-items-center justify-content-between">
                            <h4>C. I want to purchase the property as:</h4>
                            <select className="form-control" defaultValue={this.state.bidding_options.purchase_property_as} name="purchase_property_as" onChange={this.updatePropertyOfferFields}>
                              {purchase_property_as_options}
                            </select>
                          </div>
                          {
                            (this.state.bidding_options.purchase_property_as === "Business")
                            ?
                            <>
                              <div className="form-group">
                                <label htmlFor="inputPassword" className="col-sm-6 col-form-label">Please provide Bussiness Entity Formation Documents here</label>
                                <div className="col-sm-6">
                                  <input type="text" name="business_document_text" className={"form-control"+this.addErrorClass(this.state.business_document_text_error)} onChange={this.updatePropertyOfferFields} />
                                </div>
                              </div>
                              <div className="form-group row mx-0">
                                <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Upload Bussiness Entity Formation Documents</label>
                                <div className="col-sm-3">
                                  <div className="custom-file accept-file">
                                    <input type="file" multiple={true} className="custom-file-input" name="business_documents" onChange={this.multipleFileSelector} id="customFile"/>
                                    <label className={"custom-file-label " + this.addErrorClass(this.state.business_documents_error)} htmlFor="customFile">Choose files</label>
                                  </div>
                                </div>
                              </div>
                            </>
                            :
                            null
                          }
                          <div className="register_bid_title mb-2 col-md-8 d-flex align-items-center justify-content-between">
                            <h4>D. Proof of funds and/or Preapproval Letter:</h4>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label">I plan on buying this property with (*)</label>
                            <div className="col-sm-4">
                            <MultiSelect
                              options={buy_options}
                              selectSomeItmes = "select"
                              selected={this.state.buy_option}
                              onSelectedChanged={selected => {this.setState({buy_option: selected})}}
                            />
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Attach proof of funds</label>
                            <div className="col-sm-4">
                            <div className="custom-file accept-file">
                              <input type="file" className="custom-file-input" name="fund_proof" onChange={this.handleFundProofSelector} id="customFile"/>
                              <label className={"custom-file-label " + this.addErrorClass(this.state.fund_proof_error)} htmlFor="customFile">Choose file</label>
                            </div>
                            </div>
                          </div>
                          <div className="col-md-8 warning_alert p-2 d-flex align-items-center justify-content-between">
                            <FontAwesomeIcon icon={faExclamationCircle}/>
                            <p>The seller will require that any bids submitted must have proof of funds and/or preapproval letter before they will consider your offer. For cash purchases, please attch a recent bank statement, investment account statement, line of credit letter from your banker or letter from your private lender with their proof of funds. Financed purchases must attach a copy of your preapproval letter from your lender. A good phone number is highly recommended to be on any letters from lenders or the seller may disregard your bid and pursue another offer that is verifiable.</p>
                          </div>
                          <div className="form-group form-check">
                            <input className="form-check-input" name="terms_agreed" type="checkbox" id="exampleCheck1" onChange={this.updateTermsAgreed}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">I hereby acknowledge that the contact information is true and correct. I understand the information i've provided will be used to prepare the transaction document for the purchase of the property if my bid is accepted by the seller to proceed toward closing of this property.</label>
                          </div>
                          <div className="col-md-12 text-center">
                            {
                              this.state.terms_agreed === true ?
                                <button type="button" className="btn red-btn" onClick={this.goToStepTwo}>Submit</button>
                              :
                              <button className="btn red-btn" type="button" disabled>Submit</button>
                            }
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
                :

                  <>
                  <div className="col-md-12 py-3">
                    <div className="bg_white">
                      <div className="register_bid_form py-3 px-5">
                        <div>
                          <div className="register_bid_title mb-2 col-md-8">
                            <h4>Place Your { this.humanizeOfferType(this.state.offer_type)}</h4>
                          </div>
                          <div className="form-group row mx-0 mb-0">
                            <label className="col-sm-3 col-form-label text-right">Your amount offer is&nbsp;&nbsp;:</label>
                            <div className="input-group col-md-3">
                              {
                                this.state.offer_type == "bid" ?
                                <>
                                  <div className="input-group-prepend">
                                    <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
                                  </div>
                                  <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
                                  <div className="input-group-append">
                                    <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
                                  </div>
                                </>
                                :
                                (this.state.offer_type == "best_offer" ?
                                  <>
                                    <div className="input-group-prepend">
                                      <button className="input-group-text group-box btn" onClick={this.decrementCurrentBestOffer}><FontAwesomeIcon icon={faMinus}/></button>
                                    </div>
                                    <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_best_offer} name="current_best_offer" onChangeEvent={this.updateCurrentBestOffer}/>
                                    <div className="input-group-append">
                                      <button className="input-group-text group-box btn" onClick={this.incrementCurrentBestOffer}><FontAwesomeIcon icon={faPlus}/></button>
                                    </div>
                                  </>
                                  :
                                  (this.state.offer_type === "best_buy_now" ?
                                  <>
                                    <div className="input-group-prepend">
                                      <span className="input-group-text group-box"><FontAwesomeIcon icon={faMinus}/></span>
                                    </div>
                                    <CurrencyInput type="text" prefix="$" readOnly={true} className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.best_offer_buy_now_price}  name="best_offer_buy_now_price" onChangeEvent={this.updateCurrentOffer}/>
                                    <div className="input-group-append">
                                      <span className="input-group-text group-box"><FontAwesomeIcon icon={faPlus}/></span>
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div className="input-group-prepend">
                                      <span className="input-group-text group-box"><FontAwesomeIcon icon={faMinus}/></span>
                                    </div>
                                    <CurrencyInput type="text" prefix="$" readOnly={true} className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.buy_now_price}  name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
                                    <div className="input-group-append">
                                      <span className="input-group-text group-box"><FontAwesomeIcon icon={faPlus}/></span>
                                    </div>
                                  </>
                                  )
                                )
                              }
                            </div>
                          </div>
                          <div className="form-group row mx-0 align-items-center mb-0">
                            <label className="col-sm-3 col-form-label text-right">Internet Transaction Fee&nbsp;&nbsp;:</label>
                            <div className="col-sm-3 text-right font-weight-bold">
                              <p className="values_input">{window.format_currency(this.state.bidding_options.internet_transaction_fee)}</p>
                            </div>
                            <div className="col-sm-4 d-flex align-items-end justify-content-start promo_code_box">
                              <div className="promo_code">
                                {this.state.code_availed ?
                                  <Link to="#">Redeem Promo Code></Link>
                                  :
                                  <Link to="#" onClick={this.generateCode}>Redeem Promo Code></Link>
                                }
                                <input type="text" className="form-control" maxLength={7} name="promo_code" value={this.state.bidding_options.promo_code} onChange={this.updateCode} onKeyPress = {this.alphaNumeric}/>
                              </div>
                              { (this.state.bidding_options.promo_code.length == 7) ?
                                <button className="btn red-btn promo_btn" onClick={this.applyCode}>Apply</button>
                                :
                                <button className="btn red-btn promo_btn" disabled>Apply</button>
                              }
                            </div>
                          </div>
                          <div className="form-group row mx-0 align-items-center">
                            <label className="col-sm-3 col-form-label text-right">Total Due&nbsp;&nbsp;:</label>
                            <div className="col-sm-3 text-center font-weight-bold">
                              <p className="values_input values_input_border">{window.format_currency(this.state.bidding_options.total_due)}</p>
                            </div>
                          </div>
                          <div className="col-md-8 warning_alert p-2 d-flex align-items-center justify-content-start">
                            <FontAwesomeIcon icon={faExclamationCircle}/>
                            <p>if your offer is accepted then the seller is requesting a deposit in the amount of {window.format_currency(this.state.property.property_closing_amount)}.</p>
                          </div>
                          <p className="seller_request">Seller is requesting that you close by:</p>
                          <div className="form-group row mx-0">
                            <label className="col-sm-5 col-form-label text-left">How soon can you close on this property&nbsp;&nbsp;:</label>
                            <div className="col-sm-3">
                            <DatePicker className={"form-control " + this.addErrorClass(this.state.property_closing_date_error) }
                              selected={this.state.bidding_options.property_closing_date} minDate={new Date()}
                              name="property_closing_date" onChange={this.updatePropertyClosingDate}
                            />
                            </div>
                          </div>
                          <div className="form-group row mx-0 align-items-center">
                            <label className="col-sm-5 col-form-label text-left">If my bid is not initially accepted by the seller then please hold my bid as backup offer for&nbsp;&nbsp;:</label>
                            <div className="col-sm-3">
                              <select className="form-control" name="hold_bid_days" onChange={this.updatePropertyOfferFields}>
                                {hold_bid_days_options}
                              </select>
                            </div>
                          </div>
                          {
                            this.state.promo_code_applied ?
                            null
                            :
                            <>
                            <div className="register_bid_title mb-2 col-md-8 d-flex align-items-center justify-content-between">
                              <h4>Payment Information</h4>
                            </div>
                            <div className="form-group row mx-0">
                              <label className="col-sm-2 col-form-label text-right">Card Number&nbsp;&nbsp;:</label>
                              <div className="col-sm-6">
                                <input type="text" className={"form-control" + this.addErrorClass(this.state.cardnumber_error)} placeholder="card number" name="cardNumber" maxLength="16" onKeyPress={this.checkNumeric} onChange={this.updatePaymentFields} value={this.state.payment.cardNumber} />
                              </div>
                            </div>
                            <div className="form-group row mx-0">
                              <label className="col-sm-2 col-form-label text-right">Expiry Date&nbsp;&nbsp;:</label>
                              <div className="col-sm-6 d-flex">
                                <input type="text" className={"form-control col-sm-2" + this.addErrorClass(this.state.expirymonth_error)} placeholder="MM"  maxLength="2" name="expiryMonth" onChange={this.updatePaymentFields} onKeyPress={this.checkNumeric} value={this.state.payment.expiryMonth}/>
                                <input type="text" className={"form-control ml-1 col-sm-4" + this.addErrorClass(this.state.expiryyear_error)} placeholder="YY"  maxLength="2" name="expiryYear" onChange={this.updatePaymentFields} onKeyPress={this.checkNumeric} value={this.state.payment.expiryYear}/>
                              </div>
                            </div>
                            <div className="form-group row mx-0">
                              <label className="col-sm-2 col-form-label text-right">CVV&nbsp;&nbsp;:</label>
                              <div className="col-sm-6">
                                <input type="password" className={"form-control" + this.addErrorClass(this.state.cvv_error)} placeholder="cvv" name="cvv" maxLength="4" onKeyPress={this.checkNumeric} onChange={this.updatePaymentFields} value={this.state.payment.cvv}/>
                              </div>
                            </div>
                            <div className="col-md-8 warning_alert p-2 d-flex align-items-center justify-content-start">
                              <FontAwesomeIcon icon={faExclamationCircle}/>
                              <p><b>$97 Bid Deposit</b>(a hold on your credit card) will be assessed once you submit an offer or bid to the site.</p>
                            </div>
                            </>
                          }

                          <p className="seller_request">Check the boxes to confirm the following:</p>
                          <div className="form-group form-check">
                            <input type="checkbox" name="terms_agreed1" onChange={this.updateTermsAgreed} className="form-check-input" id="exampleCheck11" />
                            <label className="form-check-label" htmlFor="exampleCheck11">I understand and agree that the seller reserves the right to refuse any bid, highest or otherwise and final acceptance of a selected bid is expressly subject to the sellers signature on the purchase and sale agreement</label>
                          </div>
                          <div className="form-group form-check">
                            <input type="checkbox" name="terms_agreed2" onChange={this.updateTermsAgreed} className="form-check-input" id="exampleCheck12" />
                            <label className="form-check-label" htmlFor="exampleCheck12">I agree to buy this property As-is, where is with all faults.</label>
                          </div>
                          <div className="form-group form-check">
                            <input type="checkbox" name="terms_agreed3" onChange={this.updateTermsAgreed} className="form-check-input" id="exampleCheck13" />
                            <label className="form-check-label" htmlFor="exampleCheck13">I understand that the pictures, video ARV proof and rehab numbers are provided for informational purposes only and I have done my own due dilligence for this property i am bidding on.</label>
                          </div>
                          <div className="form-group form-check">
                            <input type="checkbox" name="terms_agreed4" onChange={this.updateTermsAgreed} className="form-check-input" id="exampleCheck14" />
                            <label className="form-check-label" htmlFor="exampleCheck14">I agree to sign and return the purchase documents within 1 bussiness day of receipt or my offer could be rejected.</label>
                          </div>
                          <div className="form-group form-check">
                            <input type="checkbox" name="terms_agreed5" onChange={this.updateTermsAgreed} className="form-check-input" id="exampleCheck15" />
                            <label className="form-check-label" htmlFor="exampleCheck15">I agree to deliver(whatever seller enters as required earnest money $) as nonrefundable earnest money to title company on Executed Contract if i am the winning bidder within the 48 bussiness hours or my winning bidder status can be cancelled.</label>
                          </div>
                          <div className="form-group form-check">
                            <input type="checkbox" name="terms_agreed6" onChange={this.updateTermsAgreed} className="form-check-input" id="exampleCheck16" />
                            <label className="form-check-label" htmlFor="exampleCheck16">I agree to respond to AuctionMyDeal.com inquires within 1 bussiness day of receipt.</label>
                          </div>
                          <div className="form-group form-check">
                            <input type="checkbox" name="terms_agreed7" onChange={this.updateTermsAgreed} className="form-check-input" id="exampleCheck17" />
                            <label className="form-check-label" htmlFor="exampleCheck17">I (Buyers) agrees to pay for all standaard buyer and seller closing cost including title policy. Seller will pay to remove all liens, taxes and HOA dues owed and prorated up until the day of closing.</label>
                          </div>
                          <div className="form-group form-check">
                            <input type="checkbox" name="terms_agreed8" onChange={this.updateTermsAgreed} className="form-check-input" id="exampleCheck18" />
                            <label className="form-check-label" htmlFor="exampleCheck18">I am the prospective buyer or an authorized representative of the prospective buyer for this transaction. I represent that on my own behalf and behalf of any prospective buyer I represent. I have read and agree with the participation terms for making this offer, and agree to AuctionMyDeal.com Terms and Conditions , Privacy Policy and any special terms that may apply.</label>
                          </div>
                          <div className="col-md-12 text-center">
                            {
                              this.isTermsAgreed() ?
                              <button className="btn red-btn" ref={btn => { this.btn = btn; }}  type="submit" onClick={this.submitOffer}>Submit</button>
                              :
                              <button className="btn red-btn" type="submit" disabled>Submit</button>
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    <Modal className="promo_copy" show={this.state.promo_modal} onHide={this.hidePromo}>
                      <Modal.Header className="justify-content-center border-0">
                        <Modal.Title>REEDEM PROMO CODE</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <input type="text" readOnly className="form-control" ref={code => {this.code = code}} value={this.state.generated_promo_code} />
                        <div className="col-md-12 text-center">
                          <button className="btn red-btn my-3" onClick={this.copyPromo}>Copy</button>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      );
    }else {
      return (
        <>
          <div className="container custom_container blank_container">
            <div className="spinner_main property_show">
              <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
