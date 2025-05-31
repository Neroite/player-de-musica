const songName = document.getElementById("song-name"); // Const pois o id da música não vai mudar
const song = document.getElementById("audio");
const bandName = document.getElementById("band-name"); 
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const likeButton = document.getElementById("like");
const repeatButton = document.getElementById("repeat");

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

const originalPlaylist = [experimentalCinematic, deepEletronic, brainImplant];
let sortedPlaylist = [...originalPlaylist] // Copia o array original para o novo array, os ... espalham a lista de objetos dentro do array
let index = 0;
let isPlaying = false;
let isShuffled = false; 

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
    cover.src = `images/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}

function previousSong() {
    if(index === 0) {
        index = sortedPlaylist.length - 1; // 
    }
    else{
        index--;
    }
    initializeSong();
    playSong();
}

function nextSong() { 
    if(index === sortedPlaylist.length - 1) {
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

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1; /* Array que iremos manipular*/
    while (currentIndex > 0 ){  
        let randomIndex = Math.floor(Math.random() * size); /* Gera um número aleatório entre 0 e o tamanho do array */
        let aux = preShuffleArray[currentIndex]; /*Guardar o cara antina na variável auxiliar*/
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex]; /* Troca o cara atual pelo aleatório */
        preShuffleArray[randomIndex] = aux; /* Troca o aleatório pelo cara atual */
        currentIndex -= 1;
    }
}

function shuffleButtonClicked(){
    if(isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add("button-active");
    }else{
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist]; // Reseta o array para o original
        shuffleButton.classList.remove("button-active");
    }
}        

initializeSong();  

play.addEventListener("click", playPauseDetect);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", upateProgressBar);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click",shuffleButtonClicked)