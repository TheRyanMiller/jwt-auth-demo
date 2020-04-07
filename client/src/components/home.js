import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import "../styles/App.css";

const Home = (props) =>{

    const [userList, setUserList] = useState("");
    const [showModal, setShowModal] = useState(false);

  const divStyle = {
    fontSize: "14px",
    color: "white",
    textAlign: "left"
  }

  let logoutButton = (
    <Button block onClick={props.handleLogout} >
        Logout!
    </Button>
  )

  const closeModal = () =>{
    setShowModal(false);
    }

    let handleGetUsers = () => {
        setUserList("")
        let token = localStorage.getItem("jwt-access-token")
        let instance = axios.create({
            baseURL: "http://localhost:3600",//process.env.REACT_APP_API_URL,
            timeout: 10000,
            headers: { Authorization: `Bearer ${token}` }
        });
        instance.get("/users").then(resp=>{
            console.log(resp)
            setUserList(JSON.stringify(resp.data, null, 4));
            setShowModal(true);
        })
  }

  let protectedButtons = (
    <div>
        <Button onClick={()=>handleGetUsers()} className="sideMargins" variant="light">
            Get Users!
        </Button>
        <Button className="sideMargins" variant="light">
            Get Items!
        </Button>
    </div>
  )


  return (<>
    <div className="App App-header">
        
        <div style={divStyle}>
          { props.isLoggedIn ? protectedButtons : "" }
          <br /><br /><br />
          
          { props.isLoggedIn ? 
            logoutButton : 
            <a href="/login">Login to get started</a> }
        </div>
        <Modal
            open={showModal}
            onClose={closeModal}
            classNames={{
                overlay: "customOverlay",
                modal: "customModal"
              }}
        >
        <div>
        <h1>
          Results
        </h1>
            <pre style={divStyle}><span style={divStyle}>{userList}</span></pre>
        </div>

    </Modal>
        
    </div>
    
    </>
    )
}

export default withRouter(Home);