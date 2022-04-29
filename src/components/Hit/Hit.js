import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Paper, Button } from "@mui/material";
import "./hit.css"

const Hit = ({hit}) => {
  return (
    <div>
          <Paper className="article-content">
            <div>
              <div>
                <p>
                  <span class="font-b">Bean</span> : {hit.bean}
                </p>
              </div>
              <div>
                <p>
                  <span class="font-b">Method</span> : {hit.method}
                </p>
              </div>
              <div>
                <p>
                  <span class="font-b">Brewing time</span> : {hit.time}{" "}
                </p>
              </div>
              <div>
                <p>
                  <span class="font-b">Amount of coffee</span> : {hit.weight} g
                </p>
              </div>
              <div>
                <p>
                  <span class="font-b">Grind size</span> : {hit.grind}{" "}
                </p>
              </div>
              <div>
                <p>
                  <span class="font-b">Amount of water</span> : {hit.water} ml
                </p>
              </div>
              <div>
                <p>
                  <span class="font-b">ater temperature</span> : {hit.temp} °C
                </p>
              </div>
              <div>
                <p>
                  <span class="font-b">Taste like</span> : {hit.taste}{" "}
                </p>
              </div>
              <div className="post-content">
                <span class="font-b">Memo</span> : {hit.note}
              </div>
            </div>
{/*             <div>
              {isLoggedIn && hit.author.id === auth.currentUser.uid && (
                <>
                  <Link
                    className="link"
                    to={`/editpost/${hit.id}`}
                    post={hit}
                    onClick={(e) => getPostId(hit.id)}
                  >
                    Edit
                  </Link>
                </>
              )}
            </div> */}
            {/*     <p className="post-bottom">
              Posted on {moment(post.createdAt.toDate()).calendar()}
            </p> 
           
            <p className="post-bottom">Posted by {post.author.name}</p> */}
          </Paper>

    </div>
  )
}

export default Hit