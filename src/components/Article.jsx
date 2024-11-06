import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { addComment, getArticleById, getArticleCommentsById, UpdateArticleVotes } from "../api";
import CommentCard from "./CommentCard";
import UserContext from "../userContext";

export default function Article(){
   const {id} = useParams();
   const [article, setArticle]=useState({});
   const [comments,setComments]=useState([]);
   const [votes,SetVotes]= useState(0);
   const [addCommentText,setAddCommentText]=useState("hidden");
   const[commentText,setCommentText]=useState("");
   const context = useContext(UserContext);
   const {user} =context;


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
        UpdateArticleVotes(article.article_id,1).then((data)=>{
            SetVotes((votes)=>{
                 const currentVotes = votes;
                 return currentVotes+1;
            });
        });

    }

    const handleDisLike=(event)=>{
        event.preventDefault();
        UpdateArticleVotes(article.article_id,-1).then((data)=>{
            SetVotes((votes)=>{
                 const currentVotes = votes;
                 return currentVotes-1;
            });
        });
    }

    const handleAddComment = ()=>{
        setAddCommentText("visible")
    }

    const handleCommentChange= (event)=>{
            setCommentText(event.target.value);
    }

    const handlePostComment= (event)=>{
        event.preventDefault();
        if (user){
            addComment(commentText,user,article.article_id).then((data)=>{
                setComments((comments)=>{
                    const newcomments = [data.comment,...comments]
                    return newcomments;
                })
                setCommentText("");
                setAddCommentText("hidden"); 
            });
          
        }else{
            alert("You need to log in to be able to post a comment")
            setCommentText("");
            setAddCommentText("hidden");
        }
       
    }


    return <>
            <article>
            <h2>{article.topic}</h2>
            <h3>{article.title}</h3>
            <h5>author : {article.author}</h5>
            <img src={article.article_img_url} className="article-img"/>
            <p>{article.body}</p>
            <p>Ceated at : {article.created_at}</p>
            <p>
            <button className="like-button" onClick={handleLike}>
            <span className="like-text">{votes}</span> 
            <img className="like-image"src="https://img.icons8.com/?size=48&id=85638&format=png"/>
            </button> 
            <button className="like-button" onClick={handleDisLike}>
            <span className="like-text"></span> 
            <img className="like-image"src="https://img.icons8.com/?size=48&id=87726&format=png"/>
            </button> 
             <span>{article.comments_count} comments</span>
            </p>
            </article>
            <button onClick={handleAddComment}>Add comment...</button>
            <div className={addCommentText}>
                <form>
                    <textarea onChange={handleCommentChange}placeholder="write your comment here please" value={commentText}/>
                    <button onClick={handlePostComment}>post</button>
                </form>
            </div>
            <div>
                {comments.map((comment)=>{
                    return <div key={comment.comment_id} className="commentdiv"><CommentCard comment={comment}/></div> 
                })}
            </div>
            </>
}