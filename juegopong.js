let x, y;
let speed = 5;
let techo = 20;  // Altura del techo
let suelo = 380; // Posición del suelo

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(220);

  // Dibujar techo y suelo
  fill(100);
  rect(0, 0, width, techo);  // Techo
  rect(0, suelo, width, height - suelo); // Suelo

  personaje1();
  /*fill("blue");
  rect(x,y,20,100);*/

  // Movimiento con restricciones
  if (keyIsDown(UP_ARROW) && y - 20 > techo) {
    y -= speed;
  }
  if (keyIsDown(DOWN_ARROW) && y + 100 < suelo) {
    y += speed;
  }
  if (keyIsDown(LEFT_ARROW)) {
    x -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x += speed;
  }


  function personaje1(){
    fill("blue");
  rect(x,y,20,100);
  }
}
