<script>
  import { onMount } from 'svelte';
  import Toolbar from './toolbar/Toolbar.svelte';
  import PresentationModeEditor from "../PresentationModeEditor.svelte";
  import LeftPanel from './LeftPanel.svelte';
  import CommentsBox from './CommentsBox.svelte';
  import EditDlg from './EditDlg.svelte';
  import TemplatesDlg from './TemplatesDlg.svelte';
  import { getNewSlide } from '$lib';

  // Props
  export let slides = [];
  export let item = {};
  export let soundFile = '';
  export let tcode = '';
  export let slideTemplateCollection = [];
  export let onSave = () => {};
  export let onSaveTemplate = () => {};
  export let onDeleteTemplate = () => {};

  // Local state
  let currentSlideIndex = 0;
  let currentSlide = null;
  let showEditDlg = false;
  let showSidePanel = false;
  let currentTime = 0;
  let showSlideTemplateBrowser = false;
  let show = false;

  $: {
    if (slides.length > 0) {
      currentSlide = slides[currentSlideIndex];
    }
  }

  function setCurrentSlideIndex(index) {
    currentSlideIndex = index;
    currentSlide = slides[currentSlideIndex];
    slides = [...slides];
  }

  function getNewStartTime() {
    if (slides.length === 0) return 0;
    return slides[slides.length - 1].endTime;
  }

  function addNew(slideType) {
    const st = getNewStartTime();
    const newSlide = getNewSlide(slideType);
    newSlide.startTime = st;
    newSlide.endTime = st + 10;
    slides = [...slides, newSlide];
    setCurrentSlideIndex(slides.length - 1);
    show = false;
  }

  function moveSlide(index, direction) {
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < slides.length - 1)
    ) {
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = slides[index];
      slides[index] = slides[newIndex];
      slides[newIndex] = temp;

      // Exchange times
      const tempTimes = {
        start: slides[index].startTime,
        end: slides[index].endTime
      };
      slides[index].startTime = slides[newIndex].startTime;
      slides[index].endTime = slides[newIndex].endTime;
      slides[newIndex].startTime = tempTimes.start;
      slides[newIndex].endTime = tempTimes.end;

      setCurrentSlideIndex(newIndex);
    }
  }

  function deleteCurrentSlide() {
    if (slides.length > 1) {
      slides.splice(currentSlideIndex, 1);
      setCurrentSlideIndex(
        currentSlideIndex >= slides.length ? slides.length - 1 : currentSlideIndex
      );
    } else {
      slides = [];
      setCurrentSlideIndex(-1);
    }
    slides = [...slides];
  }

  onMount(() => {
    if (slides.length > 0) {
      currentSlideIndex = 0;
      currentSlide = slides[0];
    }
  });
</script>

<div class="bg-gray-800 overflow-x-auto w-full text-white min-h-screen">
  {#if item}
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
      onSave={() => onSave(slides, item)}
      {item}
      {soundFile}
      {tcode}
    />
  {/if}

  {#if showEditDlg}
    <EditDlg
      bind:item
      onSave={() => onSave(slides, item)}
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
    {#if slides && slides.length > 0}
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
          onSaveTemplate={(name, description) => {
            const templateSlide = JSON.parse(JSON.stringify(currentSlide));
            templateSlide.startTime = 0;
            templateSlide.endTime = 10;
            onSaveTemplate(templateSlide, name, description);
          }}
        />

        <br />
        <CommentsBox bind:comments={item.teacherComments} />
        <br />
        <CommentsBox title="Admin Comments" bind:comments={item.adminComments} />
      </div>
    {:else}
      <h1>No Slides in the presentation</h1>
    {/if}
  </div>
</div>