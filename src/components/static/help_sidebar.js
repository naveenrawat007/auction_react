import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ConfindentDeal from './confident_deal.js';
import HighestBidder from './highest_bidder.js';
import LandlordAnalyzer from './landlord_analyzer.js';
import QualifyDeal from './qualify_deal.js';
import TopReason from './top_reason.js';

export default class HelpSidebar extends Component{
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
  checkActive = (current_path) => {
    if (this.state.path === (current_path)){
      return "nav-link active"
    }else {
      return "nav-link";
    }
  }
  renderSwitch = () => {
    switch (this.state.path) {
      case 'confident_deal':
        return <ConfindentDeal/>;
      case 'highest_bidder':
        return <HighestBidder/>;
      case 'landlord_analyzer':
        return <LandlordAnalyzer/>;
      case 'qualify_deal':
        return <QualifyDeal/>;
      case 'top_reason':
        return <TopReason/>;
      default:
    }
  }
  render(){
    return(
      <div className="static_inner container-fluid home_main px-0">
        <div className="row mx-0">
          <div className="col-md-12 text-center px-0">
            <h2 className="font-red mt-3 mb-4">Auctionmydeal.com Help Section</h2>
          </div>
          <div className="col-md-12 main_help px-0">
            <ul class="nav nav-tabs help_tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link" id="works_tab" data-toggle="tab" href="#works_tab" role="tab" aria-controls="works_tab" aria-selected="true">How Everything Works</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="relator_portal" data-toggle="tab" href="#relator_portal" role="tab" aria-controls="relator_portal" aria-selected="false">Relator Portal</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="faq" data-toggle="tab" href="#faq" role="tab" aria-controls="faq" aria-selected="false">Frequently Asked Questions</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" id="helpful_info" data-toggle="tab" href="#helpful_info" role="tab" aria-controls="helpful_info" aria-selected="false">Helpful Information</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade" id="works_tab" role="tabpanel" aria-labelledby="works_tab">...</div>
              <div class="tab-pane fade" id="relator_portal" role="tabpanel" aria-labelledby="relator_portal">...</div>
              <div class="tab-pane fade" id="faq" role="tabpanel" aria-labelledby="faq">...</div>
              <div class="tab-pane show active" id="helpful_info" role="tabpanel" aria-labelledby="helpful_info">
                <div className="help_us row mx-0">
                  <div className="col-md-3 px-0">
                    <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
                      <li className="nav-item">
                        <Link to="/help" className={this.checkActive("qualify_deal")} >Does your Deal qualify to Auction?</Link>
                        {/* <a className="nav-link active" id="deal-qualify" data-toggle="tab" href="#deal-qualify" role="tab" aria-controls="deal-qualify" aria-selected="true">Does your Deal qualify to Auction?</a> */}
                      </li>
                      <li className="nav-item">
                        <Link className={this.checkActive("top_reason")} id="upper-deals" data-toggle="tab" to="/help/top-15-reasons-to-post-your-wholesale-fixer-upper-deals" role="tab" aria-controls="upper-deals" aria-selected="false">Top 15 Reason to post your wholesale/fixer- upper deals at Auctionmydeal.com</Link>
                      </li>
                      <li className="nav-item">
                        <Link className={this.checkActive("landlord_analyzer")} id="landlord-analyzer" data-toggle="tab" to="/help/free-landlord-analyzer" role="tab" aria-controls="landlord-analyzer" aria-selected="false">Free Landlord Analyzer</Link>
                      </li>
                      <li className="nav-item">
                        <Link className={this.checkActive("confident_deal")} id="deal-analysis" data-toggle="tab" to="/help/free-confidential-deal-analysis/" role="tab" aria-controls="deal-analysis" aria-selected="false">Free Confidential Deal Analysis</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" id="deal-week" data-toggle="tab" to="#" role="tab" aria-controls="deal-week" aria-selected="false">Deal of the Week</Link>
                      </li>
                      <li className="nav-item">
                        <Link className={this.checkActive("highest_bidder")} id="deal-week" data-toggle="tab" to="/help/auction-your-wholesale-deal-to-the-highest-bidder-or-our-affiliate-partner-angel-investors-llc-will-buy-it/" role="tab" aria-controls="deal-week" aria-selected="false">Auction Your Wholesale deal to the Highest bidder of We will Buy it!</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" id="about-us" data-toggle="tab" to="/about" role="tab" aria-controls="about-us" aria-selected="false">About Us</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-9 px-0">
                    <div className="tab-content" id="myTabContent">
                      {this.renderSwitch()}
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
