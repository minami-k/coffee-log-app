import React, { useState, useEffect } from "react";
import {
  getDocs,
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import "./main.css";
import { Link } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Main = ({ isLoggedIn, getPostId, postId }) => {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");

  const postsRef = collection(db, "coffee-log");

  useEffect(() => {
    /*     const getAllPosts = () => {
      const q = query(postsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(allPosts);
      });
    };
    getAllPosts(); */
    const getPosts = async () => {
      const data = await getDocs(postsRef);

      console.log(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getPosts();
  }, []);

  return (
    <div className="main-box">
      <div className="top-posts">
        {posts.map((post) => {
          return (
            <div key={post.id} className="each-article">
              <Paper className="article-content">
                <div>
                  <div>
                    <p>
                      <span class="font-b">Bean</span> : {post.bean}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Method</span> : {post.method}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Brewing time</span> : {post.time}{" "}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Amount of coffee</span> :{" "}
                      {post.weight} g
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Grind size</span> : {post.grind}{" "}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Amount of water</span> : {post.water}{" "}
                      ml
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">ater temperature</span> : {post.temp}{" "}
                      ??C
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Taste like</span> : {post.taste}{" "}
                    </p>
                  </div>
                  <div className="post-content">
                    <span class="font-b post-content">Memo</span> : {post.note}
                  </div>
                </div>
                <Link
                          className="link"
                          to={`/post/${post.id}`}
                          post={post}
                          onClick={(e) => getPostId(post.id)}
                        >
                          Read more
                        </Link>

                <div className="auth-edit">
                  <div>
                    {isLoggedIn && post.author.id === auth.currentUser.uid && (
                      <>
                        <Link
                          className="link auth-edit-link"
                          to={`/editpost/${post.id}`}
                          post={post}
                          onClick={(e) => getPostId(post.id)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
                        </Link>
                      </>
                    )}
                  </div>

                  <p className="post-bottom">
                    Posted on {moment(post.createdAt.toDate()).calendar()}
                  </p>

                  <p className="post-bottom">Posted by {post.author.name}</p>
                </div>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
