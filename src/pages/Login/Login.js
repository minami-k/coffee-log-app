import React from "react";
import {auth, provider} from "../../firebase-config" 
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';

const Login = ({setIsLoggedIn}) => {
  let navigate = useNavigate()

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isLoggedIn", true)
      setIsLoggedIn(true)
      navigate("/")
    } )
  }

  return (
    <div className="login-form">
      <p>Sign In With Google to Continue</p>
      <Button  variant="outlined" onClick={signIn}>Sign in with Google</Button>
    </div>
  );
};

export default Login;
