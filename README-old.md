# Taleem Presentation v0.3.2
## NOT USABLE AT THE MOMENT ---
A Svelte-based library for running educational presentations. This library provides components and utilities for playing interactive, educational presentations with or without sound.

## Installation

```bash
npm i taleempresentation
```

## Required Dependencies

- **Svelte**: Core framework dependency
- **KaTeX CSS**: Required for math rendering
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
```

## Usage Patterns

There are three main ways to use the library:

1. **With Sound (URL Source)**
   ```javascript
   import { Player, PresentationObjUrl } from 'taleempresentation';
   ```
   Uses `Player` with `PresentationObjUrl` for presentations with sound loaded from URLs.

2. **With Sound (Blob Source)**
   ```javascript
   import { Player, PresentationObjBlob } from 'taleempresentation';
   ```
   Uses `Player` with `PresentationObjBlob` for presentations with sound loaded from blob data.

3. **Without Sound**
   ```javascript
   import { PlayerNs, PresentationObjNs } from 'taleempresentation';
   ```
   Uses `PlayerNs` with `PresentationObjNs` for presentations without sound.

## Core Components

### Player Components
- **Player**: Main component for presentations with sound
- **PlayerNs**: Main component for presentations without sound
- **PlayerToolbar**: Control interface with auto-hide functionality (hides after 5 seconds of inactivity)

### Presentation Objects
1. **PresentationObjUrl**
```javascript
const presentationObj = new PresentationObjUrl(questionData, 'https://example.com/sounds/', 'mp3');
await presentationObj.init();
```

2. **PresentationObjBlob**
```javascript
const presentationObj = new PresentationObjBlob(questionData, audioData);
await presentationObj.init();
```

3. **PresentationObjNs**
```javascript
const presentationObj = new PresentationObjNs(questionData);
await presentationObj.init();
```

## Supported Slide Types

The library supports several slide types internally:
- **TblStr**: Basic presentation slides
- **Eqs**: Slides with mathematical equations
- **Grid**: Grid-based layout slides
- **Canvas**: Canvas-based interactive slides

Note: Slide types are handled internally by the library - users typically interact with these through an interface rather than directly.

## Examples

For detailed examples of each usage pattern, visit:
- [Basic Usage Examples](link-to-examples) (placeholder)
- [Advanced Examples](link-to-advanced-examples) (placeholder)

## Technical Notes

- Toolbar automatically hides after 5 seconds of inactivity
- All presentation objects must be initialized with `init()` before use
- Background images and sprite sheets support is available (experimental)

## Version History

### v0.3.2
- Current stable release
- Improved documentation
- Enhanced component stability

## License

[License Information]