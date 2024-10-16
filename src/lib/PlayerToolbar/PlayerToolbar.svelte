<script>
  //@ts-nocheck
  import { goto } from '$app/navigation';
  import Slider from './Slider.svelte';
  import { fade } from 'svelte/transition';

  export let presentationObj;   
  export let pulse;   

  export let preStart = () => {};   
  export let preStop = () => {};   
  export let prePause = () => {};   
  export let setPulse= () => {};   
  
  // New props for theming and opacity
  export let theme = 'light';
  export let opacity = 0.8;

  function start() {
      preStart();
      presentationObj.start();
  }    
  function stop() {
      preStop();
      presentationObj.stop();
  }    
  function pause() {
      prePause();
      presentationObj.pause();
  }    

  function setVolume(value) {
      presentationObj.setVolume(value);
  }

  function home() {
      stop();
      goto('/');
  }

  // Theme variables
  $: themeVars = theme === 'dark' 
    ? { bg: '#333', text: '#fff', primary: '#00A6ED', secondary: '#aeb18c' }
    : { bg: '#fff', text: '#333', primary: '#065d7f', secondary: '#aeb18c' };
</script>

{#if presentationObj}
<div class='toolbar-wrapper' in:fade={{ delay: 300 }} out:fade={{ delay: 300 }} style="--opacity: {opacity};">
  <div class='toolbar-content flex items-center space-x-2' style="background-color: {themeVars.secondary};">
      <button class="toolbar-button" style="background-color: {themeVars.primary};" on:click={home}>🏠</button>
      <button class="toolbar-button" style="background-color: {themeVars.primary};" on:click={start}>▶</button>
      <button class="toolbar-button" style="background-color: gray;" on:click={pause}>||</button>
      <button class="toolbar-button" style="background-color: #b91c1c;" on:click={stop}>■</button>

      <input type="range" min="0" max="1" step='0.1' value="0.8" 
          on:input={(e) => setVolume(e.target.value)} />
      
      <div class="toolbar-text" style="background-color: {themeVars.bg}; color: {themeVars.text};">
        {#if typeof pulse === 'number'}
          {pulse.toFixed(0)}
        {:else}
          {pulse}
        {/if}
        / {presentationObj.slides[presentationObj.slides.length - 1].endTime} sec
      </div>
      
      <!-- Slider Input -->
      <div class='w-10/12 p-1 rounded-sm text-xs text-center' style="background-color: {themeVars.bg};">
        <input type="range" min='0' 
          max={presentationObj.slides[presentationObj.slides.length - 1].endTime} value={pulse}
          class="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style="background-color: {themeVars.secondary};"
          on:change="{e => setPulse(e.target.value)}">
      </div>
  </div>
</div>
{/if}

<style>
  .toolbar-wrapper {
      position: relative;
      z-index: 1000;
  }

  .toolbar-content {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 1px;
      opacity: var(--opacity);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
  }

  .toolbar-button {
      padding: 0.25rem;
      border-radius: 0.125rem;
      color: white;
      font-size: 0.875rem;
  }

  .toolbar-text {
      width: 16.666667%;
      padding: 0.25rem;
      border-radius: 0.125rem;
      font-size: 0.75rem;
      text-align: center;
  }
</style>