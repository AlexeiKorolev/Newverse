let ambient = new Audio("AmbientStartPage.wav");
let hoverSound = new Audio("HoverSound.mp3");
let clickSound = new Audio("ClickSound.mp3");
let errorWav = new Audio("Error.wav");
let earthScale = new Image("EarthForScale.png");

let ironTextures = new Array(
  "Textures/MetalTextures/MetalAsset1.jpg",
  "Textures/MetalTextures/MetalAsset2.jpg",
  "Textures/MetalTextures/MetalAsset3.jpg",
  "Textures/MetalTextures/MetalAsset4.jpg",
  "Textures/MetalTextures/MetalAsset5.jpg",
  "Textures/MetalTextures/MetalAsset6.jpg",
  "Textures/MetalTextures/MetalAsset7.jpg",
  "Textures/MetalTextures/MetalAsset8.jpg",
  "Textures/MetalTextures/MetalAsset9.jpg",
  "Textures/MetalTextures/MetalAsset10.jpg",
  "Textures/MetalTextures/MetalAsset11.jpg",
  "Textures/MetalTextures/MetalAsset12.jpg",
  "Textures/MetalTextures/MetalAsset13.jpg"
)

let maxHeight = $(window).height();
let maxWidth = $(window).width();
let dotInterval = 40;
let keepDotting = true;
let validCharacters = new Array('0','1','2','3','4','5','6','7','8','9');
let maxDataLength = 5
let maxDataNumber = 10000;
let maxDetailNumber = 5;
let simSystems = 0;
let simDetail = 0;
let loadedSystems = 0;
let allSystems = new Array();
let interestingSystems = new Array();
let interesting = 0;
let normal = 0;
let spot = 0;
let curPlanet = 0;
let flickSpeed = 50;
let nameNum = 5;
let count = 0;
let numberOfBoxes = 6;

let ironPlanetStorage = new Array();
let graphicStorage = new Array(new Array("A name of something very random", "¯(ツ)_/¯"));

var starTypeCollection = {
  o: 0,
  b: 0,
  a: 0,
  f: 0,
  g: 0,
  k: 0,
  m: 0
};
var starSizeTypeCollection = {
  mainSequence: 0,
  whiteDwarfs: 0,
  blueGiants: 0,
  redGiants: 0,
  redSuperGiants: 0,
  redDwarfs: 0
};
var planetCompTypeCollection = { //INCOMPLETE CHECK COMP TYPE FUNCTION!!!
  ocean: 0,
  carbon: 0,
  silicate: 0,
  ice: 0,
  lava: 0,
  gas: 0,
  iron: 0
}
var planetTypeCollection = {
  mars: 0,
  earth: 0,
  superEarth: 0,
  subNept: 0,
  Nept: 0,
  subJup: 0,
  Jup: 0,
  SuperJup: 0
}



function updateScreenSize() {
  setTimeout(function() {
    maxHeight = $(window).height();
    maxWidth = $(window).width()
    updateScreenSize();
  },300)
}

updateScreenSize();

function unBlockify() {
  let waitTime = 0;
  let waitInterval = 150;
  let animTime = 600;
  for (let i = 0; i < numberOfBoxes; i++) {
    let curElem = document.getElementById("s"+(i+1));

    setTimeout(function () {
      $(curElem).animate({
        width: "0px",
        height: "0px"
      }, {queue: false, duration: animTime, easing: 'easeInOutSine'});
    }, waitTime);
    waitTime += waitInterval;

  }
}

function onStartLoad() {

    $("body").css("overflow", "hidden");
    unBlockify();
    ambient.loop = true;
    ambient.volume = 0.2;
    hoverSound.volume = 0.4;
    let labelOne = document.getElementById("Detail")
    labelOne.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, 'Enter a number from 1 to 5<br>Detail Level <strong>5</strong> is recommended');");
    labelOne.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
    let labelTwo = document.getElementById("Systems")
    labelTwo.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, 'Enter the number of systems to simulate<br>Between <strong>500-5,000</strong> is recommended');");
    labelTwo.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
    labelTwo = document.getElementById("startSim")
    labelTwo.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '<strong>Start the simulation!</strong>');");
    labelTwo.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");

    ambient.play();
    dotify();
}

function onHover() {
  hoverSound.play();
}

function randomizeNums(num) {
  if (num == 0) {
    return num + ((Math.random() * 4)+0)
  }else {
    return num * ((Math.random() * 0.15)+0.95);
  }
}

function makeMountain(posX, posY, size, varr, clr, darkClr) {
  let backDiv = document.createElement("div");
  backDiv.classList.add("uiBackMountainDiv");

  let chosenSize = 1.2*(size + Math.floor( (Math.random() * (varr*2)) -varr ));
  backDiv.style.left = posX+"px";
  backDiv.style.right = posY+"px";
  backDiv.style.height = chosenSize + "px";
  backDiv.style.width = chosenSize + "px";
  $(backDiv).css("background-color", "rgb(255,255,255)");
  let octagonCords = new Array(
    randomizeNums(30)+"% "+randomizeNums(0)+"%",
    randomizeNums(70)+"% "+randomizeNums(0)+"%",
    randomizeNums(100)+"% "+randomizeNums(30)+"%",
    randomizeNums(100)+"% "+randomizeNums(70)+"%",
    randomizeNums(70)+"% "+randomizeNums(100)+"%",
    randomizeNums(30)+"% "+randomizeNums(100)+"%",
    randomizeNums(0)+"% "+randomizeNums(70)+"%",
    randomizeNums(0)+"% "+randomizeNums(30)+"%",
  )
  $(backDiv).css("clip-path", "polygon("+octagonCords[0]+", "+octagonCords[1]+", "+octagonCords[2]+", "+octagonCords[3]+", "+octagonCords[4]+", "+octagonCords[5]+", "+octagonCords[6]+", "+octagonCords[7]+")");
  $(backDiv).css("border-radius", (chosenSize / 1.8)+"px");
  $(backDiv).css("border-radius", (chosenSize / 1.8)+"px");
  $(backDiv).css("background", "linear-gradient(0deg, "+darkClr+" 0%, "+clr+" 100%)");
  //background: rgb(1,0,14);
  //background: linear-gradient(0deg, rgba(1,0,14,1) 0%, rgba(12,7,255,1) 100%);
  document.body.appendChild(backDiv);

  let crater = document.createElement("div");
  crater.style.width = (chosenSize/4)+"px";
  crater.style.height = (chosenSize/4)+"px";

}

//Mouse FUNCTIONS

function makeNumbersReadable(number) {
  let stringyNum = Math.floor(number) +"";
  let final = "";
  let count = 0;
  for (let i = 0; i < stringyNum.length; i++) {
    let digit = stringyNum.length - (1+i);
    digit = stringyNum.charAt(digit);
    count++;
    final = final + digit;
    if (count/3 == Math.floor(count/3)) {
      final = final + ","
    }
  }

  let finalFinal = "";
  for (let i = 0; i < final.length; i++) {
    let digit = final.length - (1+i);
    digit = final.charAt(digit);
    final = final + digit;
  }
  return finalFinal;
}

function onMouseOverPoint(thing, val) {
  var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;
    posX+=20;
    posY+=20;
  if ($("#uiMouseLabel").length) {
    var lab = document.getElementById("uiMouseLabel");
    lab.style.top = posY+"px";
    lab.style.left = posX+"px";
    lab.innerHTML = val;
  }else {
    var lab = document.createElement("div");
    lab.innerHTML = val;
    lab.id = "uiMouseLabel";
    lab.classList.add("uiMouseLabel");
    lab.style.top = posY+"px";
    lab.style.left = posX+"px";
    document.body.appendChild(lab);
  }
}

function onMouseOverPointLeft(thing, val) {
  if ($("#uiMouseLabel").length) {
    var lab = document.getElementById("uiMouseLabel");
    lab.parentNode.removeChild(lab);
  }
}

/*let possibleGases = new Array(
  25, //Methane
  1,  //CO2
  10, //Water vapor
  0,  //Oxygen
  0,  //Nitrogen
  0,  //Neon
  0,  //Hydrogen
  0   //Helium
);*/

//PLANET FUNCTIONS
function planetSize() {
  let chance = Math.floor((Math.random() * 1080) + 1)
  let size = 0;
  if (chance <=39) {
    //Mars size
    let size = Math.floor(100*((Math.random() * 0.2)+0.5))/100;
    planetTypeCollection.mars++;
    return new Array(size,"Mars Size");
  }else if (chance <= 111) {
    //Earth size
    let size = Math.floor(100*((Math.random() * 0.5)+0.7))/100;
    planetTypeCollection.earth++;
    return new Array(size,"Earth Size");
  }else if (chance <=378) {
    //Super Earth
    let size = Math.floor(100*((Math.random() * 0.7)+1.2))/100;
    planetTypeCollection.superEarth++;
    return new Array(size,"Super-Earth Size");
  }else if (chance <=640) { //ORIGINAL: 727
    //Sub-Nept size
    let size = Math.floor(10*((Math.random() * 1.2)+1.9))/10;
    planetTypeCollection.subNept++;
    return new Array(size,"Sub-Neptune Size");
  }else if (chance <=760) { //ORIGINAL: 844
    //Nept size
    let size = Math.floor(10*((Math.random() * 2)+3.1))/10;
    planetTypeCollection.Nept++;
    return new Array(size,"Neptune Size");
  }else if (chance <=843) { //ORIGINAL: 883
    //sub-Jupiter size
    let size = Math.floor(10*((Math.random() * 3.2)+5.1))/10;
    planetTypeCollection.subJup++;
    return new Array(size,"Sub-Jupiter Size");
  }else if (chance <=921) { //ORIGINAL: 961
    //Jupiter size
    let size = Math.floor(10*((Math.random() * 5.4)+8.3))/10;
    planetTypeCollection.Jup++;
    return new Array(size,"Jupiter Size");
  }else {
    //Super Jupiter
    let size = Math.floor(10*((Math.random() * 22)+13.7))/10;
    planetTypeCollection.SuperJup++;
    return new Array(size,"Super-Jupiter Size");
  }
}

