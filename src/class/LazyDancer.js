if (typeof window === 'undefined') {
    global.FireBirdClass = require('./DancerClass');
  } 
  
  let forestLazyArr = ['sunflower', 'pretty'];
  let oceanLazyArr = ['fishking', 'pink'];
  let darkLazyArr = ['dark3', 'dark1'];
  class LazyDancer extends FireBirdClass {
    constructor() {
      super(...arguments)
    }
    move(){}
    createDancerElement() {
      let el = document.createElement('span');
        if (curObj.level === 1) {
          el.className = forestLazyArr[Math.floor(Math.random() * 2)];
        } else if (curObj.level === 2 || curObj.level === 3) {
          el.className = oceanLazyArr[Math.floor(Math.random() * 2)];
        }  else if (curObj.level > 3) {
          el.className = darkLazyArr[Math.floor(Math.random() * 2)];
        } 
      return el;
    }
  }
  
  if (typeof window === 'undefined') {
    module.exports = LazyDancer;
  }
  