import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export default class RealtorMarketingPlatform extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane show active">
        <h3 className="font-darkred">Realtor Marketing Platform</h3>
        <p>Welcome to AuctionMyDeal.com, a free Real Estate Investor Online Auction Platform for You and Your Seller to give your listings Maximum Visibility in front of over 10,000 local real estate investors.</p>
        <p>Auctionmydeal.com uses Cutting Edge Technology to help Real Estate Professionals create more demand on Your fixer upper and/or distressed listings.</p>
        <p>Auction sites have generally only been for Banks & Asset Managers who are selling off their REO’s (foreclosed properties). These large Billion dollar institutions use auctions to sell their distressed inventory for the highest price the market will pay, because it helps them Net the Most Money. This site offers Realtors this same opportunity.</p>
        <p>Auctions are not for most retail properties that don’t need any work, unless the Seller is very motivated and needs to sell quick?</p>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Ideal Properties to Auction
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div>
              <p>The ideal properties to post on this site are properties that need a major rehab, or houses that have flooded and the Seller doesn’t want to make any repairs.</p>
              <p>Banks and mortgage companies won’t loan money on properties that have serious defects like foundation, structural, old leaking roofs, safety hazards, flood defects, unless they are repaired before closing. So unless the Seller wants to make these repairs, then they will need to price their property at a price that would attract a cash buyer or investor who is approved with a Hard Money Loan.</p>
              <p>All properties must be approved to Auction, so the first step is to help your Seller set their Minimum & Buy Now Selling Price.</p>
              <p>All properties must be approved to Auction, so the first step is to help your Seller set their Minimum & Buy Now Selling Price.</p>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Minimum Selling Price
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="1">
            <div>
              <p>In order for your property to get approved to auction, you must prove that your Minimum Selling Price is at or below 85% ARV (after rehab value) minus repairs.</p>
              <p>Example: $100,000(i) x 85%(i) = $85,000(i) –  $15,000(i) =$70,000(i) would be the highest Minimum Suggested Selling Price that could be Approved
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Buy Now Price
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="2">
            <div>
              <p>
                Your Sellers “Buy Now” Price is the list price on MLS or a reasonable price that’s on the high end of what they would be happy to accept.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Investors Ideal Selling Price:
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="3">
            <div>
              <p>Most investors are looking for deals they can buy at 65% to 75% ARV – repairs, but some landlords will pay closer to 80% to 85% ARV if the property can still cash flow.</p>
              <p>Our goal is to help you Net the Most Money possible for your Seller, and if there’s no other Realtor on the Buy end, then you can keep 100% of your commission.  (hopefully 5% to 6%)</p>
              <p>That’s right, our Real Estate Investor platform doesn’t cost Sellers or Realtors any money to use this site.<span className="font-darkred fw-500"> At this current time we are also offering this site for FREE to all bidders for a limited time, and then will charge the Highest Bidder a reasonable Internet Transaction Fee.</span></p>
              <p>AuctionMyDeal.com will aggressively market your property through our SEO & SMO (Search Engine and Social Media Optimization) by attracting visitors to our website via Google, Facebook, Twitter, Youtube, LinkedIn, Instagram, Yahoo, Bing and Pinterest.  Users will be able to Bid, Sell & Watch properties that will keep them coming back.  We will advertise your property using our Cutting Edge email & text system to over 10,000 local real estate investors to give your property Maximum Visibility.  Plus, we will provide a large Online Auction sign to put in front of your listing once your property is approved to Auction.</p>
              <p>Please read Bidding as an Agent and Selling as an Agent to learn more about how this FREE Platform can help You and Your client Net More Money?</p>
              <p>Selling as Agent:</p>
              <p>To post a property as a licensed Real Estate Agent you must:</p>
              <ol type="1">
                <li>Have an active license with the Texas Real Estate Commission</li>
                <li>Have your Seller execute a Listing Agreement with the Exclusive Right to Sell their property</li>
                <li>Seller to execute an (Amendment to Listing) that gives you the right to Auction their property at AuctionMyDeal.com.</li>
                <li>Educate your Seller:  As a listing agent, your goal is to help your clients sell their property for the highest price the market will pay based upon it’s condition.  This site is geared toward properties that need a lot of work, or where Your Seller is motivated and needs to sell quick to the Highest Bidder.  If your seller isn’t motivated and wouldn’t accept a Minimum Selling Price at 80% to 85% ARV – repairs then this site probably isn’t the right fit for their property.</li>
                <li>Get contractor(s) or put together estimated rehab costs. Download FREE Excel Estimate of Rehab Costs)   This will make your deal more credible, unless it’s land or needs to be torn down.</li>
                <li>Provide Market Comps, list of rehab #’s and Advise your client (Seller) what their Minimum Selling Price and Maximum (Buy Now Price) should be. The Buy Now Price can not be more than any listed price on MLS or other sites where advertised.</li>
                <li>Once you and your Seller believe their property is a good candidate to Auction, then Register or login to your Free account at AuctionMyDeal.com.</li>
                  <ol type="a">
                    <li>Go to SELL</li>
                    <li>Click Auction Participation Agreement, click that you are a real estate agent submitting listing, upload your Executed Listing Agreement, Listing Addendum, Sellers Disclosure, Lead Based Paint & HOA Addendum. Then check all other boxes to confirm your acceptance, and be able to submit your property.  (Click here if you have any Questions?)</li>
                    <li>Fill in Property Details, Deal Analysis estimated numbers, upload your estimated ARV proof (Top 3 Sold Comps), description of repairs (contractor estimate or Free Excel Estimate of Rehab Costs), auction details, upload at least 10 to 20 pictures and a video of the property.</li>
                    <li>Click Submit, and your listing will be under review until we approve it for Auction or email you why your property doesn’t meet our terms and conditions to Auction.</li>
                  </ol>
                  <li>  Once we Approve your listing to Auction, then it will be listed under Coming Soon until your start date at 12:01 am. At that time, Live Online Bidding will start.  We suggest that you start to aggressively market your listing as soon as it’s Approved to Auction.  Important: You should always list your properties in your local MLS for Maximum Visibility.  The MLS is one of the Best sources to drive traffic to your Online Auction.</li>
                    <li>The following statement must be added to the MLS under Agent Remarks:</li>
                  <p>“All offers need to be submitted through Online Bidding at www.AuctionMyDeal.com. For questions or assistance with your online Bidding, email Support@AuctionMyDeal.com.”</p>
                <li>You are required to offer the same commission on MLS to any Real Estate agent licensed by TREC (Texas Real Estate Commission) who has submitted the highest accepted Bid. Listing Agents are required to list what commission they are offering under disclosures.</li>
                <li>Listing agent & Seller agree to pay $997 if they withdraw their property off the market after Live Online Bidding has started, or if they don’t accept their Minimum Selling price when the countdown of the auction ends.</li>
                <li>There is a Post Bidding time frame of up to 7 days for properties that did not get any bids during Live Online Bidding.</li>
              </ol>
              <p><i>AuctionMyDeal.com is designed to keep you, the real estate professional fully informed throughout the entire Online Bidding process.  Our team is here to assist you with selling your listings faster, for More Money and More efficiently through a transparent and fair bidding process.</i></p>
              <p><i>You can choose 7, 14, 21 & 30 day time frames from when the Auction begins until it ends.  We suggest doing 14 to 21 day Auctions to get your property the Most Visibility before the Auction ends.</i></p>
              <p><i>For more information about the Auction Selling Process go to (Seller) under Help.</i></p>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    )
  }
}
