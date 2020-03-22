import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import Alert from 'react-bootstrap/Alert';
import 'react-quill/dist/quill.snow.css';

export default class EmailSystem extends Component{
  _isMounted = false
  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', {'color': []}, {'background': []}],
      ['clean']
    ],
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getPropertiesListTimeout);
  }
	constructor(props){
    super(props);
    this.state = {
      test_modal: false,
      email_error: "",
      test_email: "",
      message: "",
      isLoaded: false,
      selected_template: "",
      templates: [],
      search_str: "",
      template_body: "",
      template_title: "",
      template_subject: "",
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
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/mailer_templates?search_str=" + this.state.search_str
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
          template_subject: this.state.templates[this.state.selected_template].subject,
        })
      }
      if(name === "test_email"){
        if (this.state.test_email === "" || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(this.state.test_email))){
          this.setState({
            email_error: "Invalid email!"
          })
          return false
        }else {
          this.setState({
            email_error: ""
          })
        }
      }
    });
  }


  hideModal =() => {
    this.setState({
      test_modal: false,
      message: "",
      variant: "",
      test_email: "",
      editor_modal: false,
      selected_template: "",
      template_id: "",
      template_body: "",
      template_title: "",
      template_subject: "",
    })
  }

  openTestEmailModal = () => {
    this.setState({
      test_modal: true,
      test_email: "rajan.beryls@gmail.com",
    })
  }

  openEditorModal = () => {
    if (this.state.selected_template !== ""){
      this.setState({
        editor_modal: true ,
      })
    }
  }

  updateTemplateBody = (content) => {
    this.setState({
      template_body: content,
    })
  }

  sendMailerTemplate = () => {
    if (this.state.email_error){
      return false
    }
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/test/mailer_templates/"+this.state.template_id
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
      body: JSON.stringify({email: this.state.test_email})
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

  updateMailerTemplate = () => {

    this.setState({
      isLoaded: false ,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/mailer_templates/"+this.state.template_id
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
  addErrorClass = (msg) => {
    if (msg === ""){
      return ""
    }else {
      return "error-class"
    }
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
          {template.subject}
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
                      <button className="btn red-btn admin-btns" type="button" onClick={this.openTestEmailModal}>Test</button>
                    </div>
                  </div>
                  <div className="under_review admin-review loading-spinner-parent">
                    <table className="table table-bordered table-hover email_system_table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Email Type</th>
                          <th>Email Subject</th>
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
                <input type="text" className="form-control" name="template_title" placeholder="Title" value={this.state.template_title} onChange={this.updateSelectedTemplate}/>
                <input type="text" className="form-control mt-2" name="template_subject" placeholder="Subject" value={this.state.template_subject} readOnly/>
                <div className="mt-2">
                <ReactQuill
                  theme="snow"
                  value={this.state.template_body}
                  onChange={this.updateTemplateBody}
                  modules={this.modules}

                  />

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
                  <h5 className="mb-0 text-uppercase"> Test Template</h5>
                </div>
              </Modal.Header>
              <div className="modal-body">
                {
                  this.state.message ? <Alert variant={this.state.variant}>{this.state.message}</Alert> : null
                }
                <input type="text" className={"form-control "+ this.addErrorClass(this.state.email_error)} name="test_email" placeholder="Test Email" value={this.state.test_email} onChange={this.updateSelectedTemplate}/>

                <div className="col-md-12 text-center mt-3">
                  <span className="error"></span>
                  <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.sendMailerTemplate}>Send</button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
	}
}
