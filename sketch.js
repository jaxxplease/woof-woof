let mode = 0;

let lion, elephant, peacock, panda, giraffe;
let foods = [];
let draggingFood = null;
let wrongTimer = 0;
let foodX, foodY;
let feedingSuccess = false;
let confetti = [];
let clouds = [];
let gameLions = [];
let confettiTimer = 0;
let sadLionTimer =0;
let sunY;
let sunRising = false;

let bgMusic;
let amp;
let musicLevel = 0;

let elephantSound;
let lionSound;
let pandaSound;
let giraffeSound;
let peacockSound;
let cheerSound;

function preload() {
bgMusic = loadSound("Backgroundmusic.mp3");

  elephantSound = loadSound("elephant.mp3");
  lionSound = loadSound("lion.mp3");
  pandaSound = loadSound("panda.mp3")
  giraffeSound = loadSound("giraffe.mp3");
  peacockSound = loadSound("peacock.mp3");
  
  cheerSound = loadSound("cheer.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  splash = new Splash();
  
  mySlider = createSlider(0,100,50) // gui example. use the .position method in the draw function
  amp = new p5.Amplitude();
  amp.setInput(bgMusic);
lion = makeAnimal(width * 0.18, height * 0.32, width * 0.12, width * 0.24, height * 0.28, height * 0.36);

elephant = makeAnimal(width * 0.47, height * 0.32, width * 0.40, width * 0.54, height * 0.28, height * 0.36);

peacock = makeAnimal(width * 0.76, height * 0.35, width * 0.69, width * 0.83, height * 0.31, height * 0.39);

panda = makeAnimal(width * 0.32, height * 0.57, width * 0.25, width * 0.39, height * 0.52, height * 0.61);

giraffe = makeAnimal(width * 0.64, height * 0.56, width * 0.57, width * 0.74, height * 0.50, height * 0.60);

  foodX = width / 2;
  foodY = height - 80;
    sunY = height +300;
  
for (let i = 0; i < 12; i++) {
  clouds.push({
    x: random(width),
    y: random(40, 150),
    baseY: random(40, 150),
    size: random(0.6, 1.5),
    speedX: random(0.05, 0.25),
    speedY: random(0.005, 0.005),
    moveAmount: random(4, 14),
    shade: random(235, 255),
    shape: floor(random(4)),
    offset: random(1000)
  });
}
}

function makeAnimal(x, y, minX, maxX, minY, maxY) {
  return {
    x: x,
    y: y,
    targetX: x,
    targetY: y,
    minX: minX,
    maxX: maxX,
    minY: minY,
    maxY: maxY,
    timer: 0
  };
}

function draw() {

  if (mode === 0) {
    if (mouseIsPressed && splash.update()) {
      mode = 1;
      splash.hide();
    }
  }

  if (mode === 1) {
    if (bgMusic && bgMusic.isPlaying()) {
      musicLevel = amp.getLevel() * 2.5;
    } else {
      musicLevel = constrain(musicLevel, 0, 1);
    }

    drawZoo();
  }

  if (mode === 2) {
    if (bgMusic && bgMusic.isPlaying()) {
      musicLevel = amp.getLevel() * 2.5;
    } else {
      musicLevel = constrain(musicLevel, 0, 1);
    }

    drawLionGame();
  }
}

function drawZoo() {
for (let y = 0; y < height; y++) {
  let topColor = color(80, 150, 255);
  let bottomColor = color(255, 180, 210);
  let inter = map(y, 0, height, 0, 1);
  let c = lerpColor(topColor, bottomColor, inter);

  stroke(c);
  line(0, y, width, y);
}

noStroke();
  drawSky();
  drawZooDecorations();
let topY = height * 0.22;
let bottomY = height * 0.47;

drawSavannaArea(width * 0.08, topY);
drawMeadowArea(width * 0.37, topY);
drawPeacockArea(width * 0.66, topY);

drawBambooArea(width * 0.20, bottomY);
drawGiraffeArea(width * 0.52, bottomY);

  moveAnimal(lion);
  moveAnimal(elephant);
  moveAnimal(peacock);
  moveAnimal(panda);
  moveAnimal(giraffe);

  drawLion(lion.x, lion.y);
drawElephant(elephant.x, elephant.y);
drawPeacock(peacock.x, peacock.y);
  drawPanda(panda.x, panda.y);
  drawGiraffe(giraffe.x, giraffe.y);

  fill(0);
  noStroke();
  textSize(20);
  text("Press G to play the lion feeding game.", 30, 40);
  function drawZooDecorations() {
  drawWindPlants();
  drawPebblePath();
drawZooLamp(width * 0.08, height * 0.55);
drawZooLamp(width * 0.92, height * 0.55);
  drawButterflies();
drawSmallPond(width * 0.82, height * 0.58);
    
}
  
  
  function drawWindPlants() {
  for (let x = 15; x < width; x += 28) {
    let plantHeight = map(noise(x * 0.02), 0, 1, 25, 70);
    plantHeight += musicLevel * 150;

    let plantWidth = map(noise(x * 0.03 + 50), 0, 1, 8, 22);

    let sway = map(noise(frameCount * 0.015 + x * 0.05), 0, 1, -10, 10);
    sway += musicLevel * 55;

    let baseY = height - 128;

    let r = map(noise(x * 0.01), 0, 1, 35, 80);
    let g = map(noise(x * 0.02 + 20), 0, 1, 120, 190);
    let b = map(noise(x * 0.03 + 40), 0, 1, 45, 90);

    stroke(r, g, b);
    strokeWeight(map(plantHeight, 25, 70, 2, 5));

    noFill();
    beginShape();
    curveVertex(x, baseY);
    curveVertex(x, baseY);
    curveVertex(x + sway * 0.4, baseY - plantHeight * 0.5);
    curveVertex(x + sway, baseY - plantHeight);
    curveVertex(x + sway, baseY - plantHeight);
    endShape();

    noStroke();

    let type = floor(map(noise(x * 0.04 + 100), 0, 1, 0, 4));

    if (type === 0) {
      fill(r + 10, g + 20, b + 10);
      ellipse(x + sway, baseY - plantHeight, plantWidth, plantHeight * 0.35);

    } else if (type === 1) {
      fill(r + 5, g + 25, b + 5);
      ellipse(x + sway - 6, baseY - plantHeight * 0.65, plantWidth, 10);
      ellipse(x + sway + 6, baseY - plantHeight * 0.85, plantWidth, 10);

    } else if (type === 2) {
      fill(r, g, b);
      ellipse(x + sway, baseY - plantHeight, plantWidth, 10);

      let flowerColor = color(
        map(noise(x * 0.02 + 200), 0, 1, 180, 255),
        map(noise(x * 0.03 + 300), 0, 1, 80, 220),
        map(noise(x * 0.04 + 400), 0, 1, 100, 255)
      );

      fill(flowerColor);
      ellipse(x + sway, baseY - plantHeight - 7, 8, 8);
      ellipse(x + sway - 6, baseY - plantHeight - 3, 7, 7);
      ellipse(x + sway + 6, baseY - plantHeight - 3, 7, 7);
      ellipse(x + sway, baseY - plantHeight + 2, 7, 7);

      fill(255, 230, 80);
      ellipse(x + sway, baseY - plantHeight - 3, 5, 5);

    } else {
      fill(255, 120, 160);
      ellipse(x + sway - 5, baseY - plantHeight, 7, 7);

      fill(120, 180, 255);
      ellipse(x + sway + 4, baseY - plantHeight - 4, 7, 7);

      fill(255, 220, 90);
      ellipse(x + sway, baseY - plantHeight - 8, 6, 6);
    }
  }
}
  
  
function drawPebblePath() {
  noStroke();
  fill(210, 180, 130);
  ellipse(width / 2, height - 55, width * 0.75, 90);
}
  
  
  function drawZooLamp(x, y) {
  noStroke();

  fill(0, 35);
  ellipse(x, y + 94, 45, 12);

  fill(70, 55, 45);
  rect(x - 4, y, 8, 95, 4);

  fill(120, 95, 70, 120);
  rect(x - 2, y + 5, 2, 85, 2);

  fill(80, 60, 45);
  ellipse(x, y + 95, 32, 12);
  rect(x - 12, y + 82, 24, 14, 4);

  stroke(70, 55, 45);
  strokeWeight(5);
  noFill();
  arc(x + 18, y + 5, 45, 35, PI, TWO_PI);

  noStroke();

  fill(255, 220, 120, 45);
  ellipse(x + 38, y - 12, 75, 75);
  fill(255, 225, 140, 70);
  ellipse(x + 38, y - 12, 48, 48);

  fill(60, 45, 35);
  triangle(x + 18, y - 22, x + 58, y - 22, x + 38, y - 42);

  fill(255, 235, 160, 190);
  rect(x + 22, y - 22, 32, 38, 8);

  fill(255, 255, 230, 130);
  ellipse(x + 32, y - 9, 8, 22);

  stroke(60, 45, 35);
  strokeWeight(2);
  line(x + 22, y - 2, x + 54, y - 2);
  line(x + 32, y - 22, x + 32, y + 16);
  line(x + 44, y - 22, x + 44, y + 16);

  noStroke();
  fill(60, 45, 35);
  rect(x + 20, y + 13, 36, 8, 4);
}

  
  
function drawButterflies() {
  drawButterfly(120, 150, 1.0, color(255, 160, 100), 0);
  drawButterfly(280, 120, 0.7, color(255, 220, 80), 50);
  drawButterfly(480, 170, 0.9, color(180, 120, 255), 100);
  drawButterfly(650, 135, 0.6, color(100, 200, 255), 150);
  drawButterfly(800, 180, 0.8, color(255, 120, 180), 200);
  drawButterfly(950, 110, 0.55, color(140, 230, 120), 250);
  drawButterfly(1050, 210, 0.75, color(255, 190, 90), 300);
    drawButterfly(200, 420, 0.8, color(255, 170, 120), 400);
  drawButterfly(260, 390, 0.6, color(120, 200, 255), 450);
  drawButterfly(320, 430, 0.7, color(255, 220, 90), 500);

  drawButterfly(420, 410, 0.75, color(180, 120, 255), 550);
  drawButterfly(480, 440, 0.65, color(140, 230, 120), 600);

  drawButterfly(580, 390, 0.85, color(255, 140, 180), 650);
  drawButterfly(650, 420, 0.7, color(100, 220, 200), 700);
  drawButterfly(720, 400, 0.6, color(255, 200, 120), 750);
}

  
function drawButterfly(startX, startY, s, wingColor, offset) {
  let moveX = map(noise(frameCount * 0.008 + offset), 0, 1, -220, 220);
  moveX += musicLevel * 60;
  
  let moveY = map(noise(frameCount * 0.012 + offset + 200), 0, 1, -140, 140);
  moveY += musicLevel * 40;
  
  let flap = map(noise(frameCount * 0.12 + offset), 0, 1, -9, 9);
  flap += musicLevel*40

  moveX += random(-0.8,0.8);
  moveY =+ random(-0.6,0.6)
  

  push();
 translate(startX + moveX, startY + moveY + 40);;
  scale(s + musicLevel*2);

  noStroke();

  fill(wingColor);
  ellipse(-10, flap, 20, 28);
  ellipse(10, -flap, 20, 28);

  fill(red(wingColor) - 25, green(wingColor) - 25, blue(wingColor) - 25);
  ellipse(-8, 15 + flap / 2, 13, 18);
  ellipse(7, 12 - flap / 2, 13, 18);

  fill(70);
  ellipse(0, 4, 6, 24);

  stroke(70);
  strokeWeight(1);
  line(-2, -8, -8, -18);
  line(2, -8, 8, -18);

  pop();
}

  
  
  function drawSmallPond(x, y) {
  noStroke();

  fill(80, 180, 220, 180);
  ellipse(x, y, 130, 60);

  fill(120, 210, 230, 150);
  ellipse(x - 20, y - 5, 60, 20);

  let shine = map(noise(frameCount * 0.03), 0, 1, -15, 15);
  fill(255, 255, 255, 100);
  ellipse(x + shine, y - 8, 35, 8);
}

function drawWoodSign(x, y, words) {
  stroke(90, 55, 25);
  strokeWeight(5);
  line(x + 20, y + 40, x + 20, y + 100);
  line(x + 120, y + 40, x + 120, y + 100);

  noStroke();
  fill(150, 90, 45);
  rect(x, y, 140, 50, 10);

  fill(255, 235, 180);
  textSize(18);
  text(words, x + 18, y + 32);
}
}


function moveAnimal(a) {
  a.timer++;

  if (a.timer > 45) {
    a.targetX = random(a.minX, a.maxX);
    a.targetY = random(a.minY, a.maxY);
    a.timer = 0;
  }

  a.x = lerp(a.x, a.targetX, 0.025);
  a.y = lerp(a.y, a.targetY, 0.025);

  a.x = constrain(a.x, a.minX, a.maxX);
  a.y = constrain(a.y, a.minY, a.maxY);
}



function drawSky() {
  noStroke();

  drawCuteSun(width-100, 80);

  for (let i = 0; i < clouds.length; i++) {
    moveCloud(clouds[i]);
    drawCloud(clouds[i]);
    
    drawFlyingBirds();
    drawZooEntranceArch();
    drawDistantTrees();
  }

  
  function drawFlyingBirds() {
  for (let i = 0; i < 5; i++) {
    let x = (frameCount * 0.4 + i * 180) % (width + 100) - 50;
    let y = 80 + i * 18 + map(noise(frameCount * 0.01 + i), 0, 1, -10, 10);

    stroke(60);
    strokeWeight(2);
    noFill();
    arc(x, y, 18, 10, PI, TWO_PI);
    arc(x + 18, y, 18, 10, PI, TWO_PI);
  }
}
  
  
 function drawDistantTrees() {
  for (let x = 30; x < width; x += 110) {

    let sway = map(noise(frameCount * 0.01 + x), 0, 1, -4, 4);
    sway += musicLevel * random(-6, 6);

    let baseY = height - 190;
    let g = map(noise(x * 0.02), 0, 1, 140, 180);

    fill(120, 100, 70, 150);
    rect(x + 4, baseY, 8, 50);

    noStroke();
    fill(120, g, 120, 160);
    ellipse(x + sway, baseY - 20, 70, 50);
    ellipse(x - 15 + sway, baseY - 10, 55, 45);
    ellipse(x + 25 + sway, baseY - 10, 55, 45);

    fill(100, g - 20, 100, 120);
    ellipse(x + sway, baseY - 5, 60, 40);
  }
}
  
  
  function drawZooEntranceArch() {
  let x = width / 2;
  let y = 150;

  fill(120, 75, 40);
  rect(x - 120, y, 18, 120, 6);
  rect(x + 102, y, 18, 120, 6);

  noFill();
  stroke(140, 85, 45);
  strokeWeight(18);
  arc(x, y + 10, 240, 130, PI, TWO_PI);

  noStroke();
  fill(180, 100, 45);
  rect(x - 85, y - 45, 170, 45, 12);

  fill(255, 235, 180);
  textSize(24);
  text("ZOONIVERSE", x - 78, y - 15);

  drawFlag(x - 105, y - 55, color(255, 100, 100));
  drawFlag(x - 35, y - 75, color(255, 220, 80));
  drawFlag(x + 35, y - 75, color(100, 200, 255));
  drawFlag(x + 105, y - 55, color(150, 230, 120));
}
  
  
  function drawFlag(x, y, c) {
  stroke(80);
  strokeWeight(2);
  line(x, y, x, y + 35);

  noStroke();
  fill(c);
  triangle(x, y, x + 25, y + 8, x, y + 16);
}
  
  fill(80, 190, 90);
  rect(0, height - 130, width, 130);
}


function drawCuteSun(x, y) {
  noStroke();
  
  for (let i = 0; i < 20; i++) {
    let size = 180 - i * 6;
    let alpha = 25 - i * 1.2;

    fill(255, 160, 90, alpha);
    ellipse(x, y, size, size);
  }

  for (let i = 0; i < 12; i++) {
    let size = 120 - i * 4;
    let alpha = 35 - i * 2;

    fill(255, 190, 100, alpha);
    ellipse(x, y, size, size);
  }

  fill(255, 185, 85);
  ellipse(x, y, 80, 80);
}



function moveCloud(c) {
  c.x += c.speedX;

  let floatY = map(noise(frameCount * c.speedY + c.offset), 0, 1, -c.moveAmount, c.moveAmount);
  c.y = c.baseY + floatY;

  if (c.x > width + 150) {
    c.x = -150;
    c.baseY = random(40, 150);
    c.size = random(0.6, 1.5);
    c.speedX = random(0.2, 0.9);
    c.speedY = random(0.01, 0.04);
    c.moveAmount = random(4, 14);
    c.shade = random(235, 255);
    c.shape = floor(random(4));
    c.offset = random(1000);
  }
}


function drawCloud(c) {
  push();
  translate(c.x, c.y);
  scale(c.size);
  noStroke();

  fill(c.shade, c.shade, c.shade, 230);

  if (c.shape === 0) {
    ellipse(0, 0, 60, 34);
    ellipse(35, -8, 75, 45);
    ellipse(75, 0, 65, 36);
  } else if (c.shape === 1) {
    ellipse(0, 5, 50, 28);
    ellipse(28, -10, 65, 42);
    ellipse(62, 0, 70, 35);
    ellipse(95, 8, 45, 25);
  } else if (c.shape === 2) {
    ellipse(0, 0, 45, 28);
    ellipse(25, -15, 55, 40);
    ellipse(55, -8, 70, 38);
    ellipse(90, 2, 50, 30);
  } else {
    ellipse(0, 8, 55, 28);
    ellipse(30, -5, 80, 40);
    ellipse(70, -12, 65, 45);
    ellipse(105, 5, 55, 30);
  }

  fill(c.shade - 20, c.shade - 20, c.shade - 20, 80);
  ellipse(45, 12, 90, 20);

  pop();
}

function drawHabitatBlob(cx, cy, w, h, c1, c2) {
  noStroke();
  fill(0, 25);
  ellipse(cx + 8, cy + 12, w * 1.02, h * 0.95);


  fill(c1);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.35) {
    let r = 1 + map(noise(cx * 0.01 + cos(a), cy * 0.01 + sin(a)), 0, 1, -0.18, 0.18);
    let x = cx + cos(a) * w * 0.5 * r;
    let y = cy + sin(a) * h * 0.5 * r;
    curveVertex(x, y);
  }
  endShape(CLOSE);

  fill(c2);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.4) {
    let r = 1 + map(noise(cx * 0.02 + cos(a) + 30, cy * 0.02 + sin(a)), 0, 1, -0.15, 0.15);
    let x = cx + cos(a) * w * 0.38 * r;
    let y = cy + sin(a) * h * 0.35 * r;
    curveVertex(x, y);
  }
  endShape(CLOSE);
}

