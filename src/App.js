import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from "./pages/Main/Main";
import NewPost from "./pages/NewPost/NewPost";
import EditPost from "./pages/Edit/EditPost";
import Login from "./pages/Login/Login";
import Nav from "./components/Nav/Nav";
import StopWatch from "./components/StopWatch/StopWatch";
import { useState } from "react";
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
      <Box className="hero-section"></Box>
      <Routes>
        <Route
          path="/"
          element={<Main isLoggedIn={isLoggedIn} getPostId={postIdHandler} />}
        />

        <Route
          path="/timer"
          element={<StopWatch />}
        />
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
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
