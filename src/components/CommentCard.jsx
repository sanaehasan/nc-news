export default function CommentCard(props){
    const {comment} = props;
    return <>
     <article className="p-6 text-base bg-white   border-t border-gray-light dark:border-gray-700  dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">{comment.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate>{comment.created_at.split("T")[0]}</time></p>
            </div>
             </footer>
                        
                            <p className="text-gray-500 dark:text-gray-400">{comment.body}</p>
                           <time></time>
                           <p>{comment.votes} likes</p>
               </article>
                           </>
}