function drawSavannaArea(x, y) {
  drawHabitatBlob(x + 120, y + 115, 300, 190, color(220, 175, 95), color(245, 210, 130));

 
  noStroke();
  drawRock(x + 45, y + 145);
  drawRock(x + 95, y + 170);
  drawAcaciaTree(x + 185, y + 35);
}


function drawMeadowArea(x, y) {
  drawHabitatBlob(x + 120, y + 115, 310, 195, color(120, 190, 120), color(155, 220, 145));


  fill(130, 95, 65, 160);
  ellipse(x + 85, y + 135, 95, 45);
  fill(160, 120, 80, 120);
  ellipse(x + 95, y + 130, 55, 20);


  fill(80, 170, 210, 170);
  ellipse(x + 180, y + 90, 100, 45);
  fill(255, 255, 255, 80);
  ellipse(x + 165, y + 82, 40, 8);

  drawSmallBush(x + 35, y + 150);
  drawSmallBush(x + 210, y + 140);
}


function drawPeacockArea(x, y) {
  drawHabitatBlob(x + 120, y + 115, 300, 185, color(175, 205, 165), color(215, 190, 230));

 for (let i = 0; i < 16; i++) {
  let baseX = x + 40 + i * 12;
  let baseY = y + 110 + (i % 4) * 12;

  let moveX = map(noise(i * 10 + frameCount * 0.02), 0, 1, -6, 6);
  let moveY = map(noise(i * 20 + frameCount * 0.02), 0, 1, -5, 5);

  let fx = baseX + moveX;
  let fy = baseY + moveY;

  let r = map(noise(i * 30), 0, 1, 180, 255);
  let g = map(noise(i * 40), 0, 1, 120, 220);
  let b = map(noise(i * 50), 0, 1, 160, 255);

  fill(r, g, b);
  ellipse(fx - 5, fy, 9, 9);
  ellipse(fx + 5, fy, 9, 9);
  ellipse(fx, fy - 5, 9, 9);
  ellipse(fx, fy + 5, 9, 9);

  fill(255, 225, 80);
  ellipse(fx, fy, 5, 5);
}

  fill(220, 195, 150, 160);
  ellipse(x + 120, y + 145, 150, 35);

  drawSmallBush(x + 45, y + 145);
  drawSmallBush(x + 200, y + 85);
}


