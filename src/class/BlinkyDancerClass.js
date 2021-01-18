if (typeof window === 'undefined') {
  global.FireBirdClass = require('./DancerClass');
} 
let blinkArr = ['blinky-dancer', 'dizzle-dancer'];
let oceanArr = ['ocean-walker', 'yellow-fish'];

class BlinkyDancerClass extends FireBirdClass {
  constructor() {
    super(...arguments)
  }
  createDancerElement() {
    let elDancer = document.createElement('span');
    if (curObj.level === 1) {
      elDancer.className = blinkArr[Math.floor(Math.random() * 2)];
    } else if (curObj.level === 2 || curObj.level === 3) {
      elDancer.className = oceanArr[Math.floor(Math.random() * 2)];
    }
    return elDancer;
  }
}

if (typeof window === 'undefined') {
  module.exports = BlinkyDancerClass;
}
