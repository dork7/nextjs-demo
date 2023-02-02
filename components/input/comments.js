import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const fetchComments = () => {
    fetch(`/api/comments/${eventId}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(`data`, data);
        setCommentList(data.filteredData);
      });
  };

  function addCommentHandler(commentData) {
    // send data to API

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchComments();
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList {...{ commentList }} />}
    </section>
  );
}

export default Comments;
