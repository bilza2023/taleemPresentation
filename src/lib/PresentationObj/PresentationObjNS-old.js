// TimerPresentation.js
import Inspector from './Inspector';

const PLAY_STATE = {
    INITIAL: 0,
    LOADED: 1,
    STOP: 2,
    PLAY: 3,
    PAUSE: 4
};

export default class PresentationObjNS {
    constructor(questionData) {
        this.questionData = questionData;
        this.slides = questionData.slides;
        this.currentSlide = null;
        this.maxSliderValue = 0;
        this.inspector = new Inspector(this.slides);
        this.stopTime = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.currentTime = 0;
        this.lastTimestamp = 0;
        this.playState = PLAY_STATE.LOADED;
        this.animationFrameId = null;
        this.volume = 1;
    }
    async init(){
        // this.loadSound();
        this.inspector.fixEqEndTime();
        this.setStopTime();
      }

    playState() {
        return this.playState;
    }

    async loadSound() {
        // No sound to load, but we'll set up initial state here
        // await this.setStopTime();
        this.playState = PLAY_STATE.LOADED;
        return true;
    }

    async setStopTime() {
        if (this.slides.length > 0) {
            const lastSlide = this.slides[this.slides.length - 1];
            this.stopTime = lastSlide.endTime && lastSlide.endTime > 0 ? lastSlide.endTime : 600;
            return this.stopTime;
        }
    }

    setCurrentSlide() {
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            if (this.currentTime >= slide.startTime && this.currentTime < slide.endTime) {
                this.currentSlide = slide;
                return;
            }
        }
    }

    getCurrentSlide() {
        this.setCurrentSlide();
        return this.currentSlide;
    }

    start() {
        if (this.playState === PLAY_STATE.PLAY) return false;
        if (this.playState === PLAY_STATE.PAUSE) {
            this.pause();
            return false;
        }

        this.isPlaying = true;
        this.playState = PLAY_STATE.PLAY;
        this.lastTimestamp = performance.now();
        this.animate();
        return true;
    }

    animate = (timestamp) => {
        if (!this.isPlaying) return;

        const deltaTime = timestamp - this.lastTimestamp;
        this.currentTime += deltaTime / 1000; // Convert to seconds

        if (this.currentTime >= this.stopTime) {
            this.stop();
        } else {
            this.setCurrentSlide();
            this.lastTimestamp = timestamp;
            this.animationFrameId = requestAnimationFrame(this.animate);
        }
    }

    pause() {
        if (this.playState === PLAY_STATE.PAUSE) {
            this.isPlaying = true;
            this.playState = PLAY_STATE.PLAY;
            this.lastTimestamp = performance.now();
            this.animate();
        } else {
            this.isPlaying = false;
            this.playState = PLAY_STATE.PAUSE;
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    stop() {
        this.isPlaying = false;
        this.playState = PLAY_STATE.STOP;
        this.currentTime = 0;
        cancelAnimationFrame(this.animationFrameId);
        this.setCurrentSlide();
    }

    pulse() {
        return this.currentTime;
    }

    setVolume(volumeLevel) {
        // Store volume level for consistency with the sound-based version
        this.volume = volumeLevel;
    }

    setPulse(time) {
        this.currentTime = time;
        this.setCurrentSlide();
    }
}