function drawBambooArea(x, y) {
  drawHabitatBlob(x + 125, y + 115, 320, 190, color(120, 190, 120), color(180, 230, 170));

  for (let i = 0; i < 8; i++) {
    drawBamboo(x + 25 + i * 32, y + 40 + i * 4);
  }

  drawRock(x + 55, y + 155);
  drawRock(x + 215, y + 145);

  fill(65, 150, 70, 150);
  ellipse(x + 105, y + 160, 80, 25);
  ellipse(x + 180, y + 95, 70, 22);
}


function drawGiraffeArea(x, y) {
  drawHabitatBlob(x + 130, y + 115, 325, 195, color(215, 175, 95), color(245, 215, 140));

  noStroke();
  drawAcaciaTree(x + 205, y + 20);
  drawAcaciaTree(x + 35, y + 50);
  drawRock(x + 70, y + 155);
}



function drawRock(x, y) {
  fill(130);
  ellipse(x, y, 45, 25);
  fill(100);
  ellipse(x + 25, y + 5, 40, 22);
}

function drawTree(x, y) {
  fill(120, 75, 40);
  rect(x, y + 40, 20, 80);

  fill(60, 150, 70);
  ellipse(x + 10, y + 20, 90, 80);
}

function drawAcaciaTree(x, y) {
  fill(130, 80, 40);
  rect(x, y + 70, 18, 95);

  fill(70, 150, 70);
  ellipse(x - 35, y + 55, 100, 45);
  ellipse(x + 35, y + 50, 110, 45);
  ellipse(x, y + 30, 130, 50);
}

