import React, {Component} from 'react';

export default class QualifyDeal extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane show active" id="deal-qualify" role="tabpanel" aria-labelledby="deal-qualify">
        <h3 className="font-darkred mt-3">Does Your Property Qualify to Auction?</h3>
        <p>Get a FREE Evaluation to see if your deal would be good enough for an Investor?</p>
        <p>We only let members post a deal if the property can be bought at or below 70% to 85% ARV (after rehab value).</p>

        <p>Most investors aren’t going to pay over 70% to 75% ARV if they want to fix and flip a property, because there’s not enough potential profit for the risk of rehabbing.</p>

        <p>Investors always have to consider their buying costs (1% to 4%), selling costs 1% to 8% and holding costs (2% to 3%) (utilities, taxes, insurance, hoa, etc). These costs can range from approximately 4% to 15% depending on if paying cash vs financing, if there’s any commissions paid to sell and how long it takes to turn the rehab into a closing. All of these hidden & unknown fees can make or break a deal</p>

        <p>This is the reason it’s too risky for an Investor to pay over 75% ARV, because they could be wrong about their ARV and lose money.</p>

        <p>Landlords on the other hand are mainly focused on Cash Flow, so they will sometimes pay up to 85% ARV if the property cash flows. The best cash flowing single family properties are ones that can be bought below $150,000, or any multifamily or commercial properties with a good Cap Rate.</p>

        <p>Our Goal is to create a Real Estate Investor Marketplace that helps wholesalers get their highest and best price while providing a great deal for another investor looking for a good Investment.</p>

        <p className="mb-5">AuctionMyDeal.com is a local real estate investors platform to sell or buy properties that are represent a good deal. All investors know</p>
      </div>
    )
  }
}
