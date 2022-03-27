import React, { useState, useEffect } from "react";
import { addDoc, collection, limitToLast, serverTimestamp } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import "./pages.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const NewPost = ({ isLoggedIn }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const theme = createTheme({
    palette: {
      button: {
        main: "#b2dfdb",
      },
    },
  });

  const postsRef = collection(db, "blog-post");
  let navigate = useNavigate();

/*   const newPost = async () => {
    await addDoc(postsRef, {
      title,
      content,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  }; */
  
  const fileChangeHandler = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
  }
  };


  const uploadHandler = () => {

    const storageRef = ref(storage, `/images/${Date.now()}${image.name}`)

    const uploadImg = uploadBytesResumable(storageRef, image)

    uploadImg.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },(err) => {
        console.log(err);
      },() => {
        getDownloadURL(uploadImg.snapshot.ref)
        .then(url => {
          console.log(url);
          const postsRef = collection(db, "blog-post");
            addDoc(postsRef, {
              title,
              createdAt: new Date(),
              image : url,
              content,
              author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
            });
            
            navigate("/");
  
          

        })
      }
    )
  };
  


  console.log("image:", image);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="main-box new-post">
        <h1>Create A New Post</h1>
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
            <div className="pic">
              <input type="file" onChange={fileChangeHandler} />
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
            <Button
              style={{ marginTop: "10px" }}
              color="button"
              variant="contained"
              type="submit"
              onClick={uploadHandler}
            >
              Create
            </Button>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default NewPost;
