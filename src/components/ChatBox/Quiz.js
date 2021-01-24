import React from "react";

function Quiz({ question, choice, quizAns }) {
  return (
    <div className="quiz-container">
      <h2>QUIZ</h2>
      <h3>{question}</h3>
      <div>
        {choice.map((key, index) => (
          <button value={index} onClick={quizAns}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
