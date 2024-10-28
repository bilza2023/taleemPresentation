This is a draw method inside an object and below is the drawLib method it uses


draw(drawLib,currentTime){
    drawLib.line(
                    getVal(currentTime , this.itemData.extra.x1 ), 
                    getVal(currentTime , this.itemData.extra.y1),

                    getVal(currentTime , this.itemData.extra.x2 ), 
                    getVal(currentTime , this.itemData.extra.y2),                     
                    getVal(currentTime , this.itemData.extra.color),
                    
                    getVal(currentTime , this.itemData.extra.lineWidth),
                    
                    getVal(currentTime , this.itemData.extra.dash),
                    getVal(currentTime , this.itemData.extra.gap),
                    getVal(currentTime , this.itemData.extra.globalAlpha),
                    );
}

// drawLib method
line(x1, y1, x2, y2, color = 'black', lineWidth = 1, dash = 0, gap = 0,globalAlpha=1) {
    
    
    this.ctx.save(); // Save the current context state
    
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.globalAlpha = globalAlpha;

    if (dash === 0 && gap === 0) {
        this.ctx.setLineDash([]); // Set line dash pattern
    } else {
        this.ctx.setLineDash([dash, gap]); // Set line dash pattern
    }

    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    
    this.ctx.restore(); // Restore the context state
}

i want you to merge the drawLib method into the first draw method such that i do not need draw lib any more.

new draw signature is 
draw(ctx,currentTime)