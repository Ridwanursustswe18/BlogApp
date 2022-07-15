
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = ()=>{
const navigate = useNavigate()
const [name,SetName] = useState("");
const [email,SetEmail] = useState("");
const [username,SetUsername] = useState("");
const [Password,SetPassword] = useState("");
const register = async(event:any)=>{
    event.preventDefault();
    const res = await axios.post("http://localhost:3000/register",{Name:name,Email:email,UserName:username,Password:Password})
    if(res){
        alert("new user added")
        navigate("/Login")
    }
}

    return (
        <div className="box-container">
            <h1 className="title">Register</h1>
        <input type="text" placeholder="Enter Name" className="form" onChange={(event: any) => SetName(event.target.value)} value ={name}/>
        <input type="text" placeholder="Enter Email" className="form" onChange={(event:any) => SetEmail(event.target.value)} value = {email}/>
        <input type="text" placeholder="Enter Username" className="form" onChange={(event:any) => SetUsername(event.target.value)} value = {username}/>
        <input type="text" placeholder="Enter Password" className="form" onChange={(event:any) =>SetPassword(event.target.value)} value = {Password}/>
        <button onClick={register} type="submit" className="form__btn">Sign up</button>
        </div>
    )
}
export default SignUp