import { Link } from "react-router-dom";
import { getTopics } from "../api";
import { useEffect, useState } from "react";

export default function Nav(){
    const [topics,setTopics]= useState([]);

    useEffect(()=>{
        getTopics().then((data)=>{
                setTopics(data.topics);
        })
    },[])
   
return (
   <nav><Link to="/">Home</Link>
   <div className="dropdown"> 
    <Link  className="dropbtn" to='/articles' >Articles</Link>
  <div className="dropdown-content">
  {topics.map((topic)=>{
    return   <Link to={`/articles/${topic.slug}`} key={topic.slug} >{topic.slug}</Link>
  })}
    </div>
    </div>
    </nav>
 )
}