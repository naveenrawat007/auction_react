import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const initial_state = {
  error: "",
  message: "",
  isLoaded: false,
  users: [],
  search_str: "",
}


export default class UserList extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getUsersListTimeout);
  }
	constructor(props){
    super(props);
    this.state = initial_state;
  }

  getUsersList = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/users?search_str=" + this.state.search_str
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
            isLoaded: true,
            users: result.users
          });
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
  componentDidMount () {
    this._isMounted = true;
    this.getUsersList();

  }

  searchHandler = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function functionName() {
      clearTimeout(this.getUsersListTimeout);
      this.getUsersListTimeout = setTimeout(() => {
        this.getUsersList();
      }, 500);
    });
  }

	render() {
    const userList = this.state.users.map((user, index) => {
      return (
        <tr key={index}>
          <td><input type="checkbox" value="" id="defaultCheck1"/></td>
          <td>
            <div className="user_name_box">
              <span>D</span>
              <p>{user.first_name + user.last_name}</p>
            </div>
          </td>
          <td>{String(user.is_verified)}</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>No</td>
          <td>{user.phone_number}</td>
          <td>{user.email}</td>
        </tr>
      );
    })
		return (
      <div id="userList" className="container tab-container px-0 tab-pane active">
        <div className="profile-form">
          <div className="prop-bind">
            <ul className="nav nav-pills property_tabs px-3">
              <li className="nav-item">
                <Link className="nav-link sub-nav-link active" data-toggle="pill" to="/admin">All User</Link>
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
              <div id="allUser" className="container tab-container px-0 tab-pane active">
                <div className="profile-form">
                  <div className="profile-form-in prop-bind">
                    <div className="search-box row mx-0 pb-3">
                      <div className="col-md-5 px-0">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" name="search_str" onChange={this.searchHandler}/>
                          <div className="input-group-append">
                            <span className="input-group-text red-btn" id="basic-addon1">
                              <FontAwesomeIcon icon={faSearch} size="1x" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 offset-md-2 px-0 text-right">
                        <button className="btn red-btn admin-btns" type="button">View</button>
                        &nbsp;
                        <button className="btn red-btn admin-btns" type="button">Edit</button>
                        &nbsp;
                        <button className="btn red-btn admin-btns" type="button">Control</button>
                      </div>
                    </div>
                    <div className="under_review admin-review">
                      <table className="table table-bordered table-hover review_table alluser_table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Name</th>
                            <th>User Status</th>
                            <th>Subscription</th>
                            <th>Expiration</th>
                            <th>Promo Code</th>
                            <th>User Number</th>
                            <th>User Email</th>
                          </tr>
                        </thead>
                      </table>
                      <div className="under_review_list">
                        <table className="table table-bordered table-hover review_table alluser_table">
                          <tbody>
                            {userList}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
	}
}