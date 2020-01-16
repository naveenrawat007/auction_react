import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Profile from './profile.js'
import { faChevronCircleDown, faList, faCreditCard, faHome, faPlusCircle, faHeart, faEnvelopeOpenText, faSignOutAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'
// import NewProperty from './property/new'
import ListProperty from './property/index'
import WatchProperty from './property/watch_property.js'
import ListOfferProperty from './property/offers.js'
import ListBidProperty from './property/bids.js'
import ListBuyNowProperty from './property/buy_now.js'

export default class Sidebar extends Component{
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      path: props.path,
      user_image: "",
      first_name: "",
      last_name: "",
    }
  }
  changeImage = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/show"
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*"
      }
    }).then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 200){
          this.setState({
            user_image: result.user.user_image,
            first_name: result.user.first_name,
            last_name: result.user.last_name,
          }, function () {
            localStorage.setItem("auction_user_name", this.userFirstName() + " " + this.userLastName());
            localStorage.setItem("auction_user_image", this.state.user_image);
            this.setState({
              loaded: true
            });
          });


        }else if (result.status === 401) {
          localStorage.removeItem("auction_user_token");
          window.location.href = "/login"
        }
      }
    })
  }
  componentDidMount () {
    this._isMounted = true;
    if (!(localStorage.getItem("auction_user_name")) || !(localStorage.getItem("auction_user_image"))){
      this.changeImage()
    }
  }
  componentWillUnmount (){
    this._isMounted = false;
  }
  handleLogout = () => {
    localStorage.removeItem("auction_user_token");
    window.location.href = "/login"
  }
  renderSwitch = () => {
    switch (this.state.path) {

      case 'user_profile':
        return <Profile onImageChange={this.changeImage}/>;
      case 'new_property':
        break;
        // return <NewProperty/>;
      case 'property_list':
        return <ListProperty/>;
      case 'watch_properties_list':
        return <WatchProperty/>;
      case 'offer_properties_list':
        return <ListOfferProperty/>;
      case 'bid_properties_list':
        return <ListBidProperty/>;
      case 'buy_now_properties_list':
        return <ListBuyNowProperty/>;
      default:
    }
  }
  userFirstName = () => {
    if (this.state.first_name){
      return (this.state.first_name[0].toUpperCase() + this.state.first_name.slice(1));
    }
  }
  userLastName = () => {
    if (this.state.last_name){
      return (this.state.last_name[0].toUpperCase() + this.state.last_name.slice(1));
    }
  }

  checkActive = (current_path) => {
    if (this.state.path === current_path){
      return "nav-link active"
    }else {
      return "nav-link";
    }
  }
  render(){
    return (
      <div className="profile-setting">
        <div className="container custom_container px-0">
          <div className="row mx-0 profile_row my-5">
            <div className="col-md-3 user_side_tab side_tab px-0">
              <div className="account-head">
                <div className="account-image">
                  <img src={localStorage.getItem("auction_user_image") ? localStorage.getItem("auction_user_image") : "/images/default-profile-img.png"} alt="profile"/>
                </div>
                <div className="account-data">
                  <h5>{localStorage.getItem("auction_user_name")}</h5>
                  <p className="font-red text-uppercase">Premium User</p>
                  <button className="btn collapse_btn" data-toggle="collapse" data-target="#pills"><FontAwesomeIcon icon={faChevronCircleDown} /></button>
                </div>
                <ul className="nav nav-pills mobile-pills collapse" role="tablist" id="pills">
                  <li className="nav-item">
                    <Link to='/user' className={this.checkActive("user_profile")} data-toggle="pill" >
                      <span><FontAwesomeIcon icon={faHome} /> Account Overview</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " data-toggle="pill" href="#availablePlans">
                      <span><i className="fa fa-credit-card" aria-hidden="true"></i> Available Plans</span>
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to='/user/property' className={this.checkActive("property_list")} data-toggle="pill" >
                      <span><FontAwesomeIcon icon={faList} /> My Properties</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/user/property/new' className={this.checkActive("new_property")} data-toggle="pill" href="#newproperty">
                      <span><FontAwesomeIcon icon={faPlusCircle} />  Add New Property</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#watchProperty">
                      <span><i className="fa fa-search-plus" aria-hidden="true"></i> Watch Property</span>
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#messages">
                      <span><i className="fa fa-comments" aria-hidden="true"></i> Messages</span>
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-toggle="pill" onClick={this.handleLogout} to="#">
                      <span><FontAwesomeIcon icon={faSignOutAlt} />  Log out</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </li>
                </ul>
              </div>
              <ul className="nav nav-pills profile-pills" role="tablist">
                <li className="nav-item" >
                  <Link to='/user' className={this.checkActive("user_profile")} data-toggle="pill" >
                    <span><FontAwesomeIcon icon={faHome} /> Account Overview</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link " data-toggle="pill" href="#availablePlans"> */}
                  <Link to='/plans' className={this.checkActive("user_plans")} data-toggle="pill" >
                    <span><FontAwesomeIcon icon={faCreditCard} /> Available Plans</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                    {/* </a> */}
                </li>
                <li className="nav-item">
                  <Link to='/user/property' className={this.checkActive("property_list")} data-toggle="pill" >
                    <span><FontAwesomeIcon icon={faList} /> My Properties</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/user/property/new' className={this.checkActive("new_property")} data-toggle="pill" href="#newproperty">
                    <span><FontAwesomeIcon icon={faPlusCircle} />  Add New Property</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/user/watch_properties' className={this.checkActive("watch_properties_list")} data-toggle="pill" href="#newproperty">
                    <span><FontAwesomeIcon icon={faHeart} />  Watch Property</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="chat.html">
                    <span><FontAwesomeIcon icon={faEnvelopeOpenText} />  Messages</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" data-toggle="pill" onClick={this.handleLogout} to="#">
                    <span><FontAwesomeIcon icon={faSignOutAlt} />  Log out</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-9 px-0">
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
