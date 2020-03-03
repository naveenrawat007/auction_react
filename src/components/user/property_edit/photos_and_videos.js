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
// import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTrash, faPlusCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';

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
        this.setState({
          message: result.message,
          variant: "success",
        })
        this.updateCurrentState(result.property);
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

  submitStepFour =() => {
    let formIsValid = true
    if (formIsValid){
      this.setState({
        isLoaded: false,
      });
      this.sendStepFourData()
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

  updateYoutubeVideoKey = () => {
    if (this.state.property.youtube_url !== undefined || this.state.property.youtube_url !== '') {
      let url = this.state.property.youtube_url
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
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


  videoSelectHandler = (event) => {
    this.setState({
      property:{
        ...this.state.property,
        video: event.target.files[0]
      }
    });
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
                        <div className="steps-parts" id="step4">
                          {this.state.isLoaded === true ?
                            null
                          :
                          <div className="spinner_main">
                            {/* <div className="spinner-grow" role="status">
                              <span className="sr-only">Loading...</span>
                            </div> */}
                            <div className="uploader">Uploading...</div>
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
                                                <div className="upload-img-row col-md-7 offset-md-5">
                                                  {this.state.property.images.map((file,i) =>
                                                    <div key={i} className="col-md-4 px-2 my-2">
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
                            <Link to="#" onClick={this.submitStepFour} className="red-btn step-btn mx-1">Update</Link>
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
