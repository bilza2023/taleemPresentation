import CanvasComponentRegistry from "../componentRegistry";
import RectangleObject from './RectangleObject';
import ImageObject from './ImageObject';
import LineObject from './LineObject';
import CircleObject from './CircleObject';
import RayObject from './RayObject';
import EllipseObject from './EllipseObject';
import TextObject from './TextObject';
import TriangleObject from './TriangleObject';
import ParaObject from './ParaObject';
import AngleObject from './AngleObject';
import SpriteObject from './SpriteObject';
import DotObject from './DotObject';
import RDotObject from './RDotObject';
import RTextObject from './RTextObject';
import IconObject from './IconObject';
import Image2Object from './Image2Object';
import PieChartObject from './PieChartObject';
import LinesObject from './LinesObject';


// Usage example - replace your itemToObject function with this:
export default function itemToObject(item, fnList = {}, spriteImgArray = []) {
    const registry = getComponentRegistry();
    const command = item.extra.command;
    const extraData = command === 'sprite' ? spriteImgArray : null;
    return registry.create(command, item, fnList, extraData);
}

// Example of how to register components:
function registerComponents(registry) {
    registry.register('piechart', PieChartObject);
    registry.register('repeatText', RTextObject);
    registry.register('repeatDot', RDotObject);
    registry.register('icon', IconObject);
    registry.register('dot', DotObject);
    registry.register('angleSymbol', AngleObject);
    registry.register('sprite', SpriteObject);
    registry.register('para', ParaObject);
    registry.register('triangle', TriangleObject);
    registry.register('text', TextObject);
    registry.register('ellipse', EllipseObject);
    registry.register('ray', RayObject);
    registry.register('line', LineObject);
    registry.register('lines', LinesObject);
    registry.register('rect', RectangleObject);
    registry.register('image', ImageObject);
    registry.register('image2', Image2Object);
    registry.register('circle', CircleObject);
}

// Singleton implementation for the registry
let registryInstance = null;

function getComponentRegistry() {
    if (!registryInstance) {
        registryInstance = new CanvasComponentRegistry();
        registerComponents(registryInstance);
    }
    return registryInstance;
}