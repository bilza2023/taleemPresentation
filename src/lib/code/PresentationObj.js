import loadAssets from "./assets/loadAssets";


export default class PresentationObj {
    constructor(slidesData = []) {
        this.assets = {};
        this.slides = slidesData;
        this.currentSlideIndex = 0;
    }

    async init() {
        this.assets = await loadAssets();
    }

    setCurrentSlideIndex(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentSlideIndex = index;
            return true;
        }
        return false;
    }

    moveSlide(index, direction) {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= this.slides.length) return false;

        // Swap slides
        [this.slides[index], this.slides[newIndex]] = [this.slides[newIndex], this.slides[index]];
        
        // Swap timing information
        [this.slides[index].startTime, this.slides[newIndex].startTime] = 
            [this.slides[newIndex].startTime, this.slides[index].startTime];
        [this.slides[index].endTime, this.slides[newIndex].endTime] = 
            [this.slides[newIndex].endTime, this.slides[index].endTime];

        // Update current slide index
        this.currentSlideIndex = newIndex;
        return true;
    }
// uses getCurrentSlide
    deleteSlide() {
        if (this.slides.length <= 1) {
            this.slides = [];
            this.currentSlideIndex = 0;
            return true;
        }

        this.slides = this.slides.filter((_, i) => i !== this.currentSlideIndex);
        this.currentSlideIndex = Math.min(this.currentSlideIndex, this.slides.length - 1);
        return true;
    }

    copySlide() {
        if (this.getCurrentSlide()) {
            localStorage.setItem('copiedSlide', JSON.stringify(this.getCurrentSlide()));
            return true;
        }
        return false;
    }

    pasteSlide() {
        const savedSlide = localStorage.getItem('copiedSlide');
        if (savedSlide) {
            const clipboardSlide = JSON.parse(savedSlide);
            const startTime = this.slides.length ? this.slides[this.slides.length - 1].endTime : 0;
            const pastedSlide = {
                ...clipboardSlide,
                startTime,
                endTime: startTime + 10
            };
            this.slides = [...this.slides, pastedSlide];
            this.currentSlideIndex = this.slides.length - 1;
            return true;
        }
        return false;
    }

    cloneSlide() {
        const currentSlide = this.getCurrentSlide();
        if (currentSlide) {
            const startTime = this.slides.length ? this.slides[this.slides.length - 1].endTime : 0;
            let clonedSlide = JSON.parse(JSON.stringify(currentSlide));
            clonedSlide.startTime = startTime;
            clonedSlide.endTime = startTime + 10;
            this.slides = [...this.slides, clonedSlide];
            this.currentSlideIndex = this.slides.length - 1;
            return true;
        }
        return false;
    }

    getCurrentSlide() {
        return this.slides[this.currentSlideIndex] || null;
    }

    getSlides() {
        return this.slides;
    }
}