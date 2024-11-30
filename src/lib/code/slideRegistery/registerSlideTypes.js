
import SlideRegistry  from './SlideRegistry';
const registry = SlideRegistry.getInstance();

import {CanvasPlayer,CanvasEditor , EqsEditor , EqPlayer} from "taleempresentation-canvas-slide";


export default function registerSlideTypes(){
const CanvasSlideModule ={
    type: 'canvas',
    PlayerComponent: CanvasPlayer,
    EditorComponent: CanvasEditor
};
const EquationSlideModule ={
    type: 'Eqs',
    PlayerComponent: EqPlayer,
    EditorComponent: EqsEditor
};


// Register all slide types
registry.registerSlideType(CanvasSlideModule);
registry.registerSlideType(EquationSlideModule);
}