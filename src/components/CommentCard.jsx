export default function CommentCard(props){
    const {comment} = props;
    return <>
                           <h6>{comment.author}</h6>
                           <p>{comment.body}</p>
                           <time>{comment.created_at}</time>
                           <p>{comment.votes} likes</p>
                           </>
}