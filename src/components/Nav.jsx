import { Link } from "react-router-dom";
import { getTopics } from "../api";
import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";

export default function Nav(){
    const [topics,setTopics]= useState([]);

    useEffect(()=>{
        getTopics().then((data)=>{
                setTopics(data.topics);
        }).catch((err)=>{
          alert(err.msg)
        })
    },[])
   
return (
 <nav className="bg-blue border-blue-200 dark:bg-gray-900 dark:border-gray-700">
   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
        <Link className="text-gray-light hover:bg-yellow hover:text-gray-dark" to="/">Home</Link>
        </li>
      <li>
         <div className="dropdown"> 
    <Link  className="dropbtn text-gray-light hover:bg-yellow hover:text-gray-dark" to='/articles' >Articles</Link>
  <div className="dropdown-content">
  {topics.map((topic)=>{
    return   <Link to={`/articles/${topic.slug}`} key={topic.slug} >{topic.slug}</Link>
  })}
    </div>
    </div>
      </li>
      <li>
 <Link  to='/login' className="text-gray-light hover:bg-yellow hover:text-gray-dark" >Login</Link>
      </li>
        </ul>
   
   
   
    </div>
    </div>
    </nav>
 )
}