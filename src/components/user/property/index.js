import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText, faDownload, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
const initial_state = {
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


export default class ListProperty extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getPropertiesListTimeout);
  }
	constructor(props){
    super(props);
    this.state = initial_state;
  }

  getPropertiesList = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties?search_str=" + this.state.search_str + "&page=" + this.state.page
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
    if (this._isMounted){
      this.setState({
        page: page_number
      }, function () {
        if (parseInt(this.state.page) !== parseInt(this.state.current_page) ){
          this.getPropertiesList();
        }
      });
    }
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
        <Accordion key={index}>
          <div className="row mx-0 properties-list" >
            <div className="col-md-2 px-2 properties-img py-2">
              <div className="img-box py-4">
                <Link to={"property/" + property.id}><img src={property.images[0] ? property.images[0] : "/images/home1.png" } alt="" />
                </Link>
              </div>
            </div>
            <div className="col-md-5 px-2 py-2">
              <div className=" properties-address">
                <h5 className="font-blue">{property.address}</h5>
                <div className="address-list mb-0">
                  <div className="p-format">
                    <p>Submitted Date</p>
                    <p>:</p>
                  </div>
                  <p>{property.created_at}</p>
                </div>
                <div className="address-list mb-0">
                  <div className="p-format">
                    <p>Property Status</p>
                    <p>:</p>
                  </div>
                  <p>{property.status}</p>
                </div>
                <div className="address-list mb-0">
                  <div className="p-format">
                    <p>Starting Bid</p>
                    <p>:</p>
                  </div>
                  <p>${property.seller_price}</p>
                </div>
                <div className="address-list mb-0">
                  <div className="p-format">
                    <p>Buy Now Price</p>
                    <p>:</p>
                  </div>
                  <p>${property.buy_now_price}</p>
                </div>
                <div className="address-list mb-0">
                  <div className="p-format">
                    <p>All Time Views</p>
                    <p>:</p>
                  </div>
                  <p>{property.total_views}</p>
                </div>
              </div>
            </div>



            <div className="col-md-3 px-2 text-center py-2">
              <div className="properties-price">
                <h5 className="font-red">$82,000</h5>
                <p>Current Highest Bid</p>
                {/* <Accordion.Toggle eventKey={property.id}> */}
                <Accordion.Toggle as={Button} className="btn red-btn"  eventKey={property.id}>List of BIds/Offers
                  {/* <button className="btn red-btn" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">List of BIds/Offers</button> */}
                </Accordion.Toggle>
              </div>
            </div>
            <div className="col-md-2 pl-2 pr-3 py-2">
              <div className="properties-btn">
                <Link to="#" className="font-blue">Edit Property</Link>
                <Link to="#" className="font-blue">Mark as Pending</Link>
                <Link to="#" className="font-blue">Update Docs</Link>
                <Link to="#" className="font-blue">Update Photo</Link>
                <Link to="#" className="font-blue">Update Video</Link>
              </div>
            </div>

            <Accordion.Collapse className="col-md-12 px-0 " eventKey={property.id}>
              {/* <div className="col-md-12 px-0 " id="collapseExample2"> */}
              <table className="table table-bordered table-hover offer_tables mb-0">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="user_name_box">
                        <span>D</span>
                        <p>Daniel</p>
                      </div>
                    </td>
                    <td><p>$87,000</p></td>
                    <td><p>Bid</p></td>
                    <td><p>12/15/19 | 11:21am</p></td>
                    <td>
                      <div className="order-actions">
                        <Link to="#"><FontAwesomeIcon icon={faEnvelopeOpenText}  /></Link>
                        <Link to="#"><FontAwesomeIcon icon={faDownload}  /></Link>
                        <Link to="#"><FontAwesomeIcon icon={faThumbsUp}  /></Link>
                        <Link to="#"><FontAwesomeIcon icon={faThumbsDown}  /></Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user_name_box">
                        <span>D</span>
                        <p>Daniel</p>
                      </div>
                    </td>
                    <td><p>$87,000</p></td>
                    <td><p>Bid</p></td>
                    <td><p>12/15/19 | 11:21am</p></td>
                    <td>
                      <div className="order-actions">
                        <Link to="#"><FontAwesomeIcon icon={faEnvelopeOpenText}  /></Link>
                        <Link to="#"><FontAwesomeIcon icon={faDownload}  /></Link>
                        <Link to="#"><FontAwesomeIcon icon={faThumbsUp}  /></Link>
                        <Link to="#"><FontAwesomeIcon icon={faThumbsDown}  /></Link>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
              {/* </div> */}
            </Accordion.Collapse>
          </div>
        </Accordion>
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
      <div id="myproperties" className="container px-0 tab-pane active">
        <div className="profile-form">
          <div className="profile-form-in">
            <ul className="nav nav-pills nav-properties" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="pill" href="#propertyPosted">Properties Posted</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="pill" href="#lof">List of Offers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="pill" href="#lob">List of Bids</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="pill" href="#lobn">List of Buy Now</a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="propertyPosted" className="container px-0 tab-pane active"><br/>
                <div className="col-md-12 px-0">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search"  name="search_str" onChange={this.searchHandler}/>
                    <div className="input-group-append">
                      <button className="btn red-btn" type="submit">
                        <FontAwesomeIcon icon={faSearch} size="1x" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="my-property-box">
                  {propertyList}
                </div>
                <div className="col-md-12 text-center my-3">
                  {prev_page}{pagination}{next_page}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
	}
}
