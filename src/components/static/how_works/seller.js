import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class SellerOverview extends Component{
  _isMounted = false
  render(){
    // componentDidMount () {
    //
    // }
    return(
      <div className="tab-pane show active landlord-analyzer" id="landlord-analyzer" role="tabpanel" aria-labelledby="landlord-analyzer">
        <h3 className="font-darkred">Sellers (How everything works)</h3>
        <p>
          FREE Real Estate Investors Platform that helps Distressed Sellers, Wholesalers and Realtors
          auction off their property to the Highest Bidder. Let us help you create your own bidding war by
          sending all of your Buyers who are interested in Bidding on your Property to AuctionMyDeal.com to
          ensure you get your Highest &amp; Best Price. Plus, we will put your property in front of 1,000’s of
          investors to give it Maximum visibility to help you Net More Money.
        </p>
        <p className="font-darkred">Requirements to post properties on website:</p>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <FontAwesomeIcon icon={faPlus} className="icon-toggle"/> Right to sell property
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div>
              <p>You must:</p>
              <ol type="a">
                <li> Own the property or have legal right to sell it.</li>
                <li>Have an Option to Buy the property with right to assign the contract to another buyer.</li>
                <li>Be a real estate agent who is submitting a listing to auction.</li>
              </ol>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <FontAwesomeIcon icon={faPlus} /> Must be a Deal
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div>
              <p>
                ARV (after rehab value ) must be below 70% to 85% minus repairs or have a cap rate above 10% to qualify to be a deal.  (We verify your properties value, so please upload any sold comps that you think will justify your ARV.)
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
             <FontAwesomeIcon icon={faPlus} /> Fee Simple/Clear title

            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="2">
            <div>
              <p>
                You must have clear title at your title company of choice or open title with Texas American Title at 2500 W Loop South #500, Houston, Tx 77027. Property will not go to Active Auction Status until Title Company of our choice verifies they can issue clear title.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              <FontAwesomeIcon icon={faPlus} /> Provide Credible Rehab #'s

            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="3">
            <div>
              <p>
                You must have contractor or be experienced at bidding out rehabs to complete the estimated cost of a rehab to bring the property to it’s highest and best use. Please disclose whether your rehab numbers are for a fix & flip or landlord.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              <FontAwesomeIcon icon={faPlus} /> Minimum Bid Auction/ARV Guidelines
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="4">
            <div>
              <p>
                Minimum Bid Auctions are more attractive to buyers than Auctions with a Reserve, because most bidders don’t want to waste their time bidding on something when they think the reserve might be too high.  It’s important for your Minimum Bid to be below 70% to 85% ARV – repairs or your property will not qualify to auction on this site.  This site is for investor deals, so if it’s not a deal and/or meets the above criteria then please don’t post it.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="5">
              <FontAwesomeIcon icon={faPlus} /> FREE Marketing Platform for Sellers, Wholesalers & Realtors
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="5">
            <div>
              <p>
                Sellers, Wholesalers and Realtors can post their deals for FREE to obtain their Highest & BEST price.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="6">
              <FontAwesomeIcon icon={faPlus} /> Condition to Post Property
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="6">
            <div>
              <p>
                Once Seller, Wholesaler or Realtor post property on this site, then they will direct all potential buyers/bidders to make their offer on this site to help them net the most amount of money.  If they violate this condition after the property goes Live Online Bidding Status then they will be liable for $997 for defaulting on the terms & conditions.  Any violators could be banned from this site if they violate this condition.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="7">
              <FontAwesomeIcon icon={faPlus} /> Right to Cancel Auction
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="7">
            <div>
              <p>
                Seller can cancel or reschedule their Auction Start date at any time without penalty as long as it’s completed before their property goes to Live Online Bidding.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="8">
              <FontAwesomeIcon icon={faPlus} /> Live Online Bidding Restriction

            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="8">
            <div>
              <p>
                Seller will not be allowed to make any changes to their properties without Admins approval after their property goes to Live Online Bidding

              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="9">
              <FontAwesomeIcon icon={faPlus} /> Default Penalty
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="9">
            <div>
              <p>
                Seller, Wholesaler & Realtor are liable to pay a $997 termination or withdrawal fee if they don’t accept their Minimum Bid or Higher after their property goes to Live Online Bidding.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="10">
              <FontAwesomeIcon icon={faPlus} /> MLS Terms
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="10">
            <div>
              <p>
                If the property you post on this site is in MLS then your Minimum Selling Price needs to be at least 15% to 30% lower than the Active price on MLS.  Realtor must advertise under agent remarks & all advertising that all offers Must be made at www.AuctionMyDeal.com.  A Realtor has to offer the same commission at www.AuctionMyDeal.com as they are offering on MLS.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="11">
              <FontAwesomeIcon icon={faPlus} /> Closing Costs paid by the Seller
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="11">
            <div>
              <p>
                Seller must agree to pay the owner’s title policy, 1/2 the escrow fees, prorated taxes & HOA dues up to the day of closing/funding.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="12">
              <FontAwesomeIcon icon={faPlus} /> Pictures & Videos

            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="12">
            <div>
              <p>
                Seller must upload at least 10 clear pictures and a video of the property pointing out the repairs needed to bring property to its Highest & Best Value.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="13">
              <FontAwesomeIcon icon={faPlus} /> Inspections/Preview

            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="13">
            <div>
              <p>
                Winning Bidder will be buying the property As-Is, Where Is with All Faults.  It is recommended that All bidders view & inspect any properties before they bid on them when possible. If winning bidder needs 3 days to inspect property after executed contract then they will be required to pay $997 deposit that is non refundable if they back out during their inspections.  This fee will only be credited back to the buyer if they buy the property.  If not, then the Seller & AuctionMyDeal.com will split this fee 50%/50% if winning bidder backs out after contract is executed.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion>
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="14">
              <FontAwesomeIcon icon={faPlus} />Post Auction Status
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="14">
            <div>
              <p>Post Auction is when property goes from Live Online Bidding to qualifying the “Buy Now” or Highest Bidders terms of offer. It is also where properties go when the countdown has ended and there’s no bidders. The Bid &amp; Buy Now button will be disabled unless property goes back to Live Online Bidding.</p>
              <ol type="1">
                <li>“Buy Now” Buyers get priority VIP attention, because they are willing to pay the Sellers “Buy Now” Price. When a bidder choses to “Buy Now”, then the property will go into Post Auction Status until the Bidders offer gets verified and accepted by Seller.</li>

                <li>If there’s a Winning Bidder at the end of the bidding countdown the property will go to Post Auction Status until the Seller approves an offer. The Seller has the right to accept or reject any offers if they fill the terms of another offer is better than the one with the highest price. No bidder should consider them the winning bidder until the Purchase Agreement is executed by the Seller.</li>

                <li>If the property doesn’t have any bids at the end of the Auction countdown then the property will go into Post Auction Status. The Seller can withdraw their property from AuctionMyDeal.com without any costs after Auction ends and there’s no offers at or above the Minimum Bid, or they can relist it to Auction. If they want to relist to Auction, they need to reduce their Minimum Selling Price 7% in order to reapply to Auction off their Deal on this site.</li>
              </ol>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    )
  }
}
