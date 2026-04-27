var mode = 0;

let lionX = 120;
let zebraX = 320;
let pandaX = 540;
let giraffeX = 760;
let tigerX = 980;

let splash;
let mySlider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  splash = new Splash();

  mySlider = createSlider();

  rectMode(CORNER);
}

function draw() {
  if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;}
if (mode == 1) {
    splash.hide();

    drawSky();

    drawGrass();

    drawPath();

    drawZooSigns();

    drawLionArea();

    drawZebraArea();

    drawPandaArea();

    drawGiraffeArea();

    drawTigerArea();

    drawLion(lionX, 220);

    drawZebra(zebraX, 220);

    drawPanda(pandaX, 470);

    drawGiraffe(giraffeX, 430);

    drawTiger(tigerX, 220);
  }
}



function drawSky() {

  background(135, 206, 235);

  fill(255, 220, 80);

  noStroke();

  ellipse(120, 90, 90, 90);

  drawCloud(260, 90);

  drawCloud(620, 70);

  drawCloud(980, 110);
}

function drawCloud(x, y) {

  fill(255);

  ellipse(x, y, 60, 40);

  ellipse(x + 25, y - 10, 50, 35);

  ellipse(x + 50, y, 60, 40);
}

// ---------------- GROUND ----------------

function drawGrass() {

  fill(120, 200, 110);

  noStroke();

  rect(0, height * 0.22, width, height * 0.78);
}

function drawPath() {

  fill(210, 190, 150);

  ellipse(width / 2, height - 30, width * 1.2, 180);
}



function drawZooSigns() {

  fill(90, 60, 30);

  rect(40, 120, 12, 70);

  rect(52, 120, 12, 70);

  fill(255, 245, 200);

  rect(15, 80, 75, 45, 8);

  fill(60, 40, 20);

  textSize(22);

  text("ZOO", 52, 102);
}



function drawLionArea() {

  drawGardenZone(140, 230, "Lions", color(255, 230, 170));

  drawRock(75, 270);

  drawRock(200, 285);
}

function drawZebraArea() {

  drawGardenZone(340, 230, "Zebras", color(235, 245, 220));

  drawBush(290, 285);

  drawBush(390, 285);
}

function drawPandaArea() {

  drawGardenZone(550, 470, "Pandas", color(220, 245, 220));

  drawBamboo(495, 430);

  drawBamboo(610, 430);
}

function drawGiraffeArea() {

  drawGardenZone(780, 430, "Giraffes", color(255, 235, 180));

  drawTree(700, 350);

  drawTree(860, 360);
}

function drawTigerArea() {

  drawGardenZone(1000, 230, "Tigers", color(255, 220, 180));

  drawBush(930, 285);

  drawRock(1080, 285);
}



function drawGardenZone(x, y, label, c) {

  fill(c);

  noStroke();

  ellipse(x, y, 240, 170);

  fill(70, 120, 50);

  textSize(20);

  text(label, x, y - 105);
}

function drawBush(x, y) {

  fill(50, 150, 70);

  ellipse(x, y, 35, 30);

  ellipse(x + 18, y - 6, 30, 26);

  ellipse(x + 34, y, 35, 30);
}

function drawRock(x, y) {

  fill(140);

  ellipse(x, y, 35, 22);
}

function drawTree(x, y) {

  fill(120, 80, 40);

  rect(x, y, 15, 55);

  fill(40, 160, 70);

  ellipse(x + 7, y - 10, 60, 50);

  ellipse(x - 10, y + 5, 40, 35);

  ellipse(x + 22, y + 5, 40, 35);
}

function drawBamboo(x, y) {

  fill(70, 170, 80);

  rect(x, y, 8, 70);

  rect(x + 15, y - 10, 8, 80);

  fill(60, 150, 70);

  ellipse(x - 6, y + 15, 16, 8);

  ellipse(x + 28, y + 5, 16, 8);
}


function drawLion(x, y) {

  let blink = frameCount % 120 < 8;

  fill(230, 180, 70);

  ellipse(x, y, 70, 42);

  fill(150, 90, 30);

  ellipse(x - 28, y - 18, 45, 45);

  fill(230, 180, 70);

  ellipse(x - 28, y - 18, 28, 28);

  fill(0);

  if (blink) {

    stroke(0);

    line(x - 34, y - 20, x - 30, y - 20);

    line(x - 26, y - 20, x - 22, y - 20);

    noStroke();

  } else {

    ellipse(x - 33, y - 20, 3, 3);

    ellipse(x - 24, y - 20, 3, 3);
  }
}



function drawZebra(x, y) {

  let blink = frameCount % 110 < 8;

  fill(255);

  ellipse(x, y, 68, 38);

  stroke(0);

  line(x - 18, y - 14, x - 18, y + 12);

  line(x - 4, y - 15, x - 4, y + 13);

  line(x + 10, y - 14, x + 10, y + 12);

  noStroke();

  fill(0);

  if (blink) {

    stroke(0);

    line(x - 34, y - 35, x - 30, y - 35);

    noStroke();

  } else {

    ellipse(x - 32, y - 35, 3, 3);
  }
}



function drawPanda(x, y) {

  fill(255);

  ellipse(x, y, 65, 45);

  fill(0);

  ellipse(x - 18, y + 8, 18, 18);

  ellipse(x + 18, y + 8, 18, 18);

  ellipse(x - 36, y - 30, 10, 10);

  ellipse(x - 15, y - 30, 10, 10);
}



function drawGiraffe(x, y) {

  fill(240, 200, 90);

  ellipse(x, y, 60, 30);

  rect(x - 10, y - 72, 12, 50, 3);

  ellipse(x - 4, y - 82, 28, 20);
}



function drawTiger(x, y) {

  let blink = frameCount % 118 < 8;

  fill(255, 145, 50);

  ellipse(x, y, 70, 40);

  stroke(0);

  line(x - 14, y - 14, x - 9, y + 10);

  line(x, y - 14, x + 5, y + 10);

  line(x + 14, y - 14, x + 19, y + 10);

  noStroke();

  fill(0);

  if (blink) {

    stroke(0);

    line(x - 35, y - 20, x - 31, y - 20);

    line(x - 27, y - 20, x - 23, y - 20);

    noStroke();

  } else {

    ellipse(x - 34, y - 20, 3, 3);

    ellipse(x - 24, y - 20, 3, 3);
  }
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
}