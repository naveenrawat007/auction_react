import React from 'react';
import './App.css';
import Login from './components/login/login.js'
import SignUp from './components/signup/signup.js'
import VerificationModal from './components/signup/verify_modal.js'
import Navbar from './components/navbar/navbar.js'
// import Footer from './components/navbar/footer.js'
import ForgotPassword from './components/login/forgot_password.js'
import Sidebar from './components/user/sidebar.js'
import AdminSidebar from './components/admin/sidebar.js'
import NewPassword from './components/login/new_password.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' component = {Navbar}/>
        <Switch>
          <Route path="/user" component={() => <Sidebar path='user_profile'/>}/>
          <Route path="/admin" component={() => <AdminSidebar path='users_list'/>}/>
          <Route path="/login" component={Login} />
          <Route path="/sign_up" component={SignUp} />
          <Route path="/forgot_password" component={ForgotPassword} />
          <Route path="/new_password" component={NewPassword} />
          <Route path="/verify" component={VerificationModal} />
        </Switch>
        {/* <Route path='/' component = {Footer}/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
