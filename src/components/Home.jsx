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
    return (<div>  
        <Link key={article.article_id} to={`/article/${article.article_id}`}>
            <article>
            <h3>featured article: {article.title}</h3>
            <h4>topic : {article.topic}</h4>
            <h5>author : {article.author}</h5>
            <img src={article.article_img_url} className="article-img"/>
            <p>{article.body}</p>
            <p className="created-at-p">Ceated at : {article.created_at}</p>
            <p className="created-at-p">
            <span>{article.votes} likes</span> <span>{article.comments_count} comments</span>
            </p>
            </article>
            </Link>

            {articles.map((item)=>{
        return <Link key={item.article_id} to={`/article/${item.article_id}`}><div  className="card-container"><ArticleCard article={item}/></div></Link>
    })}
            </div>)
            }else{
    return <p>loading...</p>
}
}
