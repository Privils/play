const btnPlay = document.getElementById("btn-play");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const artistContainer = document.querySelector(".artist-container");
const progress = document.querySelector("#progress");
const song = document.querySelector('.song');
const image = document.querySelector('.img')
console.log(image)
const url = "music.json";
console.log(btnPrev)

btnPlay.addEventListener("click", playPause);

song.addEventListener("timeupdate", updateProgress);
function playPause() {
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
}

function updateProgress() {
  progress.value = song.currentTime;
}

function mySongs() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
     // console.log(data);
      artistContainer.innerHTML = `
        <p>${data.song[43].name}</p>
      `;
    });
}

mySongs();

btnNext.addEventListener("click", myMusic);

function myMusic() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.song) && data.song.length > 0) {
       
        const randomIndex = Math.floor(Math.random() * data.song.length);
        const randomSong = data.song[randomIndex];

        artistContainer.innerHTML = `
          <p>${randomSong.name}</p>
        `;

        // Update the audio source and play the new song
        image.src = randomSong.image
        song.src = randomSong.audio;
        song.load(); // Reload the audio element to apply the new source
        song.play();
      } else {
        artistContainer.innerHTML = "<p>No songs available.</p>";
      }
      
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      artistContainer.innerHTML =
        "<p>Error fetching data. Please try again.</p>";
    });
}

btnPrev.addEventListener("click", myMusic);

//<audio src="${data.song[43].audio}" controls></audio>
// <audio src="${randomSong.audio}" class="initial-song" controls></audio>