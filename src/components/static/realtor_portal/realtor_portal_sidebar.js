import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RealtorMarketingPlatform from './realtor_marketing_platform.js';
import BiddingAgent from './bidding_agent.js';

export default class RealtorPortalSidebar extends Component{
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
      case 'realtor_marketing_platform_realtor_portal':
        return <RealtorMarketingPlatform/>;
      case 'bidding_agent_realtor_portal':
        return <BiddingAgent/>;
      default:
    }
  }
  render(){
    return(
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane show active" id="helpful_info" role="tabpanel" aria-labelledby="helpful_info">
          <div className="help_us row mx-0">
            <div className="col-md-3 px-0">
              <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
                <li className="nav-item">
                  <Link to="/realtor-portal/realtor-marketing-platform" className={this.checkActive("realtor_marketing_platform_realtor_portal")} >Realtor Marketing Platform</Link>
                  {/* <a className="nav-link active" id="deal-qualify" data-toggle="tab" href="#deal-qualify" role="tab" aria-controls="deal-qualify" aria-selected="true">Does your Deal qualify to Auction?</a> */}
                </li>
                <li className="nav-item">
                  <Link className={this.checkActive("bidding_agent_realtor_portal")} id="upper-deals" data-toggle="tab" to="/realtor-portal/bidding-as-an-agent" role="tab" aria-controls="upper-deals" aria-selected="false">Bidding as an Agent</Link>
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
    )
  }
}
