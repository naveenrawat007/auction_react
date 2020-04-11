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
import Alert from 'react-bootstrap/Alert';

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



export default class PropertyDetails extends Component{
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
    if (google){
      const input = document.getElementById("autocomplete-address");
      this.autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["geocode"],
        componentRestrictions: { country: "us" }
      });
      this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    }
    window.scrollTo(0,0)
  }

  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    if (place.formatted_address && place.address_components){
      let address = "";
      let city = "";
      let state = "";
      let postal_code = "";
      let lat = "";
      let long = "";
      lat = place.geometry.location.lat();
      long = place.geometry.location.lng();
      address = place.formatted_address
      for (let i = 0; i < place.address_components.length; i++) {
        for (let k = 0; k < place.address_components[i].types.length; k++) {
          switch (place.address_components[i].types[k]) {
            // case "street_number":
            //   address = address + place.address_components[i].long_name;
            //   break;
            // case "route":
            //   console.log(address);
            //   address = address
            //   break;
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
            zip_code: postal_code,
            lat: lat,
            long: long,
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
    fd.append('property[lat]', this.state.property.lat)
    fd.append('property[long]', this.state.property.long)
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
          this.setState({
            message: result.message,
            variant: "success",
          })
          // this.updateCurrentState(result.property);
        }
        this.showProperty();

      }
      else if (result.status === 400) {
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

  showProperty = () => {
    window.open("/property/"+ this.state.property.unique_address, '_self')
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

	render() {
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
                                <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_bedrooms_error) } name="bedrooms" value={this.state.property.bedrooms} onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="bathrooms-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Bathrooms</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_bathrooms_error) } name="bathrooms" value={this.state.property.bathrooms} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="garage-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Garage</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_garage_error) } name="garage" value={this.state.property.garage} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="units-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Units</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_units_error) } name="units" value={this.state.property.units} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="stories-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Stories</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_stories_error) } name="stories" value={this.state.property.stories} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="cap_rate-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Cap Rate</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_cap_rate_error) } name="cap_rate" value={this.state.property.cap_rate} onChange={this.updateProperty} />
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="area-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Square Footage</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_area_error) } name="area" value={this.state.property.area} onChange={this.updateProperty}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="lot-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Lot</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_lot_size_error) } name="lot_size" onChange={this.updateProperty} value={this.state.property.lot_size} onKeyPress={this.checkDecimalNumeric}/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="year-built-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Year Built</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="text" className={"form-control " + this.addErrorClass(this.state.property_year_built_error) } name="year_built" onChange={this.updateProperty} value={this.state.property.year_built} onKeyPress={this.checkNumericInt} maxLength="4"/>
                              </div>
                            </div>
                            <div className="form-group col-md-8 offset-md-2 px-0 row step_row" id="price_per_sq_ft-input">
                              <div className="col-md-6 px-1 text-right">
                                <label>Price Per SqFt</label>
                              </div>
                              <div className="col-md-6 px-1">
                                <input type="number" onKeyPress={this.checkNumeric} className={"form-control " + this.addErrorClass(this.state.property_price_per_sq_ft_error) } name="price_per_sq_ft" onChange={this.updateProperty} value={this.state.property.price_per_sq_ft} />
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
                            <Link to="#" className="red-btn step-btn mx-1" onClick={this.submitStepOne}>Update</Link>
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
