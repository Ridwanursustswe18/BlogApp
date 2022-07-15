import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import authHeader from "../services/auth_header";
import { User } from "./blog.interface";
const Profile = ()=>{
const[user,setUser] = useState([]);
const params = useParams();
let ID = localStorage.getItem("userID");
const getProfile =async () => {
    const res = await axios.get(`http://localhost:3000/Profile/${params.id}`,{headers:authHeader()})
   setUser(res.data)
}
useEffect(()=>{
getProfile();
},[])
return(
    <div className="profile">
        
        <div className="container">
           {user.map((user:User,index) =>{
            return(
                <div >    
                 <p>email: {user.Email}</p>
                <p>Name: {user.Name}</p>
                <p>username: {user.UserName}</p>
                <Link to={"/UpdateProfile/"+ID} className = "link-btn">Update Profile</Link>
                </div>

            )
           })} 
        </div>
    </div>
)
}
export default Profile;