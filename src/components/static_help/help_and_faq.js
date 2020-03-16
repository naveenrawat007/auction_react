import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./help.css"
export default class HelpAndFaq extends Component{
  _isMounted = false
  componentDidMount(){
    window.scroll(0,0)
  }
  render(){
    return(
    	<div className="bg_white">
        <div className="container custom_container row about_main px-5 mx-auto py-5">
          <div className="col-md-12 px-0">
            <div className="faq_heading text-left">
              <h4 className="mb-4">Frequently Asked Questions</h4>
            </div>
            <div className="tab-content py-5" id="myTabContent">
              <div className="tab-pane show active faq_navtabs" id="helpful_info" role="tabpanel" aria-labelledby="helpful_info">
                <div className="row mx-0">
                  <div className="col-md-9 pl-0">
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane show active">
                        <div className="faq_rows">
                          <h6>About AuctionMyDeal.com</h6>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What is AuctionMyDeal.com
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>AuctionMyDeal.com is one of the only online auction sites designed for real estate investors who want to post their deals for sale on a site that offers online bidding with open, visible competition among other real estate investors looking for great deals to bid on.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Where do these properties come from?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>These properties mainly come from real estate wholesalers looking to assign their interest in their contract to another investor, investors looking to auction off their properties, Realtors who are helping their sellers get rid of their fixer upper properties or properties that are scheduled for tax or mortgage foreclosure, motivated sellers and/or sellers who might not be motivated but they aren't interested in updating their house and looking for any online auction site that can help them get their highest and best price.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <h6>My Account</h6>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>How do I register to be a free member?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>You can register at the top right of the screen.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Do I need to register to make an offer on a property?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Yes, you need to become a free member by registering to verify your credentials to make an offer on a property.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What are the requirements to be a member?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p></p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Why do I need to verify my account after I register?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p> As an online real estate marketplace, it’s imperative that AuctionMyDeal.com knows its buyers and sellers are valid parties who can be contacted during the bidding, offer or closing process. Verification of your account is to help protect your identity and to make sure your account is secure to protect all parties.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What are my options to verify my account?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>AuctionMyDeal.com offers two options to verify your account by email or text to your mobile device.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>How do I change my password?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p></p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <h6>General Questions</h6>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What types of properties should be posted on this site?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Any properties that can be bought below 70% to 85% ARV (after rehab value) minus repairs or have good cash flow for a landlord.  </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Who is this site for?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p> AuctionMyDeal.com is ideal for any investors or sellers who want to wholesale their fixer upper deals to other rehabbers and landlords at a fair price as an investment property.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What type of properties should not be posted on this site?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Properties where the seller is expecting to get top market value.  These properties should be posted on MLS because these properties are ideal for retail buyers.  Unless the seller is motivated and needs to sell fast then this is a great tool to help them close fast and stop the foreclosure.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Why should I post my deals to this site?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>It’s a FREE Online Bidding platform that helps you utilize technology, social media and marketing that will Maximize Your Marketing by making your wholesale deals available to the World so that you will Net MORE Money.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What’s unique about this site over other auction sites except the fact they don’t let you post your deals on their site?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>AuctionMyDeal.com offers 2 Options to sell your properties using our proprietary pre-auction “Best Offer” system and/or “Live Online Auction” platform.  Most wholesalers want to get a property under contract quick.  So our pre auction “Best Offer” system gets bidders to start making offers immediately after a property is posted so they don’t lose the deal and to get it under contract before the auction starts.  If the seller doesn’t accept an offer during the pre-auction “Best Offer” timer then their property will be withdrawn at 8 pm on the date the timer ends, and will be automatically posted on our “Live Online Auction” platform at 8 am the following morning for a shorter time frame to help get it sold for the Highest & Best price.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Once a seller posts a property can they withdraw their property at any time?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Seller may withdraw their property from the “Best Offer” or “Live Online Auction” platform at any time as long as they haven’t accepted an offer to sell their property from a buyer on this site.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What should I do before I make a bid or offer on a property I’m interested in buying?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Do your own due diligence to determine if the property is worth making an offer on based upon what the seller is asking for the property. You can offer as low as 25% of what the sellers starting (reserve) price is or you can choose the sellers “Buy Now” price if you think it’s a good deal at that price.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>How do I get access to a property I’m interested in buying?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>You must be a verified registered member to request access to view a property.  The showing instructions will be at the bottom right of the full property detail page for that property.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Should I inspect the property before making an offer or bid on a property?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Yes, it’s always a good idea to inspect a property before you make an offer to make sure you know what needs to be rehabbed.  Most auctions have no inspection contingency so check the showing instructions on the full property page to view property.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Can I visit a property without setting an appointment if I can’t make the times set for showings?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>No, it would be considered trespassing to visit a property without following the showing instructions set up by seller to view a property listed on this site.  If you can’t make the times to see the property set by seller then request a private showing and it will be set up if available.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Can a seller post a short sale on this site?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>A seller can post a short sale on this site only during “Best Offer” time frame.  This is due to short sales not being able to close for typically 4 to 6 months, so we suggest posting it only to get your Highest & Best Offer so you can help stop the foreclosure process and submit your contract to the bank.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What is a technology fee?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>The technology fee helps cover the cost of using AuctionMyDeal.com’s online bidding platform and is paid by the buyer when they submit their bid if they are the winning bidder.  Currently there is no technology fee being charged during the launch of this website but will be disclosed before it is required.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What computer system is required for bidding?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p> You can use computers and smart phones but it is advisable for your computer system to meet the following requirements:</p>
                                <ul>
                                  <li>Internet Explorer 6.0 or higher or Firefox 1.5 or higher</li>
                                  <li>Adobe Flash Player 8 or higher</li>
                                  <li>Javascript enabled</li>
                                  <li>Adobe Reader</li>
                                  <li>If you are a Mac user, try the Firefox browser.</li>
                                </ul>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <h6>Buyers 5 Phases for Successful Bidding</h6>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What type of due diligence should I do before I make an offer?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Doing your own due diligence is one of the most important steps you can take before buying a property.  If you don’t have your own system you should follow the following phases to determine if you’re interested in making an offer or bid on a property.  You should not rely on what is posted by the seller without verifying their information.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Initial phase due diligence
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Review the property details page to look at what the seller has provided such as general remarks, pictures, video, rehab numbers, sold and/or rental comps and any other information. You should also look at a satellite view of property on the map and zoom down on the location of the property to make sure that it doesn’t have any major location issues that would prevent you from wanting to buy it.  It never hurts to <span className="font-blue">pull up google maps or Google Earth and walk down the street to see what the neighbor looks like.  Beware that these pictures could be several years old, but it helps you determine if there’s any deal killers so you don’t waste your time visiting the property and it only takes a few minutes.</span></p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>2nd Phase Due Diligence
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Research sold and rental comps to determine your ARV (after rehab value), and also research what’s currently active on the market to get a better idea of the supply and demand for the property that you’re considering if it’s a deal or not.  If you’re planning to buy and flip then you want to have a better understanding on what it’s going to take to make your projected profit.  If you’re planning to buy and hold then you want to make sure that the property has good potential for positive cash flow.  You can check out our <span className="font-red">Landlord Analyzer</span> to help you determine the monthly cash flow, total out of pocket and cash on cash ROI potential.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>3rd Phase Due Diligence
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Investigate the property and surrounding neighborhood by driving the area. Check the showing instructions to view and inspect the property when available.  Some properties will be occupied by the owner or tenant and won’t be available to view so you will have to sometimes evaluate the property based upon what you see from the outside and what you learn about the property in the full property page.  You might not want to make an offer unless you are able to inspect the interior and exterior of the property unless you are an experienced investor in the area.  You should also drive by at least your top 3 sold comps in the area to see how they compare to the property you’re considering buying.  Curb appeal means a lot but location, location, location can be even more valuable and you can learn a lot about a properties potential by these top 3 sold comparables.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>4th Phase Due Diligence
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Determine if you’re going to pay cash or use hard or private money?  Most of the deals on this website are posted by wholesalers that want you to close quick and the properties might need too much work for a traditional lender to lend money on the property.  Hard money lenders will lend you up to 70% of the ARV (after rehab value) minus repairs.  If you want to buy and hold some of them can do a one time close that helps you buy, rehab and then refinance you into a conventional loan.  It’s imperative that you get 100% approved for hard money and know that you have the proof of funds to close on the property based upon your offer or bid unless you can pay cash.  You don’t want to waste your time or lose a great deal because you weren’t prepared.  </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Proof of Funds
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Your proof of funds and/or pre-approval letter will be required for you to upload when you make a bid on a property. Proof of Funds will be required whether you are purchasing with cash or obtaining financing. Proof of Funds must be in the form of cash, cash equivalent or readily marketable securities listed on a major exchange (New York Stock Exchange, NASDAQ) and must be available immediately without restrictions. Some examples of acceptable Proof of Funds include: Recent bank statements, Brokerage account statements (stocks, mutual funds, ETFs), Bank letters that confirm your line of credit is approved for a certain dollar amount.  Your or your company’s name need to be on the statement or letter but you should whiteout your account number.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Insurance
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>You should also check the online FEMA Flood maps for your area to make sure the property isn’t in a flood prone area.  If it is then you might want to check flood insurance prices and the type of insurance you should get if you’re the winning bidder.  Most investors have a general idea of these cost are but it’s never a bad idea to make sure the insurance is going to be reasonable.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>5th Phase Due Diligence
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Based upon your outcome of Phase 1 through 4 you need to figure out what you want to offer for the property and what your Maximum Allowable Offer will be.  Your goal is to pay the lowest price you can and it’s important to not go over your Maximum Allowable Offer.  However, if you don’t offer the sellers starting (reserve) price then there’s a good chance you won’t be able to buy the property unless there’s no other offers higher than yours.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <h6>Posting a Property</h6>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What are the requirements to post a property?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <ul>
                                  <li>You must own the property or have legal right to sell it, have an Option to Buy the property with right to assign your contract to another buyer or be a real estate agent who is submitting a listing to auction.</li>
                                  <li>Must be a property that can be bought below market value meaning that if you post a property it should at the very least meet the 70% to 85% ARV (after rehab value) minus repairs. Properties that are posted to this site are typically fixer uppers and/or have a motivated seller where the property would attractive to a real estate investor. </li>
                                  <li>Fill in all required fields including basic remarks, your starting (reserve) price, Buy Now price, uploading at least 6 to 10 pictures of the property, estimated rehab numbers and credible ARV proof for sale &/or lease.  It’s not mandatory but we highly suggest you uploading a 3 to 4 minute video of your property so you’re only showing it to buyers ready to make an offer.</li>
                                  <li>If property is not vacant or needs someone to let them in then it is extremely important to set up 2 to 3 showings during your pre-auction and auction time frame.  </li>
                                  <li>You must have clear title at your title company of choice or we recommend you open with Patten Title Company so they can help you verify they can issue clear title by doing a quick title search.</li>
                                </ul>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Set up your Marketing Plan?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>“If you fail to plan then you’re planning to fail” <span className="font-blue">Marketing is the key to your success</span> in getting your property sold for the Highest & Best price.  You want to make sure that you get your property in front of an many potential buyers as possible using multiple marketing channels such as emailing and/or texting your buyers list, posting on real estate investor Facebook groups, MyHouseDeals.com, Craigslist and any other websites that are for Real Estate Investors. If you own the property you should even consider listing it on MLS since retail buyers will often pay you more money than the average real estate investor.  Maximum Visibility that leads all interested buyers to AuctionMyDeal.com to make their offers will guarantee you net more money. <span className="font-red">Get your “FREE Marketing Checklist” with the Top 7 Marketing Strategies to help you net MORE money when wholesaling your deals.”</span>  If you need help then check out our Marketing Help Section that gives you the tool for Success!!!</p>
                                <p><span className="font-blue">Biggest MISTAKES made by RE Investors</span> is accepting their first offer that they get without Aggressively Marketing your property and getting other real estate investors to compete for your property.  When investors compete you have a much better chance of netting a few thousand to $10,000’s more money for your deal.  Don’t get sucked into accepting less than your property is worth by wholesaling your deals the old school way.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>I’m having problem posting a property so what should I do?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Please contact our Support Team that is here to help you at <a href="#">support@auctionmydeal.com</a> or Click HERE to report error.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <h6>Pre-Auction – Best Offer System</h6>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>When does the pre-auction timer start?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p> Whatever date the seller chooses to start their pre-auction “Best Offer” time frame.  It will be posted immediately after admin approves property if it’s the same day they post their property, but if they chose a day in the future the property will be posted at 8 am in the morning of the date they choose. </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What happens during the pre-auction time frame?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>AuctionMyDeal.com allows bidders to come in with their with their “Best Offer” before the auction starts.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>How does the Best Offer system benefit buyers?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Our “Best Offer” system benefits interested bidders because they are able to make their “Best Offer” and get the property off the market before the auction starts.  </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>How does the Best Offer system work for sellers?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>This benefits the seller because bidders will be motivated to start making offers immediately so they don’t lose opportunity to buy the property or have to compete during the Live Online Auction.  The seller doesn’t have to accept anything but their “Buy Now” price or they can accept any offers or counter offers during this “Best Offer” time frame.  Buyers can’t see what any of the other bidders are offering so it gets them to make whatever offer they seem appropriate without over bidding. </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What price points does a seller decide when they post a property for sale at AuctionMyDeal.com?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>It’s important for a seller to not overprice their property or it will not sell.  When posting your property you will need to determine your “Starting” price which is your “Reserve” price and a “Buy Now” price which allows buyers a guaranteed price the Seller will accept immediately for qualified bidders. </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Why does AuctionMyDeal.com not have a reserve price like most auction sites?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>We feel that it’s important for a buyer to know what the reserve price is because when it’s not disclosed it can be frustrating to not know what you need to offer to be able to buy the property.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What’s the lowest price a buyer can offer during the “Best Offer” time frame?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>They can’t offer less than 25% of the sellers “Starting” price.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What is pre-auction time frame for the “Best Offer” to be submitted?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>The time frame is determined by what the seller chooses from a calendar for the start and end date.  They have a choice between 5 to 15 days, but we suggest at least 7 days so seller can set up a few showing times for the property when possible.  </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What happens if there are no acceptable offers during the pre-auction “Best Offer” time frame?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p> If there are offers the seller will have an option to accept, counter offer or let the property go into the Live Online Auction platform.  </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What time of day does the pre-auction “Best Offer” timer end?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Typically the pre-auction timer will end at 8 pm on the date the seller chooses so that bidders will have time to make their offers.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>How do I know if the seller will accept my offer during the “Best Offer” timer?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>If the seller accepts your offer they will check the accept button which will notify you and send the property to pending status until the seller has verified your proof of funds and/or preapproval status.  Once seller verifies your ability to close they will email you a buyer acceptance agreement where you verify the terms of the contract and the name you want as buyer on the contract.  Once you verify your acceptance then the seller will email you the contract so that it can be executed and where you need to drop off the earnest money.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <h6>Live Online Auction</h6>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>When do properties get posted to the “Live Online Auction” platform
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>The auction timer starts on the date the seller sets or the following morning at 8 am after the Sellers “Best Offer” timer ends without any accepted offers.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Does there have to be a pre-auction “Best Offer” time frame or can a seller post their property to start the “Live Online Auction”?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>No, the seller can choose to post their property where there is not pre-auction time frame and their “Live Online Auction” will start on the date that they choose at 8 am.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What prices for each property do I need to be aware of?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>The seller will post their starting price which is their reserve price, but will also list their “Buy Now” price which gives bidders the ability to take the property off the market immediately by clicking the “Buy Now” price and uploading the required proof of funds and/or pre-approval status. </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What’s the lowest offer I can make when a property is in the Live Online Auction?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Bidders can offer as low as 25% below the Sellers asking price, but the seller doesn’t have to accept anything less than their reserve (starting) price.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What time of day do auctions end?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>The seller can choose a 3 to 10 day auction period.  The auction will end at 8 pm on whatever day the seller chooses.  </p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>During the Live Online Auction what is the lowest price you can offer once there’s been an offer made on the property?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Once a bidder has submitted an offer then all following bids will be able to go up in $1,000 increments, and no offer less than the highest bid will be allowed during the “Live Online Auction” time frame for that property.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Is ghost or shill bidding allowed on behalf of the seller?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>No, AuctionMyDeal.com does not allow the seller or anyone acting on the sellers behalf to make offers to raise the final sales price.  This is not allowed because we believe that it’s unfair and unethical and goes against our policy for auction transparency.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>Does the seller have to approve the Highest Bid?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>No, Sellers can accept, reject or counter offer any offers until they sign a fully executed contract with a buyer.  They should and probably will accept the highest bidder unless there’s another offer with better terms.  Examples would be if seller wasn’t provided with verifiable proof of funds and/or preapproval status of a buyer who is using financing compared to a cash buyer who provides a verifiable proof of funds.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What happens if the auction ends and the starting (reserve) price is not met?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>If an auction ends and the reserve price wasn’t met, then seller reserves the right to accept, counter offer any of the bids below the reserve or relist the property.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What happens to prevent auction sniping where bidders try to come in with a last minute offer in hopes to steal the highest offer position?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>To offer fairness and transparency to all bidders we extend the auction timer 3 minutes when a bidder makes an offer in the last 3 minutes of the auction.  The auction will be extended in 3 minute increments until 3 minutes have passed without bidding activity.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What happens if a buyer submits the “Buy Now” price?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>The property will immediately go to pending status subject to verifying buyers proof of funds and/or preapproval status (if not buying with cash). Once verified seller will contact buyer to finalize their contract, collect earnest money and open title.  If seller is not satisfied with buyers proof of funds and or preapproval status they can choose to request more information or restart the auction without accepting the bidder who submitted their “Buy Now” price.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What happens when the auction timer ends and there is an offer at or above the sellers starting (reserve) price?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>The property will immediately go to pending status subject to verifying highest bidders proof of funds and/or preapproval status (if not buying with cash).  If seller is not satisfied with buyers proof of funds and/or preapproval status then seller has the right to evaluate the next highest offer to determine if they appear to be better qualified.  Once verified seller will contact winning bidder to finalize their contract, collect earnest money and open title.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <h6>Post Auction</h6>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>If I submitted the “Buy Now” price or I was the Highest Bidder at the end of the auction what should I expect?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>Once your proof of funds and/or preapproval status has been verified the seller will be contacting you if they have any questions or to finalize the contract, collect the earnest money so they can open title on the property.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                          <Accordion >
                            <div>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <FontAwesomeIcon icon={faChevronRight}/>What do I need to do once the contract has been executed?
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <div>
                                <p>You will need to make sure that you are prepared to close on time by getting your insurance set up, contact the HOA if you have any questions or if you want to pay for  a resale certificate or HOA documents. If you’re getting financing then you need to make sure that you do whatever it takes to finalize your loan so that you can close on time.</p>
                              </div>
                            </Accordion.Collapse>
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 pr-0 ">
                    <h5>Quick Links</h5>
                    <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" href="#">Help / FAQ</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Terms & Conditions</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Auction Participation Agreement</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Privacy Policy</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Resources</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Financing Options</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Marketing Toolbox</a>
                      </li>
                      <li className="nav-item">
                        <Link to="/about" className="nav-link" >About Us</Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Feedbacks & Questions</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
