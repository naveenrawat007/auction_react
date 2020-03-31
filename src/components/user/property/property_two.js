import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CurrencyInput from 'react-currency-input';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { faExclamationCircle, faBed, faBath, faCar } from '@fortawesome/free-solid-svg-icons';

export default class PropertyShowTwo extends Component {
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
          <div className="row mx-0 profile_row my-5 register_bids_new">
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
                <div className="register_bid_description p-3">
                  <p className="mb-0">Registering to bid on a property takes 3 easy steps. Step 1 is to: A. verify who is the buyer. B. are you being represented by an agent and if yes their name and contact information. C. Is buyer an individual or bussiness entity. D. Upload your proof of funds and/or preapproval status. This information will be used in the event that you are the winning bidder and to be able to provide the correct information to the seller. Without the correct information your offer could be rejected by the seller even if you are the highest offer.</p>
                </div>
              </div>
            </div>
            <div className="col-md-12 py-3">
              <div className="bg_white">
                <div className="register_bid_form py-3 px-5">
                  <form>
                    <div className="register_bid_title col-md-8">
                      <h4>A. Register to Bid</h4>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="staticEmail" className="col-sm-2 col-form-label text-right">First Name&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-2 col-form-label text-right">Middle Name&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="staticEmail" className="col-sm-2 col-form-label text-right">Last Name&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-2 col-form-label text-right">Email Address&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-2 col-form-label text-right">Mobile No.&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="register_bid_title col-md-8 d-flex align-items-center justify-content-between">
                      <h4>B. Are you buying this property for yourself?</h4>
                      <select className="form-control">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="col-md-8 relator_info">
                      <h5>Relator Information</h5>
                      <p>There will be no fee or comission paid by AuctionMyDeal.com or any seller unless they are listed on the MLS and then you will recieve the comission offered on MLS by the sponsoring broker.</p>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="staticEmail" className="col-sm-2 col-form-label text-right">First Name&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="staticEmail" className="col-sm-2 col-form-label text-right">Last Name&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-2 col-form-label text-right">License&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-2 col-form-label text-right">Company Name&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-2 col-form-label text-right">Mobile No.&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-2 col-form-label text-right">Email Address&nbsp;&nbsp;:</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="register_bid_title col-md-8 d-flex align-items-center justify-content-between">
                      <h4>C. I want to purchase the property as:</h4>
                      <select className="form-control">
                        <option>Bussiness</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label for="inputPassword" className="col-sm-6 col-form-label">Please provide Bussiness Entity Formation Documents here</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-5 col-form-label">Upload Bussiness Entity Formation Documents</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="register_bid_title col-md-8 d-flex align-items-center justify-content-between">
                      <h4>D. Proof of funds and/or Preapproval Letter:</h4>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-3 col-form-label">I plan on buying this property with</label>
                      <div className="col-sm-4">
                        <select className="form-control">
                          <option>Cash</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row mx-0">
                      <label for="inputPassword" className="col-sm-2 col-form-label">Attach proof of funds</label>
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
                      <label className="form-check-label" for="exampleCheck1">I hereby acknowledge that the contact information is true and correct. I understand the information i've provided will be used to prepare the transaction document for the purchase of the property if my bid is accepted by the seller to proceed toward closing of this property.</label>
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
