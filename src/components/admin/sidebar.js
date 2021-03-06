import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import UserList from './user/index.js';
import PropertyList from './property/index.js';
import TerminationRequestList from './termination/index.js';
import AdminChatList from './chat/index.js';
import AdminActivityList from './activity/index.js';
import NotificationConnection from './notification_connection.js';
import EmailSystem from './email_system/index.js';
import TextSystem from './text_system/index.js';
import SubscriberList from './subscriber/index.js';
import PromoCodeList from './promo_code/index.js';


export default class AdminSidebar extends Component{

  constructor(props) {
    super(props);
    this.state = {
      path: props.path,
      notifications: [],
      current_page : 1,
      notifications_count: 0,
      page: 1,
      total_pages : 1
    }
  }
  componentDidMount = () => {
    this._isMounted = true
    this.getNotificationList();
    this.chatConnection = new NotificationConnection(this.addNewNotification).createRoomConnection()
  }
  getNotificationList = () => {
    this.setState({
      isLoaded: false ,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/activities?type=notification&page=" + this.state.page
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_admin_token"),
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
          if (result.activities.length > 0){
            let notifications = this.state.notifications
            notifications.push(...result.activities)
            this.setState({
              isLoaded: true,
              notifications: notifications,
              notifications_count: result.activites_count,
              current_page : result.meta.current_page,
              total_pages : result.meta.total_pages,
            });
            let items = []
            for (let number = 1; number <= this.state.total_pages; number++) {
              items.push(number)
            }
            this.setState({
              total_pages_array: items,
            });
          }
        }else if (result.status === 401) {
          localStorage.removeItem("auction_admin_token");
          window.location.href = "/login"
        }else {
          this.setState({
            variant: "danger",
            message: result.message
          });
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);
        }
      }
    })
  }
  renderSwitch = () => {
    switch (this.state.path) {
      case 'free_users_list':
        return <UserList path="free_users_list"/>;
      case 'premium_users_list':
        return <UserList path="premium_users_list"/>;
      case 'ban_users_list':
        return <UserList path="ban_users_list"/>;
      case 'all_users_list':
        return <UserList path="all_users_list"/>;
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
      case 'termination_request_list':
        return <TerminationRequestList/>;
      case 'admin_chat':
        return <AdminChatList/>;
      case 'admin_activity_list':
        return <AdminActivityList/>;
      case 'subscriber_list':
        return <SubscriberList/>;
      case 'email_system':
        return <EmailSystem/>;
      case 'text_system':
        return <TextSystem/>;
      case 'promo_code':
        return <PromoCodeList path="promo_code"/>;
      case 'availed_promo_code':
        return <PromoCodeList path="availed_promo_code"/>;
      case 'unavailed_promo_code':
        return <PromoCodeList path="unavailed_promo_code"/>;
      default:
    }
  }

  handleLogout = () => {
    localStorage.removeItem("auction_user_token");
    localStorage.removeItem("auction_admin_token");
    window.location.href = "/login"
  }
  addNewNotification = (data) => {
    if (this._isMounted == true){
      let notifications = this.state.notifications;
      notifications.unshift(data)
      this.setState({
        notifications_count: (this.state.notifications_count+1),
        notifications: notifications
      })
    }
  }

  checkActive = (current_path) => {
    if (this.state.path.endsWith(current_path)){
      return "nav-link active"
    }else {
      return "nav-link";
    }
  }
  sendReadReq = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/activities"
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_admin_token"),
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

        }else if (result.status === 401) {
          localStorage.removeItem("auction_admin_token");
          window.location.href = "/login"
        }else {
          this.setState({
            variant: "danger",
            message: result.message
          });
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);
        }
      }
    })
  }
  showNotificatioList = () => {
    if (document.getElementsByClassName('notificationContainer')[0]){
      document.getElementsByClassName('notificationContainer')[0].classList.toggle("d-none")
      this.sendReadReq()
      this.setState({
        notifications_count: 0,
      })
    }
  }
  getOldNotifications = () => {
    if (document.getElementById('n_list_box')){
      if (document.getElementById('n_list_box').scrollTop !== 0){
        if (document.getElementById("n_list_box").scrollTop + document.getElementById("n_list_box").clientHeight === document.getElementById("n_list_box").scrollHeight )
        this.setState({
          page: (this.state.page+1)
        }, function () {
          this.getNotificationList();
        });
      }
    }
  }

  render(){
    const notifications_list = this.state.notifications.map((notification, index)=>{
      return (
        <li key={index}>{notification.description}</li>
      );
    })
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
              <div className="notify-box" onClick={this.showNotificatioList}>
                <FontAwesomeIcon icon={faBell} size="1x" style={{ color: 'white' }} />
                <p>{this.state.notifications_count}</p>
              </div>
              <div className="notificationContainer d-none" onScroll={this.getOldNotifications}>
                <div className="notificationTitle">Notifications</div>
                <div id="n_list_box">
                {
                  this.state.notifications.length > 0 ?
                  <ul className="px-2 mb-0">
                  {notifications_list}
                  </ul>
                  :
                  <div className="text-center">
                  No any recent Notification
                  </div>
                }
                </div>
                <div className="notificationFooter"></div>
              </div>
            </div>
          </div>
          <div className="row mx-0 profile_row">
            <div className="col-md-3 side_tab left_tab px-0">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <Link to="/admin/site-activity" className={this.checkActive("admin_activity_list")} >
                    <span>Site Activity Report</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/admin/subscriber_list" className={this.checkActive("subscriber_list")}>
                    <span>Subscriber List</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin" className={this.checkActive("users_list")}>
                    <span>User List</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/promo_code" className={this.checkActive("promo_code")}>
                    <span>Promo Codes</span>
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
                  <Link to="/admin/termination_request" className={this.checkActive("termination_request_list")} >
                    {/* <a className="nav-link main-nav-link" data-toggle="pill" href="#terminationRequest"> */}
                    <span>Termination Request</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/chat" className="nav-link main-nav-link"  >
                    <span>Messaging System</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link main-nav-link" href="#scheduleVisit">
                    <span>Schedule a Visit: (Request)</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/admin/email-system" className={this.checkActive("email_system")}  >
                    <span>Email System</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/text-system" className={this.checkActive("text_system")}>
                    {/* <a className="nav-link main-nav-link " data-toggle="pill" href="#emailSystem"> */}
                    <span>Text System</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link main-nav-link" to="#" onClick={this.handleLogout}>
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
