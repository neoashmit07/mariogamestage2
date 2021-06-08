var ground, platform, bricks,tube, tubes1img, tube2img, tube3img, tube4img, tube5img;
var groundImg, platform, brickImg;
var cloud1img,cloudGroup;
var cactusimg;
var turtle, mushroom, mushroomsimg, turtleimg;
var mario, SmarioStanding;
function preload() {
  groundImg = loadImage("images/scene/ground.png");
  platformImg = loadImage("images/scene/blocks26.png");
  cloud1img = loadImage("images/scene/cloud01.png");
  brickImg = loadImage("images/scene/brick.png");
  tube1img = loadImage("images/scene/tubes01.png");
  tube2img = loadImage("images/scene/tubes02.png");
  tube3img = loadImage("images/scene/tubes03.png");
  tube4img = loadImage("images/scene/tubes04.png");
  tube5img = loadImage("images/scene/tubes05.png");
  cactusimg = loadAnimation("images/enemy/cactus1.png","images/enemy/cactus2.png");
  mushroomsimg = loadImage("images/enemy/mushrooms.png");
  turtleimg = loadImage("images/enemy/turtleLeft.png");
  SmarioStanding = loadAnimation("images/mario/Smario.png");
}
function setup() {
  createCanvas(1200,600);
  ground = createSprite(630,580,1200,20);
  ground.addImage(groundImg);
  ground.x=ground.width/2;
  ground.velocityX = -3;

  mario = createSprite(300,500,50,50);
  mario.addAnimation("SStanding",SmarioStanding);
  mario.scale = 0.6;

  cloudGroup = new Group();

}

function draw() {
  background("lightblue"); 
  text(mouseX + "," +mouseY, mouseX, mouseY);
  if(ground.x<0){
    ground.x=ground.width/2;
  }  

  mario.velocityY=mario.velocityY+0.5;
  mario.collide(ground);
  spawnClouds(); 
  spawnTubes();
  spawnBricks();
  spawnMushrooms();
  spawnTurtles();
  drawSprites();

  ///mushroom.bounceOff(tube);
}

function spawnClouds() {
  if (frameCount % 150 === 0) {
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
  if (frameCount % 150 === 0) {
    var bricks = createSprite(1200,300,10,10);
    bricks.y = Math.round(random(150,300));
    bricks.addImage(brickImg);
    bricks.scale =2
    bricks.velocityX = -4

    //lifetime
    bricks.lifetime = 300;


  }
}

function spawnTubes(){
  if (frameCount % 300 ===0){
    tube = createSprite(1200,520,10,10);
    
    //tube.addImage(tubeImg);
    tube.velocityX = -2;
    var rand = Math.round(random(1,4));
    switch(rand) {
     
      case 1: tube.addImage(tube2img);
              break;
      case 2: tube.addImage(tube3img);
              break;
      case 3: tube.addImage(tube4img);
              cactus1= createSprite(1200,460,10,10);
              cactus1.addAnimation("cactus",cactusimg);
              cactus1.velocityX = -2;
             // cactus1.scale = 2;
              break;
      case 4: tube.addImage(tube5img);
              cactus2= createSprite(1200,470,10,10);
              cactus2.addAnimation("cactus",cactusimg);
              cactus2.velocityX = -2;
              //cactus2.scale = 2;
              break;
      default: break;
   
    }
    tube.scale =1.5;
    ground.depth = tube.depth;
    ground.depth+=1;
    tube.lifetime = 600;
  }
}

//create mushroom enemy
function spawnMushrooms(){
  if(frameCount% 350===0){
    mushroom = createSprite(1200,525,10,10);
    mushroom.velocityX = -2;
    mushroom.addImage(mushroomsimg);
    mushroom.scale = 2.3;
  }

}
//create turtle enemy
function spawnTurtles(){
  if (frameCount%650===0){
    turtle = createSprite(1200,515,10,10);
    turtle.velocityX = -2;
    turtle.addImage(turtleimg);
    turtle.scale = 2.5;
  }
}

function marioMovement(){
  
}