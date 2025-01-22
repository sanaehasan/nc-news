import { useEffect, useState } from "react"
import { getArticles } from "../api"
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function Home(){
    const [article,setArticle] = useState({});
    const [articles,setArticles]=useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        getArticles("votes","DESC","").then((data)=>{
            setLoading(false)
            setArticle(data.articles[0]);
            setArticles([data.articles[1],data.articles[2]])
           
        })
    },[])
    if(!loading){
    return (<div className="flex flex-wrap">  
 
    
       
            <div className="w-full h-auto text-center">
                <h2 className="m-8 font-bold text-2xl text-blue">Featured articles</h2>
                
            </div>
            <div className="flex flex-wrap w-full border-2 bg-yellow border-yellow border-opacity-40 bg-opacity-15 rounded-md justify-center items-center mb-8 hover:bg-opacity-35">  
            <div className="lg:w-1/2 sm:w-full">
                <Link key={article.article_id} to={`/article/${article.article_id}`}>
                <img src={article.article_img_url} className="lg:rounded-l-md lg:rounded-r-none  sm:rounded-b-none sm:rounded-t-md"/> 
                </Link>
            </div>

            <div className="lg:w-1/2 sm:w-full text-center sm:mt-8">
            <h3 className="text-2xl font-bold opacity-50">{article.topic}:{article.title}</h3>
                <h5 className="text-2xl opacity-50">{article.author}</h5>
                <p>{article.body}</p>
                <p className="text-2xl opacity-50">{(article.created_at).split("T")[0]}</p>
                <p className="text-2xl opacity-50">
                <span>{article.votes} likes</span> <span>{article.comments_count} comments</span>
                </p>
                <p className="m-8">
                  <Link key={article.article_id} to={`/article/${article.article_id}`} className="bg-pink p-2 text-gray-light rounded-lg">
         Read more ...</Link>
         </p>
            </div>
        </div>
           
          
        


            {articles.map((item)=>{
        return  <div className="lg:w-1/2 sm:w-full"><Link key={item.article_id} to={`/article/${item.article_id}`}><div  className="card-container"><ArticleCard article={item}/></div></Link> </div>
    })}
            </div>)
               
            }else{
    return <p>loading...</p>
}
}
