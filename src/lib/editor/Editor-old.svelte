<script>
  import Toolbar from './toolbar/Toolbar.svelte';
  import PresentationModeEditor from "../PresentationModeEditor.svelte";
  import LeftPanel from './LeftPanel.svelte';
  import CommentsBox from './CommentsBox.svelte';
  import EditDlg from './EditDlg.svelte';
  import TemplatesDlg from './TemplatesDlg.svelte';
  import { getNewSlide } from '$lib';

  // Props
  export let presentationData;
  export let soundFile = '';
  export let slideTemplateCollection = [];
  export let onSave = () => {};
  export let onSaveTemplate = () => {};
  export let onDeleteTemplate = () => {};

  // Destructure commonly used values
  let { slides, tcode } = presentationData;

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
    slides = [...slides]; // Trigger reactivity
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

    // Swap slides and their times
    [slides[index], slides[newIndex]] = [slides[newIndex], slides[index]];
    [slides[index].startTime, slides[newIndex].startTime] = [slides[newIndex].startTime, slides[index].startTime];
    [slides[index].endTime, slides[newIndex].endTime] = [slides[newIndex].endTime, slides[index].endTime];

    setCurrentSlideIndex(newIndex);
  }

  function deleteCurrentSlide() {
    if (slides.length <= 1) {
      slides = [];
      currentSlideIndex = -1;
      return;
    }
    
    slides = slides.filter((_, i) => i !== currentSlideIndex);
    currentSlideIndex = Math.min(currentSlideIndex, slides.length - 1);
  }

  function handleSaveTemplate(name, description) {
    const templateSlide = {
      ...currentSlide,
      startTime: 0,
      endTime: 10
    };
    onSaveTemplate(templateSlide, name, description);
  }
</script>

<div class="bg-gray-800 overflow-x-auto w-full text-white min-h-screen">
  {#if presentationData}
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
      onSave={() => onSave(slides, presentationData)}
      {presentationData}
      {soundFile}
      {tcode}
    />
  {/if}

  {#if showEditDlg}
    <EditDlg
      bind:presentationData
      onSave={() => onSave(slides, presentationData)}
    />
  {/if}

  {#if showSlideTemplateBrowser}
    <TemplatesDlg
      {slideTemplateCollection}
      onAdd={addSlideTemplate}
      onDelete={onDeleteTemplate}
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
          {tcode}
          displayMode={false}
          onSaveTemplate={handleSaveTemplate}
        />

        <br />
        <CommentsBox bind:comments={presentationData.teacherComments} />
        <br />
        <CommentsBox title="Admin Comments" bind:comments={presentationData.adminComments} />
      </div>
    {:else}
      <h1>No Slides in the presentation</h1>
    {/if}
  </div>
</div>