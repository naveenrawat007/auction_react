import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {
      logged_in: false,
      is_admin: false
    }
  }

  handleLogout = () => {
    this.setState({
      logged_in: false
    })
    localStorage.removeItem("auction_user_token");
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
        let path_name = ""
        path_name = this.props.location.pathname
        if ((path_name === "/sign_up") || (path_name === "/login") || (path_name === "/forgot_password") || (path_name === "/property/new") ){
          this.props.history.push(this.props.location.pathname)
        }else if (path_name === "/new_password") {
        }
        else {
          this.props.history.push('/login')
        }
      }else {
        if (result.user.is_admin === true){
          let path_name = "";
          path_name = this.props.location.pathname
          if (path_name === "/"){
            this.props.history.push('/admin')
          }
          this.setState({
            is_admin: true
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
              this.props.history.push('/user')
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
    if (this.state.is_admin){
      this.props.history.push('/admin')
    }else {
      this.props.history.push('/user')
    }
  }
  login_log_out_div = () => {
    if (localStorage.getItem("auction_user_token")){
      return(
        <>
          <Dropdown>
            <Dropdown.Toggle className="nav-link" id="dropdown-basic2">
              <img src="/images/user.png" onMouseOver={ (e) => {this.mouseOverUserImageChange(e)}} onMouseOut={ (e) => {this.mouseOutUserImageChange(e)}} border="0" alt=""/>
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop-menu profile-menu" >
              <Dropdown.Item onClick={this.navigateToProfile}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item className="dropdown-item" onClick={this.handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )
    }else {
      return(
        <> <Link to='/login' className="red-btn login-btn">Login</Link>&nbsp; <Link to="/sign_up" className="red-btn register-btn">Register</Link>
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


  render(){
    return(
      <div className="header">
        <div className="container custom_container px-0">
          <nav className="navbar navbar-expand-lg">
            <Link to="/" className="logo">
              <img src="/images/logo.png" alt="Logo"/>
            </Link>
            <button className="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"><i className="fa fa-indent"></i></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav responsive-nav">
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle className="nav-link" id="dropdown-basic1">
                      Buy <FontAwesomeIcon icon={faChevronDown} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="drop-menu">
                      <Dropdown.Item href="#">Live Online Bidding</Dropdown.Item>
                      <Dropdown.Item href="#">Coming Soon</Dropdown.Item>
                      <Dropdown.Item href="#">Post Auction</Dropdown.Item>
                      <Dropdown.Item href="#">Pending Property</Dropdown.Item>
                      <Dropdown.Item href="#">Sold</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item dropdown">
                  {
                    localStorage.getItem("auction_user_token")
                      ?
                        <Link to='/user/property/new' className="nav-link" data-toggle="dropdown">Sell </Link>
                      :
                      <Link to='/property/new' className="nav-link" data-toggle="dropdown">Sell </Link>
                  }
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" href="/" data-toggle="dropdown">Help </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/">
                    About us
                  </a>
                </li>
              </ul>
              <div className="header-reg">
                <a href="/" className="mx-3"><img src="/images/help.png" onMouseOver={ (e) => {this.mouseOverImageChange(e)} } onMouseOut={ (e) => {this.mouseOutImageChange(e)} } border="0" alt=""/></a>
                { this.login_log_out_div() }
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
