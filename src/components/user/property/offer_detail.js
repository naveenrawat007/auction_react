import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CurrencyInput from 'react-currency-input';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { faExclamationCircle, faBed, faBath, faCar, faMinus, faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons';

export default class OfferDetail extends Component {
  _isMounted = false
  _timerArray = []
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      offer_id: this.props.match.params.offer_id,
      offer_type: this.props.match.params.offer_type,
      property_id: this.props.match.params.id,
      offer: "",
      property: "",
      bidding_options: {
        highest_bid: 0,
        current_offer: 0,
        current_best_offer: 0,
        buy_now_price: "",
        best_offer_price: "",
        best_offer_buy_now_price: "",
      }
    }
  };

  componentDidMount = () =>  {
    this._isMounted = true;
    this.getOfferDetail();
  }
  showProperty = () => {
    window.open("/property/"+ this.state.property.unique_address, '_self')
  }

  getOfferDetail = () => {
    // console.log(this.props.match.params.id); //  params.id == this.props.match.params.id
    // const { match: { params } } = this.props;
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/property/" + this.state.property_id +"/offer/" + this.state.offer_type+"/"+this.state.offer_id
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
            offer: result.offer,
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

  render(){
    if (this.state.isLoaded === true){
      return (
        <div className="profile-setting">
          <div className="container custom_container px-0">
            <div className="row mx-0 profile_row my-5 register_bids_new place_your_bid">
              <div className="col-md-12 py-3">
                <div className="bg_white">
                  <div className="register_bid_detail row d-flex justify-content-between align-items-center p-3">
                    <div className="full_img col-md-3">
                      <img src="/images/home1.png" alt="" />
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
              this.state.offer.offer_detail ?
              <>
                <div className="col-md-12 py-3">
                  <div className="bg_white">
                    <div className="register_bid_description py-3 px-5">
                      <h3 className="mb-1">Total Amount { this.humanizeOfferType(this.state.offer_type)}: {window.format_currency(this.state.offer.amount)}</h3>
                      <p className="mb-0">Buyer will close this property: {window.formatDate(this.state.offer.offer_detail.property_closing_date)}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 py-3">
                  <div className="bg_white">
                    <div className="register_bid_form py-3 px-5">
                      <form>
                        <div className="register_bid_title mb-2 col-md-8">
                          <h4 className="mb-2">A. Register to Bid</h4>
                          <div className="font-blue-bold px-3">
                            <p className="mb-0">{this.state.offer.offer_detail.user_first_name}</p>
                            <p className="mb-0">{this.state.offer.offer_detail.user_last_name}</p>
                            <p className="mb-0">{this.state.offer.offer_detail.user_email}</p>
                            <p className="mb-0">{this.state.offer.offer_detail.user_phone_no}</p>
                          </div>
                        </div>
                        <div className="register_bid_title mb-2 col-md-8">
                          <h4>B. Are you buying this property for yourself? <span className="font-blue-bold">{
                              (this.state.offer.offer_detail.self_buy_property === "true") ? "YES" : "NO"
                            }</span></h4>
                            {
                              (this.state.offer.offer_detail.self_buy_property === true) ?
                                null
                                :
                               <>
                               <div className="col-md-10 relator_info">
                                 <h5>Relator Information</h5>
                                 <p className="mb-2">There will be no fee or comission paid by AuctionMyDeal.com or any seller unless they are listed on the MLS and then you will recieve the comission offered on MLS by the sponsoring broker.</p>
                               </div>
                               <div className="font-blue-bold px-3">
                                 <p className="mb-0">{this.state.offer.offer_detail.realtor_first_name}</p>
                                 <p className="mb-0">{this.state.offer.offer_detail.realtor_last_name}</p>
                                 <p className="mb-0">{this.state.offer.offer_detail.realtor_license}</p>
                                 <p className="mb-0">{this.state.offer.offer_detail.realtor_company}</p>
                                 <p className="mb-0">{this.state.offer.offer_detail.realtor_email}</p>
                                 <p className="mb-0">{this.state.offer.offer_detail.realtor_phone_no}</p>
                               </div>
                               </>
                              }
                        </div>
                        <div className="register_bid_title mb-2 col-md-8">
                          <h4 className="mb-2">C. I want to purchase the property as: <span className="font-blue-bold">{this.state.offer.offer_detail ? this.state.offer.offer_detail.purchase_property_as : ""}</span></h4>
                          <p className="font-blue-bold px-3">{this.state.offer.offer_detail ? this.state.offer.offer_detail.business_document_text : ""}</p>
                          {
                            this.state.offer.offer_detail ?
                              this.state.offer.offer_detail.business_documents.map((val, index)=> {
                                return (
                                  <a href={val} rel="noopener noreferrer" className= "mx-2 pdf_type" key={index}>
                                    <FontAwesomeIcon icon={faFilePdf} color="red" size="lg"/> &nbsp;
                                    <span> Download </span>
                                  </a>
                                );
                              })
                            :
                              null
                            }


                        </div>
                        <div className="register_bid_title mb-2 col-md-8">
                          <h4>D. Proof of funds and/or Preapproval Letter:
                          {
                            this.state.offer.buy_option ?
                              this.state.offer.buy_option.map((val, index)=> {
                                return (
                                  <span className="font-blue-bold" key={index}>{index+1} {val}. &nbsp;</span>
                                );
                              })
                            :
                              null
                            }
                          </h4>
                          <a href={this.state.offer.fund_proof} rel="noopener noreferrer" className= "mx-2 pdf_type" >
                            <FontAwesomeIcon icon={faFilePdf} color="red" size="lg"/> &nbsp;
                            <span> Download </span>
                          </a>
                        </div>
                        <div className="col-md-12 mt-4 text-center">
                          <button className="btn red-btn" type="button" onClick={this.showProperty}>Close</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
              :
              // <h4>Sorry this offer Doesn't contain  bidder information</h4>
              <>
                <div className="col-md-12 py-3">
                  <div className="bg_white">
                    <div className="register_bid_description py-3 px-5">
                      <h3 className="mb-1">Total Amount { this.humanizeOfferType(this.state.offer_type)}: {window.format_currency(this.state.offer.amount)}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 py-3">
                  <div className="bg_white">
                    <div className="register_bid_form py-3 px-5">
                      <h4>Sorry this offer Doesn't contain  bidder information</h4>
                    </div>
                  </div>
                </div>
              </>
              }
            </div>
          </div>
        </div>
      );
    }
    else {
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
