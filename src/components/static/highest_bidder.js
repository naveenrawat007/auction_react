import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class HighestBidder extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane active show" id="highest-bidder" role="tabpanel" aria-labelledby="highest-bidder">
        <h3>Auction Your Wholesale Deal to the Highest Bidder or our Affiliate Partner Angel Investors, LLC will Buy It!</h3>
        <h5 className="text-center text-weight mb-4">Our goal is to help real estate investors get your deals sold for the highest price other investors will pay or Angel Investors, LLC will Buy It! <br/>(restrictions apply).</h5>
        <h5 className="mb-3">We will buy any property subject to the following restrictions such as:</h5>
        <ul className="mb-5">
          <li>We only guarantee single family homes.</li>
          <li>No mobile homes or properties made with 2″ x 2″ support walls.</li>
          <li>Properties can’t have flooded more than once. If it was a one time Harvey flood then there has to be at least 2 rehabbed homes that flooded and sold since flood in legal subdivision to determine ARV within 350 sqft of subject property.</li>
          <li>Properties can’t be located within 250 feet from a rail road track, major freeway, fire station or sewage facility.</li>
          <li>Fronts or backs to major road, water tower, commercial building or treatment facility.</li>
          <li>Located outside our service area of the Greater Houston area, or 50 miles outside of downtown Houston.</li>
          <li>No properties with acreage in Rural areas.</li>
          <li>Properties have to be in neighborhoods with at least 50 other houses, and no houses that are one of the largest homes in the neighborhood. (meaning over 20% larger than 80% of the homes in subdivision</li>
          <li>There can’t be any vacant boarded up homes within 5 houses from subject property, and not more than one boarded up home on same street.</li>
          <li>No major cracked slab that can’t be leveled correctly, or has major structural problems. (major structural problems will be determined by Angel Investors, LLC)</li>
          <li>No property that has toxic mold, has or had hazardous materials on property that negatively affected the property.</li>
          <li>We only buy properties that can be bought at or below 70% ARV (after rehab value) – repairs under $250,000 ARV and 65% ARV – repairs from $251,000 to $500,000 ARV.</li>
          <li>We don’t guarantee any properties valued over $500,000 ARV, but will consider making offers on all properties.</li>
          <li>AuctionMyDeal.com is an Angel Investors, LLC affiliate website, and the Members will determine the ARV (after rehab value) and repairs needed for all offers.</li>
          <li>All properties have to be sold by General Warranty Deed with clear title.<br/>Angel Investors, LLC will consider making offers on all properties, but will only guarantee the ones that pass the following restrictions.</li>
        </ul>
        <p className="text-center">Post Your Deal Today to get Your Highest & Best Offer @ http://www.auctionmydeal.com/sell/</p>
      </div>
    )
  }
}
