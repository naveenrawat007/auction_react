import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import Alert from 'react-bootstrap/Alert';
import {Link} from 'react-router-dom';
import { faSearch, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default class UnderReview extends Component{
  _isMounted = false
  _timerArray = []
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getPropertiesListTimeout);
    for (let i=0; i < this._timerArray.length; i++ ){
      clearInterval(this._timerArray[i]);
    }
  }
	constructor(props){
    super(props);
    this.state = {
      status_modal: false,
      history_modal: false,
      temp_video: "",
      show_video: false,
      temp_images_list: [],
      show_images_list: false,
      path: props.path,
      selected_property: "",
      changed_property: "",
      seller_pay_types: [],
      show_instructions_types: [],
      selected_status: "",
      termination_reason: "",
      sold_date: "",
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
      best_offer: "",
      best_offer_auction_started_at: "",
      best_offer_auction_ending_at: "",
      termination_reason_options: [],
    }
  }

  getPropertiesList = () => {
    this.setState({
      isLoaded: false,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties?status=Under Review&search_str=" + this.state.search_str + "&page=" + this.state.page
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
            selected_property: "",
            isLoaded: true,
            properties: result.properties,
            property_status_options: result.property_statuses,
            auction_length_options: result.auction_lengths,
            termination_reason_options: result.termination_reason,
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
  componentDidMount () {
    this._isMounted = true;
    this._dateAttributes = ["best_offer_auction_started_at","best_offer_auction_ending_at","auction_started_at","auction_bidding_ending_at","auction_ending_at"]
    this._nestedAttributes = ["estimated_rehab_cost_attr","commercial_attributes","residential_attributes","land_attributes","landlord_deal","buy_option"]
    this.getPropertiesList();

  }

  openHistoryModal = () => {
    this.setState({
      history_modal: true
    });
    this.getPropertyDetails();
  }
  getPropertyDetails = () => {
    if (this.state.selected_property !== ""){
      let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties/"+ this.state.properties[this.state.selected_property].id+"/change_logs"
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
              changed_property: result.property,
              seller_pay_types: result.seller_pay_types,
              show_instructions_types: result.show_instructions_types,
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
  }

  sendChangeRequest = (property_id, attr, value, root_attr) =>{
    // console.log(JSON.stringify({property: {[attr]: value}}));
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties/"+ this.state.changed_property.id+"/change_logs"
    fetch(url, {
      method: "PUT",
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
      },
      body: (root_attr ? JSON.stringify({property: {[root_attr]: {[attr]: value}}}) : JSON.stringify({property: {[attr]: value}}))
    }).then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 200){
          this.setState({
            changed_property: result.property
          })
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
  updateStatusFields = (event) =>{
    const{ name, value } = event.target;
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
    if (this.state.selected_status === "Sold"){
      if (this.state.sold_offer !== "" && this.state.sold_offer !== undefined){
        let offer = {}
        offer.id = this.state.sold_offer.split(",")[0]
        offer.type_code = this.state.sold_offer.split(",")[1]
        this.soldProperty(offer)
      }
    }else {
      this.setState({
        isLoaded: false,
      });
      let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties/status"
      const fd = new FormData();
      fd.append('property[id]', this.state.properties[this.state.selected_property].id)
      fd.append('property[status]', this.state.selected_status)
      fd.append('property[termination_reason]', this.state.termination_reason)
      fd.append('property[auction_started_at]', this.state.auction_started_at)
      fd.append('property[auction_length]', this.state.auction_length)
      fd.append('property[best_offer]', this.state.best_offer)
      fd.append('property[best_offer_auction_started_at]', this.state.best_offer_auction_started_at)
      fd.append('property[best_offer_auction_ending_at]', this.state.best_offer_auction_ending_at)
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
          if (result.status === 200){
            this.setState({
              message: result.message,
              variant: "success"
            });
            this.clearMessageTimeout = setTimeout(() => {
              this.setState(() => ({message: ""}))
            }, 2000);
          }
        }
      })
    }
  }

  soldProperty = (offer) => {
    this.setState({
      isLoaded: false ,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/properties/sold"
    const fd = new FormData();
    fd.append('property[sold_date]', this.state.sold_date)
    fd.append('property[offer_id]', offer.id)
    fd.append('property[offer_type]', offer.type_code)
    fetch(url, {
      method: "POST",
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
        if (result.status === 200){
          this.setState({
            isLoaded: true ,
            message: result.message,
            variant: "success"
          });
          this.getPropertiesList();
        }else {
          this.setState({
            bid_modal: false,
            isLoaded: true ,
            message: result.message,
            variant: "danger"
          });
        }
        this.clearMessageTimeout = setTimeout(() => {
          this.setState(() => ({message: ""}))
        }, 2000);
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
        auction_started_at: this.state.properties[this.state.selected_property].auction_started_at_date,
        auction_length:  this.state.properties[this.state.selected_property].auction_length,
        termination_reason:  this.state.properties[this.state.selected_property].termination_reason,
        best_offer: this.state.properties[this.state.selected_property].best_offer,
        best_offer_auction_started_at: this.state.properties[this.state.selected_property].best_offer_auction_started_at,
        best_offer_auction_ending_at:this.state.properties[this.state.selected_property].best_offer_auction_ending_at,
        sold_date: this.state.properties[this.state.selected_property].sold_date,
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
      history_modal: false,
      status_modal: false,
      auction_started_at: "",
      auction_length: "",
      best_offer: "",
      best_offer_auction_started_at: "",
      best_offer_auction_ending_at: "",
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

  showImages = (images_list) => {
    this.setState({
      temp_images_list: images_list,
      show_images_list: true
    })
  }
  closeImages = () => {
    this.setState({
      temp_images_list: [],
      show_images_list: false
    })
  }
  showVideo = (video) => {
    this.setState({
      show_video: true,
      temp_video: video,
    })
  }
  closeVideo = () => {
    this.setState({
      show_video: false,
      temp_video: "",
    })
  }
  humanizeAttr = ( attr) =>{
    if (attr === "address"){
      return "Address"
    }
    else if (attr === "city") {
      return "City"
    }
    else if (attr === "state") {
      return "State"
    }
    else if (attr === "zip_code") {
      return "Zip Code"
    }
    else if (attr === "category") {
      return "Category"
    }
    else if (attr === "p_type") {
      return "Property Type"
    }
    else if (attr === "headliner") {
      return "Property Headline"
    }
    else if (attr === "mls_available") {
      return "MLS availablity"
    }
    else if (attr === "flooded") {
      return "Flood status"
    }
    else if (attr === "flood_count") {
      return "Flood Details"
    }
    else if (attr === "estimated_rehab_cost") {
      return "Est. rehab cost"
    }
    else if (attr === "description") {
      return "Description"
    }
    else if (attr === "seller_price") {
      return "Seller asking price"
    }
    else if (attr === "after_rehab_value") {
      return "After Rehab value"
    }
    else if (attr === "buy_now_price") {
      return "Buy Now Price"
    }
    else if (attr === "auction_length") {
      return "Auction Length"
    }
    else if (attr === "seller_pay_type_id") {
      return "Seller Pay type"
    }
    else if (attr === "show_instructions_type_id") {
      return "Show Type"
    }
    else if (attr === "youtube_url") {
      return "Youtube Link"
    }
    else if (attr === "title_status") {
      return "Title"
    }
    else if (attr === "asking_price") {
      return "Asking Price"
    }
    else if (attr === "profit_potential") {
      return "Profit Potential"
    }
    else if (attr === "arv_analysis") {
      return "ARV Analysis"
    }
    else if (attr === "description_of_repairs") {
      return "Repairs Description"
    }
    else if (attr === "deal_analysis_type") {
      return "Deal Type"
    }
    else if (attr === "buy_option") {
      return "Buy Options"
    }
    else if (attr === "additional_information") {
      return "Additional Information"
    }
    else if (attr === "best_offer") {
      return "Best Offer"
    }
    else if (attr === "best_offer_length") {
      return "Best Offer days"
    }
    else if (attr === "best_offer_sellers_minimum_price") {
      return "Best Offer/Sellers Asking Price "
    }
    else if (attr === "best_offer_sellers_reserve_price") {
      return "Best Offer/Sellers Buy Now Price"
    }
    else if (attr === "show_instructions_text") {
      return "Show Instructions"
    }
    else if (attr === "open_house_dates") {
      return "Open houses dates"
    }
    else if (attr === "vimeo_url") {
      return "Vimeo Url"
    }
    else if (attr === "dropbox_url") {
      return "Drop Box url"
    }
    else if (attr === "owner_category") {
      return "Owner "
    }
    else if (attr === "rental_description") {
      return "Rental Description"
    }
    else if (attr === "bedrooms") {
      return "Bedrooms"
    }
    else if (attr === "bathrooms") {
      return "Bathrooms"
    }
    else if (attr === "garage") {
      return "Garage"
    }
    else if (attr === "area") {
      return "Square Footage"
    }
    else if (attr === "lot_size") {
      return "Lot"
    }
    else if (attr === "year_built") {
      return "Year Built"
    }
    else if (attr === "units") {
      return "Units"
    }
    else if (attr === "stories") {
      return "Stories"
    }
    else if (attr === "cap_rate") {
      return "Cap Rate"
    }
    else if (attr === "price_per_sq_ft") {
      return "Price Per SqFt"
    }
    else if (attr === "residential_attributes") {
      return "Residential "
    }
    else if (attr === "commercial_attributes") {
      return "Commercial"
    }
    else if (attr === "land_attributes") {
      return "Land"
    }
    else if (attr === "best_offer_auction_started_at") {
      return "Best Offer Start date"
    }
    else if (attr === "best_offer_auction_ending_at") {
      return "Best Offer End date"
    }
    else if (attr === "auction_started_at") {
      return "Bidding Start Date"
    }
    else if (attr === "auction_bidding_ending_at") {
      return "Bidding Ending at"
    }
    else if (attr === "auction_ending_at") {
      return "Ideal Closing Date"
    }
    else if (attr === "closing_cost") {
      return "Est Closing Cost:"
    }
    else if (attr === "short_term_financing_cost") {
      return "Est Hard Money or STF Cost"
    }
    else if (attr === "total_acquisition_cost") {
      return "Total Acquisition Costs"
    }
    else if (attr === "taxes_annually") {
      return "Est Annual taxes"
    }
    else if (attr === "insurance_annually") {
      return "Est Annual Insurance"
    }
    else if (attr === "amount_financed_percentage") {
      return "AMOUNT FINANCED (%)"
    }
    else if (attr === "amount_financed") {
      return "AMOUNT FINANCED "
    }
    else if (attr === "interest_rate") {
      return "Interest Rate APR"
    }
    else if (attr === "loan_terms") {
      return "Loan Term"
    }
    else if (attr === "principal_interest") {
      return "Monthly Principal & Interest"
    }
    else if (attr === "piti_monthly_debt") {
      return "Ideal Closing Date"
    }
    else if (attr === "monthly_rent") {
      return "EST Monthly Rent"
    }
    else if (attr === "total_gross_yearly_income") {
      return "Total Gross Yearly Income"
    }
    else if (attr === "vacancy_rate") {
      return "Est Vacancy Rate"
    }
    else if (attr === "adjusted_gross_yearly_income") {
      return "ADJ Gross Yearly Income"
    }
    else if (attr === "est_annual_management_fees") {
      return "Est Annual Management Fees"
    }
    else if (attr === "est_annual_operating_fees_others") {
      return "Est Annual Maintentance"
    }
    else if (attr === "annual_debt") {
      return "Annual Debt Service "
    }
    else if (attr === "net_operating_income") {
      return "Net Operating Income"
    }
    else if (attr === "annual_cash_flow") {
      return "Annual Cash Flow"
    }
    else if (attr === "monthly_cash_flow") {
      return "Monthly Cash Flow"
    }
    else if (attr === "total_out_of_pocket") {
      return "Total Out of Pocket"
    }
    else if (attr === "roi_cash_percentage") {
      return "ROI Cash On Cash"
    }
    else if (attr === "images") {
      return "Images"
    }
    else if (attr === "video_url") {
      return "Video"
    }
    else if (attr === "property_closing_amount") {
      return "Property Closing amount"
    }
  }

  renderNestedChanges = (changes, attr) => {
    // if (this._nestedAttributes.indexOf(attr) !== -1){
    if (attr === "estimated_rehab_cost_attr" || attr === "commercial_attributes" || attr === "residential_attributes" || attr === "land_attributes"){
      return (
        Object.keys(changes[0]).map((key1, index1) => {
          if (JSON.stringify(changes[0][key1]) !== JSON.stringify(changes[1][key1])){
            return(
              <tr key={index1}>
                <td>{this.state.changed_property.change_log.created_at}</td>
                <td>{this.humanizeAttr(key1)}</td>
                <td>{changes[0][key1]}</td>
                <td>{changes[1][key1]}</td>
                <td>
                {
                  this.state.changed_property[attr][key1] === changes[1][key1] ?
                  <span className="green-check">
                    <FontAwesomeIcon icon={faCheckCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key1, changes[0][key1], attr)}}/>
                  </span>
                  :
                  <span className="red-check">
                    <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key1, changes[1][key1], attr)}}/>
                  </span>
                }
                </td>
              </tr>
            )
          }
        })
      )
    }else if (attr === "landlord_deal") {
      return(
        Object.keys(changes).map((key, index) => {
          if (this.humanizeAttr(key) !== undefined){
            return (
              <tr key={index}>
                <td>{this.state.changed_property.change_log.created_at}</td>
                <td>{this.humanizeAttr(key)}</td>
                <td>{changes[key][0] ? changes[key][0] : ""}</td>
                <td>{changes[key][1] ? changes[key][1] : ""}</td>
                <td>
                {
                  this.state.changed_property[attr][key] === changes[key][1] ?
                  <span className="green-check">
                    <FontAwesomeIcon icon={faCheckCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, changes[key][0])}}/>
                  </span>
                  :
                  <span className="red-check">
                    <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, changes[key][1])}}/>
                  </span>
                }
                </td>
              </tr>
            )
          }
        })
      )
    }
    else if(attr === "buy_option") {
      {
        if (this.humanizeAttr(attr) !== undefined){
          return (
            <tr key={attr}>
              <td>{this.state.changed_property.change_log.created_at}</td>
              <td>{this.humanizeAttr(attr)}</td>
              <td>{this.state.changed_property.change_log.details[attr][0] ? (this.state.changed_property.change_log.details[attr][0].map((value, index) => {
                return(
                  <span>
                    {value},&nbsp;
                  </span>
                )
              })) : ""}</td>
              <td>{this.state.changed_property.change_log.details[attr][1] ? (this.state.changed_property.change_log.details[attr][1].map((value, index) => {
                return(
                  <span>
                    {value},&nbsp;
                  </span>
                )
              })) : ""}</td>
              <td>
              {
                JSON.stringify(this.state.changed_property[attr]) === JSON.stringify(this.state.changed_property.change_log.details[attr][1]) ?
                <span className="green-check">
                  <FontAwesomeIcon icon={faCheckCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, attr, JSON.stringify(this.state.changed_property.change_log.details[attr][0]))}}/>
                </span>
                :
                <span className="red-check">
                  <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {
                    this.sendChangeRequest(this.state.changed_property.id, attr, JSON.stringify(this.state.changed_property.change_log.details[attr][1]))
                  }}/>
                </span>
              }
              </td>
            </tr>
          )
        }
      }
    }
  }
  renderSellerPayOrShowInst = (id, key) =>{
    if (key === "seller_pay_type_id"){
      for(let i=0; i < this.state.seller_pay_types.length; i++){
        if (this.state.seller_pay_types[i].id === id){
          return(
            this.state.seller_pay_types[i].description
          )
        }
      }
    }else if (key === "show_instructions_type_id") {
      for(let i=0; i < this.state.show_instructions_types.length; i++){
        if (this.state.show_instructions_types[i].id === id){
          return(
            this.state.show_instructions_types[i].description
          )
        }
      }
    }
  }

  renderDateTime = (key, val) => {
    if (key === "date"){
      return (window.formatDate(val))
    }else {
      return (window.formatTime(val))
    }
  }

  calculateApproveTime = (time, id) => {
    if (time){
      this.timer_interval = setInterval(function () {
        if (time){
          let now = new Date().getTime();
          let end = new Date(time).getTime();
          let t = (end/1000) - (now/1000);
          let hours = Math.floor(t/(60*60));
          let minutes = Math.floor((t%(60*60))/60);
          let seconds = Math.floor((t%(60)))

          // return `-${hours}:${minutes}:${seconds}`
          if (document.getElementById("timer"+id)){
            if (t<0){
              document.getElementById("timer"+id).innerHTML = "--:--:--"
            }else {
              document.getElementById("timer"+id).innerHTML = `-${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            }
          }
        }else {
          if (document.getElementById("timer"+id)){
            document.getElementById("timer"+id).innerHTML = "--:--:--"
          }
        }
      }, 1000)
      this._timerArray.push(this.timer_interval)
    }else {
      if (document.getElementById("timer"+id)){
        document.getElementById("timer"+id).innerHTML = "--:--:--"
      }
    }

  }

  editProperty = () => {
    if (this.state.selected_property){
      window.open("/user/property/"+ this.state.properties[this.state.selected_property].unique_address +"/edit", "_blank")
    }
  }

  viewProperty = () => {
    if (this.state.selected_property){
      window.open("/property/"+ this.state.properties[this.state.selected_property].unique_address, "_blank")
    }
  }
  updatePropertyAuctionStart = (date) =>{
    if (this._isMounted){
      this.setState({
        auction_started_at: date,
      })
    }
  }
  updatePropertyBestOfferAuctionStart = (date) =>{
    if (this._isMounted){
      this.setState({
        best_offer_auction_started_at: date,
      })
    }
  }
  updatePropertyBestOfferAuctionEnd = (date) =>{
    if (this._isMounted){
      this.setState({
        best_offer_auction_ending_at: date,
      })
    }
  }
  updatePropertySoldDate = (date) =>{
    if (this._isMounted){
      this.setState({
        sold_date: date,
      })
    }
  }
  checkBestOffer = () => {
    if (String(this.state.best_offer) === "true"){
      return "";
    }else {
      return "d-none";
    }
  }

	render() {
    const auction_lengths = this.state.auction_length_options.map((value, index) => {
      return(
        <option key={index} value={value} >{value} days</option>
      )
    })
    const termination_reason_opt = this.state.termination_reason_options.map((value, index) => {
      return(
        <option key={index} value={value} >{value}</option>
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
                  <label className="custom-control-label" htmlFor={index+this.state.properties.length} >{ status == "Approve" ? "Approve / Best Offer" : status }</label>
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
          <td>{property.auction_type}</td>
          <td>{property.address}</td>
          <td>{window.formatFullDate(property.submitted_at)}</td>
          <td>{window.formatFullDate(property.auction_started_at)}</td>
          <td>{(property.best_offer === true) ? window.formatFullDate(property.best_offer_auction_started_at) : "N/A"}</td>
          <td>
            {
              property.requested ?
                <>
                  <p id={"timer"+property.id}></p> {this.calculateApproveTime(property.requested_timer, property.id)}
                </>
              :
              (property.status === "Approve" ?
                  "Approved"
              :
              <>
                <p id={"timer"+property.id}></p> {this.calculateApproveTime(property.submitted_at_timer, property.id)}
              </>)
            }
          </td>
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
        {
          this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
        }
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
              <div className="col-md-6 offset-md-2 px-0 text-right">
                <button className="btn red-btn admin-btns" onClick={this.viewProperty} type="button">View</button>&nbsp;
                <button className="btn red-btn admin-btns" onClick={this.editProperty} type="button">Edit</button>&nbsp;
                <button className="btn red-btn admin-btns" type="button">Message</button>&nbsp;
                <button className="btn red-btn admin-btns" type="button" onClick={this.openHistoryModal}>View History</button>&nbsp;
                <button className="btn red-btn admin-btns" type="button" onClick={this.openStatusModal}>Change Status</button>
              </div>
            </div>
            <div className="under_review admin-review loading-spinner-parent">
              <table className="table table-bordered table-hover review_table property_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Property Address</th>
                    <th>Submitted Date</th>
                    <th>Auction Date</th>
                    <th>Best Offer Date</th>
                    <th>Approve Timer</th>
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
        <Modal className="status_modal logs_table" show={this.state.history_modal} onHide={this.hideModal} centered>
          <Modal.Header closeButton>
            <div className=" offset-md-1 col-md-10 text-center">
              <h5 className="mb-0 text-uppercase"> { this.state.selected_property === "" ? "Please select Property" :  "Property History Changes Logs"}</h5>
            </div>
          </Modal.Header>
          <div className="modal-body p-0">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Details</th>
                  <th>Old Value</th>
                  <th>New Value</th>
                  <th>Control</th>
                </tr>
              </thead>
            </table>
            <div className="logs_table_scroll">
              <table className="table table-striped">
                <tbody>
                  {
                    this.state.changed_property ?
                    (
                      // console.log(this.state.changed_property.change_log)
                      this.state.changed_property.change_log ?
                      (
                        Object.keys(this.state.changed_property.change_log.details).map((key, index) => {
                        if (key === "lat" || key === "long" ){
                          return null
                        }else if (key === "open_house_dates"){
                          return (
                            <tr key={index}>
                              <td>{this.state.changed_property.change_log.created_at}</td>
                              <td>{this.humanizeAttr(key)}</td>
                              <td>
                              {//console.log(this.state.changed_property.change_log.details[key][0])
                                (Object.keys(this.state.changed_property.change_log.details[key][0])).map((key1, index) =>{
                                  return (
                                    <div>
                                    {
                                      Object.keys(this.state.changed_property.change_log.details[key][0][key1]).map((key2, index) => {
                                        return(
                                          <span>
                                          {
                                            this.renderDateTime(key2, this.state.changed_property.change_log.details[key][0][key1][key2])
                                          } &nbsp;
                                          </span>
                                        )
                                      })
                                    }
                                    </div>
                                  )
                                })
                              }
                              </td>
                              <td>
                              {
                                (Object.keys(this.state.changed_property.change_log.details[key][1])).map((key1, index) =>{
                                  return (
                                    <div>
                                    {
                                      Object.keys(this.state.changed_property.change_log.details[key][1][key1]).map((key2, index) => {
                                        return(
                                          <span>
                                          {
                                            this.renderDateTime(key2, this.state.changed_property.change_log.details[key][1][key1][key2])
                                          } &nbsp;
                                          </span>
                                        )
                                      })
                                    }
                                    </div>
                                  )
                                })
                              }
                              </td>
                              <td>
                              {
                                JSON.stringify(this.state.changed_property[key]) === JSON.stringify(this.state.changed_property.change_log.details[key][1]) ?
                                <span className="green-check">
                                  <FontAwesomeIcon icon={faCheckCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, JSON.stringify(this.state.changed_property.change_log.details[key][0]))}}/>
                                </span>
                                :
                                <span className="red-check">
                                  <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, JSON.stringify(this.state.changed_property.change_log.details[key][1]))}}/>
                                </span>
                              }
                              </td>
                            </tr>
                          )
                        }
                        else if (this._nestedAttributes.indexOf(key) !== -1){
                          return (
                            <>
                              {this.renderNestedChanges(this.state.changed_property.change_log.details[key], key)}
                            </>
                          )
                        }
                        else if (this._dateAttributes.indexOf(key) !== -1){
                          return (
                            <tr key={index}>
                              <td>{this.state.changed_property.change_log.created_at}</td>
                              <td>{this.humanizeAttr(key)}</td>
                              <td>{window.formatDate(this.state.changed_property.change_log.details[key][0])}</td>
                              <td>{window.formatDate(this.state.changed_property.change_log.details[key][1])}</td>
                              <td>
                              {
                                this.state.changed_property[key] === this.state.changed_property.change_log.details[key][1] ?
                                <span className="green-check">
                                  <FontAwesomeIcon icon={faCheckCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, this.state.changed_property.change_log.details[key][0])}}/>
                                </span>
                                :
                                <span className="red-check">
                                  <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, this.state.changed_property.change_log.details[key][1])}}/>
                                </span>
                              }
                              </td>
                            </tr>
                          )
                        }
                        else if (key === "flooded"){
                          return (
                            <tr key={index}>
                              <td>{this.state.changed_property.change_log.created_at}</td>
                              <td>{this.humanizeAttr(key)}</td>
                              <td>{this.state.changed_property.change_log.details[key][0] ? "Yes" : "No"}</td>
                              <td>{this.state.changed_property.change_log.details[key][1] ? "Yes" : "No"}</td>
                              <td>
                              {
                                this.state.changed_property[key] === this.state.changed_property.change_log.details[key][1] ?
                                <span className="green-check">
                                  <FontAwesomeIcon icon={faCheckCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, this.state.changed_property.change_log.details[key][0])}}/>
                                </span>
                                :
                                <span className="red-check">
                                  <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, this.state.changed_property.change_log.details[key][1])}}/>
                                </span>
                              }
                              </td>
                            </tr>
                          )
                        }
                        else if (key === "images"){
                          return (
                            <tr key={index}>
                              <td>{this.state.changed_property.change_log.created_at}</td>
                              <td>{this.humanizeAttr(key)}</td>
                              <td>
                                <Link to="#" onClick={() => {this.showImages(this.state.changed_property.images)}}>Old Images</Link>
                              </td>
                              <td>
                                <Link to="#" onClick={() => {this.showImages(this.state.changed_property.change_log.images)}}>New Images</Link>
                              </td>
                              <td>
                              {
                                this.state.changed_property.change_log.details[key] ===  "updated" ?
                                <span className="green-check">
                                  <FontAwesomeIcon icon={faCheckCircle} size="1x"/>
                                </span>
                                :
                                <span className="red-check">
                                  <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, "images", this.state.changed_property.change_log.details["images"])}}/>

                                </span>
                              }
                              </td>
                            </tr>
                          )
                        }
                        else if (key === "video_url"){
                          return (
                            <tr key={index}>
                              <td>{this.state.changed_property.change_log.created_at}</td>
                              <td>{this.humanizeAttr(key)}</td>
                              <td>
                                <Link to="#" onClick={() => {this.showVideo(this.state.changed_property["video_url"])}}>Old Video</Link>
                              </td>
                              <td>
                                <Link to="#" onClick={() => {this.showVideo(this.state.changed_property.change_log["video_url"])}}>New Video</Link>
                              </td>
                              <td>
                              {
                                this.state.changed_property.change_log.details[key] === "updated" ?
                                <span className="green-check">
                                  <FontAwesomeIcon icon={faCheckCircle} size="1x"/>
                                </span>
                                :
                                <span className="red-check">
                                  <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, "video_url", this.state.changed_property.change_log.details["video_url"])}}/>

                                </span>
                              }
                              </td>
                            </tr>
                          )
                        }
                        else if (key === "seller_pay_type_id" || key === "show_instructions_type_id"){
                          return (
                            <tr key={index}>
                              <td>{this.state.changed_property.change_log.created_at}</td>
                              <td>{this.humanizeAttr(key)}</td>
                              <td>{this.renderSellerPayOrShowInst(this.state.changed_property.change_log.details[key][0], key)}</td>
                              <td>{this.renderSellerPayOrShowInst(this.state.changed_property.change_log.details[key][1], key)}</td>
                              <td>
                              {
                                this.state.changed_property[key] === this.state.changed_property.change_log.details[key][1] ?
                                <span className="green-check">
                                  <FontAwesomeIcon icon={faCheckCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, this.state.changed_property.change_log.details[key][0])}}/>
                                </span>
                                :
                                <span className="red-check">
                                  <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, this.state.changed_property.change_log.details[key][1])}}/>
                                </span>
                              }
                              </td>
                            </tr>
                          )
                        }
                        else{
                          if (this.humanizeAttr(key) !== undefined){
                            return (
                              <tr key={index}>
                                <td>{this.state.changed_property.change_log.created_at}</td>
                                <td>{this.humanizeAttr(key)}</td>
                                <td>{this.state.changed_property.change_log.details[key][0] ? this.state.changed_property.change_log.details[key][0] : ""}</td>
                                <td>{this.state.changed_property.change_log.details[key][1] ? this.state.changed_property.change_log.details[key][1] : ""}</td>
                                <td>
                                {
                                  this.state.changed_property[key] === this.state.changed_property.change_log.details[key][1] ?
                                  <span className="green-check">
                                    <FontAwesomeIcon icon={faCheckCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, this.state.changed_property.change_log.details[key][0])}}/>
                                  </span>
                                  :
                                  <span className="red-check">
                                    <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={() => {this.sendChangeRequest(this.state.changed_property.id, key, this.state.changed_property.change_log.details[key][1])}}/>
                                  </span>
                                }
                                </td>
                              </tr>
                            )
                          }
                        }
                      })
                    )
                      :
                      null
                    )
                    :
                    null
                  }
                </tbody>
              </table>
            </div>
            <Modal className="old_image_modal" backdropClassName="old_image_backdrop" size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.show_video} onHide={this.closeVideo}>
              <Modal.Body>
              <div className="old_video_content">
                {
                  this.state.temp_video ?
                  <video controls>
                    <source src={this.state.temp_video} />
                  </video>
                  :
                  "No video"
                }
              </div>
              </Modal.Body>
            </Modal>
            <Modal className="old_image_modal" backdropClassName="old_image_backdrop" size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.show_images_list} onHide={this.closeImages}>
              <Modal.Body>
              <div className="old_image_content">
                {
                  (this.state.temp_images_list.length > 0) ?
                  (this.state.temp_images_list.map((url, index)=> {
                    return(
                      <img src={url} className="img-thumbnail"/>
                    )
                  }))
                  :
                  "No Images "
                }
              </div>
              </Modal.Body>
            </Modal>
          </div>
        </Modal>
        <Modal className="status_modal" show={this.state.status_modal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <div className=" offset-md-1 col-md-10 text-center">
              <h5 className="mb-0 text-uppercase"> { this.state.selected_property === "" ? "Please select Property" :  "Property Status for " + this.state.properties[this.state.selected_property].address}</h5>
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
                        <select className={"form-control"} name="termination_reason"  onChange={this.updateStatusFields} defaultValue={this.state.termination_reason}>
                          <option>Please select</option>
                          {termination_reason_opt}
                        </select>
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
                        {this.state.properties[this.state.selected_property].best_offer ?
                        <DatePicker className="form-control " disabled={true}
                          selected={this.state.auction_started_at ? new Date(this.state.auction_started_at) : ""}
                          name="auction_started_at" onChange={this.updatePropertyAuctionStart}
                        /> :
                        <DatePicker className="form-control "
                          selected={this.state.auction_started_at ? new Date(this.state.auction_started_at) : ""}
                          name="auction_started_at" onChange={this.updatePropertyAuctionStart}
                        /> }
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
                {this.state.selected_status === "Approve" ?
                  <div className="col-md-6 pr-0">
                    <form className="status-form">
                      <div className="form-group ">
                        <label >Best Offer </label>
                        <select className="form-control" onChange={this.updateStatusFields} value={String(this.state.best_offer)} name="best_offer" >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                      <div className={"form-group " + this.checkBestOffer()}>
                        <label >Best Offer Start date</label>
                        <DatePicker className="form-control "
                          selected={this.state.best_offer_auction_started_at ? new Date(this.state.best_offer_auction_started_at) : ""}
                          name="best_offer_auction_started_at" onChange={this.updatePropertyBestOfferAuctionStart}
                        />
                      </div>
                      <div className={"form-group "+ this.checkBestOffer()}>
                        <label >Best Offer End Date</label>
                        <DatePicker className="form-control "
                          selected={this.state.best_offer_auction_ending_at ? new Date(this.state.best_offer_auction_ending_at) : ""}
                          name="best_offer_auction_ending_at" onChange={this.updatePropertyBestOfferAuctionEnd}
                        />
                      </div>
                    </form>
                  </div>
                :
                  null
                }
                {
                  this.state.selected_status === "Sold" ?
                  <div className="col-md-6 pr-0">
                    <form className="status-form">
                      <div className="form-group ">
                        <label >Sold Date </label>
                        <DatePicker className="form-control "
                          selected={this.state.sold_date ? new Date(this.state.sold_date) : ""}
                          name="sold_date" onChange={this.updatePropertySoldDate}
                        />
                      </div>
                      <div className={"form-group "}>
                        <label >Select Offer</label>
                        <select className="form-control" onChange={this.updateStatusFields} name="sold_offer" >
                          <option value="false">Select Offer</option>
                          {
                            this.state.properties[this.state.selected_property].bids.map((offer, index) => {
                              return (<option value={offer.id+","+offer.type_code} key={index}>{offer.type} {window.format_currency(offer.amount)}</option>)
                            })
                          }
                          {
                            this.state.properties[this.state.selected_property].best_offers.map((offer, index) => {
                              return (<option value={offer.id+","+offer.type_code} key={index}>{offer.type} {window.format_currency(offer.amount)}</option>)
                            })
                          }
                          {
                            this.state.properties[this.state.selected_property].buy_now_offers.map((offer, index) => {
                              return (<option value={offer.id+","+offer.type_code} key={index}>{offer.type} {window.format_currency(offer.amount)}</option>)
                            })
                          }
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
      </div>
    )
	}
}
