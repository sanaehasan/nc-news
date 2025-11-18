import { Link } from "react-router-dom";
import {Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { getTopics } from "../api";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";


export default function Nav(){
    const [topics,setTopics]= useState([]);
    const [theme,setTheme]= useState("light");
    const [mobileToggleOpen, setMobileToggleOpen]= useState(false);
    
    useEffect(()=>{
        getTopics().then((data)=>{
                setTopics(data.topics);
        }).catch((err)=>{
          alert(err.msg)
        })
    },[])
    useEffect(()=>{
     window.document.documentElement.classList.remove('light', 'dark')
     window.document.documentElement.classList.add(theme);
    },[theme])
   function handleClick(){
    if(theme==="light"){
   
        setTheme("dark");
    }else{
       
        setTheme("light");
    }
   }
   function handleMobileToggle(){
    setMobileToggleOpen(()=>!mobileToggleOpen);
   }
return (
  <Disclosure as="nav" className="fixed w-full bg-red-800">
   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <DisclosureButton data-collapse-toggle="navbar-solid-bg" type="button" className="group inline-flex w-full items-start p-2  h-10 justify-start text-sm text-gray-200 rounded-lg md:hidden hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false" onClick={handleMobileToggle}>
        <span className="sr-only">Open main menu</span>
        {mobileToggleOpen? <XMarkIcon  className="block size-6" />: <Bars3Icon  className="block size-6" />} 
    </DisclosureButton>
   <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">  
      <ul className="flex w-full flex-col font-medium  rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
       <li><h1 className="text-3xl  font-medium px-10  text-gray-100 dark:text-white border-r-2 border-gray-100">NC News</h1></li>
       <li>
        <Link className="text-gray-100 hover:bg-yellow  hover:text-gray-dark bloc py-2 px-3 md:p-0 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/">Home</Link>
        </li>
      <li>
         <div className="dropdown"> 
    <Link  className="dropbtn text-gray-100 hover:bg-yellow hover:text-gray-dark block py-2 px-3 md:p-0 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to='/articles' >Articles</Link>
  <div className="dropdown-content">
  {topics.map((topic)=>{
    return   <Link to={`/articles/${topic.slug}`} key={topic.slug} >{topic.slug}</Link>
  })}
    </div>
    </div>
      </li>
      <li>
 <Link  to='/login' className="text-gray-100 hover:bg-yellow hover:text-gray-dark block py-2 px-3 md:p-0 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Login</Link>
      </li>
      <li> <button onClick={handleClick}>{theme==="light"?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>
:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
}</button> </li>
        </ul>
   
   
   
    </div>
    <DisclosurePanel className="sm:hidden">
        <div className="space-y-1  pt-1 pb-3 w-full">
            <ul className="flex w-full flex-col font-medium  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent md:dark:bg-transparent">
            <li>
        <Link className="text-gray-100 hover:bg-yellow  hover:text-gray-dark bloc py-2 px-3 md:p-0 rounded hover:bg-red-950 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/">Home</Link>
            </li>
            <li>
         <div className="dropdown"> 
            <Link  className="dropbtn text-gray-100 hover:bg-yellow hover:text-gray-dark block py-2 px-3 md:p-0 rounded hover:bg-red-950 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to='/articles' >Articles</Link>
                    <div className="dropdown-content">
                    {topics.map((topic)=>{
                      return   <Link to={`/articles/${topic.slug}`} key={topic.slug} >{topic.slug}</Link>
                    })}
                      </div>
                      </div>
              </li>
              <li>
            <Link  to='/login' className="text-gray-100 hover:bg-yellow hover:text-gray-dark block py-2 px-3 md:p-0 rounded hover:bg-red-950 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Login</Link>
              </li>
              </ul>
          
        </div>
      </DisclosurePanel>
    </div>
    </Disclosure>
 )
}