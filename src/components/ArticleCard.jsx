export default function ArticleCard({article}){
    return <>
            <div class="w-md bg-yellow bg-opacity-10 border border-yellow border-opacity-20 rounded-lg shadow hover:bg-opacity-30 dark:bg-gray-800 dark:border-gray-700 m-1">
    <a href="#">
        <img class="rounded-t-lg h-80" src={article.article_img_url}  alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title.length>20?article.title.substring(0, 20)+"...":article.title }</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{article.topic}</p>
         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{article.author}</p>
         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{article.votes} Likes</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
          </>
}