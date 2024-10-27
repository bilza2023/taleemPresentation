import  getNewSlide  from '../getNewSlide/getNewSlide';

export const slideOperations = {


  addSlide(slides, slideType) {
    const startTime = slides.length ? slides[slides.length - 1].endTime : 0;
    const newSlide = {
      ...getNewSlide(slideType),
      startTime,
      endTime: startTime + 10
    };
    
    return [...slides, newSlide];
  },

  moveSlide(slides, index, direction) {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= slides.length) return slides;

    const newSlides = [...slides];
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    [newSlides[index].startTime, newSlides[newIndex].startTime] = 
      [newSlides[newIndex].startTime, newSlides[index].startTime];
    [newSlides[index].endTime, newSlides[newIndex].endTime] = 
      [newSlides[newIndex].endTime, newSlides[index].endTime];

    return newSlides;
  },

  deleteSlide(slides, currentIndex) {
    if (slides.length <= 1) {
      return [];
    }
    return slides.filter((_, i) => i !== currentIndex);
  },

  createTemplate(slide) {
    return {
      ...slide,
      startTime: 0,
      endTime: 10
    };
  }
};