function drawSmallBush(x, y) {
  fill(50, 160, 70);
  ellipse(x, y, 45, 30);
  ellipse(x + 25, y, 45, 30);
  ellipse(x + 12, y - 15, 45, 30);
}

function drawBigLeaf(x, y) {
  fill(30, 130, 60);
  ellipse(x, y, 35, 90);

  fill(40, 160, 70);
  ellipse(x + 20, y + 20, 35, 90);
}

function drawBamboo(x, y) {
  noStroke();
  fill(70, 150, 80);
  rect(x - 4, y, 8, 120, 6);

  fill(50, 120, 65);
  rect(x - 5, y + 25, 10, 6, 3);
  rect(x - 5, y + 55, 10, 6, 3);
  rect(x - 5, y + 85, 10, 6, 3);

  fill(120, 200, 120, 90);
  rect(x - 2, y + 10, 3, 90, 2);

  drawBambooLeaf(x + 8, y + 30, 1);
  drawBambooLeaf(x - 8, y + 50, -1);
  drawBambooLeaf(x + 10, y + 75, 1);
  drawBambooLeaf(x - 6, y + 100, -1);
}

function drawBambooLeaf(x, y, side) {
  let move = map(noise(frameCount * 0.002 + x), 0, 1, -1.2, 1.2);

  push();
  translate(x + move, y);
  scale(side, 1);

  noStroke();

  fill(55, 155, 75);
  beginShape();
  vertex(0, 0);
  bezierVertex(18, -6, 28, -4, 42, 0);
  bezierVertex(28, 4, 18, 6, 0, 0);
  endShape();

  fill(95, 190, 110, 150);
  beginShape();
  vertex(4, 0);
  bezierVertex(18, -4, 24, -2, 34, 0);
  bezierVertex(24, 2, 18, 4, 4, 0);
  endShape();

  stroke(35, 110, 55, 180);
  strokeWeight(1.2);
  line(0, 0, 40, 0);

  pop();
}


function winkEye(x, y) {
  stroke(0);
  strokeWeight(2);

  if (frameCount % 120 < 15) {
    line(x - 5, y, x + 5, y);
  } else {
    fill(0);
    ellipse(x, y, 6, 6);
  }
}

function randomSwing(speed, range, offset) {
  return map(noise(frameCount * speed + offset), 0, 1, -range, range);
}


function drawLionTail(x, y) {
  let swing = randomSwing(0.05, 14, 10);

  stroke(218, 150, 65);
  strokeWeight(5);
  noFill();
  curve(x - 15, y - 5, x, y, x + 25, y + swing, x + 45, y + swing - 5);

  noStroke();
  fill(100, 55, 25);
  ellipse(x + 35, y + swing, 20, 16);
}


