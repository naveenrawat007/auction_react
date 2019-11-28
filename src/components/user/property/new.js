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
            <div className="container creation-steps px-0">
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
          </div>
        </div>
      </div>
    );
	}
}
