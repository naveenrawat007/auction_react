import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelopeOpenText, faDownload, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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


export default class WatchProperty extends Component{
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
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/watch_properties?search_str=" + this.state.search_str + "&page=" + this.state.page
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
          window.scrollTo(0,0)
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
            isLoaded: true,
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
      isLoaded: false,
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
          this.setState({
            isLoaded: false
          });
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
        <div key={index} class="row mx-0 properties-list">
          <div class="col-md-2 properties-img">
            <div class="img-box">
              <img src={property.thumb_img ? property.thumb_img : "/images/home1.png"} alt="img" />
            </div>
          </div>
          <div class="col-md-5 properties-address">
            <h5 className="font-blue"><Link to={"/property/" + property.unique_address}> {property.headliner} </Link></h5>
            <p>Time Left:-
              <span>11 days</span>:
              <span>14 hours</span>:
              <span>15 minutes</span>
            </p>
            <p>Status:&nbsp;
              <span>{property.status}</span>
            </p>
          </div>
          <div class="col-md-3 properties-price text-center">
            <h4>${property.highest_bid}</h4>
            <p>highest current bid</p>
            <p>starting price: <span>${property.asking_price}</span></p>
            <p>starting date: <span>${property.bidding_starting_date}</span></p>
          </div>
          <div class="col-md-2 properties-btn text-center">
            <Link class="btn red-btn" to={"/property/" + property.unique_address}>Place Bid</Link>
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
      <div id="myproperties" className="container px-0 tab-pane active">
        <div className="profile-form">
          <div className="profile-form-in">

            <div id="propertyPosted" className="container px-0 tab-pane active">
              {this.state.isLoaded === true ?
                  null
              :
              <div className="spinner_main">
                <div className="spinner-grow" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              }
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
    );
	}
}
