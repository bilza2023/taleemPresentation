<script>
  import Toolbar from './toolbar/Toolbar.svelte';
  import PresentationModeEditor from "../PresentationModeEditor.svelte";
  import LeftPanel from './LeftPanel.svelte';
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
  
  // Local state
  let currentSlideIndex = 0;
  let currentSlide = slides[0] || null;
  let showSidePanel = false;
  let show = false;
  let clipboardSlide = null; // For copy/paste functionality

  // Reactive statement to keep currentSlide in sync
  $: currentSlide = slides[currentSlideIndex];

  function setCurrentSlideIndex(index) {
    currentSlideIndex = index;
  }

  function addNew(slideType) {
    const startTime = slides.length ? slides[slides.length - 1].endTime : 0;
    const newSlide = {
      ...getNewSlide(slideType),
      startTime,
      endTime: startTime + 10
    };
    
    slides = [...slides, newSlide];
    setCurrentSlideIndex(slides.length - 1);
    show = false;
  }

  function moveSlide(index, direction) {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= slides.length) return;

    const newSlides = [...slides];
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    [newSlides[index].startTime, newSlides[newIndex].startTime] = 
      [newSlides[newIndex].startTime, newSlides[index].startTime];
    [newSlides[index].endTime, newSlides[newIndex].endTime] = 
      [newSlides[newIndex].endTime, newSlides[index].endTime];

    slides = newSlides;
    setCurrentSlideIndex(direction === 'up' ? index - 1 : index + 1);
  }

  function deleteSlide() {
    if (slides.length <= 1) {
      slides = [];
      currentSlideIndex = 0;
      return;
    }
    slides = slides.filter((_, i) => i !== currentSlideIndex);
    currentSlideIndex = Math.min(currentSlideIndex, slides.length - 1);
  }
  function copySlide() {
  if (currentSlide) {
    localStorage.setItem('copiedSlide', JSON.stringify(currentSlide));
  }
}

function pasteSlide() {
  const savedSlide = localStorage.getItem('copiedSlide');
  if (savedSlide) {
    const clipboardSlide = JSON.parse(savedSlide);
    const startTime = slides.length ? slides[slides.length - 1].endTime : 0;
    const pastedSlide = {
      ...clipboardSlide,
      startTime,
      endTime: startTime + 10
    };
    slides = [...slides, pastedSlide];
    setCurrentSlideIndex(slides.length - 1);
  }
}

  function cloneSlide() {
    if (currentSlide) {
      const startTime = slides.length ? slides[slides.length - 1].endTime : 0;
      // const clonedSlide = {
      //   ...currentSlide,
      //   startTime,
      //   endTime: startTime + 10
      // };
      let clonedSlide = JSON.parse(JSON.stringify(currentSlide));
      // clonedSlide.endTime = 
      slides = [...slides, clonedSlide];
      setCurrentSlideIndex(slides.length - 1);
    }
  }

  function newPresentation() {
    slides = [NewPresentation];
    currentSlideIndex = 0;
    currentSlide = slides[0];
  }
</script>

<div class="bg-gray-800 overflow-x-auto w-full text-white min-h-screen">
  {#if showToolbar}
    <Toolbar
      bind:slides
      bind:show
      bind:showSidePanel
      {currentSlideIndex}
      {addNew}
      {deleteSlide}
      {copySlide}
      {pasteSlide}
      {cloneSlide}
      soundFile={audioData}
      {isBlob}
      {setCurrentSlideIndex}
      {newPresentation}
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
            bind:slides={slides}
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
          displayMode={false}
          onSaveTemplate={()=>{}}
        />
      </div>
    {:else}
      <h1>No Slides in the presentation</h1>
    {/if}
  </div>
</div>