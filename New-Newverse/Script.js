let ambient = new Audio("Ambient.mp3");
let hoverSound = new Audio("HoverSound.mp3");
let clickSound = new Audio("ClickSound.mp3");
let keepGoing = true;
let maxHeight = $(window).height();
let maxWidth = $(window).width();
let numberOfBoxes = 6;
function spawnPlanets() {
  setTimeout(function() {

  }, 8000);
}

function randomText() {
  let possibilities = new Array(
    "The infinite simulator",
    "A homemade project",
    "More coming soon!"
  );
  let i = 1;
  setInterval(function() {
    if (i == possibilities.length){
      i = 0;
    }
    let chosenText = possibilities[i];
    i++;
    let label = document.getElementById("subTitle");
    $(label).fadeOut(500);
    setTimeout(function() {
      label.innerHTML = chosenText;
    },500)
    $(label).fadeIn(500);
  },3000)
}

function makePicture(source) {
  //http://www.orxonox.net/export/8211/data/pool/images/effects/planets/blueplanet.png
    var planet = document.createElement("img");

    let randDiameter = Math.floor((Math.random() * 25) + 25);
    planet.style.width = randDiameter + 'px';
    planet.style.height = randDiameter + 'px';
    planet.style.position = "absolute";
    planet.src = source;
    let randXPos = 0;
    let randYPos = 0;
    let voidRange = 50
    do {
      randXPos = Math.floor((Math.random() * (maxWidth/ 2))+(maxWidth/ 4));
    } while ((Math.abs(randXPos) - (maxWidth/2)) < voidRange);
    do {
      randYPos = Math.floor((Math.random() * (maxHeight/2))+(maxHeight/4));
    } while ((Math.abs(randYPos) - (maxHeight/2)) < voidRange);
    planet.style.left = maxWidth/2+'px';//randXPos+'px';
    planet.style.top = maxHeight/2+'px';//randYPos+'px';
    planet.style.zIndex = '-3';

      document.getElementById("planets").appendChild(planet);

      let centerX = (100*(randXPos - (maxWidth /2))+(randXPos));
      let centerY = (100*(randYPos - (maxHeight /2))+(randYPos));
      $(planet).animate({
        opacity: 1
      }, { duration: 1000, queue: false });
      $(planet).animate({
        left: centerX + 'px',
        top: centerY + 'px'
      }, { duration: 30000, queue: false });
      setTimeout(function() {
        planet.parentNode.removeChild(planet);
      }, 8000);

}

function animateOutBlocky() {
  let waitTime = 0;
  let waitInterval = 150;
  let animTime = 600;
  for (let i = 0; i < numberOfBoxes; i++) {
    let curElem = document.getElementById("s"+(i+1));
    let w = "34%";
    if (i == 2 || i == 5) {
      w="35%";
    }
    setTimeout(function () {
      $(curElem).animate({
        width: w,
        height: "51%"
      }, {queue: false, duration: animTime, easing: 'easeInOutSine'});
    }, waitTime);
    waitTime += waitInterval;

  }

}

function onLoad() {
  floatingTitle();
  randomText();
  ambient.loop = true;
  ambient.volume = 0.5;
  hoverSound.volume = 0.5;
  ambient.play();
  $("body").css("overflow", "hidden");
  doIt();
}

function floatingTitle() {
  let leftAmount = ((maxWidth * 0.5) +10);
  let topAmount = ((maxHeight * 0.15) -5);
  if (keepGoing) {
    $("#mainTitle").animate({
      left: leftAmount + "px"
    }, {queue: false, duration: 12000, easing: 'easeInOutSine'});
    $("#mainTitle").animate({
      top: topAmount + "px"
    }, {queue: false, duration: 12000, easing: 'easeInOutSine'});
    leftAmount += 7;
    topAmount += 5;
    $("#mainTitle").rotate({animateTo: 8, duration: 12000});
  }else {
    $("#mainTitle").stop();
  }


  setTimeout(function () {
    if (keepGoing) {
      let leftAmount = ((maxWidth * 0.5) -10);
      let topAmount = ((maxHeight * 0.15) +5);
      $("#mainTitle").animate({
        left: leftAmount + "px"
      }, {queue: false, duration: 12000, easing: 'easeOutSine'});
      $("#mainTitle").animate({
        top: topAmount + "px"
      }, {queue: false, duration: 12000, easing: 'easeOutSine'});
      leftAmount += 7;
      topAmount += 5;

      $("#mainTitle").rotate({animateTo: -8, duration: 12000});
    }else {
      $("#mainTitle").stop();
    }
    },8000);

  setTimeout(function () {
    if (keepGoing) {
      floatingTitle();
    }else {
      $("#mainTitle").stop();
    }

  },16000)
}

