<script>
//@ts-nocheck 
import { toast } from '@zerodevx/svelte-toast';
import { onMount } from 'svelte';
import {db} from "../ajax";

import {PresentationObjUrl,PresentationPlayerFlex} from "$lib";

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
    // debugger
    const incomming = await resp.json();
    let questionData = incomming.data[0]; //get data out

    presentationObj = new PresentationObjUrl(questionData);
  
    await presentationObj.init();
    console.log(" presentationObj",presentationObj);
    ready=true; 
 }else {
    toast.push("failed to load");
 } 
});
////////////////////////////////////////////
</script> 
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class='bg-gray-800 text-white w-full min-h-screen p-10' 
style='position: fixed; top: 0;'>

{#if presentationObj}
<div class="flex justify-center  w-full border-white border-2 text-center p-10 rounded-lg mt-10 ">
<div class="w-6/12">
  <PresentationPlayerFlex {presentationObj}    />

</div>
</div>
{/if}
</div><!--page wrapper-->


