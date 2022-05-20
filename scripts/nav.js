document.getElementById("logout").onclick = function () {
  location.href = "./login.html";
};

document.getElementsByClassName("collection")[0].onclick = function () {
  location.href = "./collection.html";
};

function homeButtonOnClick() {
  location.href = "./index.html";
}

function downloadTrack() {
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

// mobile flex column