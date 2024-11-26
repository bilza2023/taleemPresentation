<script>
    import { Editor } from "$lib";
    import audioData from "./audioData.js";
    import {Slides} from "./slides.js";
  
    let showToolbar=true;
  
  </script>
  
  <div class="w-full bg-gray-800">
  
  {#if Slides}
  
    <Editor
      isBlob={true}
      {showToolbar}
      slides={Slides}
      {audioData}
     
    />
  
  {/if}
  
  </div>