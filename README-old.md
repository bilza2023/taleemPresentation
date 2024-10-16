
# **Taleem Presentation v0.2.0 (Target Candidate 1.0 Release)**

This library exports Svelte components used for displaying [Taleem](https://taleem.help) presentations. It is an educational library that converts [Taleem](https://taleem.help) presentation formats into videos.

## **Main Exports (12 in this version):**

1. **PresentationPlayer**  
   This is the main component exported by the library. It uses **PlayerToolbar** and **PresentationModeUi** internally and consumes `presentationObj`. The host is responsible for obtaining the data (`presentationObj`), while `PresentationPlayer` coordinates between `PlayerToolbar` and `PresentationModeUi`. It wraps up the process of running a presentation with sound.

2. **PresentationPlayerNs**  
   This is the second main player exported by the library, for presentations without sound. It uses `PresentationObjNs` and `PlayerToolbarNs`.

3. **PlayerToolbarNs**  
   Toolbar for `PresentationPlayerNs` (without sound components).

4. **Presentation**  
   An older module maintained for backward compatibility, but it will not be removed.

5. **PresentationModeEditor**  
   Not finished yet—exported for testing purposes only.

6. **PresentationModeUi**  
   This component is exported separately, but it is used inside `PresentationPlayer`. It takes one slide at a time and displays its content (display-side only, no edit-side components). It is a subset of the older **Presentation** module.

7. **PlayerToolbar**  
   The toolbar used in `PresentationPlayer`.

8. **getNewSlide**  
   A helper function to generate a new slide.

9. **getNewItem**  
   A helper function to generate a new item for a slide.

10. **PresentationObjUrl**  
    Extends `BasePresentation`. It takes `questionData`, `soundFilePath`, and `soundFileExt` (default: `'opus'`). The key difference between this and `PresentationObjBlob` is in the `loadSound` function, where a URL is fed directly to Howler.js.

11. **PresentationObjNS**  
    Does **not** extend `BasePresentation`. It takes only `questionData`. The key difference from `PresentationObjUrl` and `PresentationObjBlob` is that the `loadSound` function does nothing here. Since there's no sound, a **timer** is used to keep track of time, instead of `sound.seek()` as in `PresentationObjUrl` and `PresentationObjBlob`.

12. **PresentationObjBlob**  
    Extends `BasePresentation`. It takes `questionData` and `audioData`. The key difference from `PresentationObjUrl` is that in `loadSound`, it already has `audioData`, so it converts the object into a URL and feeds it to Howler.js.

---

**Note:**  
- `PresentationObjUrl` and `PresentationObjBlob` are both extensions of `BasePresentation`. The only difference is in the `loadSound` function, where one uses a URL and the other uses blob data. Once the sound is loaded and "start" is clicked, `BasePresentation` keeps track of time using the `sound.seek()` method of Howler.js.
- `PresentationObjNS` does **not** extend `BasePresentation`, but it provides the same API/interface. Since it only takes `questionData` and no sound data, it uses a timer to track presentation timings rather than `sound.seek()`.
- To clerify any confusion about the use of PresentationPlayer and PresentationPlayerNs. We use the first for presentations wiith sound and the second for presentation without the second.
- The host which is using PresentationPlayer and PresentationPlayerNs should use the appropriate presentationObj. PresentationObjUrl and PresentationObjBlob are for presentations with sound and thus are used with PresentationPlayer where as PresentationPlayerNs uses PresentationObjNS.
- In next step we may move the use of PresentationObjNS , PresentationObjUrl and PresentationObjBlob internal to PresentationPlayer and PresentationPlayerNs. A better solution is to export functions which do all these things (create appropriate presentationObj) for the host . No matter what the underlying process is the same
--- 

### Sound Group Modules:
 1 PresentationPlayer
 2 PresentationObjBlob
 3 PresentationObjUrl
 4 PlayerToolbar

### No Sound Group Modules:

 1 PresentationPlayerNs
 2 PresentationObjNs
 3 PlayerToolbarNs

### PresentationModeUi is used with both Groups

 --- 

This version is more polished and clearer in its structure.