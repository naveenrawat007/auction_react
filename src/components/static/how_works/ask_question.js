import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class SellerOverview extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane show active landlord-analyzer" id="landlord-analyzer" role="tabpanel" aria-labelledby="landlord-analyzer">
        <h3 className="font-darkred">Ask us question</h3>
        <div className="col-md-6 offset-md-3">	
	        <form className="ask_form mb-5">
	        	<div class="form-group">
					    <label for="exampleInputEmail1">Name</label>
					    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
					  </div>
					  <div class="form-group">
					    <label for="exampleInputEmail1">Email</label>
					    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
					  </div>
					  <div class="form-group">
					    <label for="exampleInputEmail1">Phone</label>
					    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
					  </div>
					  <div class="form-group">
					    <label for="exampleInputPassword1">Ask a Question?</label>
					    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
					  </div>
					  <div className="col-md-12 text-center">
					  	<button type="submit" class="btn red-btn">Submit</button>
					  </div>
					</form>
				</div>
      </div>
    )
  }
}
