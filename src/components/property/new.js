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
    owner_category: "",
    additional_information: "",
    best_offer: "false",
    best_offer_lenght: "",
    best_offer_sellers_minimum_price: "",
    best_offer_sellers_reserve_price: "",
    show_instructions_text: "",
    open_house_dates: [""],
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
    amount_financed_percentage: 75,
    amount_financed: "",
    interest_rate: 4.75,
    loan_terms: 30,
    principal_interest: "",
    taxes_monthly: "",
    insurance_monthly: "",
    piti_monthly_debt: "",
    monthly_rent: "",
    total_gross_yearly_income: "",
    vacancy_rate: 5,
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
    buy_options: [],
    title_statuses: [],
    owner_categories: [],
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

  updateProperty = (event) => {
    const{ name, value } = event.target;
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        [name]: value
        }
      }, function () {
        // this.stepOneCustomValidation(name);
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
        }
        else if ((name === "after_rehab_value")||(name === "asking_price")){
          this.updateProfitPotentialCalculator();
        }
        this.updateLandlordDealCalculator();
      });
    }
  }

  addOpenHouseDateFields = () => {
    let newDate = "";
    let dates = this.state.property.open_house_dates;
    dates.push(newDate)
    this.setState({
      property: {
      ...this.state.property,
      open_house_dates: dates,
      }
    })
  }

  removeOpenHouseDateFields = () => {
    let i=this.state.property.open_house_dates.length
    if (i>1){
      let dates = this.state.property.open_house_dates;
      dates.splice(i-1,1);
      this.setState({
        property: {
        ...this.state.property,
        open_house_dates: dates,
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

  hideModal = () => {
    this.setState({
      estimated_cost_modal: false
    });
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

  updateProfitPotentialCalculator = () => {
    let after_rehab_value = parseFloat(this.state.property.after_rehab_value ? this.state.property.after_rehab_value : 0)
    let asking_price = parseFloat(this.state.property.asking_price ? this.state.property.asking_price : 0)
    let estimated_rehab_cost = parseFloat(this.state.property.estimated_rehab_cost ? this.state.property.estimated_rehab_cost : 0)
    let profit_potential = parseFloat(this.state.property.estimated_rehab_cost ? this.state.property.estimated_rehab_cost : 0)

    profit_potential = after_rehab_value - asking_price - estimated_rehab_cost

    if (this._isMounted){
      this.setState({
        property: {
          ...this.state.property,
          profit_potential,
        }
      });
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
              buy_options: result.buy_options,
              title_statuses: result.title_statuses,
              owner_categories: result.owner_categories
            }
          });
          this.setState({
            property: {
            ...this.state.property,
            p_type: result.residential_types[0],
            category: result.categories[0],
            owner_category: result.owner_categories[0],
            title_status: result.title_statuses[0],
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

  backToStepOne = () => {
    document.getElementById('step2').classList.add('d-none');
    document.getElementById('step1').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  goToStepTwo = () => {
    document.getElementById('step1').classList.add('d-none');
    document.getElementById('step2').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  backToStepTwo = () => {
    document.getElementById('step3').classList.add('d-none');
    document.getElementById('step2').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  goToStepThree = () => {
    document.getElementById('step2').classList.add('d-none');
    document.getElementById('step3').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  backToStepThree = () => {
    document.getElementById('step4').classList.add('d-none');
    document.getElementById('step3').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  goToStepFour = () => {
    document.getElementById('step3').classList.add('d-none');
    document.getElementById('step4').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  backToStepFour = () => {
    document.getElementById('step5').classList.add('d-none');
    document.getElementById('step4').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  goToStepFive = () => {
    document.getElementById('step4').classList.add('d-none');
    document.getElementById('step5').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  backToStepFive = () => {
    document.getElementById('step6').classList.add('d-none');
    document.getElementById('step5').classList.remove('d-none');
    window.scrollTo(0,0)
  }
  goToStepSix = () => {
    document.getElementById('step5').classList.add('d-none');
    document.getElementById('step6').classList.remove('d-none');
    window.scrollTo(0,0)
  }

  checkRehabDeal = () => {
    if (this.state.property.deal_analysis_type === "Rehab & Flip Deal"){
      return "row mx-0 ";
    }else {
      return "d-none";
    }
  }
  checkLandordDeal = () => {
    if (this.state.property.deal_analysis_type === "Landlord Deal"){
      return "";
    }else {
      return "d-none";
    }
  }

  updatePropertyOpenHouseDates = (index, date) => {
    let dates = this.state.property.open_house_dates
    dates[index] = date
    this.setState({
      property: {
      ...this.state.property,
      open_house_dates: dates,
      }
    })
  }
  updatePropertyAuctionStart = (date) => {
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        auction_started_at: date
        }
      })
    }
  }
  updatePropertyAuctionEndingDate = (date) => {
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        auction_ending_at: date
        }
      })
    }
  }
  checkBestOffer = () => {
    if (this.state.property.best_offer === "true"){
      return "";
    }else {
      return "d-none";
    }
  }
	render() {
    const open_house_dates = this.state.property.open_house_dates.map((value, index) => {
      return <DatePicker key ={index} className="form-control " minDate={new Date()}
        selected={value} onChange={this.updatePropertyOpenHouseDates.bind(this, index)}/>;
    })
    const buy_options = this.state.property_options.buy_options.map((value, index) => ({
      value: value,
      label: value
    }))
    const auction_lengths = this.state.property_options.auction_lengths.map((value, index) => {
      return(
        <option key={index} value={value} >{value} days</option>
      )
    })
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
    const owner_categories = this.state.property_options.owner_categories.map((value, index) => {
      return(
        <option key={index} value={value} >{value}</option>
      )
    })
    const title_statuses = this.state.property_options.title_statuses.map((value, index) => {
      return(
        <option key={index} value={value} >{value}</option>
      )
    })
    const show_instructions_types = this.state.property_options.show_instructions_types.map((key, index) => {
      return(
        <option key={index} value={key.id} >{key.description}</option>
      )
    });
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
                        <div className="row bs-wizard new-bs-wizard mb-4 mx-0" style={{borderBottom:"0"}}>
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
                            <div className="text-center bs-wizard-stepnum">PHOTOS AND VIDEOS</div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link to="#" className="bs-wizard-dot"></Link>
                          </div>
                          <div className="col-xs-2 bs-wizard-step disabled ">
                            <div className="text-center bs-wizard-number">5</div>
                            <div className="text-center bs-wizard-stepnum">SELLERS INFO</div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link to="#" className="bs-wizard-dot"></Link>
                          </div>
                          <div className="col-xs-2 bs-wizard-step disabled ">
                            <div className="text-center bs-wizard-number">6</div>
                            <div className="text-center bs-wizard-stepnum">AUCTION AGREEMENT</div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link to="#" className="bs-wizard-dot"></Link>
                          </div>
                        </div>
                        <div className="d-none" id="step1" >
                          <div className="col-md-12 text-center pb-4">
                            <h4 className="step-name">Property Details</h4>
                          </div>
                          <form className="row mx-0 creation-forms">
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Address</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text"  id="autocomplete-address" className="form-control" name="address" onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>City</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="city" onChange={this.updateProperty} value={this.state.property.city}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>State</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="state" onChange={this.updateProperty} value={this.state.property.state}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Zip</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" maxLength="6" name="zip_code" onChange={this.updateProperty} onKeyPress={this.checkNumeric} value={this.state.property.zip_code}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Category</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" name="category" onChange={this.updateProperty}>
                                  {categories}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Type</label>
                              </div>
                              <div className="col-md-6 px-1 text-right">
                                <select className="form-control" name="p_type" onChange={this.updateProperty}>
                                  {types}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="bedrooms-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Bedrooms</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="bedrooms" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="bathrooms-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Bathrooms</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="bathrooms" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="garage-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Garage</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="garage" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="units-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Units</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="units" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="stories-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Stories</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="stories" onChange={this.updateProperty} onKeyPress={this.checkNumeric}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="cap_rate-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Cap Rate</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className="form-control" name="cap_rate" onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="area-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Square Footage</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className="form-control" name="area" onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="lot-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Lot</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className="form-control" name="lot_size" onChange={this.updateProperty} onKeyPress={this.checkDecimalNumeric}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="year-built-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Year Built</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="year_built" onChange={this.updateProperty} onKeyPress={this.checkNumeric} maxLength="4"/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="price_per_sq_ft-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Price Per SqFt</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className="form-control" name="price_per_sq_ft" onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Headliner</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="headliner" onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Property Description</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className="form-control textarea_step textarea-resize" rows="2" id="comment" name="description" onChange={this.updateProperty}></textarea>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Is this property on MLS?</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" defaultValue="false" name="mls_available" onChange={this.updateProperty}>
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Did Property Flooded?</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" defaultValue="false" name="flooded" onChange={this.updateProperty}>
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="flood_count-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>If Flooded</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea disabled id="flood_count_input" placeholder="How many times and how high did the water get inside the property each time." className="form-control textarea_step textarea-resize" rows="2" name="flood_count" onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>I'm selling the property as</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" name="owner_category" onChange={this.updateProperty}>
                                  {owner_categories}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Title Status:</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" name="title_status" onChange={this.updateProperty}>
                                  {title_statuses}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Title Additional Information</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className="form-control textarea-resize" rows="2" placeholder="Please advise any title issues that may prevent this property from closing?" name="additional_information" onChange={this.updateProperty}></textarea>
                              </div>
                            </div>
                          </form>
                          <div className="col-md-12 text-center my-4">
                            <Link to="#" className="red-btn step-btn mx-1" onClick={this.goToStepTwo}>Continue</Link>
                          </div>
                        </div>
                        <div className="d-none" id="step2">
                          <div className="col-md-12 text-center pb-4">
                            <h4 className="step-name">Deal Analysis</h4>
                          </div>
                          <form className="col-md-10 offset-md-1">
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Type of Deal</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" id="sel1" name="deal_analysis_type" onChange={this.updateProperty} defaultValue={this.state.property.deal_analysis_type === "Rehab & Flip Deal" ? "Rehab & Flip Deal" : "Landlord Deal"}>
                                  <option value="Rehab & Flip Deal">Rehab & Flip Deal</option>
                                  <option value="Landlord Deal">Landlord Analysis</option>
                                </select>
                              </div>
                            </div>
                            <div className={this.checkRehabDeal()}>
                              <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Estimated After Rehab Value(ARV)</label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <input type="number" name="after_rehab_value" className="form-control" onChange={this.updateProperty} value={this.state.property.after_rehab_value}/>
                                </div>
                              </div>
                              <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Sellers Asking Price (-)</label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <input type="number" className="form-control" id="temp_id" name="asking_price" onChange={this.updateProperty} />
                                </div>
                              </div>
                              <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Estimated Rehab Cost (-)</label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <input type="number" readOnly={true} className="form-control estimated-cost" name="estimated_rehab_cost" value={this.state.property.estimated_rehab_cost} id="estimated-cost1" onClick={() => {this.setState({
                                    estimated_cost_modal: true
                                  });}}/>
                                </div>
                              </div>
                              <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Estimated Profit Potential (=)</label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <input type="number" name="profit_potential" className="form-control" onChange={this.updateProperty} value={this.state.property.profit_potential} readOnly={true} />
                                </div>
                              </div>
                            </div>
                            <div className = {this.checkLandordDeal()}>
                              <div className="row mx-0">
                                <div className="col-md-6 my-3 px-0">
                                  <h5 className="text-uppercase font-red step_heads">Acquisition Analysis</h5>
                                  <div className="row mx-0 step_row">
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="text-uppercase">EST AFTER REHAB VALUE</label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" className="form-control" value={this.state.property.after_rehab_value} name="after_rehab_value" onChange={this.updateProperty} />
                                    </div>
                                    <div className="col-md-12 px-0">
                                      <h6 className="text-uppercase font-red font-600">Acquisition Cost</h6>
                                      <ul className="est_box">
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Asking/Purchase Price: </label>
                                            <input type="number" className="form-control" name="asking_price" onChange={this.updateProperty}/>
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Rehab Cost: </label>
                                            <input type="number" readOnly={true} className="form-control estimated-cost" name="estimated_rehab_cost" value={this.state.property.estimated_rehab_cost} id="estimated-cost1" onClick={() => {this.setState({
                                              estimated_cost_modal: true
                                            });}}/>
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Closing Cost: </label>
                                            <input type="number" className="form-control" name="closing_cost" onChange={this.updateProperty}/>
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Annual Insurance: </label>
                                            <input type="number" onChange={this.updateProperty} className="form-control" name="insurance_annually" value={this.state.property.insurance_annually} />
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Hard Money or STF Cost: </label>
                                            <input type="number" className="form-control" name="short_term_financing_cost" onChange={this.updateProperty}/>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-md-6 px-0">
                                      <label className="label-bold">Total Acquisition Costs</label>
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
                                      <input type="number" className="form-control col-md-4" name="amount_financed_percentage" onChange={this.updateProperty} value={this.state.property.amount_financed_percentage} />
                                      <input type="number" readOnly={true} value={this.state.property.amount_financed} className="form-control col-md-7 offset-md-1" name="amount_financed" />
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="text-uppercase">amount financed</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" className="form-control" name="interest_rate" value={this.state.property.interest_rate} onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Interest Rate APR</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" value={this.state.property.loan_terms} className="form-control" name="loan_terms" onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Loan Term</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" readOnly={true} value={this.state.property.principal_interest} className="form-control" name="principal_interest" />
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Monthly Principal &amp; Interest</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" readOnly={true} value={this.state.property.annual_debt} className="form-control" name="annual_debt"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">Annual Debt Service</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 my-3 px-0">
                                  <h5 className="text-uppercase font-red step_heads">Expense Analysis</h5>
                                  <div className="row mx-0 step_row">
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual taxes</label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" className="form-control" name="taxes_annually" onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Insurance</label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" onChange={this.updateProperty} className="form-control" name="insurance_annually" value={this.state.property.insurance_annually} />
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Management Fees</label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" className="form-control" name="est_annual_management_fees" onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Repair</label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" value={this.state.property.est_annual_operating_fees_others} className="form-control" name="est_annual_operating_fees_others" onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Operating Costs</label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" className="form-control" readOnly={true} value={this.state.property.est_annual_operating_fees} name="est_annual_operating_fees" onChange={this.updateProperty} />
                                    </div>
                                  </div>
                                  <div className="col-md-12 mt-4 px-0">
                                    <h6 className="text-uppercase font-red font-600">Income or Cash Flow Analysis</h6>
                                  </div>
                                  <div className="row mx-0 step_row">
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Total EST Monthly Rent</label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" className="form-control" name="monthly_rent" onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Total Gross Yearly Income</label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" readOnly={true} value={this.state.property.total_gross_yearly_income} className="form-control" name="total_gross_yearly_income"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Vacancy Rate</label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" className="form-control" name="vacancy_rate" value={this.state.property.vacancy_rate} onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main label-bold">ADJ Gross Yearly Income</label>
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
                                      <label className="labels_main">(+) Adjusted Gross Yearly Income</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" className="form-control " readOnly={true} value={this.state.property.est_annual_operating_fees} name="est_annual_operating_fees" onChange={this.updateProperty} />
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">(-) Est Annual Operating Costs</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" readOnly={true} value={this.state.property.net_operating_income} className="form-control" name="net_operating_income" />
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main label-bold">(=) Net Operating Income (NOI)</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" readOnly={true} value={this.state.property.annual_debt} className="form-control" name="annual_debt"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">(-) Annual Debt Service</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" readOnly={true} value={this.state.property.annual_cash_flow} className="form-control" name="annual_cash_flow"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main label-bold">(=) Annual Cash Flow</label>
                                    </div>
                                  </div>
                                  <div className="col-md-12 mt-4">
                                    <h6 className="text-uppercase font-red font-600">Bottom Line</h6>
                                  </div>
                                  <div className="row mx-0 step_row bottom_box">
                                    <div className="col-md-6 my-2">
                                      <input type="number" readOnly={true} value={this.state.property.monthly_cash_flow} className="form-control" name="monthly_cash_flow"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Monthly Cash Flow</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" readOnly={true} className="form-control" value={this.state.property.total_out_of_pocket} name="total_out_of_pocket"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Total Out of Pocket</label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" readOnly={true} className="form-control" value={this.state.property.roi_cash_percentage} name="roi_cash_percentage"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="label-bold">ROI Cash On Cash</label>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </form>
                          <table className={this.checkLandordDeal() + " table table-bordered mb-5 col-md-10 offset-md-1"} id="step_table">
                            <thead>
                              <tr>
                                <th>Appreciation</th>
                                <th>Equality Growth 30 Years</th>
                                <th>Total</th>
                                <th>Cash Flow 30 Years</th>
                                <th>Total</th>
                                <th>Vac/Maint</th>
                                <th>Possible Profit 30 Years</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1.00%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>2.00%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>3.00%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>4.00%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                          <form className="creation-forms sell_forms">
                            <div className={ this.checkLandordDeal() + " form-group col-md-8 offset-md-2 px-0 row step_row align-items-start"}>
                              <div className="col-md-6 px-1 text-right">
                                <label>How did you determine your Rental Cost or Upload Proof?</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className="form-control textarea-resize" name="rental_analysis" onChange={this.updateProperty}/>
                              </div>
                              <div className="col-md-6 offset-md-6 px-1 mt-2">
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" name="rental_proof" onChange={this.fileSelectHandler}/>
                                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>
                              </div>
                            </div>

                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>How did you determine your ARV (After Rehab Value) or Upload Proof?</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className="form-control textarea-resize" name="arv_analysis" onChange={this.updateProperty}/>
                              </div>
                              <div className="col-md-6 offset-md-6 px-1 mt-2">
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" name="arv_proof" onChange={this.fileSelectHandler}/>
                                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Description of Repairs or upload Estimated Rehab Cost</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea type="text" className="form-control textarea-resize" id="description-of-repairs" name="description_of_repairs" onChange={this.updateProperty}/>
                              </div>
                              <div className="col-md-6 offset-md-6 px-1 mt-2">
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" name="rehab_cost_proof" onChange={this.fileSelectHandler}/>
                                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div className="col-md-12 text-center my-4">
                            <Link to="#" onClick={this.backToStepOne} className="red-btn step-btn mx-1">Go, Back</Link>
                            <Link to="#" onClick={this.goToStepThree} className="red-btn step-btn mx-1">Continue</Link>
                          </div>
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
                        </div>
                        <div className="" id="step3">
                          <div className="col-md-12 text-center pb-4">
                            <h4 className="step-name">Online Bidding Options</h4>
                          </div>
                          <form className="row mx-0 creation-forms">
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Enable Best Offer Features</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" onChange={this.updateProperty} defaultValue={this.state.property.best_offer} name="best_offer" id="sel1">
                                  <option value={false}>No</option>
                                  <option value={true}>Yes</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>{this.state.property.best_offer === "true" ? "Best Offer Start Date" : "Online Bidding/Auction Start Date"}</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <div className="input-group mb-0">
                                  <DatePicker className="form-control "
                                    selected={this.state.property.auction_started_at} minDate={new Date()}
                                    name="auction_started_at" onChange={this.updatePropertyAuctionStart}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Best Offer Time Frame</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" defaultValue={this.state.property.best_offer_lenght} name="best_offer_lenght" onChange={this.updateProperty}>
                                  <option>Please select</option>
                                  {auction_lengths}
                                </select>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Minimum Starting Price</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className="form-control" name="best_offer_sellers_minimum_price" onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Reserve Price</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className="form-control" name="best_offer_sellers_reserve_price" onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Online Bidding/Auction Time Frame</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" defaultValue={this.state.property.auction_length} name="auction_length" onChange={this.updateProperty}>
                                  <option>Please select</option>
                                  {auction_lengths}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Minimum Starting Price</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className="form-control" name="seller_price" onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Buy Now Price</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" className="form-control" name="buy_now_price" onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row mt-4">
                              <div className="col-md-6 px-1 text-right">
                                <label>Ideal Closing Date</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <div className="input-group mb-0">
                                  <DatePicker className="form-control "
                                    selected={this.state.property.auction_ending_at}
                                    minDate = {this.state.property.auction_started_at}
                                    onChange={this.updatePropertyAuctionEndingDate}
                                    name="auction_ending_at"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Options to Buy</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <MultiSelect
                                  options={buy_options}
                                  selectSomeItmes = "select"
                                  selected={this.state.property.buy_option}
                                  onSelectedChanged={selected => {this.setState({property: {...this.state.property, buy_option: selected}})}}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Showing Option</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" defaultValue={parseInt(this.state.property.show_instructions_type_id) ? parseInt(this.state.property.show_instructions_type_id) : ""} name="show_instructions_type_id" onChange={this.updateProperty}>
                                  <option>Please Select</option>
                                  {show_instructions_types}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Showing Instructions</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className="form-control" rows="3" placeholder="Please give details where the combo box is located and what's the combo code." onChange={this.updateProperty} name="show_instructions_text"></textarea>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Open House Dates</label>
                              </div>
                              <div className="col-md-4 px-1">
                                <div className="input-group mb-0">
                                  {open_house_dates}
                                </div>
                              </div>
                              <div className="col-md-2 px-2">
                                <Link to="#" className="add_links" onClick={this.addOpenHouseDateFields}>
                                  <i className="fa fa-plus-circle"></i>
                                  <p className="mb-0">Add More</p>
                                </Link>
                                <Link to="#" className="add_links" onClick={this.removeOpenHouseDateFields}>
                                  <i className="fa fa-plus-circle"></i>
                                  <p className="mb-0">Del More</p>
                                </Link>
                              </div>
                            </div>
                          </form>
                          <div className="col-md-12 text-center my-4">
                            <Link to="#" onClick={this.backToStepTwo} className="red-btn step-btn mx-1">Go, Back</Link>
                            <Link to="#" onClick={this.goToStepFour} className="red-btn step-btn mx-1">Continue</Link>
                          </div>
                        </div>
                        <div className="d-none" id="step4">
                        </div>
                        <div className="d-none" id="step5">
                        </div>
                        <div className="d-none" id="step6">
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
    )
	}
}
