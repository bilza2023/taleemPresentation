<svelte:head>
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
</svelte:head>
    
<script>
    import { PlayerToolbarFlex, PresentationModeUi } from '$lib';
    import { fade, scale } from 'svelte/transition';

    export let presentationObj;
    export let preStart = () => {};
    export let preStop = () => {};
    export let prePause = () => {};
   
  
    // Props for dynamic sizing
    export let width = '100%';
    export let height = 'auto';

    let pulse=0;
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
    
  </script>
  
  <div class="presentation-player" style="width: {width}; height: {height};">

    <!-- Attach the toolbar -->
    <!-- <PlayerToolbarFlex {presentationObj} {pulse} {preStart} {preStop} {prePause} {setPulse} /> -->
    <PlayerToolbarFlex {presentationObj} {pulse} 
    preStart={start} preStop={stop}  setPulse={setPulse} prePause={pause} opacity={0.5} theme="dark"/>

    <!-- Your presentation content -->
    <PresentationModeUi {presentationObj} {pulse} currentTime={pulse}  {pause}/>

    
  </div>
  
  <style>
    .presentation-player {
      position: relative;
      display: flex;
      flex-direction: column;
    }
  </style>
  