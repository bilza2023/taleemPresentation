<script lang="ts" >
//@ts-nocheck
import {NavBtn2,NavLink,Logo,NavBtn,AreYouSure} from 'sveltetools_bils/src/cmp';
import {Icons} from '../../util';
import SoundButtons from './SoundButtons.svelte';
import SaveLoadDialogue from './SaveLoadDialogue.svelte';

import NewSlidesDlg from "./NewSlidesDlg.svelte";

export let show;
export let slides;

export let addNew;
export let isBlob;

export let showSidePanel;
export let currentSlideIndex;
export let setCurrentSlideIndex;

export let duplicateCurrentSlide;
export let pasteSlide;
export let copySlide;

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
function onLoadCallback(slidesToBeLoaded) {

  slides = slidesToBeLoaded;
  setCurrentSlideIndex(0);
}
</script>

<div class='flex justify-between  bg-gray-700 m-0 p-0 items-center gap-1 pt-2 '>
 
  <div class='flex justify-start items-center gap-1'>
    
    <NavBtn2 title='SP' icon={Icons.DOOR}  clk={()=>showSidePanel = !showSidePanel} />
      <NavBtn2 title='New' icon={Icons.BULB}  clk={()=>show = !show} />
    <NavBtn2 title='Console' icon='🖨️'  clk={()=>{console.log(
      "export const presentationData = " + JSON.stringify(slides)
      )}} />
    
     
    
{#if soundFile}
<SoundButtons  {soundFile}  bind:currentTime={currentTime} {isBlob}/>    
{/if}


<SaveLoadDialogue {onLoadCallback} {slides}/>   
<!-- <span class='text-green-300 bg-gray-900 p-1 text-xs rounded-md '>{filename}</span> -->


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

<NavBtn2 title='Clone' icon={Icons.COPY}  clk={duplicateCurrentSlide} />
<NavBtn2 title='Copy' icon={Icons.TEXT}  clk={copySlide} />
<NavBtn2 title='Paste' icon='📎'  clk={pasteSlide} />
    {/if}

  </div>  
  

</div>

{#if show}

  <NewSlidesDlg    {addNew}/>

{/if}





