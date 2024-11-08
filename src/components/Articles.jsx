import {getArticles} from "../api.js";
import { useEffect,useState} from "react";
import ArticleCard from "./ArticleCard.jsx";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
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
    return <>
    <form className="filter-form">
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
        <Button  variant="secondary"onClick={handleClick}>filter</Button>
    </form>
    {articles.map((item)=>{
        return <Link key={item.article_id} to={`/article/${item.article_id}`}><div  className="card-container"><ArticleCard article={item}/></div></Link>
    })}
    </>
   }else{
    return <p>loading...</p>
   }
}