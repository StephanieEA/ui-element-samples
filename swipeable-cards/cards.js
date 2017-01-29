'use strict';

class Cards {
  constructor() {
    this.cards = document.querySelectorAll('.card');
    //binding this to an instance, not the class
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.update = this.update.bind(this)
    this.targetBCR = null;
    this.target = null;
    this.startX = 0;
    this.targetX = 0;
    this.currentX = 0;
    this.screenX = 0;
    this.draggingCard = false;

    this.addEventListeners();

    requestAnimationFrame(this.update);
  }

  // function that contains all of the binding actions
  addEventListeners() {
    document.addEventListener('touchstart', this.onStart )
    document.addEventListener('touchend', this.onEnd )
    document.addEventListener('touchmove', this.onMove )
  }

  onStart(e) {


    if (!e.target.classList.contains('card'))
      return;

    this.target = e.target;
    this.targetBCR = this.target.getBoundingClientRect()

    this.startX= e.pageX || e.touches[0].pageX;
    this.currentX = this.startX;

    this.draggingCard = true;
    this.target.style.willChange = 'transform';

    e.preventDefault();
  }

  onMove(e) {
    if (!this.target)
      return;

    this.currentX = e.pageX || e.touches[0].pageX;
  }

  onEnd(e) {
    if (!this.target)
    return;

    this.targetX = 0;
    let screenX = this.currentX - this.startX

    this.currentX = e.pageX || e.touches[0].pageX;

    if (Math.abs(screenX) > this.targetBCR.width * 0.4) {
      this.targetX = (screenX > 0) ?
        this.targetBCR.width :
        -this.targetBCR.width;
    }

    this.draggingCard = false;
  }

  update () {

    requestAnimationFrame(this.update);

    if (!this.target)
      return;

    if (this.draggingCard) {
      this.screenX = this.currentX - this.startX;
    } else {
      this.screenX += (this.targetX - this.screenX) / 10
    }

    const screenX = this.currentX - this.startX;

    this.target.style.transform = `translateX(${this.screenX}px)`;


  }
}



window.addEventListener('load', () => new Cards())
