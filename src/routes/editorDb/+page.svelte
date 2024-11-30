<script>
  //@ts-nocheck
    import { Editor } from "$lib";
    import audioData from "./audioData.js";
    import {Slides} from "./oldSlides.js";
    import {onMount} from "svelte";
    import upgrade from "./upgrade.js";
    
    // let assets = null;
    let slides;
    let showToolbar=true;

  onMount(async()=>{
    
    console.log('Before',slides);
    
    slides = await upgrade(Slides);
    
    console.log('After',slides);

  });

  </script>
  
  <div class="w-full bg-gray-800">
  


  {#if slides}
  
src/lib/editor/slides.js
    <Editor
      isBlob={true}
      {showToolbar}
      {slides}
      {audioData}
    />
  
  {/if}
  
  </div>