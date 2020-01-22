import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class HelpSidebar extends Component{
  _isMounted = false
  render(){
    return(
      <div className="container-fluid home_main px-0">
      	<div className="help_us row mx-0">
      		<div className="col-md-3 px-0">	
	      		<ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
	      			<h4 className="text-center">Helpful Information</h4>
						  <li className="nav-item">
						    <a className="nav-link active" id="deal-qualify" data-toggle="tab" href="#deal-qualify" role="tab" aria-controls="deal-qualify" aria-selected="true">Does your Deal qualify to Auction?</a>
						  </li>
						  <li className="nav-item">
						    <a className="nav-link" id="upper-deals" data-toggle="tab" href="#upper-deals" role="tab" aria-controls="upper-deals" aria-selected="false">Top 15 Reason to post your wholesale/fixer- upper deals at Auctionmydeal.com</a>
						  </li>
						  <li className="nav-item">
						    <a className="nav-link" id="landlord-analyzer" data-toggle="tab" href="#landlord-analyzer" role="tab" aria-controls="landlord-analyzer" aria-selected="false">Free Landlord Analyzer</a>
						  </li>
						  <li className="nav-item">
						    <a className="nav-link" id="deal-analysis" data-toggle="tab" href="#deal-analysis" role="tab" aria-controls="deal-analysis" aria-selected="false">Free Confidential Deal Analysis</a>
						  </li>
						  <li className="nav-item">
						    <a className="nav-link" id="deal-week" data-toggle="tab" href="#deal-week" role="tab" aria-controls="deal-week" aria-selected="false">Deal of the Week</a>
						  </li>
						  <li className="nav-item">
						    <a className="nav-link" id="highest-bidder" data-toggle="tab" href="#highest-bidder" role="tab" aria-controls="highest-bidder" aria-selected="false">Auction Your Wholesale deal to the Highest bidder of We will Buy it!</a>
						  </li>
						  <li className="nav-item">
						    <a className="nav-link" id="about-us" data-toggle="tab" href="#about-us" role="tab" aria-controls="about-us" aria-selected="false">About Us</a>
						  </li>
						</ul>
					</div>
					<div className="col-md-9 px-0">
						<div className="tab-content" id="myTabContent">
						  <div className="tab-pane show active" id="deal-qualify" role="tabpanel" aria-labelledby="deal-qualify">
						  	<h3>Does Your Property Qualify to Auction?</h3>
						  	<p>Get a FREE Evaluation to see if your deal would be good enough for an Investor?</p>
								<p>We only let members post a deal if the property can be bought at or below 70% to 85% ARV (after rehab value).</p>

								<p>Most investors aren’t going to pay over 70% to 75% ARV if they want to fix and flip a property, because there’s not enough potential profit for the risk of rehabbing.</p>

								<p>Investors always have to consider their buying costs (1% to 4%), selling costs 1% to 8% and holding costs (2% to 3%) (utilities, taxes, insurance, hoa, etc). These costs can range from approximately 4% to 15% depending on if paying cash vs financing, if there’s any commissions paid to sell and how long it takes to turn the rehab into a closing. All of these hidden & unknown fees can make or break a deal</p>

								<p>This is the reason it’s too risky for an Investor to pay over 75% ARV, because they could be wrong about their ARV and lose money.</p>

								<p>Landlords on the other hand are mainly focused on Cash Flow, so they will sometimes pay up to 85% ARV if the property cash flows. The best cash flowing single family properties are ones that can be bought below $150,000, or any multifamily or commercial properties with a good Cap Rate.</p>

								<p>Our Goal is to create a Real Estate Investor Marketplace that helps wholesalers get their highest and best price while providing a great deal for another investor looking for a good Investment.</p>

								<p className="mb-5">AuctionMyDeal.com is a local real estate investors platform to sell or buy properties that are represent a good deal. All investors know</p>	
						  </div>
						  <div className="tab-pane fade" id="upper-deals" role="tabpanel" aria-labelledby="upper-deals">
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
						  <div className="tab-pane fade" id="landlord-analyzer" role="tabpanel" aria-labelledby="landlord-analyzer">
						  	<h3>Landlord Analyzer</h3>
						  	<img src="/images/sample.jpg" alt=""/>
						  </div>
						  <div className="tab-pane fade" id="deal-analysis" role="tabpanel" aria-labelledby="deal-analysis">
						  	<h3>FREE Confidential Deal Analysis</h3>
						  	<p className="font-darkred">FREE Confidential Deal Analysis by one of our Experts who will provide you with the following:</p>
								<p className="font-darkred">Within 24 hours:</p>
								<ul>
									<li> Help you determine if your deal is good enough for a Rehabber or a Landlord. You will get a detailed Analysis by one of our Experts to help you determine if your deal is really a Deal or Not?</li>
								</ul>
								<p>Don’t get stuck with a deal you can’t sell.</p>
								<p className="font-darkred">If your deal could be a good deal for a Rehabber or Landlord then we will provide you with the following within 48 hours:</p>
								<ul>
									<li>Best Sold and Leased Comps for your property to help you determine your Best ARV (after rehab value).</li>
									<li>Provide you with Rehab Estimator to help you ballpark your rehab numbers to make your deal more credible.</li>
									<li>Help you determine if your deal is good for a Rehabber or a Landlord, Or Both. Our Deal Analyzer will help you figure out how to best market your Deal.</li>
									<li>Give you the Best 7 Marketing Tips to help you sell Your Wholesale Deals Fast.</li>
									<li>Get your Deal Hard Money Approved to attract more Bidders.</li>
									<li>Provide you with a Marketing Tool that will help you get your Highest & Best Price for all of your Deals by auctioning it off to the Highest Bidder.</li>
								</ul>
								<p className="font-darkred">If you let us get your deal hard money approved and you agree to use our FREE Auction Platform to help you get your Highest and Best Price then we will do the following within 36 hours:</p>
								<ul>
									<li> Take the best 10 to 20 pictures of your property. (pictures are worth a 1,000 words)</li>
									<li> Shoot a 3 to 5 minute video of your property to showcase your deal on all appropriate Marketing Platforms. (videos are priceless)</li>
									<li> Post Your Deal on our Facebook, Twitter, YouTube, Instagram, Google+, and give you the link to post anywhere you deem appropriate.</li>
									<li> Provide LARGE Auction sign to put on your property when appropriate to attract MORE Bidders.</li>
								</ul>
								<h3 className="text-center font-darkred">Our Goal is to be your #1 Marketing Partner to give Your deal Maximum Visibility to get your Highest & Best Price!</h3>
								<p className="text-center">To Learn more, go to www.AuctionMyDeal.com/FreeInvestorMarketing</p>
						  </div>
						  <div className="tab-pane fade" id="highest-bidder" role="tabpanel" aria-labelledby="highest-bidder">
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
						</div>
					</div>
      	</div>
      </div>
    )
  }
}
