//@ts-nocheck
// AbstractPresentation.js
import Inspector from './Inspector';

export const PLAY_STATE = {
    INITIAL: 0,
    LOADED: 1,
    STOP: 2,
    PLAY: 3,
    PAUSE: 4
};

export default class AbstractPresentation {
    constructor(questionData) {
        this.questionData = questionData;
        this.slides = questionData.slides;
        this.currentSlide = null;
        this.maxSliderValue = 0;
        this.inspector = new Inspector(this.slides);
        this.stopTime = null;
        this.playState = PLAY_STATE.INITIAL;
    }

    async init() {
        this.inspector.fixEqEndTime();
        await this.setStopTime();
        await this.loadSound();
    }

    async loadSound() {
        // To be implemented by child classes
    }

    async setStopTime() {
        if (this.slides.length > 0) {
            const lastSlide = this.slides[this.slides.length - 1];
            this.stopTime = lastSlide.endTime && lastSlide.endTime > 0 ? lastSlide.endTime : 600;
        }
    }

    setCurrentSlide() {
        const currentTime = this.pulse();
        this.currentSlide = this.slides.find(slide => 
            currentTime >= slide.startTime && currentTime < slide.endTime
        ) || null;
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

        this.playState = PLAY_STATE.PLAY;
        return true;
    }

    pause() {
        this.playState = this.playState === PLAY_STATE.PAUSE ? PLAY_STATE.PLAY : PLAY_STATE.PAUSE;
    }

    stop() {
        this.playState = PLAY_STATE.STOP;
        this.setCurrentSlide();
        return true;
    }

    pulse() {
        throw new Error("pulse method must be implemented by child class");
    }

    // eslint-disable-next-line no-unused-vars
    setPulse(time) {
        throw new Error("setPulse method must be implemented by child class");
    }
}