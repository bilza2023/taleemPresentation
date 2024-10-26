<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    export let slides;
    
    let fileName = '';

    function savePresentation() {
        if (!fileName.trim()) {
            alert('Please enter a file name');
            return;
        }

        // Get existing presentations or initialize empty array
        const existingPresentations = JSON.parse(localStorage.getItem('taleemPresentations') || '[]');
        
        // Add new presentation
        existingPresentations.push({
            name: fileName,
            slides: slides
        });

        // Save back to localStorage
        localStorage.setItem('taleemPresentations', JSON.stringify(existingPresentations));
        
        // Clear input
        fileName = '';

        // Dispatch event to notify wrapper
        dispatch('saved');
    }
</script>

<div class="flex flex-col mr-4">
    <input
        type="text"
        bind:value={fileName}
        placeholder="Enter file name"
        class="mb-2 px-2 py-1 rounded bg-gray-500 text-white"
    />
    <button
        on:click={savePresentation}
        class="bg-green-600 hover:bg-green-800 text-white px-2 rounded"
    >
        Save
    </button>
</div>