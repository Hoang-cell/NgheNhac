const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [{
        path: 'chabiettennhaclagi.mp3',
        displayName: 'Khong biet ten nhac =))',
        cover: 'dhoang.jpg',
        artist: 'Howi lor =))',
    },
    {
        path: 'vansutuyduyen.mp3',
        displayName: 'Cha co gi dac biet',
        cover: 'dh.jpg',
        artist: 'Cha co gi dac biet',
    },
    {
        path: 'dunglamtraitimanhdau.mp3',
        displayName: 'Dung lam trai tim anh dau',
        cover: 'shindz.png',
        artist: 'Đong tran viet hoang',
    },
    {
        path: 'nucuoiemgiolanang.mp3',
        displayName: 'Nu cuoi em gio la nang',
        cover: 'chill.jpg',
        artist: 'NotNico28',
    },
    {
        path: 'suytnuathi.mp3',
        displayName: 'Súyt Nữa Thì',
        cover: 'chill2.jpg',
        artist: 'NotNico28',
    },
    {
        path: 'coanhodayroi.mp3',
        displayName: 'Co anh o day roi',
        cover: 'chill3.jpg',
        artist: 'NotNico28',
    },
    {
        path: '31072.mp3',
        displayName: 'Listen to Music to Study',
        cover: 'chill4.jpg',
        artist: 'NotNico28',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);