function planetTempAndAtm(planetType, orbitDist, zones) {
  let final = new Array();
  let a = zones[9];
    if (planetType == "Ocean Planet") {
      let max_temp = 600;
      let base_temp = 220;
      let mid_temp = (max_temp + base_temp) / 2;
      let avgTemp = 0;

      //AVG TEMP//

      let unFilteredDist = orbitDist / a;
      if (unFilteredDist < 1) {
        let chance = Math.floor((Math.random() * 100)) +1;
        if (chance < 80) {
          avgTemp = Math.floor( (Math.random() * (max_temp-mid_temp)) + mid_temp);
        }else {
          avgTemp = Math.floor( (Math.random() * (mid_temp-base_temp)) + base_temp);
        }
      }else {
        let chance = Math.floor((Math.random() * 100)) +1;
        if (chance < 30) {
          avgTemp = Math.floor( (Math.random() * (max_temp-mid_temp)) + mid_temp);
        }else {
          avgTemp = Math.floor( (Math.random() * (mid_temp-base_temp)) + base_temp);
        }
      }

      ///////////////////////////////////////////
     //            PRESSURE / COMP            //
    ///////////////////////////////////////////


    let pressure = 0;
    let atmComp = new Array(0,0,0,0,0,0,0,0);

    if (avgTemp - base_temp < 20) {
      pressure = Math.floor(100*(Math.random()*0.05))/100
      atmComp = new Array(
        0,
        0,
        100,
        0,
        0,
        0,
        0,
        0
      );

    }else if (avgTemp - base_temp < 80) {
      pressure = Math.floor(100*(Math.random()*1)+0.1)/100
      atmComp[2] = Math.floor((Math.random()*50)+10);
      atmComp[0] = Math.floor((Math.random()*10)+5);
      atmComp[1] = Math.floor((Math.random()*15)+5);
    }else if (avgTemp - base_temp < 200) {
      pressure = Math.floor(100*(Math.random()*3.5)+1.2)/100
      atmComp[2] = Math.floor((Math.random()*30)+5);
      atmComp[1] = Math.floor((Math.random()*20)+10);
      atmComp[0] = Math.floor((Math.random()*20)+10);
    }else {
      pressure = Math.floor(100*(Math.random()*8)+4.7)/100
      if (Math.random() * 100 < 10) {
        pressure = Math.floor(100*(Math.random()*1000)+20)/100
      }
      atmComp[0] = Math.floor((Math.random()*30)+5);
      atmComp[1] = Math.floor((Math.random()*20)+10);
      atmComp[2] = Math.floor((Math.random()*20)+10);
    }

    let amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]);
    let x = amountLeft / 100;

    atmComp[6] = Math.floor( x * ( (Math.random() * 75) + 20 ));  //Hydrogen First

    amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[6]);
    x = amountLeft / 100;
    atmComp[7] = Math.floor( x * ( (Math.random() * 65) + 20 ));  //Helium Second

    amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[6]+atmComp[7]);
    x = amountLeft / 100;
    atmComp[3] = Math.floor( x * ( (Math.random() * 95) + 2 ));  //Oxygen Third

    amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2] + atmComp[3] + atmComp[6] + atmComp[7]);
    x = amountLeft / 100;
    atmComp[4] = Math.floor( x * ( (Math.random() * 90) + 5 ));  //Nitrogen Fourth

    atmComp[5] = 100 - (atmComp[4] + atmComp[3] + atmComp[6] + atmComp[7] + atmComp[0] + atmComp[1] + atmComp[2])  //Neon Last

    //Almost...Done...
    let high = 0;
    let low = 0;
    let oneDay = 0; // How many Earth days
    let randN = (Math.random() * 100) + 1;

    let lowestPossible = Math.floor(100*((15/((oneDay*(unFilteredDist/2))+0.1)) + 20))/100;

    if (lowestPossible < base_temp) {lowestPossible = base_temp}

    if (randN < 45) {
      oneDay = Math.floor(100 * ( Math.random() *  0.9) + 0.1)/100
    }else if (randN < 75) {
      oneDay = Math.floor(100 * ( Math.random() *  9) + 1)/100
    }else {
      oneDay = Math.floor(100 * ( Math.random() *  249) + 10)/100
    }

    if (orbitDist > 0.55) {

      if (pressure < 0.3) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.5));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 1.2)) + (avgTemp * 0.5));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else if (pressure < 0.8) {
        high = avgTemp + Math.floor((Math.random() * 70) + 50);
        low = avgTemp - Math.floor((Math.random() * 40) + 40);
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else if (pressure < 1.8) {
        high = avgTemp + Math.floor((Math.random() * 35) + 20);
        low = avgTemp - Math.floor((Math.random() * 15) + 10);
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else {
        high = avgTemp + Math.floor((Math.random() * 40) + 20);
        low = avgTemp - Math.floor((Math.random() * 5) + 5);
        avgTemp += 10;
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }

  }else {

    if (pressure < 0.3) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 3)) + (avgTemp * 0.8));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 2)) + (avgTemp * 0.8));
      if (low < 20) {
        low = 20;
      }
    }else if (pressure < 0.8) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 2.5)) + (avgTemp * 0.5));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.8));
      if (low < 20) {
        low = 20;
      }
    }else if (pressure < 1.8) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.7)) + (avgTemp * 0.5));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.7)) + (avgTemp * 0.5));
      if (low < 20) {
        low = 20;
      }
    }else {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.5));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.7)) + (avgTemp * 0.4));
      avgTemp += 10;
      if (low < 20) {
        low = 20;
      }
    }

  }
  final = new Array(avgTemp, high, low, pressure, atmComp, oneDay);





    }else if (planetType == "Lava Planet") {
      let base_temp = 2000;
      let max_temp = 12000;

      let possibleGases = new Array(
        25, //Methane
        1,  //CO2
        10, //Water vapor
        0,  //Oxygen
        0,  //Nitrogen
        0,  //Neon
        0,  //Hydrogen
        0   //Helium
      );

      let avgTemp = Math.floor( (Math.random() * (max_temp-base_temp)) + base_temp);

      pressure = Math.floor((100*Math.random() * 2) + 0.1)/100;
      let atmComp = new Array();
      atmComp = new Array(
        Math.floor((Math.random()*30)+10),
        Math.floor((Math.random()*20)+20),
        Math.floor((Math.random()*10)+10),
        0,
        100-(atmComp[0]+atmComp[1]+atmComp[2]),
        0,
        0,
        0
      );

      //Almost...Done...
      let high = 0;
      let low = 0;
      let oneDay = 0; // How many Earth days
      randN = (Math.random() * 100) + 1

      if (randN < 30) {
        oneDay = Math.floor(100 * ( Math.random() *  0.1) + 0.1)/100
      }else {
        oneDay = Math.floor(100 * ( Math.random() *  0.05) +0.05)/100
      }

      high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.5));
      low = avgTemp / ((Math.random()*1)+2);
      low = Math.floor(low);
      if (low < base_temp/2) {low = base_temp/2}

      final = new Array(avgTemp, high, low, pressure, atmComp, oneDay)



    }else if (planetType == "Carbon Planet" || planetType == "Silicon Planet" || planetType == "Iron Planet") {
      let unFilteredDist = orbitDist / a
      let base_temp = 0;

      // ZONE SYSTEM OF EQUATIONS //
      if (unFilteredDist < 0.9) {
        unFilteredDist -= 0.4;
        base_temp = (-300*unFilteredDist) + 400;
      }else if (unFilteredDist < 1.1) {
        unFilteredDist -= 0.9;
        base_temp = (-125*unFilteredDist) + 250;
      }else if (unFilteredDist < 2.8) {
        unFilteredDist -= 1.1;
        base_temp = (-100*unFilteredDist) + 225;
      }else if (unFilteredDist < 10) {
        unFilteredDist -= 2.8;
        base_temp = (-3*unFilteredDist) + 55;
      }else if (unFilteredDist < 50) {
        unFilteredDist -= 10;
        base_temp = (-0.1*unFilteredDist) + 28.4;
      }
      base_temp = Math.floor(100*base_temp)/100;

       ///////////////////////////////////////////
      //            PRESSURE / COMP            //
     ///////////////////////////////////////////

      // This part will have to be difficult :\ //

      //  DATA  //
      let possibleGases = new Array(
        25, //Methane
        1,  //CO2
        10, //Water vapor
        0,  //Oxygen
        0,  //Nitrogen
        0,  //Neon
        0,  //Hydrogen
        0   //Helium
      );
      let pressure = 0;

      let atmComp = new Array(0,0,0,0,0,0,0,0);
      let avgTemp = Math.floor((Math.random() * (base_temp / 3)) + base_temp);

      if (avgTemp / base_temp == 1) {
        pressure = 0;
      }else if (avgTemp / base_temp < 1.10) {
        pressure = Math.floor(10 * (Math.random() * 2) + 0.1) / 10

        atmComp[0] = Math.floor((Math.random() * 4)+1);
        atmComp[1] = Math.floor((Math.random() * 15) + 3);
        if (avgTemp > 230) {
          atmComp[2] = Math.floor((Math.random() * 15) + 5);
        }else if (avgTemp > 160) {
          atmComp[2] = Math.floor((Math.random() * 2) + 1);
        }else {
          atmComp[2] = 0;
        }

      }else if (avgTemp / base_temp < 1.15) {
        pressure = Math.floor(10 * (Math.random() * 3) + 2) / 10

        atmComp[0] = Math.floor((Math.random() * 10) + 13);
        atmComp[1] = Math.floor((Math.random() * 20) + 7);
        if (avgTemp > 230) {
          atmComp[2] = Math.floor((Math.random() * 7) + 10);
        }else if (avgTemp > 160) {
          atmComp[2] = Math.floor((Math.random() * 2) + 1);
        }else {
          atmComp[2] = 0;
        }
      }else if (avgTemp / base_temp < 1.20) {
        pressure = Math.floor(10 * (Math.random() * 7) + 4) / 10

        atmComp[0] = Math.floor((Math.random() * 18)+22);
        atmComp[1] = Math.floor((Math.random() * 36) + 10);
        if (avgTemp > 230) {
          atmComp[2] = Math.floor((Math.random() * 8) + 2);
        }else if (avgTemp > 160) {
          atmComp[2] = Math.floor((Math.random() * 2) + 1);
        }else {
          atmComp[2] = 0;
        }
      }else {
        pressure = Math.floor(10 * (Math.random() * 22) + 11) / 10

        atmComp[0] = Math.floor((Math.random() * 15)+25);
        atmComp[1] = Math.floor((Math.random() * 10) + 40);
        if (avgTemp > 230) {
          atmComp[2] = Math.floor((Math.random() * 6) + 2);
        }else if (avgTemp > 160) {
          atmComp[2] = Math.floor((Math.random() * 2) + 1);
        }else {
          atmComp[2] = 0;
        }
      }
      let amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]);
      let x = amountLeft / 100;



      let randN = (Math.random() * 100) + 1
      if (randN < 30) {


        atmComp[6] = Math.floor( x * ( (Math.random() * 75) + 20 ));  //Hydrogen First

        amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[6]);
        x = amountLeft / 100;
        atmComp[7] = Math.floor( x * ( (Math.random() * 65) + 20 ));  //Helium Second

        amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[6]+atmComp[7]);
        x = amountLeft / 100;
        atmComp[3] = Math.floor( x * ( (Math.random() * 95) + 2 ));  //Oxygen Third

        amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2] + atmComp[3] + atmComp[6] + atmComp[7]);
        x = amountLeft / 100;
        atmComp[4] = Math.floor( x * ( (Math.random() * 90) + 5 ));  //Nitrogen Fourth

        atmComp[5] = 100 - (atmComp[4] + atmComp[3] + atmComp[6] + atmComp[7] + atmComp[0] + atmComp[1] + atmComp[2])  //Neon Last


      }else if (randN < 70) {


        atmComp[4] = Math.floor( x * ( (Math.random() * 90) + 5 ));  //Nitrogen Fourth

        amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[4]);
        x = amountLeft / 100;
        atmComp[3] = Math.floor( x * ( (Math.random() * 95) + 2 ));  //Oxygen Third

        amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[4]+atmComp[3]);
        x = amountLeft / 100;
        atmComp[7] = Math.floor( x * ( (Math.random() * 65) + 20 ));  //Helium Second

        amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2] + atmComp[4] + atmComp[3] + atmComp[7]);
        x = amountLeft / 100;
        atmComp[6] = Math.floor( x * ( (Math.random() * 75) + 20 ));  //Hydrogen First

        atmComp[5] = 100 - (atmComp[4] + atmComp[3] + atmComp[6] + atmComp[7] + atmComp[0] + atmComp[1] + atmComp[2])


      }else {


        atmComp[5] = Math.floor( x * ( (Math.random() * 90) + 5 ));  //Nitrogen Fourth

        amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[5]);
        x = amountLeft / 100;
        atmComp[3] = Math.floor( x * ( (Math.random() * 95) + 2 ));  //Oxygen Third

        amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[5]+atmComp[3]);
        x = amountLeft / 100;
        atmComp[7] = Math.floor( x * ( (Math.random() * 65) + 20 ));  //Helium Second

        amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2] + atmComp[5] + atmComp[3] + atmComp[7]);
        x = amountLeft / 100;
        atmComp[6] = Math.floor( x * ( (Math.random() * 75) + 20 ));  //Hydrogen First

        atmComp[4] = 100 - (atmComp[5] + atmComp[3] + atmComp[6] + atmComp[7] + atmComp[0] + atmComp[1] + atmComp[2])

      }


      //Almost...Done...
      let high = 0;
      let low = 0;
      let oneDay = 0; // How many Earth days
      randN = (Math.random() * 100) + 1

      if (randN < 45) {
        oneDay = Math.floor(100 * ( Math.random() *  0.9) + 0.1)/100
      }else if (randN < 75) {
        oneDay = Math.floor(100 * ( Math.random() *  9) + 1)/100
      }else {
        oneDay = Math.floor(100 * ( Math.random() *  249) + 10)/100
      }

      let lowestPossible = Math.floor(100*((15/((oneDay*(unFilteredDist/2))+0.1)) + 20))/100

      if (orbitDist > 0.55) {

        if (pressure < 0.3) {
          high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.5));
          low = avgTemp - Math.floor((Math.random() * (avgTemp * 1.2)) + (avgTemp * 0.5));
          if (low < lowestPossible) {
            low = lowestPossible;
          }
        }else if (pressure < 8) {
          high = avgTemp + Math.floor((Math.random() * 70) + 50);
          low = avgTemp - Math.floor((Math.random() * 40) + 40);
          if (low < lowestPossible) {
            low = lowestPossible;
          }
        }else if (pressure < 18) {
          high = avgTemp + Math.floor((Math.random() * 35) + 20);
          low = avgTemp - Math.floor((Math.random() * 15) + 10);
          if (low < lowestPossible) {
            low = lowestPossible;
          }
        }else {
          high = avgTemp + Math.floor((Math.random() * 40) + 20);
          low = avgTemp - Math.floor((Math.random() * 5) + 5);
          avgTemp += 10;
          if (low < lowestPossible) {
            low = lowestPossible;
          }
        }

    }else {

      if (pressure < 0.3) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 3)) + (avgTemp * 0.8));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 2)) + (avgTemp * 0.8));
        if (low < 20) {
          low = 20;
        }
      }else if (pressure < 1.8) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 2.5)) + (avgTemp * 0.5));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.8));
        if (low < 20) {
          low = 20;
        }
      }else if (pressure < 3) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.7)) + (avgTemp * 0.5));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.7)) + (avgTemp * 0.5));
        if (low < 20) {
          low = 20;
        }
      }else {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.5));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.7)) + (avgTemp * 0.4));
        avgTemp += 10;
        if (low < 20) {
          low = 20;
        }
      }

    }



    final = new Array(avgTemp, high, low, pressure, atmComp, oneDay)



  }else if (planetType == "Gas Planet") {
    let unFilteredDist = orbitDist / a
    let base_temp = 0;

    // ZONE SYSTEM OF EQUATIONS //
    if (unFilteredDist < 0.9) {
      unFilteredDist -= 0.4;
      base_temp = (-300*unFilteredDist) + 500;
    }else if (unFilteredDist < 1.1) {
      unFilteredDist -= 0.9;
      base_temp = (-125*unFilteredDist) + 350;
    }else if (unFilteredDist < 2.8) {
      unFilteredDist -= 1.1;
      base_temp = (-100*unFilteredDist) + 325;
    }else if (unFilteredDist < 10) {
      unFilteredDist -= 2.8;
      base_temp = (-3*unFilteredDist) + 110;
    }else if (unFilteredDist < 50) {
      unFilteredDist -= 10;
      base_temp = (-0.1*unFilteredDist) + 28.4;
    }
    base_temp = Math.floor(100*base_temp)/100;

    //  DATA  //
    let possibleGases = new Array(
      25, //Methane
      1,  //CO2
      10, //Water vapor
      0,  //Oxygen
      0,  //Nitrogen
      0,  //Neon
      0,  //Hydrogen
      0   //Helium
    );
    let pressure = 0;
    let atmComp = new Array(0,0,0,0,0,0,0,0);
    if (Math.random() * 100 < 70) {
      atmComp = new Array(0,0,0,0,0,0,Math.floor((Math.random() * 50)+20),0);
      atmComp[7] = 100-atmComp[6];
    }else {
      atmComp = new Array(0,0,0,Math.floor((Math.random() * 50)+20),0,0,0,0);
      atmComp[4] = 100-atmComp[3];
    }


    let avgTemp = Math.floor((Math.random() * (base_temp / 2)) + base_temp);

    if (avgTemp / base_temp <= 1.05) {
      pressure = Math.floor(10*((Math.random() * 100)+10))/10;
    }else if (avgTemp / base_temp <= 1.15) {
      pressure = Math.floor(10*((Math.random() * 600)+110))/10;
    }else if (avgTemp / base_temp <= 1.25) {
      pressure = Math.floor(10*((Math.random() * 1000)+710))/10;
    }else if (avgTemp / base_temp <= 1.35) {
      pressure = Math.floor(10*((Math.random() * 4000)+1710))/10;
    }else {
      pressure = Math.floor(10*((Math.random() * 10000)+5710))/10;
    }

    let high = 0;
    let low = 0;
    let oneDay = 0; // How many Earth days
    randN = (Math.random() * 100) + 1

    if (randN < 45) {
      oneDay = Math.floor(100 * ( Math.random() *  0.9) + 0.1)/100
    }else if (randN < 75) {
      oneDay = Math.floor(100 * ( Math.random() *  9) + 1)/100
    }else {
      oneDay = Math.floor(100 * ( Math.random() *  249) + 10)/100
    }

    let lowestPossible = Math.floor(100*((15/((oneDay*(unFilteredDist/2))+0.1)) + 20))/100

    if (orbitDist > 0.55) {

      if (pressure < 150) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.2));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.2));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else if (pressure < 700) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.1));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.1));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else if (pressure < 1300) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.3)) + (avgTemp * 0.1));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.3)) + (avgTemp * 0.1));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.3)) + (avgTemp * 0.1));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.3)) + (avgTemp * 0.1));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }

  }else {

    if (pressure < 150) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.7)) + (avgTemp * 0.4));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.4));
      if (low < lowestPossible) {
        low = lowestPossible;
      }
    }else if (pressure < 700) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.6)) + (avgTemp * 0.3));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.3));
      if (low < lowestPossible) {
        low = lowestPossible;
      }
    }else if (pressure < 1300) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.3));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.2));
      if (low < lowestPossible) {
        low = lowestPossible;
      }
    }else {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.2));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.2));
      if (low < lowestPossible) {
        low = lowestPossible;
      }
    }

  }

    final = new Array(avgTemp, high, low, pressure, atmComp, oneDay)


  }else if (planetType == "Hot Jupiter") {
    let unFilteredDist = orbitDist / a;
    let base_temp = 2000;
    let max_temp = 6000;

    let possibleGases = new Array(
      25, //Methane
      1,  //CO2
      10, //Water vapor
      0,  //Oxygen
      0,  //Nitrogen
      0,  //Neon
      0,  //Hydrogen
      0   //Helium
    );



    if (unFilteredDist < 0.1) {
      base_temp = 2000;
    }else if (unFilteredDist < 0.2) {
      base_temp = 1200;
    }else if (unFilteredDist < 0.3) {
      base_temp = 800;
    }else if (unFilteredDist < 0.4) {
      base_temp = 500;
    }else {
      base_temp = 400;
    }

    let avgTemp = Math.floor( (Math.random() * (max_temp-base_temp)) + base_temp);

    let pressure = 0;

    let atmComp = new Array(0,0,0,0,0,0,Math.floor((Math.random() * 50)+20),0);
    atmComp[7] = 100-atmComp[6];

    if (avgTemp / base_temp <= 1.05) {
      pressure = Math.floor(10*((Math.random() * 100)+10))/10;
    }else if (avgTemp / base_temp <= 1.15) {
      pressure = Math.floor(10*((Math.random() * 600)+110))/10;
    }else if (avgTemp / base_temp <= 1.25) {
      pressure = Math.floor(10*((Math.random() * 1000)+710))/10;
    }else if (avgTemp / base_temp <= 1.35) {
      pressure = Math.floor(10*((Math.random() * 4000)+1710))/10;
    }else {
      pressure = Math.floor(10*((Math.random() * 10000)+5710))/10;
    }


    let high = 0;
    let low = 0;
    let oneDay = 0; // How many Earth days
    randN = (Math.random() * 100) + 1

    if (randN < 45) {
      oneDay = Math.floor(100 * ( Math.random() *  0.9) + 0.1)/100
    }else if (randN < 75) {
      oneDay = Math.floor(100 * ( Math.random() *  9) + 1)/100
    }else {
      oneDay = Math.floor(100 * ( Math.random() *  249) + 10)/100
    }


    let lowestPossible = Math.floor(100*((15/((oneDay*(unFilteredDist/2))+0.1)) + 20))/100

    if (orbitDist > 0.55) {

      if (pressure < 150) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.2));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.2));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else if (pressure < 700) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.1));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.1));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else if (pressure < 1300) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.3)) + (avgTemp * 0.1));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.3)) + (avgTemp * 0.1));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.3)) + (avgTemp * 0.1));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.3)) + (avgTemp * 0.1));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }

  }else {

    if (pressure < 150) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.7)) + (avgTemp * 0.4));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.4));
      if (low < lowestPossible) {
        low = lowestPossible;
      }
    }else if (pressure < 700) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.6)) + (avgTemp * 0.3));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.3));
      if (low < lowestPossible) {
        low = lowestPossible;
      }
    }else if (pressure < 1300) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.5)) + (avgTemp * 0.3));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.2));
      if (low < lowestPossible) {
        low = lowestPossible;
      }
    }else {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.2));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.4)) + (avgTemp * 0.2));
      if (low < lowestPossible) {
        low = lowestPossible;
      }
    }

  }


    final = new Array(avgTemp, high, low, pressure, atmComp, oneDay)

  }else if (planetType == "Ice Planet") {
    let unFilteredDist = orbitDist / a
    let base_temp = 0;

    // ZONE SYSTEM OF EQUATIONS //
    if (unFilteredDist < 0.9) {
      unFilteredDist -= 0.4;
      base_temp = (-300*unFilteredDist) + 400;
    }else if (unFilteredDist < 1.1) {
      unFilteredDist -= 0.9;
      base_temp = (-125*unFilteredDist) + 250;
    }else if (unFilteredDist < 2.8) {
      unFilteredDist -= 1.1;
      base_temp = (-100*unFilteredDist) + 225;
    }else if (unFilteredDist < 10) {
      unFilteredDist -= 2.8;
      base_temp = (-3*unFilteredDist) + 55;
    }else if (unFilteredDist < 50) {
      unFilteredDist -= 10;
      base_temp = (-0.1*unFilteredDist) + 28.4;
    }
    base_temp = Math.floor(100*base_temp)/100;

     ///////////////////////////////////////////
    //            PRESSURE / COMP            //
   ///////////////////////////////////////////

    // This part will have to be difficult :\ //

    //  DATA  //
    let possibleGases = new Array(
      25, //Methane
      1,  //CO2
      10, //Water vapor
      0,  //Oxygen
      0,  //Nitrogen
      0,  //Neon
      0,  //Hydrogen
      0   //Helium
    );
    let pressure = 0;

    let atmComp = new Array(0,0,0,0,0,0,0,0);
    let avgTemp = Math.floor((Math.random() * (base_temp / 3)) + base_temp);

    if (avgTemp / base_temp == 1) {
      pressure = 0;
    }else if (avgTemp / base_temp < 1.10) {
      pressure = Math.floor(10 * (Math.random() * 2) + 0.1) / 10

      atmComp[0] = Math.floor((Math.random() * 4)+1);
      atmComp[1] = Math.floor((Math.random() * 15) + 3);
      if (avgTemp > 230) {
        atmComp[2] = Math.floor((Math.random() * 15) + 5);
      }else if (avgTemp > 160) {
        atmComp[2] = Math.floor((Math.random() * 2) + 1);
      }else {
        atmComp[2] = 0;
      }

    }else if (avgTemp / base_temp < 1.15) {
      pressure = Math.floor(10 * (Math.random() * 3) + 2) / 10

      atmComp[0] = Math.floor((Math.random() * 10) + 13);
      atmComp[1] = Math.floor((Math.random() * 20) + 7);
      if (avgTemp > 230) {
        atmComp[2] = Math.floor((Math.random() * 7) + 10);
      }else if (avgTemp > 160) {
        atmComp[2] = Math.floor((Math.random() * 2) + 1);
      }else {
        atmComp[2] = 0;
      }
    }else if (avgTemp / base_temp < 1.20) {
      pressure = Math.floor(10 * (Math.random() * 6) + 4) / 10

      atmComp[0] = Math.floor((Math.random() * 18)+22);
      atmComp[1] = Math.floor((Math.random() * 36) + 10);
      if (avgTemp > 230) {
        atmComp[2] = Math.floor((Math.random() * 8) + 2);
      }else if (avgTemp > 160) {
        atmComp[2] = Math.floor((Math.random() * 2) + 1);
      }else {
        atmComp[2] = 0;
      }
    }else {
      pressure = Math.floor(10 * (Math.random() * 20) + 10) / 10

      atmComp[0] = Math.floor((Math.random() * 15)+25);
      atmComp[1] = Math.floor((Math.random() * 10) + 40);
      if (avgTemp > 230) {
        atmComp[2] = Math.floor((Math.random() * 6) + 2);
      }else if (avgTemp > 160) {
        atmComp[2] = Math.floor((Math.random() * 2) + 1);
      }else {
        atmComp[2] = 0;
      }
    }
    let amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]);
    let x = amountLeft / 100;

    let randN = (Math.random() * 100) + 1
    if (randN < 30) {


      atmComp[6] = Math.floor( x * ( (Math.random() * 75) + 20 ));  //Hydrogen First

      amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[6]);
      x = amountLeft / 100;
      atmComp[7] = Math.floor( x * ( (Math.random() * 65) + 20 ));  //Helium Second

      amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[6]+atmComp[7]);
      x = amountLeft / 100;
      atmComp[3] = Math.floor( x * ( (Math.random() * 95) + 2 ));  //Oxygen Third

      amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2] + atmComp[3] + atmComp[6] + atmComp[7]);
      x = amountLeft / 100;
      atmComp[4] = Math.floor( x * ( (Math.random() * 90) + 5 ));  //Nitrogen Fourth

      atmComp[5] = 100 - (atmComp[4] + atmComp[3] + atmComp[6] + atmComp[7] + atmComp[0] + atmComp[1] + atmComp[2])  //Neon Last


    }else if (randN < 70) {


      atmComp[4] = Math.floor( x * ( (Math.random() * 90) + 5 ));  //Nitrogen Fourth

      amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[4]);
      x = amountLeft / 100;
      atmComp[3] = Math.floor( x * ( (Math.random() * 95) + 2 ));  //Oxygen Third

      amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[4]+atmComp[3]);
      x = amountLeft / 100;
      atmComp[7] = Math.floor( x * ( (Math.random() * 65) + 20 ));  //Helium Second

      amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2] + atmComp[4] + atmComp[3] + atmComp[7]);
      x = amountLeft / 100;
      atmComp[6] = Math.floor( x * ( (Math.random() * 75) + 20 ));  //Hydrogen First

      atmComp[5] = 100 - (atmComp[4] + atmComp[3] + atmComp[6] + atmComp[7] + atmComp[0] + atmComp[1] + atmComp[2])


    }else {


      atmComp[5] = Math.floor( x * ( (Math.random() * 90) + 5 ));  //Nitrogen Fourth

      amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[5]);
      x = amountLeft / 100;
      atmComp[3] = Math.floor( x * ( (Math.random() * 95) + 2 ));  //Oxygen Third

      amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2]+atmComp[5]+atmComp[3]);
      x = amountLeft / 100;
      atmComp[7] = Math.floor( x * ( (Math.random() * 65) + 20 ));  //Helium Second

      amountLeft = 100 - (atmComp[0] + atmComp[1] + atmComp[2] + atmComp[5] + atmComp[3] + atmComp[7]);
      x = amountLeft / 100;
      atmComp[6] = Math.floor( x * ( (Math.random() * 75) + 20 ));  //Hydrogen First

      atmComp[4] = 100 - (atmComp[5] + atmComp[3] + atmComp[6] + atmComp[7] + atmComp[0] + atmComp[1] + atmComp[2])

    }


    //Almost...Done...
    let high = 0;
    let low = 0;
    let oneDay = 0; // How many Earth days
    randN = (Math.random() * 100) + 1

    if (randN < 45) {
      oneDay = Math.floor(100 * ( Math.random() *  0.9) + 0.1)/100
    }else if (randN < 75) {
      oneDay = Math.floor(100 * ( Math.random() *  9) + 1)/100
    }else {
      oneDay = Math.floor(100 * ( Math.random() *  249) + 10)/100
    }

    let lowestPossible = Math.floor(100*((15/((oneDay*(unFilteredDist/2))+0.1)) + 20))/100

    if (orbitDist > 0.55) {

      if (pressure < 0.3) {
        high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.5));
        low = avgTemp - Math.floor((Math.random() * (avgTemp * 1.2)) + (avgTemp * 0.5));
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else if (pressure < 8) {
        high = avgTemp + Math.floor((Math.random() * 70) + 50);
        low = avgTemp - Math.floor((Math.random() * 40) + 40);
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else if (pressure < 18) {
        high = avgTemp + Math.floor((Math.random() * 35) + 20);
        low = avgTemp - Math.floor((Math.random() * 15) + 10);
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }else {
        high = avgTemp + Math.floor((Math.random() * 40) + 20);
        low = avgTemp - Math.floor((Math.random() * 5) + 5);
        avgTemp += 10;
        if (low < lowestPossible) {
          low = lowestPossible;
        }
      }

  }else {

    if (pressure < 0.3) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 3)) + (avgTemp * 0.8));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 2)) + (avgTemp * 0.8));
      if (low < 20) {
        low = 20;
      }
    }else if (pressure < 8) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 2.5)) + (avgTemp * 0.5));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.8));
      if (low < 20) {
        low = 20;
      }
    }else if (pressure < 18) {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.7)) + (avgTemp * 0.5));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.7)) + (avgTemp * 0.5));
      if (low < 20) {
        low = 20;
      }
    }else {
      high = avgTemp + Math.floor((Math.random() * (avgTemp * 1.5)) + (avgTemp * 0.5));
      low = avgTemp - Math.floor((Math.random() * (avgTemp * 0.7)) + (avgTemp * 0.4));
      avgTemp += 10;
      if (low < 20) {
        low = 20;
      }
    }

  }
  final = new Array(avgTemp, high, low, pressure, atmComp, oneDay);
  }

  return final;
}

