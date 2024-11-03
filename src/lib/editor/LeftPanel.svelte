
  <!-- LeftPanel.svelte -->
  <script>
	import { onMount } from 'svelte';
    import {Icons} from '../util';
    
    export let slides;
    export let setCurrentSlideIndex;
    export let currentSlideIndex;
    export let onMoveDown;
    export let onMoveUp;
    
    function handleSlideSelect(index) {
      setCurrentSlideIndex(index);
    }
    
    function handleMoveDown(index, event) {
      event.stopPropagation();
      onMoveDown(index);
    }
    
    function handleMoveUp(index, event) {
      event.stopPropagation();
      onMoveUp(index);
    }
    onMount(async ()=>{
debugger;
slides;
    });
    </script>
    
    {#if slides?.length}
      {#each slides as slide, slideIndex}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div 
          class='hover:bg-red-900 text-center'
          style={slideIndex === currentSlideIndex ? 
            'border: 2px solid white;border-radius:10px;margin:1px;' : 
            'border: 2px solid #737c89;border-radius:10px;margin:1px;'}
          on:click={() => handleSlideSelect(slideIndex)}
        >
          <button 
            class='bg-gray-700 text-white px-1 py-1 rounded text-xs w-full'
          >
            {slide.type.toUpperCase().slice(0, 7)}
          </button>
          
          <div class='flex justify-evenly mt-1 gap-1 p-1'>
            <button 
              class='bg-gray-700 text-white px-1 py-1 rounded flex-1'
              on:click={(e) => handleMoveDown(slideIndex, e)}
            >
              {Icons.DOWN}
            </button>
    
            <button 
              class='bg-gray-700 text-white px-1 py-1 rounded flex-1'
              on:click={(e) => handleMoveUp(slideIndex, e)}
            >
              {Icons.UP}
            </button>
          </div>
        </div>
      {/each}
    {:else}
      <h3>No slides</h3>
    {/if}