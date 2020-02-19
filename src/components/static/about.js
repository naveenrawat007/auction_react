import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class About extends Component{
  _isMounted = false
  componentDidMount(){
    window.scroll(0,0)
  }
  render(){
    return(
    	<div className="static_inner bg_white">
		    <div className="container custom_container row about_main px-5 mx-auto py-5">
		    	<div className="col-md-7">
		    		<h2 className="mb-4">Welcome to Auctionmydeal.com</h2>
		    		<div className="row mx-0 about_row">
		    			<div className="col-md-6 px-2">
		    				<img src="/images/logo.png" className="logo_about" alt=""/>
		    				<p>AuctionMyDeal.com is a local Real Estate Investors Platform in Houston, Texas that helps Wholesalers, Motivated Sellers & Real Estate Agents net More Money by auctioning off their Wholesale/Fixer Upper deals to the Highest Bidder while providing some of the most credible real estate opportunities online.</p>
		      			<p>Auction sites have generally only been for Banks & Asset Managers who are selling their REO’s (foreclosures). These large institutions use auctions to sell their inventory for the highest price the market will pay, because it helps them net More Money. This site offers local real estate investors this same opportunity.</p>
		      			<p>AuctionMyDeal.com offers an Easy way to market your wholesale/fixer upper deals for FREE to all interested buyers, including your inner circle! </p>
		    			</div>
		    			<div className="col-md-6 px-2">
		    				<p>This way you know you’re getting your best price. You can choose to put your property up to Auction for 7, 14, 21 or 30 days to get Your Property SOLD.</p>
		    				<p>We will help you market your property for FREE using SEO, Social Media & Email Marketing to over 10,000 Real Estate Investors & Agents to help give your property Maximum Visibility to other Investors. We pride ourselves on being transparent to our members, and go the extra yard to ensure all members are treated honestly and fairly.</p>
				      	<p>Richard Wall is the founder and CEO of AuctionMyDeal.com with over 20 years’ experience working with Investors in Houston, Texas. He’s a successful Real Estate Broker, Entrepreneur & Investor who has bought and/or Sold over 900 properties.</p>
								<p>Our support team consists of highly talented Expert Property Evaluators, Researchers and Marketing Specialist that are here to help you get Your Property SOLD for Your Highest & Best Price.</p>
		    			</div>
		    		</div>	
		    	</div>
		    	<div className="col-md-5">
		      	<div className="about_bg mb-4">
		      		<img src="images/image.png" alt="" className="img-thumbnail" />
		      	</div>
		      	<h4 className="font-darkred">Our Support Team</h4>
		      	<p>Our Team at AuctionMyDeal.com is committed to helping our members create Win/Win relationships with other Investors, and for everyone to Succeed in getting their best deal.</p>
		      	<h4 className="font-darkred">How AuctionMyDeal.com Works</h4>
		      	<p>AuctionMyDeal.com is a Real Estate Investors Platform that’s geared toward helping real estate investors & property owners get their highest and best price for their fixer upper/wholesale deals that need a lot of work.</p>
		      	<p>Investor/Realtors to confirm their validity and give these deals a Third Party Endorsement. This should help these Sellers/Investors Net More Money by auctioning it off to the highest bidder when marketing on an auction platform to 1,000’s of investors over settling for what their inner circle of investors will pay for the same deal.</p>
		      </div>
		      <div className="col-md-10 offset-md-1 text-center py-3">
		      	
		      </div>
		      <div className="col-md-10 offset-md-1 text-center py-3">
		      	
		      </div>
		    </div>
      </div>
    )
  }
}