function fromAstroRadiiToKm(radii) {
  return radii * 12756;
}

function cloudsOrNot(atmComp) {
  let waterVapor = atmComp[2];
  if (waterVapor < 1) {
    return 0;
  }else if (waterVapor < 3) {
    return 10;
  }else if (waterVapor < 6) {
    return 30;
  }else {
    return 60;
  }
}

function layerFinder(layer) {
  if (layer == 2) {
    let randN = ((Math.random() * 100 ) + 1);
    if (randN < 20) {
      return "Copper";
    }else if (randN < 40) {
      return "Liquid Lead";
    }else if (randN < 60) {
      return "Nickel";
    }else if (randN < 80) {
      return "Titanium";
    }else {
      return "Carbon";
    }
  }else if (layer == 3) {
    let randN = ((Math.random() * 100 ) + 1);
    if (randN < 20) {
      return "Tungsten";
    }else if (randN < 40) {
      return "Copper";
    }else if (randN < 60) {
      return "Iridium";
    }else if (randN < 65) {
      return "Lead";
    }else if (randN < 80) {
      return "Silver";
    }else {
      return "Iron";
    }
  }else if (layer == 4) {
    let randN = ((Math.random() * 100 ) + 1);
    if (randN < 30) {
      return "Tungsten";
    }else if (randN < 40) {
      return "Lead";
    }else if (randN < 65) {
      return "Iridium";
    }else if (randN < 70) {
      return "Silver";
    }else {
      return "Iron";
    }
  }else if (layer == 5) {
    let randN = ((Math.random() * 100 ) + 1);
    if (randN < 25) {
      return "Tungsten";
    }else if (randN < 40) {
      return "Lead";
    }else if (randN < 60) {
      return "Iridium";
    }else if (randN < 75) {
      return "Silver";
    }else {
      return "Iron";
    }
  }
}
//Possible substances = Iron, Water, Ice, Silicon, Titanium, Tungsten, Iridium, Pressured Ice, Nickel, Silver, Copper, Carbon
//NEW SUBSTANCES: Liquid Hydrogen, Liquid Helium, Liquid Lead, Lead, Liquid Nickel, Liquid Silicon, Liquid Carbon, Liquid Iron

function planetComposition(planetType, atmComp, planetRadius) {
  let comp = new Array();
  let crust = new Array();
  let crustPercents = new Array();
  let crustDists = new Array();
  let kmRad = fromAstroRadiiToKm(planetRadius);

  let numOfLayers = Math.floor(Math.random()*3)+3;
  let subPercents = new Array();
  let subDists = new Array();
  if (planetType == "Ocean Planet") {
    let maxDist = 500
    let maxPercent = maxDist / kmRad;
    let r = ((Math.random() * 70)+ 30) / 100
    crustPercents[0] = maxPercent * r;
    crustDists[0] = crustPercents[0] * kmRad;
    crust[0] = "Liquid Water";
  }else {
    let maxPercent = 0.25;
    let r = ((Math.random() * 60)+ 40) / 100
    crustPercents[0] = maxPercent * r;
    crustDists[0] = crustPercents[0] * kmRad;
    if (planetType == "Carbon Planet") {
      crust[0] = "Carbon";
    }else if (planetType == "Silicon Planet") {
      crust[0] = "Silicon";
    }else if (planetType == "Iron Planet") {
      crust[0] = "Iron";
    }else if (planetType == "Ice Planet") {
      crust[0] = "Ice";
    }else if (planetType == "Hot Jupiter" || planetType == "Gas Planet") {
      crust[0] = "Liquid Hydrogen";
    }else if (planetType == "Lava Planet") {
      let randN = (Math.random()*100)+1;
      if (randN < 30) {
        crust[0] = "Liquid Lead";
      }else if (randN < 60) {
        crust[0] = "Liquid Nickel";
      }else if (randN < 80) {
        crust[0] = "Liquid Silicon";
      }else if (randN < 90) {
        crust[0] = "Liquid Carbon";
      }else {
        crust[0] = "Liquid Iron";
      }
    }
  }

  let maxPercent = 0.50;
  let r = ((Math.random() * 70)+ 30) / 100
  crustPercents[1] = maxPercent * r;
  crustDists[1] = crustPercents[1] * kmRad;

  if (planetType == "Ocean Planet") {
    let randN = (Math.random() * 100)+1;
    if (randN < 60) {
      crust[1] = "Pressured Ice";
    }else {
      crust[1] = layerFinder(2);
    }
  }else if (planetType == "Gas Planet" || planetType == "Hot Jupiter") {
    crust[1] = "Liquid Helium";
  }else {
    let lyr = "";
    do {
      lyr = layerFinder(2);
    }while (lyr == crust[0]);
    crust[1] = lyr;
  }

  if (planetType == "Gas Planet" || planetType == "Hot Jupiter") {
    let randN = (Math.random() * 100) + 1;
    let lyr = "";
    do {
      lyr = layerFinder(3);
    }while (lyr == crust[0] || lyr == crust[1]);
    crust[2] = lyr;
      crustPercents[2] = 1 - (crustPercents[0] + crustPercents[1]);
  }else {
    if (numOfLayers == 3) {
      crustPercents[2] = 1 - (crustPercents[1] + crustPercents[0]);
      let lyr = "";
      do {
        lyr = layerFinder(3);
      }while (lyr == crust[0] || lyr == crust[1]);
      crust[2] = lyr;
    }else if (numOfLayers == 4) {
      let percentLeft = 1- (crustPercents[1] + crustPercents[0]);
      let randN = ((Math.random() * 40) + 20)/100;
      crustPercents[2] = percentLeft * randN;
      let lyr = "";
      do {
        lyr = layerFinder(3);
      }while (lyr == crust[0] || lyr == crust[1]);
      crust[2] = lyr;
      crustPercents[3] = 1- (crustPercents[1] + crustPercents[0] + crustPercents[2]);
      lyr = "";
      do {
        lyr = layerFinder(4);
      }while (lyr == crust[0] || lyr == crust[1] || lyr == crust[2]);
      crust[3] = lyr;
    }else {
      let percentLeft = 1- (crustPercents[1] + crustPercents[0]);
      let randN = ((Math.random() * 40) + 20)/100;
      crustPercents[2] = percentLeft * randN;
      let lyr = "";
      do {
        lyr = layerFinder(3);
      }while (lyr == crust[0] || lyr == crust[1]);
      crust[2] = lyr;
      percentLeft = 1- (crustPercents[1] + crustPercents[0]+crustPercents[2]);

      randN = ((Math.random() * 40) + 20)/100;
      crustPercents[3] = percentLeft * randN;
      lyr = "";
      do {
        lyr = layerFinder(4);
      }while (lyr == crust[0] || lyr == crust[1] || lyr == crust[2]);
      crust[3] = lyr;

      crustPercents[4] = 1-(crustPercents[1] + crustPercents[0]+crustPercents[2]+crustPercents[3]);
      lyr = "";
      do {
        lyr = layerFinder(5);
      }while (lyr == crust[0] || lyr == crust[1] || lyr == crust[2] || lyr == crust[3]);
      crust[4] = lyr;
    }
  }


  for (let i = 0; i < crustPercents.length; i++) {
    crustDists[i] = crustPercents[i] * kmRad;
  }
  return new Array(crust, crustDists, crustPercents);



}//Possible substances = Iron, Water, Ice, Silicon, Titanium, Tungsten, Iridium, Pressured Ice, Nickel, Silver, Copper, Carbon
//NEW SUBSTANCES: Liquid Hydrogen, Liquid Helium, Liquid Lead, Lead, Liquid Nickel, Liquid Silicon, Liquid Carbon, Liquid Iron
/*function planetCompositionOLD(planetType, atmComp, planetRadius) {
  let comp = new Array();
  let crust = new Array();
  let crustPercents = new Array();
  let crustDists = new Array();
  let kmRad = fromAstroRadiiToKm(planetRadius);

  if (planetType == "Ocean Planet") {
    let crustSub = new Array("Liquid Water", "Pressured Ice", "");
    let randN = (Math.random() * 100) +1;
    if (randN < 20) {
      crustSub[2] = "Iron";
    }else if (randN < 35) {
      crustSub[2] = "Silicon";
    }else if (randN < 70) {
      crustSub[2] = "Pressured Ice";
    }else if (randN < 75) {
      crustSub[2] = "Titanium";
    }else if (randN < 88) {
      crustSub[2] = "Nickel";
    }else if (randN < 97) {
      crustSub[2] = "Copper";
    }else {
      crustSub[2] = "Silver"
    }

    let crustDistSub = new Array(0,0,0,0);
    crustDistSub[0] = Math.floor((Math.random() * 400) + 400 );
    let percentTop = crustDistSub[0] / kmRad;
    let percentNext = (Math.random() * 0.4) + 0.4;
    crustDistSub[1] = kmRad * percentNext;
    let percentLast = (1-(percentTop+percentNext));
    crustDistSub[2] = percentLast * kmRad


    let chosenThickness = 0;
    randN = (Math.random() * 100) +1;
    if (randN < 20) {
      crustSub[3] = "Tungsten";
      let maxN = percentLast/1.5;
      let minN = percentLast/6;
      chosenThickness = Math.floor( 100*(Math.random() * maxN-minN) + minN )/100

      crustDistSub[3] = chosenThickness * kmRad;
      crustDistSub[2] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }else if (randN < 40) {
      crustSub[3] = "Iridium";
      let maxN = percentLast/1.5;
      let minN = percentLast/6;
      chosenThickness = Math.floor( 100*(Math.random() * maxN-minN) + minN )/100

      crustDistSub[3] = chosenThickness * kmRad;
      crustDistSub[2] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }else {
      //Do nothing, absolutely nothing...
    }
    if (chosenThickness==0) {
      crustPercents =  new Array(percentTop, percentNext, percentLast);
    }else {
      crustPercents =  new Array(percentTop, percentNext, percentLast, chosenThickness);
    }


    crustDists = crustDistSub;
    crust = crustSub;
  }else if (planetType == "Ice Planet") {
    let crustSub = new Array("Ice", "", "");
    let randN = (Math.random() * 100) +1;
    if (randN < 20) {
      crustSub[1] = "Nickel";
    }else if (randN < 35) {
      crustSub[1] = "Silicon";
    }else if (randN < 60) {
      crustSub[1] = "Pressured Ice";
    }else if (randN < 80) {
      crustSub[1] = "Titanium";
    }else {
      crustSub[1] = "Liquid Water";
      randN = (Math.random() * 100) +1;
      if (randN < 30) {
        crustSub[2] = "Titanium";
      }else if (randN < 70) {
        crustSub[2] = "Iron";
      }else {
        crustSub[2] = "Nickel";
      }
    }


    let crustDistSub = new Array(0,0,0);
    crustDistSub[0] = Math.floor((Math.random() * 1500) + 300 );
    let percentTop = crustDistSub[0] / kmRad;

    let percentNext = 1-percentTop//(Math.floor(100 * (Math.random() * 0.4) + 0.4)/100);
    crustDistSub[1] = kmRad * percentNext;



    let chosenThickness = 0;
    randN = (Math.random() * 100) +1;
    if (randN < 20) {
      crustSub[2] = "Tungsten";
      let maxN = percentNext/1.5;
      let minN = percentNext/6;
      chosenThickness =  (Math.random() * maxN-minN) + minN

      crustDistSub[2] = chosenThickness * kmRad;
      crustDistSub[1] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }else if (randN < 40) {
      crustSub[2] = "Iridium";
      let maxN = percentNext/1.5;
      let minN = percentNext/6;
      chosenThickness = (Math.random() * maxN-minN) + minN

      crustDistSub[2] = chosenThickness * kmRad;
      crustDistSub[1] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }else if (randN < 80) {
      crustSub[2] = "Iron";
      let maxN = percentNext/1.5;
      let minN = percentNext/6;
      chosenThickness = (Math.random() * maxN-minN) + minN

      crustDistSub[2] = chosenThickness * kmRad;
      crustDistSub[1] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }else {
      crustSub[2] = "Copper";
      let maxN = percentNext/1.5;
      let minN = percentNext/6;
      chosenThickness = (Math.random() * maxN-minN) + minN

      crustDistSub[2] = chosenThickness * kmRad;
      crustDistSub[1] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }
      crustPercents =  new Array(percentTop, percentNext, chosenThickness);



    crustDists = crustDistSub;
    crust = crustSub;
  }else if (planetType == "Carbon Planet") {
    let crustSub = new Array("Carbon", "", "");
    let randN = (Math.random() * 100) +1;
    if (randN < 20) {
      crustSub[1] = "Nickel";
    }else if (randN < 35) {
      crustSub[1] = "Carbon";
    }else if (randN < 60) {
      crustSub[1] = "Pressured Ice";
    }else if (randN < 80) {
      crustSub[1] = "Titanium";
    }else {
      crustSub[1] = "Copper";
    }


    let crustDistSub = new Array(0,0,0);
    crustDistSub[0] = kmRad*((Math.random() * 0.4) + 0.2) ;
    let percentTop = crustDistSub[0] / kmRad;
    let percentNext = 1-percentTop//(Math.floor(100 * (Math.random() * 0.4) + 0.4)/100);
    crustDistSub[1] = kmRad * percentNext;



    let chosenThickness = 0;
    randN = (Math.random() * 100) +1;
    if (randN < 20) {
      crustSub[2] = "Tungsten";
      let maxN = percentNext/1.5;
      let minN = percentNext/6;
      chosenThickness = Math.floor( 100*(Math.random() * maxN-minN) + minN )/100

      crustDistSub[2] = chosenThickness * kmRad;
      crustDistSub[1] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }else if (randN < 40) {
      crustSub[2] = "Iridium";
      let maxN = percentNext/1.5;
      let minN = percentNext/6;
      chosenThickness = Math.floor( 100*(Math.random() * maxN-minN) + minN )/100

      crustDistSub[2] = chosenThickness * kmRad;
      crustDistSub[1] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }else if (randN < 80) {
      crustSub[2] = "Iron";
      let maxN = percentNext/1.5;
      let minN = percentNext/6;
      chosenThickness = Math.floor( 100*(Math.random() * maxN-minN) + minN )/100

      crustDistSub[2] = chosenThickness * kmRad;
      crustDistSub[1] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }else {
      crustSub[2] = "Silver";
      let maxN = percentNext/1.5;
      let minN = percentNext/6;
      chosenThickness = Math.floor( 100*(Math.random() * maxN-minN) + minN )/100

      crustDistSub[2] = chosenThickness * kmRad;
      crustDistSub[1] -= chosenThickness * kmRad;
      crustPercents.push(chosenThickness);
    }
      crustPercents =  new Array(percentTop, percentNext, chosenThickness);



    crustDists = crustDistSub;
    crust = crustSub;
  }

  comp = new Array(crust, crustDists, crustPercents);
  return comp;
}*/



