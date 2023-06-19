import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const placement = (props) => {
    if (props.user === auth.currentUser.displayName) {
      return "border-end pe-5 me-5";
    } else {
        return " border-start ps-5 ms-5";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    // to empty the input value after sending msg
    setNewMessage("");
  };
  return (
    <div className="chat-room">
      <div className="chat-box ">
        <div className="header">
          <h1>Welcome to {room}</h1>
        </div>

        <div className="messages  overflow-y-scroll ">
          {messages.map((message) => (
            <div
              className={`message ${placement(message)}  border-top border-bottom  py-2  mb-3  border-1 border-white rounded  text-white`}
              key={message.id}
            >
              <span className="user fw-bold">{message.user} ~> </span>
              {message.text}
            </div>
          ))}
        </div>

        <div className="submit p-2 mt-3">
          <form onSubmit={handleSubmit} className="new-message-form">
            <div className="input-group mb-3 ">
              <textarea
                className="new-message-input input-lg form-control p-5 w-75 "
                placeholder="Type your message here.."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="send-button btn btn-outline-light btn-secondary h-100 "
                >
                  Send{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
