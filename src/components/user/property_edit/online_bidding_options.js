import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiSelect from "@khanacademy/react-multi-select";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import CurrencyInput from 'react-currency-input';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTrash, faPlusCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
// let componentDidMount_super = CurrencyInput.prototype.componentDidMount;
// CurrencyInput.prototype.componentDidMount = function() {
//   this.theInput.setSelectionRange_super = this.theInput.setSelectionRange;
//   this.theInput.setSelectionRange = (start, end) => {
//     if (document.activeElement === this.theInput) {
//       this.theInput.setSelectionRange_super(start, end);
//     }
//   };
//   componentDidMount_super.call(this, ...arguments);
// }

const initial_state = {
  checkBoxEnabled: false,
  isLoaded: false,
  is_admin: false,
  estimated_cost_modal: false,
  terms_agreed: false,
  error: "",
  message: "",

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
    best_offer: "false",
    best_offer_length: "",
    best_offer_sellers_minimum_price: "",
    best_offer_sellers_reserve_price: "",
    show_instructions_text: "",
    open_house_dates: [{date: new Date(), opens: new Date(), closes: new Date()}],
    vimeo_url: "",
    dropbox_url: "",
    video: "",
    id: "",


    deal_analysis_type: "Rehab & Flip Deal",
    after_rehab_value: "",
    after_rehab_value_masked: "",
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
    appreciation_value: {
      eg1: "",
      eg2: "",
      eg3: "",
      eg4: "",

      t1: "",
      t2: "",
      t3: "",
      t4: "",

      cf1: "",
      cf2: "",
      cf3: "",
      cf4: "",

      ta: "",
      tb: "",
      tc: "",
      td: "",

      vac1: "",
      vac2: "",
      vac3: "",
      vac4: "",

      ppy1: "",
      ppy2: "",
      ppy3: "",
      ppy4: "",
    },

    arv_analysis: "",
    description_of_repairs: "",
    arv_proof: null,
    arv_proof_link: "",
    rehab_cost_proof_link: "",
    rental_proof_link: "",
    rehab_cost_proof: null,
    rental_description: "",
    rental_proof: null,


    seller_price: "",
    buy_now_price: "",
    property_closing_amount: "",
    auction_started_at: new Date(),
    best_offer_auction_started_at: new Date(),
    best_offer_auction_ending_at: "",
    auction_length: "",
    auction_ending_at: "",
    buy_option: [],
    title_status: "",
    status: "",
    seller_pay_type_id: "",
    show_instructions_type_id: "",
    youtube_url: "",
    youtube_video_key: "",
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
    best_offer_lengths: [],
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
  property_description_error: "",
  property_owner_category_error: "",
  property_additional_information_error: "",

  property_after_rehab_value_error: "",
  property_asking_price_error: "",
  property_estimated_rehab_cost_error: "",
  property_arv_proof_error: "",
  property_arv_analysis_error: "",
  property_rehab_cost_proof_error: "",
  property_description_of_repair_error: "",
  property_rental_proof_error: "",
  property_rental_description_error: "",
  property_amount_financed_percentage_error: "",
  property_amount_financed_error: "",
  property_interest_rate_error : "",
  property_loan_terms_error : "",
  property_closing_cost_error : "",
  property_insurance_annually_error : "",
  property_short_term_financing_cost_error : "",
  property_taxes_annually_error : "",
  property_est_annual_management_fees_error : "",
  property_est_annual_operating_fees_others_error : "",
  property_monthly_rent_error : "",
  property_vacancy_rate_error : "",

  property_auction_length_error: "",
  property_buy_now_price_error: "",
  property_show_instructions_text_error: "",

  property_best_offer_length_error: "",
  property_best_offer_sellers_minimum_price_error: "",
  property_best_offer_sellers_reserve_price: "",

  property_seller_price_error: "",
  property_buy_price_error: "",
  property_closing_amount_error: "",
  property_auction_started_at_error: "",
  property_auction_ending_at_error: "",
  property_buy_option_error: "",
  property_title_status_error: "",
  property_seller_pay_type_id_error: "",
  property_show_instructions_type_id_error: "",
  property_youtube_url_error: "",
  property_best_offer_auction_started_at_error: "",
  property_best_offer_auction_ending_at_error: "",

}



export default class OnlineBiddingOptions extends Component{
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

