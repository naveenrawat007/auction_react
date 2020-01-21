import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPhone, faPlus, faMicrophone, faCamera, faUpload, faFile, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { faSmile} from '@fortawesome/free-regular-svg-icons';
import ChatConnection from './ChatConnection.js';
import Modal from 'react-bootstrap/Modal';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

export default class Message extends Component{
  _isMounted = false
	constructor(props){
    super(props);
    this.state = {
      uploading: false,
      open_attachment_modal: false,
      attachments: [],
      page: 1,
      show_emoji_picker: false,
      message: "",
      current_user_id: this.props.user_id,
      room_id: this.props.chat_room.id,
      name: this.props.chat_room.name,
      property_name: this.props.chat_room.property_name,
      owner_name: this.props.chat_room.owner_name,
      owner_img: this.props.chat_room.owner_img,
      messages: [],
    }
  }
  componentWillUnmount () {
    this.chatConnection.disconnect()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.chat_room.id !== this.state.room_id){
      window.scrollTo(0,0)
      this.chatConnection.disconnect()
      this.setState({
        show_emoji_picker: false,
        room_id: nextProps.chat_room.id,
        current_user_id: nextProps.user_id,
        name: nextProps.chat_room.name,
        property_name: nextProps.chat_room.property_name,
        owner_name: nextProps.chat_room.owner_name,
        owner_img: nextProps.chat_room.owner_img,
        messages: [],
        page: 1,
      }, function () {
        this.chatConnection = new ChatConnection(this.state.current_user_id, this.addUpdatedMessage)
        this.chatConnection.openNewRoom(this.state.room_id)
        this.getMessages();
      });
    }
  }

  componentDidMount () {
    this._isMounted = true
    // const ch = new ChatConnection("2", ()=>{console.log(1)})
    // ch.openNewRoom(2)
    // setTimeout(()=>{
    //   ch.talk("new message", 2)
    // }, 3000)
    this.chatConnection = new ChatConnection(this.state.current_user_id, this.addUpdatedMessage)
    this.chatConnection.openNewRoom(this.state.room_id)
    this.getMessages();
  }

  updateCurrentMessage = (event) => {
    const{ name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  submitMessage = (event) => {
    event.preventDefault();
    this.chatConnection.talk(this.state.message, this.state.room_id);
    this.setState({
      message: "",
      show_emoji_picker: false,
    });
  }

  addUpdatedMessage = (message) => {
    let messages = this.state.messages
    let flag = false
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id === message.id){
        messages[i] = message
        flag = true
        break
      }
    }
    if (flag === false){
      messages.push(message)
    }
    this.setState({
      messages: messages,
    }, function () {
      this.adjustScroll();
    });
  }
  adjustScroll = (old = false) => {
    if (document.getElementById('chat-room-container')){
      if (old){
        document.getElementById('chat-room-container').scrollTop = document.getElementById('chat-room-container').clientHeight
      }
      else {
        document.getElementById('chat-room-container').scrollTop = document.getElementById('chat-room-container').scrollHeight + document.getElementById('chat-room-container').clientHeight
      }
    }
  }

  getMessages = (old = false) => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/user/chat_rooms/"+this.state.room_id+"/messages" + "?page=" + this.state.page
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
          if (result.messages.length > 0){
            let messages = this.state.messages
            messages.unshift(...result.messages.reverse())
            this.setState({
              isLoaded: true,
              messages: messages,
            }, function () {
              if (old === false){
                this.adjustScroll();
              }
              else {
                this.adjustScroll(old);
              }
            });
          }
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
  getOldMessages = () => {
    if (document.getElementById('chat-room-container')){
      if (document.getElementById('chat-room-container').scrollTop === 0){
        this.setState({
          page: (this.state.page+1)
        }, function () {
          this.getMessages(true);
        });
      }
    }
  }

  addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    this.setState({
      message: this.state.message + emoji
    });
  }

  toggleEmojiPicker = () => {
    this.setState({
      show_emoji_picker: (!this.state.show_emoji_picker) ,
    });
  }

  openAttachmentModal = () => {
    this.setState({
      open_attachment_modal: true,
    });
  }
  hideAttachmentModal = () => {
    this.setState({
      attachments: [],
      open_attachment_modal: false,
    });
  }
  fileSelectHandler = (event) => {
    const name = event.target.name
    var uploaded_files = event.target.files;
    var files = this.state.attachments;
    for (var i = 0; i < uploaded_files.length; i++) {
      files.push(uploaded_files[i])
    }
    if (this._isMounted){
      this.setState({
        [name]: files,
      });
    }
  }
  removeAttachment = (index) => {

    let files = this.state.attachments;
    if (index > -1) {
      files.splice(index, 1);
    }
    this.setState({
      attachments: files ,
    });
  }
  uploadDocs = () => {
    this.setState({
      uploading: true,
    });
    const fd = new FormData();
    for (let i = 0 ; i < this.state.attachments.length ; i++) {
      fd.append('attachments[]', this.state.attachments[i], this.state.attachments[i].name)
    }
    let url = process.env.REACT_APP_BACKEND_BASE_URL + "/user/chat_rooms/"+this.state.room_id+"/messages"
  	fetch(url ,{
			method: "POST",
			headers: {
        "Authorization": localStorage.getItem("auction_user_token"),
        "Accept": "application/vnd.auction_backend.v1",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "*",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: fd,
		}).then(res => res.json())
    .then((result) => {
      if (result.status === 200) {
        this.setState({
          uploading: false,
          open_attachment_modal: false ,
          attachments: [],
        });
      }else if (result.status === 401) {
        localStorage.removeItem("auction_user_token");
        window.location.href = "/login"
      }
		}, (error) => {
		});
  }
  attachments_list = (object) =>{
    const attachments_list = object.map((attachment, index) => {
      return (
        <div key={index} className="col-md-4 px-1">
          <a href={attachment.file_url} target="_blank" rel="noopener noreferrer" className="chat_attachment">
            <div className="chat_attachment_icon">
              <FontAwesomeIcon icon={faFile} className="mr-2" />
            </div>
            <div className="chat_attachment_detail">
              <h6>{attachment.file_name.substring(0, 10)}</h6>
              <p>{attachment.file_content_type.split('/')[0]}</p>
            </div>
          </a>
        </div>
      );
    })
    return attachments_list;
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
                <div className="chat_sender_para row mx-0">
                  <div className="col-md-12 px-0">
                    <p className="mb-0">{message.content}</p>
                  </div>
                  {this.attachments_list(message.attachments)}
                </div>
              </div>
            </div>
          </div>
        )
      }
      else {
        return (
          <div key={index} className="col-md-12 text-right py-2 px-3">
            <div className="user_data admin_send">
              <div className="chat_reciever_para row mx-0">
                <div className="col-md-12 px-0">
                  <p className="mb-0">{message.content}</p>
                </div>
              </div>
            </div>
            <div className="row mx-0 sender_file justify-content-end text-left">
              {this.attachments_list(message.attachments)}
            </div>
            <p className="time_text mt-0">{message.created_at}</p>
          </div>
        );
      }
    })
    const added_attachments = this.state.attachments.map((attachment, index) => {
      return(
        <div className="col-md-6 px-1" key={index}>
          <div className="p-2 msgfile-upload mb-2">
            <div className="mr-5">
              <FontAwesomeIcon icon={faFile} className="mr-2" />
              <p>
                {attachment.name}
              </p>
            </div>
            <Link to="#">
              <FontAwesomeIcon icon={faTimesCircle} className="mr-2" onClick={() => {this.removeAttachment(index)}} />
            </Link>
          </div>
        </div>
      )
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
          <div className="chat-data" id="chat-room-container" onScroll={this.getOldMessages}>
            {messages}
          </div>
          <div className="chat-footer">
            <div className="msgemoji-box">
              <div className="msgemoji-picker">
                {
                  this.state.show_emoji_picker ?
                    <Picker onSelect={this.addEmoji} showPreview={false} showSkinTones={false} color={"#ffff00"}/>
                  :
                  null
                }
              </div>
            </div>
            <div className="col-md-12 px-0 row mx-0 align-items-center">
              <div className="col-md-1 px-0 text-center">
                <div className="main_form_add">
                  <Link to="#" onClick={this.openAttachmentModal}><FontAwesomeIcon icon={faPlus} /></Link>
                </div>
              </div>
              <div className="input-group main_form_input col-md-9 px-0">
                <form className="chat_form" onSubmit={this.submitMessage}>
                  <input type="text" value={this.state.message} className="form-control border-right-0" name="message"  onChange={this.updateCurrentMessage} aria-label="" placeholder="Type a message.."/>
                  <div className="input-group-append">
                    <span className="input-group-text group-box-chat border-left-0">
                      <a href="#">
                        <FontAwesomeIcon icon={faSmile} onClick={this.toggleEmojiPicker} />
                      </a>
                    </span>
                  </div>
                </form>
              </div>
              <div className="col-md-1 pl-3 pr-1 text-center">
                <a href="">
                  <FontAwesomeIcon icon={faMicrophone} color={"#818078"} />
                </a>
              </div>
              <div className="col-md-1 px-1 text-center">
                <a href=""><FontAwesomeIcon icon={faCamera} color={"#818078"} /></a>
              </div>
            </div>
          </div>
        </div><Modal size="lg" className="user_property_modal" show={this.state.open_attachment_modal} onHide={this.hideAttachmentModal} centered>
          <Modal.Header closeButton>
            <div className="px-0 col-md-11 ">
              <h5 className="mb-0 "> Upload Attachments</h5>
            </div>
          </Modal.Header>
          <div className="modal-body steps-parts">
            {this.state.uploading === false ?
              null
            :
            <div className="spinner_main chat-uploading">
              {/* <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div> */}
              <div className="uploader">Uploading...</div>
            </div>
            }
            <div className="col-md-12 text-center px-0">
              <div className="form-group row mx-0">
                <div className="change-label col-md-12 row mx-0 px-0 mb-2 align-items-center">
                  <div className="col-md-3 px-0 text-left">
                    <div className="upload-label">
                      <label className="mb-0">Add Attachments</label>
                    </div>
                  </div>
                  <div className="col-md-9 ">
                    <div className="upload-input">
                      <div className="custom-file">
                        <input type="file" multiple className="custom-file-input" name="attachments" onChange={this.fileSelectHandler} />
                        <label className={"custom-file-label "} htmlFor="customFile"> Choose file</label>
                      </div>
                    </div>
                  </div>
                  <div className="row mx-0 text-left width-100">
                    {added_attachments}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 text-center mt-3">
              <span className="error"></span>
              <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.uploadDocs}><FontAwesomeIcon icon={faUpload} size="1x" /> Upload</button>
              &nbsp;
              <button type="button" className="btn red-btn btn-default" data-dismiss="modal" onClick={this.hideAttachmentModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
