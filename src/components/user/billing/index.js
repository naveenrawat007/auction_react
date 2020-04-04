import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

export default class Billing extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
  }
	constructor(props){
    super(props);
    this.state = {
      loaded : true,
      message: "",
      variant: "",
    };
  }
  componentDidMount () {
    this._isMounted = true;
    window.scrollTo(0,0)
  }
	render() {
		return (
      <div id="myProfile" className="container px-0 tab-pane active">
        <div className="profile-form">
          {this.state.loaded ? null :
          <div className="spinner_main">
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          }
          <div className="profile-form-in">
            <form onSubmit={this.submitHandler}>
              {
                this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
              }
              <div className="row mx-0 billing_tab">
                <div className="col-md-6 pl-0 my-3">
                  <div className="plan_details p-3">
                    <div className="plan_details_head">
                      <div className="plan_details_img">
                        <img
                          className="d-block img-thumbnail"
                          src="/images/fhome.jpg"
                          alt="First slide"
                        />
                      </div>
                      <div className="plan_details_text">
                        <p className="mb-0">Your Plan</p>
                        <h2 className="mb-0">Premium User</h2>
                        <a href="#">Change</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Cancel</a>
                      </div>
                    </div>
                    <div className="plan_details_body pt-3">
                      <ul className="list-inline">
                        <li className="list-inline-item">Status:</li>
                        <li className="list-inline-item"><span>Active</span></li>
                      </ul>
                      <ul className="list-inline">
                        <li className="list-inline-item">Billing Cycle:</li>
                        <li className="list-inline-item">02/04/2020 - 04/30/2020</li>
                      </ul>
                      <ul className="list-inline">
                        <li className="list-inline-item">Billing Plan:</li>
                        <li className="list-inline-item">Monthly <a href="#" className="ml-4">Change</a></li>
                      </ul>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">Upcoming Charges:</li>
                        <li className="list-inline-item">$57</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pr-0 my-3">
                  <div className="payment_details">
                    <div className="payment_details_head p-3">
                      <h5 className="mb-0">Payment Method</h5>
                    </div>
                    <div className="payment_details_body p-3">
                      <p>Payment Type: <span>Credit Card</span></p>
                      <p>Card Number: <span>XXXX-XXXX-XXXX-0640</span></p>
                      <p>Card Type: <span>Visa</span></p>
                      <p>Expiration Date: <span>06/23</span></p>
                    </div>
                    <div className="payment_details_footer px-3 pb-5 text-right font-blue-bold">
                      <a href="#">View Details</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 px-0 my-3">
                  <div className="history_details">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th colSpan="5">Billing History</th>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <th>Reference #</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>03/13/2020</td>
                          <td>546942001</td>
                          <td>Recurring State..</td>
                          <td>$57.00</td>
                          <td>Paid in full</td>
                        </tr>
                        <tr>
                          <td>03/13/2020</td>
                          <td>546942001</td>
                          <td>Recurring State..</td>
                          <td>$57.00</td>
                          <td>Paid in full</td>
                        </tr>
                        <tr>
                          <td>03/13/2020</td>
                          <td>546942001</td>
                          <td>Recurring State..</td>
                          <td>$57.00</td>
                          <td>Paid in full</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
	}
}
