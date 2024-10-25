<script>
    import PlayerWithSound from "./PlayerWithSound.svelte";
    import PlayerNs from "./PlayerNs.svelte";
    import registerSlideTypes from "./slideRegistery/registerSlideTypes";
    
    ////////////////////====Slides Registration///////
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