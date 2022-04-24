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
import { auth, db } from "../firebase-config";
import "./pages.css";
import { Link } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import moment from "moment";

const Main = ({ isLoggedIn, getPostId }) => {
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "blog-post");

  useEffect(() => {
    const getAllPosts = () => {
      const q = query(postsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(allPosts);
      });
    };
    getAllPosts();
  }, []);

  return (
    <div className="main-box">
      <h1 className="main-title">Articles</h1>
      {/*       <Sidebar posts={posts} setPosts={setPosts}/>
       */}
      <div className="top-posts">
        {posts.map((post) => {
          return (
            <div key={post.id} className="each-article">
              <Paper className="article-content">
                <div>
                  <div>
                    <h1>{post.title}</h1>
                  </div>
                  <div className="post-img">
                    <img src={post.image} alt="" style={{ width: "100%" }} />
                  </div>
                  <div className="post-content">{post.content}</div>
                </div>
                <Link
                  className="link"
                  to={`/post/${post.id}`}
                  post={post}
                  onClick={(e) => getPostId(post.id)}
                >
                  Read more
                </Link>
                <p className="post-bottom">
                  Posted on {moment(post.createdAt.toDate()).calendar()}
                </p>
                <p className="post-bottom">Posted by {post.author.name}</p>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
