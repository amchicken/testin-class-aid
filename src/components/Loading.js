import React from "react";

function Loading({ fullscreen }) {
  return (
    <div className={fullscreen ? "fullScreen" : "maxContainer"}>
      <div className="LoaderBalls">
        <div className="LoaderBalls__item"></div>
        <div className="LoaderBalls__item"></div>
        <div className="LoaderBalls__item"></div>
      </div>
    </div>
  );
}

export default Loading;
