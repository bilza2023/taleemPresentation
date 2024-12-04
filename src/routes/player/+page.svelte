
<script>
  //@ts-nocheck 
  import {Slides as slides} from "./oldSlides";
  import {Player} from "$lib";
  import {onMount} from "svelte";

  onMount(async()=>{
      slides = await upgrade2Basic(Slides);
  });
  </script> 
  
  <div class='bg-gray-800 text-white w-full' >
    {#if slides}
      <div class="flex justify-center w-full   border-white border-2 text-center  rounded-lg  ">
            <Player
              isBlob = {false}
              slides={slides} 
              audioData= "/music1.opus"    
            />
      </div>
    {/if}
  </div>
  
  