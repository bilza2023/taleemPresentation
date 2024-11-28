<script>
    import { Editor } from "$lib";
    import audioData from "./audioData.js";
    import {Slides} from "./slides.js";
    import {onMount} from "svelte";
    import {upgrade} from "$lib/upgrade.js";
    // let assets = null;
    let slides;
    let showToolbar=true;

    onMount(async()=>{
      slides = Slides;
      slides = await upgrade(slides);

      debugger;
  });
  </script>
  
  <div class="w-full bg-gray-800">
  


  {#if slides}
  

    <Editor
      isBlob={true}
      {showToolbar}
      {slides}
      {audioData}
    />
  
  {/if}
  
  </div>