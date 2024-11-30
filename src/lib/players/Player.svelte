<script>
    import PlayerWithSound from "./PlayerWithSound.svelte";
    import PlayerNs from "./PlayerNs.svelte";
    import { onMount } from 'svelte';
    import upgrade from "../upgrade.js";
    import loadAssets from "../assets/loadAssets";

    
  let assets = null;
    ////////////////////====Slides Registration///////
    //--very important -- will break the library
    import registerSlideTypes from "../code/slideRegistery/registerSlideTypes";
    registerSlideTypes();

    /////////////////////////////////////////
    export let slides;
    export let audioData = undefined;
    export let isBlob = false;
    
    $: hasAudio = audioData !== undefined;
/////////////////////////////////////////////////
  onMount(async()=>{
  // assets injected with loadAssets functions nothing else required. just call the loadAssets function and on this layer of the app you get assets bundle. 
       assets =  await loadAssets();
    slides = await upgrade(slides);
    debugger;
  }); 
  </script>
  
  {#if hasAudio && slides && assets}
    <PlayerWithSound 
      {slides}
      {audioData}
      {isBlob}
      {assets}
    />
  {:else}
   {#if slides}
    <PlayerNs 
      {slides}
      {assets}
      />
    {/if}
  {/if}