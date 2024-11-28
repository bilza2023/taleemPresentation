



export  async function upgrade(slides){

    // console.log("before",slides);
    for (let i = 0; i < slides.length; i++) {
        
        let slide = slides[i];
        
        if(slide.type === 'Eqs'){
            slide = await upgradeEqs(slide);
        }     
        if(slide.type === 'canvas'){
            slide = await upgradeCanvas(slide);
        }
    }

    // console.log("upgrade",slides);
    return slides;
}

function simplifyJSON(data, dontChangeList = ['sp']) {
    // Handle non-object types directly
    if (typeof data !== 'object' || data === null) {
        return data;
    }

    // Create a new object to store simplified results
    const simplified = {};

    // Iterate through all keys in the original object
    for (const [key, value] of Object.entries(data)) {
        // If the key is in the exclude list, directly copy the value
        if (dontChangeList.includes(key)) {
            simplified[key] = value;
        } else if (key === 'setCommands') {
            continue;
        } else if (typeof value === 'object' && value !== null && 'initialValue' in value) {
            simplified[key] = value.initialValue;
        } else if (typeof value === 'object' && value !== null) {
            simplified[key] = simplifyJSON(value, dontChangeList);
        } else {
            simplified[key] = value;
        }
    }

    return simplified;
}

async  function upgradeEqs(slide){
        
            for (let j = 0; j < slide.items.length; j++) {
                const item = slide.items[j];
                if(item.extra){
                    item.itemExtra = item.extra;      
                    item.itemExtra = simplifyJSON(item.itemExtra,['sp']);
                    item.extra=null;      
                }

            }
 return slide;   
}
async function upgradeCanvas(slide){
    if(slide.extra){
        //in last code slideExtra is an array now it is an object.
        slide.slideExtra = null; 
        slide.slideExtra = slide.extra;
        
            for (let j = 0; j < slide.items.length; j++) {
                const item = slide.items[j];
                if(item.extra){
                    item.itemExtra = item.extra;      
                    item.itemExtra = simplifyJSON(item.itemExtra);
                    item.extra=null;      
                }
            }
    }//slide loop
 return slide;   
}

