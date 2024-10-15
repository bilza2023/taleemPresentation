import AbstractPresentation, { PLAY_STATE } from './AbstractPresentation';
import { Howl } from 'howler';

export default class PresentationObjBlob extends AbstractPresentation {
    constructor(questionData, audioData) {
        super(questionData);
        this.audioData = audioData;
        this.sound = null;
        this.playState = PLAY_STATE.INITIAL;
    }

    async loadSound() {
        try {
            this.playState = PLAY_STATE.INITIAL;
// convert the blob into an object and then into a url, so this also is a url , later i can feec it to the url part as well 
            const byteCharacters = atob(this.audioData);
            const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'audio/opus' });
            const blobUrl = URL.createObjectURL(blob);

            this.sound = new Howl({
                src: [blobUrl],
                format: ['opus'],
                volume: 1.0,
                html5: true,
                onload: () => {
                    this.playState = PLAY_STATE.LOADED;
                    URL.revokeObjectURL(blobUrl);
                },
                onloaderror: (id, error) => {
                    this.playState = PLAY_STATE.INITIAL;
                    console.error("Error loading sound:", error);
                    URL.revokeObjectURL(blobUrl);
                }
            });
        } catch (e) {
            this.playState = PLAY_STATE.INITIAL;
            console.error("Error in loadSound:", e);
        }
    }

    pulse() {
        return this.sound ? this.sound.seek() : 0;
    }
    start() {
        if (super.start()) {
            try {
                this.sound.play();
                this.sound.on('play', () => {
                    this.playState = PLAY_STATE.PLAY;
                });
                return true;
            } catch (e) {
                console.error("Error in start:", e);
                return false;
            }
        }
        return false;
    }

    pause() {
        super.pause();
        if (this.playState === PLAY_STATE.PLAY) {
            this.sound.pause();
        }
    }

    stop() {
        if (super.stop()) {
            this.sound.stop();
            return true;
        }
        return false;
    }
}
