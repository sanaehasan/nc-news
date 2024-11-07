import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Articles from './components/Articles';
import Article from './components/Article';
import Login from './components/Login';
import UserContext from './userContext';
import NotFound from './components/NotFound';


function App() {
  const [user,setUser]=useState("");

  return (
   <UserContext.Provider value={{user,setUser}} >
   
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/articles" element={<Articles/>} />
      <Route path="/articles/:topic"  element={<Articles/>} />
      <Route path="/article/:id" element={<Article/>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes>
    
    </UserContext.Provider>
  )
}

export default App
