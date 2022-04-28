import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Paper, Button } from "@mui/material";

const Search = (isLoggedIn, getPostId) => {
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);

/*   const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("name");
 */




 

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
                      °C
                    </p>
                  </div>
                  <div>
                    <p>
                      <span class="font-b">Taste like</span> : {post.taste}{" "}
                    </p>
                  </div>
                  <div className="post-content">
                    <span class="font-b">Memo</span> : {post.note}
                  </div>
                </div>
                <div>
                  {isLoggedIn && post.author.id === auth.currentUser.uid && (
                    <>
                      <Link
                        className="link"
                        to={`/editpost/${post.id}`}
                        post={post}
                        onClick={(e) => getPostId(post.id)}
                      >
                        Edit
                      </Link>
                    </>
                  )}
                </div>
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

export default Search;
