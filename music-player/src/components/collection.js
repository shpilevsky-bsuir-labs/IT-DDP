import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";
import Nav from "./nav";
import { pathReference } from "./firebase";
import { listAll } from "firebase/storage";

const AlbumPicture = require("./assets/n.jpg");
const playButton = require("./assets/play_button.png");
const pauseButton = require("./assets/pause-button.png");
const unlikeButton = require("./assets/like_white.png");
const likedButton = require("./assets/like_black.png");
const downloadButton = require("./assets/download_button.png");



export default function Collection() {
  const [liked, setLiked] = useState(false);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  function playTrack() {
    var audie = document.getElementById("audio");
    if (audie.paused == false) audie.pause();
    else audie.play();
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

  return (
    <>
      <Nav
        userPhoto={AlbumPicture}
        onCollectionClick={onCollectionClick}
        onLoginClick={onLoginClick}
        onHomeClick={onHomeClick}
      />
      <main class="track-collection">
        <table>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Artist</th>
            <th>Heart</th>
            <th>Time</th>
          </tr>
          <tr>
            <td class="play-button-container">
              <img src={playButton} alt="" class="collection-play-button" />
            </td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>heart</td>
            <td>3:23</td>
          </tr>
          <tr>
            <td class="play-button-container">
              <img src={playButton} alt="" class="collection-play-button" />
            </td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>heart</td>
            <td>3:23</td>
          </tr>
          <tr>
            <td class="play-button-container">
              <img src={playButton} alt="" class="collection-play-button" />
            </td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>heart</td>
            <td>3:23</td>
          </tr>
        </table>
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

    //   {/* <script
    //       type="module"
    //       src="https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js"
    //     ></script>

    //     <script src="./scripts/darkMode.js"></script>
    //     <script src="./scripts/logout.js"></script>
    //     <script src="./scripts/nav.js"></script> */}
    //   {/* </body> */}
  );
}
