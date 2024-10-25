<!-- src/lib/PresentationModeUI.svelte -->
<script>
    //@ts-nocheck
    import { SlideRegistry } from './slideRegistry.js';
    const registry = SlideRegistry.getInstance();
  
    
    
    $: {
        if(presentationObj) {
            currentSlide = presentationObj.getCurrentSlide();
        }
    }


</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div on:keyup={handleKeyUp} on:click={handleClick} tabindex="0">
    {#if currentSlide && ready}
        <!-- svelte-ignore missing-declaration -->
        <svelte:component 
            this={registry.getPlayerComponent(currentSlide.type)}
            {currentTime}
            {pulse}
            items={currentSlide.items}
            slideExtra={currentSlide.slideExtra}
            startTime={currentSlide.startTime}
            endTime={currentSlide.endTime}
            {setPulse}
            spriteImgArray={currentSlide.type === 'canvas' ? spriteImgArray : undefined}
            bgImages={currentSlide.type === 'canvas' ? bgImages : undefined}
        />
    {/if}
</div>