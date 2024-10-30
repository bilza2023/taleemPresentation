<script>
  import { Editor } from "$lib";
  import audioData from "./audioData.js";
  import {slides as DefaultSlide} from "../slides/slides.js";
  import {NewPresentation}  from "./newPresentation"; 
  import AppToolbar from "./AppToolbar.svelte";
  
  let slides = [NewPresentation];
  let showToolbar=true;

function newPresentation(){
  // debugger;
slides = [NewPresentation];
// currentSlideIndex =0;
// currentSlide = slides[0];
}
$:{
  slides;
  // console.log(slides);
}
</script>

<div class="w-full bg-gray-800">

{#if slides}

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