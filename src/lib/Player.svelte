<script>
    import PlayerWithSound from "./players/PlayerWithSound.svelte";
    import PlayerNs from "./players/PlayerNs.svelte";
    
    ////////////////////====Slides Registration///////
    //--very important -- will break the library
    import registerSlideTypes from "./slideRegistery/registerSlideTypes";
    registerSlideTypes();

    export let presentationData;
    export let audioData = undefined;
    export let isBlob = false;
    
    $: hasAudio = audioData !== undefined;
  </script>
  
  {#if hasAudio && presentationData}
    <PlayerWithSound 
      {presentationData}
      {audioData}
      {isBlob}
    />
  {:else}
   {#if presentationData}
    <PlayerNs 
      {presentationData}
      />
    {/if}
  {/if}