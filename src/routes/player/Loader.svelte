<script>
    import { onMount } from 'svelte';
    
    export let onLoadCallback;
    
    let savedFiles = [];
    let selectedFile = '';

    onMount(() => {
        
        updateDropdown();
    });

    function updateDropdown() {
        const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        savedFiles = presentations.map(p => p.name);
    }

    function handleLoad() {
        if (!selectedFile) {
            alert('Please select a file to load');
            return;
        }

        const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        const selectedPresentation = presentations.find(p => p.name === selectedFile);
        
        if (selectedPresentation) {
            onLoadCallback(selectedPresentation.slides);
        }
    }
</script>

<div class="flex gap-2  ">
    <select
        bind:value={selectedFile}
        class="mb-2 px-2 py-1 rounded bg-gray-500 text-white"
    >
        <option value="">Select file</option>
        {#each savedFiles as file}
            <option value={file}>{file}</option>
        {/each}
    </select>

    <button 
    class="border-2 border-white p-1 text-white rounded-md px-4"
    on:click={handleLoad} >Load</button>


</div>
