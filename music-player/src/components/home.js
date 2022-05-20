import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";
import Nav from "./nav";
const AlbumPicture = require("./assets/n.jpg");
const playButton = require("./assets/play_button.png");
const pauseButton = require("./assets/pause-button.png");
const unlikeButton = require("./assets/like_white.png");
const likedButton = require("./assets/like_black.png");
const downloadButton = require("./assets/download_button.png");

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const drawAudio = (url) => {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => draw(normalizeData(filterData(audioBuffer))));
};

const filterData = (audioBuffer) => {
  const rawData = audioBuffer.getChannelData(0);
  const samples = 70;
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]);
    }
    filteredData.push(sum / blockSize);
  }
  return filteredData;
};

const normalizeData = (filteredData) => {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map((n) => n * multiplier);
};

const draw = (normalizedData) => {
  // set up the canvas
  const canvas = document.querySelector("canvas");
  const dpr = window.devicePixelRatio || 1;
  const padding = 20;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.translate(0, canvas.offsetHeight / 2 + padding);

  const width = canvas.offsetWidth / normalizedData.length;
  for (let i = 0; i < normalizedData.length; i++) {
    const x = width * i;
    let height = normalizedData[i] * canvas.offsetHeight - padding;
    if (height < 0) {
      height = 0;
    } else if (height > canvas.offsetHeight / 2) {
      height = height > canvas.offsetHeight / 2;
    }
    drawLineSegment(ctx, x, height, width, (i + 1) % 2);
  }
};

const drawLineSegment = (ctx, x, height, width, isEven) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  height = isEven ? height : -height;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
  ctx.lineTo(x + width, 0);
  ctx.stroke();
};

// import { User } from "./user.js";
// document
//   .getElementsByClassName("like-button")[0]
//   .addEventListener("click", () => {
//     changeLikeImage();
//   });
// function changeLikeImage() {
//   var play_button = document.getElementsByClassName("like-button")[0];
//   const root = location.protocol + "//" + location.host;
//   const unlike_button_location = root.concat("/assets/like_white.png");
//   const like_button_location = root.concat("/assets/like_black.png");
//   if (play_button.src == unlike_button_location) {
//     play_button.src = like_button_location;
//   } else {
//     play_button.src = unlike_button_location;
//   }
//   const user = {
//     user_id: 1,
//     name: "Nikita",
//   };

//   User.create(user).then(() => {
//     console.log("created");
//   });
// }

// async function uploadFile() {
//   const fileInput = document.getElementById("file-input");
//   fileInput.addEventListener("change", (event) => {
//     var file = event.target.files[0];
//     var storageRef = firebase;
//   });
//   formData.append();
// }

export default function Home() {
  const [liked, setLiked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [redirectCollection, setRedirectCollection] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const navigate = useNavigate();

  function playTrack() {
    var audie = document.getElementById("audio");
    if (audie.paused == false) audie.pause();
    else audie.play();
  }

  function downloadTrack() {
    console.log("down");
    fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3")
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "clip.mp3";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("oh no!"));
  }

  function onCollectionClick() {
    navigate("/collection");
  }

  function onLoginClick() {
    navigate("/login");
  }

  function onHomeClick() {
    navigate("/");
  }

  useEffect(() => {
    drawAudio(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3"
    );
  });

  return (
    <>
      <Nav
        userPhoto={AlbumPicture}
        onCollectionClick={onCollectionClick}
        onLoginClick={onLoginClick}
        onHomeClick={onHomeClick}
      />
      <main>
        <div class="track-container">
          <div class="track-info">
            <span class="title">Track</span>
            <span class="desc">Full description</span>
          </div>
          <img class="album-image" src={AlbumPicture} alt="" />
        </div>
        <div class="canva-container">
          <canvas></canvas>
        </div>

        <audio
          id="audio"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3"
          hidden
        ></audio>
      </main>
      <footer>
        <div class="player-controls-container">
          <div class="player-controls-item">
            <img
              class="play-button"
              src={paused ? pauseButton : playButton}
              alt=""
              onClick={() => {
                setPaused(!paused);
                playTrack();
              }}
            />
            <div class="track-info-small">
              <span class="title-small">Track</span>
              <span class="desc-small">Full description</span>
            </div>
          </div>
          <div class="player-controls-item">
            <img
              class="like-button"
              src={liked ? unlikeButton : likedButton}
              alt=""
              onClick={() => {
                setLiked(!liked);
              }}
            />
            <img
              onClick={downloadTrack}
              class="download-button"
              src={downloadButton}
              alt=""
            />
          </div>
        </div>
      </footer>
    </>
  );
}
