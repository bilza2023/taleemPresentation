<script>
  import { onMount } from 'svelte';
  import { Editor } from "$lib";
  import { toast } from '@zerodevx/svelte-toast';
  import { db } from "../ajax";
 
  
  let presentationData;
  let slides = [];
  let showToolbar=true;
  let id;
  let soundFile;
  const SOUND_FILE_PATH = "https://taleem-media.blr1.cdn.digitaloceanspaces.com/sound/";
  let isLoading = true;
  
  
  onMount(async () => {
    try {
      id = new URLSearchParams(location.search).get("id");
      const resp = await db.tcode.getOne(id);

      if (resp.ok) {
        presentationData = await resp.json();
        slides = presentationData.slides;
        soundFile = SOUND_FILE_PATH + presentationData.filename + '.opus';
        
        await getSlideTemplates();
      } else {
        throw new Error('Failed to load presentation');
      }
    } catch (error) {
      console.error(error);
      toast.push("Failed to load presentation", { theme: 'error' });
    } finally {
      isLoading = false;
    }
  });
</script>
<div class="w-full bg-gray-800">
{#if isLoading}
  <div class="flex items-center justify-center h-screen text-white">
    <p>Loading...</p>
  </div>
{:else}

{#if presentationData}

  <Editor
    {showToolbar}
    {presentationData}
    {soundFile}
   
  />


{/if}


{/if}



</div>