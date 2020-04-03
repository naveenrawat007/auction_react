import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CurrencyInput from 'react-currency-input';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { faExclamationCircle, faBed, faBath, faCar } from '@fortawesome/free-solid-svg-icons';

export default class PropertyOfferSubmit extends Component {
  _isMounted = false
  _timerArray = []
  constructor(props){
    super(props);
    this.state = {
      offer_type: this.props.match.params.offer_type,
      unique_address: this.props.match.params.id,
      buy_option: [],
      property_buy_options: [],
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
        purchase_property_as: "",
        internet_transaction_fee: "",
        total_due: "",
        promo_code: "",
        property_closing_date: "",
        hold_bid_days: "",
        self_buy_property: "false",

        highest_bid: 0,
        current_offer: 0,
        current_best_offer: 0,
        buy_now_price: "",
        best_offer_price: "",
        best_offer_buy_now_price: "",
      }
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
    for (let i=0; i < this._timerArray.length; i++ ){
      clearInterval(this._timerArray[i]);
    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.getProperty();
    window.scrollTo(0,0)
    // this.showCurrentSlide(1);
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
            bidding_options: {
              ...this.state.bidding_options,
              highest_bid: result.property.highest_bid,
              current_offer: result.property.highest_bid ? (result.property.highest_bid + 1000) : 1000,
              buy_now_price: result.property.buy_now_price,
              current_best_offer: result.property.best_offer_price ? (result.property.best_offer_price + 1000) : 1000 ,
              best_offer_price: result.property.best_offer_price,
              best_offer_buy_now_price: result.property.best_offer_sellers_reserve_price,
            }
          });
          // console.log(result.property);
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
    }else if (offer_type === "buy_now") {
      return "Buy Now";
    }
  }

  updatePropertyOfferFields = (event) => {
    const{ name, value } = event.target;
    if (this._isMounted){
      this.setState({
        property: {
          ...this.state.property,
          bidding_options:{
            ...this.state.property.bidding_options,
            [name]: value
          }
        }
      })
    }
  }

  render(){
    if (this.state.isLoaded === true && (Object.keys(this.state.property).length > 0)){
      return (
        <div className="profile-setting">
          <div className="container custom_container px-0">
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
                        <h4 className="font-red text-right">{window.format_currency(this.state.bidding_options.current_best_offer)}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    <form>
                      <div className="register_bid_title mb-2 col-md-8">
                        <h4>A. Register to { this.humanizeOfferType(this.state.offer_type)}</h4>
                      </div>
                      <div className="form-group row mx-0">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-right">First Name&nbsp;&nbsp;:</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name="user_first_name" onChange={this.updatePropertyOfferFields}/>
                        </div>
                      </div>
                      <div className="form-group row mx-0">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Middle Name&nbsp;&nbsp;:</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name="user_middle_name" onChange={this.updatePropertyOfferFields}/>
                        </div>
                      </div>
                      <div className="form-group row mx-0">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-right">Last Name&nbsp;&nbsp;:</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name="user_last_name" onChange={this.updatePropertyOfferFields}/>
                        </div>
                      </div>
                      <div className="form-group row mx-0">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Email Address&nbsp;&nbsp;:</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name="user_email" onChange={this.updatePropertyOfferFields}/>
                        </div>
                      </div>
                      <div className="form-group row mx-0">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Mobile No.&nbsp;&nbsp;:</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name="user_phone_no" onChange={this.updatePropertyOfferFields}/>
                        </div>
                      </div>
                      <div className="register_bid_title mb-2 col-md-8 d-flex align-items-center justify-content-between">
                        <h4>B. Are you buying this property for yourself?</h4>
                        <select className="form-control" name="self_buy_property" defaultValue="false" onChange={this.updatePropertyOfferFields}>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      {
                        this.state.bidding_options.self_buy_property === "true"
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
                              <input type="text" className="form-control" name="realtor_first_name"/>
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-right">Last Name&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className="form-control" name="realtor_last_name"/>
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">License&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className="form-control" name="realtor_license"/>
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Company Name&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className="form-control" name="realtor_company"/>
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Mobile No.&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className="form-control" name="realtor_phone_no"/>
                            </div>
                          </div>
                          <div className="form-group row mx-0">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-right">Email Address&nbsp;&nbsp;:</label>
                            <div className="col-sm-6">
                              <input type="text" className="form-control" name="realtor_email"/>
                            </div>
                          </div>

                        </>

                      }

                      <div className="register_bid_title mb-2 col-md-8 d-flex align-items-center justify-content-between">
                        <h4>C. I want to purchase the property as:</h4>
                        <select className="form-control" defaultValue="Business" name="purchase_property_as">
                          <option>Bussiness</option>
                          <option>Individual</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputPassword" className="col-sm-6 col-form-label">Please provide Bussiness Entity Formation Documents here</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control"/>
                        </div>
                      </div>
                      <div className="form-group row mx-0">
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Upload Bussiness Entity Formation Documents</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control"/>
                        </div>
                      </div>
                      <div className="register_bid_title mb-2 col-md-8 d-flex align-items-center justify-content-between">
                        <h4>D. Proof of funds and/or Preapproval Letter:</h4>
                      </div>
                      <div className="form-group row mx-0">
                        <label htmlFor="inputPassword" className="col-sm-4 col-form-label">I plan on buying this property with</label>
                        <div className="col-sm-4">
                          <select className="form-control">
                            <option>Cash</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row mx-0">
                        <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Attach proof of funds</label>
                        <div className="col-sm-4">
                          <input type="text" className="form-control"/>
                        </div>
                      </div>
                      <div className="col-md-8 warning_alert p-2 d-flex align-items-center justify-content-between">
                        <FontAwesomeIcon icon={faExclamationCircle}/>
                        <p>The seller will require that any bids submitted must have proof of funds and/or preapproval letter before they will consider your offer. For cash purchases, please attch a recent bank statement, investment account statement, line of credit letter from your banker or letter from your private lender with their proof of funds. Financed purchases must attach a copy of your preapproval letter from your lender. A good phone number is highly recommended to be on any letters from lenders or the seller may disregard your bid and pursue another offer that is verifiable.</p>
                      </div>
                      <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">I hereby acknowledge that the contact information is true and correct. I understand the information i've provided will be used to prepare the transaction document for the purchase of the property if my bid is accepted by the seller to proceed toward closing of this property.</label>
                      </div>
                      <div className="col-md-12 text-center">
                        <button className="btn red-btn" type="submit">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
