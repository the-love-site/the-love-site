export class SongControl {

    audioEl;
    playPauseBtn;

    constructor(songUrl) {
        this.audioEl = new Audio(songUrl);

        this.playPauseBtn = document.getElementById('song-player-play-pause');

        this.playPauseBtn.onclick = () => {
            const paused = this.audioEl.paused;

            this._setPlayerLayout(paused);

            if (paused) {
                this.audioEl.play();
            } else {
                this.audioEl.pause();
            }
        };
    }

    _setPlayerLayout(paused) {
        const playBtn = this.playPauseBtn.getElementsByClassName('player-btn-play');
        const pauseBtn = this.playPauseBtn.getElementsByClassName('player-btn-pause');

        function updateVisibilityOfButton(button, show) {
            button.style.display = show ? 'flex' : 'none';
        }

        Array
            .from(playBtn)
            .forEach(b => updateVisibilityOfButton(b, !paused));

        Array
            .from(pauseBtn)
            .forEach(b => updateVisibilityOfButton(b, paused));
    }

    start() {
        this._setPlayerLayout(true);
        this.audioEl.volume = 0.7;
        this.audioEl.play();
    }

    updateSongMetadata(songName, songAuthor, year, coverImageUrl) {
        const playerEl = document.getElementById('song-player');

        const cover = playerEl.querySelector('img');
        cover.src = coverImageUrl;

        const songNameEl = playerEl.querySelector('#song-player-name');
        songNameEl.innerHTML = songName;

        const songAuthorEl = playerEl.querySelector('#song-player-author');
        songAuthorEl.innerHTML = songAuthor;

        const songYearEl = playerEl.querySelector('#song-player-year');
        songYearEl.innerHTML = `Ouvindo músicas juntos desde ${year}`;
    }

    updatePlayerControlColor(color) {
        this.playPauseBtn.style.background = color;
        
        const songNameEl = document.getElementById('song-player-name');
        songNameEl.style.color = color;
    }
}
