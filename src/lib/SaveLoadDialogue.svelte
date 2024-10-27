<script>
    import Saver from './Saver.svelte';
    import Loader from './Loader.svelte';
    import { onMount } from 'svelte';

    export let slides;
    export let onLoadCallback;

    let savedFiles = [];

    onMount(() => {
        updateDropdown();
    });

    function updateDropdown() {
        const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        savedFiles = presentations.map(p => p.name);
    }

    function handleSaved() {
        updateDropdown();
    }
</script>

<div class='flex justify-center items-center text-xs p-1 rounded-md'
    style="background-color: #15803D;">
    <Saver {slides} on:saved={handleSaved} />
    <Loader {onLoadCallback} {savedFiles} />
</div>