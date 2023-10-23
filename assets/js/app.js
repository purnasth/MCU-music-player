const music = document.getElementById('music');
const playlist = document.getElementById('playlist');
const playButtons = document.querySelectorAll('.play-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const shuffleButton = document.getElementById('shuffle-button');
const volumeControl = document.getElementById('volume-control');
const volumeLabel = document.getElementById('volume-label');

let currentTrackIndex = 0;
let isShuffled = false;

playButtons.forEach(button => button.addEventListener('click', () => {
    currentTrackIndex = Array.from(playButtons).indexOf(button);
    playTrack(button.getAttribute('data-src'));
}));

prevButton.addEventListener('click', () => playPreviousTrack());
nextButton.addEventListener('click', () => playNextTrack());
shuffleButton.addEventListener('click', () => toggleShuffle());

volumeControl.addEventListener('input', () => updateVolume());

music.addEventListener('ended', () => playNextTrack());

const playTrack = src => {
    music.src = src;
    music.play();
};

const playPreviousTrack = () => {
    currentTrackIndex = (currentTrackIndex - 1 + playButtons.length) % playButtons.length;
    playTrack(playButtons[currentTrackIndex].getAttribute('data-src'));
};

const playNextTrack = () => {
    if (isShuffled) {
        currentTrackIndex = getRandomIndex();
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playButtons.length;
    }
    playTrack(playButtons[currentTrackIndex].getAttribute('data-src'));
};

const toggleShuffle = () => {
    isShuffled = !isShuffled;
    shuffleButton.textContent = isShuffled ? 'Shuffle (On)' : 'Shuffle (Off)';
};

const updateVolume = () => {
    const volume = volumeControl.value;
    music.volume = volume;
    volumeLabel.textContent = `Volume: ${Math.round(volume * 100)}%`;
};

const getRandomIndex = () => {
    let index;
    do {
        index = Math.floor(Math.random() * playButtons.length);
    } while (index === currentTrackIndex);
    return index;
};