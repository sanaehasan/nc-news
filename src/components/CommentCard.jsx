export default function CommentCard(props){
    const {comment} = props;
    return <>
     <article class="p-6 text-base bg-white   border-t border-gray-light dark:border-gray-700  dark:bg-gray-900">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">{comment.author}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate>{comment.created_at.split("T")[0]}</time></p>
            </div>
             </footer>
                        
                            <p class="text-gray-500 dark:text-gray-400">{comment.body}</p>
                           <time></time>
                           <p>{comment.votes} likes</p>
               </article>
                           </>
}