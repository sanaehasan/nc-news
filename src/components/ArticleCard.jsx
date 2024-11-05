export default function ArticleCard({article}){
    return <>
            
            <div className="img-card"><img className="image-in-card" src={article.article_img_url} /></div>
            <div className="text-card">
            <h3>{article.title}</h3>
            <p>Topic : {article.topic}</p>
            <p>Author:{article.author}</p>
            <p>{article.votes} likes</p>
            </div>
          </>
}