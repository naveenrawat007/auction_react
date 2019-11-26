import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert';

const initial_state = {
  error: "",
  message: "",
  user_image: "",
  user_new_image: null,
  user: {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    company_phone: "",
    address: "",
    city: "",
    state: "",
    broker_licence: "",
    realtor_licence: "",
    old_password: "",
    password: "",
    confirm_password: "",
    type_attributes: Object.assign(JSON.parse(process.env.REACT_APP_BACKEND_USER_ATTR_BROKER) , JSON.parse(process.env.REACT_APP_BACKEND_USER_ATTR_REALTOR))
  },
  user_first_name_error: "",
  user_last_name_error: "",
  user_email_error: "",
  user_phone_number_error: "",
  user_company_name_error: "",
  user_company_phone_error: "",
  user_address_error: "",
  user_broker_error: "",
  user_realtor_error: "",
  user_password_error: "",
  user_confirm_password_error: "",
}
export default class Profile extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
  }
	constructor(props){
    super(props);
    this.state = initial_state;
  }
  componentDidMount () {
    this._isMounted = true;
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
      if (this._isMounted){
        if (result.status === 200){
          this.setState({
            user_image: result.user.user_image
          });
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
            city: result.user.city,
            state: result.user.state,
            broker_licence: result.user.broker_licence,
            realtor_licence: result.user.realtor_licence,
            type_attributes: result.user.type_attributes ? result.user.type_attributes : Object.assign(JSON.parse(process.env.REACT_APP_BACKEND_USER_ATTR_BROKER) , JSON.parse(process.env.REACT_APP_BACKEND_USER_ATTR_REALTOR))
            }
          });
          if (result.is_verified === false){
            this.props.history.push("/verify");
          }
        }else {
          this.setState({
            variant: "danger",
            message: result.message
          });
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);
        }
        this.checkBrokerRealtor()
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
          type_attributes: result.user.type_attributes
          }
        });
        this.setState({
          variant: "success",
          message: result.message
        });
      }else {
        this.setState({message: result.message,
        variant: "danger"});
      }
      this.clearMessageTimeout = setTimeout(() => {
        this.setState(() => ({message: ""}))
      }, 2000);
		}, (error) => {
		});
  }

  submitHandler = (event) => {
		event.preventDefault();
    let formIsValid = this.checkFormValidation();
    if (formIsValid){
      this.submitForm()
    }
  }

  checkFormValidation = () => {
    let user_first_name_error = "";
    let user_last_name_error = "";
    let user_email_error = "";
    let user_phone_number_error = "";
    let user_company_name_error = "";
    let user_company_phone_error = "";
    let user_address_error = "";
    let user_broker_error = "";
    let user_realtor_error = "";
    let user_confirm_password_error = "";
    let user_password_error = "";
    if (this.state.user.first_name === ""){
      user_first_name_error = "First name can't be blank!"
    }
    if (this.state.user.last_name === ""){
      user_last_name_error = "Last name can't be blank!"
    }
    if (this.state.user.phone_number === ""){
      user_phone_number_error = "Phone number can't be blank!"
    }else if (isNaN(this.state.user.phone_number)) {
      user_phone_number_error = "Phone should be Numeric"
    }else if (this.state.user.phone_number.length < 10){
      user_phone_number_error = "Phone number length is small."
    }else if (this.state.user.phone_number.length > 10) {
      user_phone_number_error = "Phone number length is too large."
    }
    if (this.state.user.email === ""){
      user_email_error = "Email can't be blank!"
    }else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.user.email)))
    {
      user_email_error = "Invalid email!"
    }
    if (this.state.user.confirm_password !== this.state.user.password) {
      user_confirm_password_error = "Confirm Password is not matching new password!"
    }

    if (this.state.user.password !== "") {
      if (this.state.user.password.length < 6){
        user_password_error = "Password is too short!"
      }
    }
    if (!(document.getElementById('realtor_licence_div').classList.contains("d-none"))){
      if ((this.state.user.realtor_licence === "") || (this.state.user.realtor_licence === null)){
        user_realtor_error = "Realtor license no. can't be blank!"
      }
    }
    if (!(document.getElementById('broker_licence_div').classList.contains("d-none"))){
      if ((this.state.user.broker_licence === "") || ((this.state.user.broker_licence === null))){
        user_broker_error = "Broker license no. can't be blank!"
      }
    }
    this.setState({
      user_first_name_error,
      user_last_name_error,
      user_email_error,
      user_phone_number_error,
      user_company_name_error,
      user_company_phone_error,
      user_address_error,
      user_broker_error,
      user_realtor_error,
      user_confirm_password_error,
      user_password_error
    },function () {
      if (user_first_name_error !== "" || user_last_name_error !== "" || user_phone_number_error !== "" || user_email_error !== "" || user_company_name_error !== "" || user_company_phone_error !== "" || user_address_error !== "" || user_confirm_password_error !== "" || user_password_error !== "" || user_broker_error !== ""|| user_realtor_error !== "" ){
        return false;
      }else {
        return true;
      }
    });

    if (user_first_name_error !== "" || user_last_name_error !== "" || user_phone_number_error !== "" || user_email_error !== "" || user_company_name_error !== "" || user_company_phone_error !== "" || user_address_error !== "" || user_confirm_password_error !== "" || user_password_error !== ""|| user_broker_error !== "" || user_realtor_error !== "" ){
      this.setState({
        user_first_name_error,
        user_last_name_error,
        user_email_error,
        user_phone_number_error,
        user_company_name_error,
        user_company_phone_error,
        user_address_error,
        user_broker_error,
        user_realtor_error,
        user_confirm_password_error,
        user_password_error
      });
      return false;
    }else {
      return true;
    }
  }

  customCheckFormValidation = (name) => {
    let user_first_name_error = "";
    let user_last_name_error = "";
    let user_email_error = "";
    let user_phone_number_error = "";
    let user_company_name_error = "";
    let user_company_phone_error = "";
    let user_address_error = "";
    let user_broker_error = "";
    let user_realtor_error = "";
    let user_confirm_password_error = "";
    let user_password_error = "";
    if (name === "first_name"){
      if (this.state.user.first_name === ""){
        user_first_name_error = "First name can't be blank!"
      }
      this.setState({
        user_first_name_error
      });
    }else if (name === "last_name"){
      if (this.state.user.last_name === ""){
        user_last_name_error = "Last name can't be blank!"
      }
      this.setState({
        user_last_name_error
      });
    }else if (name === "email") {
      if (this.state.user.email === ""){
        user_email_error = "Email can't be blank!"
      }else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.user.email)))
      {
        user_email_error = "Invalid email!"
      }
      this.setState({
        user_email_error
      });
    }else if (name === "phone_number") {
      if (this.state.user.phone_number === ""){
        user_phone_number_error = "Phone number can't be blank!"
      }else if (isNaN(this.state.user.phone_number)) {
        user_phone_number_error = "Phone should be Numeric"
      }else if (this.state.user.phone_number.length < 10){
        user_phone_number_error = "Phone number length is small."
      }else if (this.state.user.phone_number.length > 10) {
        user_phone_number_error = "Phone number length is too large."
      }
      this.setState({
        user_phone_number_error
      });
    }else if (name === "company_name"){
      this.setState({
        user_company_name_error
      });
    }else if (name === "company_phone"){
      if(this.state.user.company_phone !== ""){
        if (this.state.user.company_phone.length < 10){
          user_company_phone_error = "Phone number length is small."
        }
      }
      this.setState({
        user_company_phone_error
      });
    }else if (name === "realtor_licence"){
      if (!(document.getElementById('realtor_licence_div').classList.contains("d-none"))){
        if (this.state.user.realtor_licence === ""){
          user_realtor_error = "Realtor license no. can't be blank!"
        }
      }
      this.setState({
        user_realtor_error
      });
    }else if (name === "broker_licence"){
      if (!(document.getElementById('broker_licence_div').classList.contains("d-none"))){
        if (this.state.user.broker_licence === ""){
          user_broker_error = "Broker license no. can't be blank!"
        }
      }
      this.setState({
        user_broker_error
      });
    }else if (name === "address"){
      this.setState({
        user_address_error
      });
    }else if (name === "confirm_password") {
      if (this.state.user.confirm_password !== this.state.user.password) {
        user_confirm_password_error = "Confirm Password is not matching new password!"
      }
      this.setState({
        user_confirm_password_error
      });
    }else if (name === "password") {
      if (this.state.user.password !== "") {
        if (this.state.user.password.length < 6){
          user_password_error = "Password is too short!"
        }
      }
      this.setState({
        user_password_error
      });
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
      this.customCheckFormValidation(name);
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

  updateUserAttr = (event) => {
    const name = event.target.name;
    const value = event.target.checked;
    this.setState({
      user: {
      ...this.state.user,
      type_attributes:
        {
        ...this.state.user.type_attributes,
          [name]: value
        }
      }
    },function () {
      this.checkBrokerRealtor();
      this.customCheckFormValidation();
    });
  }

  checkBrokerRealtor = () => {
    let brokerArray = document.getElementsByClassName('broker')
    let broker_licence = "";
    let realtor_licence = "";
    Array.from(brokerArray).forEach((brokerArray) => {
      if(brokerArray.checked){
        document.getElementById('broker_licence_div').classList.remove("d-none");
        broker_licence = "xyz"
      }
    })
    let realtorArray = document.getElementsByClassName('realtor')
    Array.from(realtorArray).forEach((realtorArray) => {
      if(realtorArray.checked){
        document.getElementById('realtor_licence_div').classList.remove("d-none");
        realtor_licence = "xyz"
      }
    })
    if (broker_licence === ""){
      this.setState({
        user: {
        ...this.state.user,
        broker_licence,
        }
      });
    }
    if (realtor_licence === ""){
      this.setState({
        user: {
        ...this.state.user,
        realtor_licence,
        }
      });
    }
  }

  checkBrokerLicence = () => {
    let brokerArray = document.getElementsByClassName('broker')
    let c_name = "form-group d-none"
    Array.from(brokerArray).forEach((brokerArray) => {
      if(brokerArray.checked){
        c_name = "form-group"
      }
    })
    return c_name;
  }
  checkRealtorLicence = () => {
    let realtorArray = document.getElementsByClassName('realtor')
    let c_name = "form-group d-none"
    Array.from(realtorArray).forEach((realtorArray) => {
      if(realtorArray.checked){
        c_name = "form-group"
      }
    })
    return c_name;
  }

  fileSelectHandler = (event) => {
    this.setState({
      user_new_image: event.target.files[0]
    });
  }
  updateImage = (event) => {
    if (this.state.user_new_image){
      event.preventDefault()
      const fd = new FormData();
      fd.append('user_image', this.state.user_new_image, this.state.user_new_image.name)
      let url = process.env.REACT_APP_BACKEND_BASE_URL + "/users/update_image"
      fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": localStorage.getItem("auction_user_token"),
          "Accept": "application/vnd.auction_backend.v1",
          "Access-Control-Allow-Origin": "*",
  				"Access-Control-Allow-Credentials": "*",
  				"Access-Control-Expose-Headers": "*",
  				"Access-Control-Max-Age": "*",
  				"Access-Control-Allow-Methods": "*",
  				"Access-Control-Allow-Headers": "*"
        },
        body: fd
      }).then(res => res.json())
      .then((result)=>{
        if (result.status === 200) {
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);

          this.setState({
            user_image: result.user.user_image,
            message: result.message,
            variant: "success"
          });
        }else {
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);

          this.setState({
            message: result.message,
            variant: "danger"
          });
        }
      },(error) => {

  		})
    }
  }
	render() {
    const brokerCheckBox = Object.keys(JSON.parse(process.env.REACT_APP_BACKEND_USER_ATTR_BROKER)).map((key, index) => {
      return (
        <li key={key}>
          <label>
            <input className="checkbox broker" type="checkbox" checked={this.state.user.type_attributes[key]} name={key} onChange={this.updateUserAttr} onClick={this.checkBrokerRealtor}/>
            &nbsp;
            <span>{key}</span>
          </label>
        </li>
      );
    })
    const realtorCheckBox = Object.keys(JSON.parse(process.env.REACT_APP_BACKEND_USER_ATTR_REALTOR)).map((key, index) => {
      return (
        <li key={key}>
          <label>
            <input className="checkbox realtor" type="checkbox" checked={this.state.user.type_attributes[key]} name={key} onChange={this.updateUserAttr} onClick={this.checkBrokerRealtor}/>
            &nbsp;
            <span>{key}</span>
          </label>
        </li>
      );
    })
		return (
      <div id="myProfile" className="container px-0 tab-pane active">
        <div className="profile-form">
          <div className="profile-form-in">
            <form onSubmit={this.submitHandler}>
              {
                this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
              }
              <div className="row">
                <div className="col-md-4">
                  <div className="upload-profile-pic">
                    <h3>Welcome back,</h3>
                    <img src={this.state.user_image ? this.state.user_image : "images/default-profile-img.png"} alt="user_image"/>
                    <input type="file" name="user_image" onChange={this.fileSelectHandler} accept="image/jpeg, image/jpg, image/png "/>
                    <button onClick={this.updateImage}> Update image </button>
                  </div>
                </div>
                <div className="col-md-8 user-info">
                  <h3>Information</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" value={this.state.user.first_name} onChange={this.updateUser} name="first_name"/>
                        {this.addErrorMessage(this.state.user_first_name_error)}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" value={this.state.user.last_name} onChange={this.updateUser} name="last_name"/>
                        {this.addErrorMessage(this.state.user_last_name_error)}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={this.state.user.email} onChange={this.updateUser} name="email"/>
                        {this.addErrorMessage(this.state.user_email_error)}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control" value={this.state.user.phone_number} onChange={this.updateUser} name="phone_number" maxLength="10" onKeyPress={this.checkNumeric}/>
                        {this.addErrorMessage(this.state.user_phone_number_error)}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" className="form-control" value={this.state.user.company_name ? this.state.user.company_name : ""} onChange={this.updateUser} name="company_name"/>
                        {this.addErrorMessage(this.state.user_company_name_error)}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Company phone</label>
                        <input type="text" className="form-control" value={this.state.user.company_phone ? this.state.user.company_phone : "" } onChange={this.updateUser} name="company_phone" maxLength="10" onKeyPress={this.checkNumeric}/>
                        {this.addErrorMessage(this.state.user_company_phone_error)}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Address</label>
                        <textarea className="form-control" value={this.state.user.address ? this.state.user.address : ""} onChange={this.updateUser} name="address"></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" value={this.state.user.city ? this.state.user.city : ""} onChange={this.updateUser} name="city"/>
                        {this.addErrorMessage(this.state.user_city_error)}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>State</label>
                        <input type="text" className="form-control" value={this.state.user.state ? this.state.user.state : "" } onChange={this.updateUser} name="state" maxLength="10" />
                        {this.addErrorMessage(this.state.user_state_error)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="more-about-you">
                <h3>We'd like to know a little more about you. Tell us about yourself. Select as many as apply: </h3>
                <div className="row">
                  <div className="col-md-8">
                    <div className="about-option">
                      <ul>
                        {brokerCheckBox}
                      </ul>
                      <ul>
                        {realtorCheckBox}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="licence-div">
                        <div className="col-md-10">
                          <div className={this.checkBrokerLicence()} id="broker_licence_div">
                            <label>Broker license #:</label>
                            <input type="text" className="form-control" value={this.state.user.broker_licence ? this.state.user.broker_licence : ""} name="broker_licence" onChange={this.updateUser} autoComplete="false"/>
                            {this.addErrorMessage(this.state.user_broker_error)}
                          </div>
                          <div className={this.checkRealtorLicence()} id="realtor_licence_div">
                            <label>Realtor license #:</label>
                            <input type="text" className="form-control" value={this.state.user.realtor_licence ? this.state.user.realtor_licence : ""} name="realtor_licence" onChange={this.updateUser} autoComplete="false"/>
                            {this.addErrorMessage(this.state.user_realtor_error)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="change-pwd-profile">
                  <h3>Change Password</h3>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Old Password</label>
                        <input type="password" className="form-control" name="old_password" onChange={this.updateUser} autoComplete="new-password"/>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>New Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.updateUser} autoComplete="new-password"/>
                        {this.addErrorMessage(this.state.user_password_error)}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" className="form-control" name="confirm_password" onChange={this.updateUser} autoComplete="new-password"/>
                        {this.addErrorMessage(this.state.user_confirm_password_error)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10">
                    <button type="Submit" className="red-btn update-pwd-btn"> Update profile </button>
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