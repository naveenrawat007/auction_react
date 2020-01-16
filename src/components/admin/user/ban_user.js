import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const initial_state = {
  status_modal: false,
  selected_user: "",
  selected_status: "",
  user_status_options: [],
  error: "",
  message: "",
  isLoaded: false,
  selected_user_token: "",
  users: [],
  search_str: "",
  current_page: 1,
  total_pages: 1,
  page: 1,
  total_pages_array:[]
}


export default class BanUserList extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getUsersListTimeout);
  }
	constructor(props){
    super(props);
    this.state = initial_state;
  }

  getUsersList = () => {
    this.setState({
      isLoaded: false ,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/users?status=Ban&search_str=" + this.state.search_str + "&page=" + this.state.page
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
            users: result.users,
            selected_user: "",
            status_modal: false,
            current_page : result.meta.current_page,
            total_pages : result.meta.total_pages,
            user_status_options: result.statuses,
          });
          let items = []
          for (let number = 1; number <= this.state.total_pages; number++) {
            items.push(number)
          }
          this.setState({
            total_pages_array: items,
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
  componentDidMount () {
    this._isMounted = true;
    this.getUsersList();

  }

  searchHandler = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function functionName() {
      clearTimeout(this.getUsersListTimeout);
      this.getUsersListTimeout = setTimeout(() => {
        this.getUsersList();
      }, 500);
    });
  }
  refreshList = (event) => {
    let page_number = event.target.getAttribute("page_number")
    this.setState({
      page: page_number
    }, function () {
      if (parseInt(this.state.page) !== parseInt(this.state.current_page) ){
        this.getUsersList();
      }
    });
  }

  checkActiveClass = (number, current_page) => {
    if (number === current_page ){
      return("pagination-btn btn active");
    }else{
      return("pagination-btn btn");
    }
  }

  getPreviousPage = (current_page) => {
    if (current_page <= 1){
      return ("1");
    }else{
      return (current_page - 1);
    }
  }
  getNextPage = (current_page, total_pages) => {
    if (current_page < total_pages){
      return (current_page + 1);
    }else{
      return (total_pages);
    }
  }
  viewUser = () => {
    if (this.state.selected_user_token){
      localStorage.setItem("auction_user_token", this.state.selected_user_token );
      window.open("/user/", "_blank")
    }
  }
  updateSelectedUser = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function () {
      this.setState({
        selected_user_token: this.state.users[this.state.selected_user].token ,
        selected_status: this.state.users[this.state.selected_user].status,
      });
    });
  }
  updateStatus = () => {
    this.setState({
      isLoaded: false,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/users/status"
    const fd = new FormData();
    fd.append('user[id]', this.state.users[this.state.selected_user].id)
    fd.append('user[status]', this.state.selected_status)
    fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": localStorage.getItem("auction_admin_token"),
        "Accept": "application/vnd.auction_backend.v1",
        "Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*"
      },
      body: fd,
    }).then(res => res.json())
    .then((result) => {
      if (this._isMounted){
        this.getUsersList();
        if (result.status === 200){
          this.setState({
            message: result.message,
            variant: "success"
          });
          this.clearMessageTimeout = setTimeout(() => {
            this.setState(() => ({message: ""}))
          }, 2000);
        }
      }
    })
  }
  updateSelectedStatus = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  hideModal = () => {
    this.setState({
      status_modal: false,
      // selected_status: "",
    });
  }

  openStatusModal = () => {
    this.setState({
      status_modal: true
    });
  }


	render() {
    const current_page = this.state.current_page;
    const total_pages = this.state.total_pages;
    const userList = this.state.users.map((user, index) => {
      return (
        <tr key={index}>
          <td><input type="radio" value={index} id={index} checked={this.state.selected_user === String(index) ? true : false} name="selected_user" onChange={this.updateSelectedUser}/></td>
          <td>
            <div className="user_name_box">
              <span>{user.first_name[0].toUpperCase()}</span>
              <p>{user.first_name + " "+ user.last_name}</p>
            </div>
          </td>
          <td>{String(user.is_verified)}</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>No</td>
          <td>{user.phone_number}</td>
          <td>{user.email}</td>
        </tr>
      );
    })
    const status_array = this.state.user_status_options.map((status, index) => {
      return(
        <li className="list-inline-item" key={index}>
          <div className="custom-control custom-radio">
            {
              this.state.selected_user === ""
                ?
                  null
                :
                <>
                  <input type="radio" name="selected_status" value={status} checked={this.state.selected_status === status} id={index+this.state.users.length} className="custom-control-input" onChange={this.updateSelectedStatus} />
                  <label className="custom-control-label" htmlFor={index+this.state.users.length} >{status}</label>
                </>
            }
          </div>
        </li>
      )
    })
    const pagination = this.state.total_pages_array.map((page, index) => {
      return (
        <button className={this.checkActiveClass(page, current_page)} key={index} onClick={this.refreshList} page_number={page}>{page}</button>
      );
    })
    const prev_page = <> <button className="pagination-btn btn" onClick={this.refreshList} page_number={this.getPreviousPage(current_page)}>Prev</button> </>
    const next_page = <> <button className="pagination-btn btn" onClick={this.refreshList} page_number={this.getNextPage(current_page, total_pages)}>Next</button> </>
		return (
      <div id="allUser" className="container tab-container px-0 tab-pane active">
        <div className="profile-form">
          <div className="profile-form-in prop-bind">
            <div className="search-box row mx-0 pb-3">
              <div className="col-md-5 px-0">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" name="search_str" onChange={this.searchHandler}/>
                  <div className="input-group-append">
                    <span className="input-group-text red-btn" id="basic-addon1">
                      <FontAwesomeIcon icon={faSearch} size="1x" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-5 offset-md-2 px-0 text-right">
                <button className="btn red-btn admin-btns" type="button" onClick={this.viewUser}>View</button>
                &nbsp;
                <button className="btn red-btn admin-btns" type="button" onClick={this.viewUser}>Edit</button>
                &nbsp;
                <button className="btn red-btn admin-btns" type="button" onClick={this.openStatusModal}>Control</button>
              </div>
            </div>
            <div className="under_review admin-review loading-spinner-parent">
              <table className="table table-bordered table-hover review_table alluser_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>User Status</th>
                    <th>Subscription</th>
                    <th>Expiration</th>
                    <th>Promo Code</th>
                    <th>User Number</th>
                    <th>User Email</th>
                  </tr>
                </thead>
              </table>
              {this.state.isLoaded === true ?
                null
              :
              <div className="spinner_main">
                <div className="spinner-grow" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              }
              <div className="under_review_list">
                <table className="table table-bordered table-hover review_table alluser_table">
                  <tbody>
                    {userList}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-12 text-center my-3">
              {prev_page}{pagination}{next_page}
            </div>
          </div>
        </div>
        <Modal className="status_modal" show={this.state.status_modal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <div className=" offset-md-1 col-md-10 text-center">
              <h5 className="mb-0 text-uppercase"> { this.state.selected_user === "" ? "Please select User" : ("Status for " + this.state.users[this.state.selected_user].first_name + this.state.users[this.state.selected_user].last_name )}</h5>
            </div>
          </Modal.Header>
          <div className="modal-body">
            {this.state.selected_user === ""
              ?
                null
              :

              <div className="row mx-0">
                <div className="col-md-6 px-0">
                  <div className="status-list">
                    <ul className="list-inline">
                      <form>
                        {status_array}
                      </form>
                    </ul>
                  </div>
                </div>
              </div>
            }
            <div className="col-md-12 text-center mt-3">
              <span className="error"></span>
              <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.updateStatus}>Save</button>
            </div>
          </div>
        </Modal>
      </div>
    );
	}
}
