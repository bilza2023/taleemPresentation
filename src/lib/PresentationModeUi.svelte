<!-- <svelte:head>
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
</svelte:head> -->

<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import TblStr from "./slides/TblStr.svelte";
    import HdgList from "./slides/HdgList/HdgList.svelte";
    import EqPlayer from "./slides/eqs/EqPlayer/EqPlayer.svelte";
    import CanvasPlayer from "./slides/canvas/canvasPlayer/CanvasPlayer.svelte";
    import GridPlayer from "./slides/grid/gridPlayer/GridPlayer.svelte";

//sprite - sheet    
    import { students } from "./sprite/students";
    import { figs } from "./sprite/figs";
    import { alphabets } from "./sprite/alphabets";
    import { people } from "./sprite/people";
    import inspect from "./diagnose/inspect";
    let spriteImgArray  = []; 

    let bgImages  = []; 

    export let  presentationObj;
    let currentSlide;
    export let currentTime;
    export let pulse;
    export let pause=()=>{};
    // export let saveCurrentSlideAsSlideTemplate;//??
    // export let tcode = "fbise9math";
    export let setPulse = () => {};
      
    let ready = false;
$:{//first load
  if(presentationObj){
     currentSlide =  presentationObj.getCurrentSlide();
  }
}

$:{
    if(currentSlide){
      inspect(currentSlide);
    }
}   
  

onMount(async()=>{
    
    // Sprite Sheets
    students.img = new Image(); students.img.src = students.url;
    figs.img = new Image(); figs.img.src = figs.url;
    alphabets.img = new Image(); alphabets.img.src = alphabets.url;
    people.img = new Image(); people.img.src = people.url;
    
    spriteImgArray.push(students);
    spriteImgArray.push(figs);
    spriteImgArray.push(alphabets);
    spriteImgArray.push(people);
    //////////////////////////////////////
//
    const P = 'system_images/bg_images/';    

const paper01 = new Image(); paper01.src = P + "paper01.jpg";
bgImages.push({"name" : P + "paper01.jpg" , "img" : paper01});

const drywall = new Image(); drywall.src = P + "drywall.jpg";
bgImages.push({"name" : P + "drywall.jpg" , "img" : drywall});

const black_board = new Image(); black_board.src = P + "black_board.jpg";
bgImages.push({"name" : P + "black_board.jpg" , "img" : black_board});

const black_board_mat = new Image(); black_board_mat.src = P + "black_board_mat.jpg";
bgImages.push({"name" : P + "black_board_mat.jpg" , "img" : black_board_mat});
 
const wood = new Image(); wood.src = P + "wood.jpg";
bgImages.push({"name" : P + "wood.jpg" , "img" : wood});

const tinted = new Image(); tinted.src = P + "tinted.jpg";
bgImages.push({"name" : P + "tinted.jpg" , "img" : tinted});
 
const black_mat = new Image(); black_mat.src = P + "black_mat.jpg";
bgImages.push({"name" : P + "black_mat.jpg" , "img" : black_mat});

const white_mat = new Image(); white_mat.src = P + "white_mat.jpg";
bgImages.push({"name" : P + "white_mat.jpg" , "img" : white_mat});

const granite = new Image(); granite.src = P + "granite.jpg";
bgImages.push({"name" : P + "granite.jpg" , "img" : granite});

const gray_marble = new Image(); gray_marble.src = P + "gray_marble.jpg";
bgImages.push({"name" : P + "gray_marble.jpg" , "img" : gray_marble});

const brown_stone = new Image(); brown_stone.src = P + "brown_stone.jpg";
bgImages.push({"name" : P + "brown_stone.jpg" , "img" : brown_stone});


const gray_stone = new Image(); gray_stone.src = P + "gray_stone.jpg";
bgImages.push({"name" : P + "gray_stone.jpg" , "img" : gray_stone});

const design_old = new Image(); design_old.src = P + "design_old.jpg";
bgImages.push({"name" : P + "design_old.jpg" , "img" : design_old});

const blue_waves = new Image(); blue_waves.src = P + "blue_waves.jpg";
bgImages.push({"name" : P + "blue_waves.jpg" , "img" : blue_waves});

const wall = new Image(); wall.src = P + "wall.jpg";
bgImages.push({"name" : P + "wall.jpg" , "img" : wall});

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
ready = true;
}) ; 

$:{
//--14 sep 2024 :: so every time a slide changes we load the images required by it. We go over each item and if that item is "command.image" we load the inage in it    
    if(currentSlide){
      loadImages();
    }
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
          const url = 'https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/'+ item.extra.src + '.' + item.extra.ext;
          const img = await loadImage( url);
          item.extra.image = img;
          
      }   catch (err) {
        // console.error('Error loading image:', err);
        // do nothing 
      }
    }
  }
}
$:{
  if(pulse  && presentationObj){
    // console.log("pulse");
    currentSlide =  presentationObj.getCurrentSlide();
  }
} 
function handleKeyUp(event) {
  if (event.code === 'Space') {
      pause();
  }
}

function handleClick() {
    pause();
}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:keyup={handleKeyUp} on:click={handleClick} tabindex="0">
{#if currentSlide}

{#if currentSlide.type == "HdgList"}
   
        <HdgList
            pulse={currentTime}
            startTime={currentSlide.startTime}
            endTime={currentSlide.endTime}
            items={currentSlide.items}
            slideExtra={currentSlide.slideExtra}
        />
   
{/if}

{#if currentSlide.type == "TblStr"}
   
        <TblStr
            pulse={currentTime}
            startTime={currentSlide.startTime}
            endTime={currentSlide.endTime}
            items={currentSlide.items}
            slideExtra={currentSlide.slideExtra}
        />
   
{/if}

{#if currentSlide.type == "HdgList"}
   
        <HdgList
            pulse={currentTime}
            startTime={currentSlide.startTime}
            endTime={currentSlide.endTime}
            items={currentSlide.items}
            slideExtra={currentSlide.slideExtra}
        />
   
{/if}

<!-- Eqs -->
{#if currentSlide.type == "Eqs"}
   
        <EqPlayer
            pulse={currentTime}
            startTime={currentSlide.startTime}
            endTime={currentSlide.endTime}
            items={currentSlide.items}
            slideExtra={currentSlide.slideExtra}
            {setPulse}
        />
   
{/if}

<!-- grid -->
{#if currentSlide.type == "grid"}
  
        <GridPlayer
            pulse={currentTime}
            startTime={currentSlide.startTime}
            endTime={currentSlide.endTime}
            items={currentSlide.items}
            slideExtra={currentSlide.slideExtra}
            {setPulse}
        />
  
{/if}


<!-- CanvasEditor -->
{#if ready}
{#if currentSlide.type == "canvas"}
   
        <CanvasPlayer
            {currentTime}
            items={currentSlide.items}
            extra={currentSlide.extra}
            {spriteImgArray}
            {bgImages}
            
        />
   
{/if}
{/if}


{/if} 
</div><!--div for space-bar and mouse-->