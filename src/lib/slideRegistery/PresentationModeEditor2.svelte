<!-- src/lib/PresentationModeEditor.svelte -->
<script>
    import { SlideRegistry } from './slideRegistry.js';
    import { onMount } from 'svelte';
    
    const registry = SlideRegistry.getInstance();
    
    export let currentSlide;
    export let currentTime;
    export let saveCurrentSlideAsSlideTemplate;
    export let setPulse = () => {};
    
    let ready = false;
    
    onMount(() => {
        // Your existing mount logic for loading images etc
        ready = true;
    });
</script>

{#if ready && currentSlide}
    <svelte:component 
        this={registry.getEditorComponent(currentSlide.type)}
        bind:items={currentSlide.items}
        bind:slideExtra={currentSlide.slideExtra}
        {currentTime}
        startTime={currentSlide.startTime}
        endTime={currentSlide.endTime}
        {saveCurrentSlideAsSlideTemplate}
    />
{/if}