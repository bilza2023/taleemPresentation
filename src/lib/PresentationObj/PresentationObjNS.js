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
        if (this.playState === PLAY_STATE.INITIAL) return false; // Don't start if in INITIAL state
        if (this.playState === PLAY_STATE.PLAY) return false;    // Already playing
        if (this.playState === PLAY_STATE.STOP) {
            this.currentTime = 0;  // Reset time if starting after stop
        }

        if (this.playState === PLAY_STATE.PAUSE) {
            this.lastTimestamp = performance.now();  // Resume from paused time
        }

        // Set to PLAY state and start the animation loop
        this.playState = PLAY_STATE.PLAY;
        this.lastTimestamp = performance.now();
        this.animationFrameId = requestAnimationFrame(this.animate); 
        return true;
    }

    animate = (timestamp) => {
        if (this.playState !== PLAY_STATE.PLAY) return;

        const deltaTime = (timestamp - this.lastTimestamp) / 1000; // Convert to seconds
        this.currentTime += deltaTime;

        if (this.currentTime >= this.stopTime) {
            this.stop();
        } else {
            this.setCurrentSlide();  // Updates the slide based on current time
            this.lastTimestamp = timestamp;
            this.animationFrameId = requestAnimationFrame(this.animate);  // Continue loop
        }
    }

    pause() {
        if (this.playState === PLAY_STATE.PLAY) {
            this.playState = PLAY_STATE.PAUSE;
            cancelAnimationFrame(this.animationFrameId);  // Stop the animation loop
        } else if (this.playState === PLAY_STATE.PAUSE) {
            this.start();  // Resume playback when paused
        }
    }

    stop() {
        if (this.playState !== PLAY_STATE.STOP) {
            this.currentTime = 0;  // Reset current time
            cancelAnimationFrame(this.animationFrameId);  // Cancel the animation loop
            this.playState = PLAY_STATE.STOP;
            this.setCurrentSlide();  // Ensure slide state is updated
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
