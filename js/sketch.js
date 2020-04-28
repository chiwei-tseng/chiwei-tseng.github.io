let title = "LET'S BEAT THE VIRUS!";
let rules = "1. Drag the virus in the washing machine.  2. Choose your method.  3. Turn ON.  4.And turn OFF.";
let end = "THANK YOU!";

let wx, wy, ww, wh, cx, cy,cr;

let button;
let col0, col1, col2, col3, col4, col5, col6, col7, col8;

let bgColor;

let method;
let mw, mh, mc;
let m1x, m1y, m2x, m2y, m3x, m3y, m4x, m4y, m5x, m5y, m6x, m6y;
let onx, ony, offx, offy, bw, bh;

let virusImg;
let virusSize;
let virus;
let v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, v5x, v5y, v6x, v6y, v7x, v7y, v8x, v8y, v9x, v9y, v10x, v10y;
let dragging = false; // Is the object being dragged?
let offsetX, offsetY;    // Mouseclick offset

var vrs = [
	{ x: 100, y: 200, active: false },
	{ x: 200, y: 400, active: false },
	{ x: 400, y: 500, active: false },
  { x: 280, y: 680, active: false },
  { x: 1200, y: 130,  active: false },
  { x: 650, y: 80, active: false },
  { x: 800, y: 700, active: false },
  { x: 1000, y: 200, active: false },
  { x: 1100, y: 640, active: false },
  { x: 950, y: 450,  active: false },
]




var x = 0;

let isOn = false;
let isOff = false;

let smile = [];

let start, spin, finish;

function preload() {
  virusImg = loadImage('data/virus.png');

  soundFormats('mp3');
  start = loadSound('data/start.mp3');
  spin = loadSound('data/spin.mp3');
  finish = loadSound('data/finish.mp3');

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  strokeWeight(1);
  textFont('Source Sans Pro');

  for (let i = 0; i < 30; i++) {
  smile.push(new Smile());
}

  method = new Method();
  virus = new Virus();
  virusSize = width/12;


  offsetX = 0;
  offsetY = 0;

  wx = width/2;
  wy = height/1.7;
  ww = width/2.5;
  wh = width/2.5;
  cx = width/2;
  cy = wy+55;
  cr = width/4;

  m1x = wx-ww/3.6;
  m1y = wy-wh/2.25;
  m2x = m1x;
  m2y = wy-wh/2.66;
  m3x = m1x;
  m3y = wy-wh/3.25;
  m4x = wx;
  m4y = m1y;
  m5x = m4x;
  m5y = m2y;
  m6x = m4x;
  m6y = m3y;

  onx = wx+ww/3.5;
  ony = wy-wh/2.4;
  offx = wx+ww/3.5;
  offy = wy-wh/3;
  bw = width/15;
  bh = height/25;

  col0 = color(0);
  col1 = color(216, 70, 70)
  col2 = color(216, 124, 70);
  col3 = color(237, 218, 74);
  col4 = color(163, 216, 107);
  col5 = color(0, 139, 206);
  col6 = color(107, 122, 216);
  col7 = color(255, 255, 255, 0);
  col8 = color(255);

  bgColor = color(0);

  button = createButton('Wear Masks');
  button.position(wx-ww/2.75, wy-wh/2.15);
  button.mousePressed(changeColor1);
  button.style('font-size', '12px');
  button.style('font-family', 'Source Sans Pro');
  button.style('color', col7)
  button.style('background-color', col7);
  button.style('border-color', col7);

  button = createButton('Social Distancing');
  button.position(wx-ww/2.6, wy-wh/2.54);
  button.mousePressed(changeColor2);
  button.style('font-size', '12px');
  button.style('font-family', 'Source Sans Pro');
  button.style('color', col7)
  button.style('background-color', col7);
  button.style('border-color', col7);

  button = createButton('Disinfection');
  button.position(wx-ww/2.8, wy-wh/3.07);
  button.mousePressed(changeColor3);
  button.style('font-size', '12px');
  button.style('font-family', 'Source Sans Pro');
  button.style('color', col7)
  button.style('background-color', col7);
  button.style('border-color', col7);

  button = createButton('Wash Hands');
  button.position(wx-ww/11.5, wy-wh/2.15);
  button.mousePressed(changeColor4);
  button.style('font-size', '12px');
  button.style('font-family', 'Source Sans Pro');
  button.style('color', col7)
  button.style('background-color', col7);
  button.style('border-color', col7);

  button = createButton('No Face-touching');
  button.position(wx-ww/9, wy-wh/2.54);
  button.mousePressed(changeColor5);
  button.style('font-size', '12px');
  button.style('font-family', 'Source Sans Pro');
  button.style('color', col7)
  button.style('background-color', col7);
  button.style('border-color', col7);

  button = createButton('Stay Home');
  button.position(wx-ww/12.5, wy-wh/3.07);
  button.mousePressed(changeColor6);
  button.style('font-size', '12px');
  button.style('font-family', 'Source Sans Pro');
  button.style('color', col7)
  button.style('background-color', col7);
  button.style('border-color', col7);

  //ON
  button = createButton('ON');
  button.position(onx-bw/4, ony-bh/2.3);
  button.mousePressed(rollVirus);
  button.style('font-size', '18px');
  button.style('font-family', 'Source Sans Pro');
  button.style('color', col7)
  button.style('textAlign', CENTER, CENTER);
  button.style('background-color', col7);
  button.style('border-color', col7);

  //OFF
  button = createButton('OFF');
  button.position(offx-bw/3.5, offy-bh/2.3);
  button.mousePressed(ending);
  button.style('font-size', '18px');
  button.style('font-family', 'Source Sans Pro');
  button.style('color', col7)
  button.style('textAlign', CENTER, CENTER);
  button.style('background-color', col7);
  button.style('border-color', col7);


}

