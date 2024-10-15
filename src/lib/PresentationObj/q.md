please look at this code:
its basic responsibility is to run a presentation using a timer

1: Expected Behaviour of Start Function:

    - if INITIAL  return since sound not loaded
    - if PLAY do nothing
    - if STOP start from start
    - if PAUSE start from where stopped
..this is not the present behaviour.

2: why is "animate" function so complex it should be just 2 variables comparison 

===========================
import AbstractPresentation, { PLAY_STATE } from './AbstractPresentation';

export default class PresentationObjNS extends AbstractPresentation {
    constructor(questionData) {
        super(questionData);
        this.currentTime = 0;
        this.lastTimestamp = 0;
        this.animationFrameId = null;
    }

    async loadSound() {
        this.playState = PLAY_STATE.LOADED;
        return true;
    }

    start() {
        debugger;
        if (super.start()) {
            this.lastTimestamp = performance.now();
            this.animationFrameId = requestAnimationFrame(this.animate); // Ensure requestAnimationFrame provides timestamp
            return true;
        }
        return false;
    }

    animate = (timestamp) => {
        if (this.playState !== PLAY_STATE.PLAY) return;

        const deltaTime = timestamp - this.lastTimestamp;
        this.currentTime += deltaTime / 1000; // Convert to seconds

        if (this.currentTime >= this.stopTime) {
            this.stop();
        } else {
            this.setCurrentSlide();
            this.lastTimestamp = timestamp;
            this.animationFrameId = requestAnimationFrame(this.animate); // Continue animation loop
        }
    }

    pause() {
        super.pause();
        if (this.playState === PLAY_STATE.PLAY) {
            this.lastTimestamp = performance.now();
            this.animationFrameId = requestAnimationFrame(this.animate); // Resume animation with requestAnimationFrame
        } else {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    stop() {
        if (super.stop()) {
            this.currentTime = 0;
            cancelAnimationFrame(this.animationFrameId);
            return true;
        }
        return false;
    }

    pulse() {
        return this.currentTime;
    }

    setPulse(time) {
        debugger;
        this.currentTime = time;
        this.setCurrentSlide();
    }
}
