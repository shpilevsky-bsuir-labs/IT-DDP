import React from "react";
// const AlbumPicture = require("./assets/n.jpg");

export default function Nav({
  userPhoto,
  onCollectionClick,
  onLoginClick,
  onHomeClick,
}) {
  return (
    <>
      <nav class="navigation">
        <button
          onClick={() => {
            onHomeClick();
          }}
          id="nav-item"
        >
          Home
        </button>
        <button
          class="collection"
          id="nav-item"
          onClick={() => {
            onCollectionClick();
          }}
        >
          Collection
        </button>
        <input type="search" name="" id="" />

        <div class="upload-button-container">
          <label for="file-input" id="upload-button">
            Upload
          </label>
          <input type="file" name="" id="file-input" hidden />
        </div>

        <div class="dropdown">
          <img src={userPhoto} class="dropbtn" />
          <div class="dropdown-content">
            <a class="dark-mode-button" href="#">
              Toggle dark mode
            </a>
          </div>
        </div>
        <button
          id="logout"
          onClick={() => {
            onLoginClick();
          }}
        >
          Logout
        </button>
      </nav>
    </>
  );
}