function planetaryZones(starRadius, starLumen) {
  let zones = new Array();
  let a = 0;
  if (starLumen < 0.01) {
    a = Math.round(100*Math.sqrt(starLumen))/100;
  }else if (starLumen < 50) {
    a = Math.round(100*Math.sqrt(starLumen))/100;
  }else {
    a = Math.round(100*Math.sqrt(starLumen))/100;
  }

  let noZone = Math.floor(10000*((432 * starRadius) / 92955) * a)/10000;
  let base0 = noZone
  let base1 = noZone * 1.1
  let base1End = 0.4 * a
  let base2End = 0.9 * a
  let base2S = 1.1 * a
  let base3End = 1.8 * a
  let base4End = 2.8 * a
  let base5End = 10 * a
  let base6End = 40 * a
  zones = new Array(base0, base1, base1End, base2End, base2S, base3End, base4End, base5End, base6End, a); // 10 valz

  return zones;
}

function orbitDistance(sizeType, zones) {
  if (sizeType == "Ocean Planet") {
    let distRange = new Array(zones[3],zones[4]);
    let randDist = Math.floor(10000*((Math.random() * (distRange[1]-distRange[0])) + distRange[0]))/10000;
    return randDist;
  }else if (sizeType == "Carbon Planet") {
    let distRange = new Array(zones[2],zones[7]);
    let randDist = Math.floor(10000*((Math.random() * (distRange[1]-distRange[0])) + distRange[0]))/10000;
    return randDist;
  }else if (sizeType == "Silicon Planet") {
    let distRange = new Array(zones[2],zones[7]);
    let randDist = Math.floor(10000*((Math.random() * (distRange[1]-distRange[0])) + distRange[0]))/10000;
    return randDist;
  }else if (sizeType == "Ice Planet") {
    let distRange = new Array(zones[5],zones[8]);
    let randDist = Math.floor(10000*((Math.random() * (distRange[1]-distRange[0])) + distRange[0]))/10000;
    return randDist;
  }else if (sizeType == "Lava Planet") {
    let distRange = new Array(zones[0],zones[1]);
    let randDist = Math.floor(10000*((Math.random() * (distRange[1]-distRange[0])) + distRange[0]))/10000;
    return randDist;
  }else if (sizeType == "Gas Planet") {
    let distRange = new Array(zones[3],zones[7]);
    let randDist = Math.floor(10000*((Math.random() * (distRange[1]-distRange[0])) + distRange[0]))/10000;
    return randDist;
  }else if (sizeType == "Hot Jupiter") {
    let distRange = new Array(zones[1],zones[2]);
    let randDist = Math.floor(10000*((Math.random() * (distRange[1]-distRange[0])) + distRange[0]))/10000;
    return randDist;
  }else if (sizeType == "Iron Planet") {
    let distRange = new Array(zones[2],zones[8]);
    let randDist = Math.floor(10000*((Math.random() * (distRange[1]-distRange[0])) + distRange[0]))/10000;
    return randDist;
  }
}

function windSpeed(high, low, pressure) {
  let final = new Array();
  let avgSpeed = 0;
  let highSpeed = 0;
  let difference = high - low;
  if (pressure == 0) {
    avgSpeed = 0;
    highSpeed = 0;
  }else if (pressure < 0.4) {
    avgSpeed = Math.floor(difference / (3 + (((Math.random() * 10)-5)/10)));
    highSpeed = Math.floor(avgSpeed * ((Math.random() * 10)+15)/10);
  }else if (pressure < 0.9) {
    avgSpeed = Math.floor(difference / (2.5 + (((Math.random() * 10)-5)/10)));
    highSpeed = Math.floor(avgSpeed * ((Math.random() * 10)+15)/10);
  }else if (pressure < 1.6) {
    avgSpeed = Math.floor(difference / (2 + (((Math.random() * 10)-5)/10)));
    highSpeed = Math.floor(avgSpeed * ((Math.random() * 10)+15)/10);
  }else if (pressure < 4) {
    avgSpeed = Math.floor(difference / (2.3 + (((Math.random() * 10)-5)/10)));
    highSpeed = Math.floor(avgSpeed * ((Math.random() * 10)+15)/10);
  }else {

    avgSpeed = Math.floor(difference / (2.4 + (((Math.random() * 10)-5)/10)));
    highSpeed = Math.floor(avgSpeed * ((Math.random() * 10)+15)/10);
  }
  final = new Array(avgSpeed, highSpeed);

  return final;
}

function planetColor(temp, atmComp, compType) {
  //Just for reference c:
  let final = new Array(
    new Array(0,0,0),
    new Array(0,0,0),
    new Array(0,0,0),
    new Array(0,0,0),
    new Array(0,0,0)
  );
  /*let possibleGases = new Array(
    25, //Methane
    1,  //CO2
    10, //Water vapor
    0,  //Oxygen
    0,  //Nitrogen
    0,  //Neon
    0,  //Hydrogen
    0   //Helium
  );*/
  if (compType == "Ocean Planet") {
    let color = new Array(28 + (Math.floor( (Math.random() * 15) - 5)),
    72 + (Math.floor( (Math.random() * 18) - 7)),
    218 - (Math.floor( (Math.random() * 12) - 4)));
    final[0] = color;
  }else if (compType == "Lava Planet") {
    let color = new Array(218 - (Math.floor( (Math.random() * 12) - 4)),
    52 + (Math.floor( (Math.random() * 14) - 7)),
    40 + (Math.floor( (Math.random() * 12) - 5)));
    final[0] = color;
  }else if (compType == "Gas Planet") {

    if (atmComp[3] +atmComp[4] > 60) {
      final[0] = new Array(94,131,235);
      final[3] = new Array(129,162,255);
      final[4] = new Array(38,72,165);
    }else {

      final[0] = new Array(218,162,52);
      final[3] = new Array(240,190,90);
      final[4] = new Array(160,90,20);
    }

  }else if (compType == "Hot Jupiter") {
    let color = new Array(218 - (Math.floor( (Math.random() * 12) - 4)),
    96 + (Math.floor( (Math.random() * 14) - 7)),
    52 + (Math.floor( (Math.random() * 12) - 5)));
    final[0] = color;
    final[3] = new Array(249, 96, 79);
    final[4] = new Array(171, 32, 17);
  }else if (compType == "Iron Planet") {
    let color = new Array(135 + (Math.floor( (Math.random() * 15) - 5)),
    147 + (Math.floor( (Math.random() * 18) - 7)),
    174 - (Math.floor( (Math.random() * 12) - 4)));
    final[0] = color;
  }else if (compType == "Silicon Planet") {
    let color = new Array(166 + (Math.floor( (Math.random() * 15) - 5)),
    147 + (Math.floor( (Math.random() * 18) - 7)),
    135 - (Math.floor( (Math.random() * 12) - 4)));
    final[0] = color;
  }else if (compType == "Carbon Planet") {//rgb(92,83,83)
    let color = new Array(92 + (Math.floor( (Math.random() * 15) - 5)),
    83 + (Math.floor( (Math.random() * 18) - 7)),
    83 - (Math.floor( (Math.random() * 12) - 4)));
    final[0] = color;
  }else if (compType == "Ice Planet") {
    let color = new Array(141 + (Math.floor( (Math.random() * 15) - 5)),
    229 + (Math.floor( (Math.random() * 12) - 7)),
    229 - (Math.floor( (Math.random() * 10) - 4)));
    final[0] = color;
  }

  final[1] = new Array(
    final[0][0] + 15,
    final[0][1] + 15,
    final[0][2] + 15,
  );
  if (final[1][0] > 255) {
    final[1][0] = 255;
  }
  if (final[1][1] > 255) {
    final[1][1] = 255;
  }
  if (final[1][2] > 255) {
    final[1][2] = 255;
  }

  final[2] = new Array(
    final[0][0] - 15,
    final[0][1] - 15,
    final[0][2] - 15,
  );
  if (final[2][0] < 0) {
    final[2][0] = 0;
  }
  if (final[2][1] < 0) {
    final[2][1] = 0;
  }
  if (final[2][2] < 0) {
    final[2][2] = 0;
  }

  return final;
}

function planetCompositionType1(size) {
 // 0 = Water; 1 = Oxygen; 2 = CO2; 3 = Nitrogen; 4 = Helium; 5 = Iron; 6 = Rocky Compounds; 7 = Heavy Metals
 let compType = "";
  if (size < 1.9) {
    let chance = Math.floor(Math.random()*99) + 1;
    if (chance <= 15) {
      compType = "Ocean Planet"; //90% or more covered by water;
      planetCompTypeCollection.ocean++;
    }else if (chance <= 35) {
      compType = "Carbon Planet" //Oxygen Poor, Carbon Rich
      planetCompTypeCollection.carbon++;
    }else if (chance <= 70) {
      compType = "Silicon Planet" //Many Silicon Rocks
      planetCompTypeCollection.silicate++;
    }else if (chance <= 80) {
      compType = "Ice Planet" //Frozen Ocean World
      planetCompTypeCollection.ice++;
    }else if (chance <= 90) {
      compType = "Lava Planet" // Molten crust.
      planetCompTypeCollection.lava++;
    }else if (chance <= 91) {
      compType = "Gas Planet" // Mosty H or He
      planetCompTypeCollection.gas++;
    }else {
      compType = "Iron Planet" // Mostly just an Iron core
      planetCompTypeCollection.iron++;
    }
  }else if (size < 4.1) {
    let chance = Math.floor(Math.random()*99) + 1;
    if (chance <= 8) {
      compType = "Ocean Planet"; //90% or more covered by water;
      planetCompTypeCollection.ocean++;
    }else if (chance <= 15) {
      compType = "Carbon Planet" //Oxygen Poor, Carbon Rich
      planetCompTypeCollection.carbon++;
    }else if (chance <= 24) {
      compType = "Silicon Planet" //Many Silicon Rocks
      planetCompTypeCollection.silicate++;
    }else if (chance <= 30) {
      compType = "Ice Planet" //Frozen Ocean World
      planetCompTypeCollection.ice++;
    }else if (chance <= 34) {
      compType = "Lava Planet" // Molten crust.
      planetCompTypeCollection.lava++;
    }else if (chance <= 87) {
      compType = "Gas Planet" // Mosty H or He
      planetCompTypeCollection.gas++;
    }else {
      compType = "Iron Planet" // Mostly just an Iron core
      planetCompTypeCollection.iron++;
    }
  }else if (size < 7.5) {
    let chance = Math.floor(Math.random()*99) + 1;
    if (chance <= 3) {
      compType = "Ocean Planet"; //90% or more covered by water;
      planetCompTypeCollection.ocean++;
    }else if (chance <= 4) {
      compType = "Carbon Planet" //Oxygen Poor, Carbon Rich
      planetCompTypeCollection.carbon++;
    }else if (chance <= 5) {
      compType = "Silicon Planet" //Many Silicon Rocks
      planetCompTypeCollection.silicate++;
    }else if (chance <= 8) {
      compType = "Ice Planet" //Frozen Ocean World
      planetCompTypeCollection.ice++;
    }else if (chance <= 10) {
      compType = "Lava Planet" // Molten crust.
      planetCompTypeCollection.lava++;
    }else if (chance <= 11) {
      compType = "Iron Planet" // Mostly just an Iron core
      planetCompTypeCollection.iron++;
    }else if (chance <= 35) {
      compType = "Hot Jupiter" //... a hot... jupiter...
      planetCompTypeCollection.gas++;
    }else {
      compType = "Gas Planet" // Mostly H or He
      planetCompTypeCollection.gas++;
    }
  }else {
    let chance = Math.floor(Math.random()*99) + 1;
    if (chance <= 2) {
      compType = "Ocean Planet"; //90% or more covered by water;
    }else if (chance <= 4) {
      compType = "Ice Planet" //Frozen Ocean World
    }else if (chance <= 50) {
      compType = "Hot Jupiter" // ... a hot... jupiter...
    }else {
      compType = "Gas Planet" // Mostly H or He
      planetCompTypeCollection.gas++;
    }
  }
  return compType;
}

function descriptPlanet(sizeType, size, compType, name) {
  let starts = new Array(
    new Array("Here is the planet ", ". It is a ","d planet by size. It is called a "," because of its composition."),
    new Array("Here we have ",", which is a ","d planet by size. Because of its composition, it is called a ","."),
    new Array("This is ",". It is a ","d planet. Due to its composition, it is called a ",".")
  );
  let chosenStart = starts[Math.floor((Math.random() * starts.length))];
  let finalOutput = "";
  finalOutput = new Array(chosenStart[0] + name + chosenStart[1] + sizeType + chosenStart[2] + compType + chosenStart[3]);
  if (sizeType == "Mars Size") {
    let explanation = "Mars sized planets are surprisingly rare in the universe. The ones that exist are ussually not gaseous."
    finalOutput.push(explanation);
  }else if (sizeType == "Earth Size") {
    let explanation = "Earth Sized planets are more common than Mars sized ones, yet still somewhat rare. They ussually have a core and a mantle and a solid crust, or in some cases covered almost completely in water.";
    finalOutput.push(explanation);
  }else if (sizeType == "Super-Earth Size") {
    let explanation = "Super-Earths are larger than Earth, but smaller than gas giants. These planets are in the sweet range of sizes, where they could have the properties of rocky or ocean planets, as well as gasy planets";
    finalOutput.push(explanation);
  }else if (sizeType == "Sub-Neptune Size") {
    let explanation = "Sub-Neptune Sized planets tend to be gasy, but could still be theoretically be rocky or liquid. They are much larger than Earth, about 2x as wide. Because they are ussually made up of mostly gas, they can have extreme weather conditions like wind speeds > 600mph.";
    finalOutput.push(explanation);
  }else if (sizeType == "Neptune Size") {
    let explanation = "At this point, we are heading towards the big planets. The bigger a planet is, the larger the chance that it will be gaseous. At this point, most of the planets are made up of mostly H or He.";
    finalOutput.push(explanation);
  }else if (sizeType == "Sub-Jupiter Size") {
    let explanation = "These planets are massive, but still smaller than Jupiter. Almost all of them have a substantial amount of Hydrogen or Helium gas.";
    finalOutput.push(explanation);
  }else if (sizeType == "Jupiter Size") {
    let explanation = "These planets are about the size of Jupiter. Many planets like this one orbit very close to their stars, making them very very hot. These are called Hot Jupiters, and can have some of the most fascinating weather, like lava rain or wind speeds faster than the speed of sound.";
    finalOutput.push(explanation);
  }else {
    let explanation = "This class of sizes are the most massive. Basically all of them are made up of mostly Hydrogen and Helium gas. If a planet grows larger than this, it will be called a Brown Dwarf, or a failed star.";
    finalOutput.push(explanation);
  }
  if (compType == "Ocean Planet") {
    let explanation = "Ocean planets like this one have a huge ocean covering most of if not the entire surface of the planet. Sometimes, these planets have cores or not rock, but ice. This ice forms not because the water freezes, but because the weight of water above it essentially crushes the water into a special ice.";
    finalOutput.push(explanation);
  }else if (compType == "Iron Planet") {
    let explanation = "Iron Planets are like what they sound: Planets that are made of mostly iron. They have huge cores of solid (sometimes liquid) iron and are typically small. Other than that, they behave like any other terrestrial planet (a rocky planet similar to Earth)";
    finalOutput.push(explanation);
  }else if (compType == "Carbon Planet") {
    let explanation = "Carbon Planets have a large concentration of carbon spread throughout the planet. They are typically small and rocky, and because of the large carbon composition, may support life with the help of liquid water.";
    finalOutput.push(explanation);
  }else if (compType == "Silicon Planet") {
    let explanation = "Silicon Planets have lots of silicate within them. They are small and rocky with a thick crust. They can look similar to Earth if they have liquid water on them.";

    finalOutput.push(explanation);
  }
  return finalOutput;
}

function planetCreatorSimple(name, rad, lumen) {
  let allPlanets = new Array();
  let numOfPlanets = Math.floor(Math.random()*7)+1;
  for (let i = 0; i < numOfPlanets; i++) {
    let holder = planetSize();
    let currentPlanet = {
      name: name+" - "+(i+1),
      size: holder[0],
      sizeType: holder[1],
      description: new Array(),
      composition: "",
      crustComp: new Array(),
      crustCompPercents: new Array(),
      crustCompDists: new Array(),
      avgTemp: 0,
      highTemp: 0,
      lowTemp: 0,
      pressure: 0,
      atmComp: new Array(0,0,0,0,0,0,0),
      oneDay: 0,
      orbitDist: 0,
      windAvg: 0,
      windMax: 0,
      color: new Array()
    };
    let curZones = planetaryZones(rad,lumen);
    currentPlanet.orbitDist = orbitDistance(currentPlanet.sizeType, curZones);
    currentPlanet.description = descriptPlanet(currentPlanet.sizeType, currentPlanet.sizeType, currentPlanet.composition, currentPlanet.name);

    currentPlanet.composition = planetCompositionType1(currentPlanet.size);
    holder = planetTempAndAtm(currentPlanet.composition, currentPlanet.orbitDist, curZones);
    currentPlanet.avgTemp = holder[0];
    currentPlanet.highTemp = holder[1];
    currentPlanet.lowTemp = holder[2];
    currentPlanet.pressure = holder[3];
    currentPlanet.atmComp = holder[4];
    currentPlanet.oneDay = holder[5];
    holder = windSpeed(currentPlanet.highTemp, currentPlanet.lowTemp, currentPlanet.pressure);
    currentPlanet.windAvg = holder[0];
    currentPlanet.windMax = holder[1];
    currentPlanet.color = planetColor(currentPlanet.avgTemp, currentPlanet.atmComp, currentPlanet.composition);
    holder = planetComposition(currentPlanet.composition, currentPlanet.atmComp, currentPlanet.size);
    currentPlanet.crustComp = holder[0];
    currentPlanet.crustCompDists = holder[1];
    currentPlanet.crustCompPercents = holder[2];
    allPlanets.push(currentPlanet);
  }
  return allPlanets;
}




//STAR FUNCTIONS




function starClass() {
  let randomNumber = Math.floor((Math.random() * 999) + 1)
  if (randomNumber <= 10) {
    starTypeCollection.o ++;
    return "O";
  }else if (randomNumber <= 25) {
    starTypeCollection.b ++;
    return "B";
  }else if (randomNumber <= 60){
    starTypeCollection.a ++;
    return "A";
  }else if (randomNumber <= 110){
    starTypeCollection.f ++;
    return "F";
  }else if (randomNumber <= 250){
    starTypeCollection.g ++;
    return "G";
  }else if (randomNumber <= 425){
    starTypeCollection.k ++;
    return "K";
  }else if (randomNumber <= 1000){
    starTypeCollection.m ++;
    return "M";
  }
}

