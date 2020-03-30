import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CurrencyInput from 'react-currency-input';
import { faBed, faBath, faCar, faMinus, faPlus, faFilePdf, faLock, faQuestion, faCalendarAlt, faComments, faLink} from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton, TwitterShareButton, TumblrShareButton, PinterestShareButton, RedditShareButton} from "react-share";
import {FacebookIcon, TwitterIcon, TumblrIcon, PinterestIcon, RedditIcon } from "react-share";
import { faHeart} from '@fortawesome/free-regular-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

export default class PropertyShowOne extends Component {
  _isMounted = false
  _timerArray = []
  constructor(props){
    super(props);
    this.state = {}
  };

  render(){
    return (
      <div className="">
        template 1
      </div>
    );
  }
}
