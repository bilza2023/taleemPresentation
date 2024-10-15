
import { PLAY_STATE } from './BasePresentation';
import { Howl } from 'howler';

import BasePresentation from './BasePresentation';

export default class PresentationObjBlob extends BasePresentation {
    constructor(questionData, audioData) {
        super(questionData);
        this.audioData = audioData;
    }

    async loadSound() {
        try {
            const byteCharacters = atob(this.audioData);
            const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'audio/opus' });
            const blobUrl = URL.createObjectURL(blob);

            this.sound = new Howl({
                src: [blobUrl],
                format: ['opus'],
                volume: 1.0,
                html5: true,
                onload: () => {
                    this.playState = PLAY_STATE.LOADED;
                    URL.revokeObjectURL(blobUrl);
                },
                onloaderror: (id, error) => {
                    this.playState = PLAY_STATE.INITIAL;
                    console.error('Error loading sound:', error);
                    URL.revokeObjectURL(blobUrl);
                }
            });
        } catch (e) {
            this.playState = PLAY_STATE.INITIAL;
            console.error('Error in loadSound:', e);
        }
    }
}
