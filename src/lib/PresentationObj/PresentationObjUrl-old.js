//@ts-nocheck
import { Howl } from 'howler';
import  BasePresentation  from "./PresentationObjUrl";
// Define constants for play states
const PLAY_STATE = {
    INITIAL: 0,
    LOADED: 1,
    STOP: 2,
    PLAY: 3,
    PAUSE: 4
};
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
            this.playState= PLAY_STATE.INITIAL;
            this.sound = new Howl({
                src: [this.soundFilePath],
                volume: 1.0,
                html5: true,
                onload: function () {
                    this.playState= PLAY_STATE.LOADED; // ready/loaded
                },
                onloaderror: function (id, error) {
                    this.playState= PLAY_STATE.INITIAL; // initial state not downloaded
                    console.error("Error loading sound:", error);
                }
            });
        // eslint-disable-next-line no-unused-vars
        } catch (e) {
            
            this.playState= PLAY_STATE.INITIAL;
        }
    }
}

