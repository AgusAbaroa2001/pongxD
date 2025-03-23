let x1, y1, x2, y2;
let a1, b1;
let speed = 10;
let techo = 20;  
let suelo = 380; 
let speedPelota = 2;
let speedPelota1 = 2;


function setup() {
  createCanvas(400, 400);
  x1 = width / 50;
  y1 = height / 2.5;

  x2 = (3.7 * width) / 4;
  y2 = height / 2.5;

  a1 = width / 2;
  b1 =  height / 2;
}

function draw() {
  background("black");
  fill(100);
  rect(0, 0, width, techo);  
  rect(0, suelo, width, height - suelo); 

  personaje1();

  personaje2();

  pelota();

}

function personaje1(){
    fill("white");
  rect(x1,y1,20,100);

  if (keyIsDown(87) && y1 > techo) {
    y1 -= speed;
  }
  if (keyIsDown(83) && y1 + 100 < suelo) {
    y1 += speed;
  }
 
  }

  function personaje2(){
    fill("white");
  rect(x2,y2,20,100);
  if (keyIsDown(UP_ARROW) && y2 > techo) {
    y2 -= speed;
  }
  if (keyIsDown(DOWN_ARROW) && y2 + 100 < suelo) {
    y2 += speed;
  }
  
  }

  function pelota(){
    fill("white");
    circle(a1,b1,20,20);
    a1 += speedPelota;
    b1 += speedPelota1;

    if(b1 - 10 <= techo || b1 + 1 >= suelo){
        speedPelota1 *= -1;
    }
    
    if((a1 - 10 <= x1 + 20 && b1 >= y1 && b1 <= y1 + 100) || (a1 - 10 <= x2 + 20 && b1 >= y2 && b1 <= y2 + 100)){
        speedPelota *=-1;
    }
    }
  
