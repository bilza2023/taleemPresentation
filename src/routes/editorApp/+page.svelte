<script>
  import { Editor } from "$lib";
  import audioData from "./audioData.js";
  import {slides as DefaultSlide} from "../slides/slides.js";
  import {NavBtn2} from 'sveltetools_bils/src/cmp';  
  import SaveLoadDialogue from "./SaveLoadDialogue.svelte";
  import {NewPresentation}  from "./newPresentation"; 

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
<div class="flex  w-6/12">


<NavBtn2 title='New File' icon='🎉'  clk={newPresentation} />     
<SaveLoadDialogue  bind:slides={slides}/>  


</div>

  <Editor
    isBlob={true}
    {showToolbar}
    {slides}
    {audioData}

  />

{/if}

</div>