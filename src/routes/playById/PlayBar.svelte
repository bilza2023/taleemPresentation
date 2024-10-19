<script>
    export let getVideo;
    let id = "66616b5205ea063f6d27b7aa";

</script>

<div class="w-full text-center m-0 p-2 pt-12">
    <div class="flex items-center justify-center gap-2 text-white">
      <label for="video-id" class="text-lg">Video Id:</label>
      <input bind:value={id} class="bg-gray-600 text-white rounded-md p-2 w-64" type="text">
      <button class="bg-green-600 p-2 text-white rounded-md"
        on:click={()=>getVideo(id)}
      >Play</button>
    </div>
  </div>
  