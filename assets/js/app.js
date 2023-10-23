const music = document.getElementById("music");
const playlist = document.getElementById("playlist");
const playButtons = document.querySelectorAll(".play-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const volumeControl = document.getElementById("volume-control");
const volumeLabel = document.getElementById("volume-label");

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
prevButton.addEventListener("click", () => {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = playButtons.length - 1;
  }
  playTrack(playButtons[currentTrackIndex].getAttribute("data-src"));
});

nextButton.addEventListener("click", () => {
  currentTrackIndex++;
  if (currentTrackIndex > playButtons.length - 1) {
    currentTrackIndex = 0;
  }
  playTrack(playButtons[currentTrackIndex].getAttribute("data-src"));
});

volumeControl.addEventListener("input", () => {
  music.volume = volumeControl.value;
  volumeLabel.innerHTML = volumeControl.value;
});
