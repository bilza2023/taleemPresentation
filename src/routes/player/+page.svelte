<script>
//@ts-nocheck 
import { toast } from '@zerodevx/svelte-toast';
import { onMount } from 'svelte';
import {db} from "../ajax";

import {PresentationObjUrl,Player} from "$lib";

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
<div class='bg-gray-800 text-white w-full' >

  <br>
<br>
<br>
<br>

{#if presentationObj}
<div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
<div class="w-6/12" >
  <Player {presentationObj}    />

</div>
</div>
{/if}
</div><!--page wrapper-->


