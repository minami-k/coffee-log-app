import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from "./pages/Main/Main";
import NewPost from "./pages/NewPost/NewPost";
import EditPost from "./pages/Edit/EditPost";
import SinglePost from "./pages/SinglePost/SinglePost";
import Login from "./pages/Login/Login";
import Search from "./components/Search/Search";
import Nav from "./components/Nav/Nav";
import StopWatch from "./components/StopWatch/StopWatch";
import { Box } from "@mui/material";
import "./style.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const [postId, setPostId] = useState("");

  const postIdHandler = (id) => {
    console.log("This is the post Id", id);
    setPostId(id);
  };

  return (
    <Router>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Box className="hero-section">
        <Box className="hero-filter"><h1>Coffee Log App</h1></Box>
      </Box>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={isLoggedIn}
              getPostId={postIdHandler}
              postId={postId}
            />
          }
        />

        <Route path="/timer" element={<StopWatch />} />
        <Route
          path="/newpost"
          element={
            <NewPost
              isLoggedIn={isLoggedIn}
              postId={postId}
              setPostId={setPostId}
            />
          }
        />
        <Route
          path="/editpost/:id"
          element={
            <EditPost
              isLoggedIn={isLoggedIn}
              postId={postId}
              setPostId={setPostId}
            />
          }
        />
                 <Route
          path="/post/:id"
          element={<SinglePost isLoggedIn={isLoggedIn} getPostId={postIdHandler} postId={postId} />}
        /> 

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
         <Route
          path="/search"
          element={<Search isLoggedIn={isLoggedIn} getPostId={postIdHandler} postId={postId} />}
        /> 
      </Routes>
    </Router>
  );
}

export default App;
