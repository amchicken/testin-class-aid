import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

import Messages from "./ChatBox/Messages/Messages";
import Input from "./ChatBox/Input/Input";
import Quiz from "./ChatBox/Quiz";

const ENDPOINT = "localhost:5000";
// const ENDPOINT = "https://chat-class-aid.herokuapp.com/";

let socket;

const Chat = ({ location }) => {
  const login = useSelector((state) => state.login);
  const { selected } = useSelector((state) => state.selectCourse);
  const [name, setName] = useState(login.user.name);
  const [room, setRoom] = useState(selected.course);
  // users all user in chat
  // const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [quiz, setQuiz] = useState(false);
  const [question, setQuestion] = useState("");
  const [choice, setChoice] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location, name, room]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("StartQuiz", ({ question, choice }) => {
      setQuiz(true);
      setQuestion(question);
      setChoice(choice);
      console.log(`QUESTION: ${question}`);
      console.log(choice);
      setTimeout(() => {
        setQuiz(false);
        setQuestion("");
        setChoice([]);
        console.log("DELETE QUESTION");
      }, 5000);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const popQuiz = (event) => {
    event.preventDefault();
    socket.emit("popQuiz");
  };

  const quizAns = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setQuiz(false);
  };

  return (
    <div className="chaxbox-container">
      {quiz ? (
        <Quiz question={question} choice={choice} quizAns={quizAns} />
      ) : (
        ""
      )}
      {selected.author_id === login.user._id ? (
        <button onClick={popQuiz} className="quiz-btn">
          POPQUIZ
        </button>
      ) : (
        ""
      )}

      <Messages messages={messages} name={name} />
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
