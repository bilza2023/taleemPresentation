

import { default as  Presentation} from './Presentation.svelte';

import { default as  PresentationObjBlob} from './PresentationObj/PresentationObjBlob.js';
import { default as  PresentationObjUrl} from './PresentationObj/PresentationObjUrl.js';
import { default as  PresentationObjNs} from './PresentationObj/PresentationObjNs.js';

import { default as  Player} from './Player.svelte';
import { default as  PlayerNs} from './PlayerNs.svelte';
import { default as  Editor} from './editor/Editor.svelte';
 
import getNewSlide from './getNewSlide/getNewSlide';
import getNewItem  from './getNewSlide/getNewItem.js';

//===> 12 exported components (17 oct 2024)
//===> 9  exported components (24 oct 2024)
export { 
    Presentation, 

    PresentationObjUrl,
    PresentationObjNs,
    PresentationObjBlob,

    Player,
    PlayerNs,

    Editor,
    
    getNewSlide, 
    getNewItem,

 }
