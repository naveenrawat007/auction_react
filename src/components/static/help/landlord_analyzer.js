import React, {Component} from 'react';

export default class LandlordAnalyzer extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane show active landlord-analyzer" id="landlord-analyzer" role="tabpanel" aria-labelledby="landlord-analyzer">
        <h3 className="font-darkred mt-3">Landlord Analyzer</h3>
        <img src="/images/sample.jpg" alt=""/>
      </div>
    )
  }
}
