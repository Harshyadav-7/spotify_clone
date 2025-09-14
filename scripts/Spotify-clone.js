console.log("Let's write Javascript")

let currentSong = new Audio();
let songs = []; // Global songs array
let currFolder; // Current folder (album)

// Convert seconds to MM:SS format
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// Fetch and parse song list
async function getSongs(folder) {
    currFolder = folder; // Update the current folder
    const response = await fetch(`http://127.0.0.1:51426/${folder}/`);

    if (!response.ok) {
        console.error("Failed to fetch songs. Status:", response.status);
        return [];
    }

    const html = await response.text();
    console.log("Fetched HTML:", html);

    // Parse the HTML to extract song links
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const links = tempDiv.getElementsByTagName("a");
    songs = []; // Reset the songs array
    for (let index = 0; index < links.length; index++) {
        const element = links[index];
        if (element.href.endsWith(".mp3")) {
            const songName = element.href.split(`/${folder}/`)[1]; // Extract file name
            songs.push(songName);
        }
    }

    console.log("Songs in folder:", songs);

    // Get the song list container
    const songUL = document.querySelector(".songList ul");

    // Clear existing list
    songUL.innerHTML = "";

    const fragment = document.createDocumentFragment();
    for (const song of songs) {
        const li = document.createElement("li");
        const displayName = song.replace(".mp3", " "); // Simplify song name

        const albumName = currFolder.split('/').pop(); 

        li.innerHTML = `
            <img class="invert" src="music.svg" alt="Music Icon">
            <div class="info">
                <div>${displayName}</div>
                <div>${albumName}</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play.svg" alt="Play Icon">
            </div>`;
        li.dataset.filename = song; // Store the original filename
        fragment.appendChild(li);
    }
    songUL.appendChild(fragment);

    // Add click listeners to songs
    songUL.querySelectorAll("li").forEach((li) => {
        li.addEventListener("click", function () {
            const originalFilename = this.dataset.filename;
            console.log("Playing song:", originalFilename);
            playMusic(originalFilename);
            
        });
    });

    return songs;
}

// Play or pause music
const playMusic = (track, pause = false) => {
    if (!track) {
        console.log("Error: No song to play!");
        return;
    }

    currentSong.src = `/${currFolder}/` + track;
    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    }

    const trimmedName = track ? track.replaceAll(".mp3", " ") : "Unknown Song";
    document.querySelector(".songinfo").innerHTML = trimmedName;
    document.querySelector(".songtime").innerHTML = "00:00/00:00";
};

// Display all albums
async function displayAlbums() {
    const response = await fetch(`http://127.0.0.1:51426/songs/`);
    const html = await response.text();

    // Parse the HTML to extract album links
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    let anchors = tempDiv.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer");

    cardContainer.innerHTML = "";
    for (let e of anchors) {
        if (e.href.includes("/songs/")) {
            let folder = new URL(e.href).pathname.split("/").filter(x => x).pop(); // Get last valid part
            console.log("Extracted folder:", folder);

            try {
                const res = await fetch(`http://127.0.0.1:51426/songs/${folder}/info.json`);
                if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
                const data = await res.json();

                cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
                    <div class="play">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 4L19 12L5 20Z" fill="#000000" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <img src="/songs/${folder}/cover.jpg" alt="">
                    <h2>${data.title}</h2>
                    <a>${data.description}</a>
                </div>`;
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }
    }

    // Add click listeners to albums
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async () => {
            const folder = e.dataset.folder;
            console.log("Selected folder:", folder);
            songs = await getSongs(`songs/${folder}`);
            // Do not play the first song automatically
        });
    });
}

// Main function to initialize the app
async function main() {
    // Fetch the list of songs for the default album
    songs = await getSongs("songs/Animal");
    playMusic(songs[0], true); // Play the first song of the default album

    // Display all the albums on the page
    displayAlbums();

    // Play/Pause button
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    // Update song time and seekbar
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seekbar click event
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    // Hamburger menu click event
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Close button click event
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Previous button click event
    previous.addEventListener("click", () => {
        const currentSongName = currentSong.src.split("/").pop();
        const index = songs.indexOf(currentSongName);
        if (index > 0) {
            playMusic(songs[index - 1]);
        } else {
            console.log("Already at the first song!");
        }
    });

    // Next button click event
    next.addEventListener("click", () => {
        const currentSongName = currentSong.src.split("/").pop();
        const index = songs.indexOf(currentSongName);
        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        } else {
            console.log("Already at the last song!");
        }
    });

    // Volume seekbar change event
    document.querySelector(".volume-seekbar").addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/100");
        currentSong.volume = e.target.value / 100;
    });

    // Mute button click event
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.10;
        }
    });
}

// Initialize the app
main();