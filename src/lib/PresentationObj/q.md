if you look at the code of object below you will see statePlayStore which is a svelte store variable being managed by this object. i have 2 problems with this

1: why cant statePlayStore be a objects varialble as  this.playState
2: if we create more than 1 objects from this class all will be pointing to the same svelte store thus no data protection


// BasePresentation.js
//@ts-nocheck

import Inspector from './Inspector';
import { get } from 'svelte/store';
import { statePlayStore } from './store';

export default class BasePresentation {
    constructor(questionData) {
        this.questionData = questionData;
        this.slides = questionData.slides; //this is an alias so not a problem
        this.sound = null;
        this.currentSlide = null;
        this.soundLoaded = false;
        this.maxSliderValue = 0;
        this.inspector = new Inspector(this.slides);
        this.stopTime = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.interval = null;
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
            if (get(statePlayStore) == 1) return false;
            if (get(statePlayStore) == 2) {
                this.pause();
                return false;
            }

            this.sound.play();
            this.sound.on('play', () => {
                this.isPlaying = true;
                statePlayStore.set(1);
            });
            return true;
        } catch (e) {
            console.error("Error in start:", e);
            return false;
        }
    }

    pause() {
        if (get(statePlayStore) == 2) {
            this.sound.play();
            statePlayStore.set(1);
        } else {
            this.sound.pause();
            statePlayStore.set(2);
        }
    }

    stop() {
        statePlayStore.set(0);
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
