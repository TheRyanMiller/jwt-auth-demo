import React from 'react';
import Login from './components/login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  let home = (
    <div className="App">
        <header className="App-header">
          <p>
            
          </p>
          <a
            href="/login"
            rel="noopener noreferrer"
          >
            Login to get started
          </a>
        </header>
    </div>
  )
  return (
    <Router>
      <div>Hello!
      <Route path="/" exact render={()=>home} />
      <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
