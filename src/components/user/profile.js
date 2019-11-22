import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert';

const initial_state = {
  error: "",
  message: "",
  user: {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    company_phone: "",
    address: "",
    broker_licence: "",
    realtor_licence: "",
    password: "",
    confirm_password: "",
    type_attr: JSON.parse(process.env.REACT_APP_BACKEND_USER_ATTR)
  },
  user_first_name_error: "",
  user_last_name_error: "",
  user_email_error: "",
  user_phone_number_error: "",
  user_company_name_error: "",
  user_company_phone_error: "",
  user_address_error: "",
  user_broker_error: "",
  user_raltor_error: "",
  user_password_error: "",
  user_confirm_password_error: "",
}
export default class Login extends Component{
	constructor(props){
    super(props);
    this.state = initial_state;
  }
  componentDidMount () {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/show"
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
      if (result.status === 200){
        this.setState({
          user: {
          ...this.state.user,
          first_name: result.user.first_name,
          last_name: result.user.last_name,
          email: result.user.email,
          phone_number: result.user.phone_number,
          company_name: result.user.company_name,
          company_phone: result.user.company_phone,
          address: result.user.address,
          broker_licence: result.user.broker_licence,
          realtor_licence: result.user.realtor_licence,
          type_attr: result.user.type_attr
          }
        });
      }else {
        this.setState({
          variant: "danger",
          message: result.message
        });
      }
    })
  }

  submitForm = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/update_profile"
  	fetch(url ,{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: JSON.stringify({user: this.state.user}),
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        this.setState({
          user: {
          ...this.state.user,
          first_name: result.user.first_name,
          last_name: result.user.last_name,
          email: result.user.email,
          phone_number: result.user.phone_number,
          company_name: result.user.company_name,
          company_phone: result.user.company_phone,
          address: result.user.address,
          broker_licence: result.user.broker_licence,
          realtor_licence: result.user.realtor_licence,
          type_attr: result.user.type_attr
          }
        });
        this.setState({
          variant: "success",
          message: "Updated Sucessfully"
        });
      }else {
        this.setState({message: result.message,
        variant: "danger"});
      }
		}, (error) => {
		});
  }
  submitHandler = (event) => {
		event.preventDefault();
    let formIsValid = true//this.checkFormValidation();
    if (formIsValid){
      this.submitForm()
    }
  }

  updateUser = (event) => {
    const{ name, value } = event.target;
    this.setState({
      user: {
      ...this.state.user,
      [name]: value
      }
    }, function () {
      // this.customCheckFormValidation(name);
    });
	}

  checkNumeric = (e) => {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(
      !e.charCode
      ? e.which
      : e.charCode);
    if (!regex.test(str)) {
      e.preventDefault();
      return false;
    }
  }
  addErrorMessage = (msg) => {
    if (msg === ""){
      return ;
    }else{
      return (<span className="error-class"> {msg} </span>);
    }
  }
	render() {
		return (
      <div id="myProfile" className="container px-0 tab-pane active">
        <div className="profile-form">
          <div className="profile-form-in">
            {
              this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
            }
            <div className="row">
              <div className="col-md-4">
                <div className="upload-profile-pic">
                  <h3>Welcome back,</h3>
                  <img src="images/default-profile-img.png" alt="user_image"/>
                </div>
              </div>
              <div className="col-md-8 user-info">
                <h3>Information</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" className="form-control" value={this.state.user.first_name} onChange={this.updateUser} name="first_name"/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" className="form-control" value={this.state.user.last_name} onChange={this.updateUser} name="last_name"/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" className="form-control" value={this.state.user.email} onChange={this.updateUser} name="email"/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" className="form-control" value={this.state.user.phone_number} onChange={this.updateUser} name="phone_number" maxLength="10" onKeyPress={this.checkNumeric}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input type="text" className="form-control" value={this.state.user.company_name} onChange={this.updateUser} name="company_name"/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Company phone</label>
                      <input type="text" className="form-control" value={this.state.user.company_phone ? this.state.user.company_phone : "" } onChange={this.updateUser} name="company_phone" maxLength="10" onKeyPress={this.checkNumeric}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Address</label>
                      <textarea className="form-control" value={this.state.user.address} onChange={this.updateUser} name="address"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="more-about-you">
              <h3>We'd like to know a little more about you. Tell us about yourself. Select as many as apply: </h3>
              <div className="row">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-10">
                      <div className="form-group">
                        <label>Broker license #:</label>
                        <input type="text" className="form-control" value={this.state.user.broker_licence} name="broker_licence" onChange={this.updateUser}/>
                      </div>
                      <div className="form-group">
                        <label>Realtor license #:</label>
                        <input type="text" className="form-control" value={this.state.user.realtor_licence} name="realtor_licence" onChange={this.updateUser}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="about-option">
                    <ul>
                      <li>
                        <label>
                          <input type="checkbox" />
                          <span>Investo/Wholesaler</span>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox"/>
                          <span>Investo/Flipper</span>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox"/>
                          <span>Investo/Landlord</span>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox"/>
                          <span>Investo/Rookie</span>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox"/>
                          <span>Property/Manager</span>
                        </label>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <label>
                          <input type="checkbox"/>
                          <span>Realtor</span>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox"/>
                          <span>Contractor</span>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox"/>
                          <span>Private Money Lender</span>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox"/>
                          <span>Hard Money Lender</span>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="checkbox"/>
                          <span>Real Estate Mentor</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <button type="Submit" className="red-btn update-pwd-btn" onClick={this.submitHandler}> Update profile </button>
              <div className="change-pwd-profile">
                <h3>Change Password</h3>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Old Password</label>
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10">
                  <input type="button" value="Update Password" className="red-btn update-pwd-btn"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
	}
}
