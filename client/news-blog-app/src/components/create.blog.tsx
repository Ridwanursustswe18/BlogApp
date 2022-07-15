
import axios, { HeadersDefaults } from "axios";
import { useEffect, useState } from "react";
import { Blog } from "./blog.interface";
import authHeader from "../services/auth_header";
import { useNavigate } from "react-router-dom";
const CreateBlog = ()=>{
     
   
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();
    const newsBlog = {
        title:title,
        description:description
    }
    

        const Create = async (e:any) => {
            e.preventDefault();
            const res = await axios.post("http://localhost:3000/create",
            newsBlog    
            ,{headers:authHeader()})
            if(res){
                navigate("/news")
            }
        }
       
   return(
   <div className="box-container">
    <h1 className="title">Create blog</h1>
    <div>
       
        <input type="text" placeholder="enter news title" className="input-title" 
        onChange={(event)=>{
            setTitle(event.target.value)
        }}
        />
        </div>
        <div>
        
        <textarea  placeholder="enter news description" className="input-description"
        onChange={(event)=>{
            setDescription(event.target.value)
        }}
        />
        </div>
        <div>
            <button onClick = {Create} type="submit" className="form__btn" >Create</button>
        </div>
   </div>

    
)

}
export default CreateBlog;

