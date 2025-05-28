const songName = document.getElementById("song-name"); // Const pois o id da música não vai mudar
const song = document.getElementById("audio"); //
const play = document.getElementById("play");

songName.innerText = "Fé" // InnerText acessa e modifica o conteúdo visível do elemento HTML

function playSong() {
    song.play();
}

play.addEventListener("click", playSong);