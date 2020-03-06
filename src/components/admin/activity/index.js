import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class AdminActivityList extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
  }
	constructor(props){
    super(props);
    this.state = {
      activities: [],
      error: "",
      message: "",
      isLoaded: false,
      current_page: 1,
      total_pages: 1,
      page: 1,
      total_pages_array: [],
    }
  }
  componentDidMount () {
    this._isMounted = true;
    this.getActivityList()
    window.scroll(0,0);
  }
  getActivityList = () => {
    this.setState({
      isLoaded: false ,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/activities?page=" + this.state.page
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
          this.setState({
            isLoaded: true,
            activities: result.activities,
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
  checkActiveClass = (number, current_page) => {
    if (number === current_page ){
      return("pagination-btn btn active");
    }else{
      return("pagination-btn btn");
    }
  }

  getPreviousPage = (current_page) => {
    if (current_page <= 1){
      return ("1");
    }else{
      return (current_page - 1);
    }
  }
  getNextPage = (current_page, total_pages) => {
    if (current_page < total_pages){
      return (current_page + 1);
    }else{
      return (total_pages);
    }
  }
  refreshList = (event) => {
    let page_number = event.target.getAttribute("page_number")
    this.setState({
      page: page_number
    }, function () {
      if (parseInt(this.state.page) !== parseInt(this.state.current_page) ){
        this.getActivityList();
      }
    });
  }

	render() {
    const activity_list = this.state.activities.map((activity, index) => {
      return (
        <tr key={index}>
          <td>
          </td>
          <td>{activity.user}</td>
          <td>{activity.time}</td>
          <td>{activity.description}</td>
        </tr>
      );
    })
    const current_page = this.state.current_page;
    const total_pages = this.state.total_pages;
    const pagination = this.state.total_pages_array.map((page, index) => {
      return (
        <button className={this.checkActiveClass(page, current_page)} key={index} onClick={this.refreshList} page_number={page}>{page}</button>
      );
    })
    const prev_page = <> <button className="pagination-btn btn" onClick={this.refreshList} page_number={this.getPreviousPage(current_page)}>Prev</button> </>
    const next_page = <> <button className="pagination-btn btn" onClick={this.refreshList} page_number={this.getNextPage(current_page, total_pages)}>Next</button> </>
		return (
      <div id="userList" className="container tab-container px-0 tab-pane active">
        <div className="profile-form">
          <div className="profile-form-in prop-bind">
          {
            /*
            <div className = "search-box row mx-0 pb-3">
            <div className = "col-md-6 px-0">
            <div className = "input-group">
            <input type="text" className = "form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1"/>
            <div className = "input-group-append">
            <span className = "input-group-text red-btn" id="basic-addon1">
            <FontAwesomeIcon icon={faSearch} size="1x" />
            </span>
            </div>
            </div>
            </div>
            </div>
            */
          }
            <div className = "under_review admin-review loading-spinner-parent">
              <table className = "table table-bordered table-hover review_table site_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Last Update</th>
                    <th>Activity</th>
                  </tr>
                </thead>
              </table>
              {this.state.isLoaded === true ?
                null
              :
              <div className="spinner_main">
                <div className="spinner-grow" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              }
              <div className = "under_review_list">
                <table className = "table table-bordered table-hover review_table site_table">
                  <tbody>
                    {activity_list}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-12 text-center my-3">
              {prev_page}{pagination}{next_page}
            </div>
          </div>
        </div>
      </div>
    );
	}
}
