import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../firebase";

function SidebarChat({ id, name, addNewChat }) {
  // console.log(id,name,addNewChat)
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 50000));
  }, []);

  useEffect(() => {
    let sender = auth.currentUser.email;
    let receiver = id;

    if (receiver != undefined) {
      if (sender > receiver) {
        [sender, receiver] = [receiver, sender];
      }
      const merge = sender + receiver;
      setUniqueId(merge);
    }

    // setUniqueId(uuidv4());
    // db.collection("MessageDetails").doc(uniqueId)
    // const uniqueid1 = generateUniqueIdFromString(sendrec);
    // const uniqueid2 = generateUniqueIdFromString(recsend);
    // if any of the two uniqueids found in the message database then it contains all the messages of that two parties
    // checkDocumentExists("Messages", uniqueid1)
    //   .then((exists) => {
    //     if (exists) {
    //       setUniqueId(uniqueid1);
    //       console.log(1)
    //     } else {
    //       checkDocumentExists("Messages", uniqueid2)
    //         .then((exists) => {
    //           setUniqueId(uniqueid2);
    //           console.log(2)
    //         })
    //         .catch((error) => {
    //           console.error("Error checking document existence:", error);
    //         });
    //     }
    //     console.log("id1:",uniqueid1)
    // console.log("id2",uniqueid2)
    // })
    // .catch((error) => {
    //   console.error("Error checking document existence:", error);
    // });
  }, [id]);

  // useEffect(() => {

  //   if(uniqueId && id){
  //     console.log(id)
  //     console.log(uniqueId)
  //     const q1 = citiesRef.where("users", "array-contains", auth.currentUser.email).
  //   where("users","array-contains", id).get().then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //               console.log(doc.id, " => ", doc.data());
  //             });
  //         })
  //         .catch((error) => {
  //           console.error("Error retrieving documents:", error);
  //         });
  //   //   console.log("query",q1)
  //   }

  // useEffect(()=>{
  //   if(uniqueId!=undefined || uniqueId!=""){

  //   }

  // },[uniqueId])

  //   // Perform any other actions that depend on the updated uniqueId
  // }, [uniqueId,id]);

  // useEffect(() => {
  //   if (id) {
  //     db.collection("Messages")
  //       .doc(uniqueId)
  //       .orderBy("timestamp", "desc")
  //       .onSnapshot((resultsnap) => {
  //         setMessages(
  //           resultsnap.docs.map((doc) => {
  //             return doc.data();
  //           })
  //         );
  //       });
  //   }
  // }, [id]);

  // const createChat = () => {
  //   const roomName = prompt("Please enter name for Room");
  //   if (roomName) {
  //     db.collection("Rooms").add({
  //       name: roomName,
  //     });
  //   }
  // };

  return !addNewChat ? (
    <>
      {uniqueId && (
        <Link to={`/rooms/${uniqueId}/${id}`}>
          <div className="sidebarChat">
            <Avatar src={`https://robohash.org/john${seed}.png`} />
            <div className="sidebarChat__info">
              <h2>{name}</h2>
              <p>
                {messages[0]?.message.substring(0, 15)}
                {messages[0]?.message.length > 15 && "..."}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  ) : (
    // <div onClick={createChat} className="sidebarChat" id="add__chat">
    //   {/* <h2>+ Add new Room</h2> */}
    // </div>
    <div className="a"></div>
  );
}

export default SidebarChat;
