import React, { useState, useCallback, useEffect } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Paper, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import moment from "moment";

const SinglePost = ({ postId, getPostId, isLoggedIn }) => {
    const [bean, setBean] = useState("");
    const [method, setMethod] = useState("");
    const [time, setTime] = useState("");
    const [note, setNote] = useState("");
    const [weight, setWeight] = useState("");
    const [grind, setGrind] = useState(""); 
    const [water, setWater] = useState("");
    const [temp, setTemp] = useState("");
    const [taste, setTaste] = useState("");
    const [date, setDate] = useState("");
    const [author, setAuthor] = useState("");
  const { id: paramsId } = useParams();

  let navigate = useNavigate();

  const deletePost = async (id) => {
    const postDoc = doc(db, "coffee-log", id);
    await deleteDoc(postDoc);
    navigate("/");
  };

  const getPost = (id) => {
    const postsRef = doc(db, "coffee-log", id);
    return getDoc(postsRef);
  };

  const singlePostHandler = useCallback(async () => {
    try {
      const docSnap = await getPost(paramsId);
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
      setDate(docSnap.data().createdAt.toDate());
    } catch (err) {
      console.log("Error happend");
    }
  }, [paramsId]);

  useEffect(() => {
    console.log("Here is the id", postId);
    if (paramsId) {
      singlePostHandler();
    }
  }, [paramsId, singlePostHandler]);

  return (
    <div>
      <div className="main-box new-post">
        <h1>Note</h1>
        <Paper className="article-content">
                <div>
                  <div>
                    <p>
                      <span class="font-b">Bean</span> : {bean}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Method</span> : {method}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Brewing time</span> : {time}{" "}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Amount of coffee</span> :{" "}
                      {weight} g
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Grind size</span> : {grind}{" "}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Amount of water</span> : {water}{" "}
                      ml
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">ater temperature</span> : {temp}{" "}
                      °C
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Taste like</span> : {taste}{" "}
                    </p>
                  </div>
                  <div className="">
                    <span class="font-b post-content">Memo</span> : {note}
                  </div>
                </div>
               

                <div className="auth-edit">
                  <div>
                    {isLoggedIn && author.id === auth.currentUser.uid && (
                      <>
                        <Link
                          className="link auth-edit-link"
                          to={`/editpost/${postId}`}
                          onClick={(e) => getPostId(postId)}
                        >
                            Edit
                        </Link>
                      </>
                    )}
                  </div>

                  <p className="post-bottom">Posted on {moment(date).calendar()}</p>

                  <p className="post-bottom">Posted by {author.name}</p>
                </div>
              </Paper>
      </div>
      </div>
  );
};

export default SinglePost;
