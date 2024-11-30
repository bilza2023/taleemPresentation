<script>
    export let slides;
    export let currentTime=0;
    export let start = ()=>{};
    export let stop  = ()=>{};

    
    function log(){
        localStorage.setItem("slides",JSON.stringify(slides) );
        alert("Saved to localstorage");
    }

  </script>
  
  <div class="flex p-0 m-0 bg-gray-900 text-white gap-2 py-1">
    
    <button class="text-[10px] rounded-md bg-stone-400 px-2" on:click={start}>Start</button>
    <button class="text-[10px] rounded-md bg-stone-400 px-2" on:click={stop}>Stop</button>
    <button class="text-[10px] rounded-md bg-stone-400 px-2" on:click={log}>Log</button>

    <div class="text-xs">Current Time : {currentTime}</div>
  </div>
  