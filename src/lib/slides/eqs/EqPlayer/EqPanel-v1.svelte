<script>
  export let pulse;
  export let setPulse;

  let focusedDivId = null;

  // Toggle between two divs based on pulse
  $: focusedDivId = pulse % 2; // Flip between 0 and 1 on pulse change
</script>

<div class="flex flex-col space-y-2 w-full">
  <div
    id="item-0"
    class={focusedDivId === 0 ? 'focused w-full text-center' : 'nonFocused w-full text-center'}
  >
    <!-- First div -->
    Item 1
  </div>

  <div
    id="item-1"
    class={focusedDivId === 1 ? 'focused w-full text-center' : 'nonFocused w-full text-center'}
  >
    <!-- Second div -->
    Item 2
  </div>
</div>

<style>
  .focused {
    background-color: rgb(2, 63, 2);
    color: white;
    border: 2px solid red;
    padding: 5px;
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.5em;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
  
  .nonFocused {
    background-color: grey;
    padding: 2px;
    margin: 2px;
    font-size: 1.25em;
    transition: all 0.3s ease;
  }
</style>
