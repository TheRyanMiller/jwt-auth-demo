import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import "../styles/App.css";
import { api } from "../apis/apiCalls";
var jwt = require('jsonwebtoken');

const Home = (props) =>{

    const [userList, setUserList] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [myJwt, setMyJwt] = useState({});
    const [myEncodedJwt, setMyEncodedJwt] = useState("")
    const [timeLeft, setTimeLeft] = useState(0);
    const [tokenExpired, setTokenExpired] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if(localStorage.getItem("jwt-access-token")){
                let t = calculateTimeLeft(jwt.decode(localStorage.getItem("jwt-access-token")));
                setTimeLeft(t);
                if(t < 0 && !tokenExpired){    
                    setTokenExpired(true);
                }
            }
        }, 1000);
    });

    useEffect(() =>{
        setMyEncodedJwt(localStorage.getItem("jwt-access-token"));
        setMyJwt(jwt.decode(localStorage.getItem("jwt-access-token")))
    },[])

    const divStyle = {
        fontSize: "14px",
        color: "white",
        textAlign: "left",
        width: "600px"
    }

    let logoutButton = (
        <div className="center">
            <Button block onClick={props.handleLogout} >
                Logout!
            </Button>
        </div>
    )

    const closeModal = () =>{
        setShowModal(false);
    }

    let handleGetUsers = () => {
        setUserList("");

        api().get("/users").then(resp=>{
            if(resp){
                setUserList(JSON.stringify(resp.data, null, 4));
                setShowModal(true);
                setTokenExpired(false);
                setMyJwt(jwt.decode(localStorage.getItem("jwt-access-token")))
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    let protectedButtons = (
        <div className="center">
            <Button onClick={()=>handleGetUsers()} className="sideMargins" variant="light">
                Get Users!
            </Button>
        </div>
    )

    const calculateTimeLeft = (myJwt) => {
        return (toDateTime(myJwt.exp) / 1000 ) - (new Date().getTime() / 1000);
    };

    function toDateTime(secs) {
        const d = new Date(0);
        return d.setUTCSeconds(secs);
    }

  return (<>
    <div className="App App-header">
        <pre style={divStyle}>{JSON.stringify(myJwt, null, 4)}</pre>
        <p style={divStyle} className="center"> Seconds until token expired: {tokenExpired ? "0 - EXPIRED!" : timeLeft.toFixed(0)}</p><br />
        <div className="wordWrap">
            <p className="wordWrap">{myEncodedJwt}</p>
        </div>
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