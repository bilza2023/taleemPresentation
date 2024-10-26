<script>
  //@ts-nocheck
  import { onMount } from 'svelte';
  
  import loadBgImages from "./loadBgImages.js";
  import loadSprites from "./loadSprites";
  import inspect from "./diagnose/inspect";

  import SlideRegistry  from './slideRegistery/SlideRegistry';
  const registry = SlideRegistry.getInstance();
  
  export let currentSlide;
  export let currentTime;
  export let pulse;
  export let setPulse = () => {};

  let spriteImgArray  = []; 
  let bgImages  = []; 

  let ready = false;
  
$:{
  currentSlide;
  inspect(currentSlide);
}   
 
onMount(async()=>{
try {
  bgImages = await loadBgImages();
  console.log('Loaded images:', bgImages.length);
} catch (error) {
  console.error('Failed to load background images:', error);
}

try {
  spriteImgArray = await loadSprites();
  console.log('Loaded sprites:', spriteImgArray.length);
} catch (error) {
  console.error('Failed to load sprite images:', error);
}

//////////////////////////////////////////////////////////////////////
ready = true;
}) ; 

$:{
//--14 sep 2024 :: so every time a slide changes we load the images required by it. We go over each item and if that item is "command.image" we load the inage in it    
  currentSlide;
  loadImages();
}

async function loadImage(src) {
return new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = (err) => reject(err);
  img.src = src;
});
}

// We go over each item and if that item is "command.image" we load the inage in it
async function loadImages() {
//   debugger;
for (let i = 0; i < currentSlide.items.length; i++) {
  const item = currentSlide.items[i];

  if (item.extra.command == 'image' || item.extra.command == 'image2') {
    try {
        const url = '-dontuse-'+ item.extra.src + '.' + item.extra.ext;
        const img = await loadImage( url);
        item.extra.image = img;
        
    }   catch (err) {
      // console.error('Error loading image:', err);
      // do nothing 
    }
  }
}
}

</script>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div tabindex="0">
  {#if currentSlide && ready}
      <!-- svelte-ignore missing-declaration -->
      <svelte:component 
          this={registry.getEditorComponent(currentSlide.type)}
          
          {currentTime}
          {pulse}
          
          items={currentSlide.items}
          
          startTime={currentSlide.startTime}
          endTime={currentSlide.endTime}
          
          slideExtra={currentSlide.slideExtra}
          extra={currentSlide.extra}
  
          spriteImgArray={currentSlide.type === 'canvas' ? spriteImgArray : undefined}
          bgImages={currentSlide.type === 'canvas' ? bgImages : undefined}
          
          {setPulse}
  
      />
  {/if}
</div>
