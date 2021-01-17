var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, ground, gameState, PLAY, END;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(600, 200);


  ground = createSprite(300, 180, 1200, 10);
  ground.x = ground.width / 2;

  monkey = createSprite(40, 145);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  PLAY = 1;
  END = 0;
  score = 0;
  gameState = PLAY;


}

function draw() {
  background("white");





  text("Survival Time:" + score, 490, 20);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }


  if (gameState === PLAY) {

    ground.velocityX = -(4 + 3 * 1);


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -10;
    } else {
      monkey.collide(ground);

    }

    monkey.velocityY = monkey.velocityY + 0.8

    score = Math.ceil(frameCount / frameRate());

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }


    spawnBananas();
    spawnObstacles();

  }
  
  
  if(gameState === END){
    
    FoodGroup.setVelocityEach(0, 0);
    obstacleGroup.setVelocityEach(0, 0);
    ground.velocityX = 0;
    monkey.collide(ground);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);    
    text("Game Over", 300, 100);
    text("Press 'R' to Restart", 280, 120);
    
    if(keyDown("r")){
      reset();
    }  
  }

  drawSprites();


}

function reset(){
  
  gameState = PLAY;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
  
}


function spawnBananas() {

  if (frameCount % 80 === 0) {

    banana = createSprite(600, Math.round(random(40, 80)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = 100;
    FoodGroup.add(banana);



  }



}

function spawnObstacles() {

  if (frameCount % 300 === 0) {

    obstacle = createSprite(600, 157, 10, 50);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -9;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);

  }

}