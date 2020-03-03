import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CurrencyInput from 'react-currency-input';
import { faBed, faBath, faCar, faMinus, faPlus, faFilePdf, faLock, faQuestion, faCalendarAlt, faComments} from '@fortawesome/free-solid-svg-icons';
import { faHeart} from '@fortawesome/free-regular-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

export default class PropertyShow extends Component {
  _isMounted = false
  _timerArray = []
  constructor(props){
    super(props);
    this.state = {
      show_instructions: false,
      chat_room: "",
      is_admin: false,
      submitted: false,
      changes: [],
      seller_pay_types: [],
      show_instructions_types: [],
      is_premium: "",
      unique_address: this.props.match.params.id,
      favourite: false,
      checkBoxEnabled: false,
      best_offer: false,
      terms_agreed: "",
      fund_proof: "",
      fund_proof_error: "",
      open_bidding_modal: false,
      open_buy_now_modal: false,
      open_best_offer_modal: false,
      timer_complete: false,
      open_rehab_modal: false,
      property: {},
      near_by_properties: [],
      isLoaded: false,
      message: "",
      currentImage: 0,
      buy_option: [],
      property_buy_options: [],
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
  componentWillUnmount() {
    this._isMounted = false;
    for (let i=0; i < this._timerArray.length; i++ ){
      clearInterval(this._timerArray[i]);
    }
  }
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    for (let i=0; i < this._timerArray.length; i++ ){
      clearInterval(this._timerArray[i]);
    }
    if (nextProps.match.params.id !== this.state.unique_address){
      window.scrollTo(0,0)
      this.setState({
        unique_address: nextProps.match.params.id,
        isLoaded: false,
      }, function () {
        this.getProperty();
      });
    }
  }
  getProperty = () => {
    // console.log(this.props.match.params.id); //  params.id == this.props.match.params.id
    // const { match: { params } } = this.props;
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/ " + this.state.unique_address//params.id
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
            favourite: result.favourite,
            property_buy_options: result.buy_options,
            isLoaded: true,
            seller_pay_types: result.seller_pay_types,
            show_instructions_types: result.show_instructions_types,
            changes: result.changes,
            is_premium: result.is_premium,
            property: result.property,
            is_admin: result.is_admin,
            submitted: result.submitted,
            near_by_properties: result.near_properties,
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
            message: "Can not load the authors. Problem with server",
          });
        }
      }
    )
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


  componentDidMount = () => {
    this._isMounted = true;
    this.getProperty();
    window.scrollTo(0,0)
    // this.showCurrentSlide(1);
  }

  plusSlide = () => {
    if((this.state.currentImage+1) < this.state.property.images.length){
      this.showCurrentSlide(this.state.currentImage+1)
    }
  }
  revSlide = () => {
    if(this.state.currentImage > 0){
      this.showCurrentSlide(this.state.currentImage-1)
    }
  }

  showCurrentSlide = (n) => {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    let slideIndex = n;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides[slideIndex]){
      slides[slideIndex].style.display = "block";
    }
    if (dots[slideIndex]){
      dots[slideIndex].className += " active";
    }
    this.setState({
      currentImage: n
    });
  }
  ownerCategoryText = (text) => {
    if (text){
      switch (text) {
        case "Owner":
          return "The Owner"
        case "Wholesaler":
          return "A Wholesaler who has equitable interest in this property"
        case "Realtor":
          return "A Realtor who has a listing agreement that allows me to auction my clients property"
        default:
          return""
      }
    }
  }

  openRehabCostAttrModal = () => {
    this.setState({
      open_rehab_modal: true,
    });
  }

  closeRehabCostAttrModal = () => {
    this.setState({
      open_rehab_modal: false,
      terms_agreed: false,
    });
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
      block = <div className="time_status font-red"> <h4>Under Review</h4></div>
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
            </div>{this.calculateApproveTime(this.state.property.best_offer_auction_started_at)}
            <div className="font-red text-center">Remaining Time Before Best Offer Starts. </div>
          </>
        }
        else if (now < best_offer_ending_date){
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
            </div>{this.calculateApproveTime(this.state.property.best_offer_auction_ending_at)}
            <div className="font-red text-center">Remaining Time Before Best Offer Ends. </div>
          </>
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
            <div className="font-red text-center">Remaining Time Before Auction starts. </div>
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
            <div className="font-red text-center">Remaining Time Before Auction Ends. </div>
          </>
        }
        else {
          block = <div className="time_status font-red"> <h4>Post Auction</h4></div>
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
          <div className="font-red text-center">Remaining Time Before Auction starts. </div>
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
          <div className="font-red text-center">Remaining Time Before Auction Ends. </div>
        </>
      }
      else {
        block = <div className="time_status font-red"> <h4>Post Auction</h4></div>
      }
    }
    else {
      block = <div className="time_status font-red"> <h4>{this.state.property.status}</h4></div>
    }
    return block
  }

  buyNowHandler = () => {
    if (this.state.is_premium){
      this.setState({
        buy_option: [],
        open_buy_now_modal: true,
      });
    }
  }

  buyNowBestOfferHandler = () => {
    if (this.state.is_premium){
      this.setState({
        buy_option: [],
        open_buy_now_modal: true,
        best_offer: true
      });
    }
  }

  bestOfferHandler = () => {
    if (this.state.is_premium){
      this.setState({
        buy_option: [],
        open_best_offer_modal: true ,
      });
    }
  }

  closeBestOfferModal = () => {
    this.setState({
      checkBoxEnabled: false,
      open_best_offer_modal: false,
      terms_agreed: false,
    });
  }

  closeBiddingModal = () => {
    this.setState({
      checkBoxEnabled: false,
      open_bidding_modal: false,
      terms_agreed: false,
    });
  }

  biddingHandler = () => {
    if (this.state.is_premium){
      this.setState({
        buy_option: [],
        open_bidding_modal: true ,
      });
    }
  }

  closeBuyNowModal = () => {
    this.setState({
      checkBoxEnabled: false,
      open_buy_now_modal: false,
      terms_agreed: false,
      best_offer: false,
    });
  }

  updateCurrentOffer = (event, maskedvalue, floatvalue) => {
    // const{ value } = event.target;
    let price = parseFloat(maskedvalue.replace(/[$,.]/g,""))/100
    if (price > this.state.bidding_options.highest_bid){
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          current_offer: price,
        }
      })
    }else {
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          current_offer: this.state.bidding_options.highest_bid,
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
        }
      })
    }else {
      this.setState({
        bidding_options: {
          ...this.state.bidding_options,
          current_best_offer: this.state.bidding_options.best_offer_price,
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
      }
    });
  }
  renderBiddingBlock = () => {
    let block;
    if (this.state.property.status === "Draft" || this.state.property.status === "Under Review"){
      block =
      <div className="property_rate text-center">
        <h4> {window.format_currency(this.state.property.highest_bid)}</h4>
        <p className="mb-0">Current Highest Bid.</p>
        <div className="input-group my-2 col-md-8 offset-md-2">
          <div className="input-group-prepend">
            <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
          </div>
          <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
          <div className="input-group-append">
            <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
          </div>
        </div>
        <Link to="#" className="blue-btn btn-biding">Place Bid</Link>
        {/* <Link to="#" className="blue-btn btn-biding" onClick={this.biddingHandler}>Place Bid</Link> */}
        <h5 className="my-2">OR</h5>
        <p className="mb-0">Can't wait for the Auction to end?</p>
        {/* <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}> */}
        <Link to="#" className="blue-btn btn-biding my-2">
          <div className="tooltip">Buy Now
            <span className="tooltiptext">
              <h6>Buy Now!</h6>
              <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
            </span>
          </div>
        </Link>
        <h4 className="rate-head"> {window.format_currency(this.state.property.buy_now_price)}</h4>
      </div>
    }
    else if ((this.state.property.status === "Approve") || (this.state.property.status === "Best Offer") || this.state.property.status === "Live Online Bidding") {
      // const starting_date = new Date(this.state.property.auction_started_at).getTime()
      // const ending_date = new Date(this.state.property.auction_ending_at).getTime()
      const bidding_starting_date = new Date(this.state.property.auction_bidding_started_at).getTime()
      const bidding_ending_date = new Date(this.state.property.auction_bidding_ending_at).getTime()
      const now = new Date().getTime()
      if (this.state.property.best_offer_time_pending){
        const best_offer_starting_date = new Date(this.state.property.best_offer_auction_started_at).getTime()
        const best_offer_ending_date = new Date(this.state.property.best_offer_auction_ending_at).getTime()
        if (now < best_offer_starting_date){
          block = <div className="property_rate text-center">
            <h4> {window.format_currency(this.state.property.best_offer_sellers_reserve_price)}</h4>
            <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowBestOfferHandler}>
              <div className="tooltip">Buy Now
                <span className="tooltiptext">
                  <h6>Buy Now!</h6>
                  <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
                </span>
              </div>
            </Link>
            <h5 className="my-2">OR</h5>
            <h6 className="mb-0">Whats Your </h6>
            <div className="input-group my-2 col-md-8 offset-md-2">
              <div className="input-group-prepend">
                <button className="input-group-text group-box btn" onClick={this.decrementCurrentBestOffer}><FontAwesomeIcon icon={faMinus}/></button>
              </div>
              <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_best_offer} name="current_offer" onChangeEvent={this.updateCurrentBestOffer}/>
              <div className="input-group-append">
                <button className="input-group-text group-box btn" onClick={this.incrementCurrentBestOffer}><FontAwesomeIcon icon={faPlus}/></button>
              </div>
            </div>
            {/* <Link to="#" className="blue-btn btn-biding" onClick={this.bestOfferHandler}>Best Offer</Link> */}
            <Link to="#" className="blue-btn btn-biding">Best Offer</Link>
          </div>
        }
        else if (now < best_offer_ending_date){
          block = <div className="property_rate text-center">
            <h4>{window.format_currency(this.state.property.best_offer_sellers_reserve_price)}</h4>
            <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowBestOfferHandler}>
              <div className="tooltip">Buy Now
                <span className="tooltiptext">
                  <h6>Buy Now!</h6>
                  <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
                </span>
              </div>
            </Link>
            <h5 className="my-2">OR</h5>
            <h6 className="mb-0">Whats Your </h6>
            <div className="input-group my-2 col-md-8 offset-md-2">
              <div className="input-group-prepend">
                <button className="input-group-text group-box btn" onClick={this.decrementCurrentBestOffer}><FontAwesomeIcon icon={faMinus}/></button>
              </div>
              <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_best_offer} name="current_offer" onChangeEvent={this.updateCurrentBestOffer}/>
              <div className="input-group-append">
                <button className="input-group-text group-box btn" onClick={this.incrementCurrentBestOffer}><FontAwesomeIcon icon={faPlus}/></button>
              </div>
            </div>
            <Link to="#" className="blue-btn btn-biding" onClick={this.bestOfferHandler}>Best Offer</Link>
          </div>
        }
        else if (now < bidding_starting_date){
          block = <div className="property_rate text-center">
            <h4>{window.format_currency(this.state.property.highest_bid)}</h4>
            <p className="mb-0">Current Highest Bid.</p>
            <div className="input-group my-2 col-md-8 offset-md-2">
              <div className="input-group-prepend">
                <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
              </div>
              <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
              <div className="input-group-append">
                <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
              </div>
            </div>
            {/* <Link to="#" className="blue-btn btn-biding" onClick={this.biddingHandler}>Place Bid</Link> */}
            <Link to="#" className="blue-btn btn-biding" >Place Bid</Link>
            <h5 className="my-2">OR</h5>
            <p className="mb-0">Can't wait for the Auction to end?</p>
            <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}>
              <div className="tooltip">Buy Now
                <span className="tooltiptext">
                  <h6>Buy Now!</h6>
                  <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
                </span>
              </div>
            </Link>
            <h4 className="rate-head">{window.format_currency(this.state.property.buy_now_price)}</h4>
          </div>
        }
        else if (now < bidding_ending_date){
          block = <div className="property_rate text-center">
            <h4>{window.format_currency(this.state.property.highest_bid)}</h4>
            <p className="mb-0">Current Highest Bid.</p>
            <div className="input-group my-2 col-md-8 offset-md-2">
              <div className="input-group-prepend">
                <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
              </div>
              <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
              <div className="input-group-append">
                <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
              </div>
            </div>
            <Link to="#" className="blue-btn btn-biding" onClick={this.biddingHandler}>Place Bid</Link>
            <h5 className="my-2">OR</h5>
            <p className="mb-0">Can't wait for the Auction to end?</p>
            <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}>
              <div className="tooltip">Buy Now
                <span className="tooltiptext">
                  <h6>Buy Now!</h6>
                  <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
                </span>
              </div>
            </Link>
            <h4 className="rate-head"> {window.format_currency(this.state.property.buy_now_price)}</h4>
          </div>
        }
        else {
          block = <div className="property_rate text-center">
            <h4>{window.format_currency(this.state.property.highest_bid)}</h4>
            <p className="mb-0">Current Highest Bid.</p>
            <div className="input-group my-2 col-md-8 offset-md-2">
              <div className="input-group-prepend">
                <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
              </div>
              <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
              <div className="input-group-append">
                <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
              </div>
            </div>
            {/* <Link to="#" className="blue-btn btn-biding" onClick={this.biddingHandler}>Place Bid</Link> */}
            <Link to="#" className="blue-btn btn-biding" >Place Bid</Link>
            <h5 className="my-2">OR</h5>
            <p className="mb-0">Can't wait for the Auction to end?</p>
            {/* <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}> */}
            <Link to="#" className="blue-btn btn-biding my-2">
              <div className="tooltip">Buy Now
                <span className="tooltiptext">
                  <h6>Buy Now!</h6>
                  <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
                </span>
              </div>
            </Link>
            <h4 className="rate-head"> {window.format_currency(this.state.property.buy_now_price)}</h4>
          </div>
        }
      }
      else if (now < bidding_starting_date){
        block = <div className="property_rate text-center">
          <h4> {window.format_currency(this.state.property.highest_bid)}</h4>
          <p className="mb-0">Current Highest Bid.</p>
          <div className="input-group my-2 col-md-8 offset-md-2">
            <div className="input-group-prepend">
              <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
            </div>
            <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
            <div className="input-group-append">
              <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
          </div>
          <Link to="#" className="blue-btn btn-biding" onClick={this.biddingHandler}>Place Bid</Link>
          <h5 className="my-2">OR</h5>
          <p className="mb-0">Can't wait for the Auction to end?</p>
          <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}>
            <div className="tooltip">Buy Now
              <span className="tooltiptext">
                <h6>Buy Now!</h6>
                <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
              </span>
            </div>
          </Link>
          <h4 className="rate-head">{window.format_currency(this.state.property.buy_now_price)}</h4>
        </div>
      }
      else if (now < bidding_ending_date){
        block = <div className="property_rate text-center">
          <h4> {window.format_currency(this.state.property.highest_bid)}</h4>
          <p className="mb-0">Current Highest Bid.</p>
          <div className="input-group my-2 col-md-8 offset-md-2">
            <div className="input-group-prepend">
              <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
            </div>
            <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
            <div className="input-group-append">
              <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
          </div>
          <Link to="#" className="blue-btn btn-biding" onClick={this.biddingHandler}>Place Bid</Link>
          <h5 className="my-2">OR</h5>
          <p className="mb-0">Can't wait for the Auction to end?</p>
          <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}>
            <div className="tooltip">Buy Now
              <span className="tooltiptext">
                <h6>Buy Now!</h6>
                <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
              </span>
            </div>
          </Link>
          <h4 className="rate-head"> {window.format_currency(this.state.property.buy_now_price)}</h4>
        </div>
      }
      else {
        block = <div className="property_rate text-center">
          <h4> {window.format_currency(this.state.property.highest_bid)}</h4>
          <p className="mb-0">Current Highest Bid.</p>
          <div className="input-group my-2 col-md-8 offset-md-2">
            <div className="input-group-prepend">
              <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
            </div>
            <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
            <div className="input-group-append">
              <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
          </div>
          {/* <Link to="#" className="blue-btn btn-biding" onClick={this.biddingHandler}>Place Bid</Link> */}
          <Link to="#" className="blue-btn btn-biding" >Place Bid</Link>
          <h5 className="my-2">OR</h5>
          <p className="mb-0">Can't wait for the Auction to end?</p>
          {/* <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}> */}
          <Link to="#" className="blue-btn btn-biding my-2">

            <div className="tooltip">Buy Now
              <span className="tooltiptext">
                <h6>Buy Now!</h6>
                <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
              </span>
            </div>
          </Link>
          <h4 className="rate-head">{window.format_currency(this.state.property.buy_now_price)}</h4>
        </div>
      }
    }
    else {
      block = <div className="property_rate text-center">
        <h4>{window.format_currency(this.state.property.highest_bid)}</h4>
        <p className="mb-0">Current Highest Bid.</p>
        <div className="input-group my-2 col-md-8 offset-md-2">
          <div className="input-group-prepend">
            <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
          </div>
          <CurrencyInput type="text" prefix="$" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChangeEvent={this.updateCurrentOffer}/>
          <div className="input-group-append">
            <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
          </div>
        </div>
        {/* <Link to="#" className="blue-btn btn-biding" onClick={this.biddingHandler}>Place Bid</Link> */}
        <Link to="#" className="blue-btn btn-biding" >Place Bid</Link>
        <h5 className="my-2">OR</h5>
        <p className="mb-0">Can't wait for the Auction to end?</p>
        {/* <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}> */}
        <Link to="#" className="blue-btn btn-biding my-2">

          <div className="tooltip">Buy Now
            <span className="tooltiptext">
              <h6>Buy Now!</h6>
              <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
            </span>
          </div>
        </Link>
        <h4 className="rate-head"> {window.format_currency(this.state.property.buy_now_price)}</h4>
      </div>
    }
    return block

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
  submitBiddingOffer = () => {
    for (let i=0; i < this._timerArray.length; i++ ){
      clearInterval(this._timerArray[i]);
    }
    this.setState({
      isLoaded: false ,
    });
    const fd = new FormData();
    fd.append('property[id]', this.state.property.id)
    fd.append('bid[amount]', this.state.bidding_options.current_offer)
    fd.append('bid[fund_proof]', this.state.fund_proof, this.state.fund_proof.name)
    fd.append('bid[buy_option]', JSON.stringify(this.state.buy_option))
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

        }
        else if (result.status === 400 || result.status === 404) {
          this.setState({
            message: result.message,
            variant: "danger",
            terms_agreed: false,
            open_bidding_modal: false,
            isLoaded: true,
          });
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
  updateFavourite = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/watch_properties"
    fetch(url, {
      method: "PUT",
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
      },
      body: JSON.stringify({property_id: this.state.property.id})
    }).then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 201){
          this.setState({
            loaded: true,
            favourite: true,
          });
        }else if (result.status === 202) {
          this.setState({
            loaded: true,
            favourite: false,
          });
        }else {
          this.setState({
            loaded: true,
            variant: "danger",
            message: result.message
          });
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);
        }
      }
    })
  }
  submitBestOffer = () => {
    this.setState({
      isLoaded: false ,
    });
    const fd = new FormData();
    fd.append('property[id]', this.state.property.id)
    fd.append('best_offer[amount]', this.state.bidding_options.current_best_offer)
    fd.append('best_offer[fund_proof]', this.state.fund_proof, this.state.fund_proof.name)
    fd.append('best_offer[buy_option]', JSON.stringify(this.state.buy_option))
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
  submitBiddingHandler = () => {
    let formIsValid = this.biddingFormValidation()
    if (formIsValid){
      this.submitBiddingOffer()
    }
  }
  submitBestOfferHandler = () => {
    let formIsValid = this.biddingFormValidation()
    if (formIsValid){
      this.submitBestOffer()
    }
  }
  submitBuyNowHandler = () => {
    let formIsValid = this.biddingFormValidation()
    if (formIsValid){
      this.submitBuyNowOffer()
    }
  }
  submitBuyNowOffer = () => {
    this.setState({
      isLoaded: false ,
    });
    const fd = new FormData();
    fd.append('property[id]', this.state.property.id)
    fd.append("best_offer", this.state.best_offer )
    fd.append('buy_now[amount]', this.state.best_offer === true ? this.state.bidding_options.best_offer_buy_now_price : this.state.bidding_options.buy_now_price)
    fd.append('buy_now[fund_proof]', this.state.fund_proof, this.state.fund_proof.name)
    fd.append('buy_now[buy_option]', JSON.stringify(this.state.buy_option))
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

  biddingFormValidation = () => {
    let fund_proof_error = "";
    if (this.state.fund_proof === "" || this.state.fund_proof === null){
      fund_proof_error = "error"
    }
    this.setState({
      fund_proof_error,
    });
    if (fund_proof_error !== ""){
      return false
    }
    else {
      return true
    }
  }
  addErrorClass = (msg) => {
    if (msg === ""){
      return ""
    }else {
      return "error-class"
    }
  }
  updateTermsAgreed = (event) => {
    const{ name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  }

  openShowInstructionModal = () => {
    this.setState({
    show_instructions: true ,
    });
  }
  enableCheckBox = (event) => {
    let name = event.target.id
    if (document.getElementById(name)){
      if (document.getElementById(name).scrollHeight <= document.getElementById(name).scrollTop + document.getElementById(name).clientHeight + 25)
      {
        this.setState({
          checkBoxEnabled: true,
        });
      }
    }
  }
  calculateBiddingTime = (time, id) => {
    if (time){
      this.timer_interval = setInterval( () => {
        if (time){
          let now = new Date().getTime();
          let end = new Date(time).getTime();
          let t = (end/1000) - (now/1000);
          // let hours = Math.floor(t/(60*60));
          // let minutes = Math.floor((t%(60*60))/60);
          // let seconds = Math.floor((t%(60)))
          let days = Math.floor(t/(60*60*24))
          let hours = Math.floor((t%(60*60*24))/(60*60));
          let minutes = Math.floor((t%(60*60))/60);
          let seconds = Math.floor((t%(60)))

          if (document.getElementById("timer"+id)){
            if (t<0){
              document.getElementById("timer"+id).innerHTML = "--:--:--"
            }else {
              document.getElementById("timer"+id).innerHTML = `0${String(days)}d:${String(hours).padStart(2, '0')}h:${String(minutes).padStart(2, '0')}m:${String(seconds).padStart(2, '0')}s`
            }
          }
        }else {
          if (document.getElementById("timer"+id)){
            document.getElementById("timer"+id).innerHTML = "--:--:--"
          }
        }
      }, 1000)
      this._timerArray.push(this.timer_interval)
    }else {
      if (document.getElementById("timer"+id)){
        document.getElementById("timer"+id).innerHTML = "--:--:--"
      }
    }
  }
  closeShowInstructionModal = () => {
    this.setState({
      show_instructions: false,
    });
  }
  humanizeAttr = ( attr) =>{
    if (attr === "address"){
      return "Address"
    }
    else if (attr === "city") {
      return "City"
    }
    else if (attr === "state") {
      return "State"
    }
    else if (attr === "zip_code") {
      return "Zip Code"
    }
    else if (attr === "category") {
      return "Category"
    }
    else if (attr === "p_type") {
      return "Property Type"
    }
    else if (attr === "headliner") {
      return "Property Headline"
    }
    else if (attr === "mls_available") {
      return "MLS availablity"
    }
    else if (attr === "flooded") {
      return "Flood status"
    }
    else if (attr === "flood_count") {
      return "Flood Details"
    }
    else if (attr === "estimated_rehab_cost") {
      return "Est. rehab cost"
    }
    else if (attr === "description") {
      return "Description"
    }
    else if (attr === "seller_price") {
      return "Seller asking price"
    }
    else if (attr === "after_rehab_value") {
      return "After Rehab value"
    }
    else if (attr === "buy_now_price") {
      return "Buy Now Price"
    }
    else if (attr === "auction_length") {
      return "Auction Length"
    }
    else if (attr === "seller_pay_type_id") {
      return "Seller Pay type"
    }
    else if (attr === "show_instructions_type_id") {
      return "Show Type"
    }
    else if (attr === "youtube_url") {
      return "Youtube Link"
    }
    else if (attr === "title_status") {
      return "Title"
    }
    else if (attr === "asking_price") {
      return "Asking Price"
    }
    else if (attr === "profit_potential") {
      return "Profit Potential"
    }
    else if (attr === "arv_analysis") {
      return "ARV Analysis"
    }
    else if (attr === "description_of_repairs") {
      return "Repairs Description"
    }
    else if (attr === "deal_analysis_type") {
      return "Deal Type"
    }
    else if (attr === "buy_option") {
      return "Buy Options"
    }
    else if (attr === "additional_information") {
      return "Additional Information"
    }
    else if (attr === "best_offer") {
      return "Best Offer"
    }
    else if (attr === "best_offer_length") {
      return "Best Offer days"
    }
    else if (attr === "best_offer_sellers_minimum_price") {
      return "Best Offer/Sellers Asking Price "
    }
    else if (attr === "best_offer_sellers_reserve_price") {
      return "Best Offer/Sellers Buy Now Price"
    }
    else if (attr === "show_instructions_text") {
      return "Show Instructions"
    }
    else if (attr === "open_house_dates") {
      return "Open houses dates"
    }
    else if (attr === "vimeo_url") {
      return "Vimeo Url"
    }
    else if (attr === "dropbox_url") {
      return "Drop Box url"
    }
    else if (attr === "owner_category") {
      return "Owner "
    }
    else if (attr === "rental_description") {
      return "Rental Description"
    }
    else if (attr === "bedrooms") {
      return "Bedrooms"
    }
    else if (attr === "bathrooms") {
      return "Bathrooms"
    }
    else if (attr === "garage") {
      return "Garage"
    }
    else if (attr === "area") {
      return "Square Footage"
    }
    else if (attr === "lot_size") {
      return "Lot"
    }
    else if (attr === "year_built") {
      return "Year Built"
    }
    else if (attr === "units") {
      return "Units"
    }
    else if (attr === "stories") {
      return "Stories"
    }
    else if (attr === "cap_rate") {
      return "Cap Rate"
    }
    else if (attr === "price_per_sq_ft") {
      return "Price Per SqFt"
    }
    else if (attr === "residential_attributes") {
      return "Residential "
    }
    else if (attr === "commercial_attributes") {
      return "Commercial"
    }
    else if (attr === "land_attributes") {
      return "Land"
    }
  }
  renderNestedChanges = (changes, attr) => {
    if (attr === "estimated_rehab_cost_attr" || attr === "commercial_attributes" || attr === "residential_attributes" || attr === "land_attributes"){
      return <Accordion >
        <div>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            {this.humanizeAttr(attr)}
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="0">
          <div>
            {
              Object.keys(changes[0]).map((attr, index)=>{
                if (JSON.stringify(changes[0][attr]) !==JSON.stringify(changes[1][attr])){
                  return (
                    <React.Fragment key={index}>
                      <p>{this.humanizeAttr(attr)} from {JSON.stringify(changes[0][attr])} -> {JSON.stringify(changes[1][attr])}</p>
                    </React.Fragment>
                  )
                }
                else {
                    return null;
                }
              })
            }
          </div>
        </Accordion.Collapse>
      </Accordion>

    }
  }
  sellerPayDetail = (id) => {
    for (let index = 0; index < this.state.show_instructions_types.length; index++) {
      if (id === String(this.state.show_instructions_types[index].id)){
        return this.state.show_instructions_types[index].description
      }
    }
  }
  showInstructionType = (id) => {
    for (let index = 0; index < this.state.show_instructions_types.length; index++) {
      if (id === String(this.state.show_instructions_types[index].id)){
        return this.state.show_instructions_types[index].description
      }
    }
  }


  render(){
    if (this.state.isLoaded === true){
      const open_house_dates = this.state.property.open_house_dates.map((open_date, index)=>{
        if (open_date.date && open_date.opens && open_date.closes){
          return(
            <p key={index} className="text-center">
              {window.formatDate(open_date.date) +" | "+ window.formatTime(open_date.opens) +" to "+ window.formatTime(open_date.closes)}
            </p>
          )
        }
        else {
          return(
            null
          )
        }
      })
      const near_properties = this.state.near_by_properties.map((property, index)=>{
        return (
          <div key={index} className="col-md-3 px-2 mb-3">
            <div className="offer-box">
              <div className="offer-head">
                <img src={property.thumbnail_img ? property.thumbnail_img : "/images/home3.png"} alt=""/>
                <div className="like-icon">
                  <i className="fa fa-heart-o"></i>
                </div>
                <div className="time-box">
                  <p id={"timer"+property.id}>00d:00h:00m:00s {(property.status === "Live Online Bidding") ? this.calculateBiddingTime(property.auction_bidding_ending_at, property.id) : this.calculateBiddingTime(property.best_offer_auction_ending_at, property.id)} </p>
                </div>
              </div>
              <div className="offer-body">
                <div className="rate-row">
                  <Link to={"/property/"+property.unique_address}>
                    <h5 className="mb-0">{window.format_currency(property.highest_bid)}</h5>
                  </Link>
                  {property.category === "Residential" ?
                    <p>{property.residential_attributes.bedrooms} bds | {property.residential_attributes.bathrooms}ba | {property.residential_attributes.area} sqft </p>
                  :
                    null
                  }
                  {property.category === "Commercial" ?
                    <p>{property.commercial_attributes.units} unts | {property.commercial_attributes.lot_size} sqft </p>
                  :
                    null
                  }
                  {property.category === "Land" ?
                    <p>{property.land_attributes.lot_size} sqft </p>
                  :
                    null
                  }
                </div>
                <p className="mb-2">{property.headliner}</p>
                <div className="status-row mb-2">
                  <p className="offer-dot mb-0 mr-2"></p>
                  <p className="mb-0">{property.status}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })
      const images = this.state.property.images.map((image, index) => {
        if (index === 0){
          return (
            <div className="mySlides" style={{display: "block"}} key={index}>
              <div className="mySlides-image">
                <img src={image} alt={index}/>
              </div>
            </div>
          )
        }else{
          return (
            <div className="mySlides" style={{width:"100%", height: "500px"}} key={index}>
              <div className="mySlides-image">
                <img src={image} alt={index}/>
              </div>
            </div>
          )
        }
      })
      const prev_images = this.state.property.images.map((image, index) => {
        return (
          <div className="column_gallery" key={index}>
            <img className={index === 0 ? "demo_img cursor active" : "demo_img cursor"} src={image} style={{width:"100%", height: "80px"}} onClick={() => {this.showCurrentSlide(index);}} alt={index}/>
          </div>
        )
      })
      const buy_options_string = this.state.property.buy_option.length > 0 ? <li>Seller will only accept {this.state.property.buy_option.join(", ")} for fixer upper properties.</li> : null
      const closing_date_string = this.state.property.auction_ending_at ? <li>Seller's Ideal Closing Date: {this.state.property.closing_date}.</li> : null
      const owner_detail_string = this.state.property.owner_category ? <li>The person selling this property is {this.ownerCategoryText(this.state.property.owner_category)}.</li> : null
      const title_string = this.state.property.title_status ? <li>{this.state.property.title_status}</li> : null
      const mls_string = String(this.state.property.mls_available) === "true" ? <li>Property is on MLS.</li> : <li>Property is not on MLS.</li>
      const flooded_string = String(this.state.property.flooded) === "true" ? <li>Seller discloses property has flooded with remarks.</li> : <li>Seller discloses property has not flooded.</li>
      const buy_option_check_boxes = this.state.property_buy_options.map((option, index)=>{
        return (
          <div className="form-check" key={index}>
            <input type="checkbox" className="form-check-input" name={option} onChange={this.handleBuyOption} id={option}/>
            <label className="form-check-label" htmlFor={option}>{option}</label>
          </div>
        )
      })
      return (
        <div className="container custom_container">
          {
            this.state.chat_room ?
              (
                ((Object.entries(this.state.chat_room).length > 0) && (this.state.chat_room.constructor === Object)) ?
                  <Redirect to={{
                    pathname: "/user/chat",
                    state: { chat_room: this.state.chat_room }
                  }}/>
                :
                null
              )
            :
              null
          }
          <div className="row">
            <div className="col-md-12">
              {
                this.state.message ? <Alert className="mt-2 mb-0" variant={this.state.variant}>{this.state.message}</Alert> : null
              }
            </div>
            <div className="col-md-8 px-2">
              <div className="wrap_property">
                <div className="property-head">
                  <div className="head_address">
                    <h3 className="font-blue">
                      {this.state.is_premium ?
                        this.state.property.address
                      :
                      (this.state.is_premium === false ?
                        <span>Only Premium User can view address</span>
                      :
                      <span>
                        <Link to="/sign_up">Register</Link> or <Link to="/login">Login</Link> to view address
                      </span>
                      )
                      }</h3>
                    <h5>Property Type: {this.state.property.p_type}</h5>
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
                <div className="property_gallery">
                  {this.state.property.images.length > 0 ? images : <div className="mySlides" style={{display: "block"}}>
                    <img src="/images/homee1.png" style={{width:"100%", height: "500px"}} alt="temp_image"/>
                  </div>}
                  <Link to="#" className="prev" onClick={this.revSlide} >❮</Link>
                  <Link to="#" className="next" onClick={this.plusSlide} >❯</Link>
                  <div className="row_gallery">
                    {this.state.property.images.length > 0 ? prev_images : <div className="column_gallery">
                      <img className="demo_img cursor active" src="/images/homee1.png" style={{width:"100%", height: "80px"}} alt="The Woods"/>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 px-2">
              <div className="wrap_property" id="property-timer-block">
                {this.renderTimerBlock()}
              </div>
              <div className="wrap_property py-4 lock-region">
                {this.renderBiddingBlock()}
                {
                  this.state.is_premium ?

                    (this.state.favourite === true ?
                      <div className="fav-watch-heart" onClick={this.updateFavourite}>
                        <FontAwesomeIcon icon={faHeart}/>
                      </div>
                    :
                    <div className="watch-heart" onClick={this.updateFavourite}>
                      <FontAwesomeIcon icon={faHeart}/>
                    </div>)
                  :
                  <div className="fav-watch-heart" >
                    <FontAwesomeIcon icon={faLock}/>
                  </div>
                }
              </div>
              <div className="wrap_property py-3">
                {
                  this.state.property.deal_analysis_type === "Rehab & Flip Deal" ?

                    <div className="estimated_rate">
                      <div className="price-box">
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item">After Repaired Value:</li>
                          <li className="list-inline-item">{window.format_currency(this.state.property.after_rehab_value)}</li>
                        </ul>
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item">Sellers Asking Price:</li>
                          <li className="list-inline-item">{window.format_currency(this.state.property.asking_price)}</li>
                        </ul>
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item">Estimated Rehab Cost:</li>
                          <li className="list-inline-item">{window.format_currency(this.state.property.estimated_rehab_cost)}</li>
                        </ul>
                      </div>
                      <ul className="list-inline my-2">
                        <li className="list-inline-item font-red">Potential Profit:</li>
                        <li className="list-inline-item font-red">{window.format_currency(this.state.property.profit_potential)}</li>
                      </ul>
                      <p className="mb-0 mt-5"><span>Note:</span>&nbsp;These are ballpark estimates so please do your own dillgence for ARV and Estimated Rehab Costs.</p>
                    </div> :
                  null
                }
                { this.state.property.deal_analysis_type === "Landlord Deal" ?

                  <div className="estimated_rate">
                    <div className="price-box">
                      <ul className="list-inline mb-2">
                        <li className="list-inline-item">Monthly Cash Flow:</li>
                        <li className="list-inline-item">{window.format_currency(this.state.property.landlord_deal.monthly_cash_flow)}</li>
                      </ul>
                      <ul className="list-inline mb-2">
                        <li className="list-inline-item">Annual Cash Flow:</li>
                        <li className="list-inline-item">{window.format_currency(this.state.property.landlord_deal.annual_cash_flow)}</li>
                      </ul>
                      <ul className="list-inline mb-2">
                        <li className="list-inline-item">Total Out of Pocket:</li>
                        <li className="list-inline-item">{window.format_currency(this.state.property.landlord_deal.total_out_of_pocket)}</li>
                      </ul>
                    </div>
                    <ul className="list-inline my-2">
                      <li className="list-inline-item font-red">ROI Cash on Cash:</li>
                      <li className="list-inline-item font-red">{this.state.property.landlord_deal.roi_cash_percentage} %</li>
                    </ul>
                    <p className="mb-0 mt-5"><span>Note:</span>&nbsp;These are ballpark estimates so please do your own dillgence for ARV and Estimated Rehab Costs.</p>
                  </div> :
                  null
                }
              </div>
            </div>
            <div className="col-md-12 px-2">
              <div className="wrap_property row mx-0">
                <div className="col-md-4 pr-2 pl-0 detail_sec">
                  <div className="detailed_box">
                    <h5 className="mb-3 main_box_head">Property Details</h5>
                    <div className="detailed_content">
                      <p><span>{this.state.property.category} | {this.state.property.p_type}</span></p>
                      <p><span>Title Status: </span> {this.state.property.title_status}</p>
                      {this.state.property.category === "Residential" ?
                        <ul className="list-inline list-inline-box">
                          <li className="list-inline-item"><span>Beds:</span> {this.state.property.residential_attributes.bedrooms}</li>&nbsp;|&nbsp;
                          <li className="list-inline-item"><span>Baths:</span> {this.state.property.residential_attributes.bathrooms}</li>&nbsp;|&nbsp;
                          <li className="list-inline-item"><span>Garage:</span> {this.state.property.residential_attributes.garage}</li>&nbsp;|&nbsp;
                          <li className="list-inline-item"><span>Sqft:</span> {this.state.property.residential_attributes.area}</li>&nbsp;|&nbsp;
                          <li className="list-inline-item"><span>Lot Size:</span> {this.state.property.residential_attributes.lot_size}</li>&nbsp;|&nbsp;
                          <li className="list-inline-item"><span>Built:</span> {this.state.property.residential_attributes.year_built}</li>
                        </ul>
                      : null }
                      {this.state.property.category === "Commercial" ?
                        <ul className="list-inline list-inline-box">
                          <li className="list-inline-item"><span>Units: </span> {this.state.property.commercial_attributes.units}</li>|&nbsp;
                          <li className="list-inline-item"><span>Stories: </span> {this.state.property.commercial_attributes.stories}</li>|&nbsp;
                          <li className="list-inline-item"><span>Cap Rate: </span> {this.state.property.commercial_attributes.cap_rate}</li>|&nbsp;
                          <li className="list-inline-item"><span>Sqft: </span> {this.state.property.commercial_attributes.area}</li>|&nbsp;
                          <li className="list-inline-item"><span>Lot Size: </span> {this.state.property.commercial_attributes.lot_size}</li>|&nbsp;
                          <li className="list-inline-item"><span>Built: </span> {this.state.property.commercial_attributes.year_built}</li>
                        </ul>
                      : null }
                      {this.state.property.category === "Land" ?
                        <ul className="list-inline ">
                          <li className="list-inline-item"><span>Lot Size: </span> {this.state.property.land_attributes.lot_size}</li>|&nbsp;
                          <li className="list-inline-item"><span>Price per SqFt: </span> {this.state.property.land_attributes.price_per_sq_ft}</li>&nbsp;
                        </ul>
                      : null }

                      <p className="mt-2">{this.state.property.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 pl-3 pr-2 detail_sec">
                  <div className="fees_box">
                    <h5 className="mb-3 main_box_head">Property Fees and Transaction Information</h5>
                    <div className="fees-content">
                      <ul>
                        <li>Buyer Won't pay any buyer premium or any fees for this property.</li>
                        <li>Buyer pays for owners title policy, all escrow fees and will be responsible for property taxes & HOA fees from the day of closing until the end of the year. Seller pays for their prorated share of property taxes & HOA dues up to the day of closing/funding</li>
                        <li>Buyer will be responsible to buy survey, HOA documnets and resale certificate if neede.</li>
                        <li>Earnest Money Deposit is $2,000 or 2% of the sales price(whichever is greater).</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 pl-3 pr-0 doc_sec">
                  <div className="doc_box">
                    <h5 className="mb-3 main_box_head">Property Documents</h5>
                    <div className="doc_content">
                      <div className="pdf_type">
                        {
                          this.state.is_premium ?
                            <Link to="#" onClick={this.openRehabCostAttrModal} rel="noopener noreferrer">
                              <div className="pdf-box">
                                <FontAwesomeIcon icon={faFilePdf} color="red"/>
                                <p>Itemized Repairs</p>
                              </div>
                            </Link>
                          :
                          <>
                            <Link to="#" rel="noopener noreferrer">
                              <div className="pdf-box">
                                <FontAwesomeIcon icon={faFilePdf} color="red"/>
                                <p>Itemized Repairs</p>
                              </div>
                            </Link>
                            <div className="fav-watch-heart" >
                              <FontAwesomeIcon icon={faLock}/>
                            </div>
                          </>

                        }
                      </div>
                      {this.state.property.arv_proof === "" ? null : (
                        <div className="pdf_type">
                          {
                            this.state.is_premium ?
                              <a href={this.state.property.arv_proof} target="_blank" rel="noopener noreferrer">
                                <div className="pdf-box">
                                  <FontAwesomeIcon icon={faFilePdf} color="red"/>
                                  <p>Arv Proof</p>
                                </div>
                              </a>
                            :
                            <>
                              <Link to="#" rel="noopener noreferrer">
                                <div className="pdf-box">
                                  <FontAwesomeIcon icon={faFilePdf} color="red"/>
                                  <p>Arv Proof</p>
                                </div>
                              </Link>
                              <div className="fav-watch-heart" >
                                <FontAwesomeIcon icon={faLock}/>
                              </div>
                            </>
                          }
                        </div>
                      ) }
                      {this.state.property.rehab_cost_proof === "" ? null : (
                        <div className="pdf_type">
                          {
                            this.state.is_premium ?
                              <a href={this.state.property.rehab_cost_proof} target="_blank" rel="noopener noreferrer">
                                <div className="pdf-box">
                                  <FontAwesomeIcon icon={faFilePdf}/>
                                  <p>Rehab Cost proofs</p>
                                </div>
                              </a>
                            :
                            <>
                              <Link to="#" rel="noopener noreferrer">
                                <div className="pdf-box">
                                  <FontAwesomeIcon icon={faFilePdf} color="red"/>
                                  <p>Rehab Cost proofs</p>
                                </div>
                              </Link>
                              <div className="fav-watch-heart" >
                                <FontAwesomeIcon icon={faLock}/>
                              </div>
                            </>
                          }
                        </div>
                      )}
                      {this.state.property.rental_proof === "" ? null : (
                        <div className="pdf_type">
                          {
                            this.state.is_premium ?
                              <a href={this.state.property.rental_proof} target="_blank" rel="noopener noreferrer">
                                <div className="pdf-box">
                                  <FontAwesomeIcon icon={faFilePdf}/>
                                  <p>Rental proofs</p>
                                </div>
                              </a>
                            :
                            <>
                              <Link to="#" rel="noopener noreferrer">
                                <div className="pdf-box">
                                  <FontAwesomeIcon icon={faFilePdf} color="red"/>
                                  <p>Rental proofs</p>
                                </div>
                              </Link>
                              <div className="fav-watch-heart" >
                                <FontAwesomeIcon icon={faLock}/>
                              </div>
                            </>
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Modal className="status_modal repairs_modal" show={this.state.open_rehab_modal} onHide={this.closeRehabCostAttrModal}>
                  <Modal.Header closeButton>
                    <div className=" offset-md-1 col-md-10 text-center">
                      <h5 className="mb-0 text-uppercase">Itemized Repairs</h5>
                    </div>
                  </Modal.Header>
                  <div className="modal-body px-0">
                    <div className="row mx-0">
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Roof:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input value={this.state.property.estimated_rehab_cost_attr.roof} type="number" className="form-control" name="roof" readOnly={true} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Foundation:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="foundation" value={this.state.property.estimated_rehab_cost_attr.foundation} className="form-control " readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Siding:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="siding" value={this.state.property.estimated_rehab_cost_attr.siding} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Windows:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="windows" value={this.state.property.estimated_rehab_cost_attr.windows}  className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Landscaping:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="landscaping" value={this.state.property.estimated_rehab_cost_attr.landscaping} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Garage:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name= "garage" value={this.state.property.estimated_rehab_cost_attr.garage} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Exterior Paint:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="exterior_paint" value={this.state.property.estimated_rehab_cost_attr.exterior_paint} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Interior Paint:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="interior_paint" value={this.state.property.estimated_rehab_cost_attr.interior_paint} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>HVAC:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="hvac" value={this.state.property.estimated_rehab_cost_attr.hvac} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Electrical:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="electrical" className="form-control" value={this.state.property.estimated_rehab_cost_attr.electrical} readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Plumbing:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="plumbing" className="form-control" value={this.state.property.estimated_rehab_cost_attr.plumbing} readOnly={true} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Kitchen:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="kitchen" value={this.state.property.estimated_rehab_cost_attr.kitchen}  className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Bathrooms:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="name" name="bathrooms" value={this.state.property.estimated_rehab_cost_attr.bathrooms} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Doors:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="doors" value={this.state.property.estimated_rehab_cost_attr.doors} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Sheetrock:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name= "sheetrock" value={this.state.property.estimated_rehab_cost_attr.sheetrock} className="form-control " readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Trim:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="trim" value={this.state.property.estimated_rehab_cost_attr.trim} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Flooring:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="flooring" value={this.state.property.estimated_rehab_cost_attr.flooring} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Trash Removal:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="trash" value={this.state.property.estimated_rehab_cost_attr.trash} className="form-control " readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Miscellaneous:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="misc" value={this.state.property.estimated_rehab_cost_attr.misc} className="form-control" readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="form-group row">
                          <div className="col-md-5 px-4">
                            <label>Others:</label>
                          </div>
                          <div className="col-md-7 px-4">
                            <input type="number" name="others" className="form-control" value={this.state.property.estimated_rehab_cost_attr.others} readOnly={true}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 modal-banner px-5 py-3 my-2 ml-0">
                        If you don't have itemized costs then enter ballpark of entire rehab.
                      </div>
                      <div className="col-md-12 px-4">
                        <div className="form-group">
                          <label>Estimated Ballpak</label>
                          <input type="number" name="estimated_ballpark" value={this.state.property.estimated_rehab_cost_attr.estimated_ballpark} className="form-control" readOnly={true}/>
                        </div>
                      </div>
                      <div className="col-md-12 px-4">
                        <div className="form-group">
                          <label>Repair Total</label>
                          <input type="number" value={this.state.property.estimated_rehab_cost_attr.repair_total} readOnly={true} name="repair_total" className="form-control" />
                        </div>
                      </div>

                    </div>
                    <div className="col-md-12 text-center mt-3">
                      <span className="error"></span>
                      <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.hideModal}>Close</button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
            <div className="col-md-6 px-2">
              <div className="wrap_property">
                <h5 className="mb-3 main_box_head">Property Video</h5>
                {this.state.is_premium ?
                  <div className="video-box">
                    {
                      this.state.property.video_url ?
                        <video width="552" height="350" controls>
                          <source src= {this.state.property.video_url} />
                        </video>
                      :
                      ((this.state.property.youtube_video_key && this.state.property.youtube_url) ?
                        <iframe title="youtube" height="350" src={ this.state.property.youtube_video_key ? `https://www.youtube.com/embed/${this.state.property.youtube_video_key}?controls=0` : "https://www.youtube.com/embed/X080gIJFE3M?controls=0"} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                      :
                      (
                        (this.state.property.lat && this.state.property.long) ?
                          <iframe title="map" height="350" src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBcFpWT7vu4mLXbEPmkr5GJDG5jWBI67x0&location=${this.state.property.lat},${this.state.property.long}&heading=210&pitch=10
                        &fov=35`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                        :
                        <iframe title="youtube" height="350" src={ this.state.property.youtube_video_key ? `https://www.youtube.com/embed/${this.state.property.youtube_video_key}?controls=0` : "https://www.youtube.com/embed/X080gIJFE3M?controls=0"} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                      ))
                    }
                  </div>
                :
                <>
                  <div className="video-box">
                    <img src={this.state.property.video_thumb ? this.state.property.video_thumb : "/images/homee1.png" }/>
                  </div>
                  <div className="video-login">
                    <p><Link to="/sign_up" className="links-login">Register</Link> or <Link to="/login" className="links-login">Login</Link> to view property video</p>
                    <div className="fav-watch-heart" >
                      <FontAwesomeIcon icon={faLock}/>
                    </div>
                  </div>
                </>
                }
              </div>
            </div>
            <div className="col-md-6 px-2">
              <div className="wrap_property">
                <h5 className="mb-3 main_box_head">Property Location</h5>
                {this.state.is_premium ?
                  <div className="map-box">
                    <iframe title="map" width="552" height="350" id="gmap_canvas" src={`https://maps.google.com/maps?q= ${this.state.property.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" ></iframe>
                  </div>
                :
                <>
                  <div className="map-box">
                    <iframe title="map" width="552" height="350" id="gmap_canvas" src={"https://maps.google.com/maps?q= usa&t=&z=13&ie=UTF8&iwloc=&output=embed"} frameBorder="0" scrolling="no" ></iframe>
                  </div>
                  <div className="video-login">
                    <p><Link to="/sign_up" className="links-login">Register</Link> or <Link to="/login" className="links-login">Login</Link> to view property map</p>
                    <div className="fav-watch-heart" >
                      <FontAwesomeIcon icon={faLock}/>
                    </div>
                  </div>
                </>
                }
              </div>
            </div>
            <div className="col-md-8 mb-3 px-2">
              <div className="wrap_property">
                <h5 className="mb-3 main_box_head">Property Auction Terms and Disclaimers</h5>
                <div className="terms-box">
                  <ul>
                    {buy_options_string}
                    {closing_date_string}
                    {owner_detail_string}
                    {title_string}
                    {flooded_string}
                    {mls_string}
                    <li>Property is being offered "AS IS, WHERE IS with ALL FAULTS".</li>
                    <li>There are no inspection or financing contengencies.</li>
                    <li>Buyer will receive a General or Special Warranty Deed depending on title status.</li>

                    <li>The Buy Now feature will allow users to buy a property NOW instead of waiting for the Best Offer or Auction timer to end.</li>
                    <li>Seller reserves the right to a final review and can accept or reject any offers if they are the Highest & Best Offer or Buy Now Bidder doesn't provide satisfactory verification of their ability to close on the property even if they are the Highest and Best offer at the end of the Auction.</li>
                    <li>All pictures, details or descriptions of any property, condition of title, value or otherwise is provided for informational purposes only and may not represent the true and current status of the property now or at the time of sale.  Buyer acknowledges that Buyer is not relying on any reports, bids, inspections or any statements (oral, written or transmitted electronically), made or provided by Seller or by Sellers affiliates or agents (including Angel Investors, LLC, AuctionMyDeal.com, registered Real Estate Broker or Associates) and is relying solely on Buyers Investigations and inspections of the property in entering into a Real Estate Contract to buy any properties being offered for sale on this site.
                    </li>
                    <li>You must be a premium member or have promo code to be able to get address, bid on any properties, open property documents, view video, view map or schedule an appointment to view property. Become a PREMIUM MEMBER</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 px-2">
              <div className="wrap_property">
                <h5 className="mb-3 main_box_head" onClick={this.openShowInstructionModal}>Showing Information</h5>
                <div className="info-box">
                  <img src="/images/openhouse.png" className="img-fluid" alt=""/>
                  <div className="info-content">
                    <p>{this.state.property.show_instructions}</p>
                    <div className="info-icon-box">
                      <Link to="/how-everything-works/ask-us-question" className="info_icon">
                        {/* <i className="fa fa-question"></i> */}
                        <FontAwesomeIcon icon={faQuestion}/>
                        <h6>Ask a Question</h6>
                      </Link>
                      <Link to="#" className="info_icon" onClick={this.openShowInstructionModal}>
                        {/* <i className="fa fa-calendar"></i> */}
                        <FontAwesomeIcon icon={faCalendarAlt}/>
                        <h6>Schedule a Visit</h6>
                      </Link>
                      <Link to="/frequently-asked-questions" className="info_icon">
                        {/* <i className="fa fa-comments"></i> */}
                        {/* <FontAwesomeIcon icon={faComments}/> */}
                        <img src="/images/faq.png"/>
                        <h6>FAQ</h6>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {near_properties}
          </div>
          <Modal className=" buy_modal" show={this.state.open_buy_now_modal} onHide={this.closeBuyNowModal}>
            <Modal.Header closeButton>
              <div className=" offset-md-1 col-md-10 text-center">
                <h5 className="mb-0">BUY NOW at {this.state.best_offer ?  window.format_currency(this.state.bidding_options.best_offer_buy_now_price) : window.format_currency(this.state.bidding_options.buy_now_price)} & You Win !!! </h5>
              </div>
            </Modal.Header>
            <div className="modal-body">
              <div className="row mx-0">
                <div className="buy-list text-center">
                  <div className="col-md-10 offset-md-1 px-0">
                    <p>Congratulations! If You agree to sellers "Buy Now Price", You don't have to wait for auction to end when you agree to terms below.</p>
                  </div>
                </div>
                <div className="col-md-12 my-3 px-0">
                  <div className="accept-terms" id="buy-terms_agree-block" onScroll={this.enableCheckBox}>
                    <ol className="list-unstyled mb-0">
                      <li>I agree to Buy this property As-is, where is with all faults.</li>
                      <br/>
                      <li>I understand That the pictures, video ARV proofs and rehab numbers are provided for informational purposes only and I have done my own due dilligence for this property I am bidding on.</li>
                      <br/>
                      <li>I agree to deliver $ 3,000 or 2% (whichever is higher) as nonrefundable earnest money to title company on Executed Contract if I am the winning bidder within 48 business hours or my winning bidder status can be cancelled.</li>
                      <br/>
                      <li>I (Buyer) agrees to pay for all standard buyer and seller closing cost including title policy. Seller will pay to remove all liens, taxes and HOA dues owed and prorated up until the day of closing.</li>
                    </ol>
                  </div>
                </div>
                <ul className="pl-3">
                  <li >
                    <div className="row mx-0 align-items-center">
                      <div className="col-md-7 px-0">
                        <div className="accept-upload">
                          <p className="mb-0">Upload a current proof of funds and/or preapproval letter from reliable Hard Money lender or Line of Credit</p>
                        </div>
                      </div>
                      <div className="col-md-5 pr-0">
                        <div className="custom-file accept-file">
                          <input type="file" className="custom-file-input" name="fund_proof" onChange={this.handleFundProofSelector} id="customFile"/>
                          <label className={"custom-file-label " + this.addErrorClass(this.state.fund_proof_error)} htmlFor="customFile">Choose file</label>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row mx-0">
                      <div className="col-md-2 px-0">
                        <div className="accept-upload options_buy">
                          <p>Options to buy:</p>
                        </div>
                      </div>
                      <div className="col-md-10 pr-0">
                        <div className="custom-file accept-file ">
                          {buy_option_check_boxes}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="col-md-12 px-0">
                  <div className="payment-body">
                    <form className="payment-form my-2 col-md-10 offset-md-1">
                      <div className="col-md-8 offset-md-2 text-center">
                        <div className="form-check agree-terms">
                          {
                            this.state.checkBoxEnabled === true ?
                              <input className="form-check-input" name="terms_agreed" type="checkbox" id="buy-now-terms" onChange={this.updateTermsAgreed}/>
                            :
                            <input className="form-check-input" name="terms_agreed" type="checkbox" id="buy-now-terms" disabled/>
                          }

                          <label className="form-check-label" htmlFor="buy-now-terms">
                            I Agree to the website Buy now terms
                          </label>
                        </div>
                      </div>
                      <div className="col-md-12 text-center mt-3">
                        <span className="error"></span>
                        {
                          this.state.terms_agreed === true ?
                            <button type="button" className="btn btn-blue my-2 px-5" data-dismiss="modal" onClick={this.submitBuyNowHandler}>Submit</button>
                          :
                          <button type="button" className=" disabled btn btn-blue my-2 px-5" data-dismiss="modal" >Submit</button>
                        }
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal className=" buy_modal" show={this.state.open_best_offer_modal} onHide={this.closeBestOfferModal}>
            <Modal.Header closeButton>
              <div className=" offset-md-1 col-md-10 text-center">
                <h5 className="mb-0">Your Best Offer for {this.state.property.address}  </h5>
              </div>
            </Modal.Header>
            <div className="modal-body">
              <div className="row mx-0">
                <div className="buy-list text-center">
                  <div className="col-md-10 offset-md-1 px-0">
                    <p>Congratulations! If You are about to offer  {window.format_currency(this.state.bidding_options.current_best_offer)} for this property when you agrees  to the terms below.</p>
                  </div>
                </div>
                <div className="col-md-12 my-3 px-0">
                  <div className="accept-terms" id="best_offer-terms_agree-block" onScroll={this.enableCheckBox}>
                    <ol className="list-unstyled mb-0">
                      <li>I agree to Buy this property As-is, where is with all faults.</li>
                      <br/>
                      <li>I understand That the pictures, video ARV proofs and rehab numbers are provided for informational purposes only and I have done my own due dilligence for this property I am bidding on.</li>
                      <br/>
                      <li>I agree to deliver $ 3,000 or 2% (whichever is higher) as nonrefundable earnest money to title company on Executed Contract if I am the winning bidder within 48 business hours or my winning bidder status can be cancelled.</li>
                      <br/>
                      <li>I (Buyer) agrees to pay for all standard buyer and seller closing cost including title policy. Seller will pay to remove all liens, taxes and HOA dues owed and prorated up until the day of closing.</li>
                    </ol>
                  </div>
                </div>
              </div>
              <ul className="pl-3">
                <li >
                  <div className="row mx-0 align-items-center">
                    <div className="col-md-7 px-0">
                      <div className="accept-upload">
                        <p className="mb-0">Upload a current proof of funds and/or preapproval letter from reliable Hard Money lender or Line of Credit</p>
                      </div>
                    </div>
                    <div className="col-md-5 pr-0">
                      <div className="custom-file accept-file">
                        <input type="file" className="custom-file-input" name="fund_proof" onChange={this.handleFundProofSelector} id="customFile"/>
                        <label className={"custom-file-label " + this.addErrorClass(this.state.fund_proof_error)} htmlFor="customFile">Choose file</label>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mx-0">
                    <div className="col-md-2 px-0">
                      <div className="accept-upload options_buy">
                        <p>Options to buy:</p>
                      </div>
                    </div>
                    <div className="col-md-10 pr-0">
                      <div className="custom-file accept-file ">
                        {buy_option_check_boxes}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="col-md-12 px-0">
                <div className="payment-body">
                  <form className="payment-form my-2 col-md-10 offset-md-1">
                    <div className="col-md-8 offset-md-2 text-center">
                      <div className="form-check agree-terms">
                        {
                          this.state.checkBoxEnabled === true ?
                            <input className="form-check-input" name="terms_agreed" type="checkbox" id="best-offer-terms" onChange={this.updateTermsAgreed}/>
                          :
                          <input className="form-check-input" name="terms_agreed" type="checkbox" id="best-offer-terms" disabled/>
                        }

                        <label className="form-check-label" htmlFor="best-offer-terms">
                          I Agree to the website best offer terms
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 text-center mt-3">
                      <span className="error"></span>
                      {
                        this.state.terms_agreed === true ?
                          <button type="button" className="btn btn-blue my-2 px-5" data-dismiss="modal" onClick={this.submitBestOfferHandler}>Submit</button>
                        :
                        <button type="button" className=" disabled btn btn-blue my-2 px-5" data-dismiss="modal" >Submit</button>
                      }
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>

          <Modal className=" buy_modal" show={this.state.open_bidding_modal} onHide={this.closeBiddingModal}>
            <Modal.Header closeButton>
              <div className=" offset-md-1 col-md-10 text-center">
                <h5 className="mb-0">Highest Bid for {this.state.property.address} </h5>
              </div>
            </Modal.Header>
            <div className="modal-body">
              <div className="row mx-0">
                <div className="buy-list text-center">
                  <div className="col-md-10 offset-md-1 px-0">
                    <p>Congratulations! You are about to be the "Highest Bidder" to buy this property when you agree to terms below.</p>
                  </div>
                </div>
                <div className="col-md-12 my-3 px-0">
                  <div className="accept-terms" id="bidding-terms_agree-block" onScroll={this.enableCheckBox}>
                    <ol className="list-unstyled mb-0">
                      <li>I agree to Buy this property As-is, where is with all faults.</li>
                      <br/>
                      <li>I understand That the pictures, video ARV proofs and rehab numbers are provided for informational purposes only and I have done my own due dilligence for this property I am bidding on.</li>
                      <br/>
                      <li>I agree to deliver $ 3,000 or 2% (whichever is higher) as nonrefundable earnest money to title company on Executed Contract if I am the winning bidder within 48 business hours or my winning bidder status can be cancelled.</li>
                      <br/>
                      <li>I (Buyer) agrees to pay for all standard buyer and seller closing cost including title policy. Seller will pay to remove all liens, taxes and HOA dues owed and prorated up until the day of closing.</li>
                    </ol>
                  </div>
                </div>
              </div>
              <ul className="pl-3">
                <li >
                  <div className="row mx-0 align-items-center">
                    <div className="col-md-7 px-0">
                      <div className="accept-upload">
                        <p className="mb-0">Upload a current proof of funds and/or preapproval letter from reliable Hard Money lender or Line of Credit</p>
                      </div>
                    </div>
                    <div className="col-md-5 pr-0">
                      <div className="custom-file accept-file">
                        <input type="file" className="custom-file-input" name="fund_proof" onChange={this.handleFundProofSelector} id="customFile"/>
                        <label className={"custom-file-label " + this.addErrorClass(this.state.fund_proof_error)} htmlFor="customFile">Choose file</label>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mx-0">
                    <div className="col-md-2 px-0">
                      <div className="accept-upload options_buy">
                        <p>Options to buy:</p>
                      </div>
                    </div>
                    <div className="col-md-10 pr-0">
                      <div className="custom-file accept-file ">
                        {buy_option_check_boxes}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="col-md-12 px-0">
                <div className="payment-body">
                  <form className="payment-form my-2 col-md-10 offset-md-1">
                    <div className="col-md-8 offset-md-2 text-center">
                      <div className="form-check agree-terms">
                        {
                          this.state.checkBoxEnabled === true ?
                            <input className="form-check-input" name="terms_agreed" type="checkbox" id="bidding-terms" onChange={this.updateTermsAgreed}/>
                          :
                          <input className="form-check-input" name="terms_agreed" type="checkbox" id="bidding-terms" disabled/>
                        }

                        <label className="form-check-label" htmlFor="bidding-terms">
                          I Agree to the website bidding terms
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 text-center mt-3">
                      <span className="error"></span>
                      {
                        this.state.terms_agreed === true ?
                          <button type="button" className="btn btn-blue my-2 px-5" data-dismiss="modal" onClick={this.submitBiddingHandler}>Submit</button>
                        :
                        <button type="button" className=" disabled btn btn-blue my-2 px-5" data-dismiss="modal" >Submit</button>
                      }
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
          <Modal className="bid_modal show_info_modal" show={this.state.show_instructions} onHide={this.closeShowInstructionModal}>
            <Modal.Header closeButton>
              <div className="col-md-11">
                <h5 className="mb-0 "> Showing Information</h5>
              </div>
            </Modal.Header>
            <div className="modal-body">
              <div className="row mx-0">
                <div className="col-md-6 px-0">
                  <h5 className="font-darkred text-center">Showing Instructions</h5>
                  <div className="showing_info px-2">
                    <p>
                      {this.state.property.show_instructions_text}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 px-0">
                  <h5 className="font-darkred text-center">Open House Dates</h5>
                  <div className="showing_info border-0 px-2">
                    {open_house_dates}
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center mt-3">
                <span className="error"></span>
                <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.closeShowInstructionModal}>Close</button>
              </div>
            </div>
          </Modal>
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
