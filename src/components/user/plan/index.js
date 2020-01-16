import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Plan extends Component{
	constructor(props){
    super(props);
  }

  componentDidMount () {
  }


	render() {
		return (
			<div className="profile-setting">
        <div className="container custom_container px-0">
          <div className="row mx-0 profile_row my-5">
            <div className="col-md-12 px-0">
              <div className="profile-form text-center">
              	<div className="works_head">
              		<h3 className="font-red">How Auctionmydeal.com Works</h3>
              	</div>
              	<div className="works_body">
              		<div className="works_img">	
              			<img src="/images/video-img.jpg" alt=""/>	
              		</div>	
              		<div className="works_para">
              			<h6><span>Unlimited</span> FREE <span>Access to use this Cutting Edge Auction Platform<br/></span>DESIGNED FOR LOCAL REAL ESTATE INVESTORS!</h6>	
              			<p>Get Access to ALL property information by paying a weekly, monthly or<br/> yearly fee after we have at least 30 to 50 active properties on the site.</p>
              		</div>
              		<div className="row mx-0 pb-5 payments_row">
              			<div className="col-md-3">
              				<div className="payments_box">
	              				<div className="payments_head">
	              					<p>60 Days Free Trial</p>
	              					<h2>FREE</h2>
	              					<h5>Premium User Account</h5>
	              					<h6>Get Access to all features</h6>
	              				</div>
	              				<div className="payments_body">
	              					<button className="btn red-btn plan_btns">Current Plan</button>	
	              				</div>
	              			</div>
              			</div>
              			<div className="col-md-3">
              				<div className="payments_box">
	              				<div className="payments_head">
	              					<p>weekly Plan</p>
	              					<h2>$27</h2>
	              					<h5>Premium User Account</h5>
	              					<h6>Get Access to all features</h6>
	              				</div>
	              				<div className="payments_body">
	              					<button className="btn red-btn plan_btns">Select Plan</button>	
	              				</div>
	              			</div>
              			</div>
              			<div className="col-md-3">
              				<div className="payments_box">
	              				<div className="payments_head">
	              					<p>Monthly Plan</p>
	              					<h2>$57</h2>
	              					<h5>Premium User Account</h5>
	              					<h6>Get Access to all features</h6>
	              				</div>
	              				<div className="payments_body">
	              					<button className="btn red-btn plan_btns">Select Plan</button>	
	              				</div>
	              			</div>
              			</div>
              			<div className="col-md-3">
              				<div className="payments_box">
	              				<div className="payments_head">
	              					<p>Yearly Plan</p>
	              					<h2>$497</h2>
	              					<h5>Premium User Account</h5>
	              					<h6>Get Access to all features</h6>
	              				</div>
	              				<div className="payments_body">
	              					<button className="btn red-btn plan_btns">Select Plan</button>	
	              				</div>
	              			</div>
              			</div>
              		</div>	
              	</div>		
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
