<svelte:head>
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
</svelte:head>
<script>
//@ts-nocheck 
/** 6-Nov-2023 : If the core data-structure of a software is decided the software is decided.
 24-Aug 2024 amen to that!!
*/
import { toast } from '@zerodevx/svelte-toast';
import { onMount } from 'svelte';
import { fade } from 'svelte/transition';
import {PlayerToolbar} from '$lib';
import {db} from "../ajax";

import { Avatar } from '@skeletonlabs/skeleton';

import {PresentationObjUrl,PresentationModeUi} from "$lib";

let filename;
let presentationObj;
let pulse = 0;

let ready=false;
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

</script> 
{#if presentationObj}

      <div class='bg-gray-800 text-white w-full min-h-screen' 
      style='position: fixed; top: 0;'  >
      {presentationObj.slides.length}  
      </div><!--page wrapper-->

      {/if}

<Avatar src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop" width="w-32" rounded="rounded-full"  />