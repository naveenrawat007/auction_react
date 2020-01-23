import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HelpSidebar from './help/help_sidebar.js';
import HowWorksSidebar from './how_works/how_works_sidebar.js';
import RealtorPortalSidebar from './realtor_portal/realtor_portal_sidebar.js';

export default class TopSidebar extends Component{
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
    if (this.state.path.endsWith(current_path)){
      return "nav-link active"
    }else {
      return "nav-link";
    }
  }
  renderSwitch = () => {
    switch (this.state.path) {
      case 'confident_deal_help':
        return <HelpSidebar path="confident_deal"/>;
      case 'highest_bidder_help':
        return <HelpSidebar path="highest_bidder"/>;
      case 'landlord_analyzer_help':
        return <HelpSidebar path="landlord_analyzer"/>;
      case 'qualify_deal_help':
        return <HelpSidebar path="qualify_deal"/>;
      case 'top_reason_help':
        return <HelpSidebar path="top_reason"/>;
      case 'seller_how_works':
        return <HowWorksSidebar path="seller_how_works"/>;
      case 'buyer_how_works':
        return <HowWorksSidebar path="buyer_how_works"/>;
      case 'realtor_marketing_platform_realtor_portal':
        return <RealtorPortalSidebar path="realtor_marketing_platform_realtor_portal"/>;
      case 'bidding_agent_realtor_portal':
        return <RealtorPortalSidebar path="bidding_agent_realtor_portal"/>;
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
            <ul className="nav nav-tabs help_tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <Link className={this.checkActive("how_works")} id="works_tab" data-toggle="tab" to="/how-everything-works/seller" role="tab" aria-controls="works_tab" aria-selected="true">How Everything Works</Link>
              </li>
              <li className="nav-item">
                <Link className={this.checkActive("realtor_portal")} id="relator_portal" data-toggle="tab" to="/realtor-portal/realtor-marketing-platform" role="tab" aria-controls="relator_portal" aria-selected="false">Relator Portal</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="faq" data-toggle="tab" href="#faq" role="tab" aria-controls="faq" aria-selected="false">Frequently Asked Questions</a>
              </li>
              <li className="nav-item">
                <Link className={this.checkActive("help")} id="helpful_info" data-toggle="tab" to="/help" role="tab" aria-controls="helpful_info" aria-selected="false">Helpful Information</Link>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              {this.renderSwitch()}
            </div>
          </div>
        </div>

      </div>
    )
  }
}
