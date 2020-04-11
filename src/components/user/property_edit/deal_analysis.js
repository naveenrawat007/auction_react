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



export default class DealAnalysis extends Component{
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
    window.scrollTo(0,0)
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

  sendStepTwoData = () => {
    const fd = new FormData();
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
    fd.append('property[est_annual_operating_fees_others]', this.state.property.est_annual_operating_fees_others)
    fd.append('property[annual_debt]', this.state.property.annual_debt)
    fd.append('property[net_operating_income]', this.state.property.net_operating_income)
    fd.append('property[annual_cash_flow]', this.state.property.annual_cash_flow)
    fd.append('property[monthly_cash_flow]', this.state.property.monthly_cash_flow)
    fd.append('property[total_out_of_pocket]', this.state.property.total_out_of_pocket)
    fd.append('property[roi_cash_percentage]', this.state.property.roi_cash_percentage)
    fd.append('property[arv_analysis]', this.state.property.arv_analysis)
    fd.append('property[description_of_repairs]', this.state.property.description_of_repairs)
    fd.append('property[rental_description]', this.state.property.rental_description)
    if (this.state.property.arv_proof){
      fd.append('arv_proof', this.state.property.arv_proof, this.state.property.arv_proof.name)
    }
    if (this.state.property.rehab_cost_proof){
      fd.append('rehab_cost_proof', this.state.property.rehab_cost_proof, this.state.property.rehab_cost_proof.name)
    }
    if (this.state.property.rental_proof){
      fd.append('rental_proof', this.state.property.rental_proof, this.state.property.rental_proof.name)
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
        this.setState({
          message: result.message,
          variant: "success",
        })
        // this.updateCurrentState(result.property);
        this.showProperty();
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


  submitStepTwo = () => {
    let formIsValid = this.stepTwoValidation();
    if (formIsValid){
      this.setState({
        isLoaded: false,
      });
      this.sendStepTwoData();
    }
  }
  stepTwoValidation = () => {
    let property_after_rehab_value_error = "";
    let property_asking_price_error = "";
    let property_estimated_rehab_cost_error = "";
    let property_arv_proof_error = "";
    let property_rehab_cost_proof_error = "";

    let property_amount_financed_percentage_error = "";
    let property_amount_financed_error = "";
    let property_interest_rate_error = "";
    let property_loan_terms_error = "";
    let property_closing_cost_error = "";
    let property_insurance_annually_error = "";
    let property_short_term_financing_cost_error = "";
    let property_taxes_annually_error = "";
    let property_est_annual_management_fees_error = "";
    let property_est_annual_operating_fees_others_error = "";
    let property_monthly_rent_error = "";
    let property_vacancy_rate_error = "";
    let property_rental_proof_error = "";
    let property_arv_analysis_error= "";
    let property_description_of_repair_error= "";
    let property_rental_description_error= "";

    if (this.state.property.after_rehab_value === ""){
      property_after_rehab_value_error = "can't be blank."
    }else if (isNaN(this.state.property.after_rehab_value)) {
      property_after_rehab_value_error = "error."
    }
    if (this.state.property.asking_price === ""){
      property_asking_price_error = "can't be blank."
    }else if (isNaN(this.state.property.asking_price)) {
      property_asking_price_error = "error."
    }
    if (this.state.property.estimated_rehab_cost === ""){
      property_estimated_rehab_cost_error = "can't be blank."
    }else if (isNaN(this.state.property.estimated_rehab_cost)) {
      property_estimated_rehab_cost_error = "error."
    }
    if ((this.state.property.arv_proof === null) && (this.state.property.arv_analysis === "")&& (this.state.property.arv_proof_link === "")){
      property_arv_proof_error = "can't be blank."
      property_arv_analysis_error = "error"
    }
    if (this.state.property.deal_analysis_type === "Landlord Deal"){
      if (this.state.property.amount_financed_percentage === ""){
        property_amount_financed_percentage_error = "can't be blank."
      }else if (isNaN(this.state.property.amount_financed_percentage)) {
        property_amount_financed_percentage_error = "error."
      }
      if (this.state.property.amount_financed === ""){
        property_amount_financed_error = "can't be blank."
      }else if (isNaN(this.state.property.amount_financed)) {
        property_amount_financed_error = "error."
      }
      if (this.state.property.interest_rate === ""){
        property_interest_rate_error = "can't be blank."
      }else if (isNaN(this.state.property.interest_rate)) {
        property_interest_rate_error = "error."
      }
      if (this.state.property.loan_terms === ""){
        property_loan_terms_error = "can't be blank."
      }else if (isNaN(this.state.property.loan_terms)) {
        property_loan_terms_error = "error."
      }
      if (this.state.property.closing_cost === ""){
        property_closing_cost_error = "can't be blank."
      }else if (isNaN(this.state.property.closing_cost)) {
        property_closing_cost_error = "error."
      }
      if (this.state.property.insurance_annually === ""){
        property_insurance_annually_error = "can't be blank."
      }else if (isNaN(this.state.property.insurance_annually)) {
        property_insurance_annually_error = "error."
      }
      if (this.state.property.short_term_financing_cost === ""){
        property_short_term_financing_cost_error = "can't be blank."
      }else if (isNaN(this.state.property.short_term_financing_cost)) {
        property_short_term_financing_cost_error = "error."
      }
      if (this.state.property.taxes_annually === ""){
        property_taxes_annually_error = "can't be blank."
      }else if (isNaN(this.state.property.taxes_annually)) {
        property_taxes_annually_error = "error."
      }
      if (this.state.property.est_annual_management_fees === ""){
        property_est_annual_management_fees_error = "can't be blank."
      }else if (isNaN(this.state.property.est_annual_management_fees)) {
        property_est_annual_management_fees_error = "error."
      }
      if (this.state.property.est_annual_operating_fees_others === ""){
        property_est_annual_operating_fees_others_error = "can't be blank."
      }else if (isNaN(this.state.property.est_annual_operating_fees_others)) {
        property_est_annual_operating_fees_others_error = "error."
      }
      if (this.state.property.monthly_rent === ""){
        property_monthly_rent_error = "can't be blank."
      }else if (isNaN(this.state.property.monthly_rent)) {
        property_monthly_rent_error = "error."
      }
      if (this.state.property.vacancy_rate === ""){
        property_vacancy_rate_error = "can't be blank."
      }else if (isNaN(this.state.property.vacancy_rate)) {
        property_vacancy_rate_error = "error."
      }
      if ((this.state.property.rental_proof === null) &&(this.state.property.rental_description === "") && (this.state.property.rental_proof_link === "")){
        property_rental_proof_error = "can't be blank."
        property_rental_description_error = "error"
      }
    }
    this.setState({
      property_after_rehab_value_error,
      property_asking_price_error,
      property_estimated_rehab_cost_error,
      property_arv_proof_error,
      property_rehab_cost_proof_error,

      property_amount_financed_percentage_error,
      property_amount_financed_error,
      property_interest_rate_error,
      property_loan_terms_error,
      property_closing_cost_error,
      property_insurance_annually_error,
      property_short_term_financing_cost_error,
      property_taxes_annually_error,
      property_est_annual_management_fees_error,
      property_est_annual_operating_fees_others_error,
      property_monthly_rent_error,
      property_vacancy_rate_error,
      property_rental_proof_error,
      property_arv_analysis_error,
      property_description_of_repair_error,
      property_rental_description_error,
    })
    if (property_after_rehab_value_error !== "" || property_asking_price_error !== "" || property_estimated_rehab_cost_error !== "" || property_arv_proof_error !== "" || property_arv_proof_error !== "" || property_rehab_cost_proof_error !== ""  || property_amount_financed_percentage_error !== "" || property_amount_financed_error !== "" || property_interest_rate_error !== "" || property_loan_terms_error !== "" || property_closing_cost_error !== "" || property_insurance_annually_error !== "" || property_short_term_financing_cost_error !== "" || property_taxes_annually_error !== "" || property_est_annual_management_fees_error !== "" || property_est_annual_operating_fees_others_error !== "" || property_monthly_rent_error !== "" || property_vacancy_rate_error !== "" || property_rental_proof_error !== "" || property_arv_analysis_error !== "" || property_description_of_repair_error !== "" || property_rental_description_error !== ""  ){
      return false;
    }else{
      return true;
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


  checkBestOffer = () => {
    if (String(this.state.property.best_offer) === "true"){
      return "";
    }else {
      return "d-none";
    }
  }

  addErrorMessage = (msg) => {
    if (msg === ""){
      return ;
    }else{
      return (<span className="error-class"> {msg} </span>);
    }
  }
  checkNumericInt = (e) => {
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
  checkNumeric = (e) => {
    var regex = new RegExp("^[0-9.]+$");
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
    }, function () {
      if (this.state.property.deal_analysis_type === "Landlord Deal"){
        this.updateLandlordDealCalculator();
      }else {
        this.updateProfitPotentialCalculator();
      }
    });
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
      return "";
    }else {
      return "d-none ";
    }
  }

  addErrorClass = (msg) => {
    if (msg === ""){
      return ""
    }else {
      return "error-class"
    }
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
                    {
                      this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
                    }
                      <div className="container creation-steps px-0">
                        <div className="steps-parts" id="step2">
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
                            <h4 className="step-name">Deal Analysis</h4>
                          </div>
                          <form className="col-md-10 offset-md-1">
                            <div className="form-group col-md-10 offset-md-1 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Type of Deal</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <select className="form-control" name="deal_analysis_type" value={this.state.property.deal_analysis_type === "Rehab & Flip Deal" ? "Rehab & Flip Deal" : "Landlord Deal"} onChange={this.updateProperty} >
                                  <option value="Rehab & Flip Deal">Rehab & Flip Deal</option>
                                  <option value="Landlord Deal">Landlord Analysis</option>
                                </select>
                              </div>
                            </div>
                            <div className={this.checkRehabDeal()}>
                              <div className="form-group col-md-10 offset-md-1 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Estimated After Rehab Value(ARV)</label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <CurrencyInput allowNegative={true} type="text" name="after_rehab_value" className={"form-control " + this.addErrorClass(this.state.property_after_rehab_value_error) } onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" value={this.state.property.after_rehab_value}/>
                                </div>
                              </div>
                              <div className="form-group col-md-10 offset-md-1 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Sellers Asking Price <span className="font-sign">(-)</span></label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <CurrencyInput allowNegative={true} type="text" className={"form-control " + this.addErrorClass(this.state.property_asking_price_error) } id="temp_id" name="asking_price" value={this.state.property.asking_price} onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$"/>
                                </div>
                              </div>
                              <div className="form-group col-md-10 offset-md-1 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Estimated Rehab Cost <span className="font-sign">(-)</span></label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <CurrencyInput allowNegative={true} type="text" readOnly={true} prefix="$" className={"form-control estimated-cost " + this.addErrorClass(this.state.property_estimated_rehab_cost_error) } name="estimated_rehab_cost" value={this.state.property.estimated_rehab_cost} onClick={() => {this.setState({
                                    estimated_cost_modal: true
                                  });}}/>
                                </div>
                              </div>
                              <div className="form-group col-md-10 offset-md-1 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Estimated Profit Potential <span className="font-sign">(=)</span></label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <CurrencyInput allowNegative={true} type="text" name="profit_potential" prefix="$" className="form-control" onChangeEvent={this.updateMaskedPropertyAtrr} value={this.state.property.profit_potential} readOnly={true} />
                                </div>
                              </div>
                            </div>
                            <div className = {this.checkLandordDeal()}>
                              <div className="row mx-0">
                                <div className="col-md-6 my-3 px-0">
                                  <h5 className="text-uppercase font-red step_heads">Acquisition Analysis</h5>
                                  <div className="row mx-0 step_row">
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="text-uppercase">EST AFTER REHAB VALUE:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Please provide proof that your ARV is correct below because it will have to appraise for this price or the buyer will have to pay the difference to keep these numbers the same.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" className={"form-control " + this.addErrorClass(this.state.property_after_rehab_value_error) } value={this.state.property.after_rehab_value} name="after_rehab_value" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" />
                                    </div>
                                    <div className="col-md-12 px-0">
                                      <h6 className="text-uppercase font-red font-600">Acquisition Cost</h6>
                                      <ul className="est_box">
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Asking/Purchase Price:&nbsp;
                                              <OverlayTrigger trigger="click" rootClose placement="right"
                                                overlay={
                                                  <Popover>
                                                    <Popover.Content>
                                                      <p className="mb-0">Typically your asking price is the price you would blast out to your email list or social media.</p>
                                                    </Popover.Content>
                                                  </Popover>
                                                }>
                                                <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                              </OverlayTrigger>
                                            </label>
                                            <CurrencyInput allowNegative={true} type="text" className={"form-control " + this.addErrorClass(this.state.property_asking_price_error) } value={this.state.property.asking_price} name="asking_price" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$"/>
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Rehab Cost:&nbsp;
                                              <OverlayTrigger trigger="click" rootClose placement="right"
                                                overlay={
                                                  <Popover>
                                                    <Popover.Content>
                                                      <p className="mb-0">Make your deal more credible by filling in the rehab calculator, or upload your rehab costs below.</p>
                                                    </Popover.Content>
                                                  </Popover>
                                                }>
                                                <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                              </OverlayTrigger>
                                            </label>
                                            <CurrencyInput allowNegative={true} type="text" readOnly={true} prefix="$" className={"form-control estimated-cost " + this.addErrorClass(this.state.property_asking_price_error) }  name="estimated_rehab_cost" value={this.state.property.estimated_rehab_cost} onClick={() => {this.setState({
                                              estimated_cost_modal: true
                                            });}}/>
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Closing Cost:&nbsp;
                                              <OverlayTrigger trigger="click" rootClose placement="right"
                                                overlay={
                                                  <Popover>
                                                    <Popover.Content>
                                                      <p className="mb-0">Closing costs can be less than 1% for cash deals or can be as high as 2% to 3% if the buyer has to pay for owners title policy and all closing costs.</p>
                                                    </Popover.Content>
                                                  </Popover>
                                                }>
                                                <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                              </OverlayTrigger>
                                            </label>
                                            <CurrencyInput allowNegative={true} type="text" className={"form-control " + this.addErrorClass(this.state.property_closing_cost_error) } name="closing_cost" value={this.state.property.closing_cost} onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$"/>
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Annual Insurance:&nbsp;
                                              <OverlayTrigger trigger="click" rootClose placement="right"
                                                overlay={
                                                  <Popover>
                                                    <Popover.Content>
                                                      <p className="mb-0">A ballpark estimate is approximately 1% of value or get a quote at <a href="www.BenchmarkInsurance.com">www.benchmarkinsurance.com</a>.</p>
                                                    </Popover.Content>
                                                  </Popover>
                                                }>
                                                <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                              </OverlayTrigger>
                                            </label>
                                            <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" className={"form-control " + this.addErrorClass(this.state.property_insurance_annually_error) } name="insurance_annually" value={this.state.property.insurance_annually} />
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Hard Money or STF Cost:&nbsp;
                                              <OverlayTrigger trigger="click" rootClose placement="right"
                                                overlay={
                                                  <Popover>
                                                    <Popover.Content>
                                                      <p className="mb-0">Estimate 0% to 4% of your asking price+Est Rehab+Closing Costs then add 3% to 4% of your ARV depending if you’re using a line of credit, private or hard money. (check out the link to short term financing)</p>
                                                    </Popover.Content>
                                                  </Popover>
                                                }>
                                                <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                              </OverlayTrigger>
                                            </label>
                                            <CurrencyInput allowNegative={true} type="text" className={"form-control " + this.addErrorClass(this.state.property_short_term_financing_cost_error) } value={this.state.property.short_term_financing_cost} name="short_term_financing_cost" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$"/>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-md-6 px-0">
                                      <label className="label-bold">Total Acquisition Costs:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Purchase Price + Est Rehab Costs + Est Closing Costs + Short Term Financing (if needed)</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" value={this.state.property.total_acquisition_cost} readOnly={true} className="form-control" name="total_acquisition_cost" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 my-3 px-0">
                                  <h5 className="text-uppercase font-red step_heads step_fonts">Financing Analysis After rehab</h5>
                                  <div className="row mx-0 step_row ">
                                    <div className="col-md-6 px-0 my-2 label_mobile">
                                      <label className="text-uppercase">amount financed&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">It is determined by the appraised value of the property by mortgage company x the percent buyer is putting down. Most mortgage companies require 20% to 25% of the sales price.  If the property doesn't appraise then the buyer will have to put down the difference.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 row mx-0">
                                      <input type="number" onKeyPress={this.checkNumeric} className={"form-control col-md-4 " + this.addErrorClass(this.state.property_amount_financed_percentage_error) } name="amount_financed_percentage" onChange={this.updateProperty} value={this.state.property.amount_financed_percentage} />
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} value={this.state.property.amount_financed} className="form-control col-md-7 offset-md-1" name="amount_financed" />
                                    </div>
                                    <div className="col-md-6 px-0 my-2 label_web">
                                      <label className="text-uppercase">amount financed&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">It is determined by the appraised value of the property by mortgage company x the percent buyer is putting down. Most mortgage companies require 20% to 25% of the sales price.  If the property doesn't appraise then the buyer will have to put down the difference.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 px-0 label_mobile">
                                      <label className="labels_main">Interest Rate APR&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Current interest rates for landlord properties can range from 4.5% to 6%.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_interest_rate_error) } name="interest_rate" value={this.state.property.interest_rate} onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0 label_web">
                                      <label className="labels_main">Interest Rate APR&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Current interest rates for landlord properties can range from 4.5% to 6%.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 px-0 label_mobile">
                                      <label className="labels_main">Loan Term&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Most landlords do 15, 20 or 30-year loans.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" onKeyPress={this.checkNumeric} value={this.state.property.loan_terms} className={"form-control " + this.addErrorClass(this.state.property_loan_terms_error) } name="loan_terms" onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0 label_web">
                                      <label className="labels_main">Loan Term&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Most landlords do 15, 20 or 30-year loans.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 px-0 label_mobile">
                                      <label className="labels_main">Monthly Principal &amp; Interest&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">This is the monthly Principal & Interest that will be paid on this loan based upon the Amount Financed, APR and amortized Loan Term.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} value={this.state.property.principal_interest} className="form-control" name="principal_interest" />
                                    </div>
                                    <div className="col-md-6 my-2 px-0 label_web">
                                      <label className="labels_main">Monthly Principal &amp; Interest&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">This is the monthly Principal & Interest that will be paid on this loan based upon the Amount Financed, APR and amortized Loan Term.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 px-0 my-2 label_mobile">
                                      <label className="labels_main">Annual Debt Service&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Monthly PI x 12 months</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} value={this.state.property.annual_debt} className="form-control" name="annual_debt"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2 label_web">
                                      <label className="labels_main">Annual Debt Service&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Monthly PI x 12 months</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 my-3 px-0">
                                  <h5 className="text-uppercase font-red step_heads">Expense Analysis</h5>
                                  <div className="row mx-0 step_row">
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual taxes:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Use the property taxes that are quoted on the Taxing Authority Website where the property is located. Ex: Harris County is <a href="www.hcad.org">www.hcad.org</a>.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" className={"form-control " + this.addErrorClass(this.state.property_taxes_annually_error) } name="taxes_annually" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" value={this.state.property.taxes_annually}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Insurance&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">(Auto-populated from above)</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" className={"form-control " + this.addErrorClass(this.state.property_insurance_annually_error) } name="insurance_annually" value={this.state.property.insurance_annually} />
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Management Fees:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">You can put zero unless the property is currently being managed.  If currently being managed please use the actual management cost.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" className={"form-control " + this.addErrorClass(this.state.property_est_annual_management_fees_error) } name="est_annual_management_fees" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" value={this.state.property.est_annual_management_fees}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Maintentance:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Annual HOA, estimated water, electric, gas, repairs, yard, pest control costs if needed.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" value={this.state.property.est_annual_operating_fees_others} className={"form-control " + this.addErrorClass(this.state.property_est_annual_operating_fees_others_error) } name="est_annual_operating_fees_others" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Operating Costs:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Estimated Annual Property Taxes + Insurance +  Management + Maintentance. </p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" className="form-control" readOnly={true} value={this.state.property.est_annual_operating_fees} name="est_annual_operating_fees" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" />
                                    </div>
                                  </div>
                                  <div className="col-md-12 mt-4 px-0">
                                    <h6 className="text-uppercase font-red font-600">Income or Cash Flow Analysis</h6>
                                  </div>
                                  <div className="row mx-0 step_row">
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Total EST Monthly Rent:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Be prepared to prove your suggested monthly rent or upload with your ARV proof below.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" className={"form-control " + this.addErrorClass(this.state.property_monthly_rent_error) } name="monthly_rent" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" value={this.state.property.monthly_rent}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Total Gross Yearly Income:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Automatically filled in based upon Monthly Rent x 12 months in a year.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} value={this.state.property.total_gross_yearly_income} className="form-control" name="total_gross_yearly_income"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Vacancy Rate:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Use 5% to 10% unless you have an actual vacancy for at least 24 months.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_vacancy_rate_error) } name="vacancy_rate" value={this.state.property.vacancy_rate} onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main label-bold">ADJ Gross Yearly Income:&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Automatically filled in based upon GYI x Vacancy Rate.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} value={this.state.property.adjusted_gross_yearly_income} className="form-control" name="adjusted_gross_yearly_income"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 my-3 px-0">
                                  <h5 className="text-uppercase font-red step_heads step_fonts">Cash Flow Analysis&nbsp;
                                    <OverlayTrigger trigger="click" rootClose placement="right"
                                      overlay={
                                        <Popover>
                                          <Popover.Content>
                                            <p className="mb-0">These numbers are the Most Important numbers to a Landlord to determine if the property is a good landlord deal.</p>
                                          </Popover.Content>
                                        </Popover>
                                      }>
                                      <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                    </OverlayTrigger>
                                  </h5>
                                  <div className="row mx-0 step_row">
                                    <div className="col-md-6 my-2 row mx-0">
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} value={this.state.property.adjusted_gross_yearly_income} className="form-control" name="adjusted_gross_yearly_income"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">(+)Adjusted Gross Yearly Income
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Automatically filled in based upon GYI x Vacancy Rate.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <CurrencyInput allowNegative={true} type="text" className="form-control " onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} value={this.state.property.est_annual_operating_fees} name="est_annual_operating_fees" onChange={this.updateProperty} />
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">(-) Est Annual Operating Costs&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Estimated Annual Property Taxes + Insurance +  Management + Maintenance.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} value={this.state.property.net_operating_income} className="form-control" name="net_operating_income" />
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main label-bold">(=) Net Operating Income (NOI)&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">NOI equals Adjusted Gross Yearly Income minus Estimated Annual Operating Costs.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} value={this.state.property.annual_debt} className="form-control" name="annual_debt"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">(-) Annual Debt Service&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Monthly PI x 12 months.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <CurrencyInput allowNegative={true} type="text" readOnly={true} onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" value={this.state.property.annual_cash_flow} className="form-control" name="annual_cash_flow"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main label-bold">(=) Annual Cash Flow&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">It is determined by NOI minus Annual Debt Service.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-12 mt-4">
                                    <h6 className="text-uppercase font-red font-600">Bottom Line</h6>
                                  </div>
                                  <div className="row mx-0 step_row bottom_box">
                                    <div className="col-md-6 my-2">
                                      <CurrencyInput allowNegative={true} type="text" readOnly={true} onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" value={this.state.property.monthly_cash_flow} className="form-control" name="monthly_cash_flow"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Monthly Cash Flow&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">It is the Annual Cash Flow divided by 12 months in a year.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <CurrencyInput allowNegative={true} type="text" onChangeEvent={this.updateMaskedPropertyAtrr} prefix="$" readOnly={true} className="form-control" value={this.state.property.total_out_of_pocket} name="total_out_of_pocket"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Total Out of Pocket&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">It is determined by what the property appraises for after the rehab to establish the amount financed by long term lender. Then take 70%, 75% or 80% of the appraised value minus Total Acquisition Costs to determine what you will need to bring to closing.</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2">
                                      <input type="number" readOnly={true} className="form-control" value={this.state.property.roi_cash_percentage} name="roi_cash_percentage"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="label-bold">ROI Cash On Cash&nbsp;
                                        <OverlayTrigger trigger="click" rootClose placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">Annual Cash Flow / Total Out of pocket (The result is in %)</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </form>
                          <div className="table-responsive">
                            <table className={this.checkLandordDeal() + " table table-bordered mb-5 col-md-10 offset-md-1"} id="step_table">
                              <thead>
                                <tr>
                                  <th>Appreciation</th>
                                  <th>Equality Growth (Loan Term)</th>
                                  <th>Total Equality Growth</th>
                                  <th>Cash Flow (Loan Term)</th>
                                  <th>Total Cash Flow </th>
                                  <th>Vac/Maint</th>
                                  <th>Possible Profit (Loan Term)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1.00%</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.eg1)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.t1)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.cf1)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.ta)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.vac1)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.ppy1)}</td>
                                </tr>
                                <tr>
                                  <td>2.00%</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.eg2)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.t2)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.cf2)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.tb)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.vac2)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.ppy2)}</td>
                                </tr>
                                <tr>
                                  <td>3.00%</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.eg3)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.t3)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.cf3)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.tc)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.vac3)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.ppy3)}</td>
                                </tr>
                                <tr>
                                  <td>4.00%</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.eg4)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.t4)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.cf4)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.td)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.vac4)}</td>
                                  <td> {window.format_currency(this.state.property.appreciation_value.ppy4)}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <form className="creation-forms sell_forms">
                            <div className={ this.checkLandordDeal() + " form-group col-md-8 offset-md-2 px-0 row step_row align-items-start"}>
                              <div className="col-md-6 px-1 text-right">
                                <label>How did you determine your Rental Value? Or Upload Proof?</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className={"form-control textarea-resize " + this.addErrorClass(this.state.property_rental_description_error) } name="rental_description" onChange={this.updateProperty} value={this.state.property.rental_description}/>
                              </div>
                              <div className="col-md-6 offset-md-6 px-1 mt-2">
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" name="rental_proof" onChange={this.fileSelectHandler}/>
                                  <label className={"custom-file-label " + this.addErrorClass(this.state.property_rental_proof_error) } htmlFor="customFile">{this.state.property.rental_proof_link ? "Old Rental Proof or" : null } Choose file</label>
                                </div>
                              </div>
                            </div>

                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>How did you determine your ARV (After Rehab Value) or Upload Proof?</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea className={"form-control textarea-resize " + this.addErrorClass(this.state.property_arv_analysis_error) } name="arv_analysis" onChange={this.updateProperty} value={this.state.property.arv_analysis}/>
                              </div>
                              <div className="col-md-6 offset-md-6 px-1 mt-2">
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" name="arv_proof" onChange={this.fileSelectHandler} />
                                  <label className={"custom-file-label " + this.addErrorClass(this.state.property_arv_proof_error) } htmlFor="customFile">{this.state.property.arv_proof_link ? "Old Arv Proof or" : null } Choose file</label>
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Description of Repairs or upload Estimated Rehab Cost</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <textarea type="text" className={"form-control textarea-resize " + this.addErrorClass(this.state.property_description_of_repair_error) } id="description-of-repairs" name="description_of_repairs" value={this.state.property.description_of_repairs} onChange={this.updateProperty}/>
                              </div>
                              <div className="col-md-6 offset-md-6 px-1 mt-2">
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" name="rehab_cost_proof" onChange={this.fileSelectHandler} />
                                  <label className={"custom-file-label " + this.addErrorClass(this.state.property_rehab_cost_proof_error) } htmlFor="customFile">{this.state.property.rehab_cost_proof_link ? "Old Rehab Cost Proof or" : null } Choose file</label>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div className="col-md-12 text-center my-4">
                            <Link to="#" onClick={this.submitStepTwo} className="red-btn step-btn mx-1">Update</Link>
                          </div>
                          <Modal className="status_modal repairs_modal" show={this.state.estimated_cost_modal} onHide={this.hideModal}>
                            <Modal.Header closeButton>
                              <div className=" offset-md-1 col-md-10 text-center">
                                <h5 className="mb-0 text-uppercase">Itemized Repairs</h5>
                              </div>
                            </Modal.Header>
                            <div className="modal-body px-0">
                              <div className="row mx-0">
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Roof:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" value={this.state.property.estimated_rehab_cost_attr.roof} type="text" className="form-control" name="roof" onChangeEvent={this.updatePropertyRehabCostAttr} />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Foundation:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="foundation" value={this.state.property.estimated_rehab_cost_attr.foundation} className="form-control " onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Siding:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="siding" value={this.state.property.estimated_rehab_cost_attr.siding} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Windows:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="windows" value={this.state.property.estimated_rehab_cost_attr.windows}  className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Landscaping:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="landscaping" value={this.state.property.estimated_rehab_cost_attr.landscaping} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Garage:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name= "garage" value={this.state.property.estimated_rehab_cost_attr.garage} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Exterior Paint:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="exterior_paint" value={this.state.property.estimated_rehab_cost_attr.exterior_paint} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Interior Paint:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="interior_paint" value={this.state.property.estimated_rehab_cost_attr.interior_paint} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>HVAC:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="hvac" value={this.state.property.estimated_rehab_cost_attr.hvac} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Electrical:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="electrical" className="form-control" value={this.state.property.estimated_rehab_cost_attr.electrical} onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Plumbing:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="plumbing" className="form-control" value={this.state.property.estimated_rehab_cost_attr.plumbing} onChangeEvent={this.updatePropertyRehabCostAttr} />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Kitchen:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="kitchen" value={this.state.property.estimated_rehab_cost_attr.kitchen}  className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Bathrooms:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="bathrooms" value={this.state.property.estimated_rehab_cost_attr.bathrooms} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Doors:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="doors" value={this.state.property.estimated_rehab_cost_attr.doors} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Sheetrock:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name= "sheetrock" value={this.state.property.estimated_rehab_cost_attr.sheetrock} className="form-control " onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Trim:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="trim" value={this.state.property.estimated_rehab_cost_attr.trim} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Flooring:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="flooring" value={this.state.property.estimated_rehab_cost_attr.flooring} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Trash Removal:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="trash" value={this.state.property.estimated_rehab_cost_attr.trash} className="form-control " onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Miscellaneous:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="misc" value={this.state.property.estimated_rehab_cost_attr.misc} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Others:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <CurrencyInput prefix="$" allowNegative={true} type="text" name="others" className="form-control" value={this.state.property.estimated_rehab_cost_attr.others} onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 modal-banner px-5 py-3 my-2 ml-0">
                                  If you don't have itemized costs then enter ballpark of entire rehab.
                                </div>
                                <div className="col-md-12 px-4">
                                  <div className="form-group">
                                    <label>Estimated Ballpak</label>
                                    <CurrencyInput prefix="$" allowNegative={true} type="text" name="estimated_ballpark" value={this.state.property.estimated_rehab_cost_attr.estimated_ballpark} className="form-control" onChangeEvent={this.updatePropertyRehabCostAttr}/>
                                  </div>
                                </div>
                                <div className="col-md-12 px-4">
                                  <div className="form-group">
                                    <label>Repair Total</label>
                                    <CurrencyInput prefix="$" allowNegative={true} type="text" value={this.state.property.estimated_rehab_cost_attr.repair_total} readOnly={true} name="repair_total" className="form-control" />
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
