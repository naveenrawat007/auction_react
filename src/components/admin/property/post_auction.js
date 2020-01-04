import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
// import {Link} from 'react-router-dom';
import { faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';

export default class PostAuction extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getPropertiesListTimeout);
  }
	constructor(props){
    super(props);
    this.state = {
      offers_modal: false,
      offers_selected_property: "",
      status_modal: false,
      path: props.path,
      selected_property: "",
      selected_status: "",
      termination_reason: "",
      error: "",
      message: "",
      isLoaded: false,
      properties: [],
      search_str: "",
      current_page: 1,
      total_pages: 1,
      page: 1,
      total_pages_array:[],
      property_status_options: [],
      auction_length_options: [],
      auction_started_at: "",
      auction_length: "",
    }
  }

  getPropertiesList = () => {
    this.setState({
      isLoaded: false,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties?status=Post Auction&search_str=" + this.state.search_str + "&page=" + this.state.page
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
            status_modal: false,
            isLoaded: true,
            selected_property: "",
            properties: result.properties,
            property_status_options: result.property_statuses,
            auction_length_options: result.auction_lengths,
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
  updateStatusFields = (event) =>{
    const{ name, value } = event.target;
    console.log(value);
    this.setState({
      [name]: value
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

  updateStatus = () => {
    this.setState({
      isLoaded: false ,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties/status"
    const fd = new FormData();
    fd.append('property[id]', this.state.properties[this.state.selected_property].id)
    fd.append('property[status]', this.state.selected_status)
    fd.append('property[termination_reason]', this.state.termination_reason)
    fd.append('property[auction_started_at]', this.state.auction_started_at)
    fd.append('property[auction_length]', this.state.auction_length)
    fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": localStorage.getItem("auction_user_token"),
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

  updateSelectedProperty = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function () {
      this.setState({
        selected_status: this.state.properties[this.state.selected_property].status,
        auction_started_at: this.state.properties[this.state.selected_property].auction_started_at,
        auction_length:  this.state.properties[this.state.selected_property].auction_length,
      });
    });
  }

  updateSelectedStatus = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  hideModal = () => {
    this.setState({
      status_modal: false,
      auction_started_at: "",
      auction_length: "",
    });
    if (this.state.selected_property !== ""){
      // this.updateStatus();
    }
  }

  openStatusModal = () => {
    this.setState({
      status_modal: true
    });
  }

  editProperty = () => {
    if (this.state.selected_property){
      window.open("/user/property/"+ this.state.properties[this.state.selected_property].unique_address +"/edit", "_blank")
    }
  }

  viewProperty = () => {
    if (this.state.selected_property){
      window.open("/user/property/"+ this.state.properties[this.state.selected_property].unique_address, "_blank")
    }
  }
  updatePropertyAuctionStart = (date) =>{
    if (this._isMounted){
      this.setState({
        auction_started_at: date,
      })
    }
  }
  openOffersModal = (id) => {
    this.setState({
      offers_modal: true,
      offers_selected_property: id,
    });
  }
  closeOffersModal = () => {
    this.setState({
      offers_modal: false,
    });
  }
  offersList = (object) => {
    const offersList = object.map((offer, index) => {
      return (
        <tr key={index}>
          <td>{offer.user_name}</td>
          <td>{offer.type}</td>
          <td>${offer.amount}</td>
          <td>{offer.time}</td>
          <td>Active</td>
        </tr>
      )
    })
    return offersList
  }

	render() {
    const auction_lengths = this.state.auction_length_options.map((value, index) => {
      return(
        <option key={index} value={value} >{value} days</option>
      )
    })
    const status_array = this.state.property_status_options.map((status, index) => {
      return(
        <li className="list-inline-item" key={index}>
          <div className="custom-control custom-radio">
            {
              this.state.selected_property === ""
                ?
                  null
                :
                <>
                  <input type="radio" name="selected_status" value={status} checked={this.state.selected_status === status} id={index+this.state.properties.length} className="custom-control-input" onChange={this.updateSelectedStatus} />
                  <label className="custom-control-label" htmlFor={index+this.state.properties.length} >{status}</label>
                </>
            }
          </div>
        </li>
      )
    })
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
          <td><p onClick={() =>{this.openOffersModal(index)}}>{Object.keys(property.bids).length + Object.keys(property.best_offers).length}</p></td>
          <td>{property.highest_bid_detail.user_name ? property.highest_bid_detail.user_name : "N/A"}</td>
          <td>{property.highest_bid_detail.amount ? `$${property.highest_bid_detail.amount}` : "N/A"}</td>
          <td>{property.highest_bid_detail.fund_proof ? <a className="admin_table_links" href={property.highest_bid_detail.fund_proof} target="_blank" rel="noopener noreferrer">Attachment <FontAwesomeIcon icon={faDownload} /></a> : ""}</td>
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
                <button className="btn red-btn admin-btns" onClick={this.viewProperty} type="button">View</button>&nbsp;
                <button className="btn red-btn admin-btns" onClick={this.editProperty} type="button">Edit</button>&nbsp;
                <button className="btn red-btn admin-btns" type="button">Message</button>&nbsp;
                <button className="btn red-btn admin-btns" type="button" onClick={this.openStatusModal}>Change Status</button>
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
                    <th>No. of bids</th>
                    <th>Higest Bidder</th>
                    <th>Bid Amount</th>
                    <th>Proof of funds</th>
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
        <Modal className="status_modal" show={this.state.status_modal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <div className=" offset-md-1 col-md-10 text-center">
              <h5 className="mb-0 "> { this.state.selected_property === "" ? "Please select Property" :  "Property Status for " + this.state.properties[this.state.selected_property].address}</h5>
            </div>
          </Modal.Header>
          <div className="modal-body">
            {this.state.selected_property === ""
              ?
                null
              :

              <div className="row mx-0">
                <div className="col-md-6 px-0">
                  <div className="status-list">
                    <ul className="list-inline">
                      <form>
                        {status_array}
                      </form>
                    </ul>
                  </div>
                </div>
                {this.state.selected_status === "Terminated" ?
                  <div className="col-md-6 pr-0">
                    <form className="status-form">
                      <div className="form-group">
                        <label >Reason</label>
                        <input type="text" name="termination_reason" onChange={this.updateStatusFields} className="form-control"/>
                      </div>
                    </form>
                  </div>
                :
                  null
                }
                {this.state.selected_status === "Live Online Bidding" ?
                  <div className="col-md-6 pr-0">
                    <form className="status-form">
                      <div className="form-group">
                        <label >Auction Start date</label>
                        <DatePicker className="form-control "
                          selected={this.state.auction_started_at ? new Date(this.state.auction_started_at) : ""} minDate={new Date()}
                          name="auction_started_at" onChange={this.updatePropertyAuctionStart}
                        />
                      </div>
                      <div className="form-group">
                        <label >Auction Length</label>
                        <select className={"form-control"} name="auction_length"  onChange={this.updateStatusFields} defaultValue={this.state.auction_length}>
                          <option>Please select</option>
                          {auction_lengths}
                        </select>
                      </div>
                    </form>
                  </div>
                :
                  null
                }
              </div>
            }
            <div className="col-md-12 text-center mt-3">
              <span className="error"></span>
              <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.updateStatus}>Save</button>
            </div>
          </div>
        </Modal>
        <Modal className="bid_modal" show={this.state.offers_modal} onHide={this.closeOffersModal}>
          <Modal.Header closeButton>
            <div className=" offset-md-1 col-md-10 text-center">
              <h5 className="mb-0 "> Offers For {this.state.properties[this.state.offers_selected_property] ? this.state.properties[this.state.offers_selected_property].address : null}</h5>
            </div>
          </Modal.Header>
          <div className="modal-body">
            <table className="table table-hover table-bordered review_table modalbid_table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Offer Type</th>
                  <th>Submitted Best Offers/ Bids</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.offersList(this.state.properties[this.state.offers_selected_property] ? this.state.properties[this.state.offers_selected_property].best_offers : [])}
                {this.offersList(this.state.properties[this.state.offers_selected_property] ? this.state.properties[this.state.offers_selected_property].bids : [])}
              </tbody>
            </table>
            <div className="col-md-12 text-center mt-3">
              <span className="error"></span>
              <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.closeOffersModal}>Close</button>
            </div>
          </div>
        </Modal>
      </div>
    )
	}
}
