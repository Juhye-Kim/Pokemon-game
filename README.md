## **한 줄 소개 🕹**


포켓볼을 주워 포켓몬을 잡아 경험치를 쌓고, 레벨을 올리는 게임이다. 


## **주요 기능**


#### **1\. 로그인 화면**

입력한 아이디로 게임을 시작할 수 있다. 아이디는 세 글자 이상으로 지정해야한다. 유효성 검사를 통해 글자수를 확인해 세글자 미만일 경우 입력창이 빨간색으로 바뀌며 다시 입력하라는 피드백을 보낸다.

![](https://drive.google.com/uc?export=view&id=1QaRAM0D5eitVvjgvw8OMuBxbFaZiL57q)

#### **2\. 레벨에 따른 테마 변경 & 경험치 얻는 TIP**

일정한 경험치가 쌓이면 레벨이 올라가고, 레벨에 따라 테마가 풀 → 바다 → 숲으로 배경과 포켓몬 타입이 바뀌게 된다. 경험치는 포켓몬을 잡아야 올라간다.

**TIP 1. 포켓몬**

포켓몬이 움직이는 속도는 랜덤하게 지정되는데, 경험치를 속도에 비례하게 증가하도록 설정해둬서 빠른 포켓몬을 잡을수록 더 많은 경험치를 얻을 수 있다.

**TIP 2. 포켓볼**

포켓몬을 잡을 때마다 **포켓볼**의 개수는 하나씩 감소한다. 포켓볼이 0개가 되면 더 이상 포켓몬이 잡히지 않기 때문에 중간 중간 포켓볼도 주워야 계속 게임을 진행할 수 있다. 포켓볼도 종류에 따라 증가하는 개수를 다르게 설정해 두었다. (빨간색+1, 파란색+5, 노란색+50)

![](https://drive.google.com/uc?export=view&id=1QlLxxNgC2hnXKm75tSCo6vDNgi4_iX5H)

#### **3\. 로그인 정보 저장**

Local Storage에 ID, 레벨, 경험치, 잡은 포켓몬수, 포켓볼 수에 대한 데이터를 저장해두어 브라우저를 종료하거나 새로고침을 한 후에도 동일한 아이디로 접속을 하면 기존에 하던 부분부터 이어서 게임을 시작할 수 있도록 했다.

![](https://drive.google.com/uc?export=view&id=17BoepG0rv7ZihDraFmRsgN0AWQz666To)

## **구현 과정**


#### **1\. 기획**

**브레인 스토밍**

정말 하나의 게임을 만든다고 생각하면서 내가 게임할 때 무슨 기능을 썼고 어떤게 필요했지? 하고 한명의 사용자 입장에서 나름 진지하게 생각해본 것 같다. 페어분과 줌을 켜고 브레인 스토밍부터 했는데, 둘 다 뭔가가 생각나면 필터링없이(?) 바로바로 말하고보는 스타일이라 생각들이 빠르고 다양하게 나올 수 있었다.

**받아쓰기**

아직 모르는 기능들이 너무 많기도 하고 심지어 우리가 어디까지 구현할 수 있을 지조차도 가늠도 되지 않았다. 그래서 일단 가능한 지는 해보면서 판단하기로 하고 모든 생각을 노션에 다 적어두었다. 대략 이야기를 끝내고 적어둔 내용들을 보며 지울건 지우고 비슷한건 카테고리를 나눠 묶어보니 전반적인 그림이 잡혔다.

**우선순위 정하기**

이틀 정도밖에 시간이 남지 않아 우선순위를 정해서 가장 필요한 기능부터 구현해야겠다는 생각이 들었고, 바로 구현할 수 있을 것 같은 기능들부터 차례로 bare, advanced, nightmare 라고 이름을 붙여 단계를 정하고 하나씩 완성해나갔다.


#### **2\. 와이어 프레임 설계**

전체적인 틀은 닌텐도 스위치와 비슷하게 구성하고, 내부 화면(main-section)에서 게임을 할 수 있도록 설계했다. 일러스트를 이용해 와이어 프레임을 완성했다. 이후 배경과 캐릭터를 추가해 실제 크기를 확인하고, 완성된 모습을 대략적으로 시각화해보았다.


#### **3\. HTML/CSS, Javascript**

> _HTML - audio 태그_  
> _CSS - transition_  
> _CSS, JS - cursor 이미지로 바꾸기_  
> _CSS - margin, flex로 버튼 배치_  
> _CSS - 게임영역 - 정보표시영역 분리_  
> _HTML, JS - 경험지 게이지바 (progress 태그)_  
> _CSS - 포켓몬 animation 추가_  
> _JS - 충돌 인식 (포켓볼이 벽에서 튕겨나가는 효과)_  
> _JS - 포켓몬의 움직임 다양화 (class, 상속과 다형성)_  
> _JS - 유저 정보 저장 (LocalStorage, data 객체, JSON)_

**HTML - audio 태그**

게임에 좀 더 몰입할 수 있게 실행시 포켓몬 bgm이 나오도록 했다. [audio](http://tcpschool.com/html-tag-attrs/audio-autoplay)라는 태그의 src속성에는 가지고 있던 mp3파일의 url을 입력했고,  자동 재생되도록 autoplay라는 속성을 추가했다. 

```
<audio src="bgms/guidepost.mp3" autoplay></audio>
```

CSS -**transition**

포켓몬들이 잡히면 화면에서 사라지는데, 이 때 갑자기 사라지기보다는 fadeout되는 느낌으로 스르륵..하고 사라졌으면 좋겠다고 생각해서 CSS에서 [transition](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) 속성을 추가했다. 클릭된 포켓몬 객체의 classList에만 hidden 클래스가 추가되도록 해 클릭 시 transition이 동작되도록 했다. transition에는 애니메이션 속도와 실행시간을 설정하는 속성이 있어서, 투명도인 opacity를 적절히 낮추는 식으로 페이드아웃 효과를 낼 수 있었다.

```
.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.7s, opacity 0.7s linear;
}
```

CSS, JS -**cursor 이미지로 바꾸기**


사실 커서를 이미지로 바꾼다기 보다는, 이미지가 배경으로 설정된 <div> 요소 하나가 마우스의 좌표를 쫒아다니도록 했다. 우선 요소에 마우스 커서가 올라갔을 때 보여줄 모양을 지정하는 cursor 속성의 값을 [cursor : none](https://developer.mozilla.org/ko/docs/Web/CSS/cursor) 으로 해서 원래 커서는 보이지 않게해주었다. 그리고 50\*50크기의 <div>에 cursor라는 클래스명을 붙이고 아래와 같이 속성을 지정해주었다.

[z-index](https://developer.mozilla.org/ko/docs/Web/CSS/z-index)는 어느 객체가 앞으로 나오고, 뒤에 나올지 배치 순서를 결정하는 속성인데, z-index값을 크게 가진 요소일수록 위에 위치하기 때문에 항상 맨 위에 올 수 있도록 넉넉히 1000으로 설정해주었다. 그리고 이 속성은 position에 relative, absolute, fixed이 적용되어야만 작동하기 때문에 position은 absolute로 설정했다.

```
// CSS
* {
  cursor: none;
}

.cursor {
  width: 50px;
  height: 50px;
  background-image: url('images/cursor-img.png');
  position: absolute
  z-index: 1000;
}
```

마우스 좌표 계산에는 [pageX와 pageY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)라는 event속성을 사용했다. 브라우저 상에서 현재 마우스 커서의 위치값을 구할 때 사용하는 이벤트 속성인데, 마우스 커서의 위치를 실시간으로 계산해주기 때문에 mousemove라는 이벤트와 함께 사용했다.

```
//Javascript
let mouseCursor = document.querySelector(".cursor");
window.addEventListener("mousemove", cursor);

function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY + "px";
}
```

**CSS - margin, flex로 버튼 배치**

버튼 네개를 어떻게 마름모꼴로 배치할까 고민하다가 (더 좋은 방법이 있을 것 같지만 아직 쓸줄 아는게 flex뿐이라,,) flex와 margin값을 조정하면 가능할 것 같다는 생각이 들었다. 일단 버튼은 top / left&right / bottom 이렇게 세개의 div로 먼저 구분했다. 그리고 left&right 안에 들어있는 left, right div 요소는 justify-content 속성을 space-between으로 지정해 상위div의 양 옆에 붙을 수 있도록 했다. 그리고 margin값을 음수(-5px)로 지정해 div끼리 겹치게 만들어 줌으로써 좀 더 버튼끼리 가깝게 붙어있게 했다.


```
// HTML
<div class="small-btns">
  <button class="small-btn top-btn">▲</button>
  <div class="samll-btn left-right-btn">
    <button class="small-btn left-btn">◀</button>
    <button class="small-btn right-btn">▶</button>
  </div>
  <button class="small-btn bottom-btn">▼</button>
</div>
```

```
// CSS
.small-btns {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.left-right-btn {
  width: 130px;
  display: flex;
  justify-content: space-between;
  margin-top: -5px;
  margin-bottom: -5px;
}

```

**CSS - 게임영역 & 정보표시영역 분리**

포켓몬을 잡을 때 정보표시를 담당하는 요소들 에서는 클릭 이벤트가 발생하지 않도록 하려고 **게임 실행 영역**과 **정보 표시 영역**을 분리했다. (아래 사진 참고) 부모 요소인 main-section을 기준으로 하위 요소들에 position:relative를 적용하고 top 값을 조정해 두 하위요소 위치를 동일하게 만들어 겹쳐 보이도록 했다.

1\. main-section = 전체 게임 창 (상위요소)

3\. main-info = 프로필, 레벨, 경험치, 포켓몬/포켓볼 정보만 표시할 뿐 어떤 이벤트도 실행되지 않음(하위요소1)

2\. main-game = 캐릭터들이 등장하고 클릭이벤트들이 적용되는 곳 (하위요소2)

특히 게임영역(main-game) 위에 정보영역(main-info)이 있어서,어딜 클릭해도 정보영역만 click되어버리는 문제가 있었다. 그래서 포켓몬이 게임영역에서 등장해도 포켓몬이 아닌 정보영역에서만 click event가 발생해버렸다. 문제 해결을 위해 정보영역(main-info)의 CSS 속성에 pointer-events : none; 을 추가해 모든 이벤트를 무효화하도록 했다.


```
#main-info {
  pointer-events: none;
}
```

**HTML, JS - 경험지 게이지바**


경험치에 따라 게이지바가 차오르도록 하고 싶어서 찾아보니 [progress](https://www.w3schools.com/tags/tag_progress.asp)라는 html 태그가 있었다. data-label로 내부에 표시될 텍스트를, value로 현재값을, max로 최대값을 지정할 수 있다. Javascript에서 data-label에 새로운 텍스트를 삽입하고, value값을 증가시켜주는 식으로 경험치에 따라 이 요소의 속성값들이 바뀌게 했다. 

```
<progress id="level-gauge" data-label="EXP 0/100" value="0" max="100"></progress>
```

다른 함수에서 this.timeBetweenSteps라는 캐릭터가 움직이는 속도값을 랜덤으로 지정해둔 변수가 있었는데, 이 랜덤한 속도에 비례하게 경험치(exp)를 설정하고 싶었다. 캐릭터가 빠르게 움직일 수록 많은 경험치를 얻게 되는 것이다. 속도값이 100이 넘어가서 그냥 더해주면 한번에 경험치가 100이상씩 추가되어버리는 문제가 있어서 적절하게 경험치로 환산해주는 식을 만들었다. 

```
function pocketInfoChange() {
  curObj.exp += (20 - Math.round(this.timeBetweenSteps / 100));  
  // (대충 랜덤지정되는 this.timeBetweenSteps값에 비례하게 경험치(exp)를 준다는 식)
  progress.setAttribute('data-label', `EXP ${curObj.exp}/100`);
  progress.value = curObj.exp;
  if (curObj.exp >= 100) {    // 경험치가 100이되면 레벨업, 경험치 초기화
    curObj.level++;
    levelText.textContent = `Level ${curObj.level}`;
    curObj.exp -= 100;
    progress.setAttribute('data-label', `EXP ${curObj.exp}/100`);
    progress.value = curObj.exp;
  }
}
```

**CSS - 포켓몬 animation 추가**


animation도 요소에 적용되는 CSS 스타일을 다른 스타일로 부드럽게 전환시켜 주는 속성이다. transition보다 더 다양한 효과를 쉽게 낼 수 있어서 캐릭터들이 총총 뛰어다니도록 bounce 효과를 설정하는 데 사용했다.애니메이션 지속시간, 속도 등을 조정하는 **animation**, 그리고 애니메이션의 각 구간별로 어떤 스타일을 적용시킬지 정하는 **@keyframes** 를 이용했다. 요소의 위치, 모양 등의 변화를 아래처럼 keyframes에 설정해두고, animation 속성을 통해 변화가 일어나는 시간(1s), 횟수(infinite) 등을 지정해주었다.

```
.toy {
  animation: bounce 1s infinite alternate;
}

@keyframes bounce {
  100% {
    top: -10px;
  }
}
```

**JS - 충돌 인식 (포켓볼이 벽에서 튕겨나가는 효과)**

랜덤한 X, Y축 위치에서 몬스터볼들이 생성되고, 화면(maingame)의 크기를 벗어나면 움직이는 방향을 바꾸도록 해서 공이 벽에서 튕겨나가는 듯한 효과를 주었다.

계속 변하는 상대적인 위치값을 바탕으로 0.02초마다 값을 갱신하는 함수가 실행되도록해서 자연스러운 동작처럼 보이도록 했다. 구글링을 통해 찾아낸 식인데 게임에 맞도록 값들과 변수를 조금씩 조정해서 적용해 보았다. (식에 대한 자세한 설명은 다른 글에서 다뤄보도록 하겠다,,)

```
function makeMonsterBall() {
  ...
  
  let nX = Math.random() * 960;
  let nY = Math.random() * 520;
  let nStepSize = 4;
  let nStepX = nStepSize;
  let nStepY = nStepSize;
  let nTimerID = 0;
  let nEndX = 0;
  let nEndY = 0;
  
  nEndX = maingame.offsetWidth - monsterBall.offsetWidth;
  nEndY = maingame.offsetHeight - monsterBall.offsetHeight;
  if(nTimerID === 0) {
   nTimerID=setInterval(startMove, 20);
  }

  function startMove(){
    nX += nStepX;
    nY += nStepY;
    if (nX > nEndX) {nStepX =- nStepSize;}
    if (nX < 0) {nStepX = nStepSize;}
    if (nY > nEndY) {nStepY =- nStepSize;}
    if (nY < 0) {nStepY = nStepSize;}
    monsterBall.style.left = nX + 'px';
    monsterBall.style.top = nY + 'px';
 }
}
```

**JS - 포켓몬의 움직임 다양화 (class, 상속과 다형성)**

움직임이 같은 캐릭터들은 하나의 class로 생성해주었다. 그리고 비슷한 특징을 갖는 캐릭터들은 새로운 class를 정의하고 extends 키워드를 사용해 기본적인 기능은 공유하게 만들었고, 좀 더 속성을 추가함으로써 다형성을 구현해보았다. 

예를들어 Pocketmon이라는 위치를 설정하고(setPosition), 오른쪽에서 왼쪽으로 이동하는기본적인 동작(move)을 하는 메서드를 가진 클래스가 있다고 하자. 그리고 setPosition이라는 위치 설정 메서드는 유지하고 움직임만 아래서 위로 이동하도록 하고싶다면, 일단 extends와 super 키워드를 통해 Pocketmon 클래스의 속성들을 상속받는 새로운 클래스 (ToTopPoketmon)를 만든다. 그리고 움직임을 조정하는 move 메서드만 아래서 위로 움직이도록 바꿔준다. 이런 식으로 class 키워드로 다양한 포켓몬 클래스를 만들어 40종 정도의 포켓몬이 5가지 정도의 다양한 움직임을 갖도록 만들어 주었다.

```
class Pocketmon {
  constructor(top, left, timeBetweenSteps) {
    // 생략
    this.step();
    this.setPosition(top, left);
    this.move();
  }
  
  createDancerElement() { }
  step() { }
  setPosition(top, left) { }
  
  move() {
    this.$node.animate({ transform: 'translateX(-100px)' }, this.timeBetweenSteps);
    this.$node.style.left = `${Number(this.$node.style.left.slice(0, -2)) - 100}px`;
    setTimeout(this.move.bind(this), this.timeBetweenSteps);
  }
}
```

```
class ToTopPocketmon extends Pocketmon {
    constructor() {
        super(...arguments)
    }
    move() {
        this.$node.animate({ transform: 'translateY(-50px)' }, this.timeBetweenSteps);
        this.$node.style.top = `${Number(this.$node.style.top.slice(0, -2)) - 50}px`;
        setTimeout(this.move.bind(this), this.timeBetweenSteps);
    }
}
```

****유저 정보 저장 - LocalStorage,** data 객체, JSON**

창을 새로고침하거나 브라우저를 종료해도 동일한 ID로 접속하면 이전 기록이 유지되도록 하기위해  **Local Storage**를 이용했다. 저장될 정보들을 하나의 객체(infoData)에 넣어두고, 게임중에 계속해서 이 객체의 정보들이 업데이트 되도록 했다. 저장버튼을 클릭하면 업데이트된 infoData가 storageArr라는 모든 유저 정보가 담긴 배열에 저장되고 이 배열이 로컬 스토리지에 추가된다. 로그인 버튼을 누르면 id가 일치하는 객체의 정보들이 각자의 위치에 세팅되도록 했다.

저장할 때는 이미 storage에 존재하는 id인지 확인 후 있으면 기존객체에 덮어씌우고, 처음 생성된 id라면 새로운 객체를 생성해 storage에 추가해주는 식으로 만들었다. 그리고 로컬 스토리지에 객체를 저장하고 불러올 때  **JSON.stringify, JSON.parse**를 이용함으로써 데이터를 의도한 대로 인식할 수 있도록 했다.

```
let infoData = {pocketmonNum: 0, pocketballNum: 20, exp: 0, level: 1};
let storageArr = [];
if (!localStorage.pocketStorage) {
  localStorage.setItem('pocketStorage', JSON.stringify(storageArr));
} else {
  storageArr = JSON.parse(localStorage.pocketStorage);
}
```

```
// 로그인 버튼 클릭시
function handleLoginBtn() {
  // ...생략
  infoData = storageSet(id);
  pocketballInfoNum.textContent = infoData.pocketballNum;
  pocketmonInfoNum.textContent = infoData.pocketmonNum;
  levelText.textContent = `Level ${infoData.level}`;
  userId.textContent = infoData.id;
  progress.value = infoData.exp;
  progress.setAttribute('data-label', `EXP ${infoData.exp}/100`);
  // ...생략
}
```

```
// 저장 버튼 클릭시
function handleSaveBtn() {
  let check = false;
  for (let i in storageArr) {
    if (storageArr[i].id === infoData.id) {
      storageArr[i] = infoData;  
      check = true;
    }
  }
  if (!check) {
    storageArr.push(infoData);
  }
  localStorage.setItem('pocketStorage',JSON.stringify(storageArr));
}
```

## **느낀점**

---

이번에는 기능도 기능이지만 **협업의 중요성**을 무엇보다 가장 크게 깨달았다. 지금까지 계산기, 트위틀러, 날씨 앱 등 무언가를 만드는 작은 프로젝트(?)들은 페어분과 질문이나 소통은 하지만 기획이나 구현은 각자 진행해왔다. 사실 디자인이나 기획에는 개인의 취향이 들어가기도 하고 각자 하고싶은게 다르지 않을까? 싶기도 해서 이번에도 당연히 이전처럼 진행할 줄 알았는데, 페어분이 먼저 처음부터 끝까지 다 같이하자고 제안해주셔서 함께 진행하게 되었다. 우선 결론적으로는 적극적으로 제안해주신 것에 대해 너무 감사하게 생각하고 있다.

**복습**

맨 처음에 캐릭터들 간의 클래스 상속을 가장 먼저 구현했는데 이 부분에서 살짝 해매기도 했다. 일단 어찌저찌 코드를 함께 완성하고난 후, 그대로 복붙해서 주고 받지 않고 백지상태인 나머지 한명의 코드창 화면을 공유해 처음부터 함께 다시 작성해보는 식으로 진행했다. 그러다보니 복습도 확실하게 되어서 그 다음부터는 원활하게 진행 할 수 있던 것 같다.

**Git으로 협업해보기**

기본적으로는 한 명의 모니터를 공유해 함께 코드를 작성했는데, 하다보니 일부 수정할 필요가 있는 부분들이 생겨서 이 부분은 다른 한명이 수정해 코드를 넘겨주기로 했다. 원래같으면 그냥 slack 메세지로 주고받았겠지만 Git workflow에 대해 배운 이후였기 때문에 Git pull, push를 이용해보기로 했다. 복붙하지 않아도 명령어만 입력하면 바로바로 수정된 부분만 추가할 수도 있고, 커밋 기록과 수정한 부분에 대한 기록이 남아서 어떤 부분을 어떻게 고쳤는 지 확인하기에도 좋다는 걸 몸소 느낄 수 있었다. 

**부족한 점 보완, 분업**

꼼꼼한 성격이 아니라 자잘한 실수를 많이 하는데, 페어분이 매의 눈으로 지켜보시다가 실수한 부분들을 잘 집어내주셔서 오류들을 미리 방지할 수 있었다. 필요한 소스들도 분업을 하니까 혼자 할 때보다 두배로 빠르게 찾을 수 있었고, 한명이 코드를 작성하는 동안 다른 한명은 적용할만한 새로운 기능을 찾아오는 등 훨씬 효율적으로 진행할 수 있었다. 사실 혼자였으면 당연히 이틀동안 기획한걸 다 끝내지 못할거라고 생각해 대충 마무리 지었을 수도 있었을 것 같다. 페어분도 시간이 나시는대로 줌할까요? 라고 적극적으로 말씀해주신 덕분에 나도 새벽까지 잠도 안자고 할 정도로 적극적으로 임할 수 있었고, 처음 기획한대로 잘 마무리 지을 수 있던 것 같다.
