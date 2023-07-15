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
        // checking whether it is a admin or not
        const documentRef = db.collection("Admins").doc(result.user.email);
        documentRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              // Document exists
              const data = doc.data();
              dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
                role: "admin",
              });
              console.log(data);
            } else {
              // Document does not exist
              console.log("Document does not exist");
              dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
                role: "user",
              });
              console.log("hello", result.user.displayName);
              const docref = db.collection("Users").doc(result.user.email);
              docref.set({
                email: result.user.email,
                name: result.user.displayName,
              });
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
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
