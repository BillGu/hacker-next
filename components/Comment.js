const Comment = ({comment}) => (
    <div className='comment'>
        <div className='commentUser'>{comment.user}</div>
        <div 
            className='commentContent' 
            dangerouslySetInnerHTML={{__html: comment.content}}>
        </div>
        {comment.comments && (
            <div className='nestedComments'>
                {comment.comments.map(nestedComment => (
                    <Comment key={nestedComment.id} comment={nestedComment} />
                ))}
            </div>
        )}
        <style jsx>{`
            .comment {
                margin-bottom: 1.5em;
            }
            .commentUser {
                font-size: 0.9rem;
                font-weight: bold;
                margin-bottom: 0.5em
            }
            .commentContent {
                font-size: 0.9rem;
            }
            .commentContent :global(p) {
                margin: 0;
                margin-bottom: 0.5em;
                word-wrap: break-word;
            }
            .commentContent :global(a) {
                color: #f60;
                text-decoration: underline
            }
            .commentContent :global(pre) {
                max-width: 100%;
                overflow: scroll
            }
            .nestedComments {
                margin-top: 1em;
                border-left: 1px solid black;
                padding-left: 1em
            }
        `}</style>
    </div>
)

export default Comment