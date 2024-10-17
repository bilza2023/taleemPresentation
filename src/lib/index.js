
import { default as  Presentation} from './Presentation.svelte';
// import { default as  PresentationPlayerBlob} from './PresentationObj/PresentationPlayerBlob.svelte';
import { default as  PresentationObjBlob} from './PresentationObj/PresentationObjBlob.js';
import { default as  PresentationObjUrl} from './PresentationObj/PresentationObjUrl.js';
import { default as  PresentationObjNs} from './PresentationObj/PresentationObjNs.js';
import { default as  PresentationModeEditor} from './PresentationModeEditor.svelte';
import { default as  PresentationModeUi} from './PresentationModeUi.svelte';
import { default as  PlayerToolbar} from './PlayerToolbar/PlayerToolbar.svelte';
import { default as  PlayerToolbar80} from './PlayerToolbar/PlayerToolbar.svelte';
import { default as  PlayerToolbarFlex} from './PlayerToolbar/PlayerToolbarFlex.svelte';
import { default as  PlayerToolbarNs} from './PlayerToolbar/PlayerToolbarNs.svelte';

import { default as  PresentationPlayer} from './PresentationPlayer.svelte';
import { default as  Player} from './Player.svelte';
import { default as  PresentationPlayer80} from './Player.svelte';
import { default as  PresentationPlayerNs} from './PresentationPlayerNs.svelte';
 
import getNewSlide from './getNewSlide/getNewSlide';
import getNewItem  from './getNewSlide/getNewItem.js';

export { 
    Presentation, 

    PresentationPlayer80,
    PresentationPlayer,
    PresentationPlayerNs,
    Player,

    PlayerToolbar,
    PlayerToolbarNs,
    PlayerToolbar80,
    PlayerToolbarFlex,

    PresentationModeEditor,
    PresentationModeUi,
    
    getNewSlide, 
    getNewItem,

    PresentationObjUrl,
    PresentationObjNs,
    PresentationObjBlob
 }
