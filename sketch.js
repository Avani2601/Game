var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var cloudGroup,cloudImage

var obstaclesGroup,OgImage1, OgImage2,OgImage3,ObImage4,OgImage5,OgImage6; 

var count=0


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  OgImage1 = loadImage("obstacle1.png");
  OgImage2 = loadImage("obstacle2.png");
  OgImage3 = loadImage("obstacle3.png");
  OgImage4 = loadImage("obstacle4.png");
  OgImage5 = loadImage("obstacle5.png");
  OgImage6 = loadImage("obstacle6.png");
  
  cloudImage = loadImage("cloud.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup=new Group();
  obstacleGroup=new Group();
}

function draw() {
  background(180);
  
  count = Math.round(getFrameRate()/60);
  text("Score: "+ count, 500, 50);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  spawnClouds();
  spawnObstacles();
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -2;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
    case 1 : obstacle.addImage(OgImage1)
      break;
    case 2 : obstacle.addImage(OgImage2)
      break;
    case 3 : obstacle.addImage(OgImage3)
        break;
    case 4 : obstacle.addImage(OgImage4) 
        break;
    case 5 : obstacle.addImage(OgImage5) 
        break;
    case 6 : obstacle.addImage(OgImage6)
        default:break
        
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
        
    obstacleGroup.add(obstacle)    
  }
}
