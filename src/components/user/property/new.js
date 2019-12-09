import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiSelect from "@khanacademy/react-multi-select";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
// import Alert from 'react-bootstrap/Alert';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const initial_state = {
  estimated_cost_modal: false,
  created: false,
  error: "",
  message: "",
  property: {
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
    category: "",
    p_type: "",
    headliner: "",
    mls_available: "",
    flooded: "",
    flood_count: "",
    description: "",
    id: "",


    deal_analysis_type: "Rehab & Flip Deal",
    after_rehab_value: "",
    asking_price: "",
    estimated_rehab_cost: "",
    profit_potential: "",
    estimated_rehab_cost_attr: {
      roof: "",
      plumbing: "",
      foundation: "",
      kitchen: "",
      siding: "",
      bathrooms: "",
      windows: "",
      doors: "",
      landscaping: "",
      sheetrock: "",
      garage: "",
      trim: "",
      exterior_paint: "",
      flooring: "",
      interior_paint: "",
      trash: "",
      hvac: "",
      misc: "",
      electrical: "",
      others: "",
      estimated_ballpark: "",
      repair_total: "",
    },

    closing_cost: "",
    short_term_financing_cost: "",
    total_acquisition_cost: "",
    taxes_annually: "",
    insurance_annually: "",
    amount_financed_percentage: "",
    amount_financed: "",
    interest_rate: "",
    loan_terms: "",
    principal_interest: "",
    taxes_monthly: "",
    insurance_monthly: "",
    piti_monthly_debt: "",
    monthly_rent: "",
    total_gross_yearly_income: "",
    vacancy_rate: "",
    adjusted_gross_yearly_income: "",
    est_annual_management_fees: "",
    est_annual_operating_fees: "",
    est_annual_operating_fees_others: "",
    annual_debt: "",
    net_operating_income: "",
    annual_cash_flow: "",
    monthly_cash_flow: "",
    total_out_of_pocket: "",
    roi_cash_percentage: "",

    arv_analysis: "",
    description_of_repairs: "",
    arv_proof: null,
    rehab_cost_proof: null,


    seller_price: "",
    buy_now_price: "",
    auction_started_at: new Date(),
    auction_length: "",
    auction_ending_at: "",
    buy_option: [],
    title_status: "",
    seller_pay_type_id: "",
    show_instructions_type_id: "",
    youtube_url: "",
    images: []
  },
  property_options: {
    deal_analysis_types: [],
    residential_types: [],
    commercial_types: [],
    land_types: [],
    types: [],
    categories: [],
    auction_lengths: [],
    seller_pay_types: [],
    show_instructions_types: [],
    buy_options: []
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
  property_estimated_rehab_cost_error: "",
  property_description_error: "",
  property_seller_price_error: "",
  property_buy_price_error: "",
  property_auction_length_error: "",
  property_auction_started_at_error: "",
  property_auction_ending_at_error: "",
  property_buy_option_error: "",
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
    this.checkForCategoryFields();
    const google = window.google;
    const input = document.getElementById("autocomplete-address");
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      types: ["geocode"],
      componentRestrictions: { country: "us" }
    });
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    window.scrollTo(0,0)
  }

  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    let address = "";
    let city = "";
    let state = "";
    let postal_code = "";
    address = place.formatted_address
    for (let i = 0; i < place.address_components.length; i++) {
      for (let k = 0; k < place.address_components[i].types.length; k++) {
        switch (place.address_components[i].types[k]) {
          // case "street_number":
          //   address = address + place.address_components[i].long_name;
          //   break;
          case "route":
            address = address + ", " + place.address_components[i].long_name;
            break;
          case "locality":
            city = place.address_components[i].long_name;
            break;
          case "administrative_area_level_1":
            state = place.address_components[i].long_name;
            break;
          case "postal_code":
            postal_code = place.address_components[i].long_name;
            break;
          default:
        }
      }
    }
    if (this._isMounted){
      this.setState({
        property: {
          ...this.state.property,
          address: address,
          city: city,
          state: state,
          zip_code: postal_code
        },
        property_address_error: "",
        property_city_error: "",
        property_state_error: "",
        property_zip_code_error: "",
      });
    }
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
        if (this._isMounted){
          this.setState({
            property_options: {
              ...this.state.property_options,
              types: result.residential_types,
              residential_types: result.residential_types,
              commercial_types: result.commercial_types,
              land_types: result.land_types,
              categories: result.categories,
              seller_pay_types: result.seller_pay_types,
              show_instructions_types: result.show_instructions_types,
              auction_lengths: result.auction_lengths,
              buy_options: result.buy_options
            }
          });
          this.setState({
            property: {
            ...this.state.property,
            p_type: result.residential_types[0],
            category: result.categories[0],
            flooded: false,
            mls_available: false
            }
          });
        }
        this.checkForCategoryFields();

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
        if (this._isMounted){
          this.setState(() => ({message: ""}))
        }
      }, 2000);
		}, (error) => {
		});
  }

  submitStepOne = () => {
    let formIsValid = this.stepOneValidation();
    if (formIsValid){
      if (this.state.created !== true){
        if (this.state.property.category === "Residential"){
          if (this._isMounted){
            this.setState({
              property: {
              ...this.state.property,
              residential_attributes: {
                bedrooms: this.state.property.bedrooms,
                bathrooms: this.state.property.bathrooms,
                garage: this.state.property.garage,
                area: this.state.property.area,
                lot_size: this.state.property.lot_size,
                year_built: this.state.property.year_built,
              }
              }
            }, function () {
              this.sendStepOneData()
            });
          }
        }else if (this.state.property.category === "Commercial") {
          if (this._isMounted){
            this.setState({
              property: {
              ...this.state.property,
              commercial_attributes: {
                area: this.state.property.area,
                lot_size: this.state.property.lot_size,
                year_built: this.state.property.year_built,
                units: this.state.property.units,
                stories: this.state.property.stories,
                cap_rate: this.state.property.cap_rate,
              }
              }
            }, function () {
              this.sendStepOneData()
            });
          }
        }else if (this.state.property.category === "Land") {
          if (this._isMounted){
            this.setState({
              property: {
              ...this.state.property,
              land_attributes: {
                lot_size: this.state.property.lot_size,
                price_per_sq_ft: this.state.property.price_per_sq_ft,
              }
              }
            }, function () {
              this.sendStepOneData()
            });
          }
        }

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
        if (this._isMounted){
          this.setState({
            created: true
          });
          this.setState({
            property: {
            ...this.state.property,
            id: result.property.id,
            }
          });
        }
        this.goToStepTwo();
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        if (this._isMounted){
          this.setState({loaded: true, message: result.message,
          variant: "danger"});
        }
      }
      this.clearMessageTimeout = setTimeout(() => {
        if (this._isMounted){
          this.setState(() => ({message: ""}))
        }
      }, 2000);
		}, (error) => {
		});
  }

  updatePropertyData = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties"
  	fetch(url ,{
			method: "PUT",
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

      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        if (this._isMounted){
          this.setState({loaded: true, message: result.message,
          variant: "danger"});
        }
      }
      this.clearMessageTimeout = setTimeout(() => {
        if (this._isMounted){
          this.setState(() => ({message: ""}))
        }
      }, 2000);
		}, (error) => {
		});
  }

  sendStepFourData = () => {
    const fd = new FormData();
    fd.append('step2', true)
    fd.append('property[id]', this.state.property.id)
    fd.append('property[estimated_rehab_cost_attr]', JSON.stringify(this.state.property.estimated_rehab_cost_attr))
    fd.append('property[youtube_url]', this.state.property.youtube_url)
    for (let i = 0 ; i < this.state.property.images.length ; i++) {
      fd.append('property[images][]', this.state.property.images[i].file, this.state.property.images[i].name)
    }
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties"
  	fetch(url ,{
			method: "PUT",
			headers: {
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: fd,
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        window.location.href = "/user/property/new"
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        this.setState({loaded: true, message: result.message,
        variant: "danger"});
      }
      this.clearMessageTimeout = setTimeout(() => {
        if (this._isMounted){
          this.setState(() => ({message: ""}))
        }
      }, 2000);
		}, (error) => {
		});
  }

  sendStepTwoData = () => {
    const fd = new FormData();
    fd.append('step2', true)
    fd.append('property[id]', this.state.property.id)
    fd.append('property[deal_analysis_type]', this.state.property.deal_analysis_type)
    fd.append('property[after_rehab_value]', this.state.property.after_rehab_value)
    fd.append('property[asking_price]', this.state.property.asking_price)
    fd.append('property[estimated_rehab_cost]', this.state.property.estimated_rehab_cost)
    fd.append('property[profit_potential]', this.state.property.profit_potential)
    fd.append('property[estimated_rehab_cost_attr]', JSON.stringify(this.state.property.estimated_rehab_cost_attr))
    fd.append('property[closing_cost]', this.state.property.closing_cost)
    fd.append('property[short_term_financing_cost]', this.state.property.short_term_financing_cost)
    fd.append('property[total_acquisition_cost]', this.state.property.total_acquisition_cost)
    fd.append('property[taxes_annually]', this.state.property.taxes_annually)
    fd.append('property[insurance_annually]', this.state.property.insurance_annually)
    fd.append('property[amount_financed_percentage]', this.state.property.amount_financed_percentage)
    fd.append('property[amount_financed]', this.state.property.amount_financed)
    fd.append('property[interest_rate]', this.state.property.interest_rate)
    fd.append('property[loan_terms]', this.state.property.loan_terms)
    fd.append('property[principal_interest]', this.state.property.principal_interest)
    fd.append('property[taxes_monthly]', this.state.property.taxes_monthly)
    fd.append('property[insurance_monthly]', this.state.property.insurance_monthly)
    fd.append('property[piti_monthly_debt]', this.state.property.piti_monthly_debt)
    fd.append('property[monthly_rent]', this.state.property.monthly_rent)
    fd.append('property[total_gross_yearly_income]', this.state.property.total_gross_yearly_income)
    fd.append('property[vacancy_rate]', this.state.property.vacancy_rate)
    fd.append('property[adjusted_gross_yearly_income]', this.state.property.adjusted_gross_yearly_income)
    fd.append('property[est_annual_management_fees]', this.state.property.est_annual_management_fees)
    fd.append('property[est_annual_operating_fees]', this.state.property.est_annual_operating_fees)
    fd.append('property[est_annual_operating_fees_others]', this.state.property.est_annual_operating_fees)
    fd.append('property[annual_debt]', this.state.property.annual_debt)
    fd.append('property[net_operating_income]', this.state.property.net_operating_income)
    fd.append('property[annual_cash_flow]', this.state.property.annual_cash_flow)
    fd.append('property[monthly_cash_flow]', this.state.property.monthly_cash_flow)
    fd.append('property[total_out_of_pocket]', this.state.property.total_out_of_pocket)
    fd.append('property[roi_cash_percentage]', this.state.property.roi_cash_percentage)
    fd.append('property[arv_analysis]', this.state.property.arv_analysis)
    fd.append('property[description_of_repairs]', this.state.property.description_of_repairs)
    fd.append('property[after_rehab_value]', this.state.property.after_rehab_value)
    fd.append('property[after_rehab_value]', this.state.property.after_rehab_value)
    if (this.state.property.arv_proof){
      fd.append('property[arv_proof]', this.state.property.arv_proof, this.state.property.arv_proof.name)
    }
    if (this.state.property.rehab_cost_proof){
      fd.append('property[rehab_cost_proof]', this.state.property.rehab_cost_proof, this.state.property.rehab_cost_proof.name)
    }
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties"
  	fetch(url ,{
			method: "PUT",
			headers: {
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: fd,
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        this.goToStepThree();
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        if (this._isMounted){
          this.setState({loaded: true, message: result.message,
          variant: "danger"});
        }
      }
      this.clearMessageTimeout = setTimeout(() => {
        if (this._isMounted){
          this.setState(() => ({message: ""}))
        }
      }, 2000);
		}, (error) => {
		});
  }

  submitStepFour =() => {
    let formIsValid = true
    if (formIsValid){
      this.sendStepFourData()
    }
  }

  goToStepTwo = () => {
    document.getElementById('step1').classList.add('d-none');
    document.getElementById('step2').classList.remove('d-none');
    window.scrollTo(0,0)
  }

  backToStepOne = () => {
    document.getElementById('step1').classList.remove('d-none');
    document.getElementById('step2').classList.add('d-none');
    window.scrollTo(0,0)
  }

  submitStepTwo = () => {
    let formIsValid = true;
    if (formIsValid){
      this.sendStepTwoData();
    }
  }

  fileSelectHandler = (event) => {
    const name = event.target.name
    event.target.nextElementSibling.innerHTML = event.target.files[0].name
    const value = event.target.files[0]
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        [name]: value
        }
      });
    }
  }
  imageSelectHandler = (event) => {
    const name = event.target.name
    // const value = event.target.files
    // this.setState({
    //   property: {
    //   ...this.state.property,
    //   [name]: value
    //   }
    // });
    var uploaded_files = event.target.files;
    var files = [];

    for (var i = 0; i < uploaded_files.length; i++) {
      files.push({src: URL.createObjectURL(uploaded_files[i]), id: i,name: uploaded_files[i].name, file: uploaded_files[i]})
    }
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        [name]: files
        }
      });
    }
  }

  goToStepThree = () => {
    document.getElementById('step2').classList.add('d-none');
    document.getElementById('step3').classList.remove('d-none');
    window.scrollTo(0,0)
  }

  backToStepTwo = () => {
    document.getElementById('step2').classList.remove('d-none');
    document.getElementById('step3').classList.add('d-none');
    window.scrollTo(0,0)
  }

  submitStepThree = () => {
    let formIsValid = true;
    if (formIsValid){
      this.updatePropertyData();
      this.goToStepFour()
    }
  }

  goToStepFour = () => {
    document.getElementById('step3').classList.add('d-none');
    document.getElementById('step4').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  backToStepThree = () => {
    document.getElementById('step3').classList.remove('d-none');
    document.getElementById('step4').classList.add('d-none');
    window.scrollTo(0,0)
  }

  updateProperty = (event) => {
    const{ name, value } = event.target;
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        [name]: value
        }
      }, function () {
        this.stepOneCustomValidation(name);
        if (name === "flooded"){
          if (this.state.property.flooded === "true"){
            document.getElementById('flood_count_input').disabled = false;
            document.getElementById('flood_count-input').classList.remove("d-none")
          }else{
            this.setState({
              property_flood_count_error: ""
            });
            document.getElementById('flood_count-input').classList.add("d-none")
            document.getElementById('flood_count_input').disabled = true;
            document.getElementById('flood_count_input').value = "";
          }
        }
        if (name === "category"){
          this.checkForCategoryFields();
          if (this.state.property.category === "Residential"){
            this.setState({
              property_options: {
                ...this.state.property_options,
                types: this.state.property_options.residential_types,
              }
            }, function () {
              this.setState({
                property:{
                  ...this.state.property,
                  p_type: this.state.property_options.types[0]
                }
              });
            });

          }else if (this.state.property.category === "Commercial") {
            this.setState({
              property_options: {
                ...this.state.property_options,
                types: this.state.property_options.commercial_types,
              }
            }, function () {
              this.setState({
                property:{
                  ...this.state.property,
                  p_type: this.state.property_options.types[0]
                }
              });
            });

          }else if (this.state.property.category === "Land") {
            this.setState({
              property_options: {
                ...this.state.property_options,
                types: this.state.property_options.land_types,
              }
            }, function () {
              this.setState({
                property:{
                  ...this.state.property,
                  p_type: this.state.property_options.types[0]
                }
              });
            });
          }
        }else if (name === "auction_length") {
          this.updatePropertyAuctionEnding();
        }
        else{
          this.updateLandlordDealCalculator();
        }
      });
    }
  }

  updatePropertyAuctionStart = (date) => {
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        auction_started_at: date
        }
      }, function () {
        this.updatePropertyAuctionEnding();
      })
    }
  }

  updatePropertyAuctionEnding = (date) => {
    if (this._isMounted){
      let date = new Date(this.state.property.auction_started_at);
      let newDate = new Date(date.setTime( date.getTime() + (parseInt(this.state.property.auction_length ? this.state.property.auction_length : 0) * 86400000) ));
      this.setState({
        property: {
        ...this.state.property,
        auction_ending_at: newDate,
        auction_length: this.state.property.auction_length
        }
      })
    }
  }

  updateLandlordDealCalculator = () => {
    let after_rehab_value = parseFloat(this.state.property.after_rehab_value ? this.state.property.after_rehab_value : 0)
    let asking_price = parseFloat(this.state.property.asking_price ? this.state.property.asking_price : 0)
    let estimated_rehab_cost = parseFloat(this.state.property.estimated_rehab_cost ? this.state.property.estimated_rehab_cost : 0)
    let closing_cost = parseFloat(this.state.property.closing_cost ? this.state.property.closing_cost : 0)
    let short_term_financing_cost = parseFloat(this.state.property.short_term_financing_cost ? this.state.property.short_term_financing_cost : 0)
    let total_acquisition_cost = parseFloat(this.state.property.total_acquisition_cost ? this.state.property.total_acquisition_cost : 0)
    let taxes_annually = parseFloat(this.state.property.taxes_annually ? this.state.property.taxes_annually : 0)
    let insurance_annually = parseFloat(this.state.property.insurance_annually ? this.state.property.insurance_annually : 0)
    let amount_financed_percentage = parseFloat(this.state.property.amount_financed_percentage ? this.state.property.amount_financed_percentage : 0)
    let amount_financed = parseFloat(this.state.property.amount_financed ? this.state.property.amount_financed : 0)
    let interest_rate = parseFloat(this.state.property.interest_rate ? this.state.property.interest_rate : 0)
    let loan_terms = parseFloat(this.state.property.loan_terms ? this.state.property.loan_terms : 0)
    let principal_interest = parseFloat(this.state.property.principal_interest ? this.state.property.principal_interest : 0)
    let taxes_monthly = parseFloat(this.state.property.taxes_monthly ? this.state.property.taxes_monthly : 0)
    let insurance_monthly = parseFloat(this.state.property.insurance_monthly ? this.state.property.insurance_monthly : 0)
    let piti_monthly_debt = parseFloat(this.state.property.piti_monthly_debt ? this.state.property.piti_monthly_debt : 0)
    let monthly_rent = parseFloat(this.state.property.monthly_rent ? this.state.property.monthly_rent : 0)
    let total_gross_yearly_income = parseFloat(this.state.property.total_gross_yearly_income ? this.state.property.total_gross_yearly_income : 0)
    let vacancy_rate = parseFloat(this.state.property.vacancy_rate ? this.state.property.vacancy_rate : 0)
    let adjusted_gross_yearly_income = parseFloat(this.state.property.adjusted_gross_yearly_income ? this.state.property.adjusted_gross_yearly_income : 0)
    let est_annual_management_fees = parseFloat(this.state.property.est_annual_management_fees ? this.state.property.est_annual_management_fees : 0)
    let est_annual_operating_fees = parseFloat(this.state.property.est_annual_operating_fees ? this.state.property.est_annual_operating_fees : 0)
    let est_annual_operating_fees_others = parseFloat(this.state.property.est_annual_operating_fees_others ? this.state.property.est_annual_operating_fees_others : 0)
    let annual_debt = parseFloat(this.state.property.annual_debt ? this.state.property.annual_debt : 0)
    let net_operating_income = parseFloat(this.state.property.net_operating_income ? this.state.property.net_operating_income : 0)
    let annual_cash_flow = parseFloat(this.state.property.annual_cash_flow ? this.state.property.annual_cash_flow : 0)
    let monthly_cash_flow = parseFloat(this.state.property.monthly_cash_flow ? this.state.property.monthly_cash_flow : 0)
    let total_out_of_pocket = parseFloat(this.state.property.total_out_of_pocket ? this.state.property.total_out_of_pocket : 0)
    let roi_cash_percentage  = parseFloat(this.state.property.roi_cash_percentage ? this.state.property.roi_cash_percentage : 0)

    total_acquisition_cost = (asking_price + estimated_rehab_cost + closing_cost + short_term_financing_cost)
    amount_financed = Math.round(((after_rehab_value * amount_financed_percentage)/100)*100)/100
    principal_interest = Math.round((amount_financed*(((interest_rate/1200)*((1+(interest_rate/1200))**(loan_terms*12)))/((((1+(interest_rate/1200))**(loan_terms*12))-1) === 0 ? 1 : (((1+(interest_rate/1200))**(loan_terms*12))-1))))*100)/100
    insurance_monthly = Math.round((insurance_annually / 12)*100)/100
    taxes_monthly = Math.round((taxes_annually / 12)*100)/100

    piti_monthly_debt = Math.round((principal_interest + taxes_monthly + insurance_monthly)*100)/100

    total_gross_yearly_income = (monthly_rent * 12)

    adjusted_gross_yearly_income = Math.round((total_gross_yearly_income * ((100 - vacancy_rate)/100))*100)/100

    est_annual_operating_fees = (taxes_annually + insurance_annually + est_annual_operating_fees_others)

    net_operating_income = (adjusted_gross_yearly_income -est_annual_management_fees - est_annual_operating_fees)

    annual_debt = Math.round((principal_interest * 12)*100)/100

    annual_cash_flow = Math.round((net_operating_income - annual_debt)*100)/100
    monthly_cash_flow = Math.round((annual_cash_flow / 12)*100)/100

    total_out_of_pocket = (asking_price + estimated_rehab_cost + closing_cost + short_term_financing_cost + insurance_annually) - amount_financed

    roi_cash_percentage = Math.round(((annual_cash_flow / (total_out_of_pocket !== 0 ? total_out_of_pocket : 1))*100)*100)/100
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        total_acquisition_cost,
        amount_financed,
        principal_interest,
        taxes_monthly,
        insurance_monthly,
        piti_monthly_debt,
        total_gross_yearly_income,
        adjusted_gross_yearly_income,
        est_annual_operating_fees,
        net_operating_income,
        annual_debt,
        annual_cash_flow,
        monthly_cash_flow,
        total_out_of_pocket,
        short_term_financing_cost,
        roi_cash_percentage,
        }
      })
    }

  }

  updatePropertyRehabCostAttr = (event) => {
    const{ name, value } = event.target;
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
          estimated_rehab_cost_attr:{
          ...this.state.property.estimated_rehab_cost_attr,
            [name]: value,
          }
        }
      }, function () {
        if (name === "estimated_ballpark"){
          this.setState({
            property: {
            ...this.state.property,
            estimated_rehab_cost: this.state.property.estimated_rehab_cost_attr.estimated_ballpark,
            estimated_rehab_cost_attr:{
            ...this.state.property.estimated_rehab_cost_attr,
            roof: "",
            plumbing: "",
            foundation: "",
            kitchen: "",
            siding: "",
            bathrooms: "",
            windows: "",
            doors: "",
            landscaping: "",
            sheetrock: "",
            garage: "",
            trim: "",
            exterior_paint: "",
            flooring: "",
            interior_paint: "",
            trash: "",
            hvac: "",
            misc: "",
            electrical: "",
            others: "",
            repair_total: this.state.property.estimated_rehab_cost_attr.estimated_ballpark
            }
            }
          })
        } else {
          this.updateEstimatedRehabCost();
        }
      });
    }
  }

  updateEstimatedRehabCost = () => {
    const cost_attr = this.state.property.estimated_rehab_cost_attr
    let total_amount = 0
    for (const [key, value] of Object.entries(cost_attr)) {
      if (key !== "repair_total" && key !== "estimated_ballpark"){
        total_amount += parseFloat(value ? value : 0)
      }
    }
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        estimated_rehab_cost: total_amount,
        estimated_rehab_cost_attr:{
        ...this.state.property.estimated_rehab_cost_attr,
        repair_total: total_amount,
        estimated_ballpark: ""
        }
        }
      })
    }
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
    let property_stories_error = "";
    let property_cap_rate_error = "";
    let property_price_per_sq_ft_error = "";
    let property_headliner_error = "";
    let property_mls_available_error = "";
    let property_flooded_error = "";
    let property_flood_count_error = "";
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
    if (this.state.property.category === "Residential"){
      if (this.state.property.bedrooms === ""){
        property_bedrooms_error = "This field can't be blank."
      }
      if (this.state.property.bathrooms === ""){
        property_bathrooms_error = "This field can't be blank."
      }
      if (this.state.property.garage === ""){
        property_garage_error = "This field can't be blank."
      }
    }
    if ((this.state.property.category === "Residential") || (this.state.property.category === "Commercial")){
      if (this.state.property.area === ""){
        property_area_error = "Area can't be blank."
      }
      if (this.state.property.year_built === ""){
        property_year_built_error = "Property built year can't be blank."
      }else if (String(this.state.property.year_built).length < 4) {
        property_year_built_error = "Not a valid year."
      }
    }
    if (this.state.property.lot_size === ""){
      property_lot_size_error = "Lot size can't be blank."
    }
    if (this.state.property.category === "Commercial"){
      if (this.state.property.units === ""){
        property_units_error = "units can't be blank."
      }
      if (this.state.property.stories === ""){
        property_stories_error = "Stories can't be blank."
      }
      if (this.state.property.cap_rate === ""){
        property_cap_rate_error = "Cap Rate can't be blank."
      }
    }
    if (this.state.property.category === "Land"){
      if (this.state.property.price_per_sq_ft === ""){
        property_price_per_sq_ft_error = "Price per SqFt can't be blank."
      }
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
      property_stories_error,
      property_cap_rate_error,
      property_price_per_sq_ft_error,
      property_headliner_error,
      property_mls_available_error,
      property_flooded_error,
      property_flood_count_error,
      property_description_error,
    },function () {
      if (property_address_error !== "" || property_city_error !== "" || property_state_error !== "" || property_zip_code_error !== "" || property_category_error !== "" || property_type_error !== "" || property_bedrooms_error !== "" || property_bathrooms_error !== "" || property_garage_error !== "" || property_area_error !== "" || property_lot_size_error !== "" || property_year_built_error !== "" || property_units_error !== "" || property_stories_error !== "" || property_cap_rate_error !== "" || property_price_per_sq_ft_error !== ""|| property_headliner_error !== "" || property_mls_available_error !== "" || property_flooded_error !== "" || property_flood_count_error !== "" || property_description_error !== "" ){
        return false;
      }else {
        return true;
      }
    })
    if (property_address_error !== "" || property_city_error !== "" || property_state_error !== "" || property_zip_code_error !== "" || property_category_error !== "" || property_type_error !== "" || property_bedrooms_error !== "" || property_bathrooms_error !== "" || property_garage_error !== "" || property_area_error !== "" || property_lot_size_error !== "" || property_year_built_error !== "" || property_units_error !== "" || property_stories_error !== "" || property_cap_rate_error !== "" || property_price_per_sq_ft_error !== ""|| property_headliner_error !== "" || property_mls_available_error !== "" || property_flooded_error !== "" || property_flood_count_error !== "" || property_description_error !== "" ){
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
    let property_stories_error = "";
    let property_cap_rate_error = "";
    let property_price_per_sq_ft_error = "";
    let property_headliner_error = "";
    let property_mls_available_error = "";
    let property_flooded_error = "";
    let property_flood_count_error = "";
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
      }else if (String(this.state.property.year_built).length < 4) {
        property_year_built_error = "Not a valid year."
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
    }else if (name === 'stories') {
      if (this.state.property.stories === ""){
        property_stories_error = "Stories can't be blank."
      }
      this.setState({
        property_stories_error
      });
    }else if (name === 'cap_rate') {
      if (this.state.property.stories === ""){
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
  hideModal = () => {
    this.setState({
      estimated_cost_modal: false
    });
  }
  checkForCategoryFields = () => {
    if (this.state.property.category === "Residential"){
      document.getElementById("bedrooms-input").classList.remove("d-none")
      document.getElementById("bathrooms-input").classList.remove("d-none")
      document.getElementById("garage-input").classList.remove("d-none")
      document.getElementById("area-input").classList.remove("d-none")
      document.getElementById("lot-input").classList.remove("d-none")
      document.getElementById("year-built-input").classList.remove("d-none")
      document.getElementById("units-input").classList.add("d-none")
      document.getElementById("stories-input").classList.add("d-none")
      document.getElementById("cap_rate-input").classList.add("d-none")
      document.getElementById("price_per_sq_ft-input").classList.add("d-none")
    }else if (this.state.property.category === "Commercial") {
      document.getElementById("bedrooms-input").classList.add("d-none")
      document.getElementById("bathrooms-input").classList.add("d-none")
      document.getElementById("garage-input").classList.add("d-none")
      document.getElementById("area-input").classList.remove("d-none")
      document.getElementById("lot-input").classList.remove("d-none")
      document.getElementById("year-built-input").classList.remove("d-none")
      document.getElementById("units-input").classList.remove("d-none")
      document.getElementById("stories-input").classList.remove("d-none")
      document.getElementById("cap_rate-input").classList.remove("d-none")
      document.getElementById("price_per_sq_ft-input").classList.add("d-none")

    }else if (this.state.property.category === "Land") {
      document.getElementById("bedrooms-input").classList.add("d-none")
      document.getElementById("bathrooms-input").classList.add("d-none")
      document.getElementById("garage-input").classList.add("d-none")
      document.getElementById("area-input").classList.add("d-none")
      document.getElementById("lot-input").classList.remove("d-none")
      document.getElementById("year-built-input").classList.add("d-none")
      document.getElementById("units-input").classList.add("d-none")
      document.getElementById("stories-input").classList.add("d-none")
      document.getElementById("cap_rate-input").classList.add("d-none")
      document.getElementById("price_per_sq_ft-input").classList.remove("d-none")

    }
    if (this.state.property.flooded === "true"){
      document.getElementById('flood_count_input').disabled = false;
      document.getElementById('flood_count-input').classList.remove("d-none")
    }else{
      this.setState({
        property_flood_count_error: ""
      });
      document.getElementById('flood_count-input').classList.add("d-none")
      document.getElementById('flood_count_input').disabled = true;
      document.getElementById('flood_count_input').value = "";
    }

  }

  checkRehabDeal = () => {
    if (this.state.property.deal_analysis_type === "Rehab & Flip Deal"){
      return "row mx-0 ";
    }else {
      return "row mx-0 d-none";
    }
  }
  checkLandordDeal = () => {
    if (this.state.property.deal_analysis_type === "Landlord Deal"){
      return "row mx-0";
    }else {
      return "d-none row mx-0";
    }
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  reorder = (list, startIndex, endIndex) => {

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = this.reorder(
      this.state.property.images,
      result.source.index,
      result.destination.index
    );
    var files = [];
    for (var i = 0; i < items.length; i++) {
      files.push({src: items[i].src, id: i,name: items[i].name, file: items[i].file})
    }

    this.setState({
      property:{
        ...this.state.property,
        images: files,
      }
    })
  }
  removeFile = (id) => {
    var data = this.state.property.images;
    delete data[id];
    var files = [];
    for (var i = 0; i < data.length; i++) {
      if (i !== id){
        files.push({src: data[i].src, id: i,name: data[i].name, file: data[i].file})
      }else {
        continue
      }
    }
    this.setState({
      property:{
        ...this.state.property,
        images: files,
      }
    })
  }

  getFilesLength = () => {
    return (this.state.property.images)
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
    const auction_lengths = this.state.property_options.auction_lengths.map((value, index) => {
      return(
        <option key={index} value={value} >{value} days</option>
      )
    })
    const buy_options = this.state.property_options.buy_options.map((value, index) => ({
      value: value,
      label: value
    }))
    const seller_pay_types = this.state.property_options.seller_pay_types.map((key, index) => {
      return(
        <div className="form-check" key={index}>
          <label className="form-check-label">
            <input type="radio" className="form-check-input" checked={key.id === parseInt(this.state.property.seller_pay_type_id) ? true : false} value={key.id} name="seller_pay_type_id" onChange={this.updateProperty}/>{key.description}
          </label>
        </div>
      )
    });
    const show_instructions_types = this.state.property_options.show_instructions_types.map((key, index) => {
      return(
        <div className="form-check" key={index}>
          <label className="form-check-label">
            <input type="radio" className="form-check-input" checked={key.id === parseInt(this.state.property.show_instructions_type_id) ? true : false} value={key.id} name="show_instructions_type_id" onChange={this.updateProperty}/>{key.description}
          </label>
        </div>
      )
    });
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
                <div className="col-md-6 row mx-0 mb-2 pl-0 step_row">
                  <div className="col-md-6 px-0">
                    <label>Property Address</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text"  id="autocomplete-address" className="form-control" name="address" onChange={this.updateProperty}/>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_address_error)}
                  </div>
                </div>

                <div className="col-md-6 row mx-0 mb-2 pr-0 step_row">
                  <div className="col-md-6 px-0">
                    <label>City</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="city" onChange={this.updateProperty} value={this.state.property.city}/>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_city_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 pl-0 step_row">
                  <div className="col-md-6 px-0">
                    <label>State</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="state" onChange={this.updateProperty} value={this.state.property.state}/>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_state_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 pr-0 step_row">
                  <div className="col-md-6 px-0">
                    <label>Zip code</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" maxLength="6" name="zip_code" onChange={this.updateProperty} onKeyPress={this.checkNumeric} value={this.state.property.zip_code}/>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_zip_code_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 pl-0 step_row">
                  <div className="col-md-6 px-0">
                    <label>Property Category</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <select className="form-control" name="category" onChange={this.updateProperty}>
                      {categories}
                    </select>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_category_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 pr-0 step_row">
                  <div className="col-md-6 px-0">
                    <label>Property Type</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <select className="form-control" name="p_type" onChange={this.updateProperty}>
                      {types}
                    </select>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_type_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pl-0" id="bedrooms-input">
                  <div className="col-md-6 px-0">
                    <label>Bedrooms</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="bedrooms" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_bedrooms_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pr-0" id="bathrooms-input">
                  <div className="col-md-6 px-0">
                    <label>Bathrooms</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="bathrooms" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_bathrooms_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pl-0" id="garage-input">
                  <div className="col-md-6 px-0">
                    <label>Garage</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="garage" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_garage_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pr-0" id="area-input">
                  <div className="col-md-6 px-0">
                    <label>Area (SqFt)</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="number" className="form-control" name="area" onChange={this.updateProperty}/>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_area_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pl-0" id="lot-input">
                  <div className="col-md-6 px-0">
                    <label>Lot Size</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="number" className="form-control" name="lot_size" onChange={this.updateProperty} onKeyPress={this.checkDecimalNumeric}/>
                  </div>
                  <div className="col-md-6 px-0 offset-md-6">
                    {this.addErrorMessage(this.state.property_lot_size_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pr-0" id="year-built-input">
                  <div className="col-md-6 px-0">
                    <label>Year Built</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="year_built" onChange={this.updateProperty} onKeyPress={this.checkNumeric} maxLength="4"/>
                  </div>
                  <div className="col-md-6 offset-md-6 px-0">
                    {this.addErrorMessage(this.state.property_year_built_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pl-0" id="units-input">
                  <div className="col-md-6 px-0">
                    <label>Units</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="units" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                  </div>
                  <div className="col-md-6 offset-md-6 px-0">
                    {this.addErrorMessage(this.state.property_units_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pr-0" id="stories-input">
                  <div className="col-md-6 px-0">
                    <label>Stories</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="stories" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                  </div>
                  <div className="col-md-6 offset-md-6 px-0">
                    {this.addErrorMessage(this.state.property_stories_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pl-0" id="cap_rate-input">
                  <div className="col-md-6 px-0">
                    <label>Cap Rate</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="number" className="form-control" name="cap_rate" onChange={this.updateProperty} />
                  </div>
                  <div className="col-md-6 offset-md-6 px-0">
                    {this.addErrorMessage(this.state.property_cap_rate_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pr-0" id="price_per_sq_ft-input">
                  <div className="col-md-6 px-0">
                    <label>Price Per SqFt</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="number" className="form-control" name="price_per_sq_ft" onChange={this.updateProperty} />
                  </div>
                  <div className="col-md-6 offset-md-6 px-0">
                    {this.addErrorMessage(this.state.property_price_per_sq_ft_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pl-0">
                  <div className="col-md-6 px-0">
                    <label>Property Headliner</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="headliner" onChange={this.updateProperty}/>
                  </div>
                  <div className="col-md-6 offset-md-6 px-0">
                    {this.addErrorMessage(this.state.property_headliner_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pr-0">
                  <div className="col-md-6 px-0">
                    <label>Is this property on MLS?</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <select className="form-control" defaultValue="false" name="mls_available" onChange={this.updateProperty}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="col-md-6 offset-md-6 px-0">
                    {this.addErrorMessage(this.state.property_mls_available_error)}
                  </div>
                </div>
                <div className="col-md-6 row mx-0 mb-2 step_row pl-0">
                  <div className="col-md-6 px-0">
                    <label>Did Property Flooded?</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <select className="form-control" defaultValue="false" name="flooded" onChange={this.updateProperty}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="col-md-6 offset-md-6 px-0">
                    {this.addErrorMessage(this.state.property_flooded_error)}
                  </div>
                </div>

                <div className="col-md-6 row mx-0 mb-2 step_row pr-0">
                  <div className="col-md-6 px-0">
                    <label>Estimated Rehab Cost</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="number" readOnly={true} className="form-control estimated-cost" name="estimated_rehab_cost" value={this.state.property.estimated_rehab_cost} id="estimated-cost1" onClick={() => {this.setState({
                      estimated_cost_modal: true
                    });}}/>
                  </div>
                </div>
                <div className="col-md-12 row mx-0 mb-2 step_row px-0 step_textarea" id="flood_count-input">
                  <div className="col-md-3 px-0">
                    <label>If Flooded</label>
                  </div>
                  <div className="col-md-9 px-0">
                    <textarea disabled id="flood_count_input" placeholder="How many times and how high did the water get inside the property each time." className="form-control textarea_step textarea-resize" rows="2" name="flood_count" onChange={this.updateProperty}/>
                  </div>
                  <div className="col-md-9 offset-md-3 px-0">
                    {this.addErrorMessage(this.state.property_flood_count_error)}
                  </div>
                </div>
                <div className="col-md-12 row mx-0 mb-2 px-0 step_row step_textarea">
                  <div className="col-md-3 px-0">
                    <label>Property Description</label>
                  </div>
                  <div className="col-md-9 px-0">
                    <textarea className="form-control textarea_step textarea-resize" rows="3" id="comment" name="description" onChange={this.updateProperty}></textarea>
                  </div>
                  <div className="col-md-9 px-0 offset-md-3">
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
              <div className="col-md-12 text-center pb-3">
                <h6 className="step-number">step 2</h6>
                <h4 className="step-name mb-0">Deal Analysis</h4>
              </div>
              <div className= "row">
                <div className="col-md-3 offset-md-3">
                  <div className="form-check">
                    <input id="rehab-radio-deal" type="radio" name="deal_analysis_type" checked={this.state.property.deal_analysis_type === "Rehab & Flip Deal" ? true : false} value="Rehab & Flip Deal" className="form-check-input" onChange = {this.updateProperty} />
                    <label htmlFor="rehab-radio-deal">Rehab & Flip Deal</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-check">
                    <input type="radio" name="deal_analysis_type" checked={this.state.property.deal_analysis_type === "Landlord Deal" ? true : false} value="Landlord Deal" className="form-check-input" onChange = {this.updateProperty} id="landlord-radio-deal"/>
                    <label htmlFor="landlord-radio-deal">Landlord Deal</label>
                  </div>
                </div>
              </div>
              <form className="creation-forms">
                <div className={this.checkRehabDeal()}>
                  <div className="col-md-6 offset-md-3">
                    <div className="row mx-0 step_row my-3">
                      <div className="col-md-6 my-2 px-0">
                        <label className="mb-0">After Rehab Value</label>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <input type="number" name="after_rehab_value" className="form-control" onChange={this.updateProperty}/>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label className="mb-0">Sellers Asking Price</label>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <input type="number" className="form-control" id="temp_id" name="asking_price" onChange={this.updateProperty} />
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label className="mb-0">Estimated Rehab Cost</label>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <input type="number" readOnly={true} className="form-control estimated-cost" name="estimated_rehab_cost" value={this.state.property.estimated_rehab_cost} id="estimated-cost1" />
                      </div>

                      <div className="col-md-6 my-2 px-0">
                        <label className="mb-0">Profit Potential</label>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <input type="number" name="profit_potential" className="form-control" onChange={this.updateProperty} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className = {this.checkLandordDeal()}>
                  <div className="col-md-6 my-3 px-0">
                    <h5 className="text-uppercase font-red step_heads">Acquisition Analysis</h5>
                    <div className="row mx-0 step_row">
                      <div className="col-md-6 my-2 px-0">
                        <label className="text-uppercase">EST AFTER REHAB VALUE</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" className="form-control" name="after_rehab_value" onChange={this.updateProperty} />
                      </div>
                      <div className="col-md-12 px-0">
                        <h6 className="text-uppercase font-red">Acquisition Cost</h6>
                        <ul className="est_box">
                          <li className="my-2">
                            <div className="est_list">
                              <label>Asking/Purchase Price: </label>
                              <input type="number" className="form-control" name="asking_price" onChange={this.updateProperty}/>
                            </div>
                          </li>
                          <li className="my-2">
                            <div className="est_list">
                              <label>Est Rehab Cost: </label>
                              <input type="number" value={this.state.property.estimated_rehab_cost} readOnly={true} className="form-control" name="estimated_rehab_cost"/>
                            </div>
                          </li>
                          <li className="my-2">
                            <div className="est_list">
                              <label>Est Closing Cost: </label>
                              <input type="number" className="form-control" name="closing_cost" onChange={this.updateProperty}/>
                            </div>
                          </li>
                          <li className="my-2">
                            <div className="est_list">
                              <label>Est Annual Insurance: </label>
                              <input type="number" onChange={this.updateProperty} className="form-control" name="insurance_annually" value={this.state.property.insurance_annually} />
                            </div>
                          </li>
                          <li className="my-2">
                            <div className="est_list">
                              <label>Est Hard Money or STF Cost: </label>
                              <input type="number" className="form-control" name="short_term_financing_cost" onChange={this.updateProperty}/>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6 px-0">
                        <label>Total Acquisition Costs</label>
                      </div>
                      <div className="col-md-6 pl-0">
                        <input type="number" value={this.state.property.total_acquisition_cost} readOnly={true} className="form-control" name="total_acquisition_cost"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 my-3 px-0">
                    <h5 className="text-uppercase font-red step_heads step_fonts">Financing Analysis After rehab</h5>
                    <div className="row mx-0 step_row">
                      <div className="col-md-6 my-2 row mx-0">
                        <input type="number" className="form-control col-md-4" name="amount_financed_percentage" onChange={this.updateProperty} />
                        <input type="number" readOnly={true} value={this.state.property.amount_financed} className="form-control col-md-7 offset-md-1" name="amount_financed" />
                      </div>
                      <div className="col-md-6 px-0 my-2">
                        <label className="text-uppercase">amount financed</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" className="form-control" name="interest_rate" onChange={this.updateProperty}/>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>Interest Rate APR</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" className="form-control" name="loan_terms" onChange={this.updateProperty}/>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>Loan Term</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" readOnly={true} value={this.state.property.principal_interest} className="form-control" name="principal_interest" />
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>Monthly Principal & Interest</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" readOnly={true} value={this.state.property.piti_monthly_debt} className="form-control" name="piti_monthly_debt"/>
                      </div>
                      <div className="col-md-6 px-0 my-2">
                        <label>Annual Debt Service</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 my-3 px-0">
                    <h5 className="text-uppercase font-red step_heads">Expense Analysis</h5>
                    <div className="row mx-0 step_row">
                      <div className="col-md-6 my-2 px-0">
                        <label className="text-uppercase">EST Annual taxes</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" className="form-control" name="taxes_annually" onChange={this.updateProperty}/>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>EST Annual Insurance</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" onChange={this.updateProperty} className="form-control" name="insurance_annually" value={this.state.property.insurance_annually} />
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>EST Annual Management Fees</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" className="form-control" name="est_annual_management_fees" onChange={this.updateProperty}/>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>EST Annual Repair</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" value={this.state.property.est_annual_operating_fees_others} className="form-control" name="est_annual_operating_fees_others" onChange={this.updateProperty}/>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>EST Annual Operating Costs</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" className="form-control" readOnly={true} value={this.state.property.est_annual_operating_fees} name="est_annual_operating_fees" onChange={this.updateProperty} />
                      </div>
                    </div>
                    <div className="col-md-12 mt-4 px-0">
                      <h6 className="text-uppercase font-red">Income or Cash Flow Analysis</h6>
                    </div>
                    <div className="row mx-0 step_row">
                      <div className="col-md-6 my-2 px-0">
                        <label>Total EST Monthly Rent</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" className="form-control" name="monthly_rent" onChange={this.updateProperty}/>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>Total Gross Yearly Income</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" readOnly={true} value={this.state.property.total_gross_yearly_income} className="form-control" name="total_gross_yearly_income"/>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>EST Vacancy Rate</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" className="form-control" name="vacancy_rate" onChange={this.updateProperty}/>
                      </div>
                      <div className="col-md-6 my-2 px-0">
                        <label>ADJ Gross Yearly Income</label>
                      </div>
                      <div className="col-md-6 my-2 pl-0">
                        <input type="number" readOnly={true} value={this.state.property.adjusted_gross_yearly_income} className="form-control" name="adjusted_gross_yearly_income"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 my-3 px-0">
                    <h5 className="text-uppercase font-red step_heads step_fonts">Cash Flow Analysis</h5>
                    <div className="row mx-0 step_row">
                      <div className="col-md-6 my-2 row mx-0">
                        <input type="number" readOnly={true} value={this.state.property.adjusted_gross_yearly_income} className="form-control" name="adjusted_gross_yearly_income"/>
                      </div>
                      <div className="col-md-6 px-0 my-2">
                        <label>(+) Adjusted Gross Yearly Income</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" className="form-control " readOnly={true} value={this.state.property.est_annual_operating_fees} name="est_annual_operating_fees" onChange={this.updateProperty} />
                      </div>
                      <div className="col-md-6 px-0 my-2">
                        <label>(-) Est Annual Operating Costs</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" readOnly={true} value={this.state.property.net_operating_income} className="form-control" name="net_operating_income" />
                      </div>
                      <div className="col-md-6 px-0 my-2">
                        <label>(=) Net Operating Income</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" readOnly={true} value={this.state.property.annual_debt} className="form-control" name="annual_debt"/>
                      </div>
                      <div className="col-md-6 px-0 my-2">
                        <label>(-) Annual Debt Service</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" readOnly={true} value={this.state.property.annual_cash_flow} className="form-control" name="annual_cash_flow"/>
                      </div>
                      <div className="col-md-6 px-0 my-2">
                        <label>(=) Annual Cash Flow</label>
                      </div>
                    </div>
                    <div className="col-md-12 mt-4">
                      <h6 className="text-uppercase font-red">Bottom Line</h6>
                    </div>
                    <div className="row mx-0 step_row bottom_box">
                      <div className="col-md-6 my-2">
                        <label>Monthly Cash Flow</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" readOnly={true} value={this.state.property.monthly_cash_flow} className="form-control" name="monthly_cash_flow"/>
                      </div>
                      <div className="col-md-6 my-2">
                        <label>Total Out of Pocket</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" readOnly={true} className="form-control" value={this.state.property.total_out_of_pocket} name="total_out_of_pocket"/>
                      </div>
                      <div className="col-md-6 my-2">
                        <label>Roi Cash On Cash</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <input type="number" readOnly={true} className="form-control" value={this.state.property.roi_cash_percentage} name="roi_cash_percentage"/>
                      </div>
                    </div>
                  </div>
                  {/* ################### Old Form begin */}
                  {/* <div className="col-md-6">
                    <h5>Deal Analysis</h5>
                    <div className="form-group">
                      <label>After Rehab Value</label>
                      <input type="number" className="form-control" name="after_rehab_value" onChange={this.updateProperty} />
                    </div>
                    <div className="form-group">
                      <label>Purchase/Asking Price</label>
                      <input type="number" className="form-control" name="asking_price" onChange={this.updateProperty}/>
                    </div>
                    <div className="form-group">
                      <label>Estimated Rehab Cost</label>
                      <input type="number" value={this.state.property.estimated_rehab_cost} readOnly={true} className="form-control" name="estimated_rehab_cost" onClick={() => {this.setState({
                    estimated_cost_modal: true
                      });}}/>
                    </div>
                    <div className="form-group">
                      <label>Closing Costs</label>
                      <input type="number" className="form-control" name="closing_cost" onChange={this.updateProperty}/>
                    </div>
                    <div className="form-group">
                      <label>Short-term Financing Costs</label>
                      <input type="number" className="form-control" name="short_term_financing_cost" onChange={this.updateProperty}/>
                    </div>
                    <div className="form-group">
                      <label>Property Taxes Annually</label>
                      <input type="number" className="form-control" name="taxes_annually" onChange={this.updateProperty}/>
                    </div>
                    <div className="form-group">
                      <label>Insurance Annually</label>
                      <input type="number" onChange={this.updateProperty} className="form-control" name="insurance_annually" />
                    </div>
                    <div className="form-group">
                      <label>Total Acquisition Costs</label>
                      <input type="number" value={this.state.property.total_acquisition_cost} readOnly={true} className="form-control" name="total_acquisition_cost"/>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <h5>Financing Analysis</h5>
                    <div className="form-group">
                      <label>Amount Financed</label>
                      <div className="row mx-0">
                    <input type="number" className="form-control col-md-4" name="amount_financed_percentage" onChange={this.updateProperty} />
                    <input type="number" readOnly={true} value={this.state.property.amount_financed} className="form-control col-md-7 offset-md-1" name="amount_financed" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Interest Rate APR</label>
                      <input type="number" className="form-control" name="interest_rate" onChange={this.updateProperty}/>
                    </div>
                    <div className="form-group">
                      <label>Loan Term in years</label>
                      <input type="number" className="form-control" name="loan_terms" onChange={this.updateProperty}/>
                    </div>
                    <div className="form-group">
                      <label>Principal Insurace (PI)</label>
                      <input type="number" readOnly={true} value={this.state.property.principal_interest} className="form-control" name="principal_interest" />
                    </div>
                    <div className="form-group">
                      <label>Monthly Taxes</label>
                      <input type="number" readOnly={true} value={this.state.property.taxes_monthly} className="form-control" name="taxes_monthly"/>
                    </div>
                    <div className="form-group">
                      <label>Monthly Insurance</label>
                      <input type="number" readOnly={true} value={this.state.property.insurance_monthly} className="form-control" name="insurance_monthly"/>
                    </div>
                    <div className="form-group">
                      <label>PITI Monthly Debt Service</label>
                      <input type="number" readOnly={true} value={this.state.property.piti_monthly_debt} className="form-control" name="piti_monthly_debt"/>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <h5>Income Analysis</h5>
                    <div className="form-group">
                      <label>Total Monthly Rent</label>
                      <input type="number" className="form-control" name="monthly_rent" onChange={this.updateProperty}/>
                    </div>
                    <div className="form-group">
                      <label>Gross Yearly Income (GYI)</label>
                      <input type="number" readOnly={true} value={this.state.property.total_gross_yearly_income} className="form-control" name="total_gross_yearly_income"/>
                    </div>
                    <div className="form-group">
                      <label>Estimated Vacancy Rate</label>
                      <input type="number" className="form-control" name="vacancy_rate" onChange={this.updateProperty}/>
                    </div>
                    <div className="form-group">
                      <label>Adjusted Gross Yearly Income</label>
                      <input type="number" readOnly={true} value={this.state.property.adjusted_gross_yearly_income} className="form-control" name="adjusted_gross_yearly_income"/>
                    </div>
                    <div className="form-group">
                      <label>Annual Management Fees</label>
                      <input type="number" className="form-control" name="est_annual_management_fees" onChange={this.updateProperty}/>
                    </div>
                    <div className="form-group">
                      <label>Annual Operating Costs</label>
                      <div className="row mx-0">
                    <input type="number" className="form-control col-md-5" readOnly={true} value={this.state.property.est_annual_operating_fees} name="est_annual_operating_fees" onChange={this.updateProperty} />
                    <input type="number" value={this.state.property.est_annual_operating_fees_others} className="form-control col-md-6 offset-md-1" name="est_annual_operating_fees_others" onChange={this.updateProperty}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Net Operating Income(NOI)</label>
                      <input type="number" readOnly={true} value={this.state.property.net_operating_income} className="form-control" name="net_operating_income" />
                    </div>
                    </div>
                    <div className="col-md-6">
                    <h5>Cash Flow Analysis</h5>
                    <div className="form-group">
                      <label>Annual Debt Service</label>
                      <input type="number" readOnly={true} value={this.state.property.annual_debt} className="form-control" name="annual_debt"/>
                    </div>
                    <div className="form-group">
                      <label>Net Operating Income(NOI)</label>
                      <input type="number" readOnly={true} value={this.state.property.net_operating_income} className="form-control" name="net_operating_income" />
                    </div>
                    <div className="form-group">
                      <label>Annual Cash Flow</label>
                      <input type="number" readOnly={true} value={this.state.property.annual_cash_flow} className="form-control" name="annual_cash_flow"/>
                    </div>
                    <div className="form-group">
                      <label>Monthly Cash Flow</label>
                      <input type="number" readOnly={true} value={this.state.property.monthly_cash_flow} className="form-control" name="monthly_cash_flow"/>
                    </div>
                    <div className="form-group">
                      <label>Total Out of Pocket</label>
                      <input type="number" readOnly={true} className="form-control" value={this.state.property.total_out_of_pocket} name="total_out_of_pocket"/>
                    </div>
                    <div className="form-group">
                      <label>ROI Cash on Cash</label>
                      <input type="number" readOnly={true} className="form-control" value={this.state.property.roi_cash_percentage} name="roi_cash_percentage"/>
                    </div>
                  </div> */}
                  {/* ################### Old form ends*/}
                </div>
                <div className="row mx-0 step_row">
                  <div className="col-md-6 pl-0">
                    <div className="form-group">
                      <label>ARV Proof/Financial Analysis</label>
                      <input type="text" className="form-control" name="arv_analysis" onChange={this.updateProperty}/>
                    </div>
                  </div>
                  <div className="col-md-6 pr-0">
                    <div className="form-group">
                      <label>Or upload ARV proof</label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" name="arv_proof" onChange={this.fileSelectHandler}/>
                        <label className="custom-file-label" htmlFor="customFile" name="arv_proof">Choose file</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 pl-0">
                    <div className="form-group">
                      <label>Description of Repairs</label>
                      <input type="text" className="form-control" id="description-of-repairs" name="description_of_repairs" onChange={this.updateProperty}/>
                    </div>
                  </div>
                  <div className="col-md-6 pr-0">
                    <div className="form-group">
                      <label>Or upload Estimated Rehab Cost</label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" name="rehab_cost_proof" onChange={this.fileSelectHandler}/>
                        <label className="custom-file-label" htmlFor="customFile" name="rehab_cost_proofs">Choose file</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <Modal className="status_modal" show={this.state.estimated_cost_modal} onHide={this.hideModal}>
                <Modal.Header closeButton>
                  <div className=" offset-md-1 col-md-10 text-center">
                    <h5 className="mb-0 text-uppercase">Itemized Repairs</h5>
                  </div>
                </Modal.Header>
                <div className="modal-body">
                  <div className="row mx-0">
                    <div className="col-md-12 px-0">
                      <h6>Please enter estimated rehab numbers or enter a ballpark at the bottom.</h6>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>Roof</label>
                        <input value={this.state.property.estimated_rehab_cost_attr.roof} type="number" className="form-control" name="roof" onChange={this.updatePropertyRehabCostAttr} />
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Plumbing</label>
                        <input type="number" name="plumbing" className="form-control" value={this.state.property.estimated_rehab_cost_attr.plumbing} onChange={this.updatePropertyRehabCostAttr} />
                      </div>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>Foundation</label>
                        <input type="number" name="foundation" value={this.state.property.estimated_rehab_cost_attr.foundation} className="form-control " onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Kitchen</label>
                        <input type="number" name="kitchen" value={this.state.property.estimated_rehab_cost_attr.kitchen}  className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>Siding</label>
                        <input type="number" name="siding" value={this.state.property.estimated_rehab_cost_attr.siding} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Bathrooms</label>
                        <input type="name" name="bathrooms" value={this.state.property.estimated_rehab_cost_attr.bathrooms} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>Windows</label>
                        <input type="number" name="windows" value={this.state.property.estimated_rehab_cost_attr.windows}  className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Doors</label>
                        <input type="number" name="doors" value={this.state.property.estimated_rehab_cost_attr.doors} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>Landscaping</label>
                        <input type="number" name="landscaping" value={this.state.property.estimated_rehab_cost_attr.landscaping} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Sheetrock</label>
                        <input type="number" name= "sheetrock" value={this.state.property.estimated_rehab_cost_attr.sheetrock} className="form-control " onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>Garage</label>
                        <input type="number" name= "garage" value={this.state.property.estimated_rehab_cost_attr.garage} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Trim</label>
                        <input type="number" name="trim" value={this.state.property.estimated_rehab_cost_attr.trim} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>Exterior Paint</label>
                        <input type="number" name="exterior_paint" value={this.state.property.estimated_rehab_cost_attr.exterior_paint} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Flooring</label>
                        <input type="number" name="flooring" value={this.state.property.estimated_rehab_cost_attr.flooring} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>Interior Paint</label>
                        <input type="number" name="interior_paint" value={this.state.property.estimated_rehab_cost_attr.interior_paint} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Trash</label>
                        <input type="number" name="trash" value={this.state.property.estimated_rehab_cost_attr.trash} className="form-control " onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>HVAC</label>
                        <input type="number" name="hvac" value={this.state.property.estimated_rehab_cost_attr.hvac} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Misc</label>
                        <input type="number" name="misc" value={this.state.property.estimated_rehab_cost_attr.misc} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-0">
                      <div className="form-group">
                        <label>Electrical</label>
                        <input type="number" name="electrical" className="form-control" value={this.state.property.estimated_rehab_cost_attr.electrical} onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-6 pr-0">
                      <div className="form-group">
                        <label>Others</label>
                        <input type="number" name="others" className="form-control" value={this.state.property.estimated_rehab_cost_attr.others} onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-12 px-0">
                      <div className="form-group">
                        <label>Estimated Ballpark</label>
                        <input type="number" name="estimated_ballpark" value={this.state.property.estimated_rehab_cost_attr.estimated_ballpark} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                      </div>
                    </div>
                    <div className="col-md-12 px-0">
                      <div className="form-group">
                        <label>Repair Total</label>
                        <input type="number" value={this.state.property.estimated_rehab_cost_attr.repair_total} readOnly={true} name="repair_total" className="form-control" />
                      </div>
                    </div>

                  </div>
                  <div className="col-md-12 text-center mt-3">
                    <span className="error"></span>
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.hideModal}>Close</button>
                  </div>
                </div>
              </Modal>
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
                <div className="col-md-6 pl-0 row mx-0 mb-2 step_row">
                  <div className="col-md-6 px-0">
                    <label>Sellers Asking Price</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="number" className="form-control" name="seller_price" onChange={this.updateProperty}/>
                  </div>
                </div>
                <div className="col-md-6 pr-0 row mx-0 mb-2 step_row">
                  <div className="col-md-6 px-0">
                    <label>Buy Now Price</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="number" className="form-control" name="buy_now_price" onChange={this.updateProperty}/>
                  </div>
                </div>
                <div className="col-md-6 pl-0 row mx-0 mb-2 step_row">
                  <div className="col-md-6 px-0">
                    <label>Auction Length</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <select className="form-control" name="auction_length" onChange={this.updateProperty}>
                      <option>Please select</option>
                      {auction_lengths}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 pr-0 row mx-0 mb-2 step_row">
                  <div className="col-md-6 px-0">
                    <label className= "col-md-12 px-0">Auction Start Date</label>
                  </div>
                  <div className="col-md-6 px-0">

                    <DatePicker className="form-control "
                      selected={this.state.property.auction_started_at} minDate={new Date()}  maxDate = {this.state.property.auction_ending_at}
                      name="auction_started_at" onChange={this.updatePropertyAuctionStart}
                    />
                  </div>
                </div>
                <div className="col-md-6 pl-0 row mx-0 mb-2 step_row">
                  <div className="col-md-6 px-0">
                    <label className="col-md-12 px-0">Ideal Closing Date</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <DatePicker className="form-control " readOnly={true}
                      selected={this.state.property.auction_ending_at}
                      name="auction_ending_at"
                    />
                  </div>
                </div>
                <div className="col-md-6 pr-0 row mx-0 mb-2 step_row">
                  <div className="col-md-6 px-0">
                    <label htmlFor="sel2">Buy options</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <MultiSelect
                      options={buy_options}
                      selectSomeItmes = "select"
                      selected={this.state.property.buy_option}
                      onSelectedChanged={selected => {this.setState({property: {...this.state.property, buy_option: selected}})}}
                    />
                  </div>
                </div>
                <div className="col-md-6 row pl-0 mx-0 mb-2 step_row">
                  <div className="col-md-6 px-0">
                    <label>Title Status</label>
                  </div>
                  <div className="col-md-6 px-0">
                    <input type="text" className="form-control" name="title_status" onChange={this.updateProperty} />
                  </div>
                </div>
                <div className="col-md-12 row pl-0 mx-0 mb-2 step_row align-items-start">
                  <div className="col-md-3 px-0">
                    <label>Seller agrees to pay for?</label>
                  </div>
                  <div className="col-md-9 px-0">
                    {seller_pay_types}
                  </div>

                </div>
                <div className="col-md-12 row pl-0 mx-0 mb-2 step_row align-items-start">
                  <div className="col-md-3 px-0">
                    <label>Showing Instructions</label>
                  </div>
                  <div className="col-md-9 px-0">
                    {show_instructions_types}
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
                <div className="col-md-6 step_row pl-0">
                  <label>Select images associated with this property</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" name="images" onChange={this.imageSelectHandler} multiple={true}/>
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                  </div>
                </div>
                <div className="col-md-6 step_row pr-0">
                  <div className="form-group">
                    <label>Youtube URL</label>
                    <input type="text" className="form-control" name="youtube_url" onChange={this.updateProperty}/>
                  </div>
                </div>
                <div className="demo_images" >

                  {this.state.property.images.length > 0 ?
                    <>
                      <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                          {(droppableProvided, droppableSnapshot) => (
                            <>
                              <div className="demo" ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                                <div className="row mx-0">
                                  <div className="upload-img-row">
                                    {this.state.property.images.map((file,i) =>
                                      <div key={i} className="col-md-2 px-2 my-2">
                                        <Draggable  draggableId={i.toString()} index={i}>
                                          {(draggableProvided, draggableSnapshot) => (
                                            <div
                                              ref={draggableProvided.innerRef}
                                              {...draggableProvided.draggableProps}
                                              {...draggableProvided.dragHandleProps}
                                            >
                                              <img src={file.src} className="img-thumbnail" alt={file.src} /><Link to="#" onClick = {(e) => {this.removeFile(file.id)}}  >x</Link>
                                            </div>
                                          )}
                                        </Draggable>
                                      </div>
                                    )}
                                    {droppableProvided.placeholder}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </>
                  : <div></div>
                  }
                </div>
              </form>
              <div className="col-md-12 text-center my-4">
                <Link to="#" className="red-btn step-btn mr-3" onClick={this.backToStepThree}>Go, Back</Link>
                <Link to="#" className="red-btn step-btn" onClick={this.submitStepFour}>Submit</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
	}
}
