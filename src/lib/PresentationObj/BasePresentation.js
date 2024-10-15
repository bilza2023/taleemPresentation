// BasePresentation.js
//@ts-nocheck

import Inspector from './Inspector';
// Define constants for play states
const PLAY_STATE = {
    INITIAL: 0,
    LOADED: 1,
    STOP: 2,
    PLAY: 3,
    PAUSE: 4
};

export default class BasePresentation {
    constructor(questionData) {
        this.questionData = questionData;
        this.slides = questionData.slides; // this is an alias so not a problem
        this.sound = null;
        this.currentSlide = null;
        this.soundLoaded = false;
        this.maxSliderValue = 0;
        this.inspector = new Inspector(this.slides);
        this.stopTime = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.interval = null;
        this.playState = PLAY_STATE.INITIAL; // Initialize play state as STOP
    }
    playState(){
        return this.playState;
    }
    async loadSound() {
        // This method should be implemented by child classes
        throw new Error("loadSound method must be implemented by child class");
    }

    async setStopTime() {
        if (this.slides.length > 0) {
            if (this.slides[this.slides.length - 1].endTime && this.slides[this.slides.length - 1].endTime > 0) {
                this.stopTime = this.slides[this.slides.length - 1].endTime;
            } else {
                this.stopTime = 600;
            }
            return this.stopTime;
        }
    }

    setCurrentSlide() {
        const r = this.sound.seek();
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            if (r >= slide.startTime && r < slide.endTime) {
                this.currentSlide = slide;
                return;
            }
        }
    }

    getCurrentSlide() {
        this.setCurrentSlide();
        return this.currentSlide;
    }

    async start() {
        try {
            if (this.playState == PLAY_STATE.PLAY) return false;
            if (this.playState == PLAY_STATE.PAUSE) {
                this.pause();
                return false;
            }

            this.sound.play();
            this.sound.on('play', () => {
                this.isPlaying = true;
                this.playState = PLAY_STATE.PLAY;
            });
            return true;
        } catch (e) {
            console.error("Error in start:", e);
            return false;
        }
    }

    pause() {
        if (this.playState == PLAY_STATE.PAUSE) {
            this.sound.play();
            this.playState = PLAY_STATE.PLAY;
        } else {
            this.sound.pause();
            this.playState = PLAY_STATE.PAUSE;
        }
    }

    stop() {
        this.playState = PLAY_STATE.STOP;
        this.sound.stop();
        return true;
    }

    pulse() {
        const r = this.sound.seek();
        return r ? r : 0;
    }

    setVolume(volumeLevel) {
        this.sound.volume(volumeLevel);
    }

    setPulse(time) {
        this.sound.seek(time);
        this.setCurrentSlide();
    }
}
