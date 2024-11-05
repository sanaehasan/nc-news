import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticleById, getArticleCommentsById, UpdateArticleVotes } from "../api";
import CommentCard from "./CommentCard";

export default function Article(){
    const {id} = useParams();
   const [article, setArticle]=useState({});
   const [comments,setComments]=useState([]);
   const [votes,SetVotes]= useState(0);
    useEffect(()=>{
        getArticleById(id).then((data)=>{
            setArticle(data.article)
            SetVotes(data.article.votes);
        });
        getArticleCommentsById(id).then((data)=>{
            setComments(data.comments)

        });
    },[])

    const handleLike=(event)=>{
        event.preventDefault();
        UpdateArticleVotes(article.article_id).then((data)=>{
            SetVotes((votes)=>{
                 const currentVotes = votes;
                 return currentVotes+1;
            });
        });

    }
    return <>
            <article>
            <h2>{article.topic}</h2>
            <h3>{article.title}</h3>
            <h5>author : {article.author}</h5>
            <img src={article.article_img_url} className="article-img"/>
            <p>{article.body}</p>
            <p>
            <button className="like-button" onClick={handleLike}>
            <span className="like-text">like</span> 
            <img className="like-image"src="https://img.icons8.com/?size=48&id=85638&format=png"/>
            </button> 
            <span>{votes} likes</span>  <span>{article.comments_count} comments</span>
            </p>
            </article>
            <div>
                {comments.map((comment)=>{
                    return <div key={comment.comment_id} className="commentdiv"><CommentCard comment={comment}/></div> 
                })}
            </div>
            </>
}