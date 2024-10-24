<script>
  import Toolbar from './toolbar/Toolbar.svelte';
  import PresentationModeEditor from "../PresentationModeEditor.svelte";
  import LeftPanel from './LeftPanel.svelte';
  import { slideOperations } from './slideOperations';
  // Props
  export let slides;
  export let showToolbar;
  export let audioData = '';
  export let onSave = () => {};
  
  // Local state
  let currentSlideIndex = 0;
  let currentSlide = slides[0] || null;
  let showEditDlg = false;
  let showSidePanel = false;
  let currentTime = 0;
  let showSlideTemplateBrowser = false;
  let show = false;

  // Reactive statement to keep currentSlide in sync
  $: currentSlide = slides[currentSlideIndex];

  function setCurrentSlideIndex(index) {
    currentSlideIndex = index;
    slides = slideOperations.setCurrentIndex(slides, index);
  }

  function addNew(slideType) {
    slides = slideOperations.addSlide(slides, slideType);
    setCurrentSlideIndex(slides.length - 1);
    show = false;
  }

  function moveSlide(index, direction) {
    slides = slideOperations.moveSlide(slides, index, direction);
    setCurrentSlideIndex(direction === 'up' ? index - 1 : index + 1);
  }

  function deleteCurrentSlide() {
    slides = slideOperations.deleteSlide(slides, currentSlideIndex);
    currentSlideIndex = Math.min(currentSlideIndex, slides.length - 1);
  }

</script>

<div class="bg-gray-800 overflow-x-auto w-full text-white min-h-screen">
  {#if showToolbar}
    <Toolbar
      bind:slides
      bind:show
      bind:showSidePanel
      bind:showEditDlg
      bind:showSlideTemplateBrowser
      bind:currentTime
      {currentSlideIndex}
      {addNew}
      {deleteCurrentSlide}
      onSave={() => onSave(slides)}
      soundFile={audioData}
    />
  {/if}


  <div class="flex justify-start w-full">
    {#if slides?.length}
      {#if showSidePanel}
        <div
          class="flex flex-col w-1/12 bg-gray-600 p-1"
          style="border-right: 2px solid white;"
        >
          <LeftPanel
            {slides}
            {setCurrentSlideIndex}
            {currentSlideIndex}
            onSelect={setCurrentSlideIndex}
            onMoveDown={(index) => moveSlide(index, 'down')}
            onMoveUp={(index) => moveSlide(index, 'up')}
          />
        </div>
      {/if}

      <div class={`p-2 ml-1 min-h-screen text-center ${showSidePanel ? "w-11/12" : "w-full"}`}>
        <PresentationModeEditor
          {currentSlide}
          {currentTime}
          displayMode={false}
          onSaveTemplate={()=>{}}
        />

    
      </div>
    {:else}
      <h1>No Slides in the presentation</h1>
    {/if}
  </div>
</div>