import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { addComment, deleteComment, getArticleById, getArticleCommentsById, UpdateArticleVotes } from "../api";
import CommentCard from "./CommentCard";
import UserContext from "../userContext";
import Loading from "./Loading";


export default function Article(){
   const {id} = useParams();
   const [article, setArticle]=useState({});
   const [comments,setComments]=useState([]);
   const [commentsCount,setCommentsCount]=useState(0);
   const [votes,setVotes]= useState(0);
   const [addCommentText,setAddCommentText]=useState("hidden");
   const [addCommentButton,setAddCommentButton] =useState("visible")
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
        setAddCommentButton("hidden");
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
                setAddCommentButton("visible")
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
        <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mt-4">
          <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                  <div class="inline-flex items-center mr-3 mt-20 text-sm text-gray-900 dark:text-white">
                           <div>
                          <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">{article.author}</a>
                          <p class="text-base text-gray-500 dark:text-gray-400">{article.topic}</p>
                          <p class="text-base text-gray-500 dark:text-gray-400"><time>{article.created_at.split("T")[0]}</time></p>
                      </div>
                  </div>
              </address>
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{article.title}</h1>
          </header>
             <figure><img className="rounded-md my-8" src={article.article_img_url} alt=""/>
         
          </figure> 
            <p className="article-body">{article.body}</p>
      
            <div className="mt-4">
                <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                   <button type="button" onClick={handleLike} class="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                     <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <path d="M7 10v12"></path>
                     <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                     </svg>
                    </button>

                    <span className="like-text">{votes}</span> 

                  <button type="button" onClick={handleDisLike} className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                     <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <path d="M17 14V2"></path>
                     <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
                     </svg>
                 </button>
                </div>
                
             <span className="ml-4">{commentsCount} comments</span>
            </div>
         
            <button onClick={handleAddComment} className={`bg-gray bg-opacity-25 py-2.5 px-4  text-sm my-4 rounded-md hover:bg-yellow hover:bg-opacity-20 ${addCommentButton}`}>Add comment...</button>

            <div className={`${addCommentText} add-comment-text`}>
            <form class="my-6">
                 <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label for="comment" class="sr-only">Your comment</label>
                    <textarea id="comment" rows="6" onChange={handleCommentChange} value={commentText}
                               class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                               placeholder="Write a comment..." required></textarea>
            </div>
            <button type="submit" onClick={handlePostComment}
            class="inline-flex items-center py-2.5 px-4 text-sm text-center text-gray-light bg-blue rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-green hover:text-gray-dark">
            Post comment
             </button>
            </form>    
            </div>

            <div>
                {comments.map((comment)=>{
                    return <div key={comment.comment_id} className="commentdiv">
                             <CommentCard comment={comment}/>
                             {(user===comment.author)?<button value={comment.comment_id} onClick={handleCommentDelete} className=" py-2 px-4 bg-pink rounded-md text-sm mb-4 ml-3">delete</button>:null}
                            </div> 
                })}
            </div>
            </article>
           
        
            </>
            }else{
                return <Loading/>
            }
        }else{
            return <div>article not found</div>
        }
}