function onClick() {
  animateOutBlocky();
  clickSound.play();
  keepGoing = false;
  setTimeout(function(){
    $(ambient).animate({volume: 0}, 2000);
  }, 2000);
  let mainTitle = document.getElementById("mainTitle");
  let mainShadow = document.getElementById("mainShadow");
  let subTitle = document.getElementById("subTitle");
  let subShadow = document.getElementById("subShadow");
  let mb = document.getElementById("mb");
  $(mainTitle).animate({
    top: "100%",
    color: "rgb(20,20,20)"
  },{queue : false, duration: 1300, easing: 'easeInCirc'});
  $(mainShadow).animate({
    top: "100%"
  },{queue : false, duration: 1300, easing: 'easeInCirc'});
  $(subTitle).animate({
    top: "100%",
    color: "rgb(20,20,20)"
  },{queue : false, duration: 1300, easing: 'easeInCirc'});
  $(subShadow).animate({
    top: "100%"
  },{queue : false, duration: 1300, easing: 'easeInCirc'});
  $(mb).animate({
    top: "100%"
  },{queue : false, duration: 1300, easing: 'easeInCirc'});


  setTimeout(function() {
    window.location.replace("StartPage.html");
  }, 5000);

}


function onHover(event) {
  hoverSound.play();
  let btn = document.getElementById("mb");
  $(btn).stop();
  $(btn).animate({
    width: "250px",
    height: "125px"
  },{duration: 500, easing: 'easeOutCirc'})
}

function onLeft() {
  let btn = document.getElementById("mb");
  $(btn).stop();
  $(btn).animate({
    width: "200px",
    height: "100px"
  },{duration: 500, easing: 'easeOutCirc'})
}

function doIt() {
  setTimeout(function(){
    createStar();
    if (keepGoing) {
      doIt();
    }
  }, 20);
}

function createStar() {
  var star = document.createElement("div");

  let randWidth = Math.floor((Math.random() * 15) + 5);

  star.style.width = randWidth + 'px';
  star.style.height = randWidth + 'px';
  star.style.background = "white";
  star.style.borderRadius = "50px";

  let chosenHeight = 0;
  let chosenWidth = 0;
  let centerVoid = 20
  do {
    chosenHeight = Math.floor((Math.random()*maxHeight)+1);
  }while (Math.abs((maxHeight / 2) - chosenHeight) < centerVoid)
  do {
    chosenWidth = Math.floor((Math.random()*maxWidth)+1);
  }while (Math.abs((maxWidth / 2) - chosenWidth) < centerVoid)

  star.style.position = "absolute";
  star.style.left = chosenWidth + 'px';
  star.style.top = chosenHeight + 'px';
  star.style.opacity = 0;
  star.style.zIndex = -1;

  let centerX = (100*(chosenWidth - (maxWidth /2))+(chosenWidth));
  let centerY = (100*(chosenHeight - (maxHeight /2))+(chosenHeight));

  $(star).animate({
    opacity: 1
  }, { duration: 500, queue: false, easing: 'linear' });

  $(star).animate({
    top: centerY,
    left: centerX
  }, { duration: 60500, queue: false, easing: 'linear' });

document.getElementById("main").appendChild(star);

let randTime = 8000;


setTimeout(function(){
  star.parentNode.removeChild(star);
}, randTime);
}
