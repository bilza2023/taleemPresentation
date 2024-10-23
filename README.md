# Taleem Presentation v0.3.3

A Svelte-based library for running educational presentations. This library provides components and utilities for playing interactive, educational presentations with or without sound.

## Current Limitations
1. THIS IS WORK IN PROGRESS AND JUST PARTIALLY FUNCTIONING.
2. You can run the example files since the "Player" and "PlayerNs" (Player No Sound) are both working but you cannot create your own Presentations since the "Editor" is not ready yet.

## Installation

```bash
npm i taleempresentation
```

## Required Dependencies

- **Svelte**: Core framework dependency
- **Tailwind CSS**: Required for component styling
- **KaTeX CSS**: Required for internal math rendering
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
```

This library uses KaTeX internally for math rendering, but users only need to install Svelte and Tailwind CSS. The KaTeX CSS is included automatically.

## Core Components

The library provides two main presentation players:

### Player
- Main component for presentations with sound support
- Supports two types of audio sources through `PresentationObjUrl` or `PresentationObjBlob`
- Includes an auto-hiding toolbar (hides after 5 seconds of inactivity)

### PlayerNs
- Main component for presentations without sound
- Uses `PresentationObjNs` for presentation management
- Includes an auto-hiding toolbar (hides after 5 seconds of inactivity)
- Perfect for silent presentations or when audio is not needed

## Presentation Object Types

Before using either player, you need to initialize a presentation object. There are three types available:

### 1. PresentationObjUrl
Use this when your audio files are hosted at a URL.

```javascript
const presentationObj = new PresentationObjUrl(
  questionData,        // Your presentation data structure
  'https://example.com/sounds/', // Base URL for audio files
  'mp3'               // Audio file extension
);
await presentationObj.init(); // Must initialize before use
```

### 2. PresentationObjBlob
Use this when you have audio data as blobs (e.g., from file uploads).

```javascript
const presentationObj = new PresentationObjBlob(
  questionData,  // Your presentation data structure
  audioData     // Blob or array of audio data
);
await presentationObj.init(); // Must initialize before use
```

### 3. PresentationObjNs
Use this for presentations without sound.

```javascript
const presentationObj = new PresentationObjNs(
  questionData  // Your presentation data structure
);
await presentationObj.init(); // Must initialize before use
```

## Usage Patterns

### Using Player (With Sound)

```svelte
<script>
  import { Player, PresentationObjUrl } from 'taleempresentation';
  
  let presentationObj;
  
  // Initialize with URL-based audio
  const questionData = {
    // Your presentation data structure
  };
  
  async function initPresentation() {
    presentationObj = new PresentationObjUrl(questionData, 'https://example.com/sounds/', 'mp3');
    await presentationObj.init();
  }
</script>

{#if presentationObj}
  <Player {presentationObj} />
{/if}
```

### Using PlayerNs (Without Sound)

```svelte
<script>
  import { PlayerNs, PresentationObjNs } from 'taleempresentation';
  
  let presentationObj;
  
  // Initialize without sound
  const questionData = {
    // Your presentation data structure
  };
  
  async function initPresentation() {
    presentationObj = new PresentationObjNs(questionData);
    await presentationObj.init();
  }
</script>

{#if presentationObj}
  <PlayerNs {presentationObj} />
{/if}
```

## Features

### Supported Slide Types

The library supports several slide types internally:
- **TblStr**: Basic presentation slides
- **Eqs**: Slides with mathematical equations
- **Grid**: Grid-based layout slides
- **Canvas**: Canvas-based interactive slides

Note: Slide types are handled internally by the library - users typically interact with these through an interface rather than directly.

Both Player and PlayerNs components include:

1. **Auto-hiding Toolbar**
   - Shows on mouse movement
   - Automatically hides after 5 seconds of inactivity
   - Provides presentation controls

2. **Responsive Design**
   - Built with Tailwind CSS
   - Adapts to container size
   - Dark theme by default

3. **Presentation Controls**
   - Play/Pause functionality
   - Timeline navigation
   - Stop control

## Technical Notes

- All presentation objects must be initialized with `init()` before use
- Components use Tailwind CSS classes for styling
- Players automatically manage internal state and timing
- Both players support the same presentation data structure
- Each presentation object type (`PresentationObjUrl`, `PresentationObjBlob`, `PresentationObjNs`) has specific initialization requirements as shown in the examples above

## Styling

The components use Tailwind CSS for styling. The default theme is dark, with these base classes:
```html
<div class="bg-gray-800 text-white">
  <!-- Player content -->
</div>
```

You can wrap the Player components in your own container to customize the styling while maintaining the built-in functionality.

## Version History

### v0.3.3
- Current stable release
- Improved Player and PlayerNs components
- Enhanced toolbar functionality