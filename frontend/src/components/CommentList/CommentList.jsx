import styles from "./CommentList.module.css"; // Import CSS module for styling the CommentList component
import Comment from "../Comment/Comment"; // Import the Comment component to render individual comments

function CommentList({ comments }) { // Define CommentList component that takes 'comments' as a prop
  return (
    <div className={styles.commentListWrapper}> 
      <div className={styles.commentList}> 
        {comments.length === 0 ? ( // Check if there are no comments
          <div className={styles.noComments}>No comments posted</div> // Display message if no comments are present
        ) : (
          comments.map((comment) => ( // Map through the comments array
            <Comment key={comment._id} comment={comment} /> // Render a Comment component for each comment, passing the comment data
          ))
        )}
      </div>
    </div>
  );
}

export default CommentList; // Export the CommentList component for use in other parts of the application