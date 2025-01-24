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
      <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
   <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      
      <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
       <li>
        <Link className="text-gray-light hover:bg-yellow hover:text-gray-dark block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/">Home</Link>
        </li>
      <li>
         <div className="dropdown"> 
    <Link  className="dropbtn text-gray-light hover:bg-yellow hover:text-gray-dark block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to='/articles' >Articles</Link>
  <div className="dropdown-content">
  {topics.map((topic)=>{
    return   <Link to={`/articles/${topic.slug}`} key={topic.slug} >{topic.slug}</Link>
  })}
    </div>
    </div>
      </li>
      <li>
 <Link  to='/login' className="text-gray-light hover:bg-yellow hover:text-gray-dark block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Login</Link>
      </li>
        </ul>
   
   
   
    </div>
    </div>
    </nav>
 )
}