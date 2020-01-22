import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class TopReason extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane show active" id="upper-deals" role="tabpanel" aria-labelledby="upper-deals">
        <h3>Top 15 reasons to post your Wholesale/Fixer upper deals at at AuctionMyDeal.com</h3>
        <ul className="mb-5">
          <li>FREE Auction platform link for all your Marketing when advertising Your Deals to get all of Your interested buyers to come up to their Highest and Best Price.</li>
          <li>Creates a sense of urgency & excitement for buyers who are looking for a good deal.</li>
          <li>We will help you market your deal for FREE to over 10,000 investors until it sells.</li>
          <li>We evaluate it, and we will provide you with the best sold and/or leased comp package possible to make your deal more credible.</li>
          <li>We will help you get your deal hard money approved, and then we market it to 10,000 plus landlords looking for good landlord deals.</li>
          <li>Our FREE Landlord Analyzer will help you determine if your Deal makes sense to a landlord by showing them how to put less cash down to buy more properties for a better ROI.</li>
          <li>Help put your property in front of some of the largest property managers in Houston that have databases with over 50,000 landlords looking for landlord deals.</li>
          <li>Help you maximize Social Media by posting all of your deals on Facebook, Twitter, LindedIn, Google+, and getting you to post your deals on these sites too.</li>
          <li>We will provide a FREE yard sign to put in front of your property when appropriate. (upon request)</li>
          <li>Qualify your property and put it in front of our High Wealth partners, and some of the top Institutional Buyers buying residential properties in Houston, Tx.</li>
          <li>Support team that will provide Inspection Checklist to ballpark repairs to figure out if your deal is really a deal. You’ll never sell your wholesale deal if you state it only needs a $10,000 rehab when it really needs $30,000 to $40,000. This is why it’s important to be able to walk a house and ballpark repairs. Get Rehab Cost Estimator HERE</li>

          <li>FREE Expert Advice on any questions you have pertaining to real estate investing. Just ask, and we will go the Extra Yard to help you in your real estate investment business. Our Team has over 50 years experience in real estate investing, development and building.</li>

          <li>Reduces the number of times you have to show the property.</li>

          <li>Gets bidders to negotiate against each other will Guarantee You get Your Highest & Best Price!</li>

          <li>We will help You Auction off your deals to the Highest Bidder or we will make you an offer! (Restrictions Apply)</li>
        </ul>
      </div>
    )
  }
}
