import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from 'react-bootstrap/Alert';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class TextSystem extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getPropertiesListTimeout);
  }
	constructor(props){
    super(props);
    this.state = {
      test_modal: false,
      test_number: "",
      number_error: "",
      message: "",
      isLoaded: false,
      selected_template: "",
      templates: [],
      search_str: "",
      template_body: "",
      template_title: "",
      editor_modal: false,
    }
  }
  componentDidMount () {
    this._isMounted = true;
    this.getTemplatesList();
  }
  getTemplatesList = () => {
    this.setState({
      isLoaded: false ,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/message_templates?search_str=" + this.state.search_str
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_admin_token"),
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
            isLoaded: true,
            templates: result.templates,
          });
        }else if (result.status === 401) {
          localStorage.removeItem("auction_admin_token");
          window.location.href = "/login"
        }else {
          this.setState({
            variant: "danger",
            message: result.message
          });
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);
        }
      }
    })
  }
  updateSelectedTemplate = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function () {
      if(name === "selected_template"){
        this.setState({
          template_id: this.state.templates[this.state.selected_template].id,
          template_body: this.state.templates[this.state.selected_template].body,
          template_title: this.state.templates[this.state.selected_template].title,
        })
      }
      if(name === "test_number"){
        if (this.state.test_number === "" || isNaN(this.state.test_number) || this.state.test_number.length !== 10){
          console.log(124566);
          this.setState({
            number_error : "Phone number Error."
          })
        }
        else {
          this.setState({
            number_error: "",
          })
        }
      }
    });
  }

  addErrorClass = (msg) => {
    if (msg === ""){
      return ""
    }else {
      return "error-class"
    }
  }

  hideModal =() => {
    this.setState({
      test_modal: false,
      message: "",
      test_number: "",
      editor_modal: false,
      selected_template: "",
      template_id: "",
      template_body: "",
      template_title: "",
    })
  }

  openEditorModal = () => {
    if (this.state.selected_template !== ""){
      this.setState({
        editor_modal: true ,
      })
    }
  }

  openTestMessageModal = () => {
    this.setState({
      test_modal: true,
      test_number: "",
    })
  }

  checkNumericInt = (e) => {
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

  sendMessageTemplate = () => {
    if (this.state.number_error){
      return false
    }
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/test/message_templates/"+this.state.template_id
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_admin_token"),
        "Accept": "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({number: this.state.test_number})
    }).then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 200){
          this.setState({
            message: result.message,
            variant: "success"
          });
          setTimeout(() => {
            this.hideModal();
            this.getTemplatesList();
          }, 2000);
        }else if (result.status === 401) {
          localStorage.removeItem("auction_admin_token");
          window.location.href = "/login"
        }else {
          this.setState({
            variant: "danger",
            message: result.message
          });
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);
        }
      }
    })
  }
  updateTemplateBody = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  updateMailerTemplate = () => {

    this.setState({
      isLoaded: false ,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/message_templates/"+this.state.template_id
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_admin_token"),
        "Accept": "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({template: {body: this.state.template_body, title: this.state.template_title}})
    }).then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 200){
          this.setState({
            message: result.message,
            variant: "success"
          });
          setTimeout(() => {
            this.hideModal();
            this.getTemplatesList();
          }, 2000);
        }else if (result.status === 401) {
          localStorage.removeItem("auction_admin_token");
          window.location.href = "/login"
        }else {
          this.setState({
            variant: "danger",
            message: result.message
          });
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);
        }
      }
    })
  }

  searchHandler = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function functionName() {
      clearTimeout(this.getTemplatesListTimeout);
      this.getTemplatesListTimeout = setTimeout(() => {
        this.getTemplatesList();
      }, 500);
    });
  }

	render() {
    const templates_list = this.state.templates.map((template, index)=>{
      return (<tr key={index}>
        <td>
          <input type="radio" value={index} id={index} checked={this.state.selected_template === String(index) ? true : false} name="selected_template" onChange={this.updateSelectedTemplate}/>
        </td>
        <td>
          {template.title}
        </td>
        <td>
          {template.body.length > 80 ?
            <>

              {template.body.substring(0, 80)}...&nbsp;
            </>
          :
          <>
            {template.body}
          </>
          }
        </td>
      </tr>)
    })
		return (
      <div id="propertyStatus" className="container tab-container px-0">
        <div className="profile-form">
          <div className="prop-bind">
            <div id="underReview" className="container tab-container px-0 active">
              <div className="profile-form">
                <div className="profile-form-in prop-bind">
                  <div className="search-box row mx-0 pb-3">
                    <div className="col-md-4 px-0">
                      <div className="input-group">
                        <input type="text" name="search_str" onChange={this.searchHandler} className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1"/>
                        <div className="input-group-append">
                          <span className="input-group-text red-btn" id="basic-addon1">
                            <FontAwesomeIcon icon={faSearch} size="1x" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 offset-md-3 px-0 text-right">
                      <button className="btn red-btn admin-btns" type="button" onClick={this.openEditorModal}>Edit</button>&nbsp;
                      <button className="btn red-btn admin-btns" type="button" onClick={this.openTestMessageModal}>Test Message</button>
                    </div>
                  </div>
                  <div className="under_review admin-review loading-spinner-parent">
                    <table className="table table-bordered table-hover email_system_table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Message Type</th>
                          <th>Message Body</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="under_review_list">
                      <table className="table table-bordered table-hover email_system_table">
                        <tbody>
                        {templates_list}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-12 text-center my-3">

                  </div>
                </div>
              </div>
            </div>
            <Modal className="status_modal" show={this.state.editor_modal} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <div className=" offset-md-1 col-md-10 text-center">
                  <h5 className="mb-0 text-uppercase"> Edit Template</h5>
                </div>
              </Modal.Header>
              <div className="modal-body">
                {
                  this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
                }
                <input type="text" className="form-control" name="template_title" placeholder="Title" value={this.state.template_title} onChange={this.updateSelectedTemplate} />
                <div className="mt-2">
                  <textarea className="form-control textarea-resize " rows="10" name="template_body" onChange={this.updateTemplateBody} value={this.state.template_body}></textarea>
                </div>
                <div className="col-md-12 text-center mt-3">
                  <span className="error"></span>
                  <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.updateMailerTemplate}>Save</button>
                </div>
              </div>
            </Modal>
            <Modal className="status_modal" show={this.state.test_modal} onHide={this.hideModal} centered>
              <Modal.Header closeButton>
                <div className=" offset-md-1 col-md-10 text-center">
                  <h5 className="mb-0 text-uppercase"> { this.state.template_id ? "Test Template" : "Please select Template"}</h5>
                </div>
              </Modal.Header>
              <div className="modal-body">
                {
                  this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
                }
                { this.state.template_id ? null : "Please select Template first."}
                {
                  this.state.template_id ?
                  <input type="text" maxLength="10" className={"form-control "+ this.addErrorClass(this.state.number_error)} name="test_number" placeholder="Enter Test number" value={this.state.test_number} onChange={this.updateSelectedTemplate} onKeyPress={this.checkNumericInt}/>
                  :
                  <input type="text" className={"form-control "+ this.addErrorClass(this.state.number_error)} name="test_number" placeholder="Enter Test number" value={this.state.test_number} onChange={this.updateSelectedTemplate} readOnly/>
                }
                {
                  this.state.template_id ?
                  <div className="col-md-12 text-center mt-3">
                    <span className="error"></span>
                    <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.sendMessageTemplate}>Send</button>
                  </div>
                  :
                  <div className="col-md-12 text-center mt-3">
                    <span className="error"></span>
                    <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.hideModal}>Close</button>
                  </div>
                }
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
	}
}