function nameGiver() {
  let prefixes = new Array("SCP-","TJ-","SAG-","OO-","NEX-","U-","STR-");
  let chosenPrefix = Math.floor(Math.random() * (prefixes.length));
  let fullName = prefixes[chosenPrefix] + Math.floor(nameNum * ((Math.random() * 4) +2));
  nameNum += 3;
  return fullName;
}

function starSizeAndType(type, light) { //in solar radii, solar mass
  let size = new Array(0.0, 0.0, "");
  if (type == "M") {
    if (light >= 4) {
      let starSize = Math.floor((Math.random() * 300) + 100);
      size[0] = starSize;
      size[1] = Math.floor((((starSize - 100) / 300) * 30) + 10) +(Math.floor((Math.random() * 4) - 2) / 10);
      size[2] = "Red Supergiant";
      starSizeTypeCollection.redSuperGiants ++;
    }else if (light >= 1.5) {
      let starSize = Math.floor((Math.random() * 100) + 100) + (Math.floor((Math.random() * 4) - 2) / 10);
      size[0] = starSize;
      size[1] = Math.floor((((starSize - 100) / 100) * 7.7) + 2) +(Math.floor((Math.random() * 4) - 1) / 10);
      size[2] = "Red Giant";
      starSizeTypeCollection.redGiants ++;
    }else {
      let starSize = Math.floor(1000 * (Math.random() * 0.37)+0.08)/1000;
      size[1] = starSize;
      size[0] = starSize + 0.25;
      size[2] = "Red Dwarf"
      starSizeTypeCollection.redDwarfs ++;
    }
  }else if (type == "K") {
    if (light >= 4) {
      let starSize = Math.floor((Math.random() * 300) + 100);
      size[0] = starSize;
      size[1] = Math.floor((((starSize - 100) / 300) * 30) + 10) +(Math.floor((Math.random() * 4) - 2) / 10);
      size[2] = "Red Supergiant";
      starSizeTypeCollection.redSuperGiants ++;
    }else if (light >= 1.5) {
      let starSize = Math.floor((Math.random() * 90) + 10) + (Math.floor((Math.random() * 4) - 2) / 10);
      size[0] = starSize;
      size[1] = Math.floor(10 * (((starSize - 10) / 90) * 7.7) + 1)/10 +(Math.floor((Math.random() * 4) - 0) / 10);
      size[2] = "Red Giant";
      starSizeTypeCollection.redGiants ++;
    }else {
      let starSize = Math.floor(100 * ((Math.random() * 0.26)+0.7))/100;
      size[0] = starSize;
      size[1] = starSize - 0.2;
      size[2] = "Main Sequence"
      starSizeTypeCollection.mainSequence ++;
    }
  }else if (type == "G") {
    let starSize = Math.floor(100 * ((Math.random() * 0.19)+0.96))/100;
    size[0] = starSize;
    size[1] = starSize + Math.floor(100 * ((Math.random() * 0.24) - 0.12)) / 100;
    size[2] = "Main Sequence"
    starSizeTypeCollection.mainSequence ++;
  }else if (type == "F") {
    let starSize = Math.floor(100 * ((Math.random() * 0.25)+1.15))/100;
    size[0] = starSize;
    size[1] = starSize - 0.03;
    size[2] = "Main Sequence"
    starSizeTypeCollection.mainSequence ++;
  }else if (type == "A") {
    let starSize = Math.floor(10 * ((Math.random() * 0.4)+1.4))/10;
    size[0] = starSize;
    size[1] = starSize + 0.2;
    size[2] = "Main Sequence"
    starSizeTypeCollection.mainSequence ++;
  }else if (type == "B") {
    if (light >= 4) {
      let starSize = Math.floor(10 * ((Math.random() * 20)+5))/10;
      size[0] = starSize;
      size[1] = starSize * 2.1;
      size[2] = "Blue Giant"
      starSizeTypeCollection.blueGiants ++;
    }else if (light >= 1) {
      let starSize = Math.floor(10 * ((Math.random() * 4.8)+1.8))/10;
      size[0] = starSize;
      size[1] = Math.floor(10 * ((((starSize - 1.8) / 4.8) * 6) + 2.1)) /10;
      size[2] = "Main Sequence"
      starSizeTypeCollection.mainSequence ++;
    }else {
      let starSize = Math.floor(10000 * ((Math.random() * 0.012)+.008))/10000;
      size[0] = starSize;
      size[1] = Math.floor(100 * ((((starSize - 0.008) / 0.012) * 0.6) + 0.3)) /100;
      size[2] = "White Dwarf"
      starSizeTypeCollection.whiteDwarfs ++;
    }
  }else if (type == "O") {
    if (light >= 1) {
      let starSize = Math.floor(10 * ((Math.random() * 13.4)+6.6))/10;
      size[0] = starSize;
      size[1] = Math.floor(10 * ((((starSize - 6.6) / 13.4) * 8) + 6)) /10;
      size[2] = "Main Sequence"
      starSizeTypeCollection.mainSequence ++;
    }else {
      let starSize = Math.floor(10000 * ((Math.random() * 0.012)+.008))/10000;
      size[0] = starSize;
      size[1] = Math.floor(100 * ((((starSize - 0.008) / 0.012) * 0.6) + 0.3)) /100;
      size[2] = "White Dwarf"
      starSizeTypeCollection.whiteDwarfs ++;
    }
  }
  size[0] = Math.floor(size[0] * 1000) / 1000;
  size[1] = Math.floor(size[1] * 1000) / 1000;
  return size;
}

function exponentToDecimal(exp) {//converts powers of ten into decimal
  if (exp < 0) {
    return Math.floor(1000000 * (10**(exp))) / 1000000;
  }else {
    return Math.floor(10 * (10**(exp))) / 10;
  }
}

function starBrightness(temp) { //in solar luminocity (powers of 10)
  if (temp <= 5){
    let chance = Math.floor((Math.random() * 199)+1);
    if (chance <= 3) {
      let brightness = Math.floor((Math.random() * 20)+40)/10;
      return brightness;
    }else if (chance <= 7) {
      let brightness = Math.floor((Math.random() * 20)+15)/10;
      return brightness;
    }else if (chance <= 200) {
      let brightness = (((temp - 3)/0.5) + -4)
      return brightness;
    }
  }else if (temp <= 7.5) {
    let brightness = (Math.floor((Math.random() * 8)-4)/10)
    return brightness;
  }else if (temp <= 10) {
    let brightness = (Math.floor((temp - 7.5)/.15) / 10) + (Math.floor((Math.random() * 6) - 3) / 10);
    return brightness;
  }else if (temp <= 15) {
    let chance = Math.floor((Math.random()*99)+1);
    if (chance <= 30) {
      let brightness = 5 + (Math.floor((Math.random() * 6) - 3) / 10);
      return brightness;
    }else {
      let brightness = 1.7 + (Math.floor((Math.random() * 6) - 3) / 10);
      return brightness;
    }
  }else if (temp <= 30) {
    let chance = Math.floor((Math.random()*99)+1);
    if (chance <= 70) {
      let brightness = 5 + (Math.floor((Math.random() * 6) - 3) / 10);
      return brightness;
    }else {
      let brightness = 2.1 + (Math.floor((Math.random() * 6) - 3) / 10);
      return brightness;
    }
  }else if (temp <= 50) {
    let chance = Math.floor((Math.random()*99)+1);
    if (chance <= 60) {
      let brightness = Math.floor((Math.random() * 20)-30)/10;
      return brightness;
    }else {
      let brightness = (((temp-10)/5)-2)+1 + (Math.floor((Math.random() * 6) - 3) / 10);
      return brightness;
    }
  }
}

function starTemp(type) { // in thousands of kelvin
  if (type === "O") {
    let temperature = Math.floor((Math.random() * 100)+300)/10;
    return temperature
  }else if (type === "B") {
    let temperature = Math.floor((Math.random() * 200)+100)/10;
    return temperature
  }else if (type === "A") {
    let temperature = Math.floor((Math.random() * 25)+75)/10;
    return temperature
  }else if (type === "F") {
    let temperature = Math.floor((Math.random() * 15)+60)/10;
    return temperature
  }else if (type === "G") {
    let temperature = Math.floor((Math.random() * 8)+52)/10;
    return temperature
  }else if (type === "K") {
    let temperature = Math.floor((Math.random() * 15)+37)/10;
    return temperature
  }else if (type === "M") {
    let temperature = Math.floor((Math.random() * 9)+28)/10;
    return temperature
  }
}

function starColor(temp) {//In rgb
  // red: rgb(245,50,0);
  //blue: rgb(20,155,225);
  if (temp > 30) {
    return new Array(60,255,255);
  }else if (temp >= 10) {
    return new Array(120,255,255);
  }else if (temp >= 7.5) {
    return new Array(180,255,255);
  }else if (temp >= 6) {
    return new Array(255,255,198);
  }else if (temp >= 5.2) {
    return new Array(255,218,91);
  }else if (temp >= 3.7) {
    return new Array(226,80,18);
  }else {
    return new Array(226,73,18);
  }
  /*let rbChange = Math.floor((temp - 2.4) / .211);
  let gChange = Math.floor(rbChange / 2.25);
  let rbgCode = "rgb("+(245-rbChange)+", "+(50+gChange)+", "+rbChange+");"
  return rbgCode;*/
}

function starDeathType(size) {
  if (size <= 0.6) {
    return "Shrink"
  }else if (size <= 4) {
    return "Red Giant"
  }else if (size <= 20) {
    return "Neutron Star"
  }else {
    return "Black Hole"
  }
}

function descriptStar(name, temp, deathType, sizeType, light, mass, radius) {
  let starts = new Array(
    new Array("Here is the system ", " with its parent star. It is classified as a "),
    new Array(""," is the system you have chosen. The parent star is a "),
    new Array(""," is indeed an interesting system. At the center lies a star, a "),
    new Array("Let's take a look at ",". The star at the center is a ")
  );
  let chosenStart = starts[Math.floor((Math.random() * starts.length))];
  let finalOutput = "";
  finalOutput = new Array(chosenStart[0] + name + chosenStart[1] + sizeType+". ");
  /////////////
  if (sizeType == "Main Sequence") {
    let explanation = "Main sequence stars are the majority of the stars that exist. They are the stars that are in the middle of their lifetime. Most of these are red dwarfs: tiny stars that are very dim, but live the longest. ";
    finalOutput.push(explanation);
  }else if (sizeType == "Red Giant") {
    let explanation = "Red Giants are the result of old medium sized stars. Once they run out of their main source of fuel (hydrogen), they start fusing helium. This releases tons of energy, causing the star to swell to tens of times its original size. ";
    finalOutput.push(explanation);
  }else if (sizeType == "Red Dwarf") {
    let explanation = "Red dwarfs make up the majority of main sequence stars. They burn cold and dim, but surprisingly long. They are tiny as well; any smaller and they will be too small to sustain fusion, the way stars produce light. ";
    finalOutput.push(explanation);
  }else if (sizeType == "Red Supergiant") {
    let explanation = "Red supergiants are absolute massive stars. They are the dying ends of large main sequence stars. They are the most luminous out of this star collection, and can reach abnoxious radii. ";
    finalOutput.push(explanation);
  }else if (sizeType == "Blue Giant") {
    let explanation = "Blue giants are very hot and very large stars that shine in blue, the hottest star color. They are the result of the largest main sequence stars beginning to fuse different elements. Blue giants burn hot but quick, turning into red supergiants toward the end of their lifetimes. ";
    finalOutput.push(explanation);
  }else if (sizeType == "White Dwarf") {
    let explanation = "White dwarfs are the left overs of main sequence stars that either grew into red giants, or simply withered away. They are extremely dense objects: they have the mass comparable to a star, while being only the size of a planet. White dwarfs don't fuse elements. Instead, they radiate their heat away very slowly in the form of light. ";
    finalOutput.push(explanation);
  }
  ////////////
  if (deathType == "Shrink") {
    let explanation = name+" is too small to die spectacularly. It will simply burn out over the course of hundreds or even thousands of billion of years. The result will be an incredibly small, but surprisingly hot and massive white dwarf star. ";
    finalOutput.push(explanation);
  }else if (deathType == "Red Giant") {
    let explanation = name+" is massive enough to start fusing helium once its supply of hyrogen runs out. Once that happens, the star will rapidly expand and become a red giant. At that point, its outerlayers will shed into space and only the tiny and compressed core will be left: a white dwarf. ";
    finalOutput.push(explanation);
  }else if (deathType == "Neutron Star") {
    let explanation = "This star has enough mass to die explosively. Once "+name+" runs out of fusable material, the star will implode on itslef and then bounce back in a way, exploding with the energy capable to outshine enitre galaxies. What's left is a neutron star, an object with the mass of our sun, but the size of a city. ";
    finalOutput.push(explanation);
  }else if (deathType == "Black Hole") {
    let explanation = "Once "+name+" dies, it will break space itself. After burning off its reserves of fuel, the star will implode on itself, compressing the core so tight that the atoms give way. The core collapses into a black hole: an object with bizzare properties like 0 volume and infinite density. The rest of the star explodes spectacularly in a supernova. ";
    finalOutput.push(explanation);
  }
  return finalOutput;
}

function starCreator() {
  var starStats = {
    name: "", //String
    class: "", // String
    description: "",
    mass: 0,  // In solar masses
    radius: 0,  // In solar radii
    color: "",  //In RGB
    deathType: "", //String
    luminocity: 0, //In powers of 10
    temperature: 0, //In Kelvin
    sizeType: "" //String
  };
  starStats.name = nameGiver();
  starStats.class = starClass();

  starStats.temperature = starTemp(starStats.class);
  starStats.color = starColor(starStats.temperature);
  starStats.luminocity = starBrightness(starStats.temperature);
  let holder = starSizeAndType(starStats.class, starStats.luminocity);
  starStats.radius = holder[0];
  starStats.mass = holder[1];
  starStats.sizeType = holder[2];
  if (holder[2] == "Blue Giant" || holder[2] == "Red Supergiant" || holder[2] == "White Dwarf" || holder[2] == "Red Giant") {
    interestingSystems.push(allSystems.length);
  }
  starStats.deathType = starDeathType(starStats.mass);
  starStats.description = descriptStar(starStats.name, starStats.temperature, starStats.deathType, starStats.sizeType,starStats.luminocity,starStats.mass, starStats.radius)
  return starStats;
}


//SETUP FUNCTIONS
function detailOne() {
  var starsAndPlanets = {
    star: starCreator()
  };
  allSystems.push(starsAndPlanets);
}

function detailTwo() {
  var starsAndPlanets = {
    star: starCreator(),
    planets: new Array()
  };
  starsAndPlanets.planets = planetCreatorSimple(starsAndPlanets.star.name, starsAndPlanets.star.radius, starsAndPlanets.star.luminocity);
  allSystems.push(starsAndPlanets);
}


//DRAWING FUNCTIONS
function drawOutStar(obj) {
  var ui = document.createElement("div");
  ui.classList.add("uiStar");
  let thicc = (obj.radius * 250);
  if (thicc < 100) {
    thicc = 100;
  }else if (thicc > 450) {
    thicc = 450;
  }
  ui.style.width = thicc + 'px';
  ui.style.height = thicc + 'px';
  ui.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+obj.name+"');");
  ui.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  let clr = obj.color;
  $(ui).css("background-color", "rgb("+clr[0]+", "+clr[1]+", "+clr[2]+")");
  var map = document.getElementById("map");
  while (map.firstChild) {
    map.firstChild.remove();
  }
  map.appendChild(ui);
  //Here comes experimental stuff o.o
  var flicker = document.createElement("div");
  flicker.classList.add("uiStar");
  flicker.classList.add("uiFlick");
  flicker.style.width = thicc + 'px';
  flicker.style.height = thicc + 'px';
  ui.appendChild(flicker);
  epilepsy(flicker, obj.temperature);

  var halo = document.createElement("div");
  let c  = 1.3
  halo.classList.add("uiHalo");
  halo.style.width = (thicc*1.3) + 'px';
  halo.style.height = (thicc*1.3) + 'px';
  let haloColor = "rgba("+(clr[0]*c)+","+(clr[1]*c)+","+(clr[2]*c)+",0.9)"
  let haloFinalColor = "rgba("+(clr[0]*c)+","+(clr[1]*c)+","+(clr[2]*c)+",0)"
  $(halo).css("background", "radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(9,9,121,0) 40%, "+haloColor+" 54%, "+haloFinalColor+" 70%)")
  haloFlick(halo);
  map.appendChild(halo);


  //epilepsy(halo, obj.temperature);

  //More experimental stuff o_o
  let size = obj.radius;
  let numOfSpots = Math.floor((Math.random() * (size * 3)) + (10+(size/2)));
  for (let i = 0; i < numOfSpots; i++) {
    var sunSpot = document.createElement("div");
    sunSpot.classList.add("uiSpots");
    $(sunSpot).css("background-color","rgb(10,10,30)");
    let blurAmount = "blur("+((Math.random()*4)+6)+"px)"
    $(sunSpot).css("filter",blurAmount);
    let w = Math.floor((800/size) * ((Math.random()*7)+3));
    if (w < 4) {
      w = 4;
    }else if (w > 18) {
      w = 18;
    }

    sunSpot.style.width = w+'px';
    sunSpot.style.height = (w *0.7)+'px';
    let maxTop = thicc;
    let minTop = 0;
    let maxLeft = thicc;
    let minLeft = 0;
    let randTop = Math.floor((Math.random() * thicc) + minTop);
    let randLeft = Math.floor((Math.random() * thicc) + minLeft);
    if (randTop < minTop || randTop > maxTop) {
      randTop = thicc/2;
    }
    if (randLeft < minLeft || randLeft > maxLeft) {
      randLeft = thicc/2;
    }
    sunSpot.style.top = randTop + 'px';
    sunSpot.style.left = randLeft + 'px';
    ui.appendChild(sunSpot)
  }
}


function animateLightning(lightning) {
  let flashTime = 20;
  setTimeout(function() {
    $(lightning).animate({
      opacity: 0
    },{duration: 2, easing: "linear"});
    setTimeout(function() {
      $(lightning).animate({
        opacity: 1
      },{duration: flashTime/4, easing: "linear"});
      $(lightning).animate({
        opacity: 0.3
      },{duration: flashTime/3, easing: "linear"});
      $(lightning).animate({
        opacity: 1
      },{duration: flashTime/4, easing: "linear"});
      $(lightning).animate({
        opacity: 0
      },{duration: flashTime/2, easing: "linear"});
      setTimeout(function (){
        lightning.parentNode.removeChild(lightning);
      },flashTime * 3)

    },flashTime*2);
  },flashTime)
}//Self invoking function :)

