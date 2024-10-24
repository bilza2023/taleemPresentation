<script>
  //@ts-nocheck 
  import {presentationData} from "./presentationData";
  import {PlayerNs} from "$lib";
  </script> 
  
  <div class='bg-gray-800 text-white w-full' >
    {#if presentationData}
      <div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
            <PlayerNs
              {presentationData}     
            />
      </div>
    {/if}
  </div>
  
  
  