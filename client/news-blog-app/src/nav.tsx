import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const token = localStorage.getItem("token");

    let ID = localStorage.getItem("userID");



    const navigate = useNavigate();


    const logout = () => {
        localStorage.clear();

        navigate("/Register")
    }
    return (
        <nav className="nav">
             <h1 onClick={()=>{
                navigate("/news")
             }} className="nav__title">MBA</h1>
           
            {token ? 
            <div className="nav-links">
            <ul>
                <li><Link to="/news">Home</Link></li>
                <li><Link to="/create-blog">Create</Link></li>
                <li><Link onClick={logout} to="/Register">logout</Link></li>
                <li><Link to={"/Profile/" + ID}>Profile</Link></li>
            </ul>
            </div>
                :
                <div className="nav-links">
                <ul>
                    <li><Link to="/news">Home</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                    <li><Link to={"/Register"}>Register</Link></li>

                </ul>
                </div>
            }
        </nav>

    )


}
export default Nav;