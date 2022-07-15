import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import Nav from './nav';
 import ReadBlog from "./components/readBlog"
import './App.css';
import CreateBlog from './components/create.blog';
import SignUp from './components/register';
import Login from './components/Login';
import UpdateBlog from './components/update.blog';
import Profile from './components/user.profile';
import UpdateProfile from './components/update.profile';


function App() {
 
  return (
    <div>
      <BrowserRouter>
       <Nav/>
       <Routes>
       <Route path = "/news" element = {<ReadBlog/>}></Route>
       <Route path = "/create-blog" element = {<CreateBlog/>}></Route>
       <Route path = "/update/:id" element = {<UpdateBlog/>}></Route>
       <Route path = "/Register" element = {<SignUp/>}></Route>
       <Route path = "/Login" element = {<Login/>}></Route>
       <Route path = "/Profile/:id" element = {<Profile/>}></Route>
       <Route path = "/UpdateProfile/:id" element = {<UpdateProfile/>}></Route>
       </Routes>
       
       </BrowserRouter>
       
     
   </div>
  );
}

export default App;
