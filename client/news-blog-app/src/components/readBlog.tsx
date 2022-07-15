import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {Blog} from "../components/blog.interface"
import authHeader from "../services/auth_header";


 const ReadBlog = ()=>{
    const [Blogs,setBlogs] = useState([]);
    const fetchBlogs = async () => {
        const res = await axios.get("http://localhost:3000/read");
        setBlogs(res.data);
        
    };
    useEffect(()=>{
        
        fetchBlogs();
    },[]);
   
    const deleteblog = async (id:number)=>{
        const res = await axios.delete(`http://localhost:3000/delete/${id}`,{headers:authHeader()})
        if(res){
            fetchBlogs();
            alert("Blog deleted successfully")
        }
    }
    return(
       
        <div className="blogs">
            {Blogs.length > 0 ? Blogs.map((Blog:Blog,index) =>{
                return(
                    <div className="container">
                     <div className="blogs__text">  
                        <h1>{Blog.title}</h1>
                        <p>{Blog.description}</p>
                    </div>
                    <button onClick ={()=>deleteblog(Blog.ID)} className = "btn">delete</button>
                    <Link to={"/update/" + Blog.ID} className = "link-btn">Update</Link>
                    </div>
                )
            }):("Loading....")
        }
        </div>
        )
}
export default ReadBlog;