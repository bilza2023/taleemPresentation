<script>
    import PlayerWithSound from "./PlayerWithSound.svelte";
    import PlayerNs from "./PlayerNs.svelte";
    
    export let presentationData;
    export let audioData = undefined;
    export let isBlob = false;
    
    $: hasAudio = audioData !== undefined;
  </script>
  
  {#if hasAudio}
    <PlayerWithSound 
      {presentationData}
      {audioData}
      {isBlob}
    />
  {:else}
    <PlayerNs 
      {presentationData}
    />
  {/if}