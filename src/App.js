import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";
import Loading from "./Components/Loading";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const listener = auth.onAuthStateChanged((authUser) => {
      setLoading(false);
      if (authUser) {
        const documentRef = db.collection("Admins").doc(authUser.email);
        documentRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              // Document exists
              dispatch({
                type: actionTypes.SET_USER,
                user: authUser,
                role: "admin",
              });
            } else {
              // Document does not exist
              dispatch({
                type: actionTypes.SET_USER,
                user: authUser,
                role: "user",
              });
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
          role: null,
        });
      }
    });
    return () => listener();
  }, [dispatch]);

  const removeRoom = (roomid) => {
    db.collection("Rooms")
      .doc(roomid)
      .delete()
      .then(() => {
        alert("Room Deleted");
      });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route path="/" exact>
                <Sidebar hide={false} />
                <Chat hide={true} removeRoom={removeRoom} />
                <div className="project__info">
                  <img
                    src="https://stories.jobaaj.com/files/manage/thumb/641bf7335dd8e.jpg"
                    alt=""
                  />
                  <div className="text">
                    <h1>Resolver</h1>
                  </div>
                </div>
              </Route>
              <Route path="/rooms/:roomId/:receiver">
                <Sidebar hide={true} />
                <Chat hide={false} removeRoom={removeRoom} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
