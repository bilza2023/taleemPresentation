<script>
  import { Editor } from "$lib";
  import audioData from "./audioData.js";
  import {presentationData} from "./presentationData.js";

  let showToolbar=true;

</script>

<div class="w-full bg-gray-800">

{#if presentationData && audioData}

  <Editor
    isBlob={true}
    {showToolbar}
    slides={presentationData.slides}
    {audioData}
   
  />

{/if}

</div>