import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Profile from './profile.js'
import { faUser, faHome, faPlusCircle, faSearchPlus, faComments, faUnlock, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default class Sidebar extends Component{

  constructor(props) {
    super(props);
    this.state = {
      path: props.path
    }
  }
  renderSwitch = () => {
    switch (this.state.path) {

      case 'user_profile':
        return <Profile/>;
      default:
    }
  }
  render(){
    return (
      <div className="profile-setting">
        <div className="container custom_container px-0">
          <div className="row mx-0 profile_row my-5">
            <div className="col-md-3 side_tab px-0">
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
                  <a className="nav-link" data-toggle="pill" href="#logout">
                    <span><FontAwesomeIcon icon={faUnlock} />  Log out</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
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
