<script>
  import { Editor } from "$lib";
  import audioData from "./audioData.js";
  import {slides as DefaultSlide} from "../slides/slides.js";
  import {NewPresentation}  from "./newPresentation"; 

  // import { NavBtn2 } from 'sveltetools_bils/src/cmp';
  // import SaveLoadDialogue from './SaveLoadDialogue.svelte';
import AppToolbar from "./AppToolbar.svelte";
  
  let slides = DefaultSlide;
  let showToolbar=true;

function newPresentation(){
  // debugger;
slides = [NewPresentation];
// currentSlideIndex =0;
// currentSlide = slides[0];
}
$:{
  slides;
  console.log(slides);
}
</script>

<div class="w-full bg-gray-800">

{#if slides}
<!-- 
<div class="flex justify-center bg-gray-800 p-1 gap-4">
  <NavBtn2 title="New File" icon="🎉" clk={newPresentation} />
  <SaveLoadDialogue bind:slides={slides} />
</div> -->
    <AppToolbar 
    bind:slides={slides}
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