<script>
    import { Editor } from "$lib";
    import audioData from "./audioData.js";
    import {Slides} from "./slides.js";
    import {onMount} from "svelte";
    // import SaveLoadDialogue from "./SaveLoadDialogue.svelte";
    import upgrade2Basic from "./upgrade2Basic.js";
    // let assets = null;
    let slides;
    let showToolbar=true;

    onMount(async()=>{
      slides = await upgrade2Basic(Slides);
  });
  </script>
  
  <div class="w-full bg-gray-800">
  


  {#if slides}
<!-- <SaveLoadDialogue bind:slides={slides} />   -->
<!-- src/lib/editor/slides.js -->
    <Editor
      isBlob={true}
      {showToolbar}
      {slides}
      {audioData}
    />
  
  {/if}
  
  </div>