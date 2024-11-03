import loadAssets from "./assets/loadAssets";
// import getNewSlide from "../index";

// presentation.js
export default class PresentationObj {
    constructor(slidesData = []) {
      this.slides = slidesData;
      this.currentSlideIndex = 0;
      this.assets = null;
    }
  
    async init() {
      this.assets = await loadAssets();
      return this;
    }
  
    // Slide Management
    getCurrentSlide() {
      return this.slides[this.currentSlideIndex];
    }
  
    setCurrentSlideIndex(index) {
      if (index >= 0 && index < this.slides.length) {
        this.currentSlideIndex = index;
        return true;
      }
      return false;
    }
  
    // eslint-disable-next-line no-unused-vars
    addSlide(slideType) {
    //   const startTime = this.slides.length ? this.slides[this.slides.length - 1].endTime : 0;
    //   const newSlide = {
    //     ...getNewSlide(slideType),
    //     startTime,
    //     endTime: startTime + 10
    //   };
      
    //   this.slides.push(newSlide);
    //   return this.slides.length - 1; // Returns new slide index
    }
  
    moveSlide(index, direction) {
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= this.slides.length) return false;
  
      // Swap slides
      [this.slides[index], this.slides[newIndex]] = [this.slides[newIndex], this.slides[index]];
      
      // Adjust timings
      this.recalculateTimings();
      return newIndex;
    }
  
    deleteSlide(index) {
      if (this.slides.length <= 1) {
        this.slides = [];
        this.currentSlideIndex = 0;
        return true;
      }
  
      this.slides.splice(index, 1);
      this.recalculateTimings();
      
      if (this.currentSlideIndex >= this.slides.length) {
        this.currentSlideIndex = this.slides.length - 1;
      }
      return true;
    }
  
    cloneSlide(index) {
      const slideToClone = this.slides[index];
      if (!slideToClone) return false;
  
      const clonedSlide = JSON.parse(JSON.stringify(slideToClone));
      const startTime = this.slides[this.slides.length - 1].endTime;
      clonedSlide.startTime = startTime;
      clonedSlide.endTime = startTime + (slideToClone.endTime - slideToClone.startTime);
  
      this.slides.push(clonedSlide);
      return this.slides.length - 1;
    }
  
    // Timing Management
    recalculateTimings() {
      this.slides.forEach((slide, index) => {
        if (index === 0) {
          slide.startTime = 0;
        } else {
          slide.startTime = this.slides[index - 1].endTime;
        }
        slide.endTime = slide.startTime + (slide.endTime - slide.startTime);
      });
    }
  
    updateSlideEndTime(index, newEndTime) {
      if (index < 0 || index >= this.slides.length) return false;
      
      const slide = this.slides[index];
      const duration = newEndTime - slide.startTime;
      
      if (duration <= 0) return false;
      
      slide.endTime = newEndTime;
      
      // Adjust subsequent slides
      for (let i = index + 1; i < this.slides.length; i++) {
        this.slides[i].startTime = this.slides[i - 1].endTime;
        this.slides[i].endTime = this.slides[i].startTime + 
          (this.slides[i].endTime - this.slides[i].startTime);
      }
      
      return true;
    }
  
    // Clipboard Operations
    copySlide(index) {
      const slideToCopy = this.slides[index];
      if (!slideToCopy) return false;
      
      localStorage.setItem('copiedSlide', JSON.stringify(slideToCopy));
      return true;
    }
  
    pasteSlide() {
      const savedSlide = localStorage.getItem('copiedSlide');
      if (!savedSlide) return false;
  
      const clipboardSlide = JSON.parse(savedSlide);
      const startTime = this.slides.length ? this.slides[this.slides.length - 1].endTime : 0;
      
      const pastedSlide = {
        ...clipboardSlide,
        startTime,
        endTime: startTime + (clipboardSlide.endTime - clipboardSlide.startTime)
      };
      
      this.slides.push(pastedSlide);
      return this.slides.length - 1;
    }
  
    // Asset Management
    getAssets() {
      return this.assets;
    }
  }
  
  