//@ts-nocheck
import ComponentObject from './ComponentObject';
import DraggerHandle from '../handleObject/DraggerHandle';
import AdderHandle from '../handleObject/AdderHandle';
import ButtonHandle from '../handleObject/ButtonHandle';
import getVal from "../../getVal";

export default class RectangleObject extends ComponentObject {
    constructor(itemData , fnList) {
        super(itemData , fnList);
////////////////////////////////////////////////////////////
        this.dialogueBox = [
    {
      componentName: 'TrPropNumber',
      title: 'x',
      props: {}
    },
    {
      componentName: 'TrPropNumber',
      title: 'y',
      props: {}
    },
    {
      componentName: 'TrPropNumber',
      title: 'width',
      props: {
        min: '1',
        max: '500'
      }
    },
    {
      componentName: 'TrPropNumber',
      title: 'height',
      props: {
        min: '1',
        max: '500'
      }
    },
    {
      componentName: 'TrPropNumber',
      title: 'lineWidth',
      props: {}
    },
    {
      componentName: 'TrPropBoolean',
      title: 'filled',
      props: {}
    },
    //CommonCommands
    {
      componentName: 'TrText',
      title: 'name',
      props: {}
    },
    {
      componentName: 'TrPropColor',
      title: 'color',
      props: {}
    },
    {
      componentName: 'TrNo',
      title: 'showAt',
      props: {}
    },
    {
      componentName: 'TrPropNumber',
      title: 'globalAlpha',
      props: {
        min: '0.0',
        max: '1.0',
        step: '0.1'
      }
    },
    //gap-dash
    {
      componentName: 'TrPropNumber',
      title: 'dash',
      props: {}
    },
    {
      componentName: 'TrPropNumber',
      title: 'gap',
      props: {}
    },
  //shadow
    {
      componentName: 'TrNo',
      title: 'shadowOffsetX',
      props: {}
    },
    {
      componentName: 'TrNo',
      title: 'shadowOffsetY',
      props: {}
    },
    {
      componentName: 'TrNo',
      title: 'shadowBlur',
      props: {}
    },
    {
      componentName: 'TrColor',
      title: 'shadowColor',
      props: {}
    },

  ];
////////////////////////////////////////////////////////////
    }

loadHandles(){
////////////////////////////////////////////////////////////////////////
let btnHandle = new ButtonHandle(this.itemData,this.fnList); 

            btnHandle.getX = function(){
                return this.itemData.extra.x.initialValue - 20;
            }
            btnHandle.getY = function(){
                return this.itemData.extra.y.initialValue + 25;
            }
            btnHandle.useInitialValue = true;

            this.handleObjects.push(btnHandle);        
////////////////////////////////////////////////////////////////////////        
        let widthAdder = new AdderHandle(this.itemData,'width'); 
        widthAdder.color = 'silver';
            widthAdder.getX = function(){
                return this.itemData.extra.x.initialValue + this.itemData.extra.width.initialValue ;
            }
            widthAdder.getY = function(){
                return this.itemData.extra.y.initialValue;
            }
            widthAdder.useInitialValue = true;

            this.handleObjects.push(widthAdder);
////////////////////////////////////////////////////////////////////////////

            let heightAdder = new AdderHandle(this.itemData,'height'); 
            heightAdder.color = 'silver';
            heightAdder.getX = function(){
                return this.itemData.extra.x.initialValue +  this.itemData.extra.width.initialValue ;
            }
            heightAdder.getY = function(){
                return this.itemData.extra.y.initialValue  + this.itemData.extra.height.initialValue -20;
            }
            heightAdder.useInitialValue = true;
            heightAdder.lookingforX = false;

            this.handleObjects.push(heightAdder);
/////////////////////////////////////////////////////////////////////////////    
            //    debugger;
            let draggerHandle = new DraggerHandle(this.itemData);
            draggerHandle.color = 'silver'; 
//--every Component-object can have different x and y e.g x1 x0 etc 
            draggerHandle.getX = function(){
                return this.itemData.extra.x.initialValue -20;
            }

            draggerHandle.getY = function(){
                return  this.itemData.extra.y.initialValue;
            }
            this.handleObjects.push(draggerHandle);    
    }
////////////////////////////////////////////////////
draw(ctx, currentTime) {
  // Save the current context state
  ctx.save();

  // Extract values
  const x = getVal(currentTime, this.itemData.extra.x);
  const y = getVal(currentTime, this.itemData.extra.y);
  const width = getVal(currentTime, this.itemData.extra.width);
  const height = getVal(currentTime, this.itemData.extra.height);
  const color = getVal(currentTime, this.itemData.extra.color) || 'white';
  const filled = getVal(currentTime, this.itemData.extra.filled) || true;
  const dash = getVal(currentTime, this.itemData.extra.dash) || 0;
  const gap = getVal(currentTime, this.itemData.extra.gap) || 0;
  const lineWidth = getVal(currentTime, this.itemData.extra.lineWidth) || 1;
  const globalAlpha = getVal(currentTime, this.itemData.extra.globalAlpha) || 1;

  // Set properties
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = globalAlpha;

  // Set line dash pattern
  if (dash === 0 && gap === 0) {
      ctx.setLineDash([]);
  } else {
      ctx.setLineDash([dash, gap]);
  }

  if (filled) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
  } else {
      ctx.strokeStyle = color;
      ctx.strokeRect(x, y, width, height);
  }

  // Restore the context state
  ctx.restore();
}

width(){
    return this.itemData.extra.width.initialValue;
 }
 height(){
    return this.itemData.extra.height.initialValue;
 }
 getX(){
    return this.itemData.extra.x.initialValue;
 }
 
 getY(){
    return this.itemData.extra.y.initialValue;
 }

 getLeft() {
    return Math.min(this.getX(), this.getX() + this.width());
}

getRight() {
    return Math.max(this.getX(), this.getX() + this.width());
}

getTop() {
    return Math.min(this.getY(), this.getY() + this.height());
}

getBottom() {
    return Math.max(this.getY(), this.getY() + this.height());
}

isHit(mouseX, mouseY) {
    return (
        mouseX >= this.getLeft() &&
        mouseX <= this.getRight() &&
        mouseY >= this.getTop() &&
        mouseY <= this.getBottom()
    );
}
    
}//class
