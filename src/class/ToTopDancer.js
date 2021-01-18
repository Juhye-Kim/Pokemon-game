
if (typeof window === 'undefined') {
    window.FireBirdClass = require('./DancerClass');
} 

let forestToTopArr = ['to-top-dancer'];
let oceanToTopArr = ['white'];
let darkToTopArr = ['dia', 'liza'];

class ToTopDancer extends FireBirdClass {
    constructor() {
        super(...arguments)
    }
    createDancerElement() {
        let el = document.createElement('span');
        if (curObj.level === 1) {
            el.className = forestToTopArr[Math.floor(Math.random() * 1)];
          } else if (curObj.level === 2 || curObj.level === 3) {
            el.className = oceanToTopArr[Math.floor(Math.random() * 1)];
          } else if (curObj.level > 3) {
            el.className = darkToTopArr[Math.floor(Math.random() * 2)];
          }
        return el;
        }
    move() {
        this.$node.animate({ transform: 'translateY(-50px)' }, this.timeBetweenSteps);
        this.$node.style.top = `${Number(this.$node.style.top.slice(0, -2)) - 50}px`;
        setTimeout(this.move.bind(this), this.timeBetweenSteps);
    }
}


if (typeof window === 'undefined') {
module.exports = ToTopDancer;
}
