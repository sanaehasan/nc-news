import {getArticles} from "../api.js";
import { useEffect,useState} from "react";
import ArticleCard from "./ArticleCard.jsx";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loading from "./Loading.jsx";
export default function Articles(){

    const [articles,setArticles]= useState([]);
    const [sortBy , setSortBy]=useState("created_at");
    const [order,setOrder]=useState("DESC");
    const [loading,setLoading] = useState(true);
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
        setLoading(true);
        getArticles(sortBy,order,singleTopic)
        .then((data)=>{
            setLoading(false);
            setArticles(data.articles);
        }).catch((err)=>{
            alert("It has an erro loading the articles please try later");
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
    setLoading(true);
    getArticles(sortBy,order,singleTopic)
    .then((data)=>{
         setLoading(false);
        setArticles(data.articles);
    }).catch((err)=>{
            alert("It has an error loading the articles please try later");
        });
   }
  
   if(!loading){
    return  <div className="flex flex-wrap">
    <div className="w-full my-4 mt-20">
    <form className="filter-form flex flex-wrap">
        <label htmlFor="sortbySelect" className="py-2 px-4" >Filter By </label>
        <select  className="py-2 px-4  block border-gray-light border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" name="sortbySelect" id="sortbySelect"value={sortBy} onChange={handleSelect}>
            <option value="created_at">date</option>
            <option value="title">title</option>
            <option value="author">author</option>
        </select>
   
        <label htmlFor="order" className="py-2 px-4">order</label>
        <select className="py-2 px-4 block  border-gray-light border-2  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" name="order" id="order"value={order} onChange={handleOrder}>
            <option value="ASC">asc</option>
            <option value="DESC">desc</option>
       
        </select>
        <button className="bg-blue py-2 px-4 rounded-md ml-4 text-gray-light" variant="secondary"onClick={handleClick}>filter</button>
    </form>
    </div>
    {articles.map((item)=>{
       
        return<div className="lg:w-1/3 sm:w-full"> <Link key={item.article_id} to={`/article/${item.article_id}`}><ArticleCard article={item}/></Link></div>
    })}
    </div>
   }else{
    return <Loading/>

   }
}