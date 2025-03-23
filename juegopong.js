const WIDTH = 400
const HEIGHT = 400

const player_w = WIDTH / 24;
const player_h = HEIGHT / 8;
const ball_radius = 10
const ceiling = 0
const floor = HEIGHT

const game_state = { who_won: "", is_playing: true, goal: 10, is_paused: false };

const player_1 = { x: 0, y: (HEIGHT / 2) - (player_h / 2), width: player_w, height: player_h, speed_y: 10, points: 0, up: 87, down: 83, }

const player_2 = { x: WIDTH - player_w, y: (HEIGHT / 2) - (player_h / 2), width: player_w, height: player_h, speed_y: 10, points: 0, up: 38, down: 40, }

const ball = { x: WIDTH / 2 - ball_radius, y: (HEIGHT / 2) - ball_radius, radius: ball_radius, speed_x: Math.random() * -3, speed_y: Math.random() * 2, }

function reset_game() {

  player_1.x = 0
  player_1.y = (HEIGHT / 2) - (player_h / 2)
  player_1.width = player_w
  player_1.height = player_h
  player_1.speed_y = 10
  player_1.points = 0
  player_1.up = 87
  player_1.down = 83

  player_2.x = WIDTH - player_w
  player_2.y = (HEIGHT / 2) - (player_h / 2)
  player_2.width = player_w
  player_2.height = player_h
  player_2.speed_y = 10
  player_2.points = 0
  player_2.up = 38
  player_2.down = 40

  ball.x = WIDTH / 2 - ball_radius
  ball.y = (HEIGHT / 2) - ball_radius
  ball.radius = ball_radius
  ball.speed_x = Math.random() * -4
  ball.speed_y = Math.random() * 3

  game_state.who_won = ""
  game_state.is_playing = true
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function update_player(player) {
  let desired_y = player.y;

  if (keyIsDown(player.up)) {
    desired_y = player.y - player.speed_y;
  }

  if (keyIsDown(player.down)) {
    desired_y = player.y + player.speed_y;
  }

  if (desired_y < 0) {
    desired_y = 0
  }

  if (desired_y + player.height > HEIGHT) {
    desired_y = HEIGHT - player.height
  }

  player.y = desired_y;
}


function update_ball(ball) {

  let desired_y = ball.y + ball.speed_y;
  let desired_x = ball.x + ball.speed_x;

  if (desired_y - ball.radius < 0 || desired_y + ball.radius > HEIGHT) {
    ball.speed_y = -ball.speed_y
  }


  // left player collision
  if ((desired_y > player_1.y && desired_y < player_1.y + player_1.height) && (desired_x - ball.radius <= player_1.x + player_1.width)) {
    ball.speed_x = -(ball.speed_x * 1.05)
  }

  if ((desired_y > player_2.y && desired_y < player_2.y + player_2.height) && (desired_x + ball.radius >= player_2.x)) {
    ball.speed_x = -(ball.speed_x * 1.05)
  }

  desired_y = ball.y + ball.speed_y;
  desired_x = ball.x + ball.speed_x;

  ball.y = desired_y;
  ball.x = desired_x;

}

function draw_player(player) {
  fill("black");
  rect(player.x, player.y, player.width, player.height);
}

function draw_ball(ball) {
  fill("black");
  circle(ball.x, ball.y, ball.radius * 2);
}


function check_game_state() {
  if (player_1.points >= game_state.goal) {
    game_state.who_won = "left wins"
    game_state.is_playing = false;
  }
  if (player_2.points >= game_state.goal) {
    game_state.who_won = "right wins"
    game_state.is_playing = false;
  }

  if (ball.x + ball.radius * 2 < 0) {
    player_2.points++;
    ball.x = WIDTH / 2 - ball.radius
    ball.y = HEIGHT / 2 - ball.radius
    ball.speed_x = Math.random() * -4
    ball.speed_y = Math.random() * 3
    game_state.is_paused = true
  }

  if (ball.x - ball.radius * 2 > WIDTH) {
    player_1.points++;
    ball.x = WIDTH / 2 - ball.radius
    ball.y = HEIGHT / 2 - ball.radius
    ball.speed_x = Math.random() * -4
    ball.speed_y = Math.random() * 3
    game_state.is_paused = true
  }
}

function draw() {
  background("black");
  fill(100);

  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(4);
  check_game_state()
  if (game_state.is_playing) {
    if (game_state.is_paused) {
      draw_ball(ball)
      draw_player(player_1)
      draw_player(player_2)
      text("Press enter to start", WIDTH / 4, HEIGHT / 2 + 50);
      if (keyIsDown(13)) {
        game_state.is_paused = false;
      }
    } else {
      text(`L:${player_1.points}`, 0, 20);
      text(`R:${player_2.points}`, WIDTH - 100, 20);
      update_player(player_1)
      update_player(player_2)
      update_ball(ball)
      draw_ball(ball)
      draw_player(player_1)
      draw_player(player_2)
    }
  } else {
    text(game_state.who_won, WIDTH / 4, HEIGHT / 2);
    text("Press enter to restart", WIDTH / 4, HEIGHT / 2 + 50);
    if (keyIsDown(13)) {
      reset_game()
    }
  }
}
