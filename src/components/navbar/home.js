import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {renderToStaticMarkup} from 'react-dom/server';
import {
  faSearch,
  faGavel,
  faHandPointRight,
  faUser,
  faEnvelope,
  faMobileAlt,
  faLock,
  faArrowRight,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Carousel from 'react-bootstrap/Carousel'
window.fn = OwlCarousel;

const initial_state = {
  error: "",
  message: "",
  created: false,
  verified: false,
  sign_up_modal: false,
  video_modal: false,
  properties: [],
  user: {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    verification_code: ""
  },
  user_first_name_error: "",
  user_last_name_error: "",
  user_phone_number_error: "",
  user_email_error: "",
  user_password_error: "",
  user_confirm_password_error: "",
  user_verification_error: ""
};
export default class Home extends Component {
  _isMounted = false;
  _arrowSet = false;

  constructor(props) {
    super(props);
    this.state = initial_state;
  }
  componentDidMount() {
    this._isMounted = true;
    this.getPropertiesList();
  }

  openSignUpModal = () => {
    this.setState({
      sign_up_modal: true
    });
  };
  hideSignUpModal = () => {
    this.setState({
      sign_up_modal: false,
      video_modal: false,
    });
  };
  openVideoModal = () => {
    this.setState({
      video_modal: true
    })
  }
  updateUser = event => {
    const { name, value } = event.target;
    this.setState(
      {
        user: {
          ...this.state.user,
          [name]: value
        }
      },
      function() {
        this.customCheckFormValidation(name);
      }
    );
  };
  checkNumeric = e => {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!regex.test(str)) {
      e.preventDefault();
      return false;
    }
  };

  resendVerificationCode = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/resend_code";
    fetch(url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auction_user_temp_token"),
        Accept: "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Max-Age": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.status === 208) {
            if (this._isMounted) {
              this.setState({
                message: result.message,
                variant: "success"
              });
            }
          }
        },
        error => {}
      );
  };

  submitVerificationHandler = () => {
    if (this._isMounted) {
      let formIsValid = this.checkVerificationFormValidation();
      if (formIsValid) {
        this.submitVerificationForm();
      }
    }
  };
  submitVerificationForm = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/verify";
    fetch(url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auction_user_temp_token"),
        Accept: "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Max-Age": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
        verification_code: this.state.user.verification_code
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.status === 201) {
            localStorage.setItem("auction_user_token", result.user.token);
            localStorage.removeItem("auction_user_name");
            if (this._isMounted) {
              this.setState({ verified: result.user.is_verified });
            }
            window.location.href = "/plans";
          } else {
            if (this._isMounted) {
              this.setState({ message: result.message, variant: "danger" });
            }
          }
          if (this._isMounted) {
            this.clearMessageTimeout = setTimeout(() => {
              this.setState(() => ({ message: "" }));
            }, 2000);
          }
        },
        error => {
          if (this._isMounted) {
            this.setState({ message: "server error" });
          }
        }
      );
  };

  checkVerificationFormValidation = () => {
    let user_verification_error = "";
    if (this.state.user.verification_code === "") {
      user_verification_error = "Code can't be blank!";
    } else if (this.state.user.verification_code.length < 6) {
      user_verification_error = "Too short!";
    }
    this.setState(
      {
        user_verification_error
      },
      function() {
        if (user_verification_error !== "") {
          return false;
        } else {
          return true;
        }
      }
    );
    if (user_verification_error !== "") {
      this.setState({
        user_verification_error
      });
      return false;
    } else {
      return true;
    }
  };

  submitForm = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Max-Age": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({ user: this.state.user })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.status === 201) {
            this.setState({ message: "" });
            localStorage.setItem("auction_user_temp_token", result.user.token);
            this.setState({
              created: true
            });
          } else {
            this.setState({ message: result.message, variant: "danger" });
          }
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({ message: "" }));
          }, 2000);
        },
        error => {
          this.props.history.push("/sign_up");
        }
      );
  };

  checkFormValidation = () => {
    let user_first_name_error = "";
    let user_last_name_error = "";
    let user_phone_number_error = "";
    let user_email_error = "";
    let user_password_error = "";
    let user_confirm_password_error = "";
    if (this.state.user.first_name === "") {
      user_first_name_error = "First name can't be blank!";
    }
    if (this.state.user.last_name === "") {
      user_last_name_error = "Last name can't be blank!";
    }
    if (this.state.user.phone_number === "") {
      user_phone_number_error = "Phone number can't be blank!";
    } else if (isNaN(this.state.user.phone_number)) {
      user_phone_number_error = "Phone should be Numeric";
    } else if (this.state.user.phone_number.length < 10) {
      user_phone_number_error = "Phone number length is small.";
    } else if (this.state.user.phone_number.length > 10) {
      user_phone_number_error = "Phone number length is too large.";
    }
    if (this.state.user.email === "") {
      user_email_error = "Email can't be blank!";
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.user.email)
    ) {
      user_email_error = "Invalid email!";
    }

    if (this.state.user.password === "") {
      user_password_error = "Password can't be blank!";
    } else if (this.state.user.password.length < 6) {
      user_password_error = "Password is too short!";
    }
    if (this.state.user.confirm_password === "") {
      user_confirm_password_error = "Confirm Password can't be blank!";
    } else if (this.state.user.confirm_password !== this.state.user.password) {
      user_confirm_password_error =
        "Confirm Password is not matching password!";
    }
    this.setState(
      {
        user_first_name_error,
        user_last_name_error,
        user_phone_number_error,
        user_email_error,
        user_password_error,
        user_confirm_password_error
      },
      function() {
        if (
          user_first_name_error !== "" ||
          user_last_name_error !== "" ||
          user_phone_number_error !== "" ||
          user_email_error !== "" ||
          user_password_error !== "" ||
          user_confirm_password_error !== ""
        ) {
          return false;
        } else {
          return true;
        }
      }
    );

    if (
      user_first_name_error !== "" ||
      user_last_name_error !== "" ||
      user_phone_number_error !== "" ||
      user_email_error !== "" ||
      user_password_error !== "" ||
      user_confirm_password_error !== ""
    ) {
      this.setState({
        user_first_name_error,
        user_last_name_error,
        user_phone_number_error,
        user_email_error,
        user_password_error,
        user_confirm_password_error
      });
      return false;
    } else {
      return true;
    }
  };

  submitHandler = () => {
    let formIsValid = this.checkFormValidation();
    console.log(formIsValid);
    if (formIsValid) {
      this.submitForm();
    }
  };

  customCheckFormValidation = name => {
    let user_first_name_error = "";
    let user_last_name_error = "";
    let user_phone_number_error = "";
    let user_email_error = "";
    let user_password_error = "";
    let user_confirm_password_error = "";
    if (name === "first_name") {
      if (this.state.user.first_name === "") {
        user_first_name_error = "First name can't be blank!";
      }
      this.setState({
        user_first_name_error
      });
    } else if (name === "last_name") {
      if (this.state.user.last_name === "") {
        user_last_name_error = "Last name can't be blank!";
      }
      this.setState({
        user_last_name_error
      });
    } else if (name === "email") {
      if (this.state.user.email === "") {
        user_email_error = "Email can't be blank!";
      } else if (
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(
          this.state.user.email
        )
      ) {
        user_email_error = "Invalid email!";
      }
      this.setState({
        user_email_error
      });
    } else if (name === "phone_number") {
      if (this.state.user.phone_number === "") {
        user_phone_number_error = "Phone number can't be blank!";
      } else if (isNaN(this.state.user.phone_number)) {
        user_phone_number_error = "Phone should be Numeric";
      } else if (this.state.user.phone_number.length < 10) {
        user_phone_number_error = "Phone number length is small.";
      } else if (this.state.user.phone_number.length > 10) {
        user_phone_number_error = "Phone number length is too large.";
      }
      this.setState({
        user_phone_number_error
      });
    } else if (name === "password") {
      if (this.state.user.password === "") {
        user_password_error = "Password can't be blank!";
      } else if (this.state.user.password.length < 6) {
        user_password_error = "Password is too short!";
      }
      this.setState({
        user_password_error
      });
    } else if (name === "confirm_password") {
      if (this.state.user.confirm_password === "") {
        user_confirm_password_error = "Confirm Password can't be blank!";
      } else if (
        this.state.user.confirm_password !== this.state.user.password
      ) {
        user_confirm_password_error =
          "Confirm Password is not matching password!";
      }
      this.setState({
        user_confirm_password_error
      });
    }
  };

  addErrorMessage = msg => {
    if (msg === "") {
      return;
    } else {
      return <span className="error-class"> {msg} </span>;
    }
  };
  getPropertiesList = () => {
    this.setState({
      isLoaded: false,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/properties"
    fetch(url, {
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
				"Access-Control-Allow-Headers": "*"
      }
    }).then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 200){
          this.setState({
            isLoaded: true,
            properties: result.properties,
          });
        }else if (result.status === 401) {
          localStorage.removeItem("auction_user_token");
          window.location.href = "/login"
        }else {
          this.setState({
            variant: "danger",
            message: result.message
          });
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);
        }
      }
    })
  }
  render() {
    const featured_properties = this.state.properties.map((property, index) => {
      return(
        <div className="col-sm-3 px-2" key={index}>
          <div className="flipping">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div>
                    <img
                      src={property.thumbnail_img ? property.thumbnail_img : "./images/home4.png"}
                      alt="featured_property"
                      style={{ width: "236px", height: "140px" }}
                    />
                  </div>
                  <h5>{property.address}</h5>
                  <p>{property.headliner}</p>
                </div>
                <div className="flip-card-back">
                  <h5>{property.category} {property.p_type}</h5>
                  <div className="flip-data">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        After Repaired Value
                      </li>
                      <li className="list-inline-item">{window.format_currency(property.after_rehab_value)}</li>
                    </ul>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        Sellers Asking Price
                      </li>
                      <li className="list-inline-item">{window.format_currency(property.asking_price)}</li>
                    </ul>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        Estimated Rehab Cost
                      </li>
                      <li className="list-inline-item">{window.format_currency(property.estimated_rehab_cost)}</li>
                    </ul>
                  </div>
                  <ul className="list-inline">
                    <li className="list-inline-item">Potential Profit</li>
                    <li className="list-inline-item">{window.format_currency(property.profit_potential)}</li>
                  </ul>
                  <Link to={"/property/"+property.unique_address} className="details_btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="container-fluid home_main px-0">
        {/* <div className="bg_banner px-0">
          <div className="row col-md-10 offset-md-1 align-items-center">
            <div className="col-md-6 px-0 text-center">
          <div className="banner_home">
          <h5>
          <span>post your deals for free </span>
          <br/>
          & Test drive this site to maximize
          </h5>
          <p>
          <span>Your real estate investment business </span>
          <br/>
          by getting priority access to the
          <br/>
          <span>Best deal and unlimited access to
          <br/>
          all
          </span> details about each Property!
          </p>
          <button className="btn blue-btn" onClick={this.openSignUpModal}> Start FREE 60 Days Trial Now</button>
          </div>
            </div>
            <div className="col-md-6 px-0">
          <div className="video_home">
          <img src="/images/video-img.jpg"/>
          </div>
            </div>
          </div>
        </div> */}
        <div className="video_col">
          {
          //   <video
          //   id="videobcg"
          //   preload="yes"
          //   autoPlay
          //   loop
          //   muted
          //   playsInline
          // >
          //   <source src="/videos/skyline.mp4" type="video/mp4" />
          // </video>
          }
          <div className="static_text container-fluid">
            <div className="col-md-10">
              <h2>FREE Real Estate Investor Auction</h2>
              <h2>Platform to Post Your Deals...</h2>
              <Link to="#" onClick={this.openVideoModal}>
                <img
                  className="d-block img-thumbnail"
                  src="/images/fhome.jpg"
                  alt="First slide"
                />
              </Link>
            </div>
          </div>
          <Carousel className="home_carousel" interval={10000} controls={false}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel0.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel1.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel2.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel3.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <div className="sub_title">
            <div className="container">

              <h5 className="text-uppercase">join our marketplace</h5>
              <span className="text-capitalize">
                get exclusive acess plus be the first to know about upcoming
                oppurtunities.{" "}
                <a href="/#" className="">
                  click here
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="owl_box">
          <div className="container main-content">
            <OwlCarousel
              className="owl-theme py-3"
              loop={true}
              margin={10}
              nav={true}
              dots={false}
              // navText={[
              //   '<div class="owl_arrw"><</div>',
              //   '<div class="owl_arrw">></div>'
              // ]}
              responsive={
                {
                  0: {
                    items: 1,
                    slideby: 1,
                  },
                  600: {
                    items: 1,
                    slideby: 1,
                  },
                  1000: {
                    items: 3,
                    slideby: 1,
                  }
                }
              }
              navText={[
                renderToStaticMarkup(<FontAwesomeIcon icon={faArrowLeft} />),
                renderToStaticMarkup(<FontAwesomeIcon icon={faArrowRight} />)
              ]}
              navContainerClass="custom-nav"
            >
              <div className="item">
                <Link to="/help/top-15-reasons-to-post-your-wholesale-fixer-upper-deals">
                  <div className="inner_info">
                    <div className="inner_img">
                      <img src="/images/top_reason.jpg" alt="top_reason_img" />
                    </div>
                    <div className="inner_text">
                      <h5>TOP 15 REASONS</h5>
                      <p>
                        Top 15 reasons to post your Wholesale/Fixer upper deals at
                        AuctionMyDeal.com
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="item">
                <Link to="/help/free-landlord-analyzer/">
                  <div className="inner_info">
                    <div className="inner_img">
                      <img src="/images/landlord_analyzer.jpg" alt="landlord_analyzer_img" />
                    </div>
                    <div className="inner_text">
                      <h5>LANDLORD ANALYSER</h5>
                      <p>
                        Landlord Analyser is used to show landlords how to
                        levergae Short Term Financing to get a Better Return on
                        their Money
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="item">
                <Link to="/help">
                  <div className="inner_info">
                    <div className="inner_img">
                      <img src="/images/get_approved.jpg" alt="get_approved_img" />
                    </div>
                    <div className="inner_text">
                      <h5>Auction your deal</h5>
                      <p>Does your Deal qualify to Auction?</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="item">
                <Link to="/help/free-confidential-deal-analysis/">
                  <div className="inner_info">
                    <div className="inner_img">
                      <img src="/images/confident_deal.jpg" alt="confident_deal_img" />
                    </div>
                    <div className="inner_text">
                      <h5> Confidential Deal Analysis </h5>
                      <p>Free Confidential Deal Analysis </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="item">
                <Link to="/help/auction-your-wholesale-deal-to-the-highest-bidder-or-our-affiliate-partner-angel-investors-llc-will-buy-it/">
                  <div className="inner_info">
                    <div className="inner_img">
                      <img src="/images/guaranty_sale.jpg" alt="guaranty_sale_img" />
                    </div>
                    <div className="inner_text">
                      <h5>GUARANTY SALE PROGRAM</h5>
                      <p>
                        Auction Your Wholesale Deal to the Highest Bidder or Angel
                        Investors, LLC will make you an offer!
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </OwlCarousel>
          </div>
        </div>
        <div className="featured_col pb-5">
          <div className="container">
            <h2>Featured Properties</h2>
            <div className="row mx-0">
              {featured_properties}
            </div>
          </div>
        </div>
        <div className="dealofweek">
          <div className="container">
            <div className="row">
              <div className="col-md-6 px-2">
                <iframe
                  width="560"
                  height="275"
                  title="youtube"
                  src="https://www.youtube.com/embed/AGL_3AmIJd4?controls=0"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
                ></iframe>
              </div>
              <div className="col-md-6 px-2 ">
                <div className="pleft80">
                  <h4>Why Auction are an excellent way to</h4>
                  <h2>buy and sell real estate deals</h2>
                  <p>
                    Our ground breaking new platform streams Houston property
                    auctions online and lets you bid from the comfort of your
                    own couch. You never have to miss an auction because of time
                    or distance again.
                  </p>
                  <p>
                    What's more, our start-to-end service lets you research,
                    watch and bid on auctions, as well as complete the purchase
                    through electronic contract signing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="invest_col">
          <div className="container">
            <h2>Investor Auctions Made Easy</h2>
            <div className="row">
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner">
                          {" "}
                          <FontAwesomeIcon icon={faSearch} />{" "}
                        </div>
                        <h5>Browse</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>
                          Find a property to bid or buy now, Click the Watch
                          button and the property will be saved to your Watched
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner">
                          <FontAwesomeIcon icon={faGavel} />{" "}
                        </div>
                        <h5>Submit Bid</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>
                          Find the property right for you? Place your bid or
                          make your offer on the property page. Monitor bidding
                          through our buyer dashboard{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner">
                          <FontAwesomeIcon icon={faCreditCard} />{" "}
                        </div>
                        <h5>Buy Now</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>
                          This price is typically higher than what the seller is
                          expecting to get for the property, but it could still
                          be a great deal for a landlord{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="flipping">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="inner">
                          <FontAwesomeIcon icon={faHandPointRight} />
                        </div>
                        <h5>Close</h5>
                      </div>
                      <div className="flip-card-back">
                        <p>
                          If your offer is accepted, you’ll either work with our
                          team or your agent to coordinate document signing and
                          the closing date.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="status_modal register_modal"
          show={this.state.sign_up_modal}
          onHide={this.hideSignUpModal}
          centered
        >
          <div className="modal-body">
            {this.state.message ? (
              <Alert variant={this.state.variant}>{this.state.message}</Alert>
            ) : null}
            {this.state.created === false ? (
              <div className="register_box">
                <div className="banner_text text-center">
                  <h5>
                    <span className="yellow_font">
                      test drive this auction site
                    </span>
                    <br />
                    designed for local Real Estate Investors <br />
                    <span className="para_modal1">
                      for 60 Days for FREE to get
                    </span>
                    <br />
                    <span className="para_modal2">
                      Priority Access to the Best Deals
                    </span>
                    <br />
                    <span className="yellow_font">& unlimited acess to</span>
                    <br />
                    <i>ALL details about each Property!</i>
                  </h5>
                  <h6>Start Free 60 Day trail now</h6>
                  <p>
                    <i>& learn "5 Sneaky ways to promote</i>
                  </p>
                  <p>
                    <i>your property to most senior investors</i>
                  </p>
                  <p>
                    <i>who will pay you MORE money"</i>
                  </p>
                </div>
                <div className="signup-code">
                  <div className="col-md-12">
                    <h6 className="font-red">Create Your account</h6>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text group-box-chat"
                          id="basic-addon1"
                        >
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="first_name"
                        onChange={this.updateUser}
                        placeholder="First Name"
                        autoComplete="off"
                        className="form-control"
                      />
                    </div>
                    {this.addErrorMessage(this.state.user_first_name_error)}
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text group-box-chat"
                          id="basic-addon1"
                        >
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={this.updateUser}
                        autoComplete="off"
                      />
                    </div>
                    {this.addErrorMessage(this.state.user_last_name_error)}
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text group-box-chat"
                          id="basic-addon1"
                        >
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        onChange={this.updateUser}
                        autoComplete="off"
                      />
                    </div>
                    {this.addErrorMessage(this.state.user_email_error)}
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text group-box-chat"
                          id="basic-addon1"
                        >
                          <FontAwesomeIcon icon={faMobileAlt} />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control numeric"
                        placeholder="Phone"
                        name="phone_number"
                        onChange={this.updateUser}
                        maxLength="10"
                        onKeyPress={this.checkNumeric}
                      />
                    </div>
                    {this.addErrorMessage(this.state.user_phone_number_error)}
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text group-box-chat"
                          id="basic-addon1"
                        >
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={this.updateUser}
                        autoComplete="false"
                      />
                    </div>
                    {this.addErrorMessage(this.state.user_password_error)}
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text group-box-chat"
                          id="basic-addon1"
                        >
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        onChange={this.updateUser}
                        autoComplete="off"
                      />
                    </div>
                    {this.addErrorMessage(
                      this.state.user_confirm_password_error
                    )}
                  </div>
                  <div className="col-md-12 mt-3 text-center">
                    <button
                      className="btn red-btn submit-btn my-0 mx-auto"
                      type="submit"
                      onClick={this.submitHandler}
                    >
                      Start FREE 60 Day Trial Now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="register_box">
                <div className="banner_text text-center">
                  <h5>
                    <span className="yellow_font">
                      test drive this auction site
                    </span>
                    <br />
                    designed for local Real Estate Investors <br />
                    <span className="para_modal1">
                      for 60 Days for FREE to get
                    </span>
                    <br />
                    <span className="para_modal2">
                      Priority Access to the Best Deals
                    </span>
                    <br />
                    <span className="yellow_font">& unlimited acess to</span>
                    <br />
                    <i>ALL details about each Property!</i>
                  </h5>
                  <h6>Start Free 60 Day trail now</h6>
                  <p>
                    <i>& learn "5 Sneaky ways to promote</i>
                  </p>
                  <p>
                    <i>your property to most senior investors</i>
                  </p>
                  <p>
                    <i>who will pay you MORE money"</i>
                  </p>
                </div>
                <div className="verify-code text-center">
                  <div className="col-md-12">
                    <h6 className="font-red">Account Verification</h6>
                  </div>
                  <p>
                    Please enter the Verification code sent on your Email and
                    Phone Number
                  </p>
                  <div className="form-group">
                    <input
                      type="text"
                      name="verification_code"
                      className="enter-code form-control"
                      onChange={this.updateUser}
                      maxLength="6"
                      onKeyPress={this.checkNumeric}
                    />
                    {this.addErrorMessage(this.state.user_verification_error)}
                  </div>
                  <div className="form-group">
                    <button
                      className="red-btn submit-btn"
                      onClick={this.submitVerificationHandler}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="not-get-code text-center">
                    <p className="mb-0">Didn't get Verification Code?</p>
                    <Link to="#" onClick={this.resendVerificationCode}>
                      <i className="fa fa-refresh" aria-hidden="true"></i>{" "}
                      Resend Code
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
        <Modal
          className="status_modal register_modal"
          show={this.state.video_modal}
          onHide={this.hideSignUpModal}
          centered
        >
          <Modal.Header closeButton>
            <div className=" offset-md-1 col-md-10 text-center">
              <h5 className="mb-0 text-uppercase">Video</h5>
            </div>
          </Modal.Header>
          <div className="modal-body px-0">
            <div className="row mx-0">
              <div className="col-md-12 ">
              body
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
