<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    
    // Props
    export let slides;
    export let onLoadCallback;

    // Local state
    let fileName = '';
    let savedFiles = [];
    let selectedFile = '';

    // Load saved presentations on mount
    onMount(() => {
        updateDropdown();
    });

    // Function to save presentation
    function savePresentation() {
        if (!fileName.trim()) {
            alert('Please enter a file name');
            return;
        }

        // Get existing presentations or initialize empty array
        const existingPresentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        debugger;
        // Add new presentation
        existingPresentations.push({
            name: fileName,
            slides: slides
        });

        // Save back to localStorage
        localStorage.setItem('taleemPresentations', JSON.stringify(existingPresentations));
        
        // Update dropdown and clear input
        updateDropdown();
        fileName = '';
    }

    // Function to update dropdown with saved files
    function updateDropdown() {
        const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        savedFiles = presentations.map(p => p.name);
    }

    // Function to handle load button click
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

<div class='flex justify-center items-center text-xs  p-1 rounded-md'
style="background-color: #15803D;">
    <!-- Group 1: Save Controls -->
    <div class="flex flex-col mr-4">
        <input
            type="text"
            bind:value={fileName}
            placeholder="Enter file name"
            class="mb-2 px-2 py-1 rounded bg-green-900 text-white"
        />
        <button
            on:click={savePresentation}
            class="bg-red-900 hover:bg-green-800 text-white px-2  rounded"
            
        >
            Save
        </button>
    </div>

    <!-- Group 2: Load Controls -->
    <div class="flex flex-col">
        <select
        bind:value={selectedFile}
        class="mb-2 px-2 py-1 rounded bg-green-900 text-white"
    >
        <option value="">Select file</option>
        {#each savedFiles as file}
            <option value={file}>{file}</option>
        {/each}
    </select>

        <button
            on:click={handleLoad}
            class="bg-orange-700 hover:bg-orange-800 text-white px-2  rounded"
        >
            Load
        </button>
    </div>
</div>