import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HelpSidebar from './help/help_sidebar.js';


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
                <a className="nav-link" id="works_tab" data-toggle="tab" href="#works_tab" role="tab" aria-controls="works_tab" aria-selected="true">How Everything Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="relator_portal" data-toggle="tab" href="#relator_portal" role="tab" aria-controls="relator_portal" aria-selected="false">Relator Portal</a>
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
