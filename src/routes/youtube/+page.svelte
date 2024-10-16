<script>
//@ts-nocheck 
import { toast } from '@zerodevx/svelte-toast';
import { onMount } from 'svelte';
import {db} from "../ajax";

import {PresentationObjUrl,PresentationPlayer80} from "$lib";

let filename;
let presentationObj;
let pulse = 0;

let ready=false;
let interval;
////////////////////////////////////////////////////////
onMount(async ()=>{  
  filename = new URLSearchParams(location.search).get("filename");
  //---DB access
  const resp = await db.tcode.get(`filename=${filename}`)

  if (resp.ok){
    const incomming = await resp.json();
    let questionData = incomming.data[0]; //get data out

    presentationObj = new PresentationObjUrl(questionData);
    await presentationObj.init();
    
    ready=true; 
 }else {
    toast.push("failed to load");
 } 
});
////////////////////////////////////////////
</script> 
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class='bg-gray-800 text-white w-full min-h-screen' 
style='position: fixed; top: 0;'>



<div class="flex overflow-y-auto ">
  <div class="w-10/12  bg-green-950  ">
 {#if presentationObj}
   <PresentationPlayer80 {presentationObj}    />
  {/if}
</div>
<!-- /////////////////////////////////////////////////////////////////////// -->
  <div class="w-2/12  overflow-y-auto min-h-screen">

      side panel
   </div>
</div>    






</div><!--page wrapper-->


