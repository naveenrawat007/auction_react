import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CurrencyInput from 'react-currency-input';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { faExclamationCircle, faBed, faBath, faCar, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default class PropertyShowThree extends Component {
  _isMounted = false
  _timerArray = []
  constructor(props){
    super(props);
    this.state = {}
  };

  render(){
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
                      <h3>5610 Woodlark Street</h3>
                      <h4> Houston, TX, A</h4>
                    </div>
                    <div class="head_icon">
                      <a href="#" class="head_icon_box">
                        <FontAwesomeIcon icon={faBed}/>
                        <p>4 Beds</p>
                      </a>
                      <a href="#" class="head_icon_box">
                        <FontAwesomeIcon icon={faBath}/>
                        <p>2 Baths</p>
                      </a>
                      <a href="#" class="">
                        <FontAwesomeIcon icon={faCar}/>
                        <p>1 Car</p>
                      </a>
                    </div>
                  </div>
                  <div className="register_bid_price col-md-3 px-0">
                    <div className="register_timing">
                      <div class="time_status justify-content-end">
                        <ul>
                          <li>05</li>
                          <li>Days</li>
                        </ul>
                        <ul>
                          <li>01</li>
                          <li>Hours</li>
                        </ul>
                        <ul>
                          <li>36</li>
                          <li>Minutes</li>
                        </ul>
                        <ul>
                          <li>36</li>
                          <li>Seconds</li>
                        </ul>
                      </div>
                      <p>Remaining Time Before Auction Ends</p>
                    </div>
                    <div className="register_pricing">
                      <p>Current Highest Offer</p>
                      <h4 className="font-red text-right">$375,000</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 py-3">
              <div className="bg_white">
                <div className="register_bid_form py-3 px-5">
                  <form>
                    <div className="register_bid_title mb-2 col-md-8">
                      <h4>Place Your Bid</h4>
                    </div>
                    <div className="form-group row mx-0 mb-0">
                      <label for="staticEmail" className="col-sm-3 col-form-label text-right">Your amount offer is&nbsp;&nbsp;:</label>
                      <div class="input-group col-md-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text group-box"><FontAwesomeIcon icon={faMinus}/></span>
                        </div>
                        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"/>
                        <div class="input-group-append">
                          <span class="input-group-text group-box"><FontAwesomeIcon icon={faPlus}/></span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row mx-0 align-items-center mb-0">
                      <label for="inputPassword" className="col-sm-3 col-form-label text-right">Internet Transaction Fee&nbsp;&nbsp;:</label>
                      <div className="col-sm-3 text-right font-weight-bold">
                        <p className="values_input">$97</p>
                      </div>
                    </div>
                    <div className="form-group row mx-0 align-items-center">
                      <label for="staticEmail" className="col-sm-3 col-form-label text-right">Total Due&nbsp;&nbsp;:</label>
                      <div className="col-sm-3 text-center font-weight-bold">
                        <p className="values_input values_input_border">$378,097</p>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-3 col-form-label text-right">Enter Promo Code&nbsp;&nbsp;:</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="col-md-8 warning_alert p-2 d-flex align-items-center justify-content-start">
                      <FontAwesomeIcon icon={faExclamationCircle}/>
                      <p>if your offer is accepted then the seller is requesting a deposit in the amount of $3,00.</p>
                    </div>
                    <p className="seller_request">Seller is requesting that you close by:</p>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-5 col-form-label text-left">How soon can you close on this property&nbsp;&nbsp;:</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0 align-items-center">
                      <label for="inputPassword" className="col-sm-5 col-form-label text-left">If my bid is not initially accepted by the seller then please hold my bid as backup offer for&nbsp;&nbsp;:</label>
                      <div className="col-sm-3">
                        <select className="form-control">
                          <option>7 Days</option>
                          <option>14 Days</option>
                        </select>
                      </div>
                    </div>
                    <div className="register_bid_title mb-2 col-md-8 d-flex align-items-center justify-content-between">
                      <h4>Payment Information</h4>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="staticEmail" className="col-sm-2 col-form-label text-right">Card Number&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="staticEmail" className="col-sm-2 col-form-label text-right">Expiry Date&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-2 col-form-label text-right">CVV&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="col-md-8 warning_alert p-2 d-flex align-items-center justify-content-start">
                      <FontAwesomeIcon icon={faExclamationCircle}/>
                      <p><b>$97 Bid Deposit</b>(a hold on your credit card) will be assessed once you submit an offer or bid to the site.</p>
                    </div>
                    <p className="seller_request">Check the boxes to confirm the following:</p>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" for="exampleCheck1">I understand and agree that the seller reserves the right to refuse any bid, highest or otherwise and final acceptance of a selected bid is expressly subject to the sellers signature on the purchase and sale agreement</label>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" for="exampleCheck1">I agree to buy this property As-is, where is with all faults.</label>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" for="exampleCheck1">I understand that the pictures, video ARV proof and rehab numbers are provided for informational purposes only and I have done my own due dilligence for this property i am bidding on.</label>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" for="exampleCheck1">I agree to sign and return the purchase documents within 1 bussiness day of receipt or my offer could be rejected.</label>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" for="exampleCheck1">I agree to deliver(whatever seller enters as required earnest money $) as nonrefundable earnest money to title company on Executed Contract if i am the winning bidder within the 48 bussiness hours or my winning bidder status can be cancelled.</label>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" for="exampleCheck1">I agree to respond to AuctionMyDeal.com inquires within 1 bussiness day of receipt.</label>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" for="exampleCheck1">I (Buyers) agrees to pay for all standaard buyer and seller closing cost including title policy. Seller will pay to remove all liens, taxes and HOA dues owed and prorated up until the day of closing.</label>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" for="exampleCheck1">I am the prospective buyer or an authorized representative of the prospective buyer for this transaction. I represent that on my own behalf and behalf of any prospective buyer I represent. I have read and agree with the participation terms for making this offer, and agree to AuctionMyDeal.com Terms and Conditions , Privacy Policy and any special terms that may apply.</label>
                    </div>
                    <div className="col-md-12 text-center">
                      <button class="btn red-btn" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
