
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authHeader from "../services/auth_header";
const UpdateProfile = ()=>{
const navigate = useNavigate()
const [name,SetName] = useState("");
const [email,SetEmail] = useState("");
const [username,SetUsername] = useState("");
const [Password,SetPassword] = useState("");
const params = useParams();
useEffect(()=>{
getProfile()
},[])
const getProfile =async () => {
    const res = await axios.get(`http://localhost:3000/Profile/${params.id}`,{headers:authHeader()})
    console.log(res.data)
    const[User] = res.data;
    
    SetName(User.Name)
    SetEmail(User.Email)
    SetUsername(User.UserName)
    SetPassword(User.Password)
    
    
}
const Update = async(event:any)=>{
    event.preventDefault();
    const res = await axios.patch(`http://localhost:3000/updateUser/${params.id}`,{Name:name,Email:email,UserName:username,Password:Password},{headers:authHeader()})
    if(res){
        alert("Profile is updated")
        navigate("/Profile/"+params.id)
    }
}

    return (
        <div className="box-container">
            <h1 className="title">Update Profile</h1>
        <input type="text" placeholder="Enter Name" className="form" onChange={(event: any) => SetName(event.target.value)} value ={name}/>
        <input type="text" placeholder="Enter Email" className="form"onChange={(event:any) => SetEmail(event.target.value)} value = {email}/>
        <input type="text" placeholder="Enter Username"className="form" onChange={(event:any) => SetUsername(event.target.value)} value = {username}/>
        <input type="text" placeholder="Enter new Password" className="form"onChange={(event:any) =>SetPassword(event.target.value)} />
        <button onClick={Update} type="submit" className="form__btn" >Update</button>
        </div>
    )
}
export default UpdateProfile;