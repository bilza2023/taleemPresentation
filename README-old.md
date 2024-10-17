
# Taleem Presentation v0.2.0 (Target Candidate 1.0 Release)

This library exports Svelte components used for displaying [Taleem](https://taleem.help) presentations. It is an educational library that converts Taleem presentation formats into interactive video-like experiences.

## Main Exports

The library exports 12 main components and functions:

### Core Components

1. **Player**
   - Main component for presentations with sound
   - Uses `PlayerToolbar` and `PresentationModeUi \ Ui` internally
   - Consumes `presentationObj` (with sound)

2. **PlayerNs**
   - Main component for presentations without sound
   - Uses `PresentationObjNs` and `PlayerToolbarNs` and `PresentationModeUi \ Ui` internally

3. **PresentationModeUi** or **Ui** 
   - Displays content for a single slide
   - Used inside `Player` and `PlayerNs`

### Toolbars

4. **PlayerToolbar**
   - Toolbar for `Player` (with sound)

5. **PlayerToolbarNs**
   - Toolbar for `PlayerNs` (without sound)

### Presentation Objects

6. **PresentationObjUrl**
   - For presentations with sound using a URL
   - Extends `BasePresentation`
   - Takes `questionData`, `soundFilePath`, and `soundFileExt`

7. **PresentationObjBlob**
   - For presentations with sound using blob data
   - Extends `BasePresentation`
   - Takes `questionData` and `audioData`

8. **PresentationObjNs**
   - For presentations without sound
   - Does not extend `BasePresentation`
   - Takes only `questionData`

### Helper Functions

9. **getNewSlide**
   - Generates a new slide

10. **getNewItem**
    - Generates a new item for a slide

### Legacy/Testing Components

11. **Presentation**
    - Older module maintained for backward compatibility

12. **PresentationModeEditor** or Editor
    - Unfinished component, exported for testing purposes only

## Usage Groups

### Sound Group Modules:
- Player
- PlayerToolbar
- PresentationObjBlob
- PresentationObjUrl

### No Sound Group Modules:
- PlayerNs
- PresentationObjNs
- PlayerToolbarNs

Note: `PresentationModeUi / UI`  is used with both groups.

## Important Notes

- The host application is responsible for obtaining the `presentationObj` data.
- Use `Player` with `PresentationObjUrl` or `PresentationObjBlob` for presentations with sound.
- Use `PlayerNs` with `PresentationObjNs` for presentations without sound.
- In future versions, we may internalize the creation of appropriate `presentationObj` within the players.


## Usage Guide for Main Components

### PresentationModeUi

This component is responsible for rendering the content of a single slide.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| presentationObj | Object | Yes | The presentation object containing slide data |
| pulse | Number | Yes | Current time in the presentation |
| currentTime | Number | Yes | Same as pulse, used for synchronization |
| setPulse | Function | No | Optional function to update the pulse/currentTime |

Example usage:
```svelte
<PresentationModeUi 
  {presentationObj}
  pulse={currentTime}
  currentTime={currentTime}
  setPulse={optionalSetPulseFunction}
/>
```

### Player

This component is the main player for presentations with sound.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| presentationObj | Object | Yes | The presentation object containing all presentation data and methods |

Example usage:
```svelte
<Player {presentationObj} />
```

Note: Player internally manages the pulse/currentTime and toolbar visibility. It uses PlayerToolbar and PresentationModeUi components.

### PlayerNs

This component is the main player for presentations without sound.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| presentationObj | Object | Yes | The presentation object containing all presentation data and methods |

Example usage:
```svelte
<PlayerNs {presentationObj} />
```

Note: PlayerNs is very similar to Player but uses PlayerToolbarNs instead of PlayerToolbar.

### Additional Notes

- Both Player and PlayerNs handle the showing/hiding of the toolbar on mouse movement.
- They both manage the pulse/currentTime internally and pass it to the PresentationModeUi component.
- The presentationObj should be created using the appropriate PresentationObj* constructor (PresentationObjUrl, PresentationObjBlob, or PresentationObjNs) depending on whether the presentation has sound and how the sound data is provided.

When using these components, ensure that you have the necessary CSS (including KaTeX CSS for math rendering) and that you're providing the correct presentationObj type for each player.

## Usage Guide for Presentation Objects

### PresentationObjBlob

This class is used for presentations with sound, where the audio data is provided as a blob.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| questionData | Object | Yes | Object containing presentation data including slides |
| audioData | String | Yes | Base64 encoded audio data |

Example usage:
```javascript
const presentationObj = new PresentationObjBlob(questionData, audioData);
await presentationObj.init();
```

### PresentationObjNs

This class is used for presentations without sound.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| questionData | Object | Yes | Object containing presentation data including slides |

Example usage:
```javascript
const presentationObj = new PresentationObjNs(questionData);
await presentationObj.init();
```

### PresentationObjUrl

This class is used for presentations with sound, where the audio is loaded from a URL.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| questionData | Object | Yes | Object containing presentation data including slides |
| soundFilePath | String | No | Custom path to the sound file (optional) |
| soundFileExt | String | No | File extension for the sound file (default: 'opus') |

Example usage:
```javascript
const presentationObj = new PresentationObjUrl(questionData);
// or with custom sound file path
const presentationObj = new PresentationObjUrl(questionData, 'https://example.com/sounds/', 'mp3');
await presentationObj.init();
```

### Additional Notes

- All these classes need to be initialized with the `init()` method after creation.
- PresentationObjBlob and PresentationObjUrl extend BasePresentation and use the Howler.js library for sound management.
- PresentationObjNs implements its own timing mechanism using `requestAnimationFrame`.
- The `questionData` object should contain all necessary information about the presentation, including slides and their timings.
- For PresentationObjUrl, if no custom `soundFilePath` is provided, it defaults to a predefined URL structure.

When using these objects, ensure you're using the appropriate one based on your sound requirements and data format. These objects are typically used in conjunction with the Player or PlayerNs components.
## Version Notes

This version (v0.2.0) is more polished and clearer in its structure compared to previous versions.