<script>
//@ts-nocheck 
import {presentationData} from "./presentationData.js";
import {Player} from "$lib";
</script> 

<div class='bg-gray-800 text-white w-full' >
  {#if presentationData}
    <div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
          <Player
            isBlob = {false}
            {presentationData} 
            audioData= "/music1.opus"    
          />
    </div>
  {/if}
</div>


