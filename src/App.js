import React from 'react';
import './App.css';
import Login from './components/login/login.js'
import SignUp from './components/signup/signup.js'
import VerificationModal from './components/signup/verify_modal.js'
import Navbar from './components/navbar/navbar.js'
import Footer from './components/navbar/footer.js'
import ForgotPassword from './components/login/forgot_password.js'
import Sidebar from './components/user/sidebar.js'
import PropertyShow from './components/user/property/show.js'
import AdminSidebar from './components/admin/sidebar.js'
import NewPassword from './components/login/new_password.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NewProperty from './components/property/new.js';
import UserNewProperty from './components/user/property/new.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' component = {Navbar}/>
        <Switch>
          <Route exact path="/user" component={() => <Sidebar path='user_profile'/>}/>
          <Route exact path="/property/new" component={NewProperty}/>
          <Route exact path="/user/property/" component={() => <Sidebar path='property_list'/>}/>
          <Route exact path="/user/property/new" component={UserNewProperty}/>
          <Route exact path="/user/property/:id" component={PropertyShow}/>
          <Route exact path="/admin" component={() => <AdminSidebar path='all_users_list'/>}/>
          <Route exact path="/admin/property/under_review" component={() => <AdminSidebar path='under_review_property_list'/>}/>
          <Route exact path="/admin/property/best_offer" component={() => <AdminSidebar path='best_offer_property_list'/>}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign_up" component={SignUp} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route exact path="/new_password" component={NewPassword} />
          <Route exact path="/verify" component={VerificationModal} />
        </Switch>
        <Route path='/' component = {Footer}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
