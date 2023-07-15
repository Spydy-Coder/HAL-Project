import React, { useEffect, useState } from "react";
import { Avatar, ClickAwayListener, IconButton } from "@material-ui/core";
import { useStateValue } from "../StateProvider";
import PopupForm from "./popupform";
import "./Chat.css";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
  ArrowBack,
} from "@material-ui/icons";
import { ReportProblem } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import db from "../firebase";
// import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function Chat({ hide, removeRoom }) {
  const [{ user, role }, dispatch] = useStateValue();
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId, receiver } = useParams();
  const [showPopupForm, setPopupForm] = useState(false);
  // roomId contains the collection which contain all the chats between two parties
  // there will be sender and receiver so we create two unique ids and check which is there in the database
  // roomId contains the unique id which stores all the messages
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [showdropdown, setDropdown] = useState(false);

  useEffect(() => {
    setDropdown(false);
    setSeed(Math.floor(Math.random() * 50000));

    if (roomId) {
      const search = role === "admin" ? "Users" : "Admins";
      console.log("search", search);
      db.collection(search)
        .doc(receiver)
        .onSnapshot((snapshot) => {
          if (snapshot.data()) {
            setRoomName(snapshot.data().name);
          }
          console.log("snapshot:", snapshot.data());
        });
      db.collection("Messages")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((resultsnap) => {
          setMessages(
            resultsnap.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 50000));
  }, []);

  const complaint = (inputmsg) => {
    if (inputmsg) {
      db.collection("Messages").doc(roomId).collection("messages").add({
        message: inputmsg,
        sender: user.email,
        receiver: receiver,
        sender_name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      // console.log("user name:",user.displayName);
      db.collection("Messages").doc(roomId).collection("messages").add({
        message: input,
        sender: user.email,
        receiver: receiver,
        sender_name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    } else {
      alert("Type something first");
    }
  };
  return (
    <div className={hide ? "chat Chat" : "chat"}>
      <div className="chat__header">
        <Link to="/">
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Link>
        <Avatar src={`you can add here`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {messages.length !== 0
              ? `Last seen at ` +
                new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()
              : ""}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton
            onClick={() =>
              alert(
                "Not added this functionality.\nClick on three dots to delete room."
              )
            }
          >
            <SearchOutlined />
          </IconButton>
          {/*<IconButton>
            <AttachFile />s
          </IconButton>*/}
          <ClickAwayListener onClickAway={() => setDropdown(false)}>
            <div className="dropdown">
              <IconButton
                onClick={() => {
                  setDropdown(!showdropdown);
                }}
              >
                <MoreVert />
              </IconButton>
              <div
                className={
                  showdropdown ? "dropdown__list" : "dropdown__list hide"
                }
              >
                <ul>
                  {/* <Link to="/">
                    <li
                      onClick={() => {
                        removeRoom(roomId);
                      }}
                    >
                      Delete Room
                    </li>
                  </Link> */}
                </ul>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <div key={message.timestamp}>
            <p
              className={`chat__message ${
                message.receiver === receiver && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}

              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton
          className="attach__file"
          onClick={() => {
            console.log("jy");
            console.log(showPopupForm);
            setPopupForm(true);
          }}
        >
          <ReportProblem />
        </IconButton>
        <form>
          <input
            required={true}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <IconButton
          onClick={() =>
            alert(
              "Not added this functionality.\nClick on three dots on top right to delete room."
            )
          }
        >
          <Mic />
        </IconButton>
      </div>
      {showPopupForm && (
        <PopupForm
          open={true}
          closePopup={() => setPopupForm(false)}
          func={complaint}
        />
      )}
    </div>
  );
}

export default Chat;
