import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class BiddingAgent extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane show active">
        <p>
          Auctionmydeal.com is a local Real Estate Investors Platform that helps Wholesalers, Agents & Motivated Sellers net More Money by auctioning off their deals to the highest Bidder while providing some of the most credible real estate opportunities online.
          If you’re Bidding as an Agent, you’re not always guaranteed to make a commission, unless there’s another Realtor who is offering a commission and/or it’s listed on MLS.  Check on the bottom left of the Full Property Profile under Property Auction Terms & Disclosures to see what properties are paying a commission to Realtors.  Most investor/buyers don’t expect for you to work for free, so make sure you sign them to a Buyers Rep that states they will pay a commission if there’s not one offered.
        </p>
        <p>
          Process of Bidding for your client:
        </p>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <FontAwesomeIcon icon={faPlus} /> Register as a licensed Real Estate Agent
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div>
              <ol>
                <li>
                  Create Your Free Account.
                </li>
                <li>
                  Check the box licensed Real Estate Agent and any other category’s you fall in.
                  Your license must be Active with TREC (Texas Real Estate Commission) to get paid a commission.
                </li>
              </ol>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <FontAwesomeIcon icon={faPlus} /> Steps to Bidding for your client

            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="1">
            <div>
              <ul>
                <li>
                  Register or log into your free account, and read terms and conditions.
                </li>
                <li>
                  Have your client sign a Buyers Representation giving you the right to bid for them on AuctionMyDeal.com under Special Provisions. Real Estate Agent will be the bidder for their client.
                </li>
                <li>
                  Find a property that your client wants to bid on.

                </li>
                <li>
                  Do your own due diligence to determine if the property meets your client’s investment goals. If it doesn’t then keep looking for a better property that meets their criteria.
                </li>
                <li>
                  Accompany your client to the viewing of the property before the auction starts if permitted with your/their contractors and/or inspectors.
                </li>
                <li>
                  Determine your buyers low and high price they are willing to pay for the subject property.

                </li>
                <li>
                  After Auction goes live, then submit your bid or select the “Buy Now” price if your buyer doesn’t want to wait and risk the chance of losing the property.

                </li>
                <li>
                  Advise your client when they get over bid to determine if they want to be the next highest bidder or if they want to stop bidding.
                </li>
              </ul>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              <FontAwesomeIcon icon={faPlus} /> What happens when a buyer wants to “Buy Now” or is the Winning Bidder at the end of the auction?
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="2">
            <div>
              <ol>
                <li>
                  Closing coordinator at AuctionMyDeal.com will reconfirm buyers proof of funds and/or financing of all bidders.

                </li>
                <li>
                  Closing coordinator will present all offer(s) to the Seller, and the seller will choose which offer & terms are best for them within 24 to 48 hour business hours. If none of the offers are at or above the reserve price, the seller has the right to negotiate with any offers that were submitted, or they can relist the property if they reduce the price by at least 7%. Or they can terminate their property from the site at no cost or future obligation.
                </li>
                <li>
                  If bidder selects to “Buy Now”, or their offer is selected by Seller as the Highest Bidder then they will get an email to verify the acceptable terms of the contract and a questionnaire to verify all names, addresses, phone numbers, proof of funds, fees & closing costs and anything else that Seller wants to make sure is negotiated on the front end. If Buyer doesn’t accept or has a question about the terms emailed to them then they can respond with a question or counter. Then Seller will have a right to evaluate their response and either accept another offer or accept/reject or counter current offer. Seller has the full right to evaluate all offers and accept any offer that they deem to be the best offer for them.

                </li>
              </ol>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              <FontAwesomeIcon icon={faPlus} /> Winning Bidder
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="3">
            <div>
              <ol>
                <li>
                  After winning bidder accepts all terms of the Contract, Auction Addendum & All Disclosures then they will be emailed a contract through Docu-sign.
                </li>
                <li>
                  Once the buyer has e-signed the contract, then the Seller will e-sign all documents and the contract will be Executed. Then we will open title, and send all documents to buyer, seller, investor or Realtor within 24 business hours of receiving all documents.
                </li>
                <li>
                  The buyer will have 24 business hours to drop off earnest money or Seller has a right to cancel their contract and go with another offer.
                </li>
                <li>
                  All offers must be Cash, Hard Money or Line of Credit. No Conventional/FHA financing.
                </li>
              </ol>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              <FontAwesomeIcon icon={faPlus} /> Closing Made Easy
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="4">
            <div>
              <ol>
                <li>
                  We ask all Sellers to open title with Preferred title company within 7 days of auction start date of property, so that title company can verify that they can issue title.
                </li>
                <li>
                  Our goal is to make closing a smooth process, and we are committed to helping you get the title cleared so that there’s no issues in closing. It’s better to know on the front end than finding out on the back end that there’s problems.
                </li>
                <li>
                  Closing must take place within 7 to 21 days, subject to clear title & survey.
                </li>
                <li>
                  If there’s any title issues that would prevent the property from closing then all parties are notified. Then the contract can be cancelled by buyer or they can extend the closing until the seller can obtain clear title. Seller must extend the executed contract if the property doesn’t close due to no fault of the buyer for up to 6 months.
                </li>
                <li>
                  Title Company will get all payoffs including mortgages, liens, taxes & HOA dues to verify if they can offer clear title. Then they will ask buyer if they want to order survey or use an acceptable survey provided by seller. If not, then buyer will have to sign that they don’t want a survey. Or one will be ordered by title company and paid by the buyer.
                </li>
                <li>
                  Then title company will provide Closing Disclosures to the Buyer, Seller, Investor and/or Real Estate Agent, and set up closing.
                  
                </li>
              </ol>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    )
  }
}
