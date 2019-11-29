import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const initial_state = {
  error: "",
  message: "",
}

export default class NewProperty extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
  }
	constructor(props){
    super(props);
    this.state = initial_state;
  }
  componentDidMount () {
    this._isMounted = true;
  }
	render() {
		return (
      <div id="newproperty" className="container px-0 tab-pane active">
        <div className="profile-form">
          <div className="profile-form-in">
            <div className="container creation-steps px-0" id="step1">
              <div className="row bs-wizard mb-4 mx-0" style={{'borderBottom':0}}>
                <div className="col-xs-2 bs-wizard-step  complete current">
                  <div className="text-center bs-wizard-number">1</div>
                  <div className="text-center bs-wizard-stepnum">PROPERTY DETAILS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <Link className="bs-wizard-dot" to="#"></Link>
                </div>
                <div className="col-xs-2 bs-wizard-step  disabled ">
                  <div className="text-center bs-wizard-number">2</div>
                  <div className="text-center bs-wizard-stepnum">DEAL ANALYSIS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <Link className="bs-wizard-dot" to="#"></Link>
                </div>
                <div className="col-xs-2 bs-wizard-step  disabled ">
                  <div className="text-center bs-wizard-number">3</div>
                  <div className="text-center bs-wizard-stepnum">AUCTION DETAILS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <Link className="bs-wizard-dot" to="#"></Link>
                </div>
                <div className="col-xs-2 bs-wizard-step  disabled ">
                  <div className="text-center bs-wizard-number">4</div>
                  <div className="text-center bs-wizard-stepnum">UPLOAD PHOTOS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <Link to="#" className="bs-wizard-dot"></Link>
                </div>
              </div>
              <div className="col-md-12 text-center pb-4">
                <h6 className="step-number">step 1</h6>
                <h4 className="step-name">Property Details</h4>
              </div>
              <form className="row mx-0 creation-forms">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Property Address</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Property Category</label>
                    <select className="form-control" id="sel1">
                      <option></option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Land</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Property Type</label>
                    <select className="form-control" id="sel1">
                      <option></option>
                      <option>Single Family</option>
                      <option>TownHomes \ Condos</option>
                      <option>Multi Family</option>
                      <option>Apartments</option>
                      <option>Retail</option>
                      <option>Industrial</option>
                      <option>Office Building</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Bedrooms</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Bathrooms</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Garage</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Area</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Lot Size</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Year Built</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Units</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Stories</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Cap Rate</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Price Per SqFt</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Property Headliner</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Is this property on MLS?</label>
                    <select className="form-control" id="sel1">
                      <option></option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Did Property Flooded?</label>
                    <select className="form-control" id="sel1">
                      <option></option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>If Flooded</label>
                    <input type="" name="" placeholder="How many times and how high did the water get inside the property each time." className="form-control" disabled />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Estimated Rehab Cost</label>
                    <input type="" name="" className="form-control" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Property Description</label>
                    <textarea className="form-control" rows="2" id="comment"></textarea>
                  </div>
                </div>
              </form>
              <div className="col-md-12 text-center my-4">
                <a href="property-deals-analysis.html" className="red-btn step-btn">Continue</a>
              </div>
            </div>
            <div className="container creation-steps px-0 d-none" id="step2">
              <div className="row bs-wizard mb-4 mx-0" style={{'borderBottom':0}}>
                <div className="col-xs-2 bs-wizard-step  complete">
                  <div className="text-center bs-wizard-number">1</div>
                  <div className="text-center bs-wizard-stepnum">PROPERTY DETAILS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a className="bs-wizard-dot" href="#"></a>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete current">
                  <div className="text-center bs-wizard-number">2</div>
                  <div className="text-center bs-wizard-stepnum">DEAL ANALYSIS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a className="bs-wizard-dot" href="#"></a>
                </div>
                <div className="col-xs-2 bs-wizard-step  disabled ">
                  <div className="text-center bs-wizard-number">3</div>
                  <div className="text-center bs-wizard-stepnum">AUCTION DETAILS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a className="bs-wizard-dot" href="#"></a>
                </div>
                <div className="col-xs-2 bs-wizard-step  disabled ">
                  <div className="text-center bs-wizard-number">4</div>
                  <div className="text-center bs-wizard-stepnum">UPLOAD PHOTOS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a href="#" className="bs-wizard-dot"></a>
                </div>
              </div>
              <div className="col-md-12 text-center pb-4">
                <h6 className="step-number">step 2</h6>
                <h4 className="step-name">Deal Analysis</h4>
              </div>
              <form className="row mx-0 creation-forms">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>After Repair Value</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Sellers Asking Price</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Estimated Rehab Cost</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Profit Potential</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>ARV Proof/Financial Analysis</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Or upload ARV proof</label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFile"/>
                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Description of Repairs</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Or upload Estimated Rehab Cost</label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFile"/>
                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                  </div>
                </div>
              </form>
              <div className="col-md-12 text-center my-4">
                <a href="my-profileaa.html" className="red-btn step-btn mr-3">Go, Back</a>
                <a href="property-auction-details.html" className="red-btn step-btn ml-3">Continue</a>
              </div>
            </div>
            <div className="container creation-steps px-0 d-none" id="step3">
              <div className="row bs-wizard mb-4 mx-0" style={{'borderBottom':0}}>
                <div className="col-xs-2 bs-wizard-step  complete">
                  <div className="text-center bs-wizard-number">1</div>
                  <div className="text-center bs-wizard-stepnum">PROPERTY DETAILS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a className="bs-wizard-dot" href="#"></a>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete ">
                  <div className="text-center bs-wizard-number">2</div>
                  <div className="text-center bs-wizard-stepnum">DEAL ANALYSIS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a className="bs-wizard-dot" href="#"></a>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete current ">
                  <div className="text-center bs-wizard-number">3</div>
                  <div className="text-center bs-wizard-stepnum">AUCTION DETAILS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a className="bs-wizard-dot" href="#"></a>
                </div>
                <div className="col-xs-2 bs-wizard-step  disabled ">
                  <div className="text-center bs-wizard-number">4</div>
                  <div className="text-center bs-wizard-stepnum">UPLOAD PHOTOS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a href="#" className="bs-wizard-dot"></a>
                </div>
              </div>
              <div className="col-md-12 text-center pb-4">
                <h6 className="step-number">step 3</h6>
                <h4 className="step-name">Auction Details</h4>
              </div>
              <form className="row mx-0 creation-forms">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Sellers Asking Price</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Buy Now Price</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Auction Length</label>
                    <select className="form-control" id="sel1">
                      <option></option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Land</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Auction Start Date</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Ideal Closing Date</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="sel2">Mutiple select list</label>
                    <select className="form-control" id="sel2" name="sellist2">
                      <option>Cash</option>
                      <option>Line of Credit</option>
                      <option>Owner Finance</option>
                      <option>Hard Money</option>
                      <option>Convential Loan</option>
                      <option>Rehab Loan</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Title Status</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <label>Seller agrees to pay for?</label>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="radio" className="form-check-input" name="optradio"/>The owners title policy, 1/2 the escrow fees and prorated Taxes & HOA dues up to the day of closing/funding.
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="radio" className="form-check-input" name="optradio"/> Sellers prorated share of property Taxes & HOA dues up to the day of closing/funding. Buyer will have to pay for the owner's title policy, all escrow & closing costs.
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <label>Showing Instructions</label>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="radio" className="form-check-input" name="optradio"/>There are no inspections of the inside of the property. Users have to bid based upon all of the information provided including a video of the property.
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="radio" className="form-check-input" name="optradio"/> Wholesaler, Owner or Realtor does one showing 24 to 72 hours before auction ends, so that bidders can show up at one time to inspect property. This should be for a 1 to 2 hour period.
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="radio" className="form-check-input" name="optradio"/>  Wholesaler, Owner or Realtor gives buyer 48 business hours after they are chosen to be the Winning Bidder, subject to them putting up $1,000 non-refundable option fee for the right to inspect the property after the auction ends.
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="radio" className="form-check-input" name="optradio"/>  The property will be listed on mls, so buyer can call listing agent or their agent to schedule an appointment.
                    </label>
                  </div>
                </div>
              </form>
              <div className="col-md-12 text-center my-4">
                <a href="property-deals-analysis.html" className="red-btn step-btn mr-3">Go, Back</a>
                <a href="property-upload-photos.html" className="red-btn step-btn">Continue</a>
              </div>
            </div>
            <div className="container creation-steps px-0 d-none" id= "step4">
              <div className="row bs-wizard mb-4 mx-0" style={{'borderBottom':0}}>
                <div className="col-xs-2 bs-wizard-step  complete">
                  <div className="text-center bs-wizard-number">1</div>
                  <div className="text-center bs-wizard-stepnum">PROPERTY DETAILS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a className="bs-wizard-dot" href="#"></a>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete ">
                  <div className="text-center bs-wizard-number">2</div>
                  <div className="text-center bs-wizard-stepnum">DEAL ANALYSIS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a className="bs-wizard-dot" href="#"></a>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete ">
                  <div className="text-center bs-wizard-number">3</div>
                  <div className="text-center bs-wizard-stepnum">AUCTION DETAILS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a className="bs-wizard-dot" href="#"></a>
                </div>
                <div className="col-xs-2 bs-wizard-step complete current ">
                  <div className="text-center bs-wizard-number">4</div>
                  <div className="text-center bs-wizard-stepnum">UPLOAD PHOTOS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a href="#" className="bs-wizard-dot"></a>
                </div>
              </div>
              <div className="col-md-12 text-center pb-4">
                <h6 className="step-number">step 4</h6>
                <h4 className="step-name">Upload Photos and Videos</h4>
              </div>
              <form className="row mx-0 creation-forms">
                <div className="col-md-6">
                  <label>Select images associated with this property</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile"/>
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Youtube URL</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </form>
              <div className="col-md-12 text-center my-4">
                <a href="property-auction-details.html" className="red-btn step-btn mr-3">Go, Back</a>
                <a href="my-profilea.html" className="red-btn step-btn">Submit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
	}
}
