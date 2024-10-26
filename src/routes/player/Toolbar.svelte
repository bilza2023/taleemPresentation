  
<script lang="ts" >
  //@ts-nocheck
  import {NavBtn2} from 'sveltetools_bils/src/cmp';
  import {Icons} from '$lib/util';
  
  import Loader from './Loader.svelte';
  export let onLoadCallback;
  
  // function onLoadCallback(slidesToBeLoaded) {
  
  //   slides = slidesToBeLoaded;
  //   setCurrentSlideIndex(0);
  // }

  </script>
  
  <div class='flex justify-left  bg-gray-700 m-0 p-0 items-center gap-1 '>
   
      <!-- <NavBtn2 title='Console' icon='🖨️'  clk={()=>{console.log( -->
        <!-- "export const presentationData = "  )}} /> -->
      
<div class="p-1 ">
  <Loader {onLoadCallback} />   
</div>
  
    </div> 
  
  