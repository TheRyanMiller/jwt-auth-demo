import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../styles/login.css";
import "../styles/App.css";

const Login = (props) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert("submitted")
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
        <Form.Label>Email</Form.Label>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
        <Form.Label>Password</Form.Label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default withRouter(Login);