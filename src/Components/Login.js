import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import db from "../firebase";
import "./Login.css";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        console.log("hello", result.user.displayName);
        const docref = db.collection("Users").doc(result.user.email);
        docref.set({
          email: result.user.email,
          name: result.user.displayName,
        });
        // we want email and his name and we store it in the database
        //localStorage.setItem("user", JSON.stringify(result.user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://stories.jobaaj.com/files/manage/thumb/641bf7335dd8e.jpg"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to Resolver</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
