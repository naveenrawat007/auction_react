import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {Link} from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class UnderReview extends Component{
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
      properties: [],
      search_str: "",
      current_page: 1,
      total_pages: 1,
      page: 1,
      total_pages_array:[]
    }
  }

  getPropertiesList = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties?search_str=" + this.state.search_str + "&page=" + this.state.page
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
            properties: result.properties,
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
          window.scroll(0,0);
        }else if (result.status === 401) {
          localStorage.removeItem("auction_user_token");
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
  componentDidMount () {
    this._isMounted = true;
    this.getPropertiesList();

  }

  searchHandler = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function functionName() {
      clearTimeout(this.getPropertiesListTimeout);
      this.getPropertiesListTimeout = setTimeout(() => {
        this.getPropertiesList();
      }, 500);
    });
  }
  refreshList = (event) => {
    let page_number = event.target.getAttribute("page_number")
    this.setState({
      page: page_number
    }, function () {
      if (parseInt(this.state.page) !== parseInt(this.state.current_page) ){
        this.getPropertiesList();
      }
    });
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


	render() {
    const current_page = this.state.current_page;
    const total_pages = this.state.total_pages;
    const propertyList = this.state.properties.map((property, index) => {
      return (
        <tr key={index}>
          <td><input type="checkbox" value="" id={index}/></td>
          <td>
            <div className="user_name_box">
              <span>{property.first_name[0].toUpperCase()}</span>
              <p>{property.first_name }</p>
            </div>
          </td>
          <td>{property.user_type}</td>
          <td>{property.address}</td>
          <td>{property.submitted_date}</td>
          <td>{property.auction_started_at}</td>
          <td>{property.auction_length}</td>
          <td>-24:00</td>
        </tr>
      );
    })
    const pagination = this.state.total_pages_array.map((page, index) => {
      return (
        <button className={this.checkActiveClass(page, current_page)} key={index} onClick={this.refreshList} page_number={page}>{page}</button>
      );
    })
    const prev_page = <> <button className="pagination-btn btn" onClick={this.refreshList} page_number={this.getPreviousPage(current_page)}>Prev</button> </>
    const next_page = <> <button className="pagination-btn btn" onClick={this.refreshList} page_number={this.getNextPage(current_page, total_pages)}>Next</button> </>
		return (
      <div id="underReview" className="container tab-container px-0 active">
        <div className="profile-form">
          <div className="profile-form-in prop-bind">
            <div className="search-box row mx-0 pb-3">
              <div className="col-md-4 px-0">
                <div className="input-group">
                  <input type="text" name="search_str" onChange={this.searchHandler} className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1"/>
                  <div className="input-group-append">
                    <span className="input-group-text red-btn" id="basic-addon1">
                      <FontAwesomeIcon icon={faSearch} size="1x" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-5 offset-md-3 px-0 text-right">
                <button className="btn red-btn admin-btns" type="button">View</button>&nbsp;
                <button className="btn red-btn admin-btns" type="button">Edit</button>&nbsp;
                <button className="btn red-btn admin-btns" type="button">Message</button>&nbsp;
                <button className="btn red-btn admin-btns" type="button">Change Status</button>
              </div>
            </div>
            <div className="under_review admin-review">
              <table className="table table-bordered table-hover review_table property_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>User Type</th>
                    <th>Property Address</th>
                    <th>Submitted Date</th>
                    <th>Auction Date</th>
                    <th>Auction Length</th>
                    <th>Approve Timer</th>
                  </tr>
                </thead>
              </table>
              <div className="under_review_list">
                <table className="table table-bordered table-hover review_table property_table">
                  <tbody>
                    {propertyList}
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
    )
	}
}
