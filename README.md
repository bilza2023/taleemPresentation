# Taleem Presentation v0.3.6

A Svelte-based library for creating and running educational presentations (with or without sound support).

## Installation

```bash
npm i taleempresentation
```

## Components

### Player
Full-featured presentation player with optional audio support.

```svelte
<script>
import { Player } from "taleempresentation";
import { presentationData } from "./presentationData.js";

// For presentation with audio
<Player 
  presentationData={presentationData} 
  audioData="/music.opus"
  isBlob={false} 
/>

// For presentation without audio
<Player presentationData={presentationData} />
</script>
```

### Editor
Full-featured presentation editor with live preview.

```svelte
<script>
import { Editor } from "taleempresentation";
import { presentationData } from "./presentationData.js";
import { audioData } from "./audioData.js";

<Editor
  slides={presentationData}
  audioData={audioData}
  showToolbar={true}
/>
</script>
```

## Utility Functions
- `getNewSlide()`: Create a new slide
- `getNewItem()`: Create a new item for a slide

## Status
🚧 **UNDER DEVELOPMENT**
- Code is evolving rapidly
- Not recommended for production use
- Targeting stability in version 1.0

## Requirements
- Svelte
- Tailwind CSS

## License
MIT © Bilal Tariq