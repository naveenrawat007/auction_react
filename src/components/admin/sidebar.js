import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faBell, faSearch } from '@fortawesome/free-solid-svg-icons'
import UserList from './user/user_list.js'
import PropertyList from './property/index.js'

export default class AdminSidebar extends Component{

  constructor(props) {
    super(props);
    this.state = {
      path: props.path
    }
  }
  componentDidMount = () => {
  }
  renderSwitch = () => {
    switch (this.state.path) {
      case 'all_users_list':
        return <UserList/>;
      case 'under_review_property_list':
        return <PropertyList path="under_review_property_list"/>;
      case 'best_offer_property_list':
        return <PropertyList path="best_offer_property_list"/>;
      case 'live_bidding_property_list':
        return <PropertyList path="live_bidding_property_list"/>;
      case 'post_auction_property_list':
        return <PropertyList path="post_auction_property_list"/>;
      case 'pending_property_list':
        return <PropertyList path="pending_property_list"/>;
      case 'hold_property_list':
        return <PropertyList path="hold_property_list"/>;
      case 'sold_property_list':
        return <PropertyList path="sold_property_list"/>;
      case 'terminated_property_list':
        return <PropertyList path="terminated_property_list"/>;
      default:
    }
  }

  handleLogout = () => {
    localStorage.removeItem("auction_user_token");
    window.location.href = "/login"
  }

  checkActive = (current_path) => {
    if (this.state.path.endsWith(current_path)){
      return "nav-link active"
    }else {
      return "nav-link";
    }
  }
  render(){
    return (
      <div className="profile-setting mt-0">
        <div className="container-fluid admin_container">
          <div className="row mx-0 header-admin">
            <div className="col-md-2">
              <div className="Administrator-box">
                <span>A</span>
                <p>Administrator</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2"><FontAwesomeIcon icon={faSearch} size="1x" /></span>
                </div>
              </div>
            </div>
            <div className="col-md-1 offset-md-3">
              <div className="notify-box">
                <FontAwesomeIcon icon={faBell} size="1x" style={{ color: 'white' }} />
                <p>45</p>
              </div>
            </div>
          </div>
          <div className="row mx-0 profile_row">
            <div className="col-md-3 side_tab left_tab px-0">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <a className="nav-link main-nav-link" data-toggle="pill" href="#siteActivity">
                    <span>Site Activity Report</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link main-nav-link" data-toggle="pill" href="#subscriberList">
                    <span>Subscriber List</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <Link className={this.checkActive("users_list")} data-toggle="pill" to="/admin">
                    <span>User List</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/property/under_review" className={this.checkActive("property_list")} >
                    <span>Property Status</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link main-nav-link" data-toggle="pill" href="#terminationRequest">
                    <span>Termination Request</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link main-nav-link" data-toggle="pill" href="#subscriberList">
                    <span>Messaging System</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link main-nav-link" data-toggle="pill" href="#scheduleVisit">
                    <span>Schedule a Visit: (Request)</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link main-nav-link" data-toggle="pill" href="#emailSystem">
                    <span>Email System</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link main-nav-link " data-toggle="pill" href="#emailSystem">
                    <span>Text System</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link main-nav-link" data-toggle="pill" to="#" onClick={this.handleLogout}>
                    <span>Log Out</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-9 right_tab px-0">
              <div className="row mx-0 dashboard-logo">
                <div className="col-md-12 py-3">
                  <img src="/images/Under_review.jpg" alt="logo"/>
                </div>
              </div>
              <div className="tab-content">
                {this.renderSwitch()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
