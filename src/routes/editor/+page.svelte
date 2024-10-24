<script>
  import { onMount } from 'svelte';
  import { Editor } from "$lib";
  import { toast } from '@zerodevx/svelte-toast';
  import { db } from "../ajax";

  let item;
  let slides = [];
  let tcode;
  let id;
  let filename;
  let soundFile;
  const SOUND_FILE_PATH = "https://taleem-media.blr1.cdn.digitaloceanspaces.com/sound/";
  let isLoading = true;
  let slideTemplateCollection = [];

  function convertToUrlFriendlyName(name) {
    const urlFriendlyName = name.replace(/\s+/g, '_');
    return urlFriendlyName.replace(/[^\w\d_]/g, '');
  }

  async function savePresentation(updatedSlides, updatedItem) {
    if (updatedItem.name && updatedItem.name !== '') {
      updatedItem.name = convertToUrlFriendlyName(updatedItem.name);
    }
    updatedItem.tcode = tcode;
    
    try {
      const resp = await db.tcode.update(id, {
        ...updatedItem,
        slides: updatedSlides
      });
      
      if (resp.ok) {
        toast.push("Presentation saved successfully");
        item = updatedItem;
        slides = updatedSlides;
      }
    } catch (error) {
      console.error(error);
      toast.push("Failed to save presentation", { theme: 'error' });
    }
  }

  async function getSlideTemplates() {
    try {
      const resp = await db.slideTemplate.get();
      if (resp.ok) {
        const data = await resp.json();
        slideTemplateCollection = data.data;
      }
    } catch (e) {
      console.error(e);
      toast.push("Failed to load slide templates", { theme: 'error' });
    }
  }

  async function saveSlideTemplate(slideData, name, description) {
    try {
      const resp = await db.slideTemplate.create({
        name,
        description,
        slide: slideData
      });

      if (resp.ok) {
        toast.push("Slide template saved successfully");
        await getSlideTemplates();
      }
    } catch (error) {
      console.error(error);
      toast.push("Failed to save slide template", { theme: 'error' });
    }
  }

  async function deleteSlideTemplate(templateId) {
    try {
      const resp = await db.slideTemplate.delete(templateId);
      if (resp.ok) {
        toast.push("Slide template deleted successfully");
        await getSlideTemplates();
      }
    } catch (error) {
      console.error(error);
      toast.push("Failed to delete slide template", { theme: 'error' });
    }
  }

  onMount(async () => {
    try {
      id = new URLSearchParams(location.search).get("id");
      const resp = await db.tcode.getOne(id);

      if (resp.ok) {
        item = await resp.json();
        filename = item.filename;
        tcode = item.tcode;
        slides = item.slides;
        soundFile = SOUND_FILE_PATH + item.filename + '.opus';
        
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

{#if isLoading}
  <div class="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
{:else}
  <Editor
    {slides}
    {item}
    {soundFile}
    {tcode}
    {slideTemplateCollection}
    onSave={savePresentation}
    onSaveTemplate={saveSlideTemplate}
    onDeleteTemplate={deleteSlideTemplate}
  />
{/if}
