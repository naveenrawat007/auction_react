import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import Dropdown from 'react-bootstrap/Dropdown'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons'
import {renderToStaticMarkup} from 'react-dom/server';

export default class TopNavbar extends Component{
  constructor(props){
    super(props);
    this.state = {
      logged_in: false,
      is_admin: false,
      // display_mobile_nav: false,
    }
  }

  handleLogout = () => {
    this.setState({
      logged_in: false
    })
    localStorage.removeItem("auction_user_token");
    localStorage.removeItem("auction_user_image");
    localStorage.removeItem("auction_user_name");
    localStorage.removeItem("auction_user_status");
    localStorage.removeItem("auction_admin_token");
    this.props.history.push('/login')
  }

  checkTokenMethod = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/check_token"
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
      if (result.status !== 100){
        localStorage.removeItem("auction_user_token");
        localStorage.removeItem("auction_admin_token");
        let static_links = ["/sign_up", "/login", "/forgot_password", "/property/new", "/about", "/template-one", "/template-two"]
        let path_name = ""
        path_name = this.props.location.pathname
        if ((static_links.indexOf(path_name) !== -1 ) || (/^\/property\/[a-z_0-9]+/i.test(path_name) === true)|| (/^\/how-everything-works\.*/i.test(path_name) === true) || (/^\/frequently-asked-questions\.*/i.test(path_name) === true) || (/^\/help\.*/i.test(path_name) === true) || (/^\/realtor-portal\.*/i.test(path_name) === true)){
          this.props.history.push(this.props.location.pathname)
        }else if (path_name === "/new_password") {
        }
        else {
          this.props.history.push('/')
        }
      }else {
        if (result.user.is_admin === true){
          let path_name = "";
          path_name = this.props.location.pathname
          localStorage.setItem("auction_admin_token", localStorage.getItem("auction_user_token"));
          if (path_name === "/"){
            this.props.history.push('/')
          }
          this.setState({
            is_admin: true,
            logged_in: true,
          });
        }else {
          if (result.user.is_verified === false){
            localStorage.setItem("auction_user_temp_token", result.user.token);
            this.setState({
              logged_in: true
            });
            this.props.history.push('/verify')
          }else{
            this.setState({
              logged_in: true
            });
            let path_name = "";
            path_name = this.props.location.pathname
            if (path_name === "/"){
              this.props.history.push('/')
            }else if (path_name === "/property/new") {
              this.props.history.push('/user/property/new')
            }
          }
        }
      }
    })
  }

  componentDidMount () {
    this.checkTokenMethod()
  }

  navigateToProfile = () => {
    if (this.state.logged_in){
      if (this.state.is_admin){
        this.props.history.push('/admin')
      }else {
        this.props.history.push('/user')
      }
    }else {
      this.props.history.push('/')
    }
  }
  login_log_out_div = () => {
    if (localStorage.getItem("auction_user_token")){
      return(
        <>
          <Nav.Link>
            <img src="/images/help.png" onMouseOver={ (e) => {this.mouseOverImageChange(e)} } onMouseOut={ (e) => {this.mouseOutImageChange(e)} } border="0" alt=""/>
          </Nav.Link>
          <NavDropdown title={
            <>
              <img src="/images/user.png" onMouseOver={ (e) => {this.mouseOverUserImageChange(e)}} onMouseOut={ (e) => {this.mouseOutUserImageChange(e)}} border="0" alt=""/>
            </>
          } id="collasible-nav-dropdown">
            {
              this.state.logged_in ?
                (
                  this.state.is_admin ?
                    <NavDropdown.Item href="/admin">My Profile</NavDropdown.Item>
                  :
                  <NavDropdown.Item href="/user">My Profile</NavDropdown.Item>
                )
              :
              <NavDropdown.Item href="/">My Profile</NavDropdown.Item>
            }
            {/* <NavDropdown.Item href="#">My Profile</NavDropdown.Item> */}
            <NavDropdown.Item href="/" onClick={this.handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </>
      )
    }else {
      return(
        <>
          <Link to='/login' className="red-btn login-btn">Login</Link>
          <Link to="/sign_up" className="red-btn register-btn">Register</Link>
        </>
      )
    }
  }

  mouseOutImageChange = (event) =>{
    event.target.src='/images/help.png'
  }

  mouseOverImageChange = (event) =>{
    event.target.src='/images/helphover.png'
  }
  mouseOutUserImageChange = (event) =>{
    event.target.src='/images/user.png'
  }

  mouseOverUserImageChange = (event) =>{
    event.target.src='/images/userhover.png'
  }
  navigateToLiveBidding = () => {
    this.props.history.push('/property/live_bidding')
  }

  navigateToBestOffer = () => {
    this.props.history.push('/property/best_offer')
  }
  navigateToPostAuction = () => {
    this.props.history.push('/property/post_auction')
  }

  navigateToPending = () => {
    this.props.history.push('/property/pending')
  }

  navigateToSold = () => {
    this.props.history.push('/property/sold')
  }


  render(){
    return (
      <div className="header">
        <div className="container custom_container px-0">
          <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand href="/" className="p-0">
              <img src="/images/logo.png" alt="Logo"/>
            </Navbar.Brand>
            <Nav className="mobile-header-reg">
              { this.login_log_out_div() }
            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown title={
                  <>
                    Buy <FontAwesomeIcon icon={faChevronDown} />
                  </>
                } id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/property/best_offer">Best Offer</NavDropdown.Item>
                  <NavDropdown.Item href="/property/live_bidding">Live Online Auction</NavDropdown.Item>
                  <NavDropdown.Item href="/property/post_auction">Post Auction</NavDropdown.Item>
                  <NavDropdown.Item href="/property/pending">Pending Property</NavDropdown.Item>
                  <NavDropdown.Item href="/property/sold">Sold</NavDropdown.Item>
                </NavDropdown>
                {
                  (this.state.logged_in === true && this.state.is_admin === false)
                    ?
                      <Nav.Link href='/user/property/new' className="nav-link" data-toggle="dropdown">Sell </Nav.Link>
                    :
                    <Nav.Link href='/property/new' className="nav-link" data-toggle="dropdown">Sell </Nav.Link>
                }
                <Nav.Link href="/help-and-faq">Help</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
              </Nav>
              <Nav className="header-reg">

                { this.login_log_out_div() }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    )
  }
}
