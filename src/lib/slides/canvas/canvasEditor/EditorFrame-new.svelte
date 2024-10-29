<script>
    import { createEventDispatcher } from 'svelte';
    import CanvasEditorPlayer from "./CanvasEditorPlayer.svelte";
    import itemToObject from "./componentObjects/itemToObject";
    
    const dispatch = createEventDispatcher();
    
    // Props
    export let items;
    export let startTime;
    export let endTime;
    export let extra;
    export let currentTime;
    export let ignoreShowAt;
    export let spriteImgArray;
    export let bgImages;
    export let playerImages;
    export let selectedItemIndex;
    
    // Local state
    let itemObjects = [];
    
    // Convert items to itemObjects whenever items change
    $: {
      itemObjects = items.map((item) => {
        return itemToObject(
          item,
          {
            cloneComponent: () => dispatch('requestClone'),
            del: () => dispatch('requestDelete')
          },
          spriteImgArray
        );
      });
    }
    
    function handleClickParent(e, mouseX, mouseY) {
      for (let i = 0; i < itemObjects.length; i++) {
        const item = itemObjects[i];
        if (item.isHit(mouseX, mouseY)) {
          dispatch('selectionChange', { index: i });
          return;
        }
      }
      dispatch('selectionChange', { index: null });
    }
    </script>
    
    <div class='w-75'> 
      <CanvasEditorPlayer 
        {items}
        {extra}
        {currentTime}
        {ignoreShowAt}
        {spriteImgArray}
        {bgImages}
        {playerImages}
        {handleClickParent}
        {itemObjects}
        selectedItem={selectedItemIndex !== null ? itemObjects[selectedItemIndex] : null}
      />
           
      <div class="w-full">
        <span>Seconds:{currentTime}</span>
        <input 
          class="w-full" 
          type="range"  
          min={startTime} 
          max={endTime}  
          bind:value={currentTime}
        />
      </div>
    </div>