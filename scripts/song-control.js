export class SongControl {

    audioEl;

    constructor(songUrl) {
        this.audioEl = new Audio(songUrl);
    }

    start() {
        this.audioEl.volume = 0.7;
        this.audioEl.play();
    }
}
