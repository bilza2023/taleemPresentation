<script>
//@ts-nocheck 
import { toast } from '@zerodevx/svelte-toast';
import PlayBar from './PlayBar.svelte';
import {db} from "../ajax";

import {PresentationObjUrl,Player} from "$lib";
let presentationObj;

////////////////////////////////////////////////////////
async function getVideo(id){

    const resp = await db.tcode.getOne(id);
  
    if (resp.ok){
        if (presentationObj){
            await presentationObj.stop();
        }
        
        presentationObj  = null;
        let questionData = await resp.json();
  
      presentationObj = new PresentationObjUrl(questionData);
      await presentationObj.init();

   }else {
      toast.push("failed to load");
   } 
}



////////////////////////////////////////////
</script> 
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class='bg-gray-800 text-white w-full min-h-screen ' >
<PlayBar {getVideo} />
 
<br>
<br>

<div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
{#if presentationObj}
<div class="w-10/12" >
  <Player {presentationObj}    />

</div>

{/if}
</div>


</div><!--page wrapper-->


