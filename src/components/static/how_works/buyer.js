import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export default class BuyerOverview extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane show active landlord-analyzer" id="landlord-analyzer" role="tabpanel" aria-labelledby="landlord-analyzer">
        <h3 className="font-darkred mt-3">Buyers (How everything works)</h3>
        <p className="font-darkred">
          How users bid on properties:
        </p>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Create a free account
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div>
              <p>
                Register for a Free Account to establish User Name and Password.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Find property you want to Bid On, Buy Now or Watch
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="1">
            <div>
              <p>
                Check out the Seller’s evaluation of market comps, rehab numbers, property details and Sellers Disclosure at the bottom left of the full property profile page. Bidders should do their own due diligence, but this information could be helpful in doing your initial evaluation.  This information is deemed Reliable but not Guaranteed.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Evaluate Proof
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="2">
            <div>
              <p>
                Check out the Seller’s evaluation of market comps, rehab numbers, property details and Sellers Disclosure at the bottom left of the full property profile page. Bidders should do their own due diligence, but this information could be helpful in doing your initial evaluation.  This information is deemed Reliable but not Guaranteed.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Do Your Own Due Diligence
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="3">
            <div>
              <p>
                When possible preview & inspect property, research solid Sold comps from MLS less than 6 to 9 months old and get hard numbers from your contractors to rehab property before you make a bid. It’s important to figure out if your numbers make sense to buy property, so seek professional advice from an experienced Realtor and/or qualified contractor if you’re uncertain about your numbers.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Submit Bid or Buy Now
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="4">
            <div>
              <p>
                Option 1. Submit Bid: Go to full property page, and press Place Bid to be the next Highest Bidder.
              </p>
              <p>
                Option 2. Buy Now: If your numbers work at the Buy Now price, then You can choose to Buy Now to secure the property without having to wait for the Auction to end.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="5">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> When Auction Ends Bidders are either
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="5">
            <div>
              <h5>Winning Bidder:</h5>
              <p>Our closing department will send you an email to re-verify your bid, and the terms of the contract.  If terms are accepted by Highest Bidder then Seller will be notified for acceptance.</p>
              <h5>Or Not the Winning Bidder:</h5>
              <p>Our closing department will notify bidders that they are not the winning bidder, but will ask if they would like to be a back up offer if property comes back on the market.  Back up offers will get the first option to buy properties that come back on the market before they get put back up for Auction.</p>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="6">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> After Seller Acceptance

            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="6">
            <div>
              <p>
                Our closing department will email you the accepted Purchase Agreement & Addendums to e-sign, and are willing to go over these documents to make sure you understand what you are signing.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="7">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Offer Rejected

            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="7">
            <div>
              <p>
                Sellers reserve the right to approve, reject or counter terms and/or offer a Highest & Best to comparable offers.  No bid shall be deemed fully approved by the seller until a contract and addendums have been fully executed with Earnest Money deposited at Title Company.

              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="8">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Inspections

            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="8">
            <div>
              <p>
                Winning Bidder will be buying the property As-Is, Where Is with All Faults.  It is recommended that All bidders view & inspect any properties before they bid on them when possible. If winning bidder needs 3 days to inspect property after executed contract then they will be required to pay $997 deposit that is non refundable if they back out during their inspections.  This fee will only be credited back to the buyer if they buy the property.  If not, then the Seller & AuctionMyDeal.com will split this fee 50%/50%.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="9">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Closing & Funding
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="9">
            <div>
              <p>
                You will be assigned to one of our closing managers that will help you get this property closed, and answer any questions.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="10">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Post Bidding Options
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="10">
            <div>
              <p>
                If Auction ends and there are no bids then Seller, Wholesaler or Realtor may withdraw property from site, or they can reduce their Minimum Selling Price at least 7% and relist it as a new listing to Auction.
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="11">
              <FontAwesomeIcon icon={faMinus} className="icon-toggle-plus"/><FontAwesomeIcon icon={faPlus} className="icon-toggle-minus"/> Auction Participation
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="11">
            <div>
              <ul>
                <li> I agree to buy this property As-Is, Where-Is with all faults.</li>
                <li> I agree there are no inspection or financing contingencies.</li>
                <li> I understand that the pictures, video, ARV proof and rehab numbers are provided for informational purposes only and I have done my own due diligence for this property I’m bidding on.</li>
                <li> I agree to deliver $2,000 or 2% (whichever is higher) as nonrefundable earnest money to Title Company on Executed Contract if I’m the winning bidder within 48 business hours or my winning bidder status can be canceled.</li>
                <li> I agree to pay for all of my hard money loan costs, survey, insurance, and 1/2 of the title company fees & closing costs if I’m the winning bidder. Plus, I will pay my prorated share of property taxes and HOA fees up to the day of closing.</li>
                <li> I will provide all required documentation requested, or I will not be allowed to auction off My Properties.</li>
                <li> I understand that it could take up to 48 to 72 hours to get my offer approved & executed if I’m the winning bidder.</li>
                <li> I understand the Seller has the right to accept or reject any offer before the contract has been executed for any reason, subject to paying a cancellation fee of $997.  This fee will be split with the Winning Bidder and AuctionMyDeal.com as a transaction fee.</li>
              </ul>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    )
  }
}