function drawGiraffeTail(x, y) {
  let swing = randomSwing(0.04, 8, 620);
  let drop = randomSwing(0.025, 5, 700);

  stroke(230, 180, 80);
  strokeWeight(3);
  noFill();
  curve(x - 5, y - 5, x, y, x + 18, y + 20 + drop, x + 25, y + 35 + swing);

  noStroke();
  fill(70, 45, 25);
  ellipse(x + 23, y + 35 + swing, 10, 24);
}



function drawLionLegs(x, y) {
  let step = frameCount % 40 < 20 ? 5 : -5;

  stroke(100, 60, 30);
  strokeWeight(4);
  noFill();

  curve(x - 50, y + 10, x - 32, y + 18 + step, x - 42, y + 42, x - 28, y + 55);
  curve(x + 10, y + 10, x + 25, y + 18 - step, x + 18, y + 42, x + 35, y + 55);

  noStroke();
  fill(218, 150, 65);
  ellipse(x - 42, y + 43, 18, 25);
  ellipse(x + 18, y + 43, 18, 25);

  fill(150, 90, 45);
  ellipse(x - 38, y + 56, 28, 10);
  ellipse(x + 22, y + 56, 28, 10);
}


function drawElephantLegs(x, y) {
  let step = frameCount % 40 < 20 ? 6 : -6;

  stroke(255);
  strokeWeight(7);
  line(x - 34, y + 20 + step, x - 38, y + 48);
  line(x + 30, y + 20 - step, x + 34, y + 48);

  stroke(0);
  strokeWeight(4);
  line(x - 38, y + 45, x - 40, y + 60 + step);
  line(x + 34, y + 45, x + 36, y + 60 - step);

  noStroke();
  fill(0);
  ellipse(x - 42, y + 63 + step, 20, 7);
  ellipse(x + 38, y + 63 - step, 20, 7);
}


function drawPeacockLegs(x, y) {
  let step = frameCount % 40 < 20 ? 5 : -5;

  stroke(160, 80, 35);
  strokeWeight(6);
  noFill();

  curve(x - 55, y + 15, x - 36, y + 20 + step, x - 43, y + 45, x - 25, y + 58);
  curve(x + 5, y + 15, x + 28, y + 20 - step, x + 20, y + 45, x + 42, y + 58);

  noStroke();
  fill(235, 125, 35);
  ellipse(x - 43, y + 42, 18, 28);
  ellipse(x + 20, y + 42, 18, 28);

  fill(255, 210, 170);
  ellipse(x - 38, y + 58, 32, 11);
  ellipse(x + 25, y + 58, 32, 11);
}

function drawPandaLegs(x, y) {
  fill(0);
  noStroke();

  let step = frameCount % 45 < 22 ? 3 : -3;

  ellipse(x - 28, y + 34 + step, 30, 22);
  ellipse(x + 28, y + 34 - step, 30, 22);
}

function drawGiraffeLegs(x, y) {
  let step = frameCount % 40 < 20 ? 7 : -7;

  stroke(230, 180, 80);
  strokeWeight(6);
  line(x - 32, y + 22 + step, x - 36, y + 70);
  line(x + 30, y + 22 - step, x + 34, y + 70);

  stroke(120, 80, 40);
  strokeWeight(3);
  line(x - 36, y + 48, x - 38, y + 72 + step);
  line(x + 34, y + 48, x + 36, y + 72 - step);

  noStroke();
  fill(90, 60, 30);
  ellipse(x - 40, y + 75 + step, 20, 7);
  ellipse(x + 38, y + 75 - step, 20, 7);
}




function drawLion(x, y) {
   let bounce = musicLevel*30;
  y = y - bounce;
  
  noStroke();


  fill(0, 40);
  ellipse(x + 5, y + 60, 110, 18);

  fill(218, 150, 65);
  ellipse(x, y, 100, 55);

  fill(240, 190, 105);
  ellipse(x + 5, y + 8, 60, 30);

  fill(100, 55, 25);
  ellipse(x - 55, y - 8, 80, 80);

  fill(235, 175, 85);
  ellipse(x - 55, y - 8, 55, 50);

  fill(100, 55, 25);
  ellipse(x - 82, y - 45, 24, 24);
  ellipse(x - 30, y - 45, 24, 24);

  fill(0);
  winkEye(x - 66, y - 15);
  ellipse(x - 45, y - 15, 7, 7);
  triangle(x - 58, y - 3, x - 50, y - 3, x - 54, y + 5);

  stroke(0);
  strokeWeight(2);
  noFill();
  arc(x - 61, y + 8, 15, 12, 0, PI);
  arc(x - 48, y + 8, 15, 12, 0, PI);

  drawLionLegs(x, y);
  drawLionTail(x + 48, y - 5);
}

function drawElephant(x, y) {
     let bounce = musicLevel*30;
  y = y - bounce;
  noStroke();

  fill(0, 35);
  ellipse(x + 5, y + 65, 125, 20);

  // body
  fill(150, 160, 165);
  ellipse(x, y, 120, 70);

  // head
  ellipse(x - 60, y - 10, 65, 60);

// ears
fill(125, 135, 145);
ellipse(x - 42, y - 8, 55, 70);  
fill(150, 160, 165);
ellipse(x - 68, y - 8, 50, 65);  

fill(175, 180, 185);
ellipse(x - 70, y - 8, 26, 38);  

  stroke(150, 160, 165);
  strokeWeight(16);
  noFill();
  curve(x - 90, y - 20, x - 85, y + 5, x - 90, y + 45, x - 65, y + 60);


  noStroke();
  fill(150, 160, 165);
  ellipse(x - 88, y + 48, 18, 14);

  stroke(255);
  strokeWeight(4);
  line(x - 80, y + 10, x - 105, y + 25);

  fill(0);
  winkEye(x - 75, y - 20);

  drawElephantLegs(x, y);

  drawElephantTail(x + 60, y - 5);
  
}

function drawElephantLegs(x, y) {
  let step = frameCount % 50 < 25 ? 4 : -4;

  fill(130, 140, 145);
  noStroke();

  rect(x - 35, y + 25 + step, 22, 42, 8);
  rect(x + 25, y + 25 - step, 22, 42, 8);

  fill(100);
  ellipse(x - 24, y + 68 + step, 30, 9);
  ellipse(x + 36, y + 68 - step, 30, 9);
}

function drawElephantTail(x, y) {
  let swing = randomSwing(0.05, 8, 900);

  stroke(120);
  strokeWeight(3);
  line(x, y, x + 22, y + swing);

  noStroke();
  fill(70);
  ellipse(x + 25, y + swing, 8, 14);
}

