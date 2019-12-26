import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCar, faMinus, faPlus, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';

export default class PropertyShow extends Component {
  _isMounted = false
  constructor(props){
    super(props);
    this.state = {
      open_buy_now_modal: false,
      timer_complete: false,
      open_rehab_modal: false,
      property: {},
      isLoaded: false,
      message: "",
      currentImage: 0,
      bidding_options: {
        highest_bid: 0,
        current_offer: 0,
        buy_now_price: "",
        best_offer_price: "",
        best_offer_buy_price: "",
      }
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  getProperty = () => {
    // console.log(this.props.match.params.id); //  params.id == this.props.match.params.id
    const { match: { params } } = this.props;
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/ " + params.id
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
            property: result.property,
            bidding_options: {
              ...this.state.bidding_options,
              highest_bid: result.property.highest_bid,
              current_offer: result.property.highest_bid,
              buy_now_price: result.property.buy_now_price,
              best_offer_price: result.property.best_offer_sellers_minimum_price,
              best_offer_buy_price: result.property.best_offer_sellers_reserve_price,
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
    });
  }
  calculateApproveTime = (time) => {
    if (time){
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
            document.getElementById("days-timer-item").innerHTML = "--"
            document.getElementById("hours-timer-item").innerHTML = "--"
            document.getElementById("minutes-timer-item").innerHTML = "--"
            document.getElementById("seconds-timer-item").innerHTML = "--"
            clearInterval(this.timer_interval);
            this.setState({
              timer_complete: true ,
            });
          }else {
            document.getElementById("days-timer-item").innerHTML = days
            document.getElementById("hours-timer-item").innerHTML = hours
            document.getElementById("minutes-timer-item").innerHTML = minutes
            document.getElementById("seconds-timer-item").innerHTML = seconds
          }
        }else {
          clearInterval(this.timer_interval);
          // document.getElementById("days-timer-item").innerHTML = "--"
          // document.getElementById("hours-timer-item").innerHTML = "--"
          // document.getElementById("minutes-timer-item").innerHTML = "--"
          // document.getElementById("seconds-timer-item").innerHTML = "--"
        }
      }, 1000)
    }else {
    }
  }

  renderTimerBlock = () => {
    let block;
    if (this.state.property.status === "Draft" || this.state.property.status === "Under Review"){
      block = <div className="time_status font-red"> <h4>Under Review</h4></div>
    }
    else if (this.state.property.status === "Approve / Best Offer") {
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
      block = <div className="time_status font-red"> <h4>Pending Status</h4></div>
    }
    return block
  }

  buyNowHandler = () => {
    this.setState({
      open_buy_now_modal: true,
    });
  }

  closeBuyNowModal = () => {
    this.setState({
      open_buy_now_modal: false,
    });
  }

  updateCurrentOffer = (event) => {
    const{ value } = event.target;
    let price = parseFloat(value ? value : 0)
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

  renderBiddingBlock = () => {
    let block;
    if (this.state.property.status === "Draft" || this.state.property.status === "Under Review"){
      block =
      <div className="property_rate text-center">
        <h4>$ {this.state.property.seller_price}</h4>
        <p className="mb-0">Current Highest Bid.</p>
        <div className="input-group my-2 col-md-8 offset-md-2">
          <div className="input-group-prepend">
            <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
          </div>
          <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChange={this.updateCurrentOffer}/>
          <div className="input-group-append">
            <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
          </div>
        </div>
        <Link to="#" className="blue-btn btn-biding">Place Bid</Link>
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
        <h4 className="rate-head">$ {this.state.property.buy_now_price}</h4>
      </div>
    }
    else if (this.state.property.status === "Approve / Best Offer") {
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
            <h4>$ {this.state.property.seller_price}</h4>
            <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}>
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
                <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
              </div>
              <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChange={this.updateCurrentOffer}/>
              <div className="input-group-append">
                <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
              </div>
            </div>
            <Link to="#" className="blue-btn btn-biding">Best Offer</Link>
          </div>
        }
        else if (now < best_offer_ending_date){
          block = <div className="property_rate text-center">
            <h4>$ {this.state.property.seller_price}</h4>
            <Link to="#" className="blue-btn btn-biding my-2" onClick={this.buyNowHandler}>
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
                <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
              </div>
              <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChange={this.updateCurrentOffer}/>
              <div className="input-group-append">
                <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
              </div>
            </div>
            <Link to="#" className="blue-btn btn-biding">Best Offer</Link>
          </div>
        }
      }
      else if (now < bidding_starting_date){
        block = <div className="property_rate text-center">
          <h4>$ {this.state.property.seller_price}</h4>
          <p className="mb-0">Current Highest Bid.</p>
          <div className="input-group my-2 col-md-8 offset-md-2">
            <div className="input-group-prepend">
              <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
            </div>
            <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChange={this.updateCurrentOffer}/>
            <div className="input-group-append">
              <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
          </div>
          <Link to="#" className="blue-btn btn-biding">Place Bid</Link>
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
          <h4 className="rate-head">$ {this.state.property.buy_now_price}</h4>
        </div>
      }
      else if (now < bidding_ending_date){
        block = <div className="property_rate text-center">
          <h4>$ {this.state.property.seller_price}</h4>
          <p className="mb-0">Current Highest Bid.</p>
          <div className="input-group my-2 col-md-8 offset-md-2">
            <div className="input-group-prepend">
              <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
            </div>
            <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChange={this.updateCurrentOffer}/>
            <div className="input-group-append">
              <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
          </div>
          <Link to="#" className="blue-btn btn-biding">Place Bid</Link>
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
          <h4 className="rate-head">$ {this.state.property.buy_now_price}</h4>
        </div>
      }
      else {
        block = <div className="property_rate text-center">
          <h4>$ {this.state.property.seller_price}</h4>
          <p className="mb-0">Current Highest Bid.</p>
          <div className="input-group my-2 col-md-8 offset-md-2">
            <div className="input-group-prepend">
              <button className="input-group-text group-box btn" onClick={this.decrementCurrentOffer}><FontAwesomeIcon icon={faMinus}/></button>
            </div>
            <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.bidding_options.current_offer} name="current_offer" onChange={this.updateCurrentOffer}/>
            <div className="input-group-append">
              <button className="input-group-text group-box btn" onClick={this.incrementCurrentOffer}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
          </div>
          <Link to="#" className="blue-btn btn-biding">Place Bid</Link>
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
          <h4 className="rate-head">$ {this.state.property.buy_now_price}</h4>
        </div>
      }
    }
    else {
      // block =
    }
    return block

  }

  render(){
    if (this.state.isLoaded === true){
      const images = this.state.property.images.map((image, index) => {
        if (index === 0){
          return (
            <div className="mySlides" style={{display: "block"}} key={index}>
              <img src={image} style={{width:"100%", height: "500px"}} alt={index}/>
            </div>
          )
        }else{
          return (
            <div className="mySlides" style={{width:"100%", height: "500px"}} key={index}>
              <img src={image} style={{width:"100%", height: "500px"}} alt={index}/>
            </div>
          )
        }
      })
      const prev_images = this.state.property.images.map((image, index) => {
        return (
          <div className="column_gallery" key={index}>
            <img className={index === 0 ? "demo cursor active" : "demo cursor"} src={image} style={{width:"100%", height: "80px"}} onClick={() => {this.showCurrentSlide(index);}} alt={index}/>
          </div>
        )
      })
      const buy_options_string = this.state.property.buy_option.length > 0 ? <li>Seller will only accept {this.state.property.buy_option.join(", ")} for fixer upper properties.</li> : null
      const closing_date_string = this.state.property.auction_ending_at ? <li>Seller's Ideal Closing Date: {this.state.property.closing_date}.</li> : null
      const owner_detail_string = this.state.property.owner_category ? <li>The person selling this property is {this.ownerCategoryText(this.state.property.owner_category)}.</li> : null
      const title_string = this.state.property.title_status ? <li>{this.state.property.title_status}</li> : null
      const mls_string = String(this.state.property.mls_available) === "true" ? <li>Property is on MLS.</li> : <li>Property is not on MLS.</li>
      const flooded_string = String(this.state.property.flooded) === "true" ? <li>Seller discloses property has flooded with remarks.</li> : <li>Seller discloses property has not flooded.</li>
      return (
        <div className="container custom_container">
          <div className="row">
            <div className="col-md-8 px-2">
              <div className="wrap_property">
                <div className="property-head">
                  <div className="head_address">
                    <h3 className="font-blue">{this.state.property.address}</h3>
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
                      <img className="demo cursor active" src="/images/homee1.png" style={{width:"100%", height: "80px"}} alt="The Woods"/>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 px-2">
              <div className="wrap_property" id="property-timer-block">
                {this.renderTimerBlock()}
              </div>
              <div className="wrap_property py-4">
                {this.renderBiddingBlock()}
              </div>
              <div className="wrap_property py-3">
                {
                  this.state.property.deal_analysis_type === "Rehab & Flip Deal" ?

                    <div className="estimated_rate">
                      <div className="price-box">
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item">After Repaired Value:</li>
                          <li className="list-inline-item">${this.state.property.after_rehab_value}</li>
                        </ul>
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item">Sellers Asking Price:</li>
                          <li className="list-inline-item">${this.state.property.asking_price}</li>
                        </ul>
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item">Estimated Rehab Cost:</li>
                          <li className="list-inline-item">${this.state.property.estimated_rehab_cost}</li>
                        </ul>
                      </div>
                      <ul className="list-inline my-2">
                        <li className="list-inline-item font-red">Potential Profit:</li>
                        <li className="list-inline-item font-red">${this.state.property.profit_potential}</li>
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
                        <li className="list-inline-item">${this.state.property.landlord_deal.monthly_cash_flow}</li>
                      </ul>
                      <ul className="list-inline mb-2">
                        <li className="list-inline-item">Annual Cash Flow:</li>
                        <li className="list-inline-item">${this.state.property.landlord_deal.annual_cash_flow}</li>
                      </ul>
                      <ul className="list-inline mb-2">
                        <li className="list-inline-item">Total Out of Pocket:</li>
                        <li className="list-inline-item">${this.state.property.landlord_deal.total_out_of_pocket}</li>
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
                        <ul className="list-inline">
                          <li className="list-inline-item"><span>Beds:</span> {this.state.property.residential_attributes.bedrooms}</li>|
                          <li className="list-inline-item"><span>Baths:</span> {this.state.property.residential_attributes.bathrooms}</li>|
                          <li className="list-inline-item"><span>Garage:</span> {this.state.property.residential_attributes.garage}</li>|
                          <li className="list-inline-item"><span>Sqft:</span> {this.state.property.residential_attributes.area}</li>|
                          <li className="list-inline-item"><span>Lot Size:</span> {this.state.property.residential_attributes.lot_size}</li>|
                          <li className="list-inline-item"><span>Built:</span> {this.state.property.residential_attributes.year_built}</li>
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
                        <Link to="#" onClick={this.openRehabCostAttrModal} rel="noopener noreferrer">
                          <div className="pdf-box">
                            <FontAwesomeIcon icon={faFilePdf} color="red"/>
                            <p>Itemized Repairs</p>
                          </div>
                        </Link>
                      </div>
                      {this.state.property.arv_proof === "" ? null : (
                        <div className="pdf_type">
                          <a href={this.state.property.arv_proof} target="_blank" rel="noopener noreferrer">
                            <div className="pdf-box">
                              <FontAwesomeIcon icon={faFilePdf} color="red"/>
                              <p>Arv Proof</p>
                            </div>
                          </a>
                        </div>
                      ) }
                      {this.state.property.rehab_cost_proof === "" ? null : (
                        <div className="pdf_type">
                          <a href={this.state.property.rehab_cost_proof} target="_blank" rel="noopener noreferrer">
                            <div className="pdf-box">
                              <FontAwesomeIcon icon={faFilePdf}/>
                              <p>Rehab Cost proofs</p>
                            </div>
                          </a>
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
                <div className="video-box">
                  {
                    this.state.property.youtube_video_key ?
                      <iframe title="youtube" height="350" src={ this.state.property.youtube_video_key ? `https://www.youtube.com/embed/${this.state.property.youtube_video_key}?controls=0` : "https://www.youtube.com/embed/X080gIJFE3M?controls=0"} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                    :
                    (
                      (this.state.property.lat && this.state.property.long) ?
                        <iframe title="map" height="350" src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBcFpWT7vu4mLXbEPmkr5GJDG5jWBI67x0&location=${this.state.property.lat},${this.state.property.long}&heading=210&pitch=10
                        &fov=35`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                      :
                      <iframe title="youtube" height="350" src={ this.state.property.youtube_video_key ? `https://www.youtube.com/embed/${this.state.property.youtube_video_key}?controls=0` : "https://www.youtube.com/embed/X080gIJFE3M?controls=0"} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                    )
                  }

                </div>
              </div>
            </div>
            <div className="col-md-6 px-2">
              <div className="wrap_property">
                <h5 className="mb-3 main_box_head">Property Location</h5>
                <div className="map-box">
                  <iframe title="map" width="552" height="350" id="gmap_canvas" src={`https://maps.google.com/maps?q= ${this.state.property.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" ></iframe>
                </div>
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
                <h5 className="mb-3 main_box_head">Showing Information</h5>
                <div className="info-box">
                  <img src="/images/openhouse.png" className="img-fluid" alt=""/>
                  <div className="info-content">
                    <p>{this.state.property.show_instructions}</p>
                    <div className="info-icon-box">
                      <Link to="#" className="info_icon">
                        <i className="fa fa-question"></i>
                        <h6>Ask a Question</h6>
                      </Link>
                      <Link to="#" className="info_icon">
                        <i className="fa fa-calendar"></i>
                        <h6>Schedule a Visit</h6>
                      </Link>
                      <Link to="#" className="info_icon">
                        <i className="fa fa-comments"></i>
                        <h6>FAQ</h6>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 px-2 mb-3">
              <div className="offer-box">
                <div className="offer-head">
                  <img src="/images/home3.png" alt=""/>
                  <div className="like-icon">
                    <i className="fa fa-heart-o"></i>
                  </div>
                  <div className="time-box">
                    <p>01d:12h:04m:03s</p>
                  </div>
                </div>
                <div className="offer-body">
                  <div className="rate-row">
                    <h5 className="mb-0">$185,000</h5>
                    <p>3 bds | 2ba | 1129 sqft</p>
                  </div>
                  <p className="mb-2">6001 Kiam st, Houston, TX 77007</p>
                  <div className="status-row mb-2">
                    <p className="offer-dot mb-0 mr-2"></p>
                    <p className="mb-0">Live Online Bidding</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 px-2 mb-3">
              <div className="offer-box">
                <div className="offer-head">
                  <img src="/images/home4.png" alt=""/>
                  <div className="like-icon">
                    <i className="fa fa-heart-o"></i>
                  </div>
                  <div className="time-box">
                    <p>01d:12h:04m:03s</p>
                  </div>
                </div>
                <div className="offer-body">
                  <div className="rate-row">
                    <h5 className="mb-0">$185,000</h5>
                    <p>3 bds | 2ba | 1129 sqft</p>
                  </div>
                  <p className="mb-2">6001 Kiam st, Houston, TX 77007</p>
                  <div className="status-row mb-2">
                    <p className="offer-dot mb-0 mr-2"></p>
                    <p className="mb-0">Live Online Bidding</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 px-2 mb-3">
              <div className="offer-box">
                <div className="offer-head">
                  <img src="/images/home5.png" alt=""/>
                  <div className="like-icon">
                    <i className="fa fa-heart-o"></i>
                  </div>
                  <div className="time-box">
                    <p>01d:12h:04m:03s</p>
                  </div>
                </div>
                <div className="offer-body">
                  <div className="rate-row">
                    <h5 className="mb-0">$185,000</h5>
                    <p>3 bds | 2ba | 1129 sqft</p>
                  </div>
                  <p className="mb-2">6001 Kiam st, Houston, TX 77007</p>
                  <div className="status-row mb-2">
                    <p className="offer-dot mb-0 mr-2"></p>
                    <p className="mb-0">Offer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 px-2 mb-3">
              <div className="offer-box">
                <div className="offer-head">
                  <img src="/images/home6.png" alt=""/>
                  <div className="like-icon">
                    <i className="fa fa-heart-o"></i>
                  </div>
                  <div className="time-box">
                    <p>01d:12h:04m:03s</p>
                  </div>
                </div>
                <div className="offer-body">
                  <div className="rate-row">
                    <h5 className="mb-0">$185,000</h5>
                    <p>3 bds | 2ba | 1129 sqft</p>
                  </div>
                  <p className="mb-2">6001 Kiam st, Houston, TX 77007</p>
                  <div className="status-row mb-2">
                    <p className="offer-dot mb-0 mr-2"></p>
                    <p className="mb-0">Offer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal className=" buy_modal" show={this.state.open_buy_now_modal} onHide={this.closeBuyNowModal}>
            <Modal.Header closeButton>
              <div className="col-md-12 text-center">
                <h5 className="mb-0">BUY NOW at ${this.state.bidding_options.buy_now_price} & You Win !!! </h5>
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
                  <div className="accept-terms">
                    <ol className="list-unstyled mb-0">
                      <li>I agree to Buy this property As-is, where is with all faults.</li>
                      <li>I understand That the pictures, video arv proofs and rehab numbers are provided for informational purposes only and I have done my own duedilligence for this property I am bidding on.</li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur.</li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                    </ol>
                  </div>
                </div>
                <div className="col-md-7 px-0">
                  <div className="accept-upload">
                    <p>Upload a current proof of funds and/or preapproval letter from reliable Hard Money lender or Line of Credit</p>
                  </div>
                </div>
                <div className="col-md-5 pr-0">
                  <div className="custom-file accept-file">
                    <input type="file" className="custom-file-input" id="customFile"/>
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center mt-3">
                <span className="error"></span>
                <button type="button" className="btn btn-blue my-2 px-5" data-dismiss="modal" onClick={this.closeBuyNowModal}>Close</button>
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
