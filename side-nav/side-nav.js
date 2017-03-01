/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

class SideNav {
  constructor() {
    this.showButtonEl = document.querySelector('.js-menu-show');
    this.hideButtonEl = document.querySelector('.js-menu-hide');
    this.sideNavEl = document.querySelector('.js-side-nav');
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container');

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    this.startX = 0;
    this.currentX = 0;

    this.addEventListeners();
  }

  addEventListeners() {
    this.showButtonEl.addEventListener('click', this.showSideNav);
    this.hideButtonEl.addEventListener('click', this.hideSideNav);
    this.sideNavEl.addEventListener('click', this.hideSideNav)
    this.sideNavContainerEl.addEventListener('click', this.blockClicks)

    document.addEventListener('touchstart', this.onTouchStart)
    document.addEventListener('touchmove', this.onTouchMove)
    document.addEventListener('touchend', this.onTouchEnd)
  }

  onTouchStart (e) {
    if (!this.sideNavEl.classList.contains('side-nav--visible'))
    return

  //  e.preventDefault();
    this.startX = e.touches[0].pageX;
    this.currentX = this.startX;
  }

  onTouchMove (e) {
    this.currentX = e.touches[0].pageX;
    const translateX = Math.min(0, this.currentX - this.startX)

    if (this.translateX < 0) {
      e.preventDefault();
    }

    this.sideNavContainerEl.style.transform = `translateX${translateX}px`
  }

  onTouchEnd (e) {
    const translateX = Math.min(0, this.currentX - this.startX)
    if (translateX < 0) {
      this.sideNavContainerEl.style.transform = '';
      this.hideSideNav();
    }
  }

  blockClicks(e) {
    e.stopPropagation()
  }

  onTransitionEnd (e) {
    this.sideNavEl.classList.remove('.side-nav--animatable');
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd);
  }

  showSideNav() {
    this.sideNavEl.classList.add('.side-nav--animatable')
    this.sideNavEl.classList.add('.side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd)
  }

  hideSideNav() {
    this.sideNavEl.classList.add('.side-nav--animatable')
    this.sideNaveEl.classList.remove('.side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }
}

new SideNav();
