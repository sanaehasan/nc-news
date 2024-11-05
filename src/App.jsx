import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Articles from './components/Articles';
import Article from './components/Article';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/articles" element={<Articles/>} />
      <Route path="/articles/:topic"  element={<Articles/>} />
      <Route path="/article/:id" element={<Article/>}/>
    </Routes>
    </>
  )
}

export default App
