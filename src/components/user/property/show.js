import React, {Component} from 'react';

export default class PropertyShow extends Component {

  constructor(props){
    super(props);
    this.state = {
      property: {},
      isLoaded: false,
      message: "",
    }
  };

  getProperty = () => {
    console.log(this.props.match.params.id); //  params.id == this.props.match.params.id
    const { match: { params } } = this.props;
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/ " + params.id
    fetch(url,{
      method: 'GET',
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
    })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 200){
        this.setState({
          isLoaded: true,
          property: result.property,
        });
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }
      else{
        this.setState({
          isLoaded: true,
        });
      }
    })
    .catch(
      (error) => {
        this.setState({
          isLoaded: true,
          message: "Can not load the authors. Problem with server",
        });
      }
    )
  }


  componentDidMount = () => {
    this.getProperty();
    window.scrollTo(0,0)
  }


  render(){
    return (
      <div className="container custom_container">
        <div className="row">
          <div className="col-md-8 px-2">
            <div className="wrap_property">
              <div className="property-head">
                <div className="head_address">
                  <h3 className="font-blue">5610 Woodlark Street, Houston, TX, A</h3>
                  <h5>Property Type: Single Family</h5>
                </div>
                <div className="head_icon">
                  <a href="#" className="head_icon_box">
                    <i className="fa fa-bed"></i>
                    <p>4 Beds</p>
                  </a>
                  <a href="#" className="head_icon_box">
                    <i className="fa fa-bath"></i>
                    <p>2 Baths</p>
                  </a>
                  <a href="#" className="">
                    <i className="fa fa-car"></i>
                    <p>1 Car</p>
                  </a>
                </div>
              </div>
              <div className="property_gallery">
                <div className="mySlides" style={{display: "block"}}>
                  <img src="/images/homee1.png" style={{width:"100%", height: "500px"}}/>
                </div>
                <div className="mySlides">
                  <img src="/images/homee2.png" style={{width:"100%", height: "500px"}}/>
                </div>
                <div className="mySlides">
                  <img src="/images/home3.png" style={{width:"100%", height: "500px"}}/>
                </div>
                <div className="mySlides">
                  <img src="/images/home4.png" style={{width:"100%", height: "500px"}}/>
                </div>
                <div className="mySlides">
                  <img src="/images/home5.png" style={{width:"100%", height: "500px"}}/>
                </div>
                <div className="mySlides">
                  <img src="/images/home6.png" style={{width:"100%", height: "400px"}}/>
                </div>
                <a className="prev" onclick="plusSlides(-1)">❮</a>
                <a className="next" onclick="plusSlides(1)">❯</a>
                <div className="row_gallery">
                  <div className="column_gallery">
                    <img className="demo cursor" src="/images/homee1.png" style={{width:"100%", height: "80px"}} onclick="currentSlide(1)" alt="The Woods"/>
                  </div>
                  <div className="column_gallery">
                    <img className="demo cursor" src="/images/homee2.png" style={{width:"100%", height: "80px"}} onclick="currentSlide(2)" alt="Cinque Terre"/>
                  </div>
                  <div className="column_gallery">
                    <img className="demo cursor" src="/images/home3.png" style={{width:"100%", height: "80px"}} onclick="currentSlide(3)" alt="Mountains and fjords"/>
                  </div>
                  <div className="column_gallery">
                    <img className="demo cursor" src="/images/home4.png" style={{width:"100%", height: "80px"}} onclick="currentSlide(4)" alt="Northern Lights"/>
                  </div>
                  <div className="column_gallery">
                    <img className="demo cursor" src="/images/home5.png" style={{width:"100%", height: "80px"}} onclick="currentSlide(3)" alt="Mountains and fjords"/>
                  </div>
                  <div className="column_gallery">
                    <img className="demo cursor" src="/images/home6.png" style={{width:"100%", height: "80px"}} onclick="currentSlide(4)" alt="Northern Lights"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 px-2">
            <div className="wrap_property">
              <div className="time_status">
                <ul>
                  <li>05</li>
                  <li>Days</li>
                </ul>
                <ul>
                  <li>01</li>
                  <li>Hours</li>
                </ul>
                <ul>
                  <li>36</li>
                  <li>Minutes</li>
                </ul>
                <ul>
                  <li>36</li>
                  <li>Seconds</li>
                </ul>
              </div>
            </div>
            <div className="wrap_property py-4">
              <div className="property_rate text-center">
                <h4>$ 90,000</h4>
                <p className="mb-0">Current Highest Bid.</p>
                <div className="input-group my-2 col-md-8 offset-md-2">
                  <div className="input-group-prepend">
                    <span className="input-group-text group-box"><i className="fa fa-minus"></i></span>
                  </div>
                  <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                  <div className="input-group-append">
                    <span className="input-group-text group-box"><i className="fa fa-plus"></i></span>
                  </div>
                </div>
                <a href="" className="blue-btn btn-biding">Place Bid</a>
                <h5 className="my-2">OR</h5>
                <p className="mb-0">Can't wait for the Auction to end?</p>
                <a href="" className="blue-btn btn-biding my-2" data-toggle="modal" data-target="#buynowModal">
                  <div className="tooltip">Buy Now
                    <span className="tooltiptext">
                      <h6>Buy Now!</h6>
                      <p>You don't have to wait for the binding to end, or compete with other offers if you are willing to buy this property at this price?</p>
                    </span>
                  </div>
                </a>
                <h4 className="rate-head">$ 98,000</h4>
              </div>
            </div>
            <div className="wrap_property py-3">
              <div className="estimated_rate">
                <div className="price-box">
                  <ul className="list-inline mb-2">
                    <li className="list-inline-item">After Repaired Value:</li>
                    <li className="list-inline-item">$160,000</li>
                  </ul>
                  <ul className="list-inline mb-2">
                    <li className="list-inline-item">Sellers Asking Price:</li>
                    <li className="list-inline-item">$79,900</li>
                  </ul>
                  <ul className="list-inline mb-2">
                    <li className="list-inline-item">Estimated Rehab Cost:</li>
                    <li className="list-inline-item">$33,000</li>
                  </ul>
                </div>
                <ul className="list-inline my-2">
                  <li className="list-inline-item font-red">Potential Profit:</li>
                  <li className="list-inline-item font-red">$47,100</li>
                </ul>
                <p className="mb-0 mt-5"><span>Note:</span>&nbsp;These are ballpark estimates so please do your own dillgence for ARV and Estimated Rehab Costs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-12 px-2">
            <div className="wrap_property row mx-0">
              <div className="col-md-4 pr-2 pl-0 detail_sec">
                <div className="detailed_box">
                  <h5 className="mb-3 main_box_head">Property Details</h5>
                  <div className="detailed_content">
                    <p><span>Residential | Single Family</span></p>
                    <ul className="list-inline">
                      <li className="list-inline-item"><span>Beds:</span> 4</li>|
                      <li className="list-inline-item"><span>Baths:</span> 2.5</li>|
                      <li className="list-inline-item"><span>Garage:</span> 2</li>|
                      <li className="list-inline-item"><span>Sqft:</span> 1980</li>|
                      <li className="list-inline-item"><span>Lot Size:</span> 9030</li>|
                      <li className="list-inline-item"><span>Built:</span> 1971</li>
                    </ul>
                    <p>Great opportunity to Buy, Rehab, & Hold for Excellent Cash Flow!!! Property flooded only once during Harvey with 11 inches of water*Roof &Hardiplank siding & soffits new in 2011*Ac 8 yrs old*Plantation Shutters on 50% of windows*House needs complete rehab, but will be in goof Equity position with Excellent CASH Flow! See Jet Lending numbers in PDF below??</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 pl-3 pr-2 detail_sec">
                <div className="fees_box">
                  <h5 className="mb-3 main_box_head">Property Fees and Transaction Information</h5>
                  <div className="fees-content">
                    <ul>
                      <li>Buyer Won't pay any buyer premium or any fees for this property.</li>
                      <li>Buyer pays for owners title policy, all escrow fees and will be responsible for property taxes & HOA fees from the day of closing until the end of the year. Seller pays for their prorated share of property taxes & HOA dues up to the day of closing/funding</li>
                      <li>Buyer will be responsible to buy survey, HOA documnets and resale certificate if neede.</li>
                      <li>Earnest Money Deposit is $2,000 or 2% of the sales price(whichever is greater).</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 pl-3 pr-0 doc_sec">
                <div className="doc_box">
                  <h5 className="mb-3 main_box_head">Property Documents</h5>
                  <div className="doc_content">
                    <div className="pdf_type">
                      <div className="pdf-box">
                        <i className="fa fa-file-pdf-o"></i>
                        <p>Rehab #'s</p>
                      </div>
                    </div>
                    <div className="pdf_type">
                      <div className="pdf-box">
                        <i className="fa fa-file-pdf-o"></i>
                        <p>Sold Comparables</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 px-2">
            <div className="wrap_property">
              <h5 className="mb-3 main_box_head">Property Auction Terms and Disclaimers</h5>
              <div className="video-box">
                <iframe height="350" src="https://www.youtube.com/embed/X080gIJFE3M?controls=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
              </div>
            </div>
          </div>
          <div className="col-md-6 px-2">
            <div className="wrap_property">
              <h5 className="mb-3 main_box_head">Property Location</h5>
              <div className="map-box">
                <img className="img-fluid" src="/images/location.png"/>
              </div>
            </div>
          </div>
          <div className="col-md-8 mb-3 px-2">
            <div className="wrap_property">
              <h5 className="mb-3 main_box_head">Property Auction Terms and Disclaimers</h5>
              <div className="terms-box">
                <ul>
                  <li>Seller will only accept Cash, Line of Credit or Hard Money Loans for fixer upper properties.</li>
                  <li>Seller's Ideal Closing Date: January 29, 2018.</li>
                  <li>Property is being offered "AS IS, WHERE IS".</li>
                  <li>There are no inspection or financing contengencies.</li>
                  <li>Bidders must inspect property before bidding ends or ask for inspection contigencyto take place within 48 bussiness hours of acceptance. if bidder asks for contigency they will be subject to losing their $997 deposit for taking the property off the market if they don't close on property. if they do close then this $997 will go towards buyers earnest money.</li>
                  <li>All pictures, details or descriptionsof any property, condition of title, value or otherwise is provided for informational purposes only and may not represent the true and current status of the property now or at the time of sale. </li>
                  <li>Title is opent for subject property, and seller warrants there aren't any liens on property that will prevent it from closing.</li>
                  <li>Buyer will receive a General or Special Warranty Deed, depending on title.</li>
                  <li>The Buy Now feature will allows users to buy a property NOW insted of waiting for the auction to end.</li>
                  <li>Seller reserves the right to a final review and can accept or reject any offers if highest or Buy Now Bidder dosen't provide satisfactory verification of their ability to close on the propert.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 px-2">
            <div className="wrap_property">
              <h5 className="mb-3 main_box_head">Showing Information</h5>
              <div className="info-box">
                <img src="/images/openhouse.png" className="img-fluid" alt=""/>
                <div className="info-content">
                  <p>Wholesaler, Owner or Realtor gives buyer 48 bussiness hours after they our chosen to be winning Bidder, subject to them putting up $1,000 non-refundable option fee for the right to inspect the property after auction ends.</p>
                  <div className="info-icon-box">
                    <a href="#" className="info_icon">
                      <i className="fa fa-question"></i>
                      <h6>Ask a Question</h6>
                    </a>
                    <a href="#" className="info_icon">
                      <i className="fa fa-calendar"></i>
                      <h6>Schedule a Visit</h6>
                    </a>
                    <a href="#" className="info_icon">
                      <i className="fa fa-comments"></i>
                      <h6>FAQ</h6>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 px-2 mb-3">
            <div className="offer-box">
              <div className="offer-head">
                <img src="/images/home3.png" alt=""/>
                <div className="like-icon">
                  <i className="fa fa-heart-o"></i>
                </div>
                <div className="time-box">
                  <p>01d:12h:04m:03s</p>
                </div>
              </div>
              <div className="offer-body">
                <div className="rate-row">
                  <h5 className="mb-0">$185,000</h5>
                  <p>3 bds | 2ba | 1129 sqft</p>
                </div>
                <p className="mb-2">6001 Kiam st, Houston, TX 77007</p>
                <div className="status-row mb-2">
                  <p className="offer-dot mb-0 mr-2"></p>
                  <p className="mb-0">Live Online Bidding</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 px-2 mb-3">
            <div className="offer-box">
              <div className="offer-head">
                <img src="/images/home4.png" alt=""/>
                <div className="like-icon">
                  <i className="fa fa-heart-o"></i>
                </div>
                <div className="time-box">
                  <p>01d:12h:04m:03s</p>
                </div>
              </div>
              <div className="offer-body">
                <div className="rate-row">
                  <h5 className="mb-0">$185,000</h5>
                  <p>3 bds | 2ba | 1129 sqft</p>
                </div>
                <p className="mb-2">6001 Kiam st, Houston, TX 77007</p>
                <div className="status-row mb-2">
                  <p className="offer-dot mb-0 mr-2"></p>
                  <p className="mb-0">Live Online Bidding</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 px-2 mb-3">
            <div className="offer-box">
              <div className="offer-head">
                <img src="/images/home5.png" alt=""/>
                <div className="like-icon">
                  <i className="fa fa-heart-o"></i>
                </div>
                <div className="time-box">
                  <p>01d:12h:04m:03s</p>
                </div>
              </div>
              <div className="offer-body">
                <div className="rate-row">
                  <h5 className="mb-0">$185,000</h5>
                  <p>3 bds | 2ba | 1129 sqft</p>
                </div>
                <p className="mb-2">6001 Kiam st, Houston, TX 77007</p>
                <div className="status-row mb-2">
                  <p className="offer-dot mb-0 mr-2"></p>
                  <p className="mb-0">Offer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 px-2 mb-3">
            <div className="offer-box">
              <div className="offer-head">
                <img src="/images/home6.png" alt=""/>
                <div className="like-icon">
                  <i className="fa fa-heart-o"></i>
                </div>
                <div className="time-box">
                  <p>01d:12h:04m:03s</p>
                </div>
              </div>
              <div className="offer-body">
                <div className="rate-row">
                  <h5 className="mb-0">$185,000</h5>
                  <p>3 bds | 2ba | 1129 sqft</p>
                </div>
                <p className="mb-2">6001 Kiam st, Houston, TX 77007</p>
                <div className="status-row mb-2">
                  <p className="offer-dot mb-0 mr-2"></p>
                  <p className="mb-0">Offer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
