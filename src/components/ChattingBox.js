import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

import Messages from "./ChatBox/Messages/Messages";
import Input from "./ChatBox/Input/Input";
import Quiz from "./ChatBox/Quiz";

import { onlineStatus } from "../actions/selectedCourseAction";

const ENDPOINT = "localhost:5000";
// const ENDPOINT = "https://chat-class-aid.herokuapp.com/";

let socket;

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}

const Chat = ({ location }) => {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const login = useSelector((state) => state.login);
  const { selected, studentList } = useSelector((state) => state.selectCourse);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [quiz, setQuiz] = useState(false);
  const [makeQuiz, setMakeQuiz] = useState(false);
  const [question, setQuestion] = useState("");
  const [choice, setChoice] = useState([]);

  const room = location.pathname.split("/")[2];

  useEffect(() => {
    if (isMountedRef) {
      socket = io(ENDPOINT);
      socket.emit("join", {
        id: login.user._id,
        name: login.user.name,
        room,
      });
    }
  }, [isMountedRef, room, login, studentList, dispatch]);

  useEffect(() => {
    socket.emit("disconnect", login.user._id);
  }, [location, login, selected, room]);

  useEffect(() => {
    if (isMountedRef) {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.on("online", () => {
        dispatch(onlineStatus(login.user, studentList));
        console.log("ONLINE");
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

      socket.on("roomData", ({ users }) => {
        // console.log(users);
      });

      socket.on("okie", ({ ans }) => {
        alert(ans);
      });
    }
  }, [isMountedRef]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", login.user._id, message, () => setMessage(""));
    }
  };

  const popQuiz = (event) => {
    event.preventDefault();
    socket.emit("popQuiz", login.user._id);
  };

  const quizAns = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    socket.emit("answerQuiz", login.user._id, event.target.value);
    setQuiz(false);
  };

  const makeQ = (event) => {
    event.preventDefault();
    setMakeQuiz(!makeQuiz);
  };

  const texx = useRef(null);
  const q1 = useRef(null);
  const q2 = useRef(null);
  const q3 = useRef(null);
  const q4 = useRef(null);

  const takeQuiz = (event) => {
    event.preventDefault();
    const QuestionObject = {
      question: texx.current.value,
      choice: [
        q1.current.value,
        q2.current.value,
        q3.current.value,
        q4.current.value,
      ],
    };
    socket.emit("popQuiz", login.user._id, QuestionObject);
  };

  return (
    <div className="chaxbox-container">
      {quiz ? (
        <Quiz question={question} choice={choice} quizAns={quizAns} />
      ) : (
        ""
      )}
      {makeQuiz ? (
        <div>
          <form onSubmit={takeQuiz}>
            Q<input type="text" ref={texx} />
            1<input type="text" ref={q1} />
            2 <input type="text" ref={q2} />
            3 <input type="text" ref={q3} />
            4 <input type="text" ref={q4} />
            <button type="submit">MAKE QUIZ</button>
          </form>
        </div>
      ) : (
        ""
      )}
      {selected.author_id === login.user._id ? (
        <div>
          <button onClick={popQuiz} className="quiz-btn">
            POPQUIZ
          </button>
          <button onClick={makeQ} className="quiz-btn">
            MKAE QUIZZ
          </button>
        </div>
      ) : (
        ""
      )}

      <Messages messages={messages} name={login.user.name} />
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
