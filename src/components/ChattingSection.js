import React from "react";

import Chat from "./ChatBox/Chat/Chat";
import Join from "./ChatBox/Join/Join";

import { Route } from "react-router-dom";

function ChattingSection() {
  return (
    <div>
      <Route path="/" exact component={Join} />
      <Route path="/course" component={Chat} />
    </div>
  );
}

export default ChattingSection;
