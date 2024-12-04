<script>
    import { Editor } from "$lib";
    import audioData from "./audioData.js";
    import {Slides} from "./slides.js";
    import {onMount} from "svelte";
    
    // let assets = null;
    let slides;
    let showToolbar=true;

    onMount(async()=>{

      slides = Slides;
      console.log("slides" ,slides);
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