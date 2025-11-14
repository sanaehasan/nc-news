export default function ArticleCard({article}){
    return <>
            <div className="w-md bg-yellow bg-opacity-10 border border-yellow border-opacity-20 rounded-lg shadow hover:bg-opacity-30 dark:bg-gray-800 dark:border-gray-700 m-1">

        <img className="rounded-t-lg h-80" src={article.article_img_url}  alt="" />
  
    <div className="p-5">
      
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title.length>20?article.title.substring(0, 20)+"...":article.title }</h5>
       
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{article.topic}</p>
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{article.author}</p>
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{article.votes} Likes</p>
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-red-800">
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
    </div>
</div>
          </>
}