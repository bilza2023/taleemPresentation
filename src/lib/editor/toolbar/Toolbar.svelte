<!-- Toolbar.svelte -->
<script>
  import {NavBtn2, NavLink, Logo, NavBtn, AreYouSure} from 'sveltetools_bils/src/cmp';
  import {Icons} from '../../util';
  import SoundButtons from './SoundButtons.svelte';
  import NewSlidesDlg from "./NewSlidesDlg.svelte";
  
  // Props
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
  export let setCurrentSlideIndex;
  export let onUpdateEndTime;
  
  export let soundFile = null;
  export let currentTime = 0;
  
  // Handle end time changes
  function handleEndTimeChange(event) {
    const newEndTime = Number(event.target.value);
    onUpdateEndTime(currentSlideIndex, newEndTime);
  }
  
  function exportSlides() {
    console.log("export const presentationData = " + JSON.stringify(slides));
  }
  </script>
  
  <div class='flex justify-between bg-gray-700 m-0 p-0 items-center gap-1 pt-2'>
    <div class='flex justify-start items-center gap-1'>
      <NavBtn2 
        title='SP' 
        icon={Icons.DOOR}  
        clk={() => showSidePanel = !showSidePanel} 
      />
      <NavBtn2 
        title='New Slide' 
        icon={Icons.BULB}  
        clk={() => show = !show} 
      />
      <NavBtn2 
        title='Save' 
        icon='🖨️'  
        clk={exportSlides} 
      />
  
      {#if soundFile}
        <SoundButtons  
          {soundFile}  
          bind:currentTime
          {isBlob}
        />    
      {/if}
    </div> 
  
    <div class='flex justify-end m-0 p-1 items-center gap-1 border-2 border-gray-500 rounded-md text-xs mr-1'>
      {#if slides.length > 0}
        <span class='text-xs'>Start</span> 
        <div class='bg-gray-900 text-white p-0 px-4 m-0 rounded-md border-2 border-white'>
          {slides[currentSlideIndex].startTime}
        </div>
        
        <span class='text-xs'>End</span>
        <input 
          class='bg-gray-500 text-white p-0 m-0 rounded-md border-2 border-white text-center'
          type="number" 
          value={slides[currentSlideIndex].endTime}
          on:input={handleEndTimeChange}
        >
  
        <NavBtn2 
          title='Clone' 
          icon={Icons.SHEEP}  
          clk={cloneSlide} 
        />
        <NavBtn2 
          title='Copy' 
          icon={Icons.COPY}  
          clk={copySlide} 
        />
        <NavBtn2 
          title='Paste' 
          icon='🖨️'  
          clk={pasteSlide} 
        />
        <NavBtn2 
          title='Delete' 
          icon={Icons.WASTEBASKET}  
          clk={deleteSlide} 
        />
      {/if}
    </div>  
  </div>
  
  {#if show}
    <NewSlidesDlg {addNew}/>
  {/if}
  