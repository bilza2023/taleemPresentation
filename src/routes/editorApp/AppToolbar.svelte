<script>
    import { NavBtn2 } from 'sveltetools_bils/src/cmp';
    import SaveLoadDialogue from './SaveLoadDialogue.svelte';
    import { onMount } from 'svelte';
    import { slide, fade } from 'svelte/transition';

    export let slides;
    export let newPresentation;

    let showToolbar = false;
    let timer;

    const handleMouseOver = () => {
        showToolbar = true;
        clearTimeout(timer);
    };

    const handleMouseOut = () => {
        timer = setTimeout(() => {
            showToolbar = false;
        }, 3000);
    };

    onMount(() => {
        return () => clearTimeout(timer); // Clean up timeout on unmount
    });
</script>

<style>
    .bar {
        background-color: rgb(6, 232, 51);
        height: 8px;
        width: 100%;
    }
    .toolbar-container {
        background-color: rgb(4, 33, 2);
        width: 100%;
    }
    .toolbar {
        padding: 10px;
        background-color: #fff;
        width: 100%;
    }
</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    on:mouseover={handleMouseOver}
    on:mouseout={handleMouseOut}
>
    {#if showToolbar}
        <!-- Toolbar container with transitions -->
        <div class="toolbar-container" in:slide={{ duration: 200 }} out:fade={{ duration: 200 }}>
            <div class="flex justify-center bg-gray-800 p-1 gap-4">
                <NavBtn2 title="New File" icon="🎉" clk={newPresentation} />
                <SaveLoadDialogue bind:slides={slides} />
            </div>
        </div>
    {:else}
        <!-- Short bar visible when toolbar is hidden -->
        <div class="bar"></div>
    {/if}
</div>
