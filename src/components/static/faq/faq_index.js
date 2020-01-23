import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class FaqIndex extends Component{
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      path: props.path
    }
  }
  componentDidMount () {
    window.scroll(0,0)
  }

  render(){
    return(
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane show active" id="helpful_info" role="tabpanel" aria-labelledby="helpful_info">
          <div className="help_us row mx-0">
            <div className="col-md-3 px-0">
              <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
                <li className="nav-item">
                  <Link to="/frequently-asked-questions" className="nav-link active">Frequently Asked Questions</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-9 px-0">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane show active">
                  <h3 className="font-darkred">Frequently Asked Questions</h3>
                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> What makes this website different from other sites?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          AuctonMyDeal.com is geared toward helping local real estate investors auction their wholesale/fixer upper deals to the highest bidder. Most auction sites only allow banks, asset managers and Realtors to post their properties. Then they either charge the Seller 6% commission, or the buyers have to pay a 3.5% to 5% buyer premium if they are the winning bidder. AuctionMyDeal.com offers a FREE platform for Wholesalers, Sellers or Realtors to post their deals.  And at this current time we are also offering this site for FREE to all bidders for a limited time, and then will charge the Highest Bidder a reasonable Internet Transaction Fee.  One of the Biggest Differences is there’s NO Reserve Price, so you can put in a bid at the lowest price and if no one bids higher then you are able to buy the property without having to worry about meeting the Reserve Price.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> How do I register at Auctionmydeal.com and what are the requirements to be a member?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          You can Register at the top right of the screen, and if you find a deal you want to make a bid on or you want to post a property you can register on that page.  The requirements for membership are to follow the terms and conditions that regulate this site, and use Ethical Business Practices.  Any member who acts unethical will be banned from this site.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> Is it possible for a visitor to post a deal?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          No, you have to register before you can submit a property on the website.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> Do I need to pay a fee to submit property deals?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          No, this is a free local real estate investor platform that allows Wholesalers, Motivated Sellers and Realtors to post their wholesale/fixer upper deals for free.  The only catch is the Wholesaler, Motivated Seller or Realtor has to agree to send all potential buyers to website during the time their property is in Active Auction Status, and they must accept any approved offers at or above their Minimum Selling price or they will have to pay a $997 for defaulting on the terms and conditions of this site.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> How long is the average auction?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          A member has the ability to chose for their property to be auctioned off in 7, 14, 21 or 30 days.  14 days is suggested, so that the property has time for other investors to see the property.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> Do I need to register first to submit bid or Buy Now an on auction?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          Yes, you must register before you can submit a bid or “Buy Now”.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> How do I know if I’m outbid?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          You will get a message in your Inbox that you are not the highest bidder. There will be a link that will take you back to the Full Property Profile, so that you may bid higher, “Buy Now” or stay as a back up offer?
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> What's the earliest a bidder can make a bid on a property?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          A property will be posted as a Coming Soon listing under Buy on home page until it goes to Active Auction Status determined by the seller.  Bidders can chose to “Buy Now” before the bidding starts or they can make a bid when the property goes Active.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> How will I know when the “active” bidding will end?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          There will be a timer that will be counting down, and will end when the timer ends. Note that during the Auction, bidding activity may occur in the final moments of the Auction. If any Bidder bids in the last three minutes of the bidding period, the deadline will extend by 3 minutes. The bidding period will automatically extend for successive three minute periods until three minutes pass with no new bids placed. At this point, the bidding period closes. Upon the close of an Auction, the Highest Bid is submitted to the Seller for consideration and approval.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> Is there a Reserve price that has to be met?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          No all active properties start out at a Minimum Bidding price that is acceptable to Seller.  So if you see a property you like you don’t have to wait for the Reserve price to be met.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> If I am the Winning Bidder, what is the next step?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <ol>
                          <li>Winning Bidder<br/>
                          Our closing department will send you a email to re-verify your bid, and the term of the contract. If terms are accepted by Highest Bidder then the Seller will be notified for acceptance</li>
                          <li>Offer Accepted<br/>
                          Our closing department will email you the accepted Purchase Agreement and Addendum’s to e-sign, and send your deposit</li>
                          <li>Cash or Hard Money<br/>
                          You will be assigned to one of our closing managers if you have any questions, who will help you get this property closed</li>
                        </ol>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> What are my Options if I'm NOT the Winning Bidder?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          You will be notified by email about you being outbid, and you can keep your bid as a backup offer or move on to another property. Backup offers get first right to purchase property before it goes by up for Auction.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> Can I inspect the property I'm interested in bidding on?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          Yes, when possible the Seller will put preview/inspection times under Property Details.  It is highly recommended that All bidders view & inspect any properties before they bid on them when possible.  If winning bidder needs 3 days to inspect property after executed contract then they will be required to pay $997 deposit that is non refundable if they back out during their inspections.  This fee will only be credited back to the buyer if they buy the property.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> Do I need a real estate license to buy and sell these properties?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          No, you do not have to have a real estate license if you own the property or own the contract that you are selling. Although, it is highly suggested that you get advice from a Realtor or experienced Investor that you trust.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> Who pays closing costs?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          The seller will pay for the owners title policy, half the escrow fees and prorated taxes & HOA dues up to the day of closing. The buyer will pay for half the escrow fees, any loan fees, survey & HOA resale cert & documents (if needed).
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> What is the Watch feature?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          The Watch feature is found on the property details page, and it will keep you updated about the changes to a property’s status with real time email notifications.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> How does the Watch feature work?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          Click the Watch button on the property details page and the property will be saved to your Watched properties list. User can manage these alerts by going to their Watched properties tab in their user panel.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> Are the wholesalers truthful about the cost of repairs and the after-repaired value (ARV)?
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          These are estimates that are given, but you must do your own due diligence. User should visit the property on the preview time and date with their contractor.
                        </p>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion >
                    <div>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <FontAwesomeIcon icon={faPlus} /> Post Auction Status
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        <p>
                          Post Auction is when property goes from Live Online Bidding to qualifying the “Buy Now” or Highest Bidders terms of offer. It is also where properties go when the count down has ended and there’s no bidders. The Bid & Buy Now button will be disabled unless property goes back to Live Online Bidding.
                        </p>
                        <ol>
                          <li>
                            "Buy Now" Buyers get priority VIP attention, because they are willing to pay the Sellers "Buy Now" Price. When a bidder choses to “Buy Now”, then the property will go into Post Auction Status until the Bidders offer gets verified and accepted by Seller.
                          </li>
                          <li>
                            If there’s a Winning Bidder at the end of the bidding countdown the property will go to Post Auction Status until the Seller approves an offer. The Seller has the right to accept or reject any offers if they fill the terms of another offer is better than the one with the highest price. No bidder should consider them the winning bidder until the Purchase Agreement is executed by the Seller.
                          </li>
                          <li>
                            If the property doesn’t have any bids at the end of the Auction countdown then the property will go into Post Auction Status. The Seller can withdraw their property from AuctionMyDeal.com without any costs after Auction ends and there’s no offers at or above the Minimum Bid, or they can relist it to Auction. If they want to relist to Auction, they need to reduce their Minimum Selling Price 7% in order to reapply to Auction off their Deal on this site.
                          </li>
                        </ol>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
