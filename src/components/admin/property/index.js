import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UnderReview from './under_review.js'
import BestOffer from './best_offer.js'
import LiveBidding from './live_bidding.js'
import PostAuction from './post_auction.js'

export default class PropertyList extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getPropertiesListTimeout);
  }
	constructor(props){
    super(props);
    this.state = {
      path: props.path,
      error: "",
      message: "",
      isLoaded: false,
    }
  }
  componentDidMount () {
    this._isMounted = true;
    window.scroll(0,0);
  }
  checkActive = (current_path) => {
    if (this.state.path === current_path){
      return "nav-link active"
    }else {
      return "nav-link";
    }
  }
  renderSwitch = () => {
    switch (this.state.path) {
      case 'under_review_property_list':
        return <UnderReview/>;
      case 'best_offer_property_list':
        return <BestOffer/>;
      case 'live_bidding_property_list':
        return <LiveBidding/>;
      case 'post_auction_property_list':
        return <PostAuction/>;
      default:
    }
  }

	render() {
		return (
      <div id="propertyStatus" className="container tab-container px-0">
        <div className="profile-form">
          <div className="prop-bind">
            <ul className="nav nav-pills property_tabs px-3">
              <li className="nav-item">
                <Link to="/admin/property/under_review" className={this.checkActive("under_review_property_list")} >Under Review</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/property/best_offer" className={this.checkActive("best_offer_property_list")} >Best Offer</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/property/live_bidding" className={this.checkActive("live_bidding_property_list")}>Live Online Bidding</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/property/post_auction" className={this.checkActive("post_auction_property_list")}>Post Auction</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="pill" href="#pending">Pending</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="pill" href="#sold">Sold</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="pill" href="#hold">Hold</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="pill" href="#terminated">Terminated</a>
              </li>
            </ul>
            <div className="tab-content">
              {this.renderSwitch()}
            </div>
          </div>
        </div>
      </div>
    );
	}
}
