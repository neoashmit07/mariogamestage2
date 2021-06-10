var ground, groundImg;
var bricks, brickImg,brickGroup;
var tube, tubes1img, tube2img, tube3img, tube4img,tubeGroup;
var cloud1img,cloudGroup;
var cactus1, cactus2, cactusimg, cactusGroup;
var turtle, turtleimg, turtleGroup;
var mushroom, mushroomsimg, mushroomGroup;
var mario, SmarioStanding;
var edges;
var turtleDirection = "left";
var bgimg;

function preload() {
  bgimg = loadImage("images/scene/bg.jpg");
  groundImg = loadImage("images/scene/ground.png");
  platformImg = loadImage("images/scene/blocks26.png");
  cloud1img = loadImage("images/scene/cloud01.png");
  brickImg = loadImage("images/scene/brick.png");
  tube1img = loadImage("images/scene/tubes01.png");
  tube2img = loadImage("images/scene/tubes02.png");
  tube3img = loadImage("images/scene/tubes03.png");
  tube4img = loadImage("images/scene/tubes04.png");
  cactusimg = loadAnimation("images/enemy/cactus1.png","images/enemy/cactus2.png");
  mushroomsimg = loadImage("images/enemy/mushrooms.png");
  turtleLeftimg = loadImage("images/enemy/turtleLeft.png");
  turtleRightimg = loadImage("images/enemy/turtleRight.png");
  SmarioStanding = loadAnimation("images/mario/Smario.png");
  SmarioWalking = loadAnimation("images/mario/Smario02.png","images/mario/Smario03.png","images/mario/Smario04.png");
  SmarioWalkingLeft = loadAnimation("images/mario/SmarioLeft1.png","images/mario/SmarioLeft2.png");
  SmarioJumping = loadAnimation("images/mario/SmarioJump.png");
  SmarioJumpingLeft = loadAnimation("images/mario/SmarioLeftJump.png");
}

function setup() {
  createCanvas(1200,600);
  edges = createEdgeSprites();

  ground = createSprite(630,580,1200,20);
  ground.addImage(groundImg);
  ground.x=ground.width/2;
  ground.velocityX = -2;

  mario = createSprite(600,500,50,50);
  mario.addAnimation("SWalking",SmarioWalking);
  mario.addAnimation("SStanding",SmarioStanding);
  mario.addAnimation("SWalkingLeft",SmarioWalkingLeft);
  mario.addAnimation("SJumping",SmarioJumping);
  mario.addAnimation("SJumpingLeft",SmarioJumpingLeft);
  mario.scale = 0.6;

  cloudGroup = new Group();
  brickGroup = new Group();
  tubeGroup = new Group();
  cactusGroup = new Group();
  turtleGroup = new Group();
  mushroomGroup = new Group();

  

}

function draw() {
  background(bgimg); 
  
  text(mouseX + "," +mouseY, mouseX, mouseY);

  if(ground.x<0){
    ground.x=ground.width/2;
  }  

  mario.velocityY=mario.velocityY+1;
  mario.collide(ground);
  mario.collide(tubeGroup);

  
  spawnClouds(); 
  spawnTubes();
  spawnBricks();
  spawnMushrooms();
  spawnTurtles();
  marioMovement();
  drawSprites();
  
  mushroomGroup.bounceOff(edges[1]);
  turtleGroup.bounceOff(edges[1]);
  mushroomGroup.bounceOff(tubeGroup);
  turtleGroup.bounceOff(tubeGroup);
  
  // if(frameCount % 1000 === 0){
  //   mushroomGroup.setVisibleEach(false);
  // }

}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1200,120,40,10);
    cloud.y = Math.round(random(80,320));
    cloud.addImage(cloud1img);
    cloud.scale = 1.3;
    cloud.velocityX = -3;
    cloud.lifetime = 400;
    cloudGroup.add(cloud);
  }
}

function spawnBricks(){
  if (frameCount % 100 === 0) {
    bricks = createSprite(1200,300,10,10);
    bricks.y = Math.round(random(150,300));
    bricks.addImage(brickImg);
    bricks.scale =2
    bricks.velocityX = -4
    bricks.lifetime = 300;
    brickGroup.add(bricks);
  }
}

function spawnTubes(){
  if (frameCount % 300 ===0){
    tube = createSprite(1200,520,10,10);
    tube.velocityX = -2;

    var rand = Math.round(random(1,4));
    switch(rand) {
     
      case 1: tube.addImage(tube1img);
              break;
      case 2: tube.addImage(tube2img);
              break;
      case 3: tube.addImage(tube3img);
              cactus1= createSprite(1200,460,10,10);
              cactus1.addAnimation("cactus",cactusimg);
              cactus1.velocityX = -2;
              cactusGroup.add(cactus1);
              break;
      case 4: tube.addImage(tube4img);
              cactus2= createSprite(1200,470,10,10);
              cactus2.addAnimation("cactus",cactusimg);
              cactus2.velocityX = -2;
              cactusGroup.add(cactus2);
              break;
      default: break;
   
    }
    tube.scale =1.5;
    ground.depth = tube.depth;
    ground.depth+=1;
    tube.lifetime = 600;
    tubeGroup.add(tube);
  }
}

function spawnMushrooms(){
  if(frameCount% 320===0){
    mushroom = createSprite(1200,525,10,10);
    mushroom.velocityX = -5;
    mushroom.addImage(mushroomsimg);
    mushroom.scale = 2.3;
    mushroomGroup.add(mushroom);
  }

}

function spawnTurtles(){
  if (frameCount%1000===0){
    turtle = createSprite(1200,515,10,10);
    turtle.addImage(turtleLeftimg);
    turtle.velocityX = -2;
    turtle.scale = 2.5;
    turtleGroup.add(turtle);
    console.log(turtle.velocityX);
  }
}

function marioMovement(){

  // mario walking towards right
  if(keyDown(RIGHT_ARROW)){
    mario.changeAnimation("SWalking",SmarioWalking);
    mario.x = mario.x + 5;
  }

  //mario walking towards left
  if(keyDown(LEFT_ARROW)){
    mario.changeAnimation("SWalkingLeft",SmarioWalkingLeft);
    mario.x = mario.x - 5;
  }

  //mario jumping right
  if(keyWentDown(UP_ARROW)){
    mario.changeAnimation("SJumping",SmarioJumping);
    mario.velocityY = -10;
  }

  //mario jumping left
  if(keyDown(UP_ARROW) && keyDown(LEFT_ARROW)){
    mario.changeAnimation("SJumpingLeft",SmarioJumpingLeft);
    mario.velocityY = -10;
  }

  //mario falling
  if(keyWentUp(UP_ARROW)){
    mario.changeAnimation("SWalking",SmarioWalking);
  }

}