let curCrustComp = new Array();
let curCrustCompPercents = new Array();
let curCrustCompDists = new Array();
let curAtmComp = new Array();
let blurAmounts = new Array(4,3)
function createLightning(thiccness, background, obj) {
  var lightning = document.createElement("div");
  lightning.classList.add("uiLightning");
  let chosenLeft = Math.floor(Math.random()*thiccness)
  let chosenTop = Math.floor(Math.random()*thiccness);
  let chosenSize = Math.floor( (Math.random() * 50) + 50);

  lightning.style.left = chosenLeft+"px";
  lightning.style.top = chosenTop+"px";
  lightning.style.width = chosenSize+"px";
  lightning.style.height = chosenSize+"px";

  background.appendChild(lightning);
  animateLightning(lightning);

}

function makeClouds(thiccness, background, obj) {
  let numOfClouds = Math.floor( (Math.random()*10)+25);
  let maxCloudSize = thiccness / 4;
  let maxCloudLength = thiccness * 2;
  let minCloudSize = thiccness /6;
  let minCloudLength = thiccness /3;
  let maxTop = thiccness//(maxHeight * 0.5) + (thiccness / 2);
  let minTop = 0//(maxHeight * 0.5) - (thiccness / 2);
  setTimeout(function() {
    count++;
    let color = obj.color[1];
    let maxColor = obj.color[3];
    let minColor = obj.color[4];
    let shadeChange = Math.floor((Math.random()*60)-30);
    for (let j = 0; j < 3; j++) {
      let base = color[j];
      color[j] += shadeChange;
      if (color[j] > maxColor[j]) {
        color[j] = maxColor[j];
      }
      if (color[j] < minColor[j]) {
        color[j] = minColor[j];
      }
    }

    var cloud = document.createElement("div");
    cloud.classList.add("uiClouds");
    $(cloud).css("background-color", "rgb("+color[0]+", "+color[1]+", "+color[2]+")");
    let blurAmount = "blur("+((Math.random()*blurAmounts[0])+blurAmounts[1])+"px)"
    $(cloud).css("filter",blurAmount);
    let cw = Math.floor( (Math.random() * (maxCloudLength-minCloudLength)) + minCloudLength );
    let ch = Math.floor( (Math.random() * (maxCloudSize-minCloudSize)) + minCloudSize );

    let randTop = Math.floor((Math.random() * thiccness) + minTop);
    let randLeft = -cw;

    cloud.style.width = cw + "px";
    cloud.style.height = ch + "px";
    cloud.style.top = randTop + "px";
    cloud.style.left = randLeft + "px";

    let minW = obj.windAvg / 2;
    let timeToRotate = Math.floor((Math.random()*1500)+3000) * 8
    let targPosLeft = thiccness + 10;


    background.appendChild(cloud);

    setTimeout(function() {
      cloud.parentNode.removeChild(cloud);
    },timeToRotate);

    if ($(background).length) { //if background exists
      makeClouds(thiccness,background,obj);
    }


    $(cloud).animate(
      {
        left: targPosLeft
      },{duration: timeToRotate, easing: "linear"});

    let divisor = 2;

    if (count/divisor==Math.floor(count/divisor)) {
      setTimeout(function() {
        createLightning(thiccness, background, obj);
      }, (Math.random() * 1000)+100)

    }

  }, 600);
}

function makeCloudsHJ(thiccness, background, obj) {
  let numOfClouds = Math.floor( (Math.random()*10)+25);
  let maxCloudSize = thiccness / 4;
  let maxCloudLength = thiccness * 2;
  let minCloudSize = thiccness /6;
  let minCloudLength = thiccness /3;
  let maxTop = thiccness//(maxHeight * 0.5) + (thiccness / 2);
  let minTop = 0//(maxHeight * 0.5) - (thiccness / 2);
  setTimeout(function() {
    count++;
    let color = obj.color[1];
    let maxColor = obj.color[3];
    let minColor = obj.color[4];
    let shadeChange = Math.floor((Math.random()*60)-30);
    for (let j = 0; j < 3; j++) {
      let base = color[j];
      color[j] += shadeChange;
      if (color[j] > maxColor[j]) {
        color[j] = maxColor[j];
      }
      if (color[j] < minColor[j]) {
        color[j] = minColor[j];
      }
    }

    var cloud = document.createElement("div");
    cloud.classList.add("uiClouds");
    $(cloud).css("background-color", "rgb("+color[0]+", "+color[1]+", "+color[2]+")");
    let blurAmount = "blur("+((Math.random()*blurAmounts[0])+blurAmounts[1])+"px)"
    $(cloud).css("filter",blurAmount);
    let cw = Math.floor( (Math.random() * (maxCloudLength-minCloudLength)) + minCloudLength );
    let ch = Math.floor( (Math.random() * (maxCloudSize-minCloudSize)) + minCloudSize );

    let randTop = Math.floor((Math.random() * thiccness) + minTop);
    let randLeft = -cw;

    cloud.style.width = cw + "px";
    cloud.style.height = ch + "px";
    cloud.style.top = randTop + "px";
    cloud.style.left = randLeft + "px";

    let minW = obj.windAvg / 2;
    let timeToRotate = Math.floor((Math.random()*1500)+3000) * 5
    let targPosLeft = thiccness + 10;


    background.appendChild(cloud);

    setTimeout(function() {
      cloud.parentNode.removeChild(cloud);
    },timeToRotate);

    if ($(background).length) { //if background exists
      makeClouds(thiccness,background,obj);
    }


    $(cloud).animate(
      {
        left: targPosLeft
      },{duration: timeToRotate, easing: "linear"});

    let divisor = 1;

    if (count/divisor==Math.floor(count/divisor)) {
      setTimeout(function() {
        createLightning(thiccness, background, obj);
        setTimeout(function() {
            createLightning(thiccness, background, obj);
        },(Math.random() * 300)+100)
      }, (Math.random() * 1000)+100)

    }

  }, 400);
}

function animateGasGiant(thiccness, background, obj) {
  let numOfClouds = Math.floor( (Math.random()*10)+40);
  let maxCloudSize = thiccness / 4;
  let maxCloudLength = thiccness * 2;
  let minCloudSize = thiccness /6;
  let minCloudLength = thiccness /3;
  let maxTop = thiccness//(maxHeight * 0.5) + (thiccness / 2);
  let minTop = 0//(maxHeight * 0.5) - (thiccness / 2);
  let maxLeft = thiccness//(maxWidth * 0.75) + (thiccness / 2);
  let minLeft = 0-(minCloudLength/2)//(maxWidth * 0.75) - (thiccness / 2);
  for (let i = 0; i < numOfClouds; i++) {
    let color = obj.color[1];
    let maxColor = obj.color[3];
    let minColor = obj.color[4];
    let shadeChange = Math.floor((Math.random()*60)-30);
    for (let j = 0; j < 3; j++) {
      let base = color[j];
      color[j] += shadeChange;
      if (color[j] > maxColor[j]) {
        color[j] = maxColor[j];
      }
      if (color[j] < minColor[j]) {
        color[j] = minColor[j];
      }
    }
    let randTop = Math.floor((Math.random() * thiccness) + minTop);
    let randLeft = Math.floor((Math.random() * thiccness) + minLeft);
    if (randTop < minTop || randTop > maxTop) {
      randTop = (maxHeight * 0.5);
    }
    if (randLeft < minLeft || randLeft > maxLeft) {
      randLeft = (maxWidth * 0.75);
    }
    var cloud = document.createElement("div");
    cloud.classList.add("uiClouds");
    $(cloud).css("background-color", "rgb("+color[0]+", "+color[1]+", "+color[2]+")");
    let blurAmount = "blur("+((Math.random()*blurAmounts[0])+blurAmounts[1])+"px)"
    $(cloud).css("filter",blurAmount);


    let cw = Math.floor( (Math.random() * (maxCloudLength-minCloudLength)) + minCloudLength );
    let ch = Math.floor( (Math.random() * (maxCloudSize-minCloudSize)) + minCloudSize );

    cloud.style.width = cw + "px";
    cloud.style.height = ch + "px";
    cloud.style.top = randTop + "px";
    cloud.style.left = randLeft + "px";

    let minW = obj.windAvg / 2;
    let timeToRotate = Math.floor((Math.random()*1500)+3000) * 5;
    let targPosLeft = thiccness + 10;

    background.appendChild(cloud);
    setTimeout(function() {
      cloud.parentNode.removeChild(cloud);
    },timeToRotate);
    $(cloud).animate(
      {
        left: targPosLeft
      },{duration: timeToRotate, easing: "linear"});

  }
    makeClouds(thiccness, background, obj);

}

function animateHotJupiter(thiccness, background, obj) {
  let numOfClouds = Math.floor( (Math.random()*10)+40);
  let maxCloudSize = thiccness / 4;
  let maxCloudLength = thiccness * 2;
  let minCloudSize = thiccness /6;
  let minCloudLength = thiccness /3;
  let maxTop = thiccness//(maxHeight * 0.5) + (thiccness / 2);
  let minTop = 0//(maxHeight * 0.5) - (thiccness / 2);
  let maxLeft = thiccness//(maxWidth * 0.75) + (thiccness / 2);
  let minLeft = 0-(minCloudLength/2)//(maxWidth * 0.75) - (thiccness / 2);
  for (let i = 0; i < numOfClouds; i++) {
    let color = obj.color[1];
    let maxColor = obj.color[3];
    let minColor = obj.color[4];
    let shadeChange = Math.floor((Math.random()*60)-30);
    for (let j = 0; j < 3; j++) {
      let base = color[j];
      color[j] += shadeChange;
      if (color[j] > maxColor[j]) {
        color[j] = maxColor[j];
      }
      if (color[j] < minColor[j]) {
        color[j] = minColor[j];
      }
    }
    let randTop = Math.floor((Math.random() * thiccness) + minTop);
    let randLeft = Math.floor((Math.random() * thiccness) + minLeft);
    if (randTop < minTop || randTop > maxTop) {
      randTop = (maxHeight * 0.5);
    }
    if (randLeft < minLeft || randLeft > maxLeft) {
      randLeft = (maxWidth * 0.75);
    }
    var cloud = document.createElement("div");
    cloud.classList.add("uiClouds");
    $(cloud).css("background-color", "rgb("+color[0]+", "+color[1]+", "+color[2]+")");
    let blurAmount = "blur("+((Math.random()*blurAmounts[0])+blurAmounts[1])+"px)"
    $(cloud).css("filter",blurAmount);
    let cw = Math.floor( (Math.random() * (maxCloudLength-minCloudLength)) + minCloudLength );
    let ch = Math.floor( (Math.random() * (maxCloudSize-minCloudSize)) + minCloudSize );

    cloud.style.width = cw + "px";
    cloud.style.height = ch + "px";
    cloud.style.top = randTop + "px";
    cloud.style.left = randLeft + "px";

    let minW = obj.windAvg / 2;
    let timeToRotate = Math.floor((Math.random()*1500)+3000) * 5;
    let targPosLeft = thiccness + 10;

    background.appendChild(cloud);
    setTimeout(function() {
      cloud.parentNode.removeChild(cloud);
    },timeToRotate);
    $(cloud).animate(
      {
        left: targPosLeft
      },{duration: timeToRotate, easing: "linear"});

  }
    makeCloudsHJ(thiccness, background, obj, 1);

}

function animateIronPlanet(thiccness, background, obj) {
  let textures = ironTextures;
  let chosenTexture = textures[Math.floor(Math.random() * (textures.length-1))];
  console.log(chosenTexture);
  let txtDiv = document.createElement("div");
  txtDiv.classList.add("uiPlanetTexture");
  let randChance = -(Math.random() * 50) + 1
  txtDiv.style.left =randChance+"%";
  randChance = -(Math.random() * 50) + 1;
  txtDiv.style.top = randChance+"%";
  txtDiv.style.opacity = 0.4;
  txtDiv.style.zIndex = 2;

  let atmosphere = document.createElement("div");
  atmosphere.classList.add("uiPlanetAtm");
  let pressure = obj.pressure;
  let sizeOfAtm = thiccness + (pressure*2);
  if (sizeOfAtm < 2) {
    sizeOfAtm = 2
  }
  if (sizeOfAtm > 40) {
    sizeOfAtm = 40
  }
  atmosphere.style.width = sizeOfAtm + "px";
  atmosphere.style.height = sizeOfAtm + "px";


  $(txtDiv).css("background", "url("+chosenTexture+")")
  background.appendChild(txtDiv);
}

function drawEarthToScale(planRad, thiccness) {
  let size = thiccness / planRad;
  var earthModel = document.createElement("img");
  earthModel.setAttribute("src", "EarthForScale.png");
  earthModel.classList.add("uiEarthScale");
  earthModel.style.width = size + "px";
  earthModel.style.height = size + "px";
  earthModel.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, 'Earth To Scale');");
  earthModel.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  document.getElementById("map").appendChild(earthModel);

  var label = document.createElement("p");
  label.classList.add("earthScaleLabel");
  label.innerHTML = "Earth to Scale";

  let topNum = ((maxHeight * 0.5) + size + 10)
  label.style.top = topNum + "px";
  //document.getElementById("map").appendChild(label);
}

function closeSlice() {
  clickSound.play();
  var divToRemove = document.getElementById("backDiv");
  divToRemove.parentNode.removeChild(divToRemove);
  onMouseOverPointLeft(0);
}

function drawPlanetSlice() {
  let crustComp = curCrustComp;
  let crustCompPercents = curCrustCompPercents;
  let crustCompDists = curCrustCompDists;

  clickSound.play();
  let minVal = 5;
  //console.log(crustCompPercents);
  var backDiv = document.createElement("div");
  backDiv.classList.add("planetSliceDiv");
  backDiv.id = "backDiv";
  backDiv.style.width = (maxHeight * 0.7) + "px";
  document.getElementById("map").appendChild(backDiv);

  var backButton = document.createElement("button");
  backButton.classList.add("uiPlanetSliceBackButton");
  backButton.innerHTML = "X";

  backButton.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, 'Close');");
  backButton.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  backButton.setAttribute("onMouseOver", "javascript: onHover();");
  backButton.setAttribute("onClick", "javascript: closeSlice();");
  backDiv.appendChild(backButton);

  var backDivLabel = document.createElement("p");
  backDivLabel.classList.add("uiSliceLabel");
  backDivLabel.innerHTML = "Planet cross section:"
  backDiv.appendChild(backDivLabel);

  let sizeOfDrawing = maxHeight * 0.5;
  var first = document.createElement("div");
  first.classList.add("uiPlanetSlice");
  first.style.width = sizeOfDrawing+"px";
  first.style.height = sizeOfDrawing+"px";
//NEW SUBSTANCES: ,, Liquid Lead, Lead, Liquid Nickel, Liquid Silicon, Liquid Carbon, Liquid Iron
  let ironColor = "rgb(138,127,128)";
  let silverColor = "rgb(144,164,212)";
  let nickelColor = "rgb(114,116,114)";
  let carbonColor = "rgb(92,83,83)";
  let titaniumColor = "rgb(192,192,192)";
  let tungstenColor = "rgb(148,148,148)";
  let iridiumColor = "rgb(207,207,207)";
  let siliconColor = "rgb(124,135,168)";
  let copperColor = "rgb(110,69,30)";

  let liqHydoClr = "rgb(230,218,158)";
  let liqHeliClr = "rgb(198,230,143)";
  let liqLeadClr = "rgb(186,180,121)";
  let leadClr = "rgb(183,186,175)";
  let liqNickelClr = "rgb(222,170,124)";
  let liqSiliconClr = "rgb(222,202,120)";
  let liqCarbonClr = "rgb(222,75,75)";
  let liqIronClr = "rgb(222,56,56)";

  let waterColor = "rgb(36,56,156)";
  let iceColor = "rgb(176,247,255)";
  let pressuredIceColor = "rgb(96,166,163)";
  let pressuredIceColor2 = "rgb(86,150,148)";

  let colors = new Array();
  for (let i = 0; i < crustComp.length; i++) {
    let curComp = crustComp[i];
    let colorChoice = "";
    if (curComp == "Iron") {
      colorChoice = ironColor;
    }else if (curComp == "Silver") {
      colorChoice = silverColor;
    }else if (curComp == "Nickel") {
      colorChoice = nickelColor;
    }else if (curComp == "Carbon") {
      colorChoice = carbonColor;
    }else if (curComp == "Titanium") {
      colorChoice = titaniumColor;
    }else if (curComp == "Tungsten") {
      colorChoice = tungstenColor;
    }else if (curComp == "Iridium") {
      colorChoice = iridiumColor;
    }else if (curComp == "Silicon") {
      colorChoice = siliconColor;
    }else if (curComp == "Copper") {
      colorChoice = copperColor;
    }else if (curComp == "Liquid Water") {
      colorChoice = waterColor;
    }else if (curComp == "Ice") {
      colorChoice = iceColor;
    }else if (curComp == "Pressured Ice") {
      if ( i < 2) {
        colorChoice = pressuredIceColor;
      }else {
        colorChoice = pressuredIceColor2;
      }

    }else if (curComp == "Liquid Hydrogen") {
      colorChoice = liqHydoClr;
    }else if (curComp == "Liquid Helium") {
      colorChoice = liqHeliClr;
    }else if (curComp == "Liquid Lead") {
      colorChoice = liqLeadClr;
    }else if (curComp == "Lead") {
      colorChoice = leadClr;
    }else if (curComp == "Liquid Nickel") {
      colorChoice = liqNickelClr;
    }else if (curComp == "Liquid Silicon") {
      colorChoice = liqSiliconClr;
    }else if (curComp == "Liquid Carbon") {
      colorChoice = liqCarbonClr;
    }else if (curComp == "Liquid Iron") {
      colorChoice = liqIronClr;
    }
    colors[i] = colorChoice;
  } // Finds Colors from Materials
  console.log(colors);
  $(first).css("background-color", colors[0]);
  backDiv.appendChild(first);
  let textForHover = "First Layer: "+crustComp[0]+"<br>Thickness: "+Math.floor(crustCompDists[0]) + " km";
  first.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+textForHover+"');");
  first.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");

  var second = document.createElement("div");
  second.classList.add("uiPlanetSlice");
  $(second).css("z-index", "2")


  let dif = (sizeOfDrawing * (crustCompPercents[1]+crustCompPercents[2]))

  if (crustComp.length == 3) {
    dif = (sizeOfDrawing * (crustCompPercents[1]+crustCompPercents[2]))
  }else if (crustComp.length == 4) {
    dif = (sizeOfDrawing * (crustCompPercents[1]+crustCompPercents[2] + crustCompPercents[3]))
  }else {
    dif = (sizeOfDrawing * (crustCompPercents[1]+crustCompPercents[2] + crustCompPercents[3]+crustCompPercents[4]))
  }


  if (first - dif < minVal) {
    dif -= minVal;
  }
  let calculatedSize = dif;
  second.style.width = calculatedSize + "px";
  second.style.height = calculatedSize + "px";
  $(second).css("background-color", colors[1]);
  backDiv.appendChild(second);
  textForHover = "Second Layer: "+crustComp[1]+"<br>Thickness: "+Math.floor(crustCompDists[1]) + " km";
  second.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+textForHover+"');");
  second.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");


  var third = document.createElement("div");
  third.classList.add("uiPlanetSlice");
  $(third).css("z-index", "3")
  if (crustComp.length == 3) {
    dif = (sizeOfDrawing * (crustCompPercents[2]))
  }else if (crustComp.length == 4) {
    dif = (sizeOfDrawing * (crustCompPercents[2] + crustCompPercents[3]))
  }else {
    dif = (sizeOfDrawing * (crustCompPercents[2] + crustCompPercents[3]+crustCompPercents[4]))
  }
  if (second - dif < minVal) {
    dif -= minVal;
  }
  calculatedSize = dif;
  third.style.width = calculatedSize + "px";
  third.style.height = calculatedSize + "px";
  $(third).css("background-color", colors[2]);
  backDiv.appendChild(third);
  textForHover = "Third Layer: "+crustComp[2]+"<br>Thickness: "+Math.floor(crustCompDists[2]) + " km";
  third.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+textForHover+"');");
  third.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");

  if (crustComp.length > 3) {
    var fourth = document.createElement("div");
    fourth.classList.add("uiPlanetSlice");
    $(fourth).css("z-index", "4")
    if (crustComp.length == 5) {
      dif = (sizeOfDrawing * (crustCompPercents[3]+crustCompPercents[4]))
    }else {
      dif = (sizeOfDrawing * (crustCompPercents[3]))
    }

    if (fourth - dif < minVal) {
      dif -= minVal;
    }
    calculatedSize = dif;
    fourth.style.width = calculatedSize + "px";
    fourth.style.height = calculatedSize + "px";
    $(fourth).css("background-color", colors[3]);
    backDiv.appendChild(fourth);
    textForHover = "Fourth Layer: "+crustComp[3]+"<br>Thickness: "+Math.floor(crustCompDists[3]) + " km";
    fourth.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+textForHover+"');");
    fourth.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  }
  if (crustComp.length > 4) {
    var fifth = document.createElement("div");
    fifth.classList.add("uiPlanetSlice");
    $(fifth).css("z-index", "5")
    dif = (sizeOfDrawing * (crustCompPercents[4]))
    if (fifth - dif < minVal) {
      dif -= minVal;
    }
    calculatedSize = dif;
    fifth.style.width = calculatedSize + "px";
    fifth.style.height = calculatedSize + "px";
    $(fifth).css("background-color", colors[4]);
    backDiv.appendChild(fifth);
    textForHover = "Fifth Layer: "+crustComp[4]+"<br>Thickness: "+Math.floor(crustCompDists[4]) + " km";
    fifth.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+textForHover+"');");
    fifth.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  }
}

