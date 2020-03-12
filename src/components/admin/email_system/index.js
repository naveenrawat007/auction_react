import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import jquery from 'jquery';
import 'bootstrap'
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
window.jQuery = jquery;
window.jquery = jquery;
window.$ = jquery;
// import 'react-summernote/lang/summernote-ru-RU';

export default class EmailSystem extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getPropertiesListTimeout);
  }
	constructor(props){
    super(props);
    this.state = {
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
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/mailer_templates"
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
      this.setState({
        template_id: this.state.templates[this.state.selected_template].id,
        template_body: this.state.templates[this.state.selected_template].body,
        template_title: this.state.templates[this.state.selected_template].title,
        template_subject: this.state.templates[this.state.selected_template].subject,
      })
    });
  }

  hideModal =() => {
    this.setState({
      editor_modal: false,
      selected_template: "",
      template_id: "",
      template_body: "",
      template_title: "",
      template_subject: "",
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
    console.log(content);
    this.setState({
      template_body: content,
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
      body: JSON.stringify({template: {body: this.state.template_body}})
    }).then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        if (result.status === 200){
          this.hideModal();
          this.getTemplatesList();
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
                      <button className="btn red-btn admin-btns" type="button" onClick={this.openEditorModal}>View</button>&nbsp;
                      <button className="btn red-btn admin-btns" type="button">Edit</button>&nbsp;
                      <button className="btn red-btn admin-btns" type="button">Control</button>
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
                <input type="text" className="form-control" name="template_title" placeholder="Title" value={this.state.template_title} onChange={this.updateSelectedTemplate} readOnly/>
                <input type="text" className="form-control mt-2" name="template_subject" placeholder="Subject" value={this.state.template_subject} readOnly/>
                <div className="mt-2">
                {console.log(this.state.template_body)}
                  <ReactSummernote
                    value={this.state.template_body}
                    options={{
                      lang: 'en-EN',
                      height: 350,
                      dialogsInBody: true,
                      toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['specialchars']],
                        ['view', ['fullscreen', 'codeview']]
                      ]
                    }}
                    onChange={this.updateTemplateBody}
                  />
                </div>
                <div className="col-md-12 text-center mt-3">
                  <span className="error"></span>
                  <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.updateMailerTemplate}>Save</button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
	}
}
