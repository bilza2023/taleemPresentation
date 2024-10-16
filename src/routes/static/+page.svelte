<script>
//@ts-nocheck 
import { toast } from '@zerodevx/svelte-toast';
import { onMount } from 'svelte';
import {db} from "../ajax";

import {PresentationObjBlob,PresentationPlayer} from "$lib";

/////////////////////
import {questionData} from './questionData.js';
import audioData from "./fbise9math2024_ch_1_ex_1.1_q_1.js" 
/////////////////////

let filename;
let presentationObj;
let pulse = 0;

let ready=false;
let interval;
////////////////////////////////////////////////////////
onMount(async ()=>{  
    presentationObj = new PresentationObjBlob(questionData,audioData);
    await presentationObj.init();
    ready=true; 
});
////////////////////////////////////////////
</script> 
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class='bg-gray-800 text-white w-full min-h-screen' 
style='position: fixed; top: 0;'>

{#if presentationObj}
  <PresentationPlayer {presentationObj}    />
{/if}
</div><!--page wrapper-->


