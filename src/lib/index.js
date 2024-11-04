

// import { default as  Presentation} from './Presentation.svelte';
import { default as  Player} from './players/Player.svelte';
import { default as  Editor} from './editor/Editor.svelte';
 
import getNewSlide from './getNewSlide/getNewSlide';
import getNewItem  from './getNewSlide/getNewItem.js';

import {samples} from "./code/samples";
//===> 12 exported components (17 oct 2024)
//===> 9  exported components (24 oct 2024)
//===> 6  exported components (24 oct 2024)
//===> 4  exported components (28 oct 2024) -Presentation and PlayerNs removed, now we can add more into it but the Player and Editor are fixed can not be change neither can their interface be changed. getNewSlide and getNewItem will change.
//===> 5  exported 5  components including samples (4 Nov 2024) 
export { 
    Player,
    Editor,
    getNewSlide, 
    getNewItem,
    samples
 }
