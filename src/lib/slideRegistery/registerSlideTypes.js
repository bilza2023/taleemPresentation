
import SlideRegistry  from './SlideRegistry';
const registry = SlideRegistry.getInstance();

import CanvasPlayer from '../slides/canvas/canvasPlayer/CanvasPlayer.svelte';
import CanvasEditor from '../slides/canvas/canvasEditor/CanvasEditor.svelte';

import EquationPlayer from '../slides/eqs/EqPlayer/EqPlayer.svelte';
import EquationEditor from '../slides/eqs/EqsEditor/EqsEditor.svelte';


export default function registerSlideTypes(){
const CanvasSlideModule ={
    type: 'canvas',
    PlayerComponent: CanvasPlayer,
    EditorComponent: CanvasEditor
};
const EquationSlideModule ={
    type: 'Eqs',
    PlayerComponent: EquationPlayer,
    EditorComponent: EquationEditor
};


// Register all slide types
registry.registerSlideType(CanvasSlideModule);
registry.registerSlideType(EquationSlideModule);
}