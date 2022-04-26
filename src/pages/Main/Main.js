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
import { Grid, Paper } from "@mui/material";
import moment from "moment";

const Main = ({ isLoggedIn, getPostId }) => {
  const [posts, setPosts] = useState([]);
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
      const data = await getDocs(postsRef)

      console.log(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })));
      setPosts(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })))


    }
    getPosts()
  }, []);

  return (
    <div className="main-box">
      <h1 className="main-title">Articles</h1>
      <div className="top-posts">
        {posts.map((post) => {
          return (
            <div key={post.id} className="each-article">
              <Paper className="article-content">
                <div>
                  <div>
                    <p>{post.bean}</p>
                  </div>
                  <div>
                    <p>{post.method}</p>
                  </div>
                  <div>
                    <p>{post.weight} g</p>
                  </div>
                   <div>
                    <p>{post.grind} </p>
                  </div>
                  <div>
                    <p>{post.water} ml</p>
                  </div>
                  <div>
                    <p>{post.temp} °C</p>
                  </div>
                  <div>
                    <p>{post.taste} </p>
                  </div>
                  <div className="post-content">{post.note}</div>
                </div>
                <Link
                  className="link"
                  to={`/post/${post.id}`}
                  post={post}
                  onClick={(e) => getPostId(post.id)}
                >
                  Read more
                </Link>
            {/*     <p className="post-bottom">
                  Posted on {moment(post.createdAt.toDate()).calendar()}
                </p> 
               
                <p className="post-bottom">Posted by {post.author.name}</p> */}
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
