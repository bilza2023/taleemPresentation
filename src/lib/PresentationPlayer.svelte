<svelte:head>
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
</svelte:head>
<script>

import {PlayerToolbar,PresentationModeUi} from "./index";
import { fade, scale } from 'svelte/transition';

export let presentationObj;
let pulse = 0;
let interval;
let showToolbarBool = false;
/////////////////////////////////////////

function showToolbar(){
  if (showToolbarBool == false){
    showToolbarBool = true;  
    setTimeout(() => {
    showToolbarBool = false;
  }, 5000);
  } 
}
////////////////////////////////////////////

function start(){
    interval = setInterval(gameloop , 500);
    pulse = Math.floor(presentationObj.pulse()); // this was missing link
}
function gameloop(){
   pulse = Math.floor(presentationObj.pulse());
}
function stop(){
  clearInterval(interval);
  pulse = Math.floor(presentationObj.pulse()); // this was missing link
}
function pause(){
  // clearInterval(interval);
  presentationObj.pause();
  pulse = Math.floor(presentationObj.pulse()); // this was missing link
}
function setPulse(value){
  presentationObj.setPulse(value);
  pulse = Math.floor(presentationObj.pulse()); // this was missing link
}
////////////////////////////////////////////

</script> 
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class='bg-gray-800 text-white w-full min-h-screen' 
style='position: fixed; top: 0;' on:mousemove={showToolbar} >

        {#if presentationObj}
              {#if showToolbarBool}
              <div in:scale="{{ duration: 300 }}" out:scale="{{ duration: 300, start: 0.95 }}">
                <PlayerToolbar {presentationObj} {pulse} 
                preStart={start} preStop={stop}  setPulse={setPulse} prePause={pause} opacity={0.5} theme="dark"/>
              </div>
            {/if}

        <div >
            <PresentationModeUi {presentationObj} {pulse} currentTime={pulse}  {pause}/>
        </div> 
        {/if}

</div><!--page wrapper-->

