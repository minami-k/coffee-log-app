import React, { useState, useEffect, useCallback } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "./pages.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Paper, Button } from "@mui/material";
import moment from 'moment'


const SinglePost = ({ postId, getPostId, isLoggedIn }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const { id: paramsId } = useParams()

  let navigate = useNavigate();


  const deletePost = async (id) => {
    const postDoc = doc(db, "blog-post", id);
    await deleteDoc(postDoc);
    navigate('/')
  };

  const getPost = (id) => {
    const postsRef = doc(db, "blog-post", id);
    return getDoc(postsRef);
  };

  const singlePostHandler = useCallback(async () => {
    try {
      const docSnap = await getPost(paramsId);
      console.log("The doc", docSnap.data());

      setTitle(docSnap.data().title);
      setImage(docSnap.data().image)
      setContent(docSnap.data().content);
      setAuthor(docSnap.data().author);
      setDate(docSnap.data().createdAt.toDate());

    } catch (err) {
      console.log("Error happend");
    }
  },[paramsId]);

  useEffect(() => {
    console.log("Here is the id", postId);
    if (paramsId) {
      singlePostHandler();
    }
  }, [paramsId, singlePostHandler]);

  return (
    <div className="main-box">
      <>
        <Paper className="post">
          <div className="post-detail">
            <h1>{title}</h1>
            <p>Posted by {author.name}</p>
            <p className="post-bottom">Posted on {moment(date).calendar()}</p>

            <div className="post-img"><img src = {image} alt="" style={{width: "100%"}}/></div>
            <div className="post-content">{content}</div>
            {/* If the login user is the same as the one who created the post, show delete/edit button */}

            <div>
              {isLoggedIn && author.id === auth.currentUser.uid && (
                <div className="delete-edit-button">
                  <Button
                    className="delete"
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      deletePost(postId);
                    }}
                  >
                    X
                  </Button>
                  <Link
                    className="button"
                    to={`/editpost/${postId}`}
                    onClick={(e) => getPostId(postId)}
                  >
                    Edit
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Paper>
      </>
    </div>
  );
};

export default SinglePost;
