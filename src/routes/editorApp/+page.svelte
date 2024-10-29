<script>
  import { Editor } from "$lib";
  import audioData from "./audioData.js";
  import {slides as DefaultSlide} from "../slides/slides.js";
  import {NavBtn2} from 'sveltetools_bils/src/cmp';  
  import SaveLoadDialogue from "./SaveLoadDialogue.svelte";
  import {NewPresentation}  from "./newPresentation"; 
import AppToolbar from "./AppToolbar.svelte";
  let slides = DefaultSlide;
  let showToolbar=true;

function newPresentation(){
  // debugger;
slides = [NewPresentation];
// currentSlideIndex =0;
// currentSlide = slides[0];
}

</script>

<div class="w-full bg-gray-800">

{#if slides}

<AppToolbar 
{slides}
{newPresentation}
/>
  <Editor
    isBlob={true}
    {showToolbar}
    bind:slides={slides}
    {audioData}

  />

{/if}

</div>