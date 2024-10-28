<script>
  import { Editor } from "$lib";
  import audioData from "./audioData.js";
  import {slides as DefaultSlide} from "../slides/slides.js";
  let slides = DefaultSlide;
  let showToolbar=true;
import Toolbar from "./Toolbar.svelte";


</script>

<div class="w-full bg-gray-800">

{#if slides}
<div class="  w-4/12">
  <Toolbar bind:slides={slides} />

</div>

  <Editor
    isBlob={true}
    {showToolbar}
    {slides}
    {audioData}

  />

{/if}

</div>