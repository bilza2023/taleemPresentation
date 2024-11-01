import loadBgImages from "./loadBgImages";
import loadSprites from "./loadSprites";


export default async function loadAssets(){
    try{
 const bgImages = await  loadBgImages();
 const spriteImgArray = await loadSprites();

    return {bgImages, spriteImgArray}
    } catch(error){
        console.error('Error loading assets:', error);
        throw error;
    }
}