import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Message from './message.js';


export default class ChatList extends Component{
	constructor(props){
    super(props);
		this.state = {
      loaded: false,
			chat_rooms_available: null,
      error: "",
      message: "",
    	user_id: "",
    	selected_chat_room: this.props.location ? (this.props.location.state ? this.props.location.state.chat_room : "") : "",
    	chat_rooms: [],
      search_str: "",
      current_page: 1,
      total_pages: 1,
      page: 1,
      total_pages_array:[],
    };
  }

  componentDidMount () {
	  this._isMounted = true;
		this.getChatRoomsList();
  }
	componentWillUnmount () {
		clearTimeout(this.getChatRoomListTimeout);
	}
	getChatRoomsList = () => {
		let url = process.env.REACT_APP_BACKEND_BASE_URL + "/user/chat_rooms?search_str=" + this.state.search_str + "&page=" + this.state.page
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
						user_id: result.user_id,
            isLoaded: true,
            chat_rooms: result.chat_rooms,
						chat_rooms_available: ((this.state.chat_rooms_available == null) ? ((result.chat_rooms.length > 0) ? true : null) : this.state.chat_rooms_available),
            selected_chat_room: this.state.selected_chat_room ? this.state.selected_chat_room : result.chat_rooms[0],
            current_page : result.meta.current_page,
            total_pages : result.meta.total_pages,
          });
          let items = []
          window.scrollTo(0,0)
          for (let number = 1; number <= this.state.total_pages; number++) {
            items.push(number)
          }
          this.setState({
            total_pages_array: items,
          });
        }else if (result.status === 401) {
          localStorage.removeItem("auction_user_token");
          window.location.href = "/login"
        }else {
          this.setState({
            isLoaded: true,
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
	updateSelectedChatRoom = (chat_room) => {
    // console.log(chat_room);
		this.setState({
		  selected_chat_room: chat_room,
		});
	}
	updateSearchField = (event) => {
		const{ name, value } = event.target;
    this.setState({
      [name]: value
    }, function functionName() {
      clearTimeout(this.getChatRoomListTimeout);
      this.getChatRoomListTimeout = setTimeout(() => {
        this.getChatRoomsList();
      }, 500);
    });
	}

	render() {
		const chat_room_list = this.state.chat_rooms.map((chat_room, index)=>{
			return (
				<li key={index} className={(chat_room.id === this.state.selected_chat_room.id) ? "active" : null }>
					<Link to="#" onClick={() => {this.updateSelectedChatRoom(chat_room)}} >
						<div className="border_user">
							<img src={chat_room.owner_image ? chat_room.owner_image : "/images/profile.png"} alt="profile"/>
						</div>
						<div className="active-main">
							<h5>{chat_room.property_name}</h5>
							<h6>{chat_room.owner_name}</h6>
						</div>
					</Link>
				</li>
			);
		})
    return (
      <div className="profile-form">
        <div className="profile-form-in p-0">
          <div className="profile-setting mt-0">
            <div className="container custom_container px-0">
              <div className="row mx-0 profile_row">
								{
									(this.state.chat_rooms_available === null) ?
										<div className="no-chatrooms">
											<p>
												No Chat Room Available.
											</p>
										</div>
									:
									<>
										<div className=" col-md-2 px-0 left-chatbox">
											<div className="chat-side">
												<div className="chat-side-head">
													<div className="input-group mb-0">
														<div className="input-group-prepend">
															<div className="input-group-text">
																<FontAwesomeIcon icon={faSearch} />
															</div>
														</div>
														<input type="text" className="form-control" id="inlineFormInputGroup" name="search_str" placeholder="Search" onChange={this.updateSearchField}/>
													</div>
												</div>
												<ul className="list-unstyled users_list">
													{chat_room_list}
												</ul>
											</div>
										</div>
										{this.state.selected_chat_room ?
											<Message chat_room={this.state.selected_chat_room} user_id={this.state.user_id}/>
										:
											null
										}
									</>
								}
							</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
