import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  limitToLast,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth, storage } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./newPost.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import StopWatch from "../../components/StopWatch/StopWatch";
import Taste from "../../components/Taste/Taste";

import Select from "react-select";

const NewPost = ({ isLoggedIn }) => {
  const [bean, setBean] = useState("");
  const [method, setMethod] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [weight, setWeight] = useState("");
  const [grind, setGrind] = useState(""); 
  const [water, setWater] = useState("");
  const [temp, setTemp] = useState("");
  const [taste, setTaste] = useState("");


  const theme = createTheme({
    palette: {
      button: {
        main: "#b2dfdb",
      },
    },
  });

  const postsRef = collection(db, "coffee-log");
  let navigate = useNavigate();

  const newPost = async () => {
    await addDoc(postsRef, {
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
    navigate("/");
  };
  /*
  const fileChangeHandler = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
  }
  };
*/
  /*
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
          const postsRef = collection(db, "coffee-log");
            addDoc(postsRef, {
              bean,
              createdAt: new Date(),
              note,
              author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
            });
            
            navigate("/");
        })
      }
    )
  };
  */

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="main-box">
        <div className="new-post">
        <h1>Create A New Post</h1>
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
            <Button
              style={{ marginTop: "10px" }}
              color="button"
              variant="contained"
              type="submit"
              onClick={newPost}
            >
              Create
            </Button>
          </div>
        </Paper>
      </div>
      </div>
    </ThemeProvider>
  );
};

export default NewPost;
