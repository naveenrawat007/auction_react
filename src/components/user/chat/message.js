import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faPhone, faPlus, faMicrophone, faCamera} from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faSmile} from '@fortawesome/free-regular-svg-icons'
import ChatConnection from './ChatConnection.js'
export default class Message extends Component{
  _isMounted = false
	constructor(props){
    super(props);
    this.state = {
      current_user_id: this.props.user_id,
      room_id: this.props.chat_room.id,
      name: this.props.chat_room.name,
      property_name: this.props.chat_room.property_name,
      owner_name: this.props.chat_room.owner_name,
      owner_img: this.props.chat_room.owner_img,
      messages: [],
    }
  }

  componentDidMount () {
    this._isMounted = true
    // const ch = new ChatConnection("2", ()=>{console.log(1)})
    // ch.openNewRoom(2)
    // setTimeout(()=>{
    //   ch.talk("new message", 2)
    // }, 3000)
    this.getMessages();
  }

  getMessages = () => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/user/chat_rooms/"+this.state.room_id+"/messages"
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
            isLoaded: true,
            messages: result.messages
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

	render() {
    const messages = this.state.messages.map((message, index)=>{
      if (message.user_id !== this.state.current_user_id){
        return(
          <div key={index} className="row user-row mx-0 py-2 px-3">
            <div className="col-md-1 px-0">
              <div className="user_img">
                <div className="border_img">
                  <img src={message.user_image ? message.user_image : "/images/profile.png"} alt="profile"/>
                </div>
                <p className="time_text">{message.created_at}</p>
              </div>
            </div>
            <div className="col-md-11 px-0">
              <div className="user_data">
                <div className="user_time">
                  <h6 className="mb-1">{message.user_name}</h6>
                </div>
                <p className="mb-0">{message.content}</p>
              </div>
            </div>
          </div>
        )
      }
      else {
        return (
          <div key={index} className="col-md-12 text-right px-0">
            <div className="user_data admin_send">
              <p className="mb-0">{message.content}</p>
            </div>
            <p className="time_text mt-0">{message.created_at}</p>
          </div>
        );
      }
    })
    return (
      <div className="col-md-10 px-0 right-chatbox">
        <div className="chat-body">
          <div className="chat-head">
            <div className="heading_left">
              <h5 className="font-red">{this.state.property_name}</h5>
              <p className="mb-0">{this.state.owner_name}</p>
            </div>
            <div className="chat-icon">
              <div className="icon_box">
                <a href="">
                  <FontAwesomeIcon icon={faVideo} />
                </a>
              </div>
              <div className="icon_box">
                <a href="">
                  <FontAwesomeIcon icon={faPhone} />
                </a>
              </div>
            </div>
          </div>
          <div className="chat-data">
            {messages}
          </div>
          <div className="chat-footer">
            <div className="col-md-12 px-0 row mx-0 align-items-center">
              <div className="col-md-1 px-0 text-center">
                <div className="main_form_add">
                  <a href="#"><FontAwesomeIcon icon={faPlus} /></a>
                </div>
              </div>
              <div className="input-group main_form_input col-md-9 px-0">
                <input type="text" className="form-control border-right-0" aria-label="" placeholder="Type a message.."/>
                <div className="input-group-append">
                  <span className="input-group-text group-box-chat border-left-0">
                    <a href="#">
                      <i className="fa fa-smile-o"></i>
                      <FontAwesomeIcon icon={faSmile} />
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-md-1 pl-3 pr-1 text-center">
                <a href="">
                  <i className="fa fa-microphone"></i>
                  <FontAwesomeIcon icon={faMicrophone} color={"#818078"} />
                </a>
              </div>
              <div className="col-md-1 px-1 text-center">
                <a href=""><FontAwesomeIcon icon={faCamera} color={"#818078"} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
