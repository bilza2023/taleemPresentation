<script>
import CanvasEditorPlayer from "./CanvasEditorPlayer.svelte";  

    export let items;
    export let startTime;
    export let endTime;
    export let extra;
    export let currentTime;
    export let ignoreShowAt;
    export let spriteImgArray;
    export let bgImages;
    export let playerImages;
    export let handleClickParent;
    export let itemObjects;
    export let selectedItem;
</script>

<div class='w-75'> 
    <!-- {#if showSaveSlideTemplateDialogue}
      <SaveSlideTemplate  {saveCurrentSlideAsSlideTemplate}/>
    {/if} -->
    
      <CanvasEditorPlayer {items} {extra} {currentTime} {ignoreShowAt} {spriteImgArray} {bgImages} {playerImages} {handleClickParent} {itemObjects} {selectedItem}/>
       
      <!-- slider for current slide time -->
        <div class="w-full">
          <span>Seconds:{currentTime}</span>
          <input class="w-full" type="range"  min={startTime} max={endTime}  
          bind:value={currentTime}/>
        </div>
       
    </div> 