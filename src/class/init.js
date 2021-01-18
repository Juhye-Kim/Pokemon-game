/* eslint-disable */
const dancers = [];
const maingame = document.querySelector('#main-game');
const maininfo = document.querySelector('#main-info');
const mainsection = document.querySelector('#main-section');
const pocketballInfo = document.querySelector('#pocketball-info');
const pocketballInfoNum = document.querySelector('#pocketball-info-num');
const pocketmonInfoNum = document.querySelector('#pocketmon-info-num');
const progress = document.querySelector('#level-gauge');
const levelText = document.querySelector('#level-text');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
let mouseCursor = document.querySelector(".cursor");
let userId = document.querySelector("#user-id");
let curObj = {pocketmonNum: 0, pocketballNum: 20, exp: 0, level: 1};
let storageArr = [];
if (!localStorage.pocketStorage) {
  localStorage.setItem('pocketStorage', JSON.stringify(storageArr));
} else {
  storageArr = JSON.parse(localStorage.pocketStorage);
}

//login page elements
const login = document.createElement('div');
login.className = 'login';
const loginLogo = document.createElement('img');
loginLogo.src = 'images/logo.png';
loginLogo.className = 'login-logo';
const loginInput = document.createElement('input');
loginInput.className = 'login-input';
loginInput.placeholder = 'ID를 세자리 이상 입력하세요';
const loginBtn = document.createElement('button');
loginBtn.className = 'login-btn';
loginBtn.textContent = 'PRESS START';

// functions
function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY - scrollY + "px";
}

function catchBall() {
  if (curObj.pocketballNum !== 0) {
    pocketballInfo.classList.remove('pocketball-info-zero');
  } 
  if(this.className === 'monster-ball'){
    curObj.pocketballNum += 2;
    pocketballInfoNum.textContent = curObj.pocketballNum;
    this.classList.add('monster-ball-rm');
    this.classList.remove('monster-ball');
  }
  if(this.className === 'super-ball'){
    curObj.pocketballNum += 11;
    pocketballInfoNum.textContent = curObj.pocketballNum;
    this.classList.add('monster-ball-rm');
    this.classList.remove('monster-ball');
  }
  if(this.className === 'great-ball'){
    curObj.pocketballNum += 51;
    pocketballInfoNum.textContent = curObj.pocketballNum;
    this.classList.add('monster-ball-rm');
    this.classList.remove('monster-ball');
  }
}

function pocketInfoChange() {
    curObj.pocketballNum--;
    pocketballInfoNum.textContent = curObj.pocketballNum;
    curObj.pocketmonNum++;
    pocketmonInfoNum.textContent = curObj.pgitocketmonNum;
    if (curObj.pocketballNum === 0) {
      pocketballInfo.classList.add('pocketball-info-zero');
    } 
    curObj.exp += (20 - Math.round(this.timeBetweenSteps / 100));

    progress.setAttribute('data-label', `EXP ${curObj.exp}/100`);
    progress.value = curObj.exp;
    if (curObj.exp >= 100) {
      curObj.level++;
      levelText.textContent = `Level ${curObj.level}`;
      curObj.exp -= 100;
      progress.setAttribute('data-label', `EXP ${curObj.exp}/100`);
      progress.value = curObj.exp;
    }
    if (curObj.level === 2 || curObj.level === 3) {
      maingame.classList.remove('theme-forest');
      maingame.classList.add('theme-ocean');
    } else if (curObj.level > 3) {
      maingame.classList.remove('theme-ocean');
      maingame.classList.add('theme-dark');
    }
}

function catchFireBird() {
  if (curObj.pocketballNum > 0) {
    pocketInfoChange.call(this);
    this.classList.remove();
    this.classList.add('firebird-rm');
    setTimeout(this.remove.bind(this), 1000);
  }
}

function catchBlinkyDancer() {
  if (curObj.pocketballNum > 0) {
    pocketInfoChange.call(this);
    this.classList.remove();
    this.classList.add('firebird-rm');
    setTimeout(this.remove.bind(this), 1000);
  }
}

function catchTotopDancer() {
  if (curObj.pocketballNum > 0) {
    pocketInfoChange.call(this);
    this.classList.remove();
    this.classList.add('firebird-rm');
    setTimeout(this.remove.bind(this), 1000);
  }
}

function catchLazypDancer() {
  if (curObj.pocketballNum > 0) {
    pocketInfoChange.call(this);
    this.classList.remove();
    this.classList.add('firebird-rm');
    setTimeout(this.remove.bind(this), 1000);
  }
}

function storageSet(id) {
  for(let el of storageArr) {
    if(id === el.id) {
      curObj.id = el.id;
      curObj.pocketmonNum = el.pocketmonNum;
      curObj.poketballNum = el.poketballNum;
      curObj.exp = el.exp;
      curObj.level = el.level;
      return curObj;
    }
  }
  curObj.id = id;
  return curObj;
}

function makeFireBird() {
  setTimeout(makeFireBird, 3000);
  let firebird = new FireBirdClass(
    (maingame.clientHeight - 180) * Math.random(),
    maingame.clientWidth,
    Math.random() * 1000
  );
  firebird.$node.timeBetweenSteps = firebird.timeBetweenSteps;
  firebird.$node.addEventListener('click', catchFireBird);
  setTimeout(() => { firebird.$node.remove() }, 8000);
  maingame.append(firebird.$node);
}