  updateCurrentState = (property) => {
    if (property.category === "Residential"){
      this.setState({
        isLoaded: true,
        property: {
        ...this.state.property,
        bedrooms: property.residential_attributes.bedrooms,
        bathrooms: property.residential_attributes.bathrooms,
        garage: property.residential_attributes.garage,
        area: property.residential_attributes.area,
        lot_size: property.residential_attributes.lot_size,
        year_built: property.residential_attributes.year_built,
        }
      });
    }else if (property.category === "Commercial") {
      this.setState({
        isLoaded: true,
        property: {
        ...this.state.property,
        area: property.commercial_attributes.area,
        lot_size: property.commercial_attributes.lot_size,
        year_built: property.commercial_attributes.year_built,
        units: property.commercial_attributes.units,
        stories: property.commercial_attributes.stories,
        cap_rate: property.commercial_attributes.cap_rate,
        }
      })
    }else if (property.category === "Land") {
      this.setState({
        isLoaded: true,
        property: {
        ...this.state.property,
        lot_size: property.land_attributes.lot_size,
        price_per_sq_ft: property.land_attributes.price_per_sq_ft,
        }
      });
    }

    this.setState({
      property: {
        ...this.state.property,
        address: property.address,
        city: property.city,
        state: property.state,
        zip_code: property.zip_code,
        lat: property.lat,
        long: property.long,
        category: property.category,
        p_type: property.p_type,
        headliner: property.headliner,
        mls_available: property.mls_available,
        flooded: property.flooded,
        flood_count: property.flood_count,
        description: property.description,
        owner_category: property.owner_category,
        additional_information: property.additional_information,
        best_offer: property.best_offer,
        profit_potential: property.profit_potential,
        best_offer_length: property.best_offer_length,
        best_offer_sellers_minimum_price: property.best_offer_sellers_minimum_price,
        best_offer_sellers_reserve_price: property.best_offer_sellers_reserve_price,
        seller_price: property.seller_price,
        buy_now_price: property.buy_now_price,
        buy_option: property.buy_option,
        show_instructions_type_id: property.show_instructions_type_id,
        seller_pay_type_id: property.seller_pay_type_id,
        show_instructions_text:  property.show_instructions_text,
        auction_started_at: property.auction_started_at,
        auction_length: property.auction_length,
        auction_ending_at: property.auction_ending_at,
        open_house_dates: property.open_house_dates ? property.open_house_dates : this.state.property.open_house_dates  ,
        vimeo_url: property.vimeo_url,
        youtube_url: property.youtube_url,
        youtube_video_key: property.youtube_video_key,
        dropbox_url: property.dropbox_url,
        id: property.id,
        title_status: property.title_status,
        status: property.status,
        deal_analysis_type: property.deal_analysis_type ? property.deal_analysis_type : this.state.property.deal_analysis_type,
        after_rehab_value: property.after_rehab_value,
        asking_price: property.asking_price,
        estimated_rehab_cost: property.estimated_rehab_cost,
        estimated_rehab_cost_attr: property.estimated_rehab_cost_attr,
        arv_proof_link: property.arv_proof,
        rehab_cost_proof_link: property.rehab_cost_proof,
        rental_proof_link: property.rental_proof,
        arv_analysis: property.arv_analysis,
        description_of_repairs: property.description_of_repairs,
        rental_description: property.rental_description,
        unique_address: property.unique_address,
        best_offer_auction_ending_at: property.best_offer_auction_ending_at,
        best_offer_auction_started_at: property.best_offer_auction_started_at,
      }
    });
    if (property.category === "Residential"){
      this.setState({
        property_options: {
          ...this.state.property_options,
          types: this.state.property_options.residential_types,
        }
      });
    }else if (this.state.property.category === "Commercial") {
      this.setState({
        property_options: {
          ...this.state.property_options,
          types: this.state.property_options.commercial_types,
        }
      });
    }else if (this.state.property.category === "Land") {
      this.setState({
        property_options: {
          ...this.state.property_options,
          types: this.state.property_options.land_types,
        }
      });
    }
    if (property.deal_analysis_type === "Landlord Deal"){
      this.setState({
        property: {
          ...this.state.property,
          closing_cost: property.landlord_deal.closing_cost,
          short_term_financing_cost: property.landlord_deal.short_term_financing_cost,
          total_acquisition_cost: property.landlord_deal.total_acquisition_cost,
          taxes_annually: property.landlord_deal.taxes_annually,
          insurance_annually: property.landlord_deal.insurance_annually,
          amount_financed_percentage: property.landlord_deal.amount_financed_percentage,
          amount_financed: property.landlord_deal.amount_financed,
          interest_rate: property.landlord_deal.interest_rate,
          loan_terms: property.landlord_deal.loan_terms,
          principal_interest: property.landlord_deal.principal_interest,
          taxes_monthly: property.landlord_deal.taxes_monthly,
          insurance_monthly: property.landlord_deal.insurance_monthly,
          piti_monthly_debt: property.landlord_deal.piti_monthly_debt,
          monthly_rent: property.landlord_deal.monthly_rent,
          total_gross_yearly_income: property.landlord_deal.total_gross_yearly_income,
          vacancy_rate: property.landlord_deal.vacancy_rate,
          adjusted_gross_yearly_income: property.landlord_deal.adjusted_gross_yearly_income,
          est_annual_management_fees: property.landlord_deal.est_annual_management_fees,
          est_annual_operating_fees: property.landlord_deal.est_annual_operating_fees,
          est_annual_operating_fees_others: property.landlord_deal.est_annual_operating_fees_others,
          annual_debt: property.landlord_deal.annual_debt,
          net_operating_income: property.landlord_deal.net_operating_income,
          annual_cash_flow: property.landlord_deal.annual_cash_flow,
          monthly_cash_flow: property.landlord_deal.monthly_cash_flow,
          total_out_of_pocket: property.landlord_deal.total_out_of_pocket,
          roi_cash_percentage: property.landlord_deal.roi_cash_percentage,
        }
      });
    }
    this.updateLandlordDealCalculator();
    if (this.state.property.images.length === 0){
      if (property.images_details.length > 0){
        let files = [];
        for(let i = 0; i < property.images_details.length; i++){
          var xhr = new XMLHttpRequest();
          xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
          xhr.open("GET", property.images_details[i].url);
          xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
              var blob = null;
              blob = this.response
              files.push({src: property.images_details[i].url, id: i,name: property.images_details[i].name, file: blob})
            }
          }
          xhr.send();
          // blob = xhr.response;//xhr.response is now a blob object
          // files.push({src: property.images_details[i].url, id: i,name: property.images_details[i].name, file: new File([property.images_details[i].url], property.images_details[i].name, {type: property.images_details[i].type})})
        }
        this.setState({
          property: {
            ...this.state.property,
            images: files,
          }
        });
      }
    }
  }

  setUpStepOne = () => {
    const { match: { params } } = this.props;
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/"+ params.id +"/edit"
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
            is_admin: result.is_admin,
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
              best_offer_lengths: result.best_offer_lengths,
              buy_options: result.buy_options,
              title_statuses: result.title_statuses,
              owner_categories: result.owner_categories,
            }
          });
          console.log(this.state.property);

          this.updateCurrentState(result.property);
        }
        // this.setState({
        //   variant: "success",
        //   message: result.message,
        //   loaded: true
        // });
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else if (result.status === 404) {
        window.location.href = "/"
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

  submitStepThree = () => {
    let formIsValid = this.stepThreeValidation();
    if (formIsValid){
      this.setState({
        isLoaded: false,
      });
      this.sendStepThreeData();
    }
  }
  stepThreeValidation = () => {
    let property_auction_started_at_error = "";
    let property_auction_length_error = "";
    let property_seller_price_error = "";
    let property_buy_now_price_error = "";
    let property_closing_amount_error = "";
    let property_auction_ending_at_error = "";
    let property_buy_option_error = "";
    let property_seller_pay_type_id_error = "";
    let property_show_instructions_type_id_error = "";
    let property_show_instructions_text_error = "";
    let property_best_offer_auction_ending_at_error = "";
    let property_best_offer_auction_started_at_error = "";
    let property_best_offer_sellers_minimum_price_error = "";
    let property_best_offer_sellers_reserve_price = "";
    if (this.state.property.best_offer === "true"){
      if (this.state.property.best_offer_auction_started_at === "" || this.state.property.best_offer_auction_started_at === null){
        property_best_offer_auction_started_at_error = "can't be blank."
      }
      if (this.state.property.best_offer_auction_ending_at === "" || this.state.property.best_offer_auction_ending_at === null){
        property_best_offer_auction_ending_at_error = "can't be blank."
      }
      if (this.state.property.best_offer_sellers_minimum_price === ""){
        property_best_offer_sellers_minimum_price_error = "can't be blank."
      }
      if (this.state.property.best_offer_sellers_reserve_price === ""){
        property_best_offer_sellers_reserve_price = "can't be blank."
      }
    }
    else{
      if (this.state.property.auction_started_at === "" || this.state.property.auction_started_at === null){
        property_auction_started_at_error = "can't be blank."
      }
    }
    if (this.state.property.auction_length === ""){
      property_auction_length_error = "can't be blank."
    }
    if (this.state.property.seller_price === ""){
      property_seller_price_error = "can't be blank."
    }
    if (this.state.property.buy_now_price === ""){
      property_buy_now_price_error = "can't be blank."
    }
    if (this.state.property.property_closing_amount === ""){
      property_closing_amount_error = "can't be blank."
    }
    if (this.state.property.auction_ending_at === "" || this.state.property.auction_ending_at === null){
      property_auction_ending_at_error = "can't be blank."
    }
    if (this.state.property.buy_option.length < 1){
      property_buy_option_error = "can't be blank."
    }
    if (this.state.property.show_instructions_type_id === ""){
      property_show_instructions_type_id_error = "can't be blank."
    }
    if (this.state.property.seller_pay_type_id === ""){
      property_seller_pay_type_id_error = "can't be blank."
    }
    if (this.state.property.show_instructions_text === ""){
      property_show_instructions_text_error = "can't be blank."
    }

    this.setState({
      property_auction_started_at_error,
      property_auction_length_error,
      property_seller_price_error,
      property_buy_now_price_error,
      property_closing_amount_error,
      property_auction_ending_at_error,
      property_buy_option_error,
      property_show_instructions_type_id_error,
      property_show_instructions_text_error,
      property_best_offer_auction_started_at_error,
      property_best_offer_auction_ending_at_error,
      property_best_offer_sellers_reserve_price,
      property_best_offer_sellers_minimum_price_error,
      property_seller_pay_type_id_error,
    });

    if (property_auction_started_at_error !== "" || property_auction_length_error !== "" || property_seller_price_error !== "" || property_buy_now_price_error !== "" || property_auction_ending_at_error !== "" || property_buy_option_error !== "" || property_show_instructions_type_id_error !== "" || property_show_instructions_text_error !== "" || property_best_offer_auction_started_at_error !== "" || property_best_offer_auction_ending_at_error !== ""  || property_best_offer_sellers_reserve_price !== "" || property_best_offer_sellers_minimum_price_error !== "" || property_seller_pay_type_id_error !== "" || property_closing_amount_error !== ""){
      return false
    }else {
      return true
    }

  }
  sendStepThreeData = () => {
    const fd = new FormData();
    fd.append('property[id]', this.state.property.id)
    fd.append('property[best_offer]', this.state.property.best_offer)
    fd.append('property[best_offer_sellers_minimum_price]', this.state.property.best_offer_sellers_minimum_price)
    fd.append('property[best_offer_sellers_reserve_price]', this.state.property.best_offer_sellers_reserve_price)
    fd.append('property[auction_started_at]', this.state.property.auction_started_at)
    fd.append('property[best_offer_auction_started_at]', this.state.property.best_offer_auction_started_at)
    fd.append('property[best_offer_auction_ending_at]', this.state.property.best_offer_auction_ending_at)
    fd.append('property[auction_length]', this.state.property.auction_length)
    fd.append('property[seller_price]', this.state.property.seller_price)
    fd.append('property[buy_now_price]', this.state.property.buy_now_price)
    fd.append('property[property_closing_amount]', this.state.property.property_closing_amount)
    fd.append('property[auction_ending_at]', this.state.property.auction_ending_at)
    fd.append('property[buy_option]', JSON.stringify(this.state.property.buy_option))
    fd.append('property[show_instructions_type_id]', this.state.property.show_instructions_type_id)
    fd.append('property[seller_pay_type_id]', this.state.property.seller_pay_type_id)
    fd.append('property[show_instructions_text]', this.state.property.show_instructions_text)
    fd.append('property[open_house_dates]', JSON.stringify(this.state.property.open_house_dates))
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
        this.setState({
          message: result.message,
          variant: "success",
        })
        this.showProperty();
        // this.updateCurrentState(result.property)
      }else if (result.status === 400) {
        this.setState({
          message: result.message,
          variant: "danger",
        })
      }
      else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        if (this._isMounted){
          this.setState({isLoaded: true, message: result.message,
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

  showProperty = () => {
    window.open("/property/"+ this.state.property.unique_address, '_self')
  }

  updateMaskedPropertyAtrr = (event, maskedvalue, floatvalue) => {
    const{ name } = event.target;
    // console.log(name, value);
    // console.log(name, parseFloat(floatvalue));
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        [name]: parseFloat(maskedvalue.replace(/[$,.]/g,""))/100,
        }
      }, function () {
        if (this.state.property.deal_analysis_type === "Landlord Deal"){
          this.updateLandlordDealCalculator();
        }else {
          this.updateProfitPotentialCalculator();
        }
      })
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
          // this.updatePropertyAuctionEnding();
        }
        else if ((name === "after_rehab_value")||(name === "asking_price")){
          if (this.state.property.deal_analysis_type === "Landlord Deal"){
            this.updateLandlordDealCalculator();
          }else {
            this.updateProfitPotentialCalculator();
          }
        }
        else if (name === "youtube_url"){
          this.updateYoutubeVideoKey();
        }
        else {
          if (this.state.property.deal_analysis_type === "Landlord Deal"){
            this.updateLandlordDealCalculator();
          }else {
            this.updateProfitPotentialCalculator();
          }
        }
      });
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

  updatePropertyAuctionStart = (date) => {
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        auction_started_at: date
        }
      }, function () {
        // this.updatePropertyAuctionEnding();
      })
    }
  }
  updatePropertyBestOfferAuctionStart = (date) => {
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        best_offer_auction_started_at: date
        }
      })
    }
  }
  updatePropertyBestOfferAuctionEnd = (date) => {
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
        best_offer_auction_ending_at: date
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
      }, function () {
        // this.updatePropertyAuctionEnding();
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

    let eg1 = parseFloat(this.state.property.appreciation_value.eg1 ? this.state.property.appreciation_value.eg1 : 0);
    let eg2 = parseFloat(this.state.property.appreciation_value.eg2 ? this.state.property.appreciation_value.eg2 : 0);
    let eg3 = parseFloat(this.state.property.appreciation_value.eg3 ? this.state.property.appreciation_value.eg3 : 0);
    let eg4 = parseFloat(this.state.property.appreciation_value.eg4? this.state.property.appreciation_value.eg4 : 0);
    let t1 = parseFloat(this.state.property.appreciation_value.t1? this.state.property.appreciation_value.t1 : 0);
    let t2 = parseFloat(this.state.property.appreciation_value.t2? this.state.property.appreciation_value.t2 : 0);
    let t3 = parseFloat(this.state.property.appreciation_value.t3? this.state.property.appreciation_value.t3 : 0);
    let t4 = parseFloat(this.state.property.appreciation_value.t4? this.state.property.appreciation_value.t4 : 0);
    let cf1 = parseFloat(this.state.property.appreciation_value.cf1 ? this.state.property.appreciation_value.cf1 : 0);
    let cf2 = parseFloat(this.state.property.appreciation_value.cf2 ? this.state.property.appreciation_value.cf2 : 0);
    let cf3 = parseFloat(this.state.property.appreciation_value.cf3 ? this.state.property.appreciation_value.cf3 : 0);
    let cf4 = parseFloat(this.state.property.appreciation_value.cf4 ? this.state.property.appreciation_value.cf4 : 0);
    let ta = parseFloat(this.state.property.appreciation_value.ta ? this.state.property.appreciation_value.ta : 0);
    let tb = parseFloat(this.state.property.appreciation_value.tb ? this.state.property.appreciation_value.tb : 0);
    let tc = parseFloat(this.state.property.appreciation_value.tc ? this.state.property.appreciation_value.tc : 0);
    let td = parseFloat(this.state.property.appreciation_value.td ? this.state.property.appreciation_value.td : 0);
    let vac1 = parseFloat(this.state.property.appreciation_value.vac1 ? this.state.property.appreciation_value.vac1 : 0);
    let vac2 = parseFloat(this.state.property.appreciation_value.vac2 ? this.state.property.appreciation_value.vac2 : 0);
    let vac3 = parseFloat(this.state.property.appreciation_value.vac3 ? this.state.property.appreciation_value.vac3 : 0);
    let vac4 = parseFloat(this.state.property.appreciation_value.vac4 ? this.state.property.appreciation_value.vac4 : 0);
    let ppy1 = parseFloat(this.state.property.appreciation_value.ppy1 ? this.state.property.appreciation_value.ppy1 : 0);
    let ppy2 = parseFloat(this.state.property.appreciation_value.ppy2 ? this.state.property.appreciation_value.ppy2 : 0);
    let ppy3 = parseFloat(this.state.property.appreciation_value.ppy3 ? this.state.property.appreciation_value.ppy3 : 0);
    let ppy4 = parseFloat(this.state.property.appreciation_value.ppy4 ? this.state.property.appreciation_value.ppy4 : 0);

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

    eg1 = Math.round((after_rehab_value * 0.01 * loan_terms)*100)/100
    eg2 = Math.round((after_rehab_value * 0.02 * loan_terms)*100)/100
    eg3 = Math.round((after_rehab_value * 0.03 * loan_terms)*100)/100
    eg4 = Math.round((after_rehab_value * 0.04 * loan_terms)*100)/100
    t1 = Math.round((after_rehab_value + eg1)*100)/100
    t2 = Math.round((after_rehab_value + eg2)*100)/100
    t3 = Math.round((after_rehab_value + eg3)*100)/100
    t4 = Math.round((after_rehab_value + eg4)*100)/100
    cf1 = Math.round((monthly_cash_flow*(12*loan_terms))*100)/100
    cf2 = Math.round((monthly_cash_flow*(12*loan_terms))*100)/100
    cf3 = Math.round((monthly_cash_flow*(12*loan_terms))*100)/100
    cf4 = Math.round((monthly_cash_flow*(12*loan_terms))*100)/100
    ta = Math.round((cf1+t1)*100)/100
    tb = Math.round((cf1+t2)*100)/100
    tc = Math.round((cf1+t3)*100)/100
    td = Math.round((cf1+t4)*100)/100
    vac1 = Math.round((ta * 0.2)*100)/100
    vac2 = Math.round((tb * 0.2)*100)/100
    vac3 = Math.round((tc * 0.2)*100)/100
    vac4 = Math.round((td * 0.2)*100)/100
    ppy1 = Math.round((ta-vac1-total_out_of_pocket)*100)/100
    ppy2 = Math.round((tb-vac2-total_out_of_pocket)*100)/100
    ppy3 = Math.round((tc-vac3-total_out_of_pocket)*100)/100
    ppy4 = Math.round((td-vac4-total_out_of_pocket)*100)/100

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
        appreciation_value: {
          eg1,
          eg2,
          eg3,
          eg4,
          t1,
          t2,
          t3,
          t4,
          cf1,
          cf2,
          cf3,
          cf4,
          ta,
          tb,
          tc,
          td,
          vac1,
          vac2,
          vac3,
          vac4,
          ppy1,
          ppy2,
          ppy3,
          ppy4,
        }
        }
      })
    }

  }

  updatePropertyRehabCostAttr = (event, maskedvalue, floatvalue) => {
    const{ name } = event.target;
    if (this._isMounted){
      this.setState({
        property: {
        ...this.state.property,
          estimated_rehab_cost_attr:{
          ...this.state.property.estimated_rehab_cost_attr,
            [name]: parseFloat(maskedvalue.replace(/[$,.]/g,""))/100,
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

  updatePropertyOpenHouseDates = (index, date) => {
    let dates = this.state.property.open_house_dates
    dates[index]["date"] = date
    this.setState({
      property: {
      ...this.state.property,
      open_house_dates: dates,
      }
    })
  }
  updatePropertyOpenHouseDatesOpenTime = (index, date) => {
    let dates = this.state.property.open_house_dates
    dates[index]["opens"] = date
    this.setState({
      property: {
      ...this.state.property,
      open_house_dates: dates,
      }
    })
  }
  updatePropertyOpenHouseDatesCloseTime = (index, date) => {
    let dates = this.state.property.open_house_dates
    dates[index]["closes"] = date
    this.setState({
      property: {
      ...this.state.property,
      open_house_dates: dates,
      }
    })
  }

  checkBestOffer = () => {
    if (String(this.state.property.best_offer) === "true"){
      return "";
    }else {
      return "d-none";
    }
  }
  ownerCategoryText = (text) => {
    if (text){
      switch (text) {
        case "Owner":
          return "The Owner"
        case "Wholesaler":
          return "A Wholesaler who has equitable interest in this property"
        case "Realtor":
          return "A Realtor who has a listing agreement that allows me to auction my clients property"
        default:
          return""
      }
    }
  }

  addOpenHouseDateFields = () => {
    let newDate = {date: new Date(), opens: new Date(), closes: new Date()};
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

  addErrorMessage = (msg) => {
    if (msg === ""){
      return ;
    }else{
      return (<span className="error-class"> {msg} </span>);
    }
  }

  hideModal = () => {
    this.setState({
      estimated_cost_modal: false
    }, function () {
      if (this.state.property.deal_analysis_type === "Landlord Deal"){
        this.updateLandlordDealCalculator();
      }else {
        this.updateProfitPotentialCalculator();
      }
    });
  }

  addErrorClass = (msg) => {
    if (msg === ""){
      return ""
    }else {
      return "error-class"
    }
  }

  selected_show_instructions_types_options = () => {
    const show_instructions_types_options = this.state.property_options.show_instructions_types.map((key, index) => ({
      value: key.id,
      label: key.description
    }));
    let value, label;
    for (var i = 0; i < show_instructions_types_options.length; i++){
      if (show_instructions_types_options[i].value === this.state.property.show_instructions_type_id){
        value = show_instructions_types_options[i].value
        label = show_instructions_types_options[i].label
      }
    }
    if (value && label){
      return {value: value, label: label}
    }else {
      return {label: "Select", value: ""}
    }
  }
  selected_seller_pay_type_options = () => {
    const show_seller_pay_type_options = this.state.property_options.seller_pay_types.map((key, index) => ({
      value: key.id,
      label: key.description
    }));
    let value, label;
    for (var i = 0; i < show_seller_pay_type_options.length; i++){
      if (show_seller_pay_type_options[i].value === this.state.property.seller_pay_type_id){
        value = show_seller_pay_type_options[i].value
        label = show_seller_pay_type_options[i].label
      }
    }
    if (value && label){
      return {value: value, label: label}
    }else {
      return {label: "Select", value: ""}
    }
  }
	render() {
    const seller_pay_types_options = this.state.property_options.seller_pay_types.map((key, index) => ({
      value: key.id,
      label: key.description
    }));
    const show_instructions_types_options = this.state.property_options.show_instructions_types.map((key, index) => ({
      value: key.id,
      label: key.description
    }));
    // const best_offer_lengths = this.state.property_options.best_offer_lengths.map((value, index) => {
    //   return(
    //     <option key={index} value={value} >{value} days</option>
    //   )
    // })
    const open_house_dates = this.state.property.open_house_dates.map((value, index) => {
      return (
        <div key ={index} className="row mx-0">
          <div className="col-md-4 pl-0 pr-1">
            <DatePicker className="form-control mb-1" selected={value["date"] ? new Date(value["date"]) : ""} onChange={this.updatePropertyOpenHouseDates.bind(this, index)}/>
          </div>
          <div className="col-md-4 pl-0 pr-1">
            <DatePicker className="form-control mb-1" selected={value["opens"] ? new Date(value["opens"]) : ""} onChange={this.updatePropertyOpenHouseDatesOpenTime.bind(this, index)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa"/>
          </div>
          <div className="col-md-4 px-0">
            <DatePicker className="form-control mb-1" selected={value["closes"] ? new Date(value["closes"]) : ""} onChange={this.updatePropertyOpenHouseDatesCloseTime.bind(this, index)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa"/>
          </div>
        </div>
      );
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
    // const show_instructions_types = this.state.property_options.show_instructions_types.map((key, index) => {
    //   return(
    //     <option key={index} value={key.id} >{key.description}</option>
    //   )
    // });
		return (
      <div className="profile-setting">
        <div className="container custom_container px-0">
          <div className="row mx-0 profile_row my-5">
            <div className="col-md-12 px-0">
              <div className="tab-content">
                <div id="newproperty" className="container px-0">
                  <div className="profile-form">
                    <div className="profile-form-in">
                    {
                      this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
                    }
                      <div className="container creation-steps px-0">
                        <div className="steps-parts " id="step3">
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
                            <h4 className="step-name">Online Bidding Options</h4>
                          </div>
                          <form className="row mx-0 creation-forms">
                            <div className="col-md-12 text-center step_row">
                              <h6 className="font-red">BEST OFFER DETAILS</h6>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Enable Best Offer Features</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false} onChange={this.updateProperty} value={String(this.state.property.best_offer)} name="best_offer" >
                                  <option value="false">No</option>
                                  <option value="true">Yes</option>
                                </select>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Best Offer Start Date</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <div className="input-group mb-0">
                                  <DatePicker disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false} className={"form-control " + this.addErrorClass(this.state.property_best_offer_auction_started_at_error) }
                                    selected={this.state.property.best_offer_auction_started_at ? new Date(this.state.property.best_offer_auction_started_at) : ""} minDate={new Date()}
                                    name="best_offer_auction_started_at" onChange={this.updatePropertyBestOfferAuctionStart}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Best Offer Time Frame&nbsp;
                                  <OverlayTrigger trigger="click" rootClose placement="right"
                                    overlay={
                                      <Popover>
                                        <Popover.Content>
                                          <p className="mb-0">It's important for bidders to be able to see the inside of the property to ensure you get lots of offers.  It's highly suggested to set up an open house or if the property is vacant to give bidders access if they schedule an appointment.</p>
                                        </Popover.Content>
                                      </Popover>
                                    }>
                                    <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                  </OverlayTrigger>
                                </label>
                              </div>
                              <div className="col-md-6 px-1">
                                <DatePicker disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false} className={"form-control " + this.addErrorClass(this.state.property_best_offer_auction_ending_at_error) }
                                  selected={this.state.property.best_offer_auction_ending_at ? new Date(this.state.property.best_offer_auction_ending_at) : ""} minDate={new Date(this.state.property.best_offer_auction_started_at)}
                                  name="best_offer_auction_ending_at" onChange={this.updatePropertyBestOfferAuctionEnd}
                                />
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Asking Price&nbsp;
                                  <OverlayTrigger trigger="click" rootClose placement="right"
                                    overlay={
                                      <Popover>
                                        <Popover.Content>
                                          <p className="mb-0">This is the price you will send out to your email list and post on social media.</p>
                                        </Popover.Content>
                                      </Popover>
                                    }>
                                    <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                  </OverlayTrigger>
                                </label>
                              </div>
                              <div className="col-md-6 px-1">
                                <CurrencyInput prefix="$" type="text" onChangeEvent={this.updateMaskedPropertyAtrr} disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false}
                                  className={"form-control " + this.addErrorClass(this.state.property_best_offer_sellers_minimum_price_error) } name="best_offer_sellers_minimum_price" value={this.state.property.best_offer_sellers_minimum_price ? this.state.property.best_offer_sellers_minimum_price : ""} />
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Buy Now Price&nbsp;
                                  <OverlayTrigger trigger="click" rootClose placement="right"
                                    overlay={
                                      <Popover>
                                        <Popover.Content>
                                          <p className="mb-0">This should be an optimistic price you would accept immediately from any qualified buyer that will take the property off the market immediately.</p>
                                        </Popover.Content>
                                      </Popover>
                                    }>
                                    <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                  </OverlayTrigger>
                                </label>
                              </div>
                              <div className="col-md-6 px-1">
                                <CurrencyInput prefix="$" type="text" onChangeEvent={this.updateMaskedPropertyAtrr} className={"form-control " + this.addErrorClass(this.state.property_best_offer_sellers_reserve_price) } name="best_offer_sellers_reserve_price"
                                  disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false} value={this.state.property.best_offer_sellers_reserve_price ? this.state.property.best_offer_sellers_reserve_price : ""} />
                              </div>
                            </div>
                            <div className="col-md-12 text-center step_row mt-4">
                              <h6 className="font-red">LIVE ONLINE AUCTION DETAILS</h6>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + (String(this.state.property.best_offer) === "false" ? "" : "d-none")}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Online Bidding/Auction Start Date</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <div className="input-group mb-0">
                                  <DatePicker disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false} className={"form-control " + this.addErrorClass(this.state.property_auction_started_at_error) }
                                    selected={this.state.property.auction_started_at ? new Date(this.state.property.auction_started_at) : ""} minDate={new Date()}
                                    name="auction_started_at" onChange={this.updatePropertyAuctionStart}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Online Bidding/Auction Time Frame&nbsp;
                                  <OverlayTrigger trigger="click" rootClose placement="right"
                                    overlay={
                                      <Popover>
                                        <Popover.Content>
                                          <p className="mb-0">Make sure you give bidders at least a couple of times they can inspect the interior and exterior of the property by giving showing options below.</p>
                                        </Popover.Content>
                                      </Popover>
                                    }>
                                    <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                  </OverlayTrigger>
                                </label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false}
                                  className={"form-control " + this.addErrorClass(this.state.property_auction_length_error) } value={this.state.property.auction_length} name="auction_length" onChange={this.updateProperty}>
                                  <option>Please select</option>
                                  {auction_lengths}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Asking Price&nbsp;
                                  <OverlayTrigger trigger="click" rootClose placement="right"
                                    overlay={
                                      <Popover>
                                        <Popover.Content>
                                          <p className="mb-0">This is the price you will send out to your email list and post on social media.</p>
                                        </Popover.Content>
                                      </Popover>
                                    }>
                                    <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                  </OverlayTrigger>
                                </label>
                              </div>
                              <div className="col-md-6 px-1">
                                <CurrencyInput prefix="$" type="text" onChangeEvent={this.updateMaskedPropertyAtrr} disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false}
                                  className={"form-control " + this.addErrorClass(this.state.property_seller_price_error) } name="seller_price"  value={this.state.property.seller_price} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Buy Now Price&nbsp;
                                  <OverlayTrigger trigger="click" rootClose placement="right"
                                    overlay={
                                      <Popover>
                                        <Popover.Content>
                                          <p className="mb-0">(i) This should be an optimistic price you would accept immediately from any qualified buyer that will take the property off the market immediately.
                                            <br/>
                                          (ii)(Buyers can't make an offer less than 20% below your asking price and buyers offer will automatically be withdrawn if it's not accepted within 24 hours of when the offer was submitted)</p>
                                        </Popover.Content>
                                      </Popover>
                                    }>
                                    <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                  </OverlayTrigger>
                                </label>
                              </div>
                              <div className="col-md-6 px-1">
                                <CurrencyInput prefix="$" type="text" onChangeEvent={this.updateMaskedPropertyAtrr} disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false}
                                  className={"form-control " + this.addErrorClass(this.state.property_buy_now_price_error) } name="buy_now_price" value={this.state.property.buy_now_price}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row mt-4">
                              <div className="col-md-6 px-1 text-right">
                                <label>Ideal Closing Date&nbsp;
                                  <OverlayTrigger trigger="click" rootClose placement="right"
                                    overlay={
                                      <Popover>
                                        <Popover.Content>
                                          <p className="mb-0">IMPORTANT: Make sure if you are assigning your equitable interest in this property that your closing date is at or after your ideal closing date. Preferably you should give yourself at least a week from when the auction ends for the buyer to close.</p>
                                        </Popover.Content>
                                      </Popover>
                                    }>
                                    <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                  </OverlayTrigger>
                                </label>
                              </div>
                              <div className="col-md-6 px-1">
                                <div className="input-group mb-0">
                                  <DatePicker className={"form-control " + this.addErrorClass(this.state.property_auction_ending_at_error) }
                                    selected={this.state.property.auction_ending_at ? new Date(this.state.property.auction_ending_at) : ""}
                                    minDate = {this.state.property.auction_started_at}
                                    onChange={this.updatePropertyAuctionEndingDate}
                                    name="auction_ending_at"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Seller agrees to pay for
                                </label><span className="font-sign">*</span>
                              </div>
                              <div className="col-md-6 px-1">
                                {/* <select className={"form-control " + this.addErrorClass(this.state.property_show_instructions_type_id_error) } value={this.state.property.show_instructions_type_id} name="show_instructions_type_id" onChange={this.updateProperty}>
                                  <option>Please Select</option>
                                  {show_instructions_types}
                                </select> */}
                                <Select
                                  className={"show_inst " + this.addErrorClass(this.state.property_seller_pay_type_id_error) }
                                  options={seller_pay_types_options}
                                  value={this.selected_seller_pay_type_options()}
                                  onChange={e => {this.setState({property: {...this.state.property, seller_pay_type_id: e.value}});}}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Amount Deposit in Closing</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <CurrencyInput prefix="$" type="text" onChangeEvent={this.updateMaskedPropertyAtrr} disabled={((this.state.property.status === "Best Offer" || this.state.property.status === "Live Online Bidding") && this.state.is_admin === false) ? true : false}
                                  className={"form-control " + this.addErrorClass(this.state.property_closing_amount_error) } name="property_closing_amount"  value={this.state.property.property_closing_amount} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Options to Buy<span className="font-sign">*</span></label>
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
                                <label>Showing Option&nbsp;
                                  <OverlayTrigger trigger="click" rootClose placement="right"
                                    overlay={
                                      <Popover>
                                        <Popover.Content>
                                          <p className="mb-0">It is EXTREMELY Important to give bidders easy access to view your property.  When occupied set at least 1 date before your Best Offer and/or your Live Online Auction ends to get more offers when possible.</p>
                                        </Popover.Content>
                                      </Popover>
                                    }>
                                    <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                  </OverlayTrigger>
                                </label><span className="font-sign">*</span>
                              </div>
                              <div className="col-md-6 px-1">
                                {/* <select className={"form-control " + this.addErrorClass(this.state.property_show_instructions_type_id_error) } value={this.state.property.show_instructions_type_id} name="show_instructions_type_id" onChange={this.updateProperty}>
                                  <option>Please Select</option>
                                  {show_instructions_types}
                                </select> */}
                                <Select
                                  className={"show_inst " + this.addErrorClass(this.state.property_show_instructions_type_id_error) }
                                  options={show_instructions_types_options}
                                  value={this.selected_show_instructions_types_options()}
                                  onChange={e => {this.setState({property: {...this.state.property, show_instructions_type_id: e.value}});}}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Showing Instructions</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className={"form-control textarea-resize " + this.addErrorClass(this.state.property_show_instructions_text_error) } rows="3" placeholder="Please give details where the combo box is located and what's the combo code." onChange={this.updateProperty} value={this.state.property.show_instructions_text} name="show_instructions_text"></textarea>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Open House Dates&nbsp;
                                  <OverlayTrigger trigger="click" rootClose placement="right"
                                    overlay={
                                      <Popover>
                                        <Popover.Content>
                                          <p className="mb-0">If the property is not vacant set as many open houses as possible so bidders can view the property at least 24 to 48 hours before your Best Offer or Online Bidding ends to make sure you get your Highest and Best Offer.</p>
                                        </Popover.Content>
                                      </Popover>
                                    }>
                                    <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                  </OverlayTrigger>
                                </label>
                              </div>
                              <div className="col-md-6 px-1">
                                <div className="input-group mb-0">
                                  {open_house_dates}
                                </div>
                              </div>
                              <div className="offset-md-6 col-md-6 px-2 row mx-0">
                                <div className="col-md-4 text-left px-0">
                                  <Link to="#" className="add_links" onClick={this.addOpenHouseDateFields}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                    <p className="mb-0">Add More</p>
                                  </Link>
                                </div>
                                <div className="col-md-4 text-left px-0">
                                  <Link to="#" className="add_links" onClick={this.removeOpenHouseDateFields}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                    <p className="mb-0">Del More</p>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div className="col-md-12 text-center my-4">
                            <Link to="#" onClick={this.submitStepThree} className="red-btn step-btn mx-1">Update</Link>
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
