import React, { useState, useEffect } from 'react';
import Login from './components/login';
import Home from './components/home';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';



const App = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() =>{
    if(localStorage.getItem("jwt-access-token")){
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }
  },[])

  

  const divStyle = {
    fontSize: "14px",
    color: "white",
    textAlign: "left"
  }

  let handleLogin = (valid) => {
    if(valid) setIsLoggedIn(true)
    else{
      setIsLoggedIn(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt-access-token");
    localStorage.removeItem("jwt-refresh-token");
    localStorage.removeItem("refresh-need-date");
    setIsLoggedIn(false);
  }

  return (
    <Router>
      
      <div style={divStyle} >Hello! <br />
      
        LOGGEDIN = <b>{isLoggedIn.toString()}</b><br />
      <Route path="/" exact render={ (props) => <Home {...props} isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> } />
      <Route path="/login" exact render={ (props) => <Login {...props}  handleLogin={handleLogin} /> } />
      </div>
    </Router>
  );
}

export default App;
