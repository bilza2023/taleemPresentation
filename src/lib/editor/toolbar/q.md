in my svelte app i want to seperate code form components completely

for this purpose i have converted all the code inside the components into objects (presentationObj).
- The problem is that svelte components does not act well with the objects. 
    - i want to use objects and not have any code (except bare essential) inside the components. the component should just be for display..
    - the problem is that when i delte a slide or move it it is very difficult to change display. 
    - i can not give the object.method directly to the component button etc i have to use a wrapper function in compoent.

so these are some problems.     
i want presentationObj to replace other code

Editor.svelte
<script>
 import { onMount } from 'svelte';
  import Toolbar from './toolbar/Toolbar.svelte';
  import PresentationModeEditor from "./PresentationModeEditor.svelte";
  import LeftPanel from './LeftPanel.svelte';
  import loadAssets from "../code/assets/loadAssets";
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
  /////////////////////////////
  let spriteImgArray  = []; 
  let bgImages  = []; 
  let ready = false;
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

onMount(async()=>{
  // debugger;
  ({ bgImages, spriteImgArray } = await loadAssets());
ready = true;
}) ; 
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

<!-- from this point onwards we use just 1 slide. Before this point we have all the slides but here we just need 1 slide at a time to edit -->

      <div class={`p-2 ml-1 min-h-screen text-center ${showSidePanel ? "w-11/12" : "w-full"}`}>
        {#if ready}
        <PresentationModeEditor
          {currentSlide}
          displayMode={false}
          onSaveTemplate={()=>{}}
          {currentSlideIndex}
          {spriteImgArray}
          {bgImages}
        />
        {/if}
      </div>
    {:else}
      <h1>No Slides in the presentation</h1>
    {/if}
  </div>
</div>

Presentation.js

import loadAssets from "./assets/loadAssets";

/**
 * There is no presentation data and just slides since the startTime and endTime etc belong to first and last slide. We have kept a preseantation just an array of slides. Any thing that we need to know at app level is given to each slide individually.
 */

export default class PresentationObj{

    constructor(slidesData=[]){
        this.assets = {};
        this.slidesData = slidesData;
        this.slides = [];
    }

    async init(){
        this.assets = await loadAssets();
        // for (let i = 0; i < this.slidesData.length; i++) {
        //     const slide = this.slidesData[i];
            
        // }
    }




}
Toolbar.svelte
<script >
//@ts-nocheck
import {NavBtn2,NavLink,Logo,NavBtn,AreYouSure} from 'sveltetools_bils/src/cmp';
import {Icons} from '../../util';
import SoundButtons from './SoundButtons.svelte';
import NewSlidesDlg from "./NewSlidesDlg.svelte";
export let show;
export let slides;
export let addNew;
export let isBlob;
export let showSidePanel;
export let currentSlideIndex;

export let copySlide;
export let pasteSlide;
export let cloneSlide;
export let deleteSlide;


export let soundFile=null;
export let currentTime=0;



function shiftTime(slideIndex, newEndTime) {
//  debugger;
  if (slideIndex < 0 || slideIndex >= slides.length) {
    console.error("Invalid slide index");
    return;
  }

  // Update the end time of the specified slide
  slides[slideIndex].endTime = newEndTime;

  // Adjust subsequent slides
  for (let i = slideIndex + 1; i < slides.length; i++) {
    const durationChange = slides[i].startTime - slides[i - 1].endTime;
    
    // Update start time and end time to maintain total duration
    slides[i].startTime -= durationChange;
    slides[i].endTime -= durationChange;

    // Check for overlapping timings and correct if necessary
    if (slides[i].startTime < slides[i - 1].endTime) {
      slides[i].startTime = slides[i - 1].endTime;
      slides[i].endTime = slides[i].startTime + (slides[i].endTime - slides[i].startTime);
    }
  }
//  console.log(slides); 
}

</script>

<div class='flex justify-between  bg-gray-700 m-0 p-0 items-center gap-1 pt-2 '>
 
  <div class='flex justify-start items-center gap-1'>
    
    <NavBtn2 title='SP' icon={Icons.DOOR}  clk={()=>showSidePanel = !showSidePanel} />
      <NavBtn2 title='New Slide' icon={Icons.BULB}  clk={()=>show = !show} />
    <NavBtn2 title='Save' icon='🖨️'  clk={()=>{console.log(
      "export const presentationData = " + JSON.stringify(slides)
      )}} />
    

{#if soundFile}
<SoundButtons  {soundFile}  bind:currentTime={currentTime} {isBlob}/>    
{/if}

  </div> 

  <div class='flex justify-end m-0 p-1 items-center gap-1 border-2 border-gray-500  rounded-md text-xs mr-1'>
  {#if slides.length > 0}
    <span class='text-xs'>Start</span> 
    <div class='bg-gray-900 text-white p-0 px-4 m-0 rounded-md border-2 border-white'  type="number" >
    {slides[currentSlideIndex].startTime}
    </div>
    
    <span class='text-xs'>End</span>
    <input class='bg-gray-500 text-white p-0 m-0 rounded-md border-2 border-white text-center '  type="number" bind:value={slides[currentSlideIndex].endTime}
      on:input={() => shiftTime(currentSlideIndex, slides[currentSlideIndex].endTime)}
    >

<NavBtn2 title='Clone' icon={Icons.SHEEP}  clk={cloneSlide} />
<NavBtn2 title='Copy' icon={Icons.COPY}  clk={copySlide} />
<NavBtn2 title='Paste' icon='🖨️'  clk={pasteSlide} />
<NavBtn2 title='Delete' icon={Icons.WASTEBASKET}  clk={deleteSlide} />
    {/if}

  </div>  
  

</div>

{#if show}

  <NewSlidesDlg    {addNew}/>

{/if}





and LeftPanel.svelte
<script>
//@ts-nocheck
import {Icons} from '../util';
export let slides;
export let setCurrentSlideIndex;
export let currentSlideIndex;
export let moveDown;
export let moveUp;
</script>

    {#if slides}
        {#each slides as slide,slideIndex}

        <div class='hover:bg-red-900 text-center'
        style="{slideIndex === currentSlideIndex ? 
        'border: 2px solid white;border-radius:10px;margin:1px;' : 'border: 2px solid #737c89;border-radius:10px;margin:1px;'}"
        >

            <button class='bg-gray-700 text-white px-1 py-1 rounded 
            text-xs'
                    on:click={() => setCurrentSlideIndex(slideIndex)}>
                {slide.type.toUpperCase().slice(0, 7)}
            </button>
            
            <div class='flex justify-evenly '>
                
        <div class='flex justify-evenly mt-1 gap-1'>

            <button class='bg-gray-700 text-white px-1 py-1 rounded'
                    on:click={() => moveDown(slideIndex)}>
                {Icons.DOWN}
            </button>

            <button class='bg-gray-700 text-white px-1 py-1 rounded'
                    on:click={() => moveUp(slideIndex)}>
                {Icons.UP}
            </button>
        </div>


            </div>
        </div>
        
    
        {/each}
    {:else}
    <h3>No slides</h3>
    {/if}