import {getArticles} from "../api.js";
import { useEffect,useState} from "react";
import ArticleCard from "./ArticleCard.jsx";
import { useParams } from "react-router-dom";
export default function Articles(){

    const [articles,setArticles]= useState([]);
    const [sortBy , setSortBy]=useState("created_at");
    const [order,setOrder]=useState("DESC");
  
    const [singleTopic,setSingleTopic]= useState("");
    const {topic} =useParams()
   
    useEffect(()=>{
        if(topic){
           
            setSingleTopic(topic);
        }else{
            setSingleTopic("");
        }
    },[topic])
    useEffect(()=>{
        
        getArticles(sortBy,order,singleTopic)
        .then((data)=>{

            setArticles(data.articles);
        });
    },[singleTopic])
  function handleSelect(event){
   setSortBy(event.target.value);
  }
  function handleOrder(event){
    setOrder(event.target.value);
  }
  function handleClick(event){
    event.preventDefault()
    getArticles(sortBy,order,singleTopic)
    .then((data)=>{
        setArticles(data.articles);
    });
   }
  

    return <>
    <form>
        <label htmlFor="sortbySelect">Filter By</label>
        <select name="sortbySelect" id="sortbySelect"value={sortBy} onChange={handleSelect}>
            <option value="created_at">date</option>
            <option value="title">title</option>
            <option value="author">author</option>
        </select>
   
        <label htmlFor="order">order</label>
        <select name="order" id="order"value={order} onChange={handleOrder}>
            <option value="ASC">asc</option>
            <option value="DESC">desc</option>
       
        </select>
        <button onClick={handleClick}>filter</button>
    </form>
    {articles.map((item)=>{
        return <div key={item.article_id} className="card-container"><ArticleCard article={item}/></div>
    })}
    </>
}