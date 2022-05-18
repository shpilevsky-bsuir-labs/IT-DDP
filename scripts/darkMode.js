const button = document.querySelector(".dark-mode-button");

button.onclick = () => {
  const body = document.querySelector("body")
    body.classList.toggle("dark")
};
