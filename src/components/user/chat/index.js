import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faVideo, faPhone, faPlus, faMicrophone, faCamera} from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faSmile} from '@fortawesome/free-regular-svg-icons'
export default class ChatList extends Component{
	constructor(props){
    super(props);
  }

  componentDidMount () {
  }
	render() {
    return (
      <div className="profile-form">
        <div className="profile-form-in p-0">
          <div className="profile-setting mt-0">
            <div className="container custom_container px-0">
              <div className="row mx-0 profile_row">
                <div className="col-md-2 px-0 left-chatbox">
                  <div className="chat-side">
                    <div className="chat-side-head">
                      <div className="input-group mb-0">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <FontAwesomeIcon icon={faSearch} />
                          </div>
                        </div>
                        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Search"/>
                      </div>
                    </div>
                    <ul className="list-unstyled users_list">
                      <li>
                        <a href="#">
                          <div className="border_user">
                            <img src="/images/profile.png" alt="profile"/>
                          </div>
                          <div className="active-main">
                            <h5>4715 Brady St, Houston, Tx</h5>
                            <h6>Vinay Mehta</h6>
                          </div>
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                          <div className="border_user">
                            <img src="/images/profile.png" alt="profile"/>
                          </div>
                          <div className="active-main">
                            <h5>734 Magic Oaks Dr, Spring, Tx</h5>
                            <h6>Tina Nguyen</h6>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="border_user">
                            <img src="/images/profile.png" alt="profile"/>
                          </div>
                          <div className="active-main">
                            <h5>734 Magic Oaks Dr, Spring, Tx</h5>
                            <h6>Harley Hedgpeth</h6>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="border_user">
                            <img src="/images/profile.png" alt="profile"/>
                          </div>
                          <div className="active-main">
                            <h5>4818 Imogene St, Houston, Tx</h5>
                            <h6>Richard Jr.</h6>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="border_user">
                            <img src="/images/profile.png" alt="profile"/>
                          </div>
                          <div className="active-main">
                            <h5>4818 Imogene St, Houston, Tx</h5>
                            <h6>Dani Moris</h6>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-10 px-0 right-chatbox">
                  <div className="chat-body">
                    <div className="chat-head">
                      <div className="heading_left">
                        <h5 className="font-red">734 Magic Oaks Dr, Spring, Tx</h5>
                        <p className="mb-0">Tina Nguyen</p>
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
                      <div className="col-md-12">
                        <hr className="hr-text" data-content="Yesterday"/>
                      </div>
                      <div className="row user-row mx-0 py-2 px-3">
                        <div className="col-md-1 px-0">
                          <div className="user_img">
                            <div className="border_img">
                              <img src="/images/profile.png" alt="profile"/>
                            </div>
                            <p className="time_text">11:38 PM</p>
                          </div>
                        </div>
                        <div className="col-md-11 px-0">
                          <div className="user_data">
                            <div className="user_time">
                              <h6 className="mb-1">Helena Fishcher</h6>
                            </div>
                            <p className="mb-0">Tina Nguyen place a bid at  734 Magic Oaks Dr for $247,000</p>
                          </div>
                        </div>
                      </div>
                      <div className="row user-row mx-0 py-2 px-3">
                        <div className="col-md-1 px-0">
                          <div className="user_img">
                            <div className="border_img">
                              <img src="/images/profile.png" alt="profile"/>
                            </div>
                            <p className="time_text">11:38 PM</p>
                          </div>
                        </div>
                        <div className="col-md-11 px-0">
                          <div className="user_data">
                            <div className="user_time">
                              <h6 className="mb-1">Helena Fishcher</h6>
                            </div>
                            <div className="play_record mt-0">
                              <FontAwesomeIcon icon={faPlayCircle} />
                              <div className="sound_waves">
                                <img src="/images/sound.png" alt="profile"/>
                                <img src="/images/sound.png" alt="profile"/>
                                <img src="/images/sound.png" alt="profile"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row user-row mx-0 py-2 px-3">
                        <div className="col-md-12 text-right px-0">
                          <div className="user_data admin_send">
                            <p className="mb-0">Got your message. Did you arrive?</p>
                          </div>
                          <p className="time_text mt-0">11:39 PM</p>
                        </div>
                      </div>
                      <div className="row user-row mx-0 py-2 px-3">
                        <div className="col-md-1 px-0">
                          <div className="user_img">
                            <div className="border_img">
                              <img src="/images/profile.png" alt="profile"/>
                            </div>
                            <p className="time_text">11:38 PM</p>
                          </div>
                        </div>
                        <div className="col-md-11 px-0">
                          <div className="user_data">
                            <div className="user_time">
                              <h6 className="mb-1">Helena Fishcher</h6>
                            </div>
                            <div className="col-md-5 px-0">
                              <img src="/images/home1.png" alt="profile" className="chatimg_width"/>
                            </div>
                          </div>
                        </div>
                      </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