function draw() {
  background(bgColor);

  //start.play();

  //title
  fill(255);
  textAlign(CENTER, BOTTOM);
  textSize(100);
  text(title, width/2, height/6);

  //rules
  fill(255);
  textAlign(CENTER, BOTTOM);
  textSize(20);
  text(rules, width/2, height/5);

  //washingMachine
  fill(255);
  rect(wx, wy, ww, wh, 30);
  fill(bgColor);
  circle(cx, cy, cr);
  line(wx-ww/2, wy-wh/4, wx+ww/2, wy-wh/4);

  method.draw();


  if(!isOn){
      virus.draw();
  }

  if(isOn){
    x+= 0.02;
    translate (cx, cy);
    rotate(x);
    //rotate(radians(frameCount/0.5));
    image(virusImg, 20, 20,virusSize,virusSize);

    //start.stop();
    spin.play();

  }

  if(isOff){
    isOn = false;
    background(255);
	  

    for (let i = 0; i < smile.length; i++) {
    smile[i].draw();
  }

    spin.stop();
    //finish.play();

  }

    //end
    fill(bgColor);
    textAlign(CENTER, CENTER);
    textSize(200);
    text(end, width/2, height/7);



}

function changeColor1() {
  bgColor = col1;
}
function changeColor2() {
  bgColor = col2;
}
function changeColor3() {
  bgColor = col3;
}
function changeColor4() {
  bgColor = col4;
}
function changeColor5() {
  bgColor = col5;
}
function changeColor6() {
  bgColor = col6;
}
function rollVirus() {

}
function ending() {

}

