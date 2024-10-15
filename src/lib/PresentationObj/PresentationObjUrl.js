import  { PLAY_STATE } from './BasePresentation';

import { Howl } from 'howler';

import BasePresentation from './BasePresentation';

export default class PresentationObjUrl extends BasePresentation {
    constructor(questionData, soundFilePath = null, soundFileExt = 'opus') {
        super(questionData);
        this.soundFilePath = soundFilePath 
            ? `${soundFilePath}${questionData.filename}.${soundFileExt}`
            : `https://taleem-media.blr1.cdn.digitaloceanspaces.com/sound/${questionData.filename}.${soundFileExt}`;
    }

    async loadSound() {
        try {
            this.sound = new Howl({
                src: [this.soundFilePath],
                volume: 1.0,
                html5: true,
                onload: () => {
                    this.playState = PLAY_STATE.LOADED;
                },
                onloaderror: (id, error) => {
                    this.playState = PLAY_STATE.INITIAL;
                    console.error('Error loading sound:', error);
                }
            });
        } catch (e) {
            this.playState = PLAY_STATE.INITIAL;
            console.error('Error in loadSound:', e);
        }
    }
}
