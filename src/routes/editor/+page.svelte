<script>
  import { Editor } from "$lib";
  import audioData from "./audioData.js";
  import {presentationData} from "./presentationData2.js";

  let showToolbar=true;

</script>

<div class="w-full bg-gray-800">

{#if presentationData && audioData}

  <Editor
    isBlob={true}
    {showToolbar}
    slides={presentationData}
    {audioData}
   
  />

{/if}

</div>