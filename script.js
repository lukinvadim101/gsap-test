//--------------------------- gspa basics + таймлайн
var tl = gsap.timeline({repeat: 2, repeatDelay: 1}); // прото настройка

tl.to(".selector",{
  y: -80,// смещение
  background: 'gold',
  duration: 10,
  opacity : .1,
  delay:.5,
  zIndex:-1,
  // repeat: -1,
  rotation: 360,
  scale: 1.8, // уменьшение ращзмера
  stagger: .5, // задержка для каждого элемента
  ease: 'power2.inout', // анимация предустановка
  yoyo: true,
  onEnd: function() {
   console.log('ok = end')
  }
})

// -------------------изменение состоятний объекта

let dataObj = { // исходный объект
  num_f : 1,
  num_b : 4000,
  color : '#12345'
}

let showObjUpd = (selector, obj) => {
  let el = document.querySelector(selector); // реактивный рендеринг
  el.innerHTML = '';
  el.insertAdjacentHTML(`afterbegin`,
    `<span class="objtxt"> ffforward: ${obj.num_f} </span>
     <span class="objtxt"> backwwwward: ${obj.num_b} </span>
     <span class="objtxt"> coooooOlor: ${obj.color} </span>`)

  //   color : obj.color");
  // el.innerHTML = JSON.stringify({
  //   forward: obj.num_f,
  //   backward: obj.num_b,
  //   color : obj.color
  // });
};

gsap.to(dataObj,{
  num_f : 8080, // новые значения
  num_b : 101,
  color : '#543210', // делать градиент
  duration: 2,
  repeat: -1,
  onUpdate: function() {
    showObjUpd('.another_selector',dataObj) // запуск функции
  }
})


// --------------------------анимация заголовка


let h1 = document.querySelector('h1');
let letters = h1.innerHTML.split(''); // выбрать каждую букву по отедльности

h1.innerHTML = ''; // заменить на пустое

let spanArray = letters.map(
  letter => {
    const item = document.createElement('span');
    item.classList.add('letter');
    item.innerHTML = letter;
    h1.appendChild(item); // воссоздать заголовк заново из массива букв

    let rect = item.getBoundingClientRect();// получить кординаты каждой буквы

    item.style.left = rect.left + 'px';
    item.x = rect.left;

    item.style.top = rect.top + 'px';
    item.y = rect.top;

    return item;
});

spanArray.forEach( span => {
  span.style.position = 'absolute'; // кривое позиционирование
});

setTimeout(()=> {
  gsap.to('.letter', {
    color : 'orange',
    opacity : 1,
    top: 100,
    left: 500,
    repeat: -1,
    scale: 1.2,
    zIndex: 2,
    fontSize: '52px',

    delay: function (i, el) { // задреожка анимации
      return i * .3;
    },
    left: function (i, el) { // смещение
      return el.x + i * 5;
    },
  })

},500)

// --------------- фон stagger
let emjArr = ['👀','📀','🔟','🐙','🦘','🐳','🦒','🥒','🎱','🥇','🎇','🪑','👰', '🍎', '😰', '😭' ,'👃' ,'🚅' ,'😼' ,'💁', '👲' ,'📞', '〽️' ,'🎏' ,'🏤', '🐁', '🐾'];
let bg = document.querySelector('.bg__wrapper'),
    bgEl = document.querySelector('.bg__el');

let bgFill = function(item, num){
  for (let i = 0; i < num; i++) {
    let newDiv = document.createElement("div")
    newDiv.innerHTML = emjArr[Math.floor(Math.random() * emjArr.length)]
    newDiv.classList.add(item)
    bg.append(newDiv)
  }
};

bgFill('bg__el',18);

let tween = gsap.to('.bg__el', {
  duration: 8,
  rotate: 270,
  stagger: .3,
  repeat: -1,
  borderRadius:40,
  background: dataObj.color,
  yoyo: true,
})

// ------------ кнопки управления
let play = document.querySelector('.play'),
    pause = document.querySelector('.pause'),
    resume = document.querySelector('.resume'),
    reverse = document.querySelector('.reverse'),
    restart = document.querySelector('.restart');

play.addEventListener('click', ()=> tween.play());
pause.addEventListener('click', ()=> tween.pause());
resume.addEventListener('click', ()=> tween.resume());
reverse.addEventListener('click', ()=> tween.reverse());
restart.addEventListener('click', ()=> tween.restart());

// ------------ drugable plugin

Draggable.create("#earth", {
  type: "rotation",
   inertia: true
});

let earthTween = gsap.to("#earth", {
  scale: 10, // уменьшение ращзмера
  duration: 1000,
  repeat: -1,
  position: 'absolute',
})
let earth = document.querySelector('#earth')
    earth.addEventListener('click', ()=> earthTween.pause());
    earth.addEventListener('dblclick', ()=> earthTween.play());

// -----------------------motion plugin
gsap.registerPlugin(MotionPathPlugin);
let dino = document.querySelector('.dino');
let dinoBall = document.querySelector('.dinoball');
let svgPath = document.querySelector('.yourpath');
gsap.to(dinoBall, {
  duration: 10,
  motionPath: {
    path:  svgPath,
    align: svgPath,
    autoRotate: true
  }
});
