<!-- Editor.svelte -->
<script>
  import { onMount } from 'svelte';
  import Toolbar from './toolbar/Toolbar.svelte';
  import PresentationModeEditor from "./PresentationModeEditor.svelte";
  import LeftPanel from './LeftPanel.svelte';
  import PresentationObj from '../code/PresentationObj';
  ////////////////////====Slides Registration///////
  //--very important -- will break the library
  import registerSlideTypes from "../slideRegistery/registerSlideTypes";
  import getNewSlide from '../getNewSlide/getNewSlide';
  registerSlideTypes();
////////////////////////////////////////////////////////////
  // Props
  export let slides;
  export let isBlob = false;
  export let showToolbar = true;
  export let audioData = '';

  let presentation;
  let ready = false;
  let showSidePanel = false;
  let show = false;

  // Create a reactive statement for the current slide
  $: currentSlide = presentation?.getCurrentSlide();
  $: currentSlideIndex = presentation?.currentSlideIndex || 0;

  // Initialize presentation object
  onMount(async () => {
    // debugger;
    presentation = new PresentationObj(slides);
    await presentation.init();
    ready = true;
  });

  // Wrapper functions for component events
  const handleAddNew = (slideType) => {
    const newIndex = presentation.addSlide(slideType);
    presentation.setCurrentSlideIndex(newIndex);
    show = false;
    slides = [...presentation.slides]; // Trigger Svelte reactivity
  };

  const handleMoveSlide = (index, direction) => {
    const newIndex = presentation.moveSlide(index, direction);
    if (newIndex !== false) {
      presentation.setCurrentSlideIndex(newIndex);
      slides = [...presentation.slides];
    }
  };

  const handleDeleteSlide = () => {
    presentation.deleteSlide(currentSlideIndex);
    slides = [...presentation.slides];
  };

  const handleUpdateEndTime = (index, newEndTime) => {
    presentation.updateSlideEndTime(index, newEndTime);
    slides = [...presentation.slides];
  };
</script>

<div class="bg-gray-800 overflow-x-auto w-full text-white min-h-screen">
  {#if showToolbar && presentation}
    <Toolbar
      slides={presentation.slides}
      bind:show
      bind:showSidePanel
      currentSlideIndex={presentation.currentSlideIndex}
      addNew={handleAddNew}
      deleteSlide={handleDeleteSlide}
      copySlide={() => presentation.copySlide(currentSlideIndex)}
      pasteSlide={() => {
        presentation.pasteSlide();
        slides = [...presentation.slides];
      }}
      cloneSlide={() => {
        presentation.cloneSlide(currentSlideIndex);
        slides = [...presentation.slides];
      }}
      soundFile={audioData}
      {isBlob}
      setCurrentSlideIndex={(index) => {
        presentation.setCurrentSlideIndex(index);
        slides = [...presentation.slides];
      }}
      onUpdateEndTime={handleUpdateEndTime}
    />
  {/if}

  <div class="flex justify-start w-full">
    {#if presentation}
      {#if showSidePanel}
        <div class="flex flex-col w-1/12 bg-gray-600 p-1" style="border-right: 2px solid white;">
          <LeftPanel
            slides={presentation.slides}
            setCurrentSlideIndex={(index) => {
              presentation.setCurrentSlideIndex(index);
              slides = [...presentation.slides];
            }}
            currentSlideIndex={presentation.currentSlideIndex}
            onMoveDown={(index) => handleMoveSlide(index, 'down')}
            onMoveUp={(index) => handleMoveSlide(index, 'up')}
          />
        </div>
      {/if}

      <div class={`p-2 ml-1 min-h-screen text-center ${showSidePanel ? "w-11/12" : "w-full"}`}>
        {#if ready}
          <PresentationModeEditor
          currentSlide={presentation.slides[0]}
            displayMode={false}
            onSaveTemplate={() => {}}
            currentSlideIndex={currentSlideIndex}
            spriteImgArray={presentation.assets?.spriteImgArray || []}
            bgImages={presentation.assets?.bgImages || []}
          />
        {/if}
      </div>
    {:else}
      <h1>No Slides in the presentation</h1>
    {/if}
  </div>
</div>