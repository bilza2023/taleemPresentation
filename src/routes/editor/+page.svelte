<script>
  import { onMount } from 'svelte';
  import { Editor } from "$lib";
  import { toast } from '@zerodevx/svelte-toast';
  import { db } from "../ajax";
  import CommentsBox from './CommentsBox.svelte';
  import Toolbar from './toolbar/Toolbar.svelte';
  
  let presentationData;
  let slides = [];
  let showToolbar=true;
  let id;
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
    updatedItem.tcode = presentationData.tcode;
    
    try {
      const resp = await db.tcode.update(id, {
        ...updatedItem,
        slides: updatedSlides
      });
      
      if (resp.ok) {
        toast.push("Presentation saved successfully");
        presentationData = updatedItem;
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
  <div class="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
{:else}

{#if presentationData}
<Toolbar
  
  bind:showEditorToolbar={showToolbar}
  onSave={() => {} }
  {presentationData}
  {soundFile}
/>
{/if}

  <Editor
    {showToolbar}
    {presentationData}
    {soundFile}
   
    {slideTemplateCollection}
    onSave={savePresentation}
    onSaveTemplate={saveSlideTemplate}
    onDeleteTemplate={deleteSlideTemplate}
  />


  <!-- {#if showSlideTemplateBrowser}
  <TemplatesDlg
    {slideTemplateCollection}
    onAdd={addSlideTemplate}
    onDelete={onDeleteTemplate}
  />
  {/if} -->

  <br />
  <CommentsBox bind:comments={presentationData.teacherComments} />
  <br />
  <CommentsBox title="Admin Comments" bind:comments={presentationData.adminComments} />
{/if}



</div>