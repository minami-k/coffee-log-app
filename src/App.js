import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from "./pages/Main";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import Nav from "./components/Nav";

import { useState } from "react";
import { Box } from "@mui/material";
import "./style.css"
import SinglePost from "./pages/SinglePost";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const [postId, setPostId] = useState("")

  const postIdHandler = (id) => {
    console.log("This is the post Id", id);
    setPostId(id)
  }

  return (
    <Router>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Box className="hero-section">
        <Box className="hero-filter"><h1>Sample Blog</h1></Box>
      </Box>
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn}  getPostId={postIdHandler}/>} />
        <Route path="/post/:id" element={<SinglePost isLoggedIn={isLoggedIn}  getPostId={postIdHandler} postId={postId} setPostId={setPostId} />} />
        <Route path="/newpost" element={<NewPost isLoggedIn={isLoggedIn} postId={postId} setPostId={setPostId} />} />
        <Route path="/editpost/:id" element={<EditPost isLoggedIn={isLoggedIn} postId={postId} setPostId={setPostId}/>} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
