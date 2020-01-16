import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class TerminationRequestList extends Component{
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
      selected_property: "",
      properties: [],
      search_str: "",
      current_page: 1,
      total_pages: 1,
      page: 1,
      total_pages_array:[],
    }
  }
  componentDidMount () {
    this._isMounted = true;
    this.getPropertiesList();
  }
  getPropertiesList = () => {
    this.setState({
      isLoaded: false,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties?type=termination_request&search_str=" + this.state.search_str + "&page=" + this.state.page
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
            status_modal: false,
            isLoaded: true,
            selected_property: "",
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
  terminateProperty = () => {
    if (this.state.selected_property){
      this.setState({
        isLoaded: false,
      });
      let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties/status"
      const fd = new FormData();
      fd.append('property[id]', this.state.properties[this.state.selected_property].id)
      fd.append('property[status]', this.state.properties[this.state.selected_property].requested_status)
      fd.append('property[termination_reason]', this.state.properties[this.state.selected_property].request_reason)
      fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": localStorage.getItem("auction_admin_token"),
          "Accept": "application/vnd.auction_backend.v1",
          "Access-Control-Allow-Origin": "*",
  				"Access-Control-Allow-Credentials": "*",
  				"Access-Control-Expose-Headers": "*",
  				"Access-Control-Max-Age": "*",
  				"Access-Control-Allow-Methods": "*",
  				"Access-Control-Allow-Headers": "*"
        },
        body: fd,
      }).then(res => res.json())
      .then((result) => {
        if (this._isMounted){
          this.getPropertiesList();
        }
      })
    }
  }
  updateSelectedProperty = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function () {
      this.setState({
        selected_status: this.state.properties[this.state.selected_property].status,
        auction_started_at: this.state.properties[this.state.selected_property].auction_started_at,
        auction_length:  this.state.properties[this.state.selected_property].auction_length,
        termination_reason:  this.state.properties[this.state.selected_property].termination_reason,
      });
    });
  }


	render() {
    const current_page = this.state.current_page;
    const total_pages = this.state.total_pages;
    const propertyList = this.state.properties.map((property, index) => {
      return (
        <tr key={index}>
          <td><input type="radio" value={index} id={index} checked={this.state.selected_property === String(index) ? true : false} name="selected_property" onChange={this.updateSelectedProperty}/></td>
          <td>
            <div className="user_name_box">
              <span>{property.first_name[0].toUpperCase()}</span>
              <p>{property.first_name }</p>
            </div>
          </td>
          <td>{property.owner_category}</td>
          <td>{property.address}</td>
          <td>{property.requested_at}</td>
          <td>{property.request_reason}</td>
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
      <div id="propertyStatus" className="container tab-container px-0">
        <div className="profile-form">
          <div className="prop-bind">
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
                      <button className="btn red-btn admin-btns" type="button" onClick={this.terminateProperty}>Terminate</button>&nbsp;
                    </div>
                  </div>
                  <div className="under_review admin-review loading-spinner-parent">
                    <table className="table table-bordered table-hover review_table property_table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>User Type</th>
                          <th>Property Address</th>
                          <th>Submitted Date</th>
                          <th>Reason</th>
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

          </div>
        </div>
      </div>
    );
	}
}
