import PresentationObj from "./PresentationObj";




export default async function getPresentationObj(slidesData=[]){

    const presentationObj = new PresentationObj(slidesData);
    await presentationObj.init();
    return presentationObj;
}