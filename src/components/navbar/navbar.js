import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default class Navbar extends Component{
  handleLogout = () => {
    localStorage.removeItem("auction_user_token");
    this.props.history.push('/login')
  }

  componentDidMount () {
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
        if ((path_name === "/sign_up") || (path_name === "/login") || (path_name === "/forgot_password") ){
          this.props.history.push(this.props.location.pathname)
        }else if (path_name === "/new_password") {
        }
        else {
          this.props.history.push('/')
        }
      }
    })
  }
  login_log_out_div = () => {
    if (localStorage.getItem("auction_user_token")){
      return(
        <>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} >
              <img src="images/user.png" onMouseOver={ (e) => {this.mouseOverUserImageChange(e)}} onMouseOut={ (e) => {this.mouseOutUserImageChange(e)}} border="0" alt=""/>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu profile-men" >
              <Dropdown.Item to="#">
                My Profile
              </Dropdown.Item>
              <Dropdown.Item to='#' className="dropdown-item" onClick={this.handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )
    }else {
      return(
        <> <Link to='/login' className="red-btn login-btn">Login</Link> <Link to="/sign_up" className="red-btn register-btn">Register</Link>
        </>
      )
    }
  }

  mouseOutImageChange = (event) =>{
    event.target.src='images/help.png'
  }

  mouseOverImageChange = (event) =>{
    event.target.src='images/helphover.png'
  }
  mouseOutUserImageChange = (event) =>{
    event.target.src='images/user.png'
  }

  mouseOverUserImageChange = (event) =>{
    event.target.src='images/userhover.png'
  }


  render(){
    return(
      <div className="header">
        <div className="container custom_container px-0">
          <nav className="navbar navbar-expand-lg">
            <Link to="/" className="logo">
              <img src="images/logo.png" alt="Logo"/>
            </Link>
            <button className="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"><i className="fa fa-indent"></i></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav responsive-nav">
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} className="nav-link" >
                      Buy <FontAwesomeIcon icon={faChevronDown} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu profile-men" >
                      <Dropdown.Item to="#">
                        Live Online Biding
                      </Dropdown.Item>
                      <Dropdown.Item to="#">
                        Coming Soon
                      </Dropdown.Item>
                      <Dropdown.Item to="#">
                        Post Auction
                      </Dropdown.Item>
                      <Dropdown.Item to="#">
                        Pending Property
                      </Dropdown.Item>
                      <Dropdown.Item to='#'>
                        Sold
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" href="/" data-toggle="dropdown">Sell </a>
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
                <a href="/" className="mx-3"><img src="images/help.png" onMouseOver={ (e) => {this.mouseOverImageChange(e)} } onMouseOut={ (e) => {this.mouseOutImageChange(e)} } border="0" alt=""/></a>
                { this.login_log_out_div() }
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }
  render() {
    return (
      <Link to="" onClick={this.handleClick} className="nav-link" >
        {this.props.children}
      </Link>
    );
  }
}