function drawPeacock(x, y) {
     let bounce = musicLevel*30;
  y = y - bounce;
  noStroke();

  fill(0, 35);
  ellipse(x + 5, y + 62, 100, 18);


  let open = randomSwing(0.01, 5, 1200);

  fill(40, 150, 100);
  ellipse(x, y - 30 + open, 35, 100);
  ellipse(x - 30, y - 25 + open, 30, 90);
  ellipse(x + 30, y - 25 + open, 30, 90);
  ellipse(x - 55, y - 15 + open, 25, 75);
  ellipse(x + 55, y - 15 + open, 25, 75);

  fill(30, 80, 180);
  ellipse(x, y - 55 + open, 14, 14);
  ellipse(x - 30, y - 50 + open, 12, 12);
  ellipse(x + 30, y - 50 + open, 12, 12);
  ellipse(x - 55, y - 35 + open, 10, 10);
  ellipse(x + 55, y - 35 + open, 10, 10);

  fill(255, 210, 60);
  ellipse(x, y - 55 + open, 6, 6);
  ellipse(x - 30, y - 50 + open, 5, 5);
  ellipse(x + 30, y - 50 + open, 5, 5);


  fill(30, 100, 180);
  ellipse(x, y + 10, 45, 55);

  ellipse(x - 10, y - 25, 25, 55);
  ellipse(x - 15, y - 55, 28, 25);

  fill(230, 170, 40);
  triangle(x - 30, y - 55, x - 45, y - 50, x - 30, y - 47);


  fill(0);
  winkEye(x - 20, y - 60);
  stroke(30, 100, 180);
  strokeWeight(2);
  line(x - 18, y - 68, x - 22, y - 82);
  line(x - 14, y - 68, x - 14, y - 84);
  line(x - 10, y - 68, x - 6, y - 82);

  noStroke();
  fill(30, 100, 180);
  ellipse(x - 22, y - 82, 5, 5);
  ellipse(x - 14, y - 84, 5, 5);
  ellipse(x - 6, y - 82, 5, 5);

  drawPeacockLegs(x, y);
}


function drawPeacockLegs(x, y) {
  let step = frameCount % 40 < 20 ? 3 : -3;

  stroke(80, 50, 20);
  strokeWeight(3);
  line(x - 10, y + 35 + step, x - 15, y + 60);
  line(x + 10, y + 35 - step, x + 15, y + 60);

  line(x - 15, y + 60, x - 25, y + 65);
  line(x - 15, y + 60, x - 8, y + 65);

  line(x + 15, y + 60, x + 5, y + 65);
  line(x + 15, y + 60, x + 23, y + 65);
}

function drawPanda(x, y) {
     let bounce = musicLevel*30;
  y = y - bounce;
  noStroke();

  fill(0, 40);
  ellipse(x + 5, y + 58, 95, 18);

  fill(255);
  ellipse(x, y, 90, 60);
  ellipse(x - 50, y - 22, 58, 52);

  fill(0);
  ellipse(x - 72, y - 55, 25, 25);
  ellipse(x - 32, y - 55, 25, 25);

  ellipse(x - 62, y - 27, 18, 22);
  ellipse(x - 42, y - 27, 18, 22);

fill(255);
winkEye(x - 62, y - 27);
fill(0);
ellipse(x - 42, y - 27, 6, 6);

fill(255);
ellipse(x - 40, y - 29, 2, 2);

fill(0);
ellipse(x - 52, y - 12, 8, 6);
  fill(0);
  ellipse(x - 20, y + 5, 26, 40);
  ellipse(x + 28, y + 8, 26, 40);

  drawPandaLegs(x, y);

  fill(0);
  ellipse(x + 42, y + 2, 14, 14);
}

function drawGiraffe(x, y) {
     let bounce = musicLevel*30;
  y = y - bounce;
  noStroke();

  fill(0, 40);
  ellipse(x + 5, y + 78, 105, 18);

  fill(230, 180, 80);

  ellipse(x, y, 100, 55);
  rect(x - 58, y - 118, 28, 115, 12);
  ellipse(x - 58, y - 132, 55, 38);

  ellipse(x - 83, y - 148, 16, 22);
  ellipse(x - 35, y - 148, 16, 22);

  stroke(80, 50, 20);
  strokeWeight(3);
  line(x - 68, y - 150, x - 68, y - 170);
  line(x - 48, y - 150, x - 48, y - 170);

  noStroke();
  fill(100, 65, 30);
  ellipse(x - 68, y - 173, 10, 10);
  ellipse(x - 48, y - 173, 10, 10);

  fill(150, 95, 45);
  ellipse(x - 10, y - 8, 16, 16);
  ellipse(x + 20, y + 8, 16, 16);
  ellipse(x + 40, y - 10, 13, 13);
  ellipse(x - 48, y - 85, 12, 12);
  ellipse(x - 43, y - 45, 12, 12);
  ellipse(x - 65, y - 132, 9, 9);

  fill(0);
  winkEye(x - 70, y - 135);

  drawGiraffeLegs(x, y);
  drawGiraffeTail(x + 50, y - 5);
}


function mousePressed() {

  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.2);
  }

  if (mode === 1) {

    if (dist(mouseX, mouseY, lion.x, lion.y) < 75) {
      lionSound.setVolume(0.3);
      lionSound.play();
    }

    if (dist(mouseX, mouseY, elephant.x, elephant.y) < 85) {
      elephantSound.setVolume(0.15);
      elephantSound.play();
    }

    if (dist(mouseX, mouseY, peacock.x, peacock.y) < 85) {
      peacockSound.setVolume(0.2);
      peacockSound.play();
    }

    if (dist(mouseX, mouseY, panda.x, panda.y) < 75) {
      pandaSound.setVolume(1.5);
      pandaSound.play();
    }

    if (dist(mouseX, mouseY, giraffe.x, giraffe.y) < 90) {
      giraffeSound.setVolume(0.8);
      giraffeSound.play();
    }
  }
}


function keyPressed() {

  if (key === "g" || key === "G") {
    mode = 2;

    sunY = height + 300;
    sunRising = false;

    feedingSuccess = false;
    wrongTimer = 0;
    confetti = [];
    setupFoods();
  }
  
  if (key === "r" || key === "R") {
    mode = 1;

    draggingFood = null;
    sadLionTimer = 0;
    feedingSuccess = false;
  }
}

