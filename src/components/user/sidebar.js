import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Profile from './profile.js'
import { faUser, faHome, faPlusCircle, faSearchPlus, faComments, faUnlock, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default class Sidebar extends Component{
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
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
          });
        }
      }
    })
  }
  componentDidMount () {
    this._isMounted = true;
    this.changeImage()
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
  render(){
    return (
      <div className="profile-setting">
        <div className="container custom_container px-0">
          <div className="row mx-0 profile_row my-5">
            <div className="col-md-3 user_side_tab side_tab px-0">
              <div className="account-head">
                <div className="account-image">
                  <img src={this.state.user_image ? this.state.user_image : "images/default-profile-img.png"} alt="profile"/>
                </div>
                <div className="account-data">
                  <h5>{this.userFirstName()} {this.userLastName()}</h5>
                  <p className="font-red text-uppercase">Premium User</p>
                </div>
              </div>
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="pill" href="#myProfile">
                    <span><FontAwesomeIcon icon={faUser} /> My Profile</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " data-toggle="pill" href="#myproperties">
                    <span><FontAwesomeIcon icon={faHome} /> My Properties</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#newproperty">
                    <span><FontAwesomeIcon icon={faPlusCircle} />  Add New Property</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#watchProperty">
                    <span><FontAwesomeIcon icon={faSearchPlus} />  Watch Property</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="chat.html">
                    <span><FontAwesomeIcon icon={faComments} />  Messages</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" data-toggle="pill" onClick={this.handleLogout} to="#">
                    <span><FontAwesomeIcon icon={faUnlock} />  Log out</span>
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
