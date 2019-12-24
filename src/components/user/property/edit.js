import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiSelect from "@khanacademy/react-multi-select";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
// import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTrash, faPlusCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';

const initial_state = {
  isloaded: false,
  estimated_cost_modal: false,
  terms_agreed: false,
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
    rehab_cost_proof: null,
    rental_description: "",
    rental_proof: null,


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

}



export default class PropertyEdit extends Component{
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
    if (place.formatted_address && place.address_components){
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
        deal_analysis_type: property.deal_analysis_type ? property.deal_analysis_type : this.state.property.deal_analysis_type,
        after_rehab_value: property.after_rehab_value,
        asking_price: property.asking_price,
        estimated_rehab_cost: property.estimated_rehab_cost,
        estimated_rehab_cost_attr: property.estimated_rehab_cost_attr,
        arv_analysis: property.arv_analysis,
        description_of_repairs: property.description_of_repairs,
        rental_description: property.rental_description,
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
          this.checkForCategoryFields();
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

  submitStepOne = () => {
    let formIsValid = this.stepOneValidation();
    if (formIsValid){
      this.setState({
        isLoaded: false
      });
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
            this.updateStepOne()
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
            this.updateStepOne()
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
            this.updateStepOne()
          });
        }
      }
    }
  }
  updateStepOne = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties"
    const fd = new FormData();
    fd.append('property[id]', this.state.property.id)
    fd.append('property[address]', this.state.property.address)
    fd.append('property[city]', this.state.property.city)
    fd.append('property[state]', this.state.property.state)
    fd.append('property[zip_code]', this.state.property.zip_code)
    fd.append('property[category]', this.state.property.category)
    fd.append('property[p_type]', this.state.property.p_type)
    fd.append('property[headliner]', this.state.property.headliner)
    fd.append('property[description]', this.state.property.description)
    fd.append('property[mls_available]', this.state.property.mls_available)
    fd.append('property[flooded]', this.state.property.flooded)
    fd.append('property[flood_count]', this.state.property.flood_count)
    fd.append('property[owner_category]', this.state.property.owner_category)
    fd.append('property[title_status]', this.state.property.title_status)
    fd.append('property[additional_information]', this.state.property.additional_information)
    if ((this.state.property.category === "Residential")&&(this.state.property.residential_attributes)){
      fd.append('property[residential_attributes]', JSON.stringify(this.state.property.residential_attributes))
    }
    else if ((this.state.property.category === "Commercial")&&(this.state.property.commercial_attributes)) {
      fd.append('property[commercial_attributes]', JSON.stringify(this.state.property.commercial_attributes))
    }else if ((this.state.property.category === "Land")&&(this.state.property.land_attributes)) {
      fd.append('property[land_attributes]', JSON.stringify(this.state.property.land_attributes))
    }
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
        if (this._isMounted){
          this.updateCurrentState(result.property);
          this.goToStepTwo();
        }

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
    fd.append('property[id]', this.state.property.id)
    fd.append('property[youtube_url]', this.state.property.youtube_url)
    fd.append('property[youtube_video_key]', this.state.property.youtube_video_key)
    fd.append('property[vimeo_url]', this.state.property.vimeo_url)
    fd.append('property[dropbox_url]', this.state.property.dropbox_url)
    for (let i = 0 ; i < this.state.property.images.length ; i++) {
      fd.append('images[]', this.state.property.images[i].file, this.state.property.images[i].name)
    }
    if (this.state.property.video){
      fd.append("video", this.state.property.video, this.state.property.video.name)
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
        this.updateCurrentState(result.property);
        this.goToStepFive()
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        this.setState({isLoaded: true, message: result.message,
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
      fd.append('rental_proof', this.state.property.rental_proof, this.state.property.rental_proof)
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
        this.updateCurrentState(result.property);
        this.goToStepThree();
      }else if (result.status === 401) {
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

  submitStepFour =() => {
    let formIsValid = true
    if (formIsValid){
      this.setState({
        isLoaded: false,
      });
      this.sendStepFourData()
    }
  }

  goToStepTwo = () => {
    document.getElementById('step1').classList.add('d-none');
    document.getElementById('step2').classList.remove('d-none');
    window.scrollTo(0,0)
    document.getElementById('step2h').classList.remove('disabled')
    document.getElementById('step2h').classList.add('complete', "current")
  }

  backToStepOne = () => {
    document.getElementById('step1').classList.remove('d-none');
    document.getElementById('step2').classList.add('d-none');
    window.scrollTo(0,0)
    document.getElementById('step2h').classList.remove('complete', "current")
    document.getElementById('step2h').classList.add('disabled')
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
    if ((this.state.property.arv_proof === null) && (this.state.property.arv_analysis === "")){
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
      if ((this.state.property.rental_proof === null) &&(this.state.property.rental_description === "")){
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
    var files = this.state.property.images;
    let length = this.state.property.images.length
    for (var i = 0; i < uploaded_files.length; i++) {
      files.push({src: URL.createObjectURL(uploaded_files[i]), id: length+i,name: uploaded_files[i].name, file: uploaded_files[i]})
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
    document.getElementById('step3h').classList.remove('disabled')
    document.getElementById('step3h').classList.add('complete', "current")
  }

  updateTermsAgreed = (event) => {
    const{ name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  }

  backToStepTwo = () => {
    document.getElementById('step2').classList.remove('d-none');
    document.getElementById('step3').classList.add('d-none');
    window.scrollTo(0,0)
    document.getElementById('step3h').classList.remove('complete', "current")
    document.getElementById('step3h').classList.add('disabled')
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
    let property_auction_ending_at_error = "";
    let property_buy_option_error = "";
    let property_seller_pay_type_id_error = "";
    let property_show_instructions_type_id_error = "";
    let property_show_instructions_text_error = "";
    let property_best_offer_length_error = "";
    let property_best_offer_sellers_minimum_price_error = "";
    let property_best_offer_sellers_reserve_price = "";
    if (this.state.property.best_offer === "true"){
      if (this.state.property.best_offer_length === ""){
        property_best_offer_length_error = "can't be blank."
      }
      if (this.state.property.best_offer_sellers_minimum_price === ""){
        property_best_offer_sellers_minimum_price_error = "can't be blank."
      }
      if (this.state.property.best_offer_sellers_reserve_price === ""){
        property_best_offer_sellers_reserve_price = "can't be blank."
      }
    }

    if (this.state.property.auction_started_at === "" || this.state.property.auction_started_at === null){
      property_auction_started_at_error = "can't be blank."
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
      property_auction_ending_at_error,
      property_buy_option_error,
      property_show_instructions_type_id_error,
      property_show_instructions_text_error,
      property_best_offer_length_error,
      property_best_offer_sellers_reserve_price,
      property_best_offer_sellers_minimum_price_error,
      property_seller_pay_type_id_error,
    });

    if (property_auction_started_at_error !== "" || property_auction_length_error !== "" || property_seller_price_error !== "" || property_buy_now_price_error !== "" || property_auction_ending_at_error !== "" || property_buy_option_error !== "" || property_show_instructions_type_id_error !== "" || property_show_instructions_text_error !== "" || property_best_offer_length_error !== "" || property_best_offer_sellers_reserve_price !== "" || property_best_offer_sellers_minimum_price_error !== "" || property_seller_pay_type_id_error !== ""){
      return false
    }else {
      return true
    }

  }
  sendStepThreeData = () => {
    const fd = new FormData();
    fd.append('property[id]', this.state.property.id)
    fd.append('property[best_offer]', this.state.property.best_offer)
    fd.append('property[best_offer_length]', this.state.property.best_offer_length)
    fd.append('property[best_offer_sellers_minimum_price]', this.state.property.best_offer_sellers_minimum_price)
    fd.append('property[best_offer_sellers_reserve_price]', this.state.property.best_offer_sellers_reserve_price)
    fd.append('property[auction_started_at]', this.state.property.auction_started_at)
    fd.append('property[auction_length]', this.state.property.auction_length)
    fd.append('property[seller_price]', this.state.property.seller_price)
    fd.append('property[buy_now_price]', this.state.property.buy_now_price)
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
        this.updateCurrentState(result.property)
        this.goToStepFour();
      }else if (result.status === 401) {
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

  goToStepFour = () => {
    document.getElementById('step3').classList.add('d-none');
    document.getElementById('step4').classList.remove('d-none');
    window.scrollTo(0,0)
    document.getElementById('step4h').classList.remove('disabled')
    document.getElementById('step4h').classList.add('complete', "current")
  }
  backToStepThree = () => {
    document.getElementById('step3').classList.remove('d-none');
    document.getElementById('step4').classList.add('d-none');
    window.scrollTo(0,0)
    document.getElementById('step4h').classList.remove('complete', "current")
    document.getElementById('step4h').classList.add('disabled')
  }

  backToStepFour = () => {
    document.getElementById('step5').classList.add('d-none');
    document.getElementById('step4').classList.remove('d-none');
    window.scrollTo(0,0)
    document.getElementById('step5h').classList.remove('complete', "current")
    document.getElementById('step5h').classList.add('disabled')
  }
  goToStepFive = () => {
    document.getElementById('step4').classList.add('d-none');
    document.getElementById('step5').classList.remove('d-none');
    window.scrollTo(0,0)
    document.getElementById('step5h').classList.remove('disabled')
    document.getElementById('step5h').classList.add('complete', "current")
  }

  submitProperty = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties/submit"
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
			body: JSON.stringify({property: {id: this.state.property.id}}),
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        window.location.href = "/user/property/" + this.state.property.id
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
      }
      this.clearMessageTimeout = setTimeout(() => {
        if (this._isMounted){
          this.setState(() => ({message: ""}))
        }
      }, 2000);
		}, (error) => {
		});
  }

  saveDraftProperty = () => {
    window.location.href = "/user/property/" + this.state.property.id
  }

  updateYoutubeVideoKey = () => {
    if (this.state.property.youtube_url !== undefined || this.state.property.youtube_url !== '') {
      let url = this.state.property.youtube_url
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=|\?v=)([^#]*).*/;
      var match = url.match(regExp);
      if (match && match[2].trim().length === 11) {
        let key = match[2].trim()
        this.setState({
          property: {
            ...this.state.property,
            youtube_video_key: key
          }
        }, function () {
        });
      }
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
        this.updatePropertyAuctionEnding();
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
  videoSelectHandler = (event) => {
    this.setState({
      property:{
        ...this.state.property,
        video: event.target.files[0]
      }
    });
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
    let property_title_status_error=""
    let property_additional_information_error=""

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
    if (String(this.state.property.flooded) === "true"){
      if (this.state.property.flood_count === ""){
        property_flood_count_error = "Flood count cant be blank."
      }
    }
    if (this.state.property.description === ""){
      property_description_error = "Property description can't be blank."
    }
    if (this.state.property.title_status === ""){
      property_title_status_error = " can't be blank."
    }
    if (this.state.property.additional_information === ""){
      property_additional_information_error = " can't be blank."
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
      property_title_status_error,
      property_additional_information_error,
    },function () {
      if (property_address_error !== "" || property_city_error !== "" || property_state_error !== "" || property_zip_code_error !== "" || property_category_error !== "" || property_type_error !== "" || property_bedrooms_error !== "" || property_bathrooms_error !== "" || property_garage_error !== "" || property_area_error !== "" || property_lot_size_error !== "" || property_year_built_error !== "" || property_units_error !== "" || property_stories_error !== "" || property_cap_rate_error !== "" || property_price_per_sq_ft_error !== ""|| property_headliner_error !== "" || property_mls_available_error !== "" || property_flooded_error !== "" || property_flood_count_error !== "" || property_description_error !== "" || property_title_status_error !== "" || property_additional_information_error !== "" ){
        return false;
      }else {
        return true;
      }
    })
    if (property_address_error !== "" || property_city_error !== "" || property_state_error !== "" || property_zip_code_error !== "" || property_category_error !== "" || property_type_error !== "" || property_bedrooms_error !== "" || property_bathrooms_error !== "" || property_garage_error !== "" || property_area_error !== "" || property_lot_size_error !== "" || property_year_built_error !== "" || property_units_error !== "" || property_stories_error !== "" || property_cap_rate_error !== "" || property_price_per_sq_ft_error !== ""|| property_headliner_error !== "" || property_mls_available_error !== "" || property_flooded_error !== "" || property_flood_count_error !== "" || property_description_error !== "" || property_title_status_error !== "" || property_additional_information_error !== "" ){
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
    }, function () {
      if (this.state.property.deal_analysis_type === "Landlord Deal"){
        this.updateLandlordDealCalculator();
      }else {
        this.updateProfitPotentialCalculator();
      }
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
    if (String(this.state.property.flooded) === "true"){
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
      return "";
    }else {
      return "d-none ";
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
        files.push({src: data[i].src, id: files.length,name: data[i].name, file: data[i].file})
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

  addErrorClass = (msg) => {
    if (msg === ""){
      return ""
    }else {
      return "error-class"
    }
  }
  checkFlooded = () => {
    if (String(this.state.property.flooded) === "true"){
      return ""
    }else {
      return "d-none"
    }
  }
  checkTitleWarning = () => {
    if (this.state.property.title_status === "Title not verified or open"){
      return "";
    }else {
      return "d-none"
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
    const best_offer_lengths = this.state.property_options.best_offer_lengths.map((value, index) => {
      return(
        <option key={index} value={value} >{value} days</option>
      )
    })
    const open_house_dates = this.state.property.open_house_dates.map((value, index) => {
      return (
        <div key ={index} className="row mx-0">

          <div className="col-md-4 pl-0 pr-1">
            <DatePicker className="form-control mb-1" selected={value["date"] ? new Date(value["date"]) : new Date()} onChange={this.updatePropertyOpenHouseDates.bind(this, index)}/>

          </div>
          <div className="col-md-4 pl-0 pr-1">
            <DatePicker className="form-control mb-1" selected={value["opens"] ? new Date(value["opens"]) : new Date()} onChange={this.updatePropertyOpenHouseDatesOpenTime.bind(this, index)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa"/>
          </div>
          <div className="col-md-4 px-0">
            <DatePicker className="form-control mb-1" selected={value["closes"] ? new Date(value["closes"]) : new Date()} onChange={this.updatePropertyOpenHouseDatesCloseTime.bind(this, index)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa"/>
          </div>
        </div>
      );
    })
    const owner_categories = this.state.property_options.owner_categories.map((value, index) => {
      return(
        <option key={index} value={value} >{this.ownerCategoryText(value)}</option>
      )
    })
    const title_statuses = this.state.property_options.title_statuses.map((value, index) => {
      return(
        <option key={index} value={value} >{value}</option>
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
                      <div className="container creation-steps px-0">
                        <div className="row bs-wizard new-bs-wizard mb-4 mx-0" style={{borderBottom:"0"}}>
                          <div className="col bs-wizard-step  complete current" id="step1h">
                            <div className="text-center bs-wizard-number">1</div>
                            <div className="text-center bs-wizard-stepnum">PROPERTY DETAILS</div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link className="bs-wizard-dot" to="#"></Link>
                          </div>
                          <div className="col bs-wizard-step  disabled " id="step2h">
                            <div className="text-center bs-wizard-number">2</div>
                            <div className="text-center bs-wizard-stepnum">DEAL ANALYSIS</div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link className="bs-wizard-dot" to="#"></Link>
                          </div>
                          <div className="col bs-wizard-step  disabled " id="step3h">
                            <div className="text-center bs-wizard-number">3</div>
                            <div className="text-center bs-wizard-stepnum">ONLINE BIDDING</div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link className="bs-wizard-dot" to="#"></Link>
                          </div>
                          <div className="col bs-wizard-step  disabled " id="step4h">
                            <div className="text-center bs-wizard-number">4</div>
                            <div className="text-center bs-wizard-stepnum">PHOTOS AND VIDEOS</div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link to="#" className="bs-wizard-dot"></Link>
                          </div>
                          <div className="col bs-wizard-step disabled " id="step5h">
                            <div className="text-center bs-wizard-number">5</div>
                            <div className="text-center bs-wizard-stepnum">AUCTION AGREEMENT</div>
                            <div className="progress">
                              <div className="progress-bar"></div>
                            </div>
                            <Link to="#" className="bs-wizard-dot"></Link>
                          </div>
                        </div>
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
                        <div className="steps-parts d-none" id="step2">
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
                                  <input type="number" name="after_rehab_value" className={"form-control " + this.addErrorClass(this.state.property_after_rehab_value_error) } onChange={this.updateProperty} value={this.state.property.after_rehab_value}/>
                                </div>
                              </div>
                              <div className="form-group col-md-10 offset-md-1 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Sellers Asking Price <span className="font-sign">(-)</span></label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <input type="number" className={"form-control " + this.addErrorClass(this.state.property_asking_price_error) } id="temp_id" name="asking_price" value={this.state.property.asking_price} onChange={this.updateProperty} />
                                </div>
                              </div>
                              <div className="form-group col-md-10 offset-md-1 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Estimated Rehab Cost <span className="font-sign">(-)</span></label>
                                </div>
                                <div className="col-md-6 px-1">
                                  <input type="number" readOnly={true} className={"form-control estimated-cost " + this.addErrorClass(this.state.property_estimated_rehab_cost_error) } name="estimated_rehab_cost" value={this.state.property.estimated_rehab_cost} onClick={() => {this.setState({
                                    estimated_cost_modal: true
                                  });}}/>
                                </div>
                              </div>
                              <div className="form-group col-md-10 offset-md-1 px-0 row step_row">
                                <div className="col-md-6 px-1 text-right">
                                  <label>Estimated Profit Potential <span className="font-sign">(=)</span></label>
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
                                      <label className="text-uppercase">EST AFTER REHAB VALUE:&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" className={"form-control " + this.addErrorClass(this.state.property_after_rehab_value_error) } value={this.state.property.after_rehab_value} name="after_rehab_value" onChange={this.updateProperty} />
                                    </div>
                                    <div className="col-md-12 px-0">
                                      <h6 className="text-uppercase font-red font-600">Acquisition Cost</h6>
                                      <ul className="est_box">
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Asking/Purchase Price:&nbsp;
                                              <OverlayTrigger trigger="click" placement="right"
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
                                            <input type="number" className={"form-control " + this.addErrorClass(this.state.property_asking_price_error) } value={this.state.property.asking_price} name="asking_price" onChange={this.updateProperty}/>
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Rehab Cost:&nbsp;
                                              <OverlayTrigger trigger="click" placement="right"
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
                                            <input type="number" readOnly={true} className={"form-control estimated-cost " + this.addErrorClass(this.state.property_asking_price_error) }  name="estimated_rehab_cost" value={this.state.property.estimated_rehab_cost} onClick={() => {this.setState({
                                              estimated_cost_modal: true
                                            });}}/>
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Closing Cost:&nbsp;
                                              <OverlayTrigger trigger="click" placement="right"
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
                                            <input type="number" className={"form-control " + this.addErrorClass(this.state.property_closing_cost_error) } name="closing_cost" value={this.state.property.closing_cost} onChange={this.updateProperty}/>
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Annual Insurance:&nbsp;
                                              <OverlayTrigger trigger="click" placement="right"
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
                                            <input type="number" onChange={this.updateProperty} className={"form-control " + this.addErrorClass(this.state.property_insurance_annually_error) } name="insurance_annually" value={this.state.property.insurance_annually} />
                                          </div>
                                        </li>
                                        <li className="my-2">
                                          <div className="est_list">
                                            <label className="labels_main">Est Hard Money or STF Cost:&nbsp;
                                              <OverlayTrigger trigger="click" placement="right"
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
                                            <input type="number" className={"form-control " + this.addErrorClass(this.state.property_short_term_financing_cost_error) } value={this.state.property.short_term_financing_cost} name="short_term_financing_cost" onChange={this.updateProperty}/>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-md-6 px-0">
                                      <label className="label-bold">Total Acquisition Costs:&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" value={this.state.property.total_acquisition_cost} readOnly={true} className="form-control" name="total_acquisition_cost"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 my-3 px-0">
                                  <h5 className="text-uppercase font-red step_heads step_fonts">Financing Analysis After rehab</h5>
                                  <div className="row mx-0 step_row">
                                    <div className="col-md-6 my-2 row mx-0">
                                      <input type="number" className={"form-control col-md-4 " + this.addErrorClass(this.state.property_amount_financed_percentage_error) } name="amount_financed_percentage" onChange={this.updateProperty} value={this.state.property.amount_financed_percentage} />
                                      <input type="number" readOnly={true} value={this.state.property.amount_financed} className="form-control col-md-7 offset-md-1" name="amount_financed" />
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="text-uppercase">amount financed&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                    <div className="col-md-6 my-2">
                                      <input type="number" className={"form-control " + this.addErrorClass(this.state.property_interest_rate_error) } name="interest_rate" value={this.state.property.interest_rate} onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Interest Rate APR&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" value={this.state.property.loan_terms} className={"form-control " + this.addErrorClass(this.state.property_loan_terms_error) } name="loan_terms" onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Loan Term&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} value={this.state.property.principal_interest} className="form-control" name="principal_interest" />
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Monthly Principal &amp; Interest&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} value={this.state.property.annual_debt} className="form-control" name="annual_debt"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">Annual Debt Service&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" className={"form-control " + this.addErrorClass(this.state.property_taxes_annually_error) } name="taxes_annually" onChange={this.updateProperty} value={this.state.property.taxes_annually}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Insurance&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
                                          overlay={
                                            <Popover>
                                              <Popover.Content>
                                                <p className="mb-0">(auto-populated from above)</p>
                                              </Popover.Content>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
                                        </OverlayTrigger>
                                      </label>
                                    </div>
                                    <div className="col-md-6 my-2 pl-0">
                                      <input type="number" onChange={this.updateProperty} className={"form-control " + this.addErrorClass(this.state.property_insurance_annually_error) } name="insurance_annually" value={this.state.property.insurance_annually} />
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Management Fees:&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" className={"form-control " + this.addErrorClass(this.state.property_est_annual_management_fees_error) } name="est_annual_management_fees" onChange={this.updateProperty} value={this.state.property.est_annual_management_fees}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Maintentance:&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" value={this.state.property.est_annual_operating_fees_others} className={"form-control " + this.addErrorClass(this.state.property_est_annual_operating_fees_others_error) } name="est_annual_operating_fees_others" onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Annual Operating Costs:&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" className="form-control" readOnly={true} value={this.state.property.est_annual_operating_fees} name="est_annual_operating_fees" onChange={this.updateProperty} />
                                    </div>
                                  </div>
                                  <div className="col-md-12 mt-4 px-0">
                                    <h6 className="text-uppercase font-red font-600">Income or Cash Flow Analysis</h6>
                                  </div>
                                  <div className="row mx-0 step_row">
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Total EST Monthly Rent:&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" className={"form-control " + this.addErrorClass(this.state.property_monthly_rent_error) } name="monthly_rent" onChange={this.updateProperty} value={this.state.property.monthly_rent}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Total Gross Yearly Income:&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} value={this.state.property.total_gross_yearly_income} className="form-control" name="total_gross_yearly_income"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Est Vacancy Rate:&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" className={"form-control " + this.addErrorClass(this.state.property_vacancy_rate_error) } name="vacancy_rate" value={this.state.property.vacancy_rate} onChange={this.updateProperty}/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main label-bold">ADJ Gross Yearly Income:&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} value={this.state.property.adjusted_gross_yearly_income} className="form-control" name="adjusted_gross_yearly_income"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 my-3 px-0">
                                  <h5 className="text-uppercase font-red step_heads step_fonts">Cash Flow Analysis&nbsp;
                                    <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} value={this.state.property.adjusted_gross_yearly_income} className="form-control" name="adjusted_gross_yearly_income"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">(+)Adjusted Gross Yearly Income
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" className="form-control " readOnly={true} value={this.state.property.est_annual_operating_fees} name="est_annual_operating_fees" onChange={this.updateProperty} />
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">(-) Est Annual Operating Costs&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} value={this.state.property.net_operating_income} className="form-control" name="net_operating_income" />
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main label-bold">(=) Net Operating Income (NOI)&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} value={this.state.property.annual_debt} className="form-control" name="annual_debt"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main">(-) Annual Debt Service&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} value={this.state.property.annual_cash_flow} className="form-control" name="annual_cash_flow"/>
                                    </div>
                                    <div className="col-md-6 px-0 my-2">
                                      <label className="labels_main label-bold">(=) Annual Cash Flow&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} value={this.state.property.monthly_cash_flow} className="form-control" name="monthly_cash_flow"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Monthly Cash Flow&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                      <input type="number" readOnly={true} className="form-control" value={this.state.property.total_out_of_pocket} name="total_out_of_pocket"/>
                                    </div>
                                    <div className="col-md-6 my-2 px-0">
                                      <label className="labels_main">Total Out of Pocket&nbsp;
                                        <OverlayTrigger trigger="click" placement="right"
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
                                        <OverlayTrigger trigger="click" placement="right"
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
                                <td>$ {this.state.property.appreciation_value.eg1}</td>
                                <td>$ {this.state.property.appreciation_value.t1}</td>
                                <td>$ {this.state.property.appreciation_value.cf1}</td>
                                <td>$ {this.state.property.appreciation_value.ta}</td>
                                <td>$ {this.state.property.appreciation_value.vac1}</td>
                                <td>$ {this.state.property.appreciation_value.ppy1}</td>
                              </tr>
                              <tr>
                                <td>2.00%</td>
                                <td>$ {this.state.property.appreciation_value.eg2}</td>
                                <td>$ {this.state.property.appreciation_value.t2}</td>
                                <td>$ {this.state.property.appreciation_value.cf2}</td>
                                <td>$ {this.state.property.appreciation_value.tb}</td>
                                <td>$ {this.state.property.appreciation_value.vac2}</td>
                                <td>$ {this.state.property.appreciation_value.ppy2}</td>
                              </tr>
                              <tr>
                                <td>3.00%</td>
                                <td>$ {this.state.property.appreciation_value.eg3}</td>
                                <td>$ {this.state.property.appreciation_value.t3}</td>
                                <td>$ {this.state.property.appreciation_value.cf3}</td>
                                <td>$ {this.state.property.appreciation_value.tc}</td>
                                <td>$ {this.state.property.appreciation_value.vac3}</td>
                                <td>$ {this.state.property.appreciation_value.ppy3}</td>
                              </tr>
                              <tr>
                                <td>4.00%</td>
                                <td>$ {this.state.property.appreciation_value.eg4}</td>
                                <td>$ {this.state.property.appreciation_value.t4}</td>
                                <td>$ {this.state.property.appreciation_value.cf4}</td>
                                <td>$ {this.state.property.appreciation_value.td}</td>
                                <td>$ {this.state.property.appreciation_value.vac4}</td>
                                <td>$ {this.state.property.appreciation_value.ppy4}</td>
                              </tr>
                            </tbody>
                          </table>
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
                                  <label className={"custom-file-label " + this.addErrorClass(this.state.property_rental_proof_error) } htmlFor="customFile">Choose file</label>
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
                                  <label className={"custom-file-label " + this.addErrorClass(this.state.property_arv_proof_error) } htmlFor="customFile">Choose file</label>
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
                                  <label className={"custom-file-label " + this.addErrorClass(this.state.property_rehab_cost_proof_error) } htmlFor="customFile">Choose file</label>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div className="col-md-12 text-center my-4">
                            <Link to="#" onClick={this.backToStepOne} className="red-btn step-btn mx-1">Go, Back</Link>
                            <Link to="#" onClick={this.submitStepTwo} className="red-btn step-btn mx-1">Continue</Link>
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
                                      <input value={this.state.property.estimated_rehab_cost_attr.roof} type="number" className="form-control" name="roof" onChange={this.updatePropertyRehabCostAttr} />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Foundation:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="foundation" value={this.state.property.estimated_rehab_cost_attr.foundation} className="form-control " onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Siding:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="siding" value={this.state.property.estimated_rehab_cost_attr.siding} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Windows:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="windows" value={this.state.property.estimated_rehab_cost_attr.windows}  className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Landscaping:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="landscaping" value={this.state.property.estimated_rehab_cost_attr.landscaping} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Garage:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name= "garage" value={this.state.property.estimated_rehab_cost_attr.garage} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Exterior Paint:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="exterior_paint" value={this.state.property.estimated_rehab_cost_attr.exterior_paint} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Interior Paint:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="interior_paint" value={this.state.property.estimated_rehab_cost_attr.interior_paint} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>HVAC:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="hvac" value={this.state.property.estimated_rehab_cost_attr.hvac} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Electrical:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="electrical" className="form-control" value={this.state.property.estimated_rehab_cost_attr.electrical} onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Plumbing:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="plumbing" className="form-control" value={this.state.property.estimated_rehab_cost_attr.plumbing} onChange={this.updatePropertyRehabCostAttr} />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Kitchen:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="kitchen" value={this.state.property.estimated_rehab_cost_attr.kitchen}  className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Bathrooms:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="name" name="bathrooms" value={this.state.property.estimated_rehab_cost_attr.bathrooms} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Doors:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="doors" value={this.state.property.estimated_rehab_cost_attr.doors} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Sheetrock:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name= "sheetrock" value={this.state.property.estimated_rehab_cost_attr.sheetrock} className="form-control " onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Trim:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="trim" value={this.state.property.estimated_rehab_cost_attr.trim} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Flooring:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="flooring" value={this.state.property.estimated_rehab_cost_attr.flooring} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Trash Removal:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="trash" value={this.state.property.estimated_rehab_cost_attr.trash} className="form-control " onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Miscellaneous:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="misc" value={this.state.property.estimated_rehab_cost_attr.misc} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 ">
                                  <div className="form-group row">
                                    <div className="col-md-5 px-4">
                                      <label>Others:</label>
                                    </div>
                                    <div className="col-md-7 px-4">
                                      <input type="number" name="others" className="form-control" value={this.state.property.estimated_rehab_cost_attr.others} onChange={this.updatePropertyRehabCostAttr}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 modal-banner px-5 py-3 my-2 ml-0">
                                  If you don't have itemized costs then enter ballpark of entire rehab.
                                </div>
                                <div className="col-md-12 px-4">
                                  <div className="form-group">
                                    <label>Estimated Ballpak</label>
                                    <input type="number" name="estimated_ballpark" value={this.state.property.estimated_rehab_cost_attr.estimated_ballpark} className="form-control" onChange={this.updatePropertyRehabCostAttr}/>
                                  </div>
                                </div>
                                <div className="col-md-12 px-4">
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
                        <div className="steps-parts d-none" id="step3">
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
                                <select className="form-control" onChange={this.updateProperty} value={String(this.state.property.best_offer)} name="best_offer" >
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
                                  <DatePicker className={"form-control " + this.addErrorClass(this.state.property_auction_started_at_error) }
                                    selected={this.state.property.auction_started_at ? new Date(this.state.property.auction_started_at) : ""} minDate={new Date()}
                                    name="auction_started_at" onChange={this.updatePropertyAuctionStart}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Best Offer Time Frame&nbsp;
                                  <OverlayTrigger trigger="click" placement="right"
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
                                <select className={"form-control " + this.addErrorClass(this.state.property_best_offer_length_error) } value={this.state.property.best_offer_length ? this.state.property.best_offer_length : ""} name="best_offer_length" onChange={this.updateProperty}>
                                  <option>Please select</option>
                                  {best_offer_lengths}
                                </select>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Asking Price&nbsp;
                                  <OverlayTrigger trigger="click" placement="right"
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
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_best_offer_sellers_minimum_price_error) } name="best_offer_sellers_minimum_price" value={this.state.property.best_offer_sellers_minimum_price ? this.state.property.best_offer_sellers_minimum_price : ""} onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className={"form-group col-md-8 offset-md-2 px-0 row step_row " + this.checkBestOffer()}>
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Buy Now Price&nbsp;
                                  <OverlayTrigger trigger="click" placement="right"
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
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_best_offer_sellers_reserve_price) } name="best_offer_sellers_reserve_price" value={this.state.property.best_offer_sellers_reserve_price ? this.state.property.best_offer_sellers_reserve_price : ""} onChange={this.updateProperty}/>
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
                                  <DatePicker className={"form-control " + this.addErrorClass(this.state.property_auction_started_at_error) }
                                    selected={this.state.property.auction_started_at ? new Date(this.state.property.auction_started_at) : ""} minDate={new Date()}
                                    name="auction_started_at" onChange={this.updatePropertyAuctionStart}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Online Bidding/Auction Time Frame&nbsp;
                                  <OverlayTrigger trigger="click" placement="right"
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
                                <select className={"form-control " + this.addErrorClass(this.state.property_auction_length_error) } value={this.state.property.auction_length} name="auction_length" onChange={this.updateProperty}>
                                  <option>Please select</option>
                                  {auction_lengths}
                                </select>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Asking Price&nbsp;
                                  <OverlayTrigger trigger="click" placement="right"
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
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_seller_price_error) } name="seller_price"  value={this.state.property.seller_price} onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Sellers Buy Now Price&nbsp;
                                  <OverlayTrigger trigger="click" placement="right"
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
                                <input type="number" className={"form-control " + this.addErrorClass(this.state.property_buy_now_price_error) } name="buy_now_price" onChange={this.updateProperty} value={this.state.property.buy_now_price}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row mt-4">
                              <div className="col-md-6 px-1 text-right">
                                <label>Ideal Closing Date&nbsp;
                                  <OverlayTrigger trigger="click" placement="right"
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
                                  <OverlayTrigger trigger="click" placement="right"
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
                                  <OverlayTrigger trigger="click" placement="right"
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
                              <div className="offset-md-6 col-md-6 px-2 row">
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
                            <Link to="#" onClick={this.backToStepTwo} className="red-btn step-btn mx-1">Go, Back</Link>
                            <Link to="#" onClick={this.submitStepThree} className="red-btn step-btn mx-1">Continue</Link>
                          </div>
                        </div>
                        <div className="steps-parts d-none" id="step4">
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
                            <h4 className="step-name">Property Photos and Videos</h4>
                          </div>
                          <form className="row mx-0 creation-forms">
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Upload Photos</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <div className="custom-file files_box">
                                  <input type="file" className="custom-file-input" name="images" onChange={this.imageSelectHandler} multiple={true} accept="image/*"/>
                                  <label className="custom-file-label" htmlFor="customFile">Drag & Drop Images Here</label>
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
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Youtube Link</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="youtube_url" onChange={this.updateProperty} value={this.state.property.youtube_url}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Vimeo Link</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="vimeo_url" onChange={this.updateProperty} value={this.state.property.vimeo_url}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row">
                              <div className="col-md-6 px-1 text-right">
                                <label>Dropbox Link</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className="form-control" name="dropbox_url" onChange={this.updateProperty} value={this.state.property.dropbox_url}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row align-items-start">
                              <div className="col-md-6 px-1 text-right">
                                <label>Upload Videos</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <div className="custom-file files_box">
                                  <input type="file" id= "user_profile_image_input" className="custom-file-input" name="video" onChange={this.videoSelectHandler} accept="video/*"/>
                                  <label className="custom-file-label" htmlFor="customFile">Drag & Drop Video Here</label>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div className="col-md-12 text-center my-4">
                            <Link to="#" onClick={this.backToStepThree} className="red-btn step-btn mx-1">Go, Back</Link>
                            <Link to="#" onClick={this.submitStepFour} className="red-btn step-btn mx-1">Continue</Link>
                          </div>
                        </div>
                        <div className="steps-parts d-none" id="step5">
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
                            <h4 className="step-name">Auction Participation Agreement required to post a property</h4>
                          </div>
                          <form className="row mx-0 creation-forms">
                            <div className="col-md-12">
                              <div className="terms_agree">
                                <p>In Order to post a property, you must check the appropriate box and upload proof you have a right to auction property.
                                </p>
                                <p>Then you must agree to the rest of the terms by checking the box before you can proceed to post a property</p>
                                <h6>
                                  Approve Terms & Conditions to Sell Property
                                </h6>
                                <ol>
                                  <li>
                                    <p>
                                      You can only post a property if you own the property, have an option to buy property with right
                                      to assign or are a Real estate agent who’s submitting a listing to auction.
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      My property can be bought at 65% to 85% ARV (after rehab value) – repairs or has good
                                      monthly cash flow and/or 20% or higher ROI. <span className="font-red">(i) Check if your property is a good deal for a landlord below</span>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      I understand that Bidders can bid below what I’m asking, so at the end of the bidding period I
                                      can see if there’s any offers I’m willing to accept or negotiate with to get my deal SOLD.
                                    </p>

                                  </li>
                                  <li>
                                    <p>
                                      I agree to accept the Highest and Best bid that is at or above my Asking Price when Auction ends or I can be banned from using this site.
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      I agree to use this marketing platform to get my Highest and Best price by advertising my
                                      property link in all email blasts, Facebook posts and all other marketing I do to advertise my deal to as many investors as possible.
                                    </p>

                                  </li>
                                  <li>
                                    <p>
                                      I agree to allow AuctionMyDeal.com to advertise my deal to their database of investors and
                                      social media sites to give my property more visibility.
                                    </p>

                                  </li>
                                  <li>
                                    <p>
                                      I agree to the best of my knowledge that there are no liens against this property that would
                                      prevent property from selling at my Asking Price, minus closing costs and prorated
                                      property Taxes and HOA fees up to the day of closing.
                                    </p>

                                  </li>
                                  <li>
                                    <p>
                                      I have title open at an investor friendly title company, and the title is clear or working to get it cleared. <span className="font-red">(i) If you’re not committed to an investor friendly Title Company then we suggest Texas Title at 5300 Memorial Dr #460, Houston, Tx 77007 or Patton Title at 2500 W Loop South #500,
                                        Houston, Tx 77027.
                                      </span>
                                    </p>

                                  </li>
                                  <li className="font-red">
                                    <p className="font-red">
                                      I recognize that AuctionMyDeal.com is a free site for me to use to get my properties sold for the Highest and Best Price and I promise to direct all buyers to make their offer on this site that will cost the Winning Bidder $197 paid as an internet transaction fee to AuctionMyDeal.com.
                                    </p>
                                  </li>
                                </ol>
                              </div>
                            </div>
                            <div className="col-md-12 text-center">
                              <div className="form-check">
                                <input type="checkbox" name="terms_agreed" className="form-check-input" id="exampleCheck1" onChange={this.updateTermsAgreed}/>
                                <label className="form-check-label" htmlFor="exampleCheck1">I agree to the website <Link to="#" className="font-blue">terms and coditions</Link></label>
                              </div>
                            </div>
                          </form>
                          <div className="col-md-12 text-center my-4">
                            <Link to="#" onClick={this.backToStepFour} className="red-btn step-btn mx-1">Go, Back</Link>
                            <Link to="#" className="red-btn step-btn mx-1" onClick={this.saveDraftProperty}>Save As Draft</Link>
                            {
                              this.state.terms_agreed === true ?
                                <Link to="#" onClick={this.submitProperty} className="red-btn step-btn mx-1 ">Submit</Link>
                              :
                              <Link to="#" className="red-btn step-btn mx-1 btn-disabled">Submit</Link>
                            }
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
