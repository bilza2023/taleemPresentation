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
        
        // Find index of presentation with the same name
        const existingIndex = existingPresentations.findIndex(
            presentation => presentation.name.toLowerCase() === fileName.toLowerCase()
        );

        // If presentation exists, update it; otherwise add new one
        if (existingIndex !== -1) {
            existingPresentations[existingIndex] = {
                name: fileName,
                slides: slides
            };
        } else {
            existingPresentations.push({
                name: fileName,
                slides: slides
            });
        }

        // Save back to localStorage
        localStorage.setItem('taleemPresentations', JSON.stringify(existingPresentations));
        
        // Update dropdown
        updateDropdown();
    }

    // Function to update dropdown with saved files
    function updateDropdown() {
        const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        savedFiles = presentations.map(p => p.name);
    }

    // Function to handle file selection
    function handleFileSelection(event) {
        const selectedValue = event.target.value;
        if (!selectedValue) return;

        const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        const selectedPresentation = presentations.find(p => p.name === selectedValue);
        
        if (selectedPresentation) {
            onLoadCallback(selectedPresentation.slides);
            fileName = selectedValue; // Update the file name input to match selected file
        }
    }

    // Function to delete selected presentation
    function deletePresentation() {
        if (!selectedFile) {
            alert('Please select a file to delete');
            return;
        }

        if (confirm(`Are you sure you want to delete "${selectedFile}"?`)) {
            const presentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
            const updatedPresentations = presentations.filter(p => p.name !== selectedFile);
            localStorage.setItem('taleemPresentations', JSON.stringify(updatedPresentations));
            
            // Clear selection and update dropdown
            selectedFile = '';
            fileName = '';
            updateDropdown();
        }
    }
</script>

<div class='flex justify-center items-center text-xs p-1 rounded-md'
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
            class="bg-red-900 hover:bg-green-800 text-white px-2 rounded"
        >
            Save
        </button>
    </div>

    <!-- Group 2: Load Controls -->
    <div class="flex flex-col">
        {#if savedFiles.length > 0}
            <select
                bind:value={selectedFile}
                on:change={handleFileSelection}
                class="mb-2 px-2 py-1 rounded bg-green-900 text-white"
            >
                <option value="">Select file to load</option>
                {#each savedFiles as file}
                    <option value={file}>{file}</option>
                {/each}
            </select>
            <button
                on:click={deletePresentation}
                class="bg-orange-700 hover:bg-orange-800 text-white px-2 rounded"
            >
                Delete
            </button>
        {:else}
            <div class="mb-2 px-2 py-1 rounded bg-green-900 text-white">
                No saved files
            </div>
        {/if}
    </div>
</div>