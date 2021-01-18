if (typeof window === 'undefined') {
  var jsdom = require('jsdom');
  var { JSDOM } = jsdom;
  var { document } = (new JSDOM('')).window;
} // you don't have to worry about this code. this is for testing.

const birdArr = ['firebird', 'waterbird', 'thunderbird'];
const fishArr = ['marine', 'gaioga', 'gyarados'];
const darkArr = ['toy', 'cycle', 'machine', 'tree', 'oct'];

class FireBirdClass {
  constructor(top, left, timeBetweenSteps) {
    this.top = top;
    this.left = left;
    this.timeBetweenSteps = timeBetweenSteps;
    this.$node = this.createDancerElement();
    this.step();
    this.setPosition(top, left);
    this.move();
  }
  createDancerElement() {
    let elDancer = document.createElement('span');
    if (curObj.level === 1){
      elDancer.className = birdArr[Math.floor(Math.random() * 3)];
    } else if (curObj.level === 2 || curObj.level === 3) {
      elDancer.className = fishArr[Math.floor(Math.random() * 3)];
    } else if (curObj.level > 3) {
      elDancer.className = darkArr[Math.floor(Math.random() * 5)];
    }

    return elDancer;
  }
  step() {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  }
  setPosition(top, left) {
    Object.assign(this.$node.style, {
      top: `${top}px`,
      left: `${left}px`
    });
  }
  move() {
    this.$node.animate({ transform: 'translateX(-100px)' }, this.timeBetweenSteps);
    this.$node.style.left = `${Number(this.$node.style.left.slice(0, -2)) - 100}px`;
    setTimeout(this.move.bind(this), this.timeBetweenSteps);
  }
}

if (typeof window === 'undefined') {
  module.exports = FireBirdClass;
}