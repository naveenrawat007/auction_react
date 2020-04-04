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
                <div className="register_bid_description py-3 px-5">
                  <h3 className="mb-1">Total Amount Bid: $375,000</h3>
                  <p className="mb-0">Buyer will close this property: April 30, 2020</p>
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
                        <p className="mb-0">Tina</p>
                        <p className="mb-0">Nguyen</p>
                        <p className="mb-0">Tinaaaa@gmail.com</p>
                        <p className="mb-0">777-1111-2222</p>
                      </div>
                    </div>
                    <div className="register_bid_title mb-2 col-md-8">
                      <h4>B. Are you buying this property for yourself? <span className="font-blue-bold">NO</span></h4>
                      <div className="col-md-10 relator_info">
                        <h5>Relator Information</h5>
                        <p className="mb-2">There will be no fee or comission paid by AuctionMyDeal.com or any seller unless they are listed on the MLS and then you will recieve the comission offered on MLS by the sponsoring broker.</p>
                      </div>
                      <div className="font-blue-bold px-3">
                        <p className="mb-0">Richard</p>
                        <p className="mb-0">Wall</p>
                        <p className="mb-0">#0453989</p>
                        <p className="mb-0">Richar Wall Realtors</p>
                        <p className="mb-0">Richard@richardwall.com</p>
                        <p className="mb-0">777-1111-2222</p>
                      </div>
                    </div>
                    <div className="register_bid_title mb-2 col-md-8">
                      <h4 className="mb-2">C. I want to purchase the property as: <span className="font-blue-bold">Bussiness</span></h4>
                      <p className="font-blue-bold px-3">Angle Investor LLC</p>
                    </div>
                    <div className="register_bid_title mb-2 col-md-8">
                      <h4>D. Proof of funds and/or Preapproval Letter: <span className="font-blue-bold">Cash</span></h4>
                    </div>
                    <div className="col-md-12 mt-4 text-center">
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
