import React, {Component} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Modal from 'react-bootstrap/Modal'
import {Link} from 'react-router-dom';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class PropertySold extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getPropertiesListTimeout);
  }
	constructor(props){
    super(props);
    this.state = {
      error: "",
      message: "",
      isLoaded: false,
      properties: [],
      search_str: "",
      current_page: 1,
      total_pages: 1,
      page: 1,
      total_pages_array:[],
    }
  }

  getPropertiesList = () => {
    this.setState({
      isLoaded: false,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties?status=Sold&search_str=" + this.state.search_str + "&page=" + this.state.page
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
        <div className="row mx-0 mb-3 biding_row p-3" key={index}>
          <div className="col-md-3 px-0">
            <div className="biding-img">
              <Link to={"/property/"+property.unique_address}>
                {property.thumbnail_img
                  ?
                    <img src={property.thumbnail_img} alt=""/>
                  :
                  <img src="/images/home1.png" alt=""/>
                }
              </Link>
            </div>
          </div>
          <div className="col-md-9 row mx-0 px-0" key={index}>
            <div className="col-md-5 biding-border px-0">
              <div className="property-biding px-3">
                <h5>
                  <Link className="admin_table_links" to={"/property/"+property.unique_address}>
                    {property.headliner}
                  </Link>
                </h5>
                <div className="mb-1 property-details">
                  <p>
                    {property.category === "Residential" ?
                      <>
                        <span>Beds: </span> {property.residential_attributes.bedrooms}&nbsp;|&nbsp;
                        <span>Baths: </span> {property.residential_attributes.bathrooms}&nbsp;|&nbsp;
                        <span>Garage: </span> {property.residential_attributes.garage}&nbsp;|&nbsp;
                        <span>Sqft: </span> {property.residential_attributes.area}&nbsp;|&nbsp;
                        <span>Lot Size: </span> {property.residential_attributes.lot_size}&nbsp;|&nbsp;
                        <span>Built: </span> {property.residential_attributes.year_built}
                      </>
                    : null }
                    {property.category === "Commercial" ?
                      <>
                        <span>Units: </span> {property.commercial_attributes.units}&nbsp;|&nbsp;
                        <span>Stories: </span> {property.commercial_attributes.stories}&nbsp;|&nbsp;
                        <span>Cap Rate: </span> {property.commercial_attributes.cap_rate}&nbsp;|&nbsp;
                        <span>Sqft: </span> {property.commercial_attributes.area}&nbsp;|&nbsp;
                        <span>Lot Size: </span> {property.commercial_attributes.lot_size}&nbsp;|&nbsp;
                        <span>Built: </span> {property.commercial_attributes.year_built}
                      </>
                    : null }
                    {property.category === "Land" ?
                      <>
                        <span>Lot Size: </span> {property.land_attributes.lot_size}&nbsp;|&nbsp;
                        <span>Price per SqFt: </span> {property.land_attributes.price_per_sq_ft}
                      </>
                    : null }
                  </p>
                  <p className="type-family">{property.category} | {property.p_type}</p>
                </div>
                <p>
                  {property.description.length > 20 ?
                    <>

                      {property.description.substring(0, 20)}...&nbsp;<Link to={"/property/"+property.unique_address}>read more</Link>
                    </>
                  :
                  <>
                    {property.description}
                  </>
                  }
                </p>
              </div>
            </div>
            <div className="col-md-4 pay-border px-0">
              <div className="pay-detail public_deal_list px-3">
                <h5>{property.deal_analysis_type}</h5>
                {
                  property.deal_analysis_type === "Rehab & Flip Deal" ?
                    <>
                      <ul className="list-inline">
                        <li>After Repair Value:</li>
                        <li>{window.format_currency(property.after_rehab_value)}</li>
                      </ul>
                      <ul className="list-inline">
                        <li>Seller Asking Price:</li>
                        <li>{window.format_currency(property.asking_price)}</li>
                      </ul>
                      <ul className="list-inline">
                        <li>Est Rehab Cost:</li>
                        <li>{window.format_currency(property.estimated_rehab_cost)}</li>
                      </ul>
                      <ul className="list-inline font-red">
                        <li>Profit Potential:</li>
                        <li>{window.format_currency(property.profit_potential)}</li>
                      </ul>
                    </>
                  :
                  <>
                    <ul className="list-inline">
                      <li>Monthly Cash Flow:</li>
                      {
                        property.landlord_deal ?
                          <li>{window.format_currency(property.landlord_deal.monthly_cash_flow)}</li>
                        :
                        <li></li>
                      }
                    </ul>
                    <ul className="list-inline">
                      <li>Total Out of Pocket:</li>
                      {
                        property.landlord_deal ?
                          <li>{window.format_currency(property.landlord_deal.total_out_of_pocket)}</li>
                        :
                        <li></li>
                      }
                    </ul>
                    <ul className="list-inline">
                      <li>ROI-Cash on Cash:</li>
                      {
                        property.landlord_deal ?
                          <li>{window.format_currency(property.landlord_deal.roi_cash_percentage)}</li>
                        :
                        <li></li>
                      }
                    </ul>
                  </>
                }

              </div>
            </div>
            <div className="col-md-3 time-border px-0">
              <div className="time-detail pl-3">
                <h4 className="text-center font-blue">{window.format_currency(property.sold_amount)}</h4>
                <p>Sold Price</p>
                <Link to={"/property/"+property.unique_address} className="blue-btn btn-biding">View Details</Link>
              </div>
            </div>
          </div>
        </div>
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
    <div className="profile-setting">
      <div className="container custom_container buy_tab px-0 loading-spinner-parent">
        {this.state.isLoaded === true ?
          null
        :
        <div className="spinner_main">
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        }
        <h3 className="font-blue">Sold Properties</h3>
        {
          this.state.properties.length > 0 ?
            <div className="no-items-div">
              {propertyList}
              <div className="col-md-12 text-center my-3">
                {prev_page}{pagination}{next_page}
              </div>
            </div>
          :
          <div className="no-items-div">
            {this.state.isLoaded === true ?
              "No Properties in here."
            :
              "Fetching"
            }
          </div>
        }
      </div>
    </div>
    )
	}
}
