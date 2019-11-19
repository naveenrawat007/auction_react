import React, {Component} from 'react';
import {Link} from 'react-router-dom'

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
        if ((path_name === "/sign_up") || (path_name === "login") ){
          this.props.history.push(this.props.location.pathname)
        }else {
          this.props.history.push('/')
        }
      }
    })
  }
  login_log_out_div = () => {
    if (localStorage.getItem("auction_user_token")){
      return(
        <Link to='#' className="red-btn login-btn" onClick={this.handleLogout} >Logout</Link>
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
                  <a className="nav-link" href="/" data-toggle="dropdown">Buy <i className="fa fa-angle-down fa-lg"  aria-hidden="true"></i></a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/">Buy</a>
                    <a className="dropdown-item" href="/">Sell</a>
                    <a className="dropdown-item" href="/">Help</a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" href="/" data-toggle="dropdown">Sell <i className="fa fa-angle-down fa-lg"  aria-hidden="true"></i></a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/">Buy</a>
                    <a className="dropdown-item" href="/">Sell</a>
                    <a className="dropdown-item" href="/">Help</a>
                  </div>


                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" href="/" data-toggle="dropdown">Help <i className="fa fa-angle-down fa-lg"  aria-hidden="true"></i></a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/">Buy</a>
                    <a className="dropdown-item" href="/">Sell</a>
                    <a className="dropdown-item" href="/">Help</a>
                  </div>
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
