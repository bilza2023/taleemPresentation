<script>
    import PlayerWithSound from "./PlayerWithSound.svelte";
    import PlayerNs from "./PlayerNs.svelte";
    import { onMount } from 'svelte';
    ////////////////////====Slides Registration///////
    //--very important -- will break the library
    import registerSlideTypes from "../code/slideRegistery/registerSlideTypes";
    registerSlideTypes();

    export let slides;
    export let audioData = undefined;
    export let isBlob = false;
    
    $: hasAudio = audioData !== undefined;

  onMount(async()=>{
    slides = await upgrade(slides);
  });    
  </script>
  
  {#if hasAudio && slides}
    <PlayerWithSound 
      {slides}
      {audioData}
      {isBlob}
    />
  {:else}
   {#if slides}
    <PlayerNs 
      {slides}
      />
    {/if}
  {/if}