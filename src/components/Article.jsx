import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { addComment, deleteComment, getArticleById, getArticleCommentsById, UpdateArticleVotes } from "../api";
import CommentCard from "./CommentCard";
import UserContext from "../userContext";
import { Button } from "react-bootstrap";

export default function Article(){
   const {id} = useParams();
   const [article, setArticle]=useState({});
   const [comments,setComments]=useState([]);
   const [commentsCount,setCommentsCount]=useState(0);
   const [votes,setVotes]= useState(0);
   const [addCommentText,setAddCommentText]=useState("hidden");
   const [commentText,setCommentText]=useState("");
   const [error, setError] = useState(false);
   const [loading,setLoading] =useState(true);

 
   const context = useContext(UserContext);
   const {user} =context;


    useEffect(()=>{
        setLoading(true);
        getArticleById(id).then((data)=>{
            setLoading(false)
            setError(false);
            setArticle(data.article)
            setVotes(data.article.votes);
            setCommentsCount(data.article.comments_count);
        }).catch((err)=>{
            setError(true);
        });
        getArticleCommentsById(id).then((data)=>{
            setComments(data.comments)

        });
    },[])

    const handleLike=(event)=>{
        event.preventDefault();
        UpdateArticleVotes(article.article_id,1).then((data)=>{
            setVotes((votes)=>{
                 const currentVotes = votes;
                 return currentVotes+1;
            });
        });

    }

    const handleDisLike=(event)=>{
        event.preventDefault();
        UpdateArticleVotes(article.article_id,-1).then((data)=>{
            setVotes((votes)=>{
                 const currentVotes = votes;
                 return currentVotes-1;
            });
        }).catch((err)=>{
            alert(err.msg);
        });
    }

    const handleAddComment = ()=>{
         if (user){
        setAddCommentText("visible")
         }else{
            alert("You need to log in to be able to post a comment")
        }
    }

    const handleCommentChange= (event)=>{
            setCommentText(event.target.value);
    }

    const handlePostComment= (event)=>{
        event.preventDefault();
       
            
            addComment(commentText,user,article.article_id).then((data)=>{
                setComments((comments)=>{
                    const newcomments = [data.comment,...comments]
                    return newcomments;
                })
                 setCommentsCount((commentsCount)=>{
                    return Number(commentsCount)+1;
                 });
                setCommentText("");
                setAddCommentText("hidden"); 
            }).catch((err)=>{
                alert(err.msg)
            });
          
       

       
       
    }
     const handleCommentDelete = (event)=>{
                deleteComment(event.target.value).then(()=>{
                getArticleCommentsById(id).then((data)=>{
                setComments(data.comments);
                 });
                  setCommentsCount((commentsCount)=>{
                    return Number(commentsCount)-1;
                 });
                }).catch((err)=>{
                    alert(err.msg);
                });
                 
               
        }
        if(!error){
            if(!loading){
    return <>
        
             <article>
            <h2>{article.topic}</h2>
            <h3>{article.title}</h3>
            <h5>author : {article.author}</h5>
            <img src={article.article_img_url} className="article-img"/>
            <p className="article-body">{article.body}</p>
            <p className="created-at-p">Ceated at : {article.created_at}</p>
            <div className="like-buttons">
            <button className="like-button" onClick={handleLike}>
            <span className="like-text">{votes}</span> 
            <img className="like-image"src="https://img.icons8.com/?size=48&id=85638&format=png"/>
            </button> 
            <button className="like-button" onClick={handleDisLike}>
            <span className="like-text"></span> 
            <img className="like-image"src="https://img.icons8.com/?size=48&id=87726&format=png"/>
            </button> 
             <span>{commentsCount} comments</span>
            </div>
            </article>
            <button onClick={handleAddComment} className="add-comment">Add comment...</button>
            <div className={`${addCommentText} add-comment-text`}>
                <form>
                    <textarea className="text-area-comment" onChange={handleCommentChange}placeholder="write your comment here please" value={commentText}/>
                    <Button variant="secondary" className="post-comment-btn"onClick={handlePostComment}>post</Button>
                </form>
            </div>
            <div>
                {comments.map((comment)=>{
                    return <div key={comment.comment_id} className="commentdiv">
                             <CommentCard comment={comment}/>
                             {(user===comment.author)?<button value={comment.comment_id} onClick={handleCommentDelete}>delete</button>:null}
                            </div> 
                })}
            </div>
        
            </>
            }else{
                return <p>loading...</p>
            }
        }else{
            return <div>article not found</div>
        }
}