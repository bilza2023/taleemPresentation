//@ts-nocheck
import { statePrepStore } from './store';
import { Howl } from 'howler';
import  BasePresentation  from "./BasePresentation";

// PresentationObj.js
/**
 * Even if we do not give a url it can try to extract a url, we can also change the opus extention and use mp3 etc. It was decided to keep Howler insdie the lib since using url to load sound is basic webdev
 */

export default class PresentationObjUrl extends BasePresentation {
    constructor(questionData, soundFilePath = null,soundFileExt = "opus") {
        super(questionData);

        if(soundFilePath){
            this.soundFilePath = soundFilePath + questionData.filename + "." + soundFileExt; 
        }else {
            this.soundFilePath =   
            "https://taleem-media.blr1.cdn.digitaloceanspaces.com/sound/" 
            + questionData.filename + "." + soundFileExt;
    }
 }
  async init(){
    this.loadSound();
    this.inspector.fixEqEndTime();
    this.setStopTime();
  }

    async loadSound() {
        try {
            statePrepStore.set(1); // 1 = downloading
            this.sound = new Howl({
                src: [this.soundFilePath],
                volume: 1.0,
                html5: true,
                onload: function () {
                    statePrepStore.set(2); // ready/loaded
                },
                onloaderror: function (id, error) {
                    statePrepStore.set(0); // initial state not downloaded
                    console.error("Error loading sound:", error);
                }
            });
        } catch (e) {
            statePrepStore.set(0);
        }
    }
}