function drawAtmComp() {
  console.log(curAtmComp);
  let atmComp = curAtmComp;
  let curW = (maxHeight * 0.7)
  clickSound.play();
  var backDiv = document.createElement("div");
  backDiv.classList.add("planetAtmDiv");
  backDiv.id = "backDiv";
  backDiv.style.width = curW + "px";
  document.getElementById("map").appendChild(backDiv);

  var backButton = document.createElement("button");
  backButton.classList.add("uiPlanetSliceBackButton");
  backButton.innerHTML = "X";

  backButton.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, 'Close');");
  backButton.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  backButton.setAttribute("onMouseOver", "javascript: onHover();");
  backButton.setAttribute("onClick", "javascript: closeSlice();");
  backDiv.appendChild(backButton);

  var backDivLabel = document.createElement("p");
  backDivLabel.classList.add("uiSliceLabel");
  backDivLabel.innerHTML = "Atmosphere Composition:"
  backDiv.appendChild(backDivLabel);

  let rectW = (curW * 0.8)

  let rectangle = document.createElement("div");
  rectangle.style.width = rectW + "px";
  rectangle.classList.add("uiAtmComp");
  backDiv.appendChild(rectangle);

  /*let possibleGases = new Array(
    25, //Methane
    1,  //CO2
    10, //Water vapor
    0,  //Oxygen
    0,  //Nitrogen
    0,  //Neon
    0,  //Hydrogen
    0   //Helium
  );*/
  let totalWidth = 0;

  // Les Colours //
  let methaneClr = "rgb(143,72,24)";
  let carbonClr = "rgb(74,44,9)";
  let waterClr = "rgb(54,81,143)";
  let oxyClr = "rgb(45,199,237)";
  let nitroClr = "rgb(40,99,237)";
  let neonClr = "rgb(0,221,237)";
  let hydroClr = "rgb(255,242,176)";
  let heliClr = "rgb(201,136,24)";


  let methane = document.createElement("div");
  methane.classList.add("uiplanetAtmPiece");
  let curPW = ((atmComp[0] / 100) * rectW);
  totalWidth += curPW;
  methane.style.width = curPW + "px";
  let txt = "Methane: "+atmComp[0]+"%";
  methane.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+txt+"');");
  methane.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  $(methane).css("background-color", methaneClr);
  rectangle.appendChild(methane);

  let carbon = document.createElement("div");
  carbon.classList.add("uiplanetAtmPiece");
  curPW = ((atmComp[1] / 100) * rectW);
  carbon.style.left = totalWidth + "px";
  totalWidth += curPW;
  carbon.style.width = curPW + "px";
  txt = "Carbon Dioxide: "+atmComp[1]+"%";
  carbon.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+txt+"');");
  carbon.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  $(carbon).css("background-color", carbonClr);
  rectangle.appendChild(carbon);

  let water = document.createElement("div");
  water.classList.add("uiplanetAtmPiece");
  curPW = ((atmComp[2] / 100) * rectW);
  water.style.left = totalWidth + "px";
  totalWidth += curPW;
  water.style.width = curPW + "px";
  txt = "Water Vapor: "+atmComp[2]+"%";
  water.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+txt+"');");
  water.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  $(water).css("background-color", waterClr);
  rectangle.appendChild(water);

  let oxygen = document.createElement("div");
  oxygen.classList.add("uiplanetAtmPiece");
  curPW = ((atmComp[3] / 100) * rectW);
  oxygen.style.left = totalWidth + "px";
  totalWidth += curPW;
  oxygen.style.width = curPW + "px";
  txt = "Oxygen: "+atmComp[3]+"%";
  oxygen.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+txt+"');");
  oxygen.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  $(oxygen).css("background-color", oxyClr);
  rectangle.appendChild(oxygen);

  let nitro = document.createElement("div");
  nitro.classList.add("uiplanetAtmPiece");
  curPW = ((atmComp[4] / 100) * rectW);
  nitro.style.left = totalWidth + "px";
  totalWidth += curPW;
  nitro.style.width = curPW + "px";
  txt = "Nitrogen: "+atmComp[4]+"%";
  nitro.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+txt+"');");
  nitro.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  $(nitro).css("background-color", nitroClr);
  rectangle.appendChild(nitro);

  let neon = document.createElement("div");
  neon.classList.add("uiplanetAtmPiece");
  curPW = ((atmComp[5] / 100) * rectW);
  neon.style.left = totalWidth + "px";
  totalWidth += curPW;
  neon.style.width = curPW + "px";
  txt = "Neon: "+atmComp[5]+"%";
  neon.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+txt+"');");
  neon.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  $(neon).css("background-color", neonClr);
  rectangle.appendChild(neon);

  let hydro = document.createElement("div");
  hydro.classList.add("uiplanetAtmPiece");
  curPW = ((atmComp[6] / 100) * rectW);
  hydro.style.left = totalWidth + "px";
  totalWidth += curPW;
  hydro.style.width = curPW + "px";
  txt = "Hydrogen: "+atmComp[6]+"%";
  hydro.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+txt+"');");
  hydro.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  $(hydro).css("background-color", hydroClr);
  rectangle.appendChild(hydro);

  let helium = document.createElement("div");
  helium.classList.add("uiplanetAtmPiece");
  curPW = ((atmComp[7] / 100) * rectW);
  helium.style.left = totalWidth + "px";
  totalWidth += curPW;
  helium.style.width = curPW + "px";
  txt = "Helium: "+atmComp[7]+"%";
  helium.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+txt+"');");
  helium.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  $(helium).css("background-color", heliClr);
  rectangle.appendChild(helium);
}

function drawPlanetSliceButton(crustComp, crustCompPercents, crustCompDists) {
  var btn = document.createElement("button");
  btn.classList.add("uiPlanetSliceButton");
  btn.innerHTML = "View Planet Cross Section"

  document.getElementById("map").appendChild(btn);
  btn.setAttribute("onMouseOver", "onHover();");
  curCrustComp = crustComp;
  curCrustCompPercents = crustCompPercents;
  curCrustCompDists = crustCompDists;
  btn.setAttribute("onClick", "drawPlanetSlice()");

}

function drawAtmCompButton(atmComp) {
  var btn = document.createElement("button");
  btn.classList.add("uiPlanetAtmButton");
  btn.innerHTML = "View Atmosphere Composition"

  document.getElementById("map").appendChild(btn);
  btn.setAttribute("onMouseOver", "onHover();");
  curAtmComp = atmComp;
  btn.setAttribute("onClick", "drawAtmComp()");
}

function drawOutPlanet(obj) {
  var ui = document.createElement("div");
  ui.classList.add("uiPlanet");
  let thiccness = obj.size * 150;
  if (thiccness > 400) {
    thiccness = 400;
  }else if (thiccness < 100) {
    thiccness = 100;
  }
  ui.style.width = thiccness+'px';
  ui.style.height = thiccness+'px';
  $(ui).css("background-color", "rgb(10, 10, 10)");
  var map = document.getElementById("map");
  while (map.firstChild) {
    map.firstChild.remove();
  }
  map.appendChild(ui);
  var background = document.createElement("div");
  let color = obj.color[0];

  $(background).css("background-color", "rgb("+color[0]+", "+color[1]+", "+color[2]+")");
  background.classList.add("uiPlanetBack");
  ui.appendChild(background);
  background.setAttribute("onMouseMove", "javascript: onMouseOverPoint(0, '"+obj.name+"');");
  background.setAttribute("onMouseLeave", "javascript: onMouseOverPointLeft(0);");
  if (simDetail > 2) {
    drawEarthToScale(obj.size, thiccness)
  }
  if (simDetail > 3) {
    drawPlanetSliceButton(obj.crustComp, obj.crustCompPercents, obj.crustCompDists);
  }
  if (simDetail > 4) {
    console.log(obj.atmComp);
    drawAtmCompButton(obj.atmComp);
  }

  if (obj.composition == "Gas Planet") {
    animateGasGiant(thiccness, background, obj);
  }else if (obj.composition == "Hot Jupiter") {
    animateHotJupiter(thiccness, background, obj);
  }else /*if (obj.composition == "Iron Planet")*/ {
    animateIronPlanet(thiccness, background, obj);
  }

  graphicStorage.push(new Array(obj.name, $(ui).clone()));
}

function displayPlanet(obj) {
  for (let i = 0; i < graphicStorage.length; i++) {
    let currentUI = graphicStorage[i];
    console.log(currentUI[0])
    if (currentUI[0] == obj.name) {
      console.log("Fetched!")
      document.getElementById("map").appendChild(currentUI[1]);
    }else {
      drawOutPlanet(obj);
    }
  }
}


//UI FUNCTIONS
function epilepsy(elem, temp) {
  if (elem) {
    let trans = ((Math.random() * (1 + (temp / 5000))) + 2)/10 ;
    elem.style.opacity = trans;
    setTimeout(function() {
      epilepsy(elem, temp);
    }, flickSpeed);
  }
}

function haloFlick(elem) {
  if (elem) {
    elem.style.opacity = (Math.random()*0.3)+0.7;
    setTimeout(function() {
      haloFlick(elem);
    }, flickSpeed);
  }
}

function decodeURL(url) {
  let start = url.indexOf("systems") + 8;
  let first = "";
  let second = "";
  let currentChar = url.charAt(start);
  while (currentChar >= '0' && currentChar <= '9') {
    first = first + currentChar;
    start++;
    currentChar = url.charAt(start);
  }
  start = url.indexOf("detail") + 7;
  currentChar = url.charAt(start);
  while (currentChar >= '0' && currentChar <= '9') {
    second = second + currentChar;
    start++;
    currentChar = url.charAt(start);
  }
  if (first === "" || second === "") {
    return new Array(0,0);
  }else {
    return new Array(Number(first), Number(second));
  }
}

function moveBar(per) {
  var bar = document.getElementById("loadingBar");
  //$(bar).css("background", "rgb("+starColor(30)[0]+", "+starColor(30)[1]+", "+starColor(30)[2]+")")
  bar.style.width = (maxWidth * per)+"px";
}

function randomChooser() {
  clickSound.play();
  let randNum = Math.floor((Math.random() * 49) + 1);
  if (randNum <= 25) {
    spot = interestingSystems[interesting];
    if (interesting < interestingSystems.length-1) {
      interesting++;
    }else {
      interesting--;
    }

  }else{
    spot = normal;
    if (normal < allSystems.length-1) {
     normal++;
   }else {
     normal--;
   }

  }
  let system = allSystems[spot];
  drawOutStar(system.star);
  statTheStar(system.star);

}

function stringy2(R,G,B){
  return "rgb("+R+","+G+","+B+")";
}
let counter = 0;
function sleep( sleepDuration ){
    setTimeout(function() {
      counter+=5;
      if (counter >= sleepDuration) {
        counter = 0;
      }else {
        sleep(sleepDuration)
      }
    }, 5)
}
let phase = 0;
let i = 0;
let maxShade = 200
let r = maxShade;
let g = maxShade;
let b = maxShade;
let waitTime = 1000;
let canAnimateButton = true
function colorz(obj) {
  r = 0;
  g = maxShade;
  b = maxShade;
  let clr = stringy2(r,g,b)
  console.log(clr)
  $(obj).animate({
    color: clr
  },{duration: waitTime});
  r = maxShade;
  g = 0;
  b = maxShade;
  console.log(clr)
  clr = stringy2(r,g,b)

    $(obj).animate({
      color: clr
    },{duration: waitTime});


  r = maxShade;
  g = maxShade;
  b = 0;
  console.log(clr)
  clr = stringy2(r,g,b)

    $(obj).animate({
      color: clr
    },{duration: waitTime});

  r = maxShade;
  g = 0;
  b = maxShade;
  console.log(clr)
  clr = stringy2(r,g,b)

    $(obj).animate({
      color: clr
    },{duration: waitTime});

  setTimeout(function() {
    colorz(obj)
  },waitTime* 4)


}

function mouseOverPlanet(id) {
  let planet = document.getElementById(id);
  if (canAnimateButton) {
    $(planet).stop()
    $(planet).animate({
      width: "55%",
      fontSize: "35px"
    },700)
  }

}

function mouseLeftPlanet(id) {
  let planet = document.getElementById(id);
  if (canAnimateButton) {
    $(planet).stop()
    $(planet).animate({
      width: "50%",
      fontSize: "30px"
    },700)
  }

}

function planetSearch() {
  let p = $("#planetSide");
  let s = $("#starSide");
  let searchDiv = document.getElementById("SearchDiv")
  let planetSearchDiv = document.createElement("div");
  planetSearchDiv.classList.add("planetSearchDiv");
  searchDiv.appendChild(planetSearchDiv);
  let top = 10;

  let sizeSearch = document.createElement("input");
  sizeSearch.classList.add("searchTab");
  sizeSearch.placeholder = " ____ x the radius of Earth";
  sizeSearch.style.top = top + "px";
  planetSearchDiv.appendChild(sizeSearch);

  let sizeSearchText = document.createElement("p");
  sizeSearchText.classList.add("searchText");
  sizeSearchText.innerHTML = "Enter Size: ";
  sizeSearchText.style.top = top-17 + "px";
  planetSearchDiv.appendChild(sizeSearchText);

  top+= 40;

  let tempSearch = document.createElement("input");
  tempSearch.classList.add("searchTab");
  tempSearch.placeholder = " ____ degrees Celsius";
  tempSearch.style.top = top + "px";
  planetSearchDiv.appendChild(tempSearch);

  let tempSearchText = document.createElement("p");
  tempSearchText.classList.add("searchText");
  tempSearchText.innerHTML = "Enter Avg. Temp";
  tempSearchText.style.top = top-17 + "px";
  planetSearchDiv.appendChild(tempSearchText);

  top+= 40;

  let typeSearch = document.createElement("input");
  typeSearch.classList.add("searchTab");
  typeSearch.placeholder = " ____ AUs";
  typeSearch.style.top = top + "px";
  planetSearchDiv.appendChild(typeSearch);

  let typeSearchText = document.createElement("p");
  typeSearchText.classList.add("searchText");
  typeSearchText.innerHTML = "Enter Orbit Dist.";
  typeSearchText.style.top = top-17 + "px";
  planetSearchDiv.appendChild(typeSearchText);

  top+= 40;

  let atmPressureSearch = document.createElement("input");
  atmPressureSearch.classList.add("searchTab");
  atmPressureSearch.placeholder = " ____ atmopsheres";
  atmPressureSearch.style.top = top + "px";
  planetSearchDiv.appendChild(atmPressureSearch);

  let atmSearchText = document.createElement("p");
  atmSearchText.classList.add("searchText");
  atmSearchText.innerHTML = "Atmosphere Pressure";
  atmSearchText.style.top = top-17 + "px";
  planetSearchDiv.appendChild(atmSearchText);

  top+= 40;

  canAnimateButton = false;
  $(p).animate({
    left: "-55%"
  },{duration: 700, easing: "easeOutCirc", queue: false})
  $(s).animate({
    left: "155%"
  },{duration: 700, easing: "easeOutCirc", queue: false})
}

function searcher() {
  canAnimateButton = true;
  clickSound.play();
  if ($("#SearchDiv").length) {
    document.getElementById("SearchDiv").parentNode.removeChild(document.getElementById("SearchDiv"));
  }else {
    let searchDiv = document.createElement("div")
    searchDiv.classList.add("searchDiv");
    searchDiv.id = "SearchDiv";
    searchDiv.style.width = (maxHeight * 0.7) + "px"
    searchDiv.style.height = (maxHeight * 0.7) + "px"
    document.getElementById("map").appendChild(searchDiv);

    let title = document.createElement("p")
    title.classList.add("searchTitle")
    title.innerHTML = "Search For an Object!"
    searchDiv.appendChild(title);

    let planetSide = document.createElement("button");
    planetSide.classList.add("planetSide");
    planetSide.id = "planetSide"
    planetSide.innerHTML = "Planet";
    planetSide.setAttribute("onClick", "javascript: planetSearch();");
    planetSide.setAttribute("onMouseOver", "javascript: mouseOverPlanet('planetSide');");
    planetSide.setAttribute("onMouseLeave", "javascript: mouseLeftPlanet('planetSide');");
    searchDiv.appendChild(planetSide);

    let starSide = document.createElement("button");
    starSide.classList.add("starSide");
    starSide.id = "starSide"
    starSide.innerHTML = "Star";
    starSide.setAttribute("onClick", "javascript: starSearch();");
    starSide.setAttribute("onMouseOver", "javascript: mouseOverPlanet('starSide');");
    starSide.setAttribute("onMouseLeave", "javascript: mouseLeftPlanet('starSide');");
    searchDiv.appendChild(starSide);

    $(title).animate({
      left: "50%"
    },{duration: 1500, easing: "easeOutBounce", queue: false})
    //colorz(title)
  }
}