function makeBlinkyDancer() {
  setTimeout(makeBlinkyDancer, 7000);
  let blinkyDancer = new BlinkyDancerClass(
    (maingame.clientHeight - 180) * Math.random(),
    maingame.clientWidth,
    1000
  )
  blinkyDancer.$node.timeBetweenSteps = blinkyDancer.timeBetweenSteps;
  blinkyDancer.$node.addEventListener('click', catchBlinkyDancer);
  // blinkyDancer.$node.addEventListener('keyup', e => {if(e.code === 'Space') {catchBlinkyDancer}});
  setTimeout(() => { blinkyDancer.$node.remove() }, 8000);
  maingame.append(blinkyDancer.$node);
}

function makeMonsterBall() {
  setTimeout(makeMonsterBall, 5000);
  let ballArr = ['monster-ball','monster-ball','monster-ball','monster-ball','monster-ball', 'super-ball','super-ball', 'great-ball']
  let monsterBall = document.createElement('div');
  maingame.append(monsterBall);
  monsterBall.addEventListener('click', catchBall);
  setTimeout(() => { monsterBall.remove()}, 6000);
  monsterBall.className = ballArr[ Math.floor(Math.random()*8)];
  let nX=Math.random()*960;
  let nY=Math.random()*520;
  let nStepSize=4;
  let nStepX=nStepSize;
  let nStepY=nStepSize;
  let nTimerID=0;
  let nEndX=0;
  let nEndY=0;
  nTimerID=0;
  
  nEndX=maingame.offsetWidth-monsterBall.offsetWidth;
  nEndY=maingame.offsetHeight-monsterBall.offsetHeight;
  if(nTimerID==0)
   nTimerID=setInterval(startMove,20);

  function startMove(){
    nX+=nStepX;
    nY+=nStepY;
    if(nX>nEndX) {nStepX=-nStepSize;}
    if(nX<0) {nStepX=nStepSize;}
    if(nY>nEndY) {nStepY=-nStepSize;}
    if(nY<0) {nStepY=nStepSize;}
    monsterBall.style.left=nX+"px";
    monsterBall.style.top=nY+"px";
 }
}

function makeToTopDancer() {
  setTimeout(makeToTopDancer, 5000);
  let totopDancer = new ToTopDancer(
    maingame.clientHeight - 180,
    (maingame.clientWidth - 160) * Math.random(),
    1000
  )
  totopDancer.$node.timeBetweenSteps = totopDancer.timeBetweenSteps;
  totopDancer.$node.addEventListener('click', catchTotopDancer);
  setTimeout(() => { totopDancer.$node.remove() }, 8000);
  maingame.append(totopDancer.$node);
}

function makeLazyDancer() {
  setTimeout(makeLazyDancer, 6000);
  let lazyDancer = new LazyDancer(
    maingame.clientHeight - 260,
    (maingame.clientWidth - 160) * Math.random(),
    1000
  )
  lazyDancer.$node.timeBetweenSteps = lazyDancer.timeBetweenSteps;
  lazyDancer.$node.addEventListener('click', catchLazypDancer);
  setTimeout(() => {lazyDancer.$node.remove()}, 8000);
  maingame.append(lazyDancer.$node);
}


// handlers
function handleLoginBtn() {
  const id = loginInput.value;
  userId.textContent = id;
  login.classList.add('hidden');
  
  curObj = storageSet(id);

  pocketballInfoNum.textContent = curObj.pocketballNum;
  pocketmonInfoNum.textContent = curObj.pocketmonNum;
  levelText.textContent = `Level ${curObj.level}`;
  userId.textContent = curObj.id;
  progress.value = curObj.exp;
  progress.setAttribute('data-label', `EXP ${curObj.exp}/100`);
  if (curObj.level === 2 || curObj.level === 3) {
    maingame.classList.remove('theme-forest');
    maingame.classList.add('theme-ocean');
  } else if (curObj.level > 3) {
    maingame.classList.remove('theme-ocean');
    maingame.classList.add('theme-dark');
  }
  startBtn.addEventListener('click', handleStartBtn);
  stopBtn.addEventListener('click', handleStopBtn);
}

function handleStartBtn() {
  makeFireBird();
  makeBlinkyDancer();
  makeMonsterBall();
  makeToTopDancer();
  makeLazyDancer();
}

function handleStopBtn() {
  let check = false;
  for (let i in storageArr) {
    if (storageArr[i].id === curObj.id) {
      storageArr[i] = curObj;  
      check = true;
    }
  }
  if (!check) {
    storageArr.push(curObj);
  }
  localStorage.setItem('pocketStorage',JSON.stringify(storageArr));
}

function loginCheck(e) {
  if(loginInput.value.length < 3) {
    loginInput.classList.add('login-input-fail');
  } else {
    loginInput.classList.remove('login-input-fail');
    if(e.key === 'Enter') {
      handleLoginBtn();
    }
  }
}

// init
window.addEventListener('DOMContentLoaded', () => {
  mainsection.append(login);
  login.append(loginLogo);
  login.append(loginInput);
  login.append(loginBtn);
  loginBtn.addEventListener('click', handleLoginBtn);
  loginInput.addEventListener('keyup', e => loginCheck(e));
});
window.addEventListener("scroll", cursor);
window.addEventListener("mousemove", cursor);