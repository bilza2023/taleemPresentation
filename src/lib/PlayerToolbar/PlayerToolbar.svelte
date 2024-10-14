<script  >
    //@ts-nocheck
/**
 * 14-Oct-2024
 * This Toolbar is specially being build for PresentationObjUrl consumption. It will work with that object. If the user wants to hookup its own behaviour we can provide our hooks.
 * */    
import { goto} from '$app/navigation';
    import Slider from './Slider.svelte';
    import { fade } from 'svelte/transition';

    

export let presentationObj;   
export let pulse;   
export let preStart=()=>{};   
export let preStop=()=>{};   
export let setPulse;   
    
function start(){
    preStart();
    presentationObj.start();
}    
function stop(){
    preStop();
    presentationObj.stop();
}    
function pause(){
    presentationObj.pause();
}    

function setVolume(value){
  presentationObj.setVolume(value)
}

function home(){
stop();
goto('/');
}

</script>
{#if presentationObj}
<div class='toolbar-wrapper' in:fade={{ delay: 300 }} out:fade={{ delay: 300 }}>
  <div class='toolbar-content flex justify-left'>
   
    <div class="flex items-center space-x-2">
      &nbsp;&nbsp;  
  <button class="p-1 rounded-sm bg-green-700 text-white text-sm" 
    style='background-color:#065d7f' on:click={home}>🏠</button>
  
<!-- //////////////////////////////////   -->
<!-- {#if ready }  -->
<!-- //////////////////////////////////   -->
    <button class="p-1 rounded-sm bg-green-700 text-white text-sm " 
    on:click={start} style='background-color:#00A6ED '>▶ </button>


    <button class="p-1 rounded-sm bg-green-700 text-white text-sm " 
    on:click={pause} style='background-color:gray '> || </button>

    <button class="p-1 rounded-sm bg-red-800 text-white text-sm " 
      on:click={stop}>■ </button>

<!-- ///////////////////////////////////////////// -->
<!-- {:else} 
<button class="p-1  bg-orange-700 text-yellow-500 text-xs rounded-md" 
style='background-color:#00A6ED '>loading..</button>
{/if}  -->
<!-- ///////////////////////////////////////////// -->
  
<input type="range" min="0" max="1" step='0.1' value="0.8" on:input={(e)=>setVolume(e.target.value)} />
  
  </div>
  
      <Slider slides={presentationObj.slides} {pulse} {setPulse}/>
</div>
</div>

{/if}


<style>
  .toolbar-wrapper {
    position: relative; /* or absolute */
    z-index: 1000; /* adjust as needed */
  }

  .toolbar-content {
    position: fixed; /* or absolute */
    top: 0;
    left: 0;
    width: 100%;
    background-color: #aeb18c; /* adjust background color as needed */
    padding: 1px;
    opacity: 0.8;

  }
</style>
