<script>
  //@ts-nocheck

  import { onMount } from 'svelte';
  import inspect from "../diagnose/inspect.js";
import CanvasEditor from "../slides/canvas/canvasEditor/CanvasEditor.svelte"; 

  import SlideRegistry  from '../slideRegistery/SlideRegistry.js';
  const registry = SlideRegistry.getInstance();
  
  export let currentSlide;
 
  export let spriteImgArray  = []; 
  export let bgImages  = []; 

  onMount(async () => {
    // debugger;
  });


</script>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div tabindex="0">
  {#if currentSlide }
      <!-- svelte-ignore missing-declaration -->
      <!-- <CanvasEditor -->
      <svelte:component 
        this={registry.getEditorComponent(currentSlide.type)}
                   
          {currentSlide}
          bind:items={currentSlide.items}
      
          startTime={currentSlide.startTime}
          bind:endTime={currentSlide.endTime}
          
          bind:slideExtra={currentSlide.slideExtra}
          bind:extra={currentSlide.extra}
  
          spriteImgArray={currentSlide.type === 'canvas' ? spriteImgArray : undefined}
          bgImages={currentSlide.type === 'canvas' ? bgImages : undefined}
      />
  {/if}
</div>
