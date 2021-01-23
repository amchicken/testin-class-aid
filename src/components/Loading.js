import React from "react";

function Loading({ fullscreen }) {
  return (
    <div className={fullscreen ? "fullScreen" : "maxContainer"}>
      <div class="LoaderBalls">
        <div class="LoaderBalls__item"></div>
        <div class="LoaderBalls__item"></div>
        <div class="LoaderBalls__item"></div>
      </div>
    </div>
  );
}

export default Loading;
