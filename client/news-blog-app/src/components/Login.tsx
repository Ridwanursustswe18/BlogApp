import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ()=>{
const navigate = useNavigate();
const [username,SetUsername] = useState("");
const [Password,SetPassword] = useState("");
const login = async(event:any)=>{
    event.preventDefault();
    const res = await axios.post("http://localhost:3000/login",{UserName:username,Password:Password})
    
    .then((res)=>{
        if(res.data.token){
          localStorage.setItem("userID",res.data.userId)
           localStorage.setItem("token", res.data.token)
        }
        
        return res.data
    })
  if(res){
    alert("user logged in succesfully")
    navigate("/news")
  }
  
}

    return (
        <div className = "box-container">
          <h1 className="title">Login</h1>
        
        <input type="text" placeholder="Enter Username" className="form" onChange={(event:any) => SetUsername(event.target.value)} value = {username}/>
        <input type="text" placeholder="Enter Password" className="form" onChange={(event:any) =>SetPassword(event.target.value)} value = {Password}/>
        <button  className="form__btn" onClick={login} type="submit">Login</button>
        </div>
    )
}
export default Login;