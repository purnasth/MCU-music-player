const music = document.getElementById("music");
const playlist = document.getElementById("playlist");
const playButtons = document.querySelectorAll(".play-button");

let currentTrackIndex = 0;

playButtons.forEach((button) => [
  button.addEventListener("click", () => {
    currentTrackIndex = Array.from(playButtons).indexOf(button);
    playTrack(button.getAttribute("data-src"));
  }),
]);

const playTrack = (src) => {
  music.src = src;
  music.play();
};
