import {getArticles} from "../api.js";
import { useEffect,useState} from "react";
import ArticleCard from "./ArticleCard.jsx";
export default function Articles(){

    const [articles,setArticles]= useState([]);
    useEffect(()=>{
        getArticles()
        .then((data)=>{

            setArticles(data.articles);
        });
    },[])
  
    return <>{articles.map((item)=>{
        return <div key={item.article_id} className="card-container"><ArticleCard article={item}/></div>
    })}</>
}