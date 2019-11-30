import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const initial_state = {
  created: "",
  error: "",
  message: "",
  property: {
    address: "",
    city: "",
    state: "",
    zip_code: "",
    category: "",
    p_type: "",
    bedrooms: "",
    bathrooms: "",
    garage: "",
    area: "",
    lot_size: "",
    year_built: "",
    units: "",
    stores: "",
    cap_rate: "",
    price_per_sq_ft: "",
    headliner: "",
    mls_available: "",
    flooded: "",
    flood_count: "",
    estimated_rehab_cost: "",
    description: "",
    seller_price: "",
    buy_now_price: "",
    auction_started_at: "",
    auction_length: "",
    auction_ending_at: "",
    pay_type: "",
    title_status: "",
    seller_pay_type_id: "",
    show_instructions_type_id: "",
    youtube_url: ""
  },
  property_options: {
    types: [],
    categories: [],
    seller_pay_types: {},
    show_instructions_types: {},
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
  property_stores_error: "",
  property_cap_rate_error: "",
  property_price_per_sq_ft_error: "",
  property_headliner_error: "",
  property_mls_available_error: "",
  property_flooded_error: "",
  property_flood_count_error: "",
  property_estimated_rehab_cost_error: "",
  property_description_error: "",
  property_seller_price_error: "",
  property_buy_price_error: "",
  property_auction_length_error: "",
  property_auction_started_at_error: "",
  property_auction_ending_at_error: "",
  property_pay_type_error: "",
  property_title_status_error: "",
  property_seller_pay_type_id_error: "",
  property_show_instructions_type_id_error: "",
  property_youtube_url_error: ""
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
    this.setUpStepOne();
  }

  setUpStepOne = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/new"
  	fetch(url ,{
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
				"Access-Control-Allow-Headers": "*",
			}
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        this.setState({
          property_options: {
            ...this.state.property_options,
            types: result.types,
            categories: result.categories,
            seller_pay_types: result.seller_pay_types,
            show_instructions_types: result.show_instructions_types,
          }
        });
        this.setState({
          property: {
          ...this.state.property,
          p_type: result.types[0],
          category: result.categories[0],
          flooded: false,
          mls_available: false
          }
        });

        // this.setState({
        //   variant: "success",
        //   message: result.message,
        //   loaded: true
        // });
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        // this.setState({loaded: true, message: result.message,
        // variant: "danger"});
      }
      this.clearMessageTimeout = setTimeout(() => {
        this.setState(() => ({message: ""}))
      }, 2000);
		}, (error) => {
		});
  }

  submitStepOne = () => {
    let formIsValid = this.stepOneValidation();
    if (formIsValid){
      if (this.state.created !== true){
        this.sendStepOneData()
      }else {
        this.goToStepTwo()
      }

    }
  }

  sendStepOneData = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties"
  	fetch(url ,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: JSON.stringify({property: this.state.property}),
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        this.setState({
          created: true
        });
        this.goToStepTwo();
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        this.setState({loaded: true, message: result.message,
        variant: "danger"});
      }
      this.clearMessageTimeout = setTimeout(() => {
        this.setState(() => ({message: ""}))
      }, 2000);
		}, (error) => {
		});
  }

  goToStepTwo = () => {
    document.getElementById('step1').classList.add('d-none');
    document.getElementById('step2').classList.remove('d-none');
  }

  backToStepOne = () => {
    document.getElementById('step1').classList.remove('d-none');
    document.getElementById('step2').classList.add('d-none');
  }

  submitStepTwo = () => {
    document.getElementById('step2').classList.add('d-none');
    document.getElementById('step3').classList.remove('d-none');
  }

  backToStepTwo = () => {
    document.getElementById('step2').classList.remove('d-none');
    document.getElementById('step3').classList.add('d-none');
  }

  submitStepThree = () => {
    document.getElementById('step3').classList.add('d-none');
    document.getElementById('step4').classList.remove('d-none');
  }
  backToStepThree = () => {
    document.getElementById('step3').classList.remove('d-none');
    document.getElementById('step4').classList.add('d-none');
  }

  updateProperty = (event) => {
    const{ name, value } = event.target;
    this.setState({
      property: {
      ...this.state.property,
      [name]: value
      }
    }, function () {
      this.stepOneCustomValidation(name);
    });
  }

  stepOneValidation = () => {
    let property_address_error = "";
    let property_city_error = "";
    let property_state_error = "";
    let property_zip_code_error = "";
    let property_category_error = "";
    let property_type_error = "";
    let property_bedrooms_error = "";
    let property_bathrooms_error = "";
    let property_garage_error = "";
    let property_area_error = "";
    let property_lot_size_error = "";
    let property_year_built_error = "";
    let property_units_error = "";
    let property_stores_error = "";
    let property_cap_rate_error = "";
    let property_price_per_sq_ft_error = "";
    let property_headliner_error = "";
    let property_mls_available_error = "";
    let property_flooded_error = "";
    let property_flood_count_error = "";
    let property_estimated_rehab_cost_error = "";
    let property_description_error = "";

    if (this.state.property.address === ""){
      property_address_error = "Property address can't be blank."
    }
    if (this.state.property.city === ""){
      property_city_error = "City can't be blank."
    }
    if (this.state.property.state === ""){
      property_state_error = "State can't be blank."
    }
    if (this.state.property.zip_code === ""){
      property_zip_code_error = "Zip Code can't be blank."
    }
    if (this.state.property.category === ""){
      property_category_error = "Property category can't be blank."
    }
    if (this.state.property.p_type === ""){
      property_type_error = "Property Type can't be blank."
    }
    if (this.state.property.bedrooms === ""){
      property_bedrooms_error = "This field can't be blank."
    }
    if (this.state.property.bathrooms === ""){
      property_bathrooms_error = "This field can't be blank."
    }
    if (this.state.property.garage === ""){
      property_garage_error = "This field can't be blank."
    }
    if (this.state.property.area === ""){
      property_area_error = "Area can't be blank."
    }
    if (this.state.property.lot_size === ""){
      property_lot_size_error = "Lot size can't be blank."
    }
    if (this.state.property.year_built === ""){
      property_year_built_error = "Property built year can't be blank."
    }
    if (this.state.property.units === ""){
      property_units_error = "units can't be blank."
    }
    if (this.state.property.stores === ""){
      property_stores_error = "Stores can't be blank."
    }
    if (this.state.property.stores === ""){
      property_cap_rate_error = "Cap Rate can't be blank."
    }
    if (this.state.property.price_per_sq_ft === ""){
      property_price_per_sq_ft_error = "Price per SqFt can't be blank."
    }
    if (this.state.property.headliner === ""){
      property_headliner_error = "Headliner can't be blank."
    }
    if (this.state.property.mls_available === ""){
      property_mls_available_error = "Please select any one."
    }
    if (this.state.property.flooded === ""){
      property_flooded_error = "Please select one."
    }
    if (this.state.property.flooded === "true"){
      if (this.state.property.flood_count === ""){
        property_flood_count_error = "Flood count cant be blank."
      }
    }
    if (this.state.property.estimated_rehab_cost === ""){
      property_estimated_rehab_cost_error = "Rehab cost can't be blank."
    }
    if (this.state.property.description === ""){
      property_description_error = "Property description can't be blank."
    }

    this.setState({
      property_address_error,
      property_city_error,
      property_state_error,
      property_zip_code_error,
      property_category_error,
      property_type_error,
      property_bedrooms_error,
      property_bathrooms_error,
      property_garage_error,
      property_area_error,
      property_lot_size_error,
      property_year_built_error,
      property_units_error,
      property_stores_error,
      property_cap_rate_error,
      property_price_per_sq_ft_error,
      property_headliner_error,
      property_mls_available_error,
      property_flooded_error,
      property_flood_count_error,
      property_estimated_rehab_cost_error,
      property_description_error,
    },function () {
      if (property_address_error !== "" || property_city_error !== "" || property_state_error !== "" || property_zip_code_error !== "" || property_category_error !== "" || property_type_error !== "" || property_bedrooms_error !== "" || property_bathrooms_error !== "" || property_garage_error !== "" || property_area_error !== "" || property_lot_size_error !== "" || property_year_built_error !== "" || property_units_error !== "" || property_stores_error !== "" || property_cap_rate_error !== "" || property_price_per_sq_ft_error !== ""|| property_headliner_error !== "" || property_mls_available_error !== "" || property_flooded_error !== "" || property_flood_count_error !== "" || property_estimated_rehab_cost_error !== "" || property_description_error !== "" ){
        return false;
      }else {
        return true;
      }
    })
    if (property_address_error !== "" || property_city_error !== "" || property_state_error !== "" || property_zip_code_error !== "" || property_category_error !== "" || property_type_error !== "" || property_bedrooms_error !== "" || property_bathrooms_error !== "" || property_garage_error !== "" || property_area_error !== "" || property_lot_size_error !== "" || property_year_built_error !== "" || property_units_error !== "" || property_stores_error !== "" || property_cap_rate_error !== "" || property_price_per_sq_ft_error !== ""|| property_headliner_error !== "" || property_mls_available_error !== "" || property_flooded_error !== "" || property_flood_count_error !== "" || property_estimated_rehab_cost_error !== "" || property_description_error !== "" ){
      return false;
    }else{
      return true;
    }
  }

  stepOneCustomValidation = (name) => {
    let property_address_error = "";
    let property_city_error = "";
    let property_state_error = "";
    let property_zip_code_error = "";
    let property_category_error = "";
    let property_type_error = "";
    let property_bedrooms_error = "";
    let property_bathrooms_error = "";
    let property_garage_error = "";
    let property_area_error = "";
    let property_lot_size_error = "";
    let property_year_built_error = "";
    let property_units_error = "";
    let property_stores_error = "";
    let property_cap_rate_error = "";
    let property_price_per_sq_ft_error = "";
    let property_headliner_error = "";
    let property_mls_available_error = "";
    let property_flooded_error = "";
    let property_flood_count_error = "";
    let property_estimated_rehab_cost_error = "";
    let property_description_error = "";

    if (name === "address"){
      if (this.state.property.address === ""){
        property_address_error = "Property address can't be blank."
      }
      this.setState({
        property_address_error
      });
    }else if (name === "city") {
      if (this.state.property.city === ""){
        property_city_error = "City can't be blank."
      }
      this.setState({
        property_city_error
      });
    }else if (name === "state") {
      if (this.state.property.state === ""){
        property_state_error = "State can't be blank."
      }
      this.setState({
        property_state_error
      });
    }else if (name === "zip_code") {
      if (this.state.property.zip_code === ""){
        property_zip_code_error = "Zip Code can't be blank."
      }
      this.setState({
        property_zip_code_error
      });
    }else if (name === "category") {
      if (this.state.property.category === ""){
        property_category_error = "Property category can't be blank."
      }
      this.setState({
        property_category_error
      });
    }else if (name === "type") {
      if (this.state.property.p_type === ""){
        property_type_error = "Property Type can't be blank."
      }
      this.setState({
        property_type_error
      });
    }else if (name === "bedrooms") {
      if (this.state.property.bedrooms === ""){
        property_bedrooms_error = "This field can't be blank."
      }
      this.setState({
        property_bedrooms_error
      });
    }else if (name === 'bathrooms') {
      if (this.state.property.bathrooms === ""){
        property_bathrooms_error = "This field can't be blank."
      }
      this.setState({
        property_bathrooms_error
      });
    }else if (name === 'garage') {
      if (this.state.property.garage === ""){
        property_garage_error = "This field can't be blank."
      }
      this.setState({
        property_garage_error
      });
    }else if (name === 'area') {
      if (this.state.property.area === ""){
        property_area_error = "Area can't be blank."
      }
      this.setState({
        property_area_error
      });
    }else if (name === 'lot_size') {
      if (this.state.property.lot_size === ""){
        property_lot_size_error = "Lot size can't be blank."
      }
      this.setState({
        property_lot_size_error
      });
    }else if (name === 'year_built') {
      if (this.state.property.year_built === ""){
        property_year_built_error = "Property built year can't be blank."
      }
      this.setState({
        property_year_built_error
      });
    }else if (name === 'units') {
      if (this.state.property.units === ""){
        property_units_error = "units can't be blank."
      }
      this.setState({
        property_units_error
      });
    }else if (name === 'stores') {
      if (this.state.property.stores === ""){
        property_stores_error = "Stores can't be blank."
      }
      this.setState({
        property_stores_error
      });
    }else if (name === 'cap_rate') {
      if (this.state.property.stores === ""){
        property_cap_rate_error = "Cap Rate can't be blank."
      }
      this.setState({
        property_cap_rate_error
      });
    }else if (name === 'price_per_sq_ft') {
      if (this.state.property.price_per_sq_ft === ""){
        property_price_per_sq_ft_error = "Price per SqFt can't be blank."
      }
      this.setState({
        property_price_per_sq_ft_error
      });
    }else if (name === 'headliner') {
      if (this.state.property.headliner === ""){
        property_headliner_error = "Headliner can't be blank."
      }
      this.setState({
        property_headliner_error
      });
    }else if (name === 'mls_available') {
      if (this.state.property.mls_available === ""){
        property_mls_available_error = "Please select any one."
      }
      this.setState({
        property_mls_available_error
      });
    }else if (name === 'flooded') {
      if (this.state.property.flooded === ""){
        property_flooded_error = "Please select one."
      }
      this.setState({
        property_flooded_error
      });
    }else if (name === 'flood_count') {
      if (this.state.property.flooded === "true"){
        if (this.state.property.flood_count === ""){
          property_flood_count_error = "Flood count cant be blank."
        }
      }
      this.setState({
        property_flood_count_error
      });
    }else if (name === 'estimated_rehab_cost') {
      if (this.state.property.estimated_rehab_cost === ""){
        property_estimated_rehab_cost_error = "Rehab cost can't be blank."
      }
      this.setState({
        property_estimated_rehab_cost_error
      });
    }else if (name === 'description') {
      if (this.state.property.description === ""){
        property_description_error = "Property description can't be blank."
      }
      this.setState({
        property_description_error
      });
    }
  }

  addErrorMessage = (msg) => {
    if (msg === ""){
      return ;
    }else{
      return (<span className="error-class"> {msg} </span>);
    }
  }
  checkNumeric = (e) => {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(
      !e.charCode
      ? e.which
      : e.charCode);
    if (!regex.test(str)) {
      e.preventDefault();
      return false;
    }
  }
	render() {
    const categories = this.state.property_options.categories.map((value, index) => {
      return(
        <option key={index} value={value} >{value}</option>
      )
    })
    const types = this.state.property_options.types.map((value, index) => {
      return(
        <option key={index} value={value} >{value}</option>
      )
    })
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
                    <input type="text" className="form-control" name="address" onChange={this.updateProperty}/>
                    {this.addErrorMessage(this.state.property_address_error)}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" className="form-control" name="city" onChange={this.updateProperty}/>
                    {this.addErrorMessage(this.state.property_city_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" className="form-control" name="state" onChange={this.updateProperty}/>
                    {this.addErrorMessage(this.state.property_state_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Zip code</label>
                    <input type="text" className="form-control" maxLength="6" name="zip_code" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                    {this.addErrorMessage(this.state.property_zip_code_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Property Category</label>
                    <select className="form-control" name="category" onChange={this.updateProperty}>
                      {categories}
                    </select>
                    {this.addErrorMessage(this.state.property_category_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Property Type</label>
                    <select className="form-control" name="p_type" onChange={this.updateProperty}>
                      {types}
                    </select>
                    {this.addErrorMessage(this.state.property_type_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Bedrooms</label>
                    <input type="text" className="form-control" name="bedrooms" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                    {this.addErrorMessage(this.state.property_bedrooms_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Bathrooms</label>
                    <input type="text" className="form-control" name="bathrooms" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                    {this.addErrorMessage(this.state.property_bathrooms_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Garage</label>
                    <input type="text" className="form-control" name="garage" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                    {this.addErrorMessage(this.state.property_garage_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Area (SqFt)</label>
                    <input type="number" className="form-control" name="area" onChange={this.updateProperty}/>
                    {this.addErrorMessage(this.state.property_area_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Lot Size</label>
                    <input type="number" className="form-control" name="lot_size" onChange={this.updateProperty} onKeyPress={this.checkDecimalNumeric}/>
                    {this.addErrorMessage(this.state.property_lot_size_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Year Built</label>
                    <input type="text" className="form-control" name="year_built" onChange={this.updateProperty} onKeyPress={this.checkNumeric} maxLength="4"/>
                    {this.addErrorMessage(this.state.property_year_built_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Units</label>
                    <input type="text" className="form-control" name="units" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                    {this.addErrorMessage(this.state.property_units_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Stores</label>
                    <input type="text" className="form-control" name="stores" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                    {this.addErrorMessage(this.state.property_stores_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Cap Rate</label>
                    <input type="number" className="form-control" name="cap_rate" onChange={this.updateProperty} />
                    {this.addErrorMessage(this.state.property_cap_rate_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Price Per SqFt</label>
                    <input type="text" className="form-control" name="price_per_sq_ft" onChange={this.updateProperty}/>
                    {this.addErrorMessage(this.state.property_price_per_sq_ft_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Property Headliner</label>
                    <input type="text" className="form-control" name="headliner" onChange={this.updateProperty}/>
                    {this.addErrorMessage(this.state.property_headliner_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Is this property on MLS?</label>
                    <select className="form-control" defaultValue="false" name="mls_available" onChange={this.updateProperty}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    {this.addErrorMessage(this.state.property_mls_available_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Did Property Flooded?</label>
                    <select className="form-control" defaultValue="false" name="flooded" onChange={this.updateProperty}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    {this.addErrorMessage(this.state.property_flooded_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>If Flooded</label>
                    <input type="" placeholder="How many times and how high did the water get inside the property each time." className="form-control" name="flood_count" onChange={this.updateProperty}/>
                    {this.addErrorMessage(this.state.property_flood_count_error)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Estimated Rehab Cost</label>
                    <input type="number" className="form-control" name="estimated_rehab_cost" onChange={this.updateProperty}/>
                    {this.addErrorMessage(this.state.property_estimated_rehab_cost_error)}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Property Description</label>
                    <textarea className="form-control" rows="2" id="comment" name="description" onChange={this.updateProperty}></textarea>
                    {this.addErrorMessage(this.state.property_description_error)}
                  </div>
                </div>
              </form>
              <div className="col-md-12 text-center my-4">
                <Link to="#" className="red-btn step-btn" onClick={this.submitStepOne}>Continue</Link>
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
                  <Link className="bs-wizard-dot" to="#"></Link>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete current">
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
                      <input type="file" className="custom-file-input"/>
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
                      <input type="file" className="custom-file-input" />
                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                  </div>
                </div>
              </form>
              <div className="col-md-12 text-center my-4">
                <Link to="#" className="red-btn step-btn mr-3" onClick={this.backToStepOne}>Go, Back</Link>
                <Link to="#" className="red-btn step-btn ml-3" onClick={this.submitStepTwo}>Continue</Link>
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
                  <Link className="bs-wizard-dot" to="#"></Link>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete ">
                  <div className="text-center bs-wizard-number">2</div>
                  <div className="text-center bs-wizard-stepnum">DEAL ANALYSIS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <Link className="bs-wizard-dot" to="#"></Link>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete current ">
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
                    <select className="form-control">
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
                    <select className="form-control"  name="sellist2">
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
                <Link to="#" className="red-btn step-btn mr-3" onClick={this.backToStepTwo}>Go, Back</Link>
                <Link to="#" className="red-btn step-btn" onClick={this.submitStepThree}>Continue</Link>
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
                  <Link className="bs-wizard-dot" to="#"></Link>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete ">
                  <div className="text-center bs-wizard-number">2</div>
                  <div className="text-center bs-wizard-stepnum">DEAL ANALYSIS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <Link className="bs-wizard-dot" to="#"></Link>
                </div>
                <div className="col-xs-2 bs-wizard-step  complete ">
                  <div className="text-center bs-wizard-number">3</div>
                  <div className="text-center bs-wizard-stepnum">AUCTION DETAILS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <Link className="bs-wizard-dot" to="#"></Link>
                </div>
                <div className="col-xs-2 bs-wizard-step complete current ">
                  <div className="text-center bs-wizard-number">4</div>
                  <div className="text-center bs-wizard-stepnum">UPLOAD PHOTOS</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <Link to="#" className="bs-wizard-dot"></Link>
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
                <Link to="#" className="red-btn step-btn mr-3" onClick={this.backToStepThree}>Go, Back</Link>
                <Link to="#" className="red-btn step-btn" onClick={this.submitStepThree}>Submit</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
	}
}
