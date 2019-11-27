import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faLinkedinIn, faYoutube} from '@fortawesome/free-brands-svg-icons'

export default class Footer extends Component{
  render(){
    return(
      <>
        <div className="footer">
          <div className="container custom_container">
            <div className="footer-link row mx-0">
              <div className="col-md-3 col-sm-6">
                <h5>company</h5>
                <ul>
                  <li><Link to="#">About us</Link></li>
                  <li><Link to="#">FAQs</Link></li>
                  <li><Link to="#">Terms & Conditions</Link></li>
                  <li><Link to="#">Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6">
                <h5>resources</h5>
                <ul>
                  <li><Link to="#">Real Estate Investor Resource</Link></li>
                  <li><Link to="#">Training Courses</Link></li>
                  <li><Link to="#">Sources of Marketing</Link></li>
                  <li><Link to="#">Resources to Find Deals</Link></li>
                </ul>
              </div>

              <div className="col-md-3 col-sm-6">
                <h5>Help center</h5>
                <ul>
                  <li><Link to="#">Seller</Link></li>
                  <li><Link to="#">Buyer</Link></li>
                  <li><Link to="#">realtor</Link></li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6">
                <h5>connect</h5>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <Link to="#"><FontAwesomeIcon icon={faFacebookF} />&nbsp;</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#"><FontAwesomeIcon icon={faTwitter} />&nbsp;</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#"><FontAwesomeIcon icon={faLinkedinIn} />&nbsp;</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#"><FontAwesomeIcon icon={faYoutube} />&nbsp;</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <h5>AuctionMyDeal.com is Angel Investors, LLC affiliate, Tx Broker license #0453987.</h5>
        </div>
      </>
    )
  }
}
