import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./pages.css";
import { Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const EditPost = ({ isLoggedIn, postId, setPostId }) => {
  const [post, setPost] = useState();
  /* const [loading, setLoading] = useState(true)
   */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const theme = createTheme({
    palette: {
      button: {
        main: "#b2dfdb",
      },
    },
  });

  let navigate = useNavigate();

  const postsRef = doc(db, "blog-post", postId);
  const updatePost = (id) => {
    const postDoc = collection(db, "blog-post");
    return updateDoc(postDoc);
  };

  const editPost = async () => {
    await updateDoc(postsRef, {
      title,
      content,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
  };

  const getPost = (id) => {
    const postsRef = doc(db, "blog-post", id);
    return getDoc(postsRef);
  };

  const editPostHandler = async () => {
    try {
      const docSnap = await getPost(postId);
      console.log("The doc", docSnap.data());

      setTitle(docSnap.data().title);
      setContent(docSnap.data().content);
    } catch (err) {
      console.log("Error happend");
    }
  };

  useEffect(() => {
    console.log("HEre is the id", postId);
    if (postId !== undefined && postId !== "") {
      editPostHandler();
    }
  }, []);

  /*   const editPost = async (id) => {
    const postDoc = doc(db, "blog-post", id)
    const updatedPost = {}
  } */

  return (
    <ThemeProvider theme={theme}>
      <div className="main-box new-post">
        <h1>Edit Post</h1>
        <Paper>
          <div className="post-form">
            <div>
              <label>Title:</label>
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Content:</label>
              <br />
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                style={{ width: "100%", height: "300px" }}
                placeholder="Write here"
              ></textarea>
            </div>
            <div className="edit-cancel-button" style={{ marginTop: "10px" }}>
              <Link
                className="button"
                onClick={editPost}
                variant="contained"
                type="submit"
                to={`/post/${postId}`}
              >
                Edit
              </Link>
              <Button color="button" variant="contained" type="submit" className="cancel">
                <Link to="/" >
                  Cancel
                </Link>
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default EditPost;
