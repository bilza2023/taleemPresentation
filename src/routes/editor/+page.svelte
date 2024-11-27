<script>
    import { Editor } from "$lib";
    import audioData from "./audioData.js";
    import {Slides} from "./blank.js";
    // import loadAssets from "../assets/loadAssets";
    import {onMount} from "svelte";

    // let assets = null;
    let slides;
    let showToolbar=true;

    onMount(async()=>{
      // assets = await loadAssets(); 
      slides = Slides;
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