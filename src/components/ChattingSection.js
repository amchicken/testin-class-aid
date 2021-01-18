import React from "react";

import Chat from "./ChatBox/Chat/Chat";

import { Route } from "react-router-dom";

function ChattingSection() {
  return <Route path="/course" component={Chat} />;
}

export default ChattingSection;
