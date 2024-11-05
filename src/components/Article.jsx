import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticleById, getArticleCommentsById } from "../api";

export default function Article(props){
    const {id} = useParams();
   const [article, setArticle]=useState({});
   const [comments,setComments]=useState([]);
    useEffect(()=>{
        getArticleById(id).then((data)=>{
            setArticle(data.article)
            console.log(data)
        });
        getArticleCommentsById(id).then((data)=>{
            setComments(data.comments)
        });
    },[])
    return <>
            <article>
            <h2>{article.topic}</h2>
            <h3>{article.title}</h3>
            <h5>author : {article.author}</h5>
            <img src={article.article_img_url}/>
            <p>{article.body}</p>
            <p><span>{article.votes} likes</span>  <span>{article.comments_count} comments</span></p>
            </article>
            </>
}