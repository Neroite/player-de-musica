const songName = document.getElementById("song-name"); // Const pois o id da música não vai mudar
const song = document.getElementById("audio");
const bandName = document.getElementById("band-name"); 
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");

const deepEletronic = {
    songName: "Deep Electronic",
    artist: "Free Electronic Sounds",
    file : "deep_electronic",
}

const brainImplant = {
    songName: "Brain Implant",
    artist: "Free Implant Sounds",
    file : "brain_implant",
}

const experimentalCinematic = {
    songName: "Experimental Cinematic",
    artist: "Free Cinematic Sounds",
    file : "Experimental_Cinematic",
}

const playlist = [experimentalCinematic, deepEletronic, brainImplant];
let index = 0;

let isPlaying = false;
function playSong() {
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");    
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");    
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    song.pause();
    isPlaying = false;
}

function playPauseDetect(){
    if(isPlaying === true){
        pauseSong();
    }
    else{
        playSong();
    }
}

function initializeSong(){
    cover.src = `images/${playlist[index].file}.jpg`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

function previousSong() {
    if(index === 0) {
        index = playlist.length - 1; // 
    }
    else{
        index--;
    }
    initializeSong();
    playSong();
}

function nextSong() { 
    if(index === playlist.length - 1) {
        index = 0; // 
    }
    else{
        index++;
    }
    initializeSong();
    playSong();
}

function upateProgressBar(){
    const barWitdh = (song.currentTime/song.duration)*100; 
    currentProgress.style.setProperty("--progress",`${barWitdh}%`); 
}

function jumpTo(event){
    const widht = progressContainer.clientWidth; /* A largura do container de progresso */
    const clickPosition = event.offsetX; /* O quanto clicou a partir do inicio do evento a esquerda */
    const jumpToTime = (clickPosition / widht) * song.duration; /* Calcula o tempo correspondente ao clique */ 
    song.currentTime = jumpToTime; /* Atualiza o tempo atual da música */

}

initializeSong();

play.addEventListener("click", playPauseDetect);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", upateProgressBar);
progressContainer.addEventListener("click", jumpTo)
