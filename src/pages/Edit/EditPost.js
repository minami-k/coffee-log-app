import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc
} from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./editPost.css";
import { Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const EditPost = ({ isLoggedIn, postId, setPostId }) => {
  const [post, setPost] = useState();
  /* const [loading, setLoading] = useState(true)
   */
  const [bean, setBean] = useState("");
  const [method, setMethod] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [weight, setWeight] = useState("");
  const [grind, setGrind] = useState(""); 
  const [water, setWater] = useState("");
  const [temp, setTemp] = useState("");
  const [taste, setTaste] = useState("");
  const [author, setAuthor] = useState("");


  const theme = createTheme({
    palette: {
      button: {
        main: "#b2dfdb",
      },
    },
  });

  let navigate = useNavigate();

  const postsRef = doc(db, "coffee-log", postId);
  const updatePost = (id) => {
    const postDoc = collection(db, "coffee-log");
    return updateDoc(postDoc);
  };

  const editPost = async () => {
    await updateDoc(postsRef, {
      bean,
      method,
      time,
      weight,
      grind,
      water,
      temp,
      taste,
      note,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
  };

  const getPost = (id) => {
    const postsRef = doc(db, "coffee-log", id);
    return getDoc(postsRef);
  };

  const editPostHandler = async () => {
    try {
      const docSnap = await getPost(postId);
      console.log("The doc", docSnap.data());

      setBean(docSnap.data().bean);
      setMethod(docSnap.data().method);
      setTime(docSnap.data().time);
      setWeight(docSnap.data().weight);
      setGrind(docSnap.data().grind);
      setWater(docSnap.data().water);
      setTemp(docSnap.data().temp);
      setTaste(docSnap.data().taste);
      setAuthor(docSnap.data().author);
      setNote(docSnap.data().note);
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
  const deletePost = async (id) => {
    const postDoc = doc(db, "coffee-log", id);
    await deleteDoc(postDoc);
    navigate('/')
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="main-box new-post">
        <h1>Edit A Note</h1>
        <Paper>
          <div className="post-form">
          <div>
              <label>Bean:</label>
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined"
                placeholder="Bean type"
                value={bean}
                onChange={(e) => {
                  setBean(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Method:</label>
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined"
                placeholder="Title"
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Brewing time:</label>
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined"
                placeholder="00 : 00"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Weight(g):</label>
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined"
                placeholder="amount of coffee"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Grind Size:</label>
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined"
                placeholder="Coarse, medium-coarse ..."
                value={grind}
                onChange={(e) => {
                  setGrind(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Water(ml):</label>
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined"
                placeholder="Amount of water"
                value={water}
                onChange={(e) => {
                  setWater(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Water Temperature(°C):</label>
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined"
                placeholder="Water temperature"
                value={temp}
                onChange={(e) => {
                  setTemp(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Taste:</label>
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined"
                placeholder="Sour, bitter, sweet etc"
                value={taste}
                onChange={(e) => {
                  setTaste(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Note:</label>
              <br />
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                style={{ width: "100%", height: "300px" }}
                placeholder="Write here"
              ></textarea>
            </div>
            <div>
              {isLoggedIn && author.id === auth.currentUser.uid && (
                <div className="delete-edit-button">
                  <Button
                    className="edit-button delete"
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      deletePost(postId);
                    }}
                  >
                    Delete
                  </Button>
                  <Link
                className="edit-button button"
                onClick={editPost}
                variant="contained"
                type="submit"
                to={`/`}
              >
                Edit
              </Link>
              <Link to="/" className="cancel-button" >
                  Go back to Home
                </Link>
                </div>
 )}
 
          </div>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default EditPost;
