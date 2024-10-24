<script>
//@ts-nocheck 
import audioData from "./audioData.js";
import {presentationData} from "./presentationData.js";
import {Player} from "$lib";
</script> 

<div class='bg-gray-800 text-white w-full' >
  {#if presentationData && audioData}
    <div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
          <Player
            isBlob = {true}
            {presentationData} 
            {audioData}    
          />
    </div>
  {/if}
</div>


