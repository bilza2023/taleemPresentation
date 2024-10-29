<script>
//@ts-nocheck
import CanvasCommand from "./json-ui/commands/CanvasCommand.svelte";  
  import EditorToolbar from './EditorToolbar.svelte';
  import SelectItemMenu from './json-ui/SelectItemMenu.svelte';   
  import CommandUi from './dialogueBoxModule/CommandUi.svelte';  
  import { toast } from "@zerodevx/svelte-toast";
  import {getNewItem} from '../../../index.js';
  import EditorFrame from "./EditorFrame.svelte";
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  // Props
  export let items;
  export let extra;
  export let currentTime;
  export let startTime;
  export let endTime;
  export let spriteImgArray;
  export let bgImages;
  export let playerImages;
  
  // State
  let selectedItemIndex = null;
  let showSideBar = 0;
  let ignoreShowAt = true;
  
  // Item manipulation functions
  function addNewItem(newItemExtraFn) {
    const newItemExtra = newItemExtraFn();
    const newItem = getNewItem();
    newItem.extra = newItemExtra;    
    items.unshift(newItem);      
    items = [...items];
  }
  
  function moveUp() {
    if (selectedItemIndex > 0) {
      const item = items.splice(selectedItemIndex, 1)[0];
      items.splice(selectedItemIndex - 1, 0, item);
      items = [...items];
      selectedItemIndex--;
    }
  }
  
  function moveDown() {
    if (selectedItemIndex >= 0 && selectedItemIndex < items.length - 1) {
      const item = items.splice(selectedItemIndex, 1)[0];
      items.splice(selectedItemIndex + 1, 0, item);
      items = [...items];
      selectedItemIndex++;
    }
  }
  
  function copyItem() {
    if (selectedItemIndex >= 0) {
      localStorage.setItem("copiedItem", JSON.stringify(items[selectedItemIndex]));
      toast.push("item copied");
    }
  }
  
  function pasteItem() {
    const copiedItem = localStorage.getItem("copiedItem");
    if (copiedItem) {
      const item = JSON.parse(copiedItem);
      item._id = null;
      items = [...items, item];
      toast.push("item pasted");
    } else {
      toast.push("no copied item found");
    }
  }
  
  function cloneItem() {
    if (selectedItemIndex >= 0) {
      const clonedItem = JSON.parse(JSON.stringify(items[selectedItemIndex]));
      delete clonedItem._id;
      items.unshift(clonedItem);
      items = [...items];
    }
  }
  
  function deleteItem() {
    if (selectedItemIndex >= 0) {
      items.splice(selectedItemIndex, 1);
      items = [...items];
      selectedItemIndex = null;
    }
  }
  
  // UI state functions
  function toggleIgnoreShowAt() {
    ignoreShowAt = !ignoreShowAt;
  }
  
  function toggleShowCanvas() {
    showSideBar = (showSideBar >= 2) ? 0 : showSideBar + 1;
  }
  
  function handleSelectionChange(event) {
    selectedItemIndex = event.detail.index;
  }
  
  function handlePulseChange(event) {
    currentTime = parseInt(event.target.value);
  }
  </script>
  
  {#if items}
  <div class='p-2 bg-stone-900'>
    <EditorToolbar
      bind:items={items}
      {toggleShowCanvas}
      {toggleIgnoreShowAt}
      {ignoreShowAt}
      {pasteItem}
      {addNewItem}
    />
       
    <div class='flex justify-between gap-2'>
      <EditorFrame 
        {items}
        {extra}
        {currentTime}
        {ignoreShowAt}
        {spriteImgArray}
        {bgImages}
        {playerImages}
        {selectedItemIndex}
        on:selectionChange={handleSelectionChange}
        on:requestClone={() => cloneItem()}
        on:requestDelete={() => deleteItem()}
      />
   
      <div class='w-25 max-w-[25%] min-w-[25%] bg-stone-600 rounded-md p-2'>
        {#if selectedItemIndex !== null}
          <SelectItemMenu 
            items={items} 
            selectedIndex={selectedItemIndex} 
            on:select={event => selectedItemIndex = event.detail.index}
          />
          <div class="p-4 bg-gray-800 rounded-lg shadow-md">
            <div class="space-x-2">
              <button on:click={moveUp}>Move Up</button>
              <button on:click={moveDown}>Move Down</button>
              <button on:click={deleteItem}>Delete</button>
              <button on:click={cloneItem}>Clone</button>
              <button on:click={copyItem}>Copy</button>
            </div>
            <CommandUi item={items[selectedItemIndex]} on:change={() => items = [...items]} />
          </div>           
        {:else}
          <CanvasCommand {extra} />
        {/if}
      </div>
    </div>
  </div>
  {/if}