class Method{
  constructor() {

    mw = width/10;
    mh = height/30;
    mc = 10;

  }
  draw() {


    fill(col0);
    rect(m1x, m1y, mw, mh, mc);
    textAlign(CENTER, CENTER);
    fill(col8);
    textSize(12);
    text("Wear Masks", m1x, m1y);

    if (mouseX > m1x-mw/2 && mouseX < m1x+mw/2 && mouseY > m1y-mh/2 && mouseY < m1y+mh/2) {
        fill(col1);
        rect(m1x, m1y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("Wear Masks", m1x, m1y);

      }

      if (mouseX > m2x-mw/2 && mouseX < m2x+mw/2 && mouseY > m2y-mh/2 && mouseY < m2y+mh/2) {
        fill(col2);
        rect(m2x, m2y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("Social Distancing", m2x, m2y);

      } else {
        fill(col0);
        rect(m2x, m2y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("Social Distancing", m2x, m2y);

      }

      if (mouseX > m3x-mw/2 && mouseX < m3x+mw/2 && mouseY > m3y-mh/2 && mouseY < m3y+mh/2) {
        fill(col3);
        rect(m3x, m3y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("Disinfection", m3x, m3y);

      } else {
        fill(col0);
        rect(m3x, m3y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("Disinfection", m3x, m3y);

      }

      if (mouseX > m4x-mw/2 && mouseX < m4x+mw/2 && mouseY > m4y-mh/2 && mouseY < m4y+mh/2) {
        fill(col4);
        rect(m4x, m4y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("Wash Hands", m4x, m4y);

      } else {
        fill(col0);
        rect(m4x, m4y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("Wash Hands", m4x, m4y);

      }

      if (mouseX > m5x-mw/2 && mouseX < m5x+mw/2 && mouseY > m5y-mh/2 && mouseY < m5y+mh/2) {
        fill(col5);
        rect(m5x, m5y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("No Face-touching", m5x, m5y);

      } else {
        fill(col0);
        rect(m5x, m5y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("No Face-touching", m5x, m5y);

      }

      if (mouseX > m6x-mw/2 && mouseX < m6x+mw/2 && mouseY > m6y-mh/2 && mouseY < m6y+mh/2) {
        fill(col6);
        rect(m6x, m6y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("Stay Home", m6x, m6y);

      } else {
        fill(col0);
        rect(m6x, m6y, mw, mh, mc);
        textAlign(CENTER, CENTER);
        fill(col8);
        textSize(12);
        text("Stay Home", m6x, m6y);

      }


      //ON
      if (mouseX > onx-bw/2 && mouseX < onx+bw/2 && mouseY > ony-bh/2 && mouseY < ony+bh/2) {
        fill(bgColor);
        strokeWeight(1);
        rect(onx, ony, bw, bh);
        fill(col8);
        textAlign(CENTER, CENTER);
        textSize(18);
        text("ON", onx, ony);

      } else {
        fill(col0);
        strokeWeight(1);
        rect(onx, ony, bw, bh);
        fill(col8);
        textAlign(CENTER, CENTER);
        textSize(18);
        text("ON", onx, ony);

      }

      //OFF
      if (mouseX > offx-bw/2 && mouseX < offx+bw/2 && mouseY > offy-bh/2 && mouseY < offy+bh/2) {
        fill(bgColor);
        strokeWeight(1);
        rect(offx, offy, bw, bh);
        fill(col8);
        textAlign(CENTER, CENTER);
        textSize(18);
        text("OFF", offx, offy);

      } else {
        fill(col0);
        strokeWeight(1);
        rect(offx, offy, bw, bh);
        fill(col8);
        textAlign(CENTER, CENTER);
        textSize(18);
        text("OFF", offx, offy);

      }

}

}

class Virus{
  constructor() {
    //this.x = random(150, width-150);
    //this.y = random(150, height-150);
/*
    v1x = 100;
    v1y = 200;
    v2x = 200;
    v2y = 400;
    v3x = 400;
    v3y = 500;
    v4x = 280;
    v4y = 680;
    v5x = 600;
    v5y = 50;
    v6x = 750;
    v6y = 100;
    v7x = 800;
    v7y = 750;
    v8x = 1000;
    v8y = 200;
    v9x = 1100;
    v9y = 640;
    v10x = 950;
    v10y = 450;
*/
  }

  draw() {

    if (vrs.length > 0) {
      for (var i = 0; i < vrs.length; i++) {
        var vr = vrs[i];
        image(virusImg, vr.x, vr.y, virusSize, virusSize);
      }
    }

/*
    image(virusImg, v1x, v1y, virusSize, virusSize);
    image(virusImg, v2x, v2y, virusSize, virusSize);
    image(virusImg, v3x, v3y, virusSize, virusSize);
    image(virusImg, v4x, v4y, virusSize, virusSize);
    image(virusImg, v5x, v5y, virusSize, virusSize);
    image(virusImg, v6x, v6y, virusSize, virusSize);
    image(virusImg, v7x, v7y, virusSize, virusSize);
    image(virusImg, v8x, v8y, virusSize, virusSize);
    image(virusImg, v9x, v9y, virusSize, virusSize);
    image(virusImg, v10x, v10y, virusSize, virusSize);
*/
  /* if (dragging) {
      v1x = mouseX + offsetX;
      v1y = mouseY + offsetY;
      v2x = mouseX + offsetX;
      v2y = mouseY + offsetY;
      v3x = mouseX + offsetX;
      v3y = mouseY + offsetY;
      v4x = mouseX + offsetX;
      v4y = mouseY + offsetY;
      v5x = mouseX + offsetX;
      v5y = mouseY + offsetY;
      v6x = mouseX + offsetX;
      v6y = mouseY + offsetY;
      v7x = mouseX + offsetX;
      v7y = mouseY + offsetY;
      v8x = mouseX + offsetX;
      v8y = mouseY + offsetY;
      v9x = mouseX + offsetX;
      v9y = mouseY + offsetY;
      v10x = mouseX + offsetX;
      v10y = mouseY + offsetY;
    } */

/*
    if (dist(v1x, v1y, mouseX, mouseY) < virusSize ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }

    if (dist(v2x, v2y, mouseX, mouseY) < 100 ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }

    if (dist(v3x, v3y, mouseX, mouseY) < virusSize ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }

    if (dist(v4x, v4y, mouseX, mouseY) < virusSize ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }

    if (dist(v5x, v5y, mouseX, mouseY) < virusSize ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }

    if (dist(v6x, v6y, mouseX, mouseY) < virusSize ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }

    if (dist(v7x, v7y, mouseX, mouseY) < virusSize ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }

    if (dist(v8x, v8y, mouseX, mouseY) < virusSize ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }

    if (dist(v9x, v9y, mouseX, mouseY) < virusSize ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }

    if (dist(v10x, v10y, mouseX, mouseY) < virusSize ) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
*/
}

}

class Smile{
  constructor() {

    this.x = random(width);
    this.y = random(200,height);
    this.diameter = random(width/12, width/5);

  }

  draw() {

    stroke(bgColor);
    strokeWeight(4);
    fill(255);
    circle(this.x, this.y, this.diameter);

    fill(bgColor);
    circle(this.x-30, this.y-20, this.diameter/10);
    circle(this.x+30, this.y-20, this.diameter/10);

    noFill();
    arc(this.x, this.y, this.diameter*0.7, this.diameter*0.7, 0, PI);


  }


}

function mouseReleased(){

  if(!isOn){
    if (mouseX > onx-bw/2 && mouseX < onx+bw/2 && mouseY > ony-bh/2 && mouseY < ony+bh/2) {
      isOn = true;
      //isOff = false;
    } else {
      isOn = false;
    }
    //return isOn;
  }

  if(!isOff){
  if (mouseX > offx-bw/2 && mouseX < offx+bw/2 && mouseY > offy-bh/2 && mouseY < offy+bh/2) {
    //isOn = false;
    if(isOn = true){
    isOff = true;
  } else {
    isOff = false;
  }
  //return isOff;

}

}

}

function mousePressed() {
	if (vrs.length > 0) {
		for (var i = 0; i < vrs.length; i++) {
			var vr = vrs[i],
					distance = dist(mouseX, mouseY, vr.x, vr.y);
			if (distance < virusSize) {
				vr.active = true;
			} else {
				vr.active = false;
			}
		}
	}
  // Prevent default functionality.
  return false;
}

function mouseDragged() {
	if (vrs.length > 0) {
		for (var i = 0; i < vrs.length; i++) {
			var vr = vrs[i];
			if (vr.active) {
				vr.x = mouseX;
				vr.y = mouseY;
				break;
			}
		}
	}
  // Prevent default functionality.
  return false;
}

/*
function mousePressed() {
 v1x = mouseX;
 v1y = mouseY;
 v2x = mouseX;
 v2y = mouseY;
 v3x = mouseX;
 v3y = mouseY;
 v4x = mouseX;
 v4y = mouseY;
 v5x = mouseX;
 v5y = mouseY;
 v6x = mouseX;
 v6y = mouseY;
 v7x = mouseX;
 v7y = mouseY;
 v8x = mouseX;
 v8y = mouseY;
 v9x = mouseX;
 v9y = mouseY;
 v9x = mouseX;
 v9y = mouseY;
}
*/
/*
function mouseDragged() {

var diff = v1x - mouseX;
v1x = v1x - diff;
v1x = mouseX;
var diff = v1y - mouseY;
v1y = v1y - diff;
v1y = mouseY;

var diff = v2x - mouseX;
v2x = v2x - diff;
v2x = mouseX;
var diff = v2y- mouseY;
v2y = v2y - diff;
v2y = mouseY;

var diff = v3x - mouseX;
v3x = v3x - diff;
v3x = mouseX;
var diff = v3y- mouseY;
v3y = v3y - diff;
v3y = mouseY;

var diff = v4x - mouseX;
v4x = v4x - diff;
v4x = mouseX;
var diff = v4y - mouseY;
v4y = v4y - diff;
v4y = mouseY;

var diff = v5x - mouseX;
v5x = v5x - diff;
v5x = mouseX;
var diff = v5y- mouseY;
v5y = v5y - diff;
v5y = mouseY;

var diff = v6x - mouseX;
v6x = v6x - diff;
v6x = mouseX;
var diff = v6y- mouseY;
v6y = v6y - diff;
v6y = mouseY;

var diff = v7x - mouseX;
v7x = v7x - diff;
v7x = mouseX;
var diff = v7y - mouseY;
v7y = v7y - diff;
v7y = mouseY;

var diff = v8x - mouseX;
v8x = v8x - diff;
v8x = mouseX;
var diff = v8y- mouseY;
v8y = v8y - diff;
v8y = mouseY;

var diff = v9x - mouseX;
v9x = v9x - diff;
v9x = mouseX;
var diff = v9y- mouseY;
v9y = v9y - diff;
v9y = mouseY;

var diff = v10x - mouseX;
v10x = v10x - diff;
v10x = mouseX;
var diff = v10y- mouseY;
v10y = v10y - diff;
v10y = mouseY;


}
*/
/*
function mousePressed() {
  // Did I click on the rectangle?
  if (mouseX > v1x && mouseX < v1x + virusSize && mouseY > v1y && mouseY < v1y + virusSize) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = v1x-mouseX;
    offsetY = v1y-mouseY;
  }

}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}

*/