function setupFoods() {
  foods = [
    { name: "meat", x: 120, y: height - 90, good: true },
    { name: "grass", x: 220, y: height - 90, good: false },
    { name: "ice cream", x: 330, y: height - 90, good: false },
    { name: "iphone", x: 450, y: height - 90, good: false },
    { name: "shoes", x: 570, y: height - 90, good: false },
    { name: "chicken", x: 700, y: height - 90, good: true }
  ];
  
  
  function makeGameLion(x, y, s) {
  return {
    x: x,
    y: y,
    targetX: random(150, width - 150),
    targetY: random(height / 2 - 20, height - 230),
    size: s,
    speed: random(0.008, 0.025)
  };
}
  
  function moveGameLion(l) {
  l.x = lerp(l.x, l.targetX, l.speed);
  l.y = lerp(l.y, l.targetY, l.speed);

  if (dist(l.x, l.y, l.targetX, l.targetY) < 10) {
    l.targetX = random(150, width - 150);
    l.targetY = random(height / 2 - 20, height - 230);
    l.speed = random(0.008, 0.025);
  }
}

  gameLions = [
    makeGameLion(width / 2, height / 2 + 40, 1.0),
    makeGameLion(width / 2 - 180, height / 2 + 80, 0.75),
    makeGameLion(width / 2 + 190, height / 2 + 75, 0.85)
  ];
}

function moveGameLion(l) {
  l.x = lerp(l.x, l.targetX, l.speed);
  l.y = lerp(l.y, l.targetY, l.speed);

  if (dist(l.x, l.y, l.targetX, l.targetY) < 10) {
    l.targetX = random(150, width - 150);
    l.targetY = random(height / 2 - 20, height - 230);
    l.speed = random(0.008, 0.025);
  }
}

function makeGameLion(x, y, s) {
  return {
    x: x,
    y: y,
    targetX: random(150, width - 150),
    targetY: random(height / 2 - 20, height - 230),
    size: s,
    speed: random(0.008, 0.025)
  };
}

function drawLionGame() {
  drawSavannaGameBackground();

  fill(60, 35, 10);
  textSize(26);
  text("Feed the Lion!", 30, 40);
  
  fill(60, 35, 10);
textSize(18);
text("Press R to return to zoo", 30, 70);

 for (let i = 0; i < gameLions.length; i++) {
  moveGameLion(gameLions[i]);

  push();
  translate(gameLions[i].x, gameLions[i].y);
  scale(gameLions[i].size);
  drawLion(0, 0);
   drawSadLionPopup();
  pop();
}

  for (let i = 0; i < foods.length; i++) {
    drawFood(foods[i]);
  }

  if (wrongTimer > 0) {
    wrongTimer--;
  }

  if (feedingSuccess) {
    drawConfetti();
  }
}

function drawSavannaGameBackground() {
 drawDawnSky();

  if (confettiTimer > 0) {
    sunY -= 6;

    if (sunY < height * 0.15) {
      sunY = height * 0.15;
    }

    push();
  noStroke();}


  drawSunsetClouds();

  if (confettiTimer > 0) {
    sunY -= 6;

    if (sunY < height * 0.15) {
      sunY = height * 0.15;
    }

    push();
    noStroke();

    let bigSize = max(width, height) * 1.3;

    fill(255, 230, 120, 25);
    ellipse(width / 2, sunY, bigSize, bigSize);

    fill(255, 220, 90, 50);
    ellipse(width / 2, sunY, bigSize * 0.75, bigSize * 0.75);

    fill(255, 210, 70);
    ellipse(width / 2, sunY, bigSize * 0.45, bigSize * 0.45);

    pop();
  }

  fill(245, 205, 120);
  rect(0, height - 220, width, 220);

  fill(230, 175, 80);
  ellipse(width / 2, height - 120, width * 0.9, 160);

  drawAcaciaTree(110, height - 360);
  drawAcaciaTree(width - 220, height - 340);

  drawRock(90, height - 110);
  drawRock(width - 130, height - 130);
}


function drawSunsetClouds() {
  for (let i = 0; i < 6; i++) {
    let x = (frameCount * 0.3 + i * 220) % (width + 200) - 100;
    let y = 70 + i * 35;

    push();
    translate(x, y);

    noStroke();
    fill(255, 230, 200, 180);

    ellipse(0, 0, 90, 35);
    ellipse(40, -12, 80, 45);
    ellipse(85, 0, 100, 38);
    ellipse(130, 5, 70, 30);

    pop();
  }
}

function drawDawnSky() {

  if (sadLionTimer > 0) {
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);

      let topColor = color(10, 20, 60);
      let bottomColor = color(30, 40, 90);

      let c = lerpColor(topColor, bottomColor, inter);

      stroke(c);
      line(0, y, width, y);
    }

    noStroke();

    drawRainClouds(); 
  }

  let sunriseAmount = map(confettiTimer, 0, 300, 0, 1);
  sunriseAmount = constrain(sunriseAmount, 0, 1);

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);

    let dawnTop = color(25, 45, 100);
    let dawnBottom = color(180, 120, 130);

    let sunriseTop = color(80, 150, 255);
    let sunriseMid = color(255,160,190)
    let sunriseBottom = color(255, 210, 150);

    let dawnColor = lerpColor(dawnTop, dawnBottom, inter);
    let sunriseColor = lerpColor(sunriseTop, sunriseBottom, inter);

    let finalColor = lerpColor(dawnColor, sunriseColor, sunriseAmount);

    stroke(finalColor);
    line(0, y, width, y);
  }

  noStroke();
}


function drawRainClouds() {
  for (let i = 0; i < 5; i++) {

    let x = (frameCount * 0.5 + i * 200) % (width + 200) - 100;
    let y = 80 + i * 20;

    fill(80, 90, 120, 200);
    ellipse(x, y, 100, 40);
    ellipse(x + 40, y - 10, 90, 50);
    ellipse(x + 90, y, 110, 45);
    
    stroke(150, 180, 255, 180);
    strokeWeight(2);

    for (let r = 0; r < 12; r++) {
      let rx = x + random(0, 100);
      let ry = y + random(10, 80);

      line(rx, ry, rx, ry + 10);
    }

    noStroke();
  }
}


