
import loadBgImages from "./loadBgImages";
import loadSprites from "./loadSprites";
import Icons from "./Icons";

export default async function loadAssets(){
    try{
 const bgImages = await  loadBgImages();
 const spriteImges = await loadSprites();
 
    return {bgImages, spriteImges , Icons}
    } catch(error){
        console.error('Error loading assets:', error);
        throw error;
    }
}