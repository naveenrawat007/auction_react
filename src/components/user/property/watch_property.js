import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
// import { faEnvelopeOpenText, faDownload, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import { faSearch, faLink } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { FacebookShareButton, TwitterShareButton, TumblrShareButton, PinterestShareButton, RedditShareButton} from "react-share";
import {FacebookIcon, TwitterIcon, TumblrIcon, PinterestIcon, RedditIcon } from "react-share";
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const initial_state = {
  share_link: "",
  selected_property: "",
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
  shareLink = (index) => {
    this.setState({
      share_modal: true,
      selected_property: index,
    }, function () {
      this.setState({
        share_link: this.state.selected_property === "" ? "" :  window.location.origin+"/property/"+this.state.properties[this.state.selected_property].unique_address,
      });
    });
  }
  hideShareModal = () => {
    this.setState({
      share_modal: false,
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
        <Accordion key={index}>
          <div className="row mx-0 properties-list" >
            <div className="col-md-2 px-2 properties-img py-2">
              <div className="img-box py-4">
                <Link to={"/property/" + property.unique_address}><img src={property.thumbnail_img ? property.thumbnail_img : "/images/home1.png" } alt="" />
                </Link>
              </div>
            </div>
            <div className="col-md-5 px-2 py-2">
              <div className=" properties-address">
                <h5 className="font-blue"><Link to={"/property/" + property.unique_address}> {property.headliner} </Link></h5>
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
                  <p>{formatter.format(property.seller_price)}</p>
                </div>
                <div className="address-list mb-0">
                  <div className="p-format">
                    <p>Buy Now Price</p>
                    <p>:</p>
                  </div>
                  <p>{formatter.format(property.buy_now_price)}</p>
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
                <h5 className="font-red">{formatter.format(property.highest_bid)}</h5>
                <p>Current Highest Bid</p>
                {/* <Accordion.Toggle eventKey={property.id}> */}
                <Accordion.Toggle as={Button} className="btn red-btn"  eventKey={property.id}>List of Buy Now
                  {/* <button className="btn red-btn" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">List of BIds/Offers</button> */}
                </Accordion.Toggle>
              </div>
            </div>
            <div className="col-md-2 pl-2 pr-3 py-2">
              <div className="properties-btn">
                <Link to="#" className="font-blue" onClick={() =>{this.shareLink(index)}}>Share Link</Link>
              </div>
            </div>
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
        <Modal className="user_property_modal share_modal" show={this.state.share_modal} onHide={this.hideShareModal} centered>
          <Modal.Header closeButton>
            <div className="px-0 col-md-11 ">
              <h5 className="mb-0 "> Share this property</h5>
            </div>
          </Modal.Header>
          <div className="modal-body">
            <div className="col-md-12 text-center px-0">
              <div className="form-group row mx-0">
                <div className="col-md-6 mb-2 text-left">
                  <label className="bold-label">Link</label>
                  <div className="input-group ">
                    <div className="input-group-prepend">
                      <span className="input-group-text group-box-chat share-btn-grp" id="basic-addon1" onClick={this.copyUrl}><FontAwesomeIcon icon={faLink} size="1x" /></span>
                    </div>
                    <input className="form-control" id="property-share-link" readOnly={true} type="text" value={this.state.share_link}></input>
                  </div>
                </div>
                <div className="col-md-6 mb-2 text-left">
                  <label className="bold-label">Social</label>
                  <div className="social-img">
                    <FacebookShareButton url={this.state.share_link}>
                      <FacebookIcon size={32} round={false} />
                    </FacebookShareButton>&nbsp;
                    <TwitterShareButton url={this.state.share_link}>
                      <TwitterIcon size={32} round={false} />
                    </TwitterShareButton>&nbsp;
                    <TumblrShareButton url={this.state.share_link}>
                      <TumblrIcon size={32} round={false} />
                    </TumblrShareButton>&nbsp;
                    <PinterestShareButton url={this.state.share_link}>
                      <PinterestIcon size={32} round={false} />
                    </PinterestShareButton>&nbsp;
                    <RedditShareButton url={this.state.share_link}>
                      <RedditIcon size={32} round={false} />
                    </RedditShareButton>
                  </div>
                </div>
                <div className="col-md-12 text-left">
                  <label className="bold-label">Email</label>
                  <input className="form-control" type="email" name="share_email" onChange={this.updateStatusFields}></input>
                </div>
              </div>
            </div>
            <div className="col-md-12 text-center mt-3">
              <span className="error"></span>
              <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.emailPropertyShare}>Share</button>
            </div>
          </div>
        </Modal>
      </div>
    );
	}
}