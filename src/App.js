import React from 'react';
import './App.css';
import Login from './components/login/login.js'
import SignUp from './components/signup/signup.js'
import Navbar from './components/navbar/navbar.js'
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' component = {Navbar}/>
        <Route path="/login" component={Login} />
        <Route path="/sign_up" component={SignUp} />
      </BrowserRouter>
    </div>
  );
}

export default App;
