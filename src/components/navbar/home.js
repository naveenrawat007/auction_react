import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faGavel, faHandPointRight} from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

export default class Home extends Component{
  render(){
    return(
      <div className="container-fluid home_main px-0">
        <div className="video_col">
          <div className="arrow">
            <a href="/#"> </a>
          </div>
          <video id="videobcg" preload="auto" autoPlay={true} loop="loop" muted="muted" volume="0">
            <source src="./videos/produce.mp4" type="video/mp4"/>
          </video>
        </div>
        <div className="help_col">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home1.png" alt=""/></div>
                  <h5>TOP 15 REASONS</h5>
                  <p>Top 15 reasons to post your Wholesale/Fixer upper deals at AuctionMyDeal.com</p>
                  <div className="learnmore"><a href="http://auctionmydeal.kaizenwebcraft.com/top-15-reasons">Learn More</a></div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home2.png" alt=""/></div>
                  <h5>LANDLORD ANALYSER</h5>
                  <p>Landlord Analyser is used to show landlords how to levergae Short Term Financing to get a Better Return on their Money</p>
                  <div className="learnmore"><a href="http://auctionmydeal.kaizenwebcraft.com/landlord-analyser">Get Started</a></div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home3.png" alt=""/></div>
                  <h5>GUARANTY SALE PROGRAM</h5>
                  <p>Auction Your Wholesale Deal to the Highest Bidder or Angel Investors, LLC will make you an offer!</p>
                  <div className="learnmore"><a href="http://auctionmydeal.kaizenwebcraft.com/guaranty-sale-program">Learn More</a></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home4.png" alt=""/></div>
                  <h5>FREE EXPERT DEAL ANALYSIS</h5>
                  <p>Great for New Investors or ones wanting a 2nd opinion. Our Experts provide you with the following:</p>
                  <div className="learnmore"><a href="http://auctionmydeal.kaizenwebcraft.com/free-expert-deal-analysis">Free Expert Deal Analysis</a></div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home5.png" alt=""/></div>
                  <h5>Get Approved</h5>
                  <p>Get Approved with Houston’s #1 Hard Money Lender to qualify to buy our Best Auction Deals</p>
                  <div className="learnmore"><a href="http://auctionmydeal.kaizenwebcraft.com/get-approved">Get Started</a></div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="inner_info">
                  <div className="inner_img"><img src="./images/home6.png" alt=""/></div>
                  <h5>Bidders Blueprint</h5>
                  <p>Auctionmydeal.com Blueprint for Bidders</p>
                  <div className="learnmore"><a href="/#">Bidders Blueprint</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="featured_col pb-5">
          <div className="container">
            <h2>Featured Properties</h2>
            <div className="row mx-0">
              <div className="col-sm-3 px-2">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div>
                          <img src="./images/home4.png" alt="" style={{width: "236px", height: "140px" }}/>
                        </div>
                        <h5>24566 Creekwood Drive, Splendora, TX</h5>
                        <p>Great Landlord Opportunity in Splendora, Texas</p>
                      </div>
                      <div className="flip-card-back">
                        <h5>Residential Single Family</h5>
                        <div className="flip-data">
                          <ul className="list-inline">
                            <li className="list-inline-item">After Repaired Value</li>
                            <li className="list-inline-item">$140,000</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Sellers Asking Price</li>
                            <li className="list-inline-item">$49,900</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Estimated Rehab Cost</li>
                            <li className="list-inline-item">$30,000</li>
                          </ul>
                        </div>
                        <ul className="list-inline">
                          <li className="list-inline-item">Potential Profit</li>
                          <li className="list-inline-item">$60,100</li>
                        </ul>
                        <Link to="#" className="details_btn">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 px-2">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div>
                          <img src="./images/home4.png" alt="" style={{width: "236px", height: "140px" }}/>
                        </div>
                        <h5>24414 Pine Canyon Dr, Spring</h5>
                        <p>WOODLANDS/SPRING Landlord Opportunity with Great Cash Flow!</p>
                      </div>
                      <div className="flip-card-back">
                        <h5>Residential Single Family</h5>
                        <p>Great Home to Buy, Rehab & Rent for Excellent CASH Flow*Roof, AC, Heater & ducts less than 6 months old, 2 Master suites, separate studio garage apartment*Property is vacant, text 713-553-1331 to schedule an appt</p>
                        <Link to="#" className="details_btn">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 px-2">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div>
                          <img src="./images/home4.png" alt="" style={{width: "236px", height: "140px" }}/>
                        </div>
                        <h5>3025 Sherwood Forest Drive, Dickinson</h5>
                        <p>GREAT Landlord Opportunity to Buy & Hold!!!</p>
                      </div>
                      <div className="flip-card-back">
                        <h5>Residential Single Family</h5>
                        <div className="flip-data">
                          <ul className="list-inline">
                            <li className="list-inline-item">After Repaired Value</li>
                            <li className="list-inline-item">$140,000</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Sellers Asking Price</li>
                            <li className="list-inline-item">$49,900</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Estimated Rehab Cost</li>
                            <li className="list-inline-item">$30,000</li>
                          </ul>
                        </div>
                        <ul className="list-inline">
                          <li className="list-inline-item">Potential Profit</li>
                          <li className="list-inline-item">$60,100</li>
                        </ul>
                        <Link to="#" className="details_btn">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 px-2">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div>
                          <img src="./images/home4.png" alt="" style={{width: "236px", height: "140px" }}/>
                        </div>
                        <h5>1611 Pannell St, Houston</h5>
                        <p>Great Rehab & Flip or Landlord Property for Excellent Cash Flow</p>
                      </div>
                      <div className="flip-card-back">
                        <h5>Residential Single Family</h5>
                        <div className="flip-data">
                          <ul className="list-inline">
                            <li className="list-inline-item">After Repaired Value</li>
                            <li className="list-inline-item">$140,000</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Sellers Asking Price</li>
                            <li className="list-inline-item">$49,900</li>
                          </ul>
                          <ul className="list-inline">
                            <li className="list-inline-item">Estimated Rehab Cost</li>
                            <li className="list-inline-item">$30,000</li>
                          </ul>
                        </div>
                        <ul className="list-inline">
                          <li className="list-inline-item">Potential Profit</li>
                          <li className="list-inline-item">$60,100</li>
                        </ul>
                        <Link to="#" className="details_btn">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dealofweek">
          <div className="container">
            <div className="row">
              <div className="col-md-6 px-2">
                <iframe width="560" height="315" title="youtube" src="https://www.youtube.com/embed/X080gIJFE3M?controls=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
              </div>
              <div className="col-md-6 px-2 ">
                <div className="pleft80">
                  <h2>Deal of the Week</h2>
                  <p>See if your Deal qualifies to be our next Deal of the Day and we will Help you Market Your Deal for FREE to over 20,000 investors.</p>
                  <Link to="#" className=" apply-btn">Apply Here</Link>
                  <p className="sbold">If your deal qualifies <span>YOU WIN</span> the following</p>
                  <Link to="#" className="freems">FREE Marketing Services</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="invest_col">
          <div className="container">
            <h2>Investor Auctions Made Easy</h2>
            <div className="row">
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner"> <FontAwesomeIcon icon={faSearch} /> </div>
                        <h5>Browse</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>Find a property to bid or buy now,
                        Click the Watch button and the property will be saved to your Watched</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner"><FontAwesomeIcon icon={faGavel} /> </div>
                        <h5>Submit Bid</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>Find the property right for you? Place your bid or make your offer on the property page. Monitor bidding through our buyer dashboard </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner"><FontAwesomeIcon icon={faCreditCard} /> </div>
                        <h5>Buy Now</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>This price is typically higher than what the seller is expecting to get for the property, but it could still be a great deal for a landlord </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner"><FontAwesomeIcon icon={faHandPointRight} /></div>
                        <h5>Close</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>If your offer is accepted, you’ll either work with our team or your agent to coordinate document signing and the closing date.</p>
                      </div>
                    </div>
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
