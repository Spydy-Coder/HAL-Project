import React, { useEffect, useState } from "react";
import { Avatar, ClickAwayListener, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { SearchOutlined } from "@material-ui/icons";
import db, { auth } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function Sidebar({ hide }) {
  const currentUser = auth.currentUser.email;
  const [users, setUsers] = useState([]);
  const [{ role, user }, dispatch] = useStateValue();
  // const [{ role }, dispatch] = useStateValue();

  const [search, setSearch] = useState("");
  const [showdropdown, setDropdown] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (role === "admin") {
      unsubscribe = db.collection("Users").onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    } else {
      unsubscribe = db.collection("Admins").onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    }

    return () => {
      unsubscribe();
    };
  }, [role]);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
        setDropdown(!showdropdown);
        //localStorage.clear();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const createChat = () => {
    setDropdown(!showdropdown);
    const roomName = prompt("Please enter name for Room");
    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
      console.log("executed");
    }
  };

  return (
    <div className={hide ? "sidebar side__bar" : "sidebar"}>
      <div className="sidebar__header">
        {/* <Avatar src={user?.photoURL} /> */}
        <div className="text">
          <h2>Resolver</h2>
        </div>
        <div className="sidebar__headerRight">
          <IconButton
            className="icon"
            onClick={() =>
              alert(
                "Not added this functionality.\nClick on three dots to logout and add new room."
              )
            }
          >
            <DonutLargeIcon style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <ChatIcon style={{ color: "white" }} />
          </IconButton>
          <ClickAwayListener onClickAway={() => setDropdown(false)}>
            <div className="dropdown">
              <IconButton
                style={{ color: "white" }}
                onClick={() => {
                  setDropdown(!showdropdown);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <div
                className={
                  showdropdown ? "dropdown__list" : "dropdown__list hide"
                }
              >
                <ul>
                  <li onClick={createChat}>Add Room</li>
                  <li onClick={signOut}>Log Out</li>
                  <li
                    onClick={() =>
                      alert(
                        "Not added this functionality.\nTry Logout and add Room options"
                      )
                    }
                  >
                    Help ?
                  </li>
                </ul>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      </div>
      <div class="navbar">
        <Link to={"/"}>
          <div class="navbar__contacts">
            <i class="fa fa-user"></i>
            <span>Chats</span>
          </div>
        </Link>
        <Link to={"/rooms/BroadCast/random@gmail.com"}>
          <div class="navbar__status">
            <i class="fa fa-bullhorn"></i>
            <span>BroadCast</span>
          </div>
        </Link>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="Search a room"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat={true} />
        {users.map((user_temp) => {
          if (
            (user_temp.data.name.toLowerCase().includes(search.toLowerCase()) ||
              search === "") &&
            user_temp.data.email != currentUser
          ) {
            return (
              <SidebarChat
                key={user_temp.id}
                id={user_temp.id}
                name={user_temp.data.name}
              />
            );
          }

          return <></>;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
