
import axios, { HeadersDefaults } from "axios";
import { useEffect, useState } from "react";
import { Blog } from "./blog.interface";
import authHeader from "../services/auth_header";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {

  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const newsBlog = {
        title:title,
        description:description
    }
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        getBlog()
    }, [])
    const getBlog = async () => {
        let res = await axios.get(`http://localhost:3000/singleBlog/${params.id}`, { headers: authHeader() })
        const [Blog] = res.data;
        
       setTitle(Blog.title);
       setDescription(Blog.description)
        
    }

    const Update = async (e: any) => {
        e.preventDefault();
        const res = await axios.patch(`http://localhost:3000/update/${params.id}`,newsBlog, { headers: authHeader() })
        if(res){
            alert("blog is updated");
            navigate("/news")
        }
    }

    return (
        <div className="box-container">
            <h1 className="title">Update blog</h1>
            <div>
               
                <input type="text" placeholder="enter your changed title" className="input-title"
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                    value = {title}
                />
            </div>
            <div>
               
                <textarea  placeholder="enter your changed title" className="input-description"
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}
                    value = {description}
                />
            </div>
            <div>
                <button onClick={Update} type="submit" className="form__btn" >Update</button>
            </div>
        </div>


    )

}
export default UpdateBlog;

