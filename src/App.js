import React from 'react';
import './App.css';
import Login from './components/login/login.js'
import SignUp from './components/signup/signup.js'
import Navbar from './components/navbar/navbar.js'
import ForgotPassword from './components/login/forgot_password.js'
import NewPassword from './components/login/new_password.js'
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' component = {Navbar}/>
        <Route path="/login" component={Login} />
        <Route path="/sign_up" component={SignUp} />
        <Route path="/forgot_password" component={ForgotPassword} />
        <Route path="/new_password" component={NewPassword} />
      </BrowserRouter>
    </div>
  );
}

export default App;
