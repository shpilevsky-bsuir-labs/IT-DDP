// Set up audio context
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

drawAudio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3");

document.getElementById("logout").onclick = function () {
  location.href = "./login.html";
};

document.getElementsByClassName("collection").onclick = function () {
  location.href = "./collection.html";
};

function onClickPlayButton() {
  var audie = document.getElementById("audio");
  if (audie.paused == false) audie.pause();
  else audie.play();
  changeImage();
}

function changeImage() {
  var play_button = document.getElementsByClassName("play-button")[0];
  const root = location.protocol + "//" + location.host;
  const play_button_location = root.concat("/IT-DDP/assets/play_button.png");
  const pause_button_location = root.concat("/IT-DDP/assets/pause-button.png");
  if (play_button.src == play_button_location) {
    play_button.src = pause_button_location;
  } else {
    play_button.src = play_button_location;
  }
}

function changeLikeImage() {
  var play_button = document.getElementsByClassName("like-button")[0];
  const root = location.protocol + "//" + location.host;
  const unlike_button_location = root.concat("/IT-DDP/assets/like_white.png");
  const like_button_location = root.concat("/IT-DDP/assets/like_black.png");
  if (play_button.src == unlike_button_location) {
    play_button.src = like_button_location;
  } else {
    play_button.src = unlike_button_location;
  }
}
