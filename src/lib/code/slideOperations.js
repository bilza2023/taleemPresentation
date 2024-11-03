// slideOperations.js
import getNewSlide from '../getNewSlide/getNewSlide';

export const createSlideOperations = (initialSlides = []) => {
  let slides = [...initialSlides];

  const getSlides = () => slides;

  const setCurrentSlideIndex = (index) => {
    return index;
  };

  const addNew = (slideType) => {
    const startTime = slides.length ? slides[slides.length - 1].endTime : 0;
    const newSlide = {
      ...getNewSlide(slideType),
      startTime,
      endTime: startTime + 10
    };
    
    slides = [...slides, newSlide];
    return {
      slides,
      newIndex: slides.length - 1
    };
  };

  const moveSlide = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= slides.length) return { slides, newIndex: index };

    const newSlides = [...slides];
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    [newSlides[index].startTime, newSlides[newIndex].startTime] = 
      [newSlides[newIndex].startTime, newSlides[index].startTime];
    [newSlides[index].endTime, newSlides[newIndex].endTime] = 
      [newSlides[newIndex].endTime, newSlides[index].endTime];

    slides = newSlides;
    return {
      slides,
      newIndex: direction === 'up' ? index - 1 : index + 1
    };
  };

  const deleteSlide = (currentIndex) => {
    if (slides.length <= 1) {
      slides = [];
      return {
        slides,
        newIndex: 0
      };
    }
    slides = slides.filter((_, i) => i !== currentIndex);
    return {
      slides,
      newIndex: Math.min(currentIndex, slides.length - 1)
    };
  };

  const copySlide = (currentSlide) => {
    if (currentSlide) {
      localStorage.setItem('copiedSlide', JSON.stringify(currentSlide));
    }
  };

  const pasteSlide = () => {
    const savedSlide = localStorage.getItem('copiedSlide');
    if (savedSlide) {
      const clipboardSlide = JSON.parse(savedSlide);
      const startTime = slides.length ? slides[slides.length - 1].endTime : 0;
      const pastedSlide = {
        ...clipboardSlide,
        startTime,
        endTime: startTime + 10
      };
      slides = [...slides, pastedSlide];
      return {
        slides,
        newIndex: slides.length - 1
      };
    }
    return { slides, newIndex: slides.length - 1 };
  };

  const cloneSlide = (currentSlide) => {
    if (currentSlide) {
      const clonedSlide = JSON.parse(JSON.stringify(currentSlide));
      slides = [...slides, clonedSlide];
      return {
        slides,
        newIndex: slides.length - 1
      };
    }
    return { slides, newIndex: slides.length - 1 };
  };

  const newPresentation = (NewPresentation) => {
    slides = [NewPresentation];
    return {
      slides,
      newIndex: 0
    };
  };

  return {
    getSlides,
    setCurrentSlideIndex,
    addNew,
    moveSlide,
    deleteSlide,
    copySlide,
    pasteSlide,
    cloneSlide,
    newPresentation
  };
};