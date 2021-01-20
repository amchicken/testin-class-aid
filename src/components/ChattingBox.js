import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

import Messages from "./ChatBox/Messages/Messages";
import Input from "./ChatBox/Input/Input";

const ENDPOINT = "localhost:5000";

let socket;

const Chat = ({ location }) => {
  const login = useSelector((state) => state.login);
  const { selected } = useSelector((state) => state.selectCourse);
  const [name, setName] = useState(login.user.name);
  const [room, setRoom] = useState(selected.course);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="chaxbox-container">
      <div className="chat-body">
        <Messages messages={messages} name={name} />
      </div>
      <div className="chat-input">
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
