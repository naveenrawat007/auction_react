import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class LandlordAnalyzer extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane show active" id="landlord-analyzer" role="tabpanel" aria-labelledby="landlord-analyzer">
        <h3>Landlord Analyzer</h3>
        <img src="/images/sample.jpg" alt=""/>
      </div>
    )
  }
}
