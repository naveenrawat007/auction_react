import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AllCodeList from './code_list.js'
import AvailedCodeList from './availed_code.js'
import UnavailedCodeList from './unavailed_code.js'

export default class PromoCodeList extends Component{
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
      case 'promo_code':
        return <AllCodeList/>
      case 'availed_promo_code':
        return <AvailedCodeList/>
      case 'unavailed_promo_code':
        return <UnavailedCodeList/>
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
                <Link className={this.checkActive("promo_code")} data-toggle="pill" to="/admin/promo_code">All Promo Codes</Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link sub-nav-link" data-toggle="pill" href="#freeUser">Free User</a> */}
                <Link className={this.checkActive("availed_promo_code")} data-toggle="pill" to="/admin/availed_promo_code">Availed Promo Codes</Link>
              </li>
              <li className="nav-item">
                <Link className={this.checkActive("unavailed_promo_code")} data-toggle="pill" to="/admin/unavailed_promo_code">Unavailed Promo Codes</Link>
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
