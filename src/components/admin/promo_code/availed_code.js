import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';

export default class AvailedCodeList extends Component{
  _isMounted = false
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.clearMessageTimeout);
    clearTimeout(this.getPropertiesListTimeout);
  }
	constructor(props){
    super(props);
    this.state = {
      error: "",
      message: "",
      selected_promo_code: "",
      generated_promo_code: '',
      isLoaded: false,
      promo_codes: [],
      search_str: "",
      current_page: 1,
      total_pages: 1,
      page: 1,
      total_pages_array:[],
      promo_modal: false,
    }
  }
  componentDidMount () {
    this._isMounted = true;
    this.getPromoCodeList();
  }
  getPromoCodeList = () => {
    this.setState({
      isLoaded: false,
    });
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/promo_codes?status=true&search_str=" + this.state.search_str + "&page=" + this.state.page
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
            promo_codes: result.promo_codes,
            current_page : result.meta.current_page,
            total_pages : result.meta.total_pages,
          });
          let items = []
          for (let number = 1; number <= this.state.total_pages; number++) {
            items.push(number)
          }
          this.setState({
            total_pages_array: items,
          });
          window.scroll(0,0);
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
      clearTimeout(this.getPropertiesListTimeout);
      this.getPropertiesListTimeout = setTimeout(() => {
        this.getPromoCodeList();
      }, 500);
    });
  }
  refreshList = (event) => {
    let page_number = event.target.getAttribute("page_number")
    this.setState({
      page: page_number
    }, function () {
      if (parseInt(this.state.page) !== parseInt(this.state.current_page) ){
        this.getPromoCodeList();
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
  updateSelectedPromo = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function () {
    });
  }
  generateCode = () => {
    this.setState({
      isLoaded: false
    })
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/admin/promo_codes"
  	fetch(url ,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
        "Authorization": localStorage.getItem("auction_admin_token"),
        "Accept": "application/vnd.auction_backend.v1",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
			}
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        this.setState({
          promo_modal: true,
          isLoaded: true,
          generated_promo_code: result.promo_code,
        });
        this.getPromoCodeList()
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }else {
        this.setState({
          isLoaded: true,
          message: result.message,
          variant: 'danger',
        });
      }
      this.clearMessageTimeout = setTimeout(() => {
        if (this._isMounted){
          this.setState(() => ({message: ""}))
        }
      }, 2000);
		}, (error) => {
    });
  }
  copyPromo = () => {
    this.code.select();
    document.execCommand('copy');
    this.setState({
      promo_modal: false
    })
  }

  hidePromo = () => {
    this.setState({
      promo_modal: false
    })
  }

	render() {
    const current_page = this.state.current_page;
    const total_pages = this.state.total_pages;
    const promoCodeList = this.state.promo_codes.map((promo_code, index) => {
      return (
        <tr key={index}>
          <td><input type="radio" value={index} id={index} checked={this.state.selected_promo_code === String(index) ? true : false} name="selected_promo_code" onChange={this.updateSelectedPromo}/></td>
          <td><p>{promo_code.promo_code }</p></td>
          <td>{String(promo_code.availed)}</td>
        </tr>
      );
    })
    const pagination = this.state.total_pages_array.map((page, index) => {
      return (
        <button className={this.checkActiveClass(page, current_page)} key={index} onClick={this.refreshList} page_number={page}>{page}</button>
      );
    })
    const prev_page = <> <button className="pagination-btn btn" onClick={this.refreshList} page_number={this.getPreviousPage(current_page)}>Prev</button> </>
    const next_page = <> <button className="pagination-btn btn" onClick={this.refreshList} page_number={this.getNextPage(current_page, total_pages)}>Next</button> </>

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
                    <div className="col-md-5 offset-md-2 px-0 text-right">
                      <button className="btn red-btn admin-btns" type="button" >View</button>
                      &nbsp;
                      <button className="btn red-btn admin-btns" type="button" onClick={this.generateCode}>Generate Promo Code</button>
                    </div>
                  </div>
                  <div className="under_review admin-review loading-spinner-parent">
                    <table className="table table-bordered table-hover review_table property_table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Promo Code</th>
                          <th>Status</th>
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
                      <table className="table table-bordered table-hover review_table property_table">
                        <tbody>
                          {promoCodeList}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-12 text-center my-3">
                    {prev_page}{pagination}{next_page}
                  </div>
                </div>
              </div>
            </div>
              <Modal className="promo_copy" show={this.state.promo_modal} onHide={this.hidePromo}>
                <Modal.Header className="justify-content-center border-0">
                  <Modal.Title>REEDEM PROMO CODE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input type="text" readOnly className="form-control" ref={code => {this.code = code}} value={this.state.generated_promo_code} />
                  <div className="col-md-12 text-center">
                    <button className="btn red-btn my-3" onClick={this.copyPromo}>Copy</button>
                  </div>
                </Modal.Body>
              </Modal>
          </div>
        </div>
      </div>
    );
	}
}
