import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SellerOverview from './seller.js';
import BuyerOverview from './buyer.js';
import AskQuestion from './ask_question';

export default class HowWorksSidebar extends Component{
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
      case 'buyer_how_works':
        return <BuyerOverview/>;
      case 'seller_how_works':
        return <SellerOverview/>;
      case 'ask_question_how_works':
        return <AskQuestion/>;
      default:
    }
  }
  render(){
    return(
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane show active" id="helpful_info" role="tabpanel" aria-labelledby="helpful_info">
          <div className="help_us row mx-0">
            <div className="col-md-3 px-0">
              <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
                <li className="nav-item">
                  <Link to="/how-everything-works/seller" className={this.checkActive("seller_how_works")} >Seller Overview</Link>
                  {/* <a className="nav-link active" id="deal-qualify" data-toggle="tab" href="#deal-qualify" role="tab" aria-controls="deal-qualify" aria-selected="true">Does your Deal qualify to Auction?</a> */}
                </li>
                <li className="nav-item">
                  <Link className={this.checkActive("buyer_how_works")} id="upper-deals" data-toggle="tab" to="/how-everything-works/buyer" role="tab" aria-controls="upper-deals" aria-selected="false">Buyer Overview</Link>
                </li>
                <li className="nav-item">
                  <Link className={this.checkActive("landlord_analyzer")} id="landlord-analyzer" data-toggle="tab" to="#" role="tab" aria-controls="landlord-analyzer" aria-selected="false">Hardmoney</Link>
                </li>
                <li className="nav-item">
                  <Link className={this.checkActive("confident_deal")} id="deal-analysis" data-toggle="tab" to="#" role="tab" aria-controls="deal-analysis" aria-selected="false">Resources</Link>
                </li>
                <li className="nav-item">
                  <Link className={this.checkActive("ask_question_how_works")} id="deal-week" data-toggle="tab" to="/how-everything-works/ask-us-question" role="tab" aria-controls="deal-week" aria-selected="false">Ask us Question</Link>
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
    )
  }
}
