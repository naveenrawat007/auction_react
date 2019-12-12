import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AllUserList from './user_list.js'

export default class UserList extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
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
      case 'all_users_list':
        return <AllUserList/>;
      default:
    }
  }

	render() {
		return (
      <div id="userList" className="container tab-container px-0 tab-pane active">
        <div className="profile-form">
          <div className="prop-bind">
            <ul className="nav nav-pills property_tabs px-3">
              <li className="nav-item">
                <Link className={this.checkActive("all_users_list")} data-toggle="pill" to="/admin">All User</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link sub-nav-link" data-toggle="pill" href="#freeUser">Free User</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sub-nav-link" data-toggle="pill" href="#premiumUser">Premium User</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sub-nav-link" data-toggle="pill" href="#banUser">Ban User</a>
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
