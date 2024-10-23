

import { default as  Presentation} from './Presentation.svelte';

import { default as  PresentationObjBlob} from './PresentationObj/PresentationObjBlob.js';
import { default as  PresentationObjUrl} from './PresentationObj/PresentationObjUrl.js';
import { default as  PresentationObjNs} from './PresentationObj/PresentationObjNs.js';

import { default as  PresentationModeEditor} from './PresentationModeEditor.svelte';
import { default as  PresentationModeUi} from './PresentationModeUi.svelte';
import { default as  Editor} from './PresentationModeEditor.svelte';
import { default as  Ui} from './PresentationModeUi.svelte';

import { default as  PlayerToolbar} from './PlayerToolbar/PlayerToolbar.svelte';
import { default as  PlayerToolbarNs} from './PlayerToolbar/PlayerToolbarNs.svelte';

import { default as  Player} from './Player.svelte';
import { default as  PlayerNs} from './PlayerNs.svelte';
 
import getNewSlide from './getNewSlide/getNewSlide';
import getNewItem  from './getNewSlide/getNewItem.js';

//===>12 exported components (17 oct 2024)
export { 
    Presentation, 

    Player,
    PlayerNs,

    Editor,
    
    PlayerToolbar,
    PlayerToolbarNs,

   
    PresentationModeEditor, //for legacy old Editor
    Ui,
    PresentationModeUi, //for legacy old Ui
    
    getNewSlide, 
    getNewItem,

    PresentationObjUrl,
    PresentationObjNs,
    PresentationObjBlob

 }
