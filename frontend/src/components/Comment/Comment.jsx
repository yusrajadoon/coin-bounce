import styles from "./Comment.module.css"; // Import CSS module for styling the Comment component

function Comment({ comment }) { // Define Comment component that takes 'comment' as a prop
  const date = new Date(comment.createdAt).toDateString(); // Convert the comment's creation date to a readable string format

  return (
    <div className={styles.comment}> 
      <div className={styles.header}> 
        <div className={styles.author}>{comment.authorUsername}</div> 
        <div className={styles.date}>{date}</div> 
        <div className={styles.commentText}>{comment.content}</div> 
      </div>
    </div>
  );
}

export default Comment; // Export the Comment component for use in other parts of the application