function setUp() {
  var div1 = document.createElement("div");
  div1.classList.add("infoDiv");
  div1.id = "div1";
  document.body.appendChild(div1);
  var div2 = document.createElement("div");
  div2.classList.add("dataDiv");
  div2.id = "div2";
  document.body.appendChild(div2);
  var button1 = document.createElement("button");
  button1.classList.add("randBtn");
  button1.innerHTML = "Choose Random";
  button1.setAttribute("onClick", "javascript: randomChooser();");
  button1.setAttribute("onMouseOver", "javascript: onHover();");
  document.body.appendChild(button1);

  /*var button2 = document.createElement("button");
  button2.classList.add("searchBtn");
  button2.innerHTML = "Search !NEW!";
  button2.setAttribute("onClick", "javascript: searcher();");
  button2.setAttribute("onMouseOver", "javascript: onHover();");
  document.body.appendChild(button2);*/

  var uniLabel = document.createElement("p");
  uniLabel.classList.add("uniLabel");
  uniLabel.innerHTML = "Universe Stats";
  document.body.appendChild(uniLabel);

  var curLabel = document.createElement("p");
  curLabel.classList.add("curLabel");
  curLabel.innerHTML = "Object Stats";
  document.body.appendChild(curLabel);
  statTheUniverse();
}

function continueSim() {
  $("#infoText").fadeOut();
  $("#loadingText").fadeOut();
  $("#loadingBar").fadeOut();
  setTimeout(function() {
    setUp();
  }, 500);
}

function backButtonMaker() {
  var bkBtn = document.createElement("button");
  bkBtn.classList.add("planetButton");
  bkBtn.setAttribute("onClick", "javascript: back();");
  bkBtn.innerHTML= "Back to Star";
  document.getElementById("div2").appendChild(bkBtn);
}

function back() {
  clickSound.play();
  statTheStar(allSystems[spot].star);
  drawOutStar(allSystems[spot].star);
}

function selectPlanet(num) {
  clickSound.play();
  curPlanet = num;
  let planet = allSystems[spot].planets[num];
  statThePlanet(planet);
  drawOutPlanet(planet);
  //drawOutPlanet(planet);
}

function makePlanetButton(num) {
  var button = document.createElement("button");
  button.classList.add("planetButton");
  button.setAttribute("onClick", "javascript: selectPlanet("+num+");");
  button.setAttribute("onMouseOver", "javascript: onHover();");
  button.innerHTML = allSystems[spot].planets[num].name;
  document.getElementById("div2").appendChild(button);
}

function statTheStar(obj) {
  let parentDiv = document.getElementById("div2");
  let labelColor = "rgb("+obj.color[0]+", "+obj.color[1]+", "+obj.color[2]+")"
  while (parentDiv.firstChild) {
    parentDiv.firstChild.remove();
  }
  ////////////NAME OF SYSTEM//////////////

  var nameLabe = document.createElement("p")
  nameLabe.classList.add("objStatLabel");
  nameLabe.innerHTML = "Name Of System: ";
  $(nameLabe).css("color",labelColor);
  parentDiv.appendChild(nameLabe);

  var nameVal = document.createElement("p")
  nameVal.classList.add("objStatValue");
  nameVal.innerHTML = obj.name;
  parentDiv.appendChild(nameVal);

  ////////////TYPE OF STAR//////////////////

  var typeLabe = document.createElement("p")
  typeLabe.classList.add("objStatLabel");
  typeLabe.innerHTML = "Type of star: ";
  $(typeLabe).css("color",labelColor);
  parentDiv.appendChild(typeLabe);

  var typeVal = document.createElement("p")
  typeVal.classList.add("objStatValue");
  typeVal.innerHTML = obj.sizeType;
  parentDiv.appendChild(typeVal);

  //////////////PLANET BUTTONS/////////////////

  if (simDetail > 1) {

    var planetsLabe = document.createElement("p")
    planetsLabe.classList.add("objStatLabel");
    planetsLabe.innerHTML = "Planets";
    $(planetsLabe).css("color",labelColor);
    parentDiv.appendChild(planetsLabe);

    for (let i = 0; i < allSystems[spot].planets.length; i++) {
      makePlanetButton(i);
    }
  }

  ////////////DESCRIPTION///////////////////

  var descLabe = document.createElement("p")
  descLabe.classList.add("objStatLabel");
  descLabe.innerHTML = "Description";
  $(descLabe).css("color",labelColor);
  parentDiv.appendChild(descLabe);

  var descVal = document.createElement("p")
  descVal.classList.add("objStatValue");
  descVal.innerHTML = obj.description[0];
  parentDiv.appendChild(descVal);

  var desc2Val = document.createElement("p")
  desc2Val.classList.add("objStatValue", "objG");
  desc2Val.innerHTML = obj.description[1];
  parentDiv.appendChild(desc2Val);

  var desc3Val = document.createElement("p")
  desc3Val.classList.add("objStatValue", "objR");
  desc3Val.innerHTML = obj.description[2];
  parentDiv.appendChild(desc3Val);



  ///////////////////////////////
  var sizeLabe = document.createElement("p")
  sizeLabe.classList.add("objStatLabel");
  sizeLabe.innerHTML = "Size (solar radii)"
  $(sizeLabe).css("color",labelColor);
  parentDiv.appendChild(sizeLabe);

  var sizeVal = document.createElement("p")
  sizeVal.classList.add("objStatValue");
  sizeVal.innerHTML = obj.radius;
  parentDiv.appendChild(sizeVal);

  //////////////////////////////

  var massLabe = document.createElement("p")
  massLabe.classList.add("objStatLabel");
  massLabe.innerHTML = "Mass (solar masses)";
  $(massLabe).css("color",labelColor);
  parentDiv.appendChild(massLabe);

  var massVal = document.createElement("p")
  massVal.classList.add("objStatValue");
  massVal.innerHTML = obj.mass;
  parentDiv.appendChild(massVal);

  ///////////////////////////////

  var brightLabe = document.createElement("p")
  brightLabe.classList.add("objStatLabel");
  brightLabe.innerHTML = "Luminocity (solar lumens)";
  $(brightLabe).css("color",labelColor);
  parentDiv.appendChild(brightLabe);

  var brightVal = document.createElement("p")
  brightVal.classList.add("objStatValue");
  brightVal.innerHTML = exponentToDecimal(obj.luminocity);
  parentDiv.appendChild(brightVal);

  ///////////////////////////////

  var tempLabe = document.createElement("p")
  tempLabe.classList.add("objStatLabel");
  $(tempLabe).css("color",labelColor);
  tempLabe.innerHTML = "Temperature (Kevlin)";
  parentDiv.appendChild(tempLabe);

  var tempVal = document.createElement("p")
  tempVal.classList.add("objStatValue");
  tempVal.innerHTML = obj.temperature * 1000;
  parentDiv.appendChild(tempVal);

  ///////////////////////////////

}

function statThePlanet(obj) {
  let parentDiv = document.getElementById("div2");
  let labelColor = "rgb(255,255,200)"
  while (parentDiv.firstChild) {
    parentDiv.firstChild.remove();
  }
  ////////////NAME OF SYSTEM//////////////

  var nameLabe = document.createElement("p")
  nameLabe.classList.add("objStatLabel");
  nameLabe.innerHTML = "Name Of Planet: ";
  $(nameLabe).css("color",labelColor);
  parentDiv.appendChild(nameLabe);

  var nameVal = document.createElement("p")
  nameVal.classList.add("objStatValue");
  nameVal.innerHTML = obj.name;
  parentDiv.appendChild(nameVal);

  ////////////TYPE OF PLANET//////////////////

  var typeLabe = document.createElement("p")
  typeLabe.classList.add("objStatLabel");
  typeLabe.innerHTML = "Type of planet: ";
  $(typeLabe).css("color",labelColor);
  parentDiv.appendChild(typeLabe);

  var typeVal = document.createElement("p")
  typeVal.classList.add("objStatValue");
  typeVal.innerHTML = obj.sizeType;
  parentDiv.appendChild(typeVal);

  var typeLabe = document.createElement("p")
  typeLabe.classList.add("objStatLabel");
  typeLabe.innerHTML = "Composition Type: ";
  $(typeLabe).css("color",labelColor);
  parentDiv.appendChild(typeLabe);

  var typeVal = document.createElement("p")
  typeVal.classList.add("objStatValue");
  typeVal.innerHTML = obj.composition;
  parentDiv.appendChild(typeVal);

  ////////////DESCRIPTION///////////////////

  var descLabe = document.createElement("p")
  descLabe.classList.add("objStatLabel");
  descLabe.innerHTML = "Description";
  $(descLabe).css("color",labelColor);
  parentDiv.appendChild(descLabe);

  var descVal = document.createElement("p")
  descVal.classList.add("objStatValue");
  descVal.innerHTML = obj.description[0];
  parentDiv.appendChild(descVal);

  var desc2Val = document.createElement("p")
  desc2Val.classList.add("objStatValue", "objG");
  desc2Val.innerHTML = obj.description[1];
  parentDiv.appendChild(desc2Val);

  var desc3Val = document.createElement("p")
  desc3Val.classList.add("objStatValue", "objR");
  desc3Val.innerHTML = obj.description[2];
  parentDiv.appendChild(desc3Val);

  ///////////////////////////////
  var sizeLabe = document.createElement("p")
  sizeLabe.classList.add("objStatLabel");
  sizeLabe.innerHTML = "Size (astronomical radii)"
  $(sizeLabe).css("color",labelColor);
  parentDiv.appendChild(sizeLabe);

  var sizeVal = document.createElement("p")
  sizeVal.classList.add("objStatValue");
  sizeVal.innerHTML = obj.size;
  parentDiv.appendChild(sizeVal);

  //////////////////////////////

  backButtonMaker();
}

function statTheUniverse() {
  var fyiLabel = document.createElement("p");
  fyiLabel.classList.add("starIntr");
  fyiLabel.innerHTML = "<strong>BACKGROUND INFO (read):</strong><br>Looking at these numbers, labels, or descriptions and being clueless about what is depicted is perfectly normal. Knowing that, once you take the time to read this, you will be able to enjoy the full experience of Newverse and be one step above everyone else.";
  document.getElementById("div1").appendChild(fyiLabel);
  var unitLabel = document.createElement("p");
  unitLabel.classList.add("starIntr");
  unitLabel.innerHTML = "<strong>What are the units used?</strong><br>Some of the units used here are:<br>1. Lightyear: the distance light travels in a year (very long)<br>2. Solar mass: the number of times the mass of our sun.<br>3. Solar radii: the number of times the radius (width) of our sun.<br>4. Solar lumens: the number of times the brightness of our sun.<br>5. Kelvin: an absolute temperature scale (can't be below 0)";
  document.getElementById("div1").appendChild(unitLabel);
  var formLabel = document.createElement("p");
  formLabel.classList.add("starIntr");
  formLabel.innerHTML = "<strong>How do stars form?</strong><br>Throughout the universe, huge gas clouds of hydrogen exist. Some span lightyears in width. Because of gravity, all the gas particles are attracted to each other and start to clump up. This gas clump will grow exponentially until a critical point is reached. Once the mass exceeds a cetain threshold, the pressure inside becomes large enough to begin fusing hydrogen into helium (see below).";
  document.getElementById("div1").appendChild(formLabel);
  var fuseLabel = document.createElement("p");
  fuseLabel.classList.add("starIntr");
  fuseLabel.innerHTML = "<strong>What is fusion</strong><br>Atoms don't like being too close to each other. But when the temperature or pressure gets high enough, atoms can smash into each other, fusing them into a bigger element. This releases massive amounts of energy. Fusing hydrogen (and possibly heavier elements later on) is how stars produce energy and live.";
  document.getElementById("div1").appendChild(fuseLabel);
  var classLabel = document.createElement("p");
  classLabel.classList.add("starClasses");
  classLabel.innerHTML = "<strong>Star amount by class:</strong><br>1.  M: "+starTypeCollection.m+"<br>2.  K: "+starTypeCollection.k+"<br>3.  G: "+starTypeCollection.g+"<br>4.  F: "+starTypeCollection.f+"<br>5.  A: "+starTypeCollection.a+"<br>6.  B: "+starTypeCollection.b+"<br>7.  O: "+starTypeCollection.o;
  document.getElementById("div1").appendChild(classLabel);
  var typeLabel = document.createElement("p");
  typeLabel.classList.add("starTypes");
  typeLabel.innerHTML = "<strong>Star amount by type:</strong><br>1.  White Dwarf: "+starSizeTypeCollection.whiteDwarfs+"<br>2.  Red Dwarf: "+starSizeTypeCollection.redDwarfs+"<br>3.  Main Seq. "+starSizeTypeCollection.mainSequence+"<br>4.  Red Giants: "+starSizeTypeCollection.redGiants+"<br>5.  Red Supergiants: "+starSizeTypeCollection.redSuperGiants+"<br>6.  Blue Giants: "+starSizeTypeCollection.blueGiants;
  document.getElementById("div1").appendChild(typeLabel);
  /*var intrLabel = document.createElement("p");
  intrLabel.classList.add("starIntr");
  intrLabel.innerHTML = "<strong>Total Interesting stars:</strong><br>"+interestingSystems.length;
  document.getElementById("div1").appendChild(intrLabel);*/
}

function makeSystem(total, detail, cur) {
  let i = cur;
  if (detail == 1) {
    detailOne();
    i++;
    moveBar(i/total)
    setTimeout(function() {
      if (i < total) {
        makeSystem(total,detail,i);
        document.getElementById("infoText").innerHTML = "Systems Loaded: " + i;
      }else{
        document.getElementById("infoText").innerHTML = "Systems Loaded: " + i;
        continueSim();
        return;
      }
    },1);

  }else if (detail >= 2) {
    detailTwo();
    i++;
    moveBar(i/total)
    setTimeout(function() {
      if (i < total) {
        makeSystem(total,detail,i);
        document.getElementById("infoText").innerHTML = "Systems Loaded: " + i;
      }else{
        document.getElementById("infoText").innerHTML = "Systems Loaded: " + i;
        continueSim();
        return;
      }
    },1);
  }
}


//OTHER FUNCTIONS
function onSimLoad() {
  let i = 0;
  let currentURL = window.location.href;
  let currentValues = decodeURL(currentURL);
  simDetail = 5 //currentValues[1];
  simSystems = currentValues[0];

  makeSystem(simSystems, simDetail, 0);
}

function checker(data, key, charRange, t) {
  data = String(data);
  let foundInvalid = false;
  let foundValid = false;
  let errorCode = 0;

  if (data.length > maxDataLength) {
    return new Array(true, 2);
  }else if (data.length === 0) {
    return new Array(true, 4);
  }

  for (let i = 0; i < data.length; i++) {
    let letter = data.charAt(i);
    foundValid = false;
    for (let j = 0; j < key.length; j++) {
      if (key[j]===letter) {
        foundValid = true;
        break;
      }
    }
    if (!foundValid) {
      foundInvalid = true;

      return new Array(true, 1)
    }
  }
    let bigNumber = Math.floor(data)
    if (t==0 && bigNumber < 100) {
      return new Array(true, 3)
    }
    if (bigNumber < 0) {

      return new Array(true, 3)
    }else if (bigNumber > charRange) {
      return new Array(true, 3)
    }else {
    }
  return new Array(foundInvalid, errorCode)
}

function onClick() {
  clickSound.play();
  //console.log(makeNumbersReadable(32685.1534));



  let systems = document.getElementById("Systems");
  let stringyStuff = systems.value;
  if (checker(stringyStuff, validCharacters, maxDataNumber,0)[0] === false) {
    simSystems = stringyStuff
  }else {
    let numero = checker(stringyStuff, validCharacters, maxDataNumber,0)[1];
    errorWav.play();
    systems.value = "";
    systems.style.background = "rgb(255,106,106)";
    setTimeout(function(){
      systems.style.background = "rgb(255,255,255)";
    },1000)
    if (numero === 1) {
      systems.placeholder = "Type only numbers"
    }else if (numero === 2) {
      systems.placeholder = "Data field too long"
    }else if (numero === 3){
      systems.placeholder = "Number out of range"
    }else {
      systems.placeholder = "Data field empty"
    }
    return
  }

  let details = document.getElementById("Detail");
  stringyStuff = details.value;
  let test = checker(stringyStuff, validCharacters, maxDetailNumber,1);
  if (!test[0]){
    simDetail = stringyStuff;
  }else {
    let numero = checker(stringyStuff, validCharacters, maxDetailNumber,1)[1];
    errorWav.play();
    details.value = "";
    details.style.background = "rgb(255,106,106)";
    setTimeout(function(){
      details.style.background = "rgb(255,255,255)";
    },1000);
    if (numero === 1) {
      details.placeholder = "Type only numbers"
    }else if (numero === 2) {
      details.placeholder = "Data field too long"
    }else if (numero === 3){
      details.placeholder = "Number out of range"
    }else {
      details.placeholder = "Data field empty"
    }
    return
  }
  $(systems).fadeOut();
  $("#startSim").fadeOut();
  $(details).fadeOut();
  $(ambient).animate({
    volume: 0
  }, 1000)
  setTimeout(function(){
  window.location.replace("Simulation.html?systems="+simSystems+"#detail="+simDetail)
  }, 2000)
}

function dotify() {
  setTimeout(function() {
    makeDots();
    if (keepDotting) {
      dotify();
    }
  }, dotInterval)
}

function makeDots() {
  var star = document.createElement("div");

  let randWidth = Math.floor((Math.random() * 15) + 5);

  star.style.width = randWidth + 'px';
  star.style.height = randWidth + 'px';
  star.style.background = "white";
  star.style.borderRadius = "50px";

  let chosenHeight = Math.floor((Math.random()*maxHeight)+1);
  let chosenWidth = Math.floor((Math.random()*maxWidth)+1);

  star.style.position = "absolute";
  star.style.left = chosenWidth + 'px';
  star.style.top = chosenHeight + 'px';
  star.style.opacity = 0;
  star.style.zIndex = -1;

  document.getElementById("dots").appendChild(star);
  $(star).animate({
    opacity: 1
  }, 1000);
  let randTime = Math.floor((Math.random() * 4) + 2);
  setTimeout(function() {
    $(star).animate({
      opacity: 0
    }, 1000);
  }, randTime);
  setTimeout(function() {
    star.parentNode.removeChild(star);
  }, randTime + 3000);
}
