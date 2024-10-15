The code is responsible to run a presentation with/using a timer

The problem is :
    - if the presentation is running and setPulse is used the presentation stops why???
    - if start played again it starts from start why ?

What is expected if the presentation is running at 20 sec and setPulse is used to 50 sec it should just run that 
// @ts-nocheck
import Inspector from './Inspector';

export default class PresentationObjNS {
    static PLAY_STATE = {
        INITIAL: 0,
        LOADED: 1,
        STOP: 2,
        PLAY: 3,
        PAUSE: 4
    };

    constructor(questionData) {
        this.questionData = questionData;
        this.slides = questionData.slides;
        this.currentSlide = null;
        this.maxSliderValue = 0;
        this.inspector = new Inspector(this.slides);
        this.stopTime = null;
        this.playState = PresentationObjNS.PLAY_STATE.LOADED;

        this.currentTime = 0;
        this.lastTimestamp = 0;
        this.animationFrameId = null;
    }

    async init() {
        this.inspector.fixEqEndTime();
        await this.setStopTime();
        await this.loadSound();
    }

    async loadSound() {
        this.playState = PresentationObjNS.PLAY_STATE.LOADED;
        return true;
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
        if (this.playState === PresentationObjNS.PLAY_STATE.INITIAL) return false; 
        if (this.playState === PresentationObjNS.PLAY_STATE.PLAY) return false;
        if (this.playState === PresentationObjNS.PLAY_STATE.STOP) {
            this.currentTime = 0;
        }

        if (this.playState === PresentationObjNS.PLAY_STATE.PAUSE) {
            this.lastTimestamp = performance.now();
        }

        this.playState = PresentationObjNS.PLAY_STATE.PLAY;
        this.lastTimestamp = performance.now();
        this.animationFrameId = requestAnimationFrame(this.animate);
        return true;
    }

    animate = (timestamp) => {
        if (this.playState !== PresentationObjNS.PLAY_STATE.PLAY) return;

        const deltaTime = (timestamp - this.lastTimestamp) / 1000;
        this.currentTime += deltaTime;

        if (this.currentTime >= this.stopTime) {
            this.stop();
        } else {
            this.setCurrentSlide();
            this.lastTimestamp = timestamp;
            this.animationFrameId = requestAnimationFrame(this.animate);
        }
    }

    pause() {
        if (this.playState === PresentationObjNS.PLAY_STATE.PLAY) {
            this.playState = PresentationObjNS.PLAY_STATE.PAUSE;
            cancelAnimationFrame(this.animationFrameId);
        } else if (this.playState === PresentationObjNS.PLAY_STATE.PAUSE) {
            this.start();
        }
    }

    stop() {
        if (this.playState !== PresentationObjNS.PLAY_STATE.STOP) {
            this.currentTime = 0;
            cancelAnimationFrame(this.animationFrameId);
            this.playState = PresentationObjNS.PLAY_STATE.STOP;
            this.setCurrentSlide();
            return true;
        }
        return false;
    }

    pulse() {
        return this.currentTime;
    }

    setPulse(time) {
        this.currentTime = time;
        this.setCurrentSlide();
    }
}
