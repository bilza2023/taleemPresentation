<script>
    // No additional script needed
  </script>
  
  <div class="bg-gray-800 text-white min-h-screen p-8">
    <h1 class="text-3xl font-bold mb-8 border-b-2 border-white pb-2">Taleem Presentation</h1>
  
    <ul class="space-y-6 text-lg font-semibold">
      <li><a href="/static" class="block border-b border-white pb-2 text-green-600">Static Presentation:&nbsp; <span class="text-gray-300 text-xs">uses PresentationPlayer with PresentationObjBlob and PlayerToolbar.This page code is old style.</span></a></li>
      
      <li><a href="/player?filename=fbise9math_ch_1_ex_1.1_q_4_n_properties_of_real_numbers" class="block border-b border-white pb-2 text-green-400">Player:&nbsp; <span class="text-gray-300 text-xs">uses PresentationPlayer with PresentationObjUrl and PlayerToolbar</span></a>
      </li>

      <li><a href="/playerNS?filename=fbise9math_ch_1_ex_1.1_q_4_n_properties_of_real_numbers" class="block border-b border-white pb-2 text-orange-400">Player No Sound:&nbsp; <span class="text-gray-300 text-xs">uses PresentationPlayerNs with PresentationObjNs and PlayerToolbarNs</span></a></li>

      <li><a href="/four?filename=fbise9math_ch_1_ex_1.1_q_4_n_properties_of_real_numbers" class="block border-b border-white pb-2">Four</a></li>

      <li><a href="/youtube?filename=fbise9math_ch_1_ex_1.1_q_4_n_properties_of_real_numbers" class="block border-b border-white pb-2">Youtube</a></li>

      <li><a href="/book?tcode=fbise9math" class="block border-b border-white pb-2">Book</a></li>

      <li><a href="/playById" class="block border-b border-white pb-2">PlayById</a></li>

      <li><a href="/editor?id=66505334ba9a237f5dd73370" class="block border-b border-white pb-2">Editor</a></li>
    </ul>
 
<hr>


  <div class="text-white  text-xs">
   16-Oct-2024   
  </div>
  <div class="text-white text-xs">
    From the point of view of PresentationPlayer there is no difference between PresentationObjUrl or PresentationObjBlob since when PresentationPlayer gets presentationObj its has already obtained its sound (either using PresentationObjUrl or PresentationObjBlob) the PresentationPlayer just has to play it with sound. How the sound file was obtained is not is problem.   
  </div>
  <div class="text-white text-xs">
   However we do need a seperate PresentationPlayerNS to use presentationObjNs and PlayerToolbarNs    
  </div>


</div><!--page ends-->
    