function drawFood(f) {
  push();
  translate(f.x, f.y);

  noStroke();
  fill(0, 35);
  ellipse(0, 28, 55, 10);

 if (f.name === "meat") {
  fill(0, 35);
  ellipse(3, 22, 58, 10);

  fill(245, 225, 195);
  rect(-34, -5, 68, 12, 6);
  ellipse(-38, 1, 18, 18);
  ellipse(38, 1, 18, 18);

  fill(160, 35, 30);
  ellipse(0, 0, 55, 38);

  fill(120, 25, 25, 90);
  ellipse(5, 5, 42, 25);
  fill(255, 210, 180, 180);
  ellipse(-10, -8, 25, 10);

  fill(255, 120, 100, 130);
  ellipse(-8, -10, 18, 8);

  noStroke();
}

if (f.name === "grass") {
  fill(0, 35);
  ellipse(0, 24, 50, 10);

  fill(70, 170, 90);
  ellipse(0, 10, 30, 10);

  noStroke();

  fill(60, 160, 80);
  triangle(-15, 10, -5, -15, 5, 10);

  fill(80, 190, 100);
  triangle(-5, 10, 0, -20, 8, 10);

  fill(50, 150, 75);
  triangle(5, 10, 18, -12, 20, 10);

  noStroke();
}

  if (f.name === "ice cream") {
    fill(210, 150, 80);
    triangle(-15, 10, 15, 10, 0, 42);
    fill(255, 210, 230);
    ellipse(0, 0, 32, 32);
  }

  if (f.name === "iphone") {
    fill(20);
    rect(-16, -25, 32, 52, 7);
    fill(80, 150, 220);
    rect(-12, -20, 24, 40, 4);
    fill(230);
    ellipse(0, 23, 4, 4);
  }

if (f.name === "shoes") {
  fill(0, 35);
  ellipse(5, 28, 60, 10);

  noStroke();

  fill(110, 75, 45);
  rect(-28, -5, 22, 30, 6);  
  ellipse(-17, 25, 35, 18);  

  rect(8, -5, 22, 30, 6);
  ellipse(20, 25, 35, 18);
  fill(70, 50, 35);
  ellipse(-17, 28, 35, 8);
  ellipse(20, 28, 35, 8);
  fill(160, 120, 80, 120);
  rect(-25, -2, 10, 10, 3);
  rect(11, -2, 10, 10, 3);

  noStroke();
}

  if (f.name === "chicken") {
    fill(190, 95, 40);
    ellipse(0, 0, 42, 32);
    fill(255, 230, 190);
    rect(18, -5, 25, 10, 5);
    ellipse(42, -7, 12, 12);
    ellipse(42, 7, 12, 12);
  }


  pop();
}

function drawSadLionPopup() {
  if (sadLionTimer <= 0) return;

  sadLionTimer--;

  push();

  resetMatrix();

  let cx = width / 2;
  let cy = height / 2;

  translate(cx, cy - 40);
  scale(2.1);

  noStroke();

  fill(255, 240, 200, 220);
  ellipse(0, 0, 130, 130);

  fill(110, 65, 30);
  ellipse(0, 0, 105, 105);


  fill(235, 175, 85);
  ellipse(0, 0, 78, 72);

  fill(110, 65, 30);
  ellipse(-42, -42, 28, 28);
  ellipse(42, -42, 28, 28);

  fill(235, 175, 85);
  ellipse(-42, -42, 14, 14);
  ellipse(42, -42, 14, 14);

  stroke(0);
  strokeWeight(2);
  noFill();
  arc(-18, -10, 18, 12, PI, TWO_PI);
  arc(18, -10, 18, 12, PI, TWO_PI);

  noStroke();
  fill(80, 170, 255, 220);
  ellipse(-18, 5, 8, 14);
  ellipse(18, 5, 8, 14);

  fill(60, 35, 20);
  triangle(-7, 8, 7, 8, 0, 16);

  stroke(60, 35, 20);
  strokeWeight(2);
  noFill();
  arc(0, 33, 28, 18, PI, TWO_PI);

  pop();
  push();
  resetMatrix();

  pop();
}

function mouseDragged() {
  if (mode === 2) {
    for (let i = foods.length - 1; i >= 0; i--) {
      if (dist(mouseX, mouseY, foods[i].x, foods[i].y) < 45) {
        draggingFood = foods[i];
        break;
      }
    }

    if (draggingFood) {
      draggingFood.x = mouseX;
      draggingFood.y = mouseY;
    }
  }
}

function mouseReleased() {
  if (mode === 2 && draggingFood) {
    let fedLion = false;

    for (let i = 0; i < gameLions.length; i++) {
      let l = gameLions[i];

      let mouthX = l.x - 55 * l.size;
      let mouthY = l.y + 8 * l.size;

      if (dist(draggingFood.x, draggingFood.y, mouthX, mouthY) < 55 * l.size) {
        fedLion = true;

        if (draggingFood.good) {
          feedingSuccess = true;
          
          sunY = height +200;
          
          if(!cheerSound.isPlaying()){
            cheerSound.play();
          }
          makeConfetti();
        } else {
          if(sadLionTimer <=0){
            sadLionTimer = 180;
          }
        if(!lionSound.isPlaying()){
          lionSound.play();
        }
        }
        setupFoods();
        break;
      }
    }

    draggingFood = null;
  }
}

function drawBigLion(x, y) {
  noStroke();

  fill(0, 40);
  ellipse(x, y + 120, 250, 30);

  fill(100, 55, 25);
  ellipse(x, y, 230, 230);

  fill(235, 175, 85);
  ellipse(x, y, 155, 155);

  fill(100, 55, 25);
  ellipse(x - 90, y - 80, 50, 50);
  ellipse(x + 90, y - 80, 50, 50);

  fill(0);
  winkEye(x - 40, y - 30);
  ellipse(x + 40, y - 30, 15, 15);

  triangle(x - 10, y + 5, x + 10, y + 5, x, y + 18);

  stroke(0);
  strokeWeight(3);
  noFill();
  arc(x - 20, y + 35, 40, 35, 0, PI);
  arc(x + 20, y + 35, 40, 35, 0, PI);
}

function makeConfetti() {
  confetti = [];
  confettiTimer = 300;
  
  for (let i = 0; i < 80; i++) {
    confetti.push({
      x: random(width),
      y: random(-100, 0),
      speed: random(2, 6),
      size: random(6, 12)
    });
  }
}

function drawConfetti() {
  
  if(confettiTimer <=0) return;
  confettiTimer--;
  noStroke();

  for (let i = 0; i < confetti.length; i++) {
    fill(random(255), random(255), random(255));
    rect(confetti[i].x, confetti[i].y, confetti[i].size, confetti[i].size);

    confetti[i].y += confetti[i].speed;

    if (confetti[i].y > height) {
      confetti[i].y = random(-100, 0);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
