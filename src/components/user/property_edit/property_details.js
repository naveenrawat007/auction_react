import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class PropertyDetails extends Component{
	constructor(props){
    super(props);
    this.state = {
      property: {
        unique_address: "",
        bedrooms: "",
        bathrooms: "",
        garage: "",
        area: "",
        lot_size: "",
        year_built: "",
        units: "",
        stories: "",
        cap_rate: "",
        price_per_sq_ft: "",


        address: "",
        city: "",
        state: "",
        zip_code: "",
        lat: "",
        long: "",
        category: "",
        p_type: "",
        headliner: "",
        mls_available: "",
        flooded: "",
        flood_count: "",
        description: "",
        owner_category: "",
        additional_information: "",
      }
    },
    property_address_error: "",
    property_city_error: "",
    property_state_error: "",
    property_zip_code_error: "",
    property_category_error: "",
    property_type_error: "",
    property_bedrooms_error: "",
    property_bathrooms_error: "",
    property_garage_error: "",
    property_area_error: "",
    property_lot_size_error: "",
    property_year_built_error: "",
    property_units_error: "",
    property_stories_error: "",
    property_cap_rate_error: "",
    property_price_per_sq_ft_error: "",
    property_headliner_error: "",
    property_mls_available_error: "",
    property_flooded_error: "",
    property_flood_count_error: "",
    property_description_error: "",
    property_owner_category_error: "",
    property_additional_information_error: "",
  }

  componentDidMount () {
  }

	render() {
		return (
      <div className="profile-setting">
        <div className="container custom_container px-0">
          <div className="row mx-0 profile_row my-5">
            <div className="col-md-12 px-0">
              <div className="tab-content">
                <div id="newproperty" className="container px-0">
                  <div className="profile-form">
                    <div className="profile-form-in">
                      <div className="container creation-steps px-0">
                        <div className="steps-parts " id="step1" >
                          {this.state.isLoaded === true ?
                            null
                          :
                          <div className="spinner_main">
                            <div className="spinner-grow" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                          }
                          <div className="col-md-12 text-center pb-4">
                            <h4 className="step-name">Property Details</h4>
                          </div>
                          <form className="row mx-0 creation-forms">
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Address</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text"  id="autocomplete-address" className={"form-control " + this.addErrorClass(this.state.property_address_error) } name="address" value={this.state.property.address} onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>City</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className={"form-control " + this.addErrorClass(this.state.property_city_error) } name="city" onChange={this.updateProperty} value={this.state.property.city}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>State</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className={"form-control " + this.addErrorClass(this.state.property_state_error) } name="state" onChange={this.updateProperty} value={this.state.property.state}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Zip</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className={"form-control " + this.addErrorClass(this.state.property_zip_code_error) } maxLength="6" name="zip_code" onChange={this.updateProperty} onKeyPress={this.checkNumeric} value={this.state.property.zip_code}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Category</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className={"form-control " + this.addErrorClass(this.state.property_category_error) } name="category" onChange={this.updateProperty} value={this.state.property.category}>
                                  {categories}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Type</label>
                              </div>
                              <div className="col-md-6 px-1 text-right">
                                <select className={"form-control " + this.addErrorClass(this.state.property_type_error) } name="p_type" onChange={this.updateProperty} value={this.state.property.p_type}>
                                  {types}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="bedrooms-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Bedrooms</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_bedrooms_error) } name="bedrooms" value={this.state.property.bedrooms} onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="bathrooms-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Bathrooms</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_bathrooms_error) } name="bathrooms" value={this.state.property.bathrooms} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="garage-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Garage</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_garage_error) } name="garage" value={this.state.property.garage} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="units-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Units</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_units_error) } name="units" value={this.state.property.units} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="stories-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Stories</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_stories_error) } name="stories" value={this.state.property.stories} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="cap_rate-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Cap Rate</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_cap_rate_error) } name="cap_rate" value={this.state.property.cap_rate} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="area-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Square Footage</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_area_error) } name="area" value={this.state.property.area} onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="lot-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Lot</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_lot_size_error) } name="lot_size" onChange={this.updateProperty} value={this.state.property.lot_size} onKeyPress={this.checkDecimalNumeric}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="year-built-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Year Built</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className={"form-control " + this.addErrorClass(this.state.property_year_built_error) } name="year_built" onChange={this.updateProperty} value={this.state.property.year_built} onKeyPress={this.checkNumeric} maxLength="4"/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="price_per_sq_ft-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Price Per SqFt</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_price_per_sq_ft_error) } name="price_per_sq_ft" onChange={this.updateProperty} value={this.state.property.price_per_sq_ft} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Headliner</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className={"form-control " + this.addErrorClass(this.state.property_headliner_error) } name="headliner" onChange={this.updateProperty} value={this.state.property.headliner}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Description</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className={"form-control textarea_step textarea-resize " + this.addErrorClass(this.state.property_description_error) } rows="2" id="comment" name="description" onChange={this.updateProperty} value={this.state.property.description}></textarea>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Is this property on MLS?</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" value={String(this.state.property.mls_available) === "true" ? "true" : "false"} name="mls_available" onChange={this.updateProperty}>
                                  <option value="true" >Yes</option>
                                  <option value="false" >No</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Did Property Flooded?</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" value={String(this.state.property.flooded)} name="flooded" onChange={this.updateProperty}>
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </select>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkFlooded()} id="flood_count-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>If Flooded</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea disabled id="flood_count_input" placeholder="How many times and how high did the water get inside the property each time." className={"form-control textarea_step textarea-resize " + this.addErrorClass(this.state.property_flood_count_error) } rows="2" name="flood_count" value={this.state.property.flood_count} onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>I'm selling the property as</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className={"form-control " + this.addErrorClass(this.state.property_owner_category_error)} name="owner_category" defaultValue={this.state.property.owner_category} onChange={this.updateProperty}>
                                  {owner_categories}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Title Status:</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className={"form-control " + this.addErrorClass(this.state.property_title_status_error)} name="title_status" onChange={this.updateProperty} value={this.state.property.title_status}>
                                  {title_statuses}
                                </select>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkTitleWarning()}>
                              <div className="offset-md-6 col-md-6 px-1 ">
                                <div className="title-status-error">
                                  <FontAwesomeIcon icon={faExclamationTriangle}/>
                                  <p>Title needs to be open before you can submit property to make sure there's not any liens that would prevent you from selling property.</p>
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Additional Title Information</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className={"form-control textarea-resize " + this.addErrorClass(this.state.property_additional_information_error) } rows="3" placeholder="Please provide name of escrow officer, phone number and if there's any issues that may prevent this property from closing." name="additional_information" value={this.state.property.additional_information} onChange={this.updateProperty}></textarea>
                              </div>
                            </div>
                          </form>
                          <div className="col-md-12 text-center my-4">
                            <Link to="#" className="red-btn step-btn mx-1" onClick={this.submitStepOne}>Continue</Link>
                          </div>
                        </div>
                      </div>
                    </div>
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
