import AbstractPresentation, { PLAY_STATE } from './AbstractPresentation';
import { Howl } from 'howler';

export default class PresentationObjUrl extends AbstractPresentation {
    constructor(questionData, soundFilePath = null, soundFileExt = "opus") {
        super(questionData);
        this.sound = null;
        this.soundFilePath = soundFilePath 
            ? `${soundFilePath}${questionData.filename}.${soundFileExt}`
            : `https://taleem-media.blr1.cdn.digitaloceanspaces.com/sound/${questionData.filename}.${soundFileExt}`;
    }

    async loadSound() {
        return new Promise((resolve, reject) => {
            try {
                this.playState = PLAY_STATE.INITIAL;
                this.sound = new Howl({
                    src: [this.soundFilePath],
                    volume: 1.0,
                    html5: true,
                    onload: () => {
                        this.playState = PLAY_STATE.LOADED;
                        resolve();
                    },
                    onloaderror: (id, error) => {
                        this.playState = PLAY_STATE.INITIAL;
                        reject(new Error(`Error loading sound: ${error}`));
                    }
                });
            } catch (e) {
                this.playState = PLAY_STATE.INITIAL;
                reject(e);
            }
        });
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
            this.sound.play();
        } else {
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

    pulse() {
        return this.sound ? this.sound.seek() : 0;
    }

    setPulse(time) {
        if (this.sound) {
            this.sound.seek(time);
            this.setCurrentSlide();
        }
    }

    setVolume(volumeLevel) {
        if (this.sound) {
            this.sound.volume(volumeLevel);
        }
    }
}