<!-- {#if currentSlide.type == "HdgList"}
   
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
{/if} -->