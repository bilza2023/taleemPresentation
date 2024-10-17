# Taleem Presentation v 0.3.0 (Target Candidate 1.0 Release)

This library exports Svelte components used for displaying [Taleem](https://taleem.help) presentations. It is an educational library that converts Taleem presentation formats into interactive video-like experiences.

## Dependencies

- **Required CSS**: Include KaTeX CSS for math rendering:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
```

## Main Exports

The library exports 12 main components and functions:

### Core Components

1. **Player**
   - Main component for presentations with sound
   - Uses `PlayerToolbar` and `PresentationModeUi` internally
   - Uses `PresentationObjUrl` and `PresentationObjBlob`
   - Features fade transitions for toolbar
   - Auto-hides toolbar after 5 seconds of inactivity

2. **PlayerNs**
   - Main component for presentations without sound
   - Uses `PresentationObjNs` and `PlayerToolbarNs` and `PresentationModeUi` internally
   - Features scale transitions for toolbar
   - Auto-hides toolbar after 5 seconds of inactivity

3. **PresentationModeUi** or **Ui** 
   - Displays content for a single slide
   - Used inside both `Player` and `PlayerNs`

## Component Props Documentation

### Player
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| presentationObj | Object | Yes | The presentation object containing all presentation data and methods |

```svelte
<Player {presentationObj} />
```

### PlayerNs
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| presentationObj | Object | Yes | The presentation object containing all presentation data and methods |

```svelte
<PlayerNs {presentationObj} />
```

### PresentationModeUi
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| presentationObj | Object | Yes | The presentation object containing slide data |
| pulse | Number | Yes | Current time in the presentation |
| currentTime | Number | Yes | Same as pulse, used for synchronization |
| pause | Function | No | Function to pause the presentation |
| setPulse | Function | No | Optional function to update the pulse/currentTime |

```svelte
<PresentationModeUi 
  {presentationObj}
  {pulse}
  currentTime={pulse}
  {pause}
  {setPulse}
/>
```

### PlayerToolbar
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| presentationObj | Object | Yes | The presentation object |
| pulse | Number | Yes | Current presentation time |
| preStart | Function | No | Pre-start callback |
| preStop | Function | No | Pre-stop callback |
| prePause | Function | No | Pre-pause callback |
| setPulse | Function | No | Pulse update callback |
| theme | 'light'\|'dark' | No | UI theme (default: 'light') |
| opacity | Number | No | Toolbar opacity (default: 0.8) |

```svelte
<PlayerToolbar 
  {presentationObj}
  {pulse}
  preStart={start}
  preStop={stop}
  prePause={pause}
  setPulse={setPulse}
  theme="dark"
  opacity={0.7}
/>
```

### PlayerToolbarNs
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| presentationObj | Object | Yes | The presentation object |
| pulse | Number | Yes | Current presentation time |
| preStart | Function | No | Pre-start callback |
| preStop | Function | No | Pre-stop callback |
| prePause | Function | No | Pre-pause callback |
| setPulse | Function | No | Pulse update callback |

## Technical Implementation Details

### Timing and State Management
- Toolbar auto-hide timeout: 5 seconds after last mouse movement
- Gameloop interval: 500ms for pulse updates
- Uses requestAnimationFrame for smooth animations

### Transitions
- Player: Uses fade transitions (300ms duration)
- PlayerNs: Uses scale transitions (300ms duration)

### Error Handling Recommendations
1. Always wrap presentationObj method calls in try-catch blocks
2. Implement null checks for presentationObj and its slides array
3. Add loading states for async operations
4. Validate pulse/currentTime values before updates

Example error handling:
```javascript
function setPulse(value) {
  try {
    if (!presentationObj || !presentationObj.slides) {
      throw new Error('Invalid presentation object');
    }
    presentationObj.setPulse(value);
    pulse = Math.floor(presentationObj.pulse());
  } catch (error) {
    console.error('Error setting pulse:', error);
    // Handle error appropriately
  }
}
```

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

Note: `PresentationModeUi` is used with both groups.

## Presentation Objects

### PresentationObjBlob
For presentations with sound using blob data:

```javascript
const presentationObj = new PresentationObjBlob(questionData, audioData);
await presentationObj.init();
```

### PresentationObjNs
For presentations without sound:

```javascript
const presentationObj = new PresentationObjNs(questionData);
await presentationObj.init();
```

### PresentationObjUrl
For presentations with sound using a URL:

```javascript
const presentationObj = new PresentationObjUrl(questionData, 'https://example.com/sounds/', 'mp3');
await presentationObj.init();
```

## Important Notes

- All presentation objects must be initialized with `init()` before use
- The host application is responsible for obtaining the `presentationObj` data
- Use `Player` with `PresentationObjUrl` or `PresentationObjBlob` for presentations with sound
- Use `PlayerNs` with `PresentationObjNs` for presentations without sound
- Ensure KaTeX CSS is included for math rendering
- Component state updates happen every 500ms by default
- Toolbar automatically hides after 5 seconds of mouse inactivity

## Legacy/Testing Components

11. **Presentation**
    - Older module maintained for backward compatibility

12. **PresentationModeEditor** or Editor
    - Unfinished component, exported for testing purposes only

## Version Notes

This version (v0.2.0) includes improved documentation, better error handling recommendations, and clearer technical specifications compared to previous versions.