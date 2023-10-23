const music = document.getElementById("music");
const playlist = document.getElementById("playlist");
const playButtons = document.querySelectorAll(".play-button");
const albumArtImages = document.querySelectorAll(".album-art");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const shuffleButton = document.getElementById("shuffle-button");
const repeatButton = document.getElementById("repeat-button");

let currentTrackIndex = 0;
let isShuffled = false;
let repeatMode = "all";

playButtons.forEach((button) =>
  button.addEventListener("click", () => {
    currentTrackIndex = Array.from(playButtons).indexOf(button);
    playTrack(button.getAttribute("data-src"));
  })
);

prevButton.addEventListener("click", () => playPreviousTrack());
nextButton.addEventListener("click", () => playNextTrack());
shuffleButton.addEventListener("click", () => toggleShuffle());
repeatButton.addEventListener("click", () => toggleRepeatMode());

music.addEventListener("ended", () => handleTrackEnded());

const playTrack = (src) => {
  music.src = src;
  music.play();
  // Show the album art for the currently playing song
  albumArtImages.forEach((img, index) => {
    img.style.display = index === currentTrackIndex ? "block" : "none";
  });
};

const playPreviousTrack = () => {
  currentTrackIndex =
    (currentTrackIndex - 1 + playButtons.length) % playButtons.length;
  playTrack(playButtons[currentTrackIndex].getAttribute("data-src"));
};

const playNextTrack = () => {
  if (isShuffled) {
    currentTrackIndex = getRandomIndex();
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % playButtons.length;
  }
  playTrack(playButtons[currentTrackIndex].getAttribute("data-src"));
};

const toggleShuffle = () => {
  isShuffled = !isShuffled;
  shuffleButton.textContent = isShuffled ? "Shuffle (On)" : "Shuffle (Off)";
};

const toggleRepeatMode = () => {
  if (repeatMode === "all") {
    repeatMode = "one";
    repeatButton.textContent = "Repeat (One)";
  } else if (repeatMode === "one") {
    repeatMode = "none";
    repeatButton.textContent = "Repeat (None)";
  } else {
    repeatMode = "all";
    repeatButton.textContent = "Repeat (All)";
  }
};

const handleTrackEnded = () => {
  if (repeatMode === "one") {
    playTrack(playButtons[currentTrackIndex].getAttribute("data-src"));
  } else if (repeatMode === "all") {
    playNextTrack();
  }
};

const getRandomIndex = () => {
  let index;
  do {
    index = Math.floor(Math.random() * playButtons.length);
  } while (index === currentTrackIndex);
  return index;
};
