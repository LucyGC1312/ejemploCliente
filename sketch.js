var halo,haloImg;
var piso, halobrinco;
//var limite="piso";
var tanque1,tanque2,tanque3,tanque4,tanque5;
var tanque;
var opcion=0;
var fondo;
var grupoTanque;
var PLAY=1;
var END=0;
var gameState=END;
var score=0;

function preload(){
haloImg=loadAnimation("imagenes/halo1.png","imagenes/halo2.png","imagenes/halo3.png");
halobrinco=loadAnimation("imagenes/halo2.png");
tanque1=loadImage("imagenes/tanque1.png");
tanque2=loadImage("imagenes/tanque2.jpg");
tanque3=loadImage("imagenes/tanque3.jpg");
tanque4=loadImage("imagenes/tanque4.jpg");
tanque5=loadImage("imagenes/tanque5.jpg");
fondo=loadImage("imagenes/Halo4.jpg");
}

function setup(){
createCanvas(1000,800);
halo=createSprite(900,700,50,50);
//halo.addAnimation("running",haloImg);
halo.addAnimation("brinco", halobrinco);
halo.scale=0.8;

piso=createSprite(500,780,1100,20);
piso.shapeColor="red";
piso.visible=false;
grupoTanque= new Group();

}

function draw(){
    
background(fondo);
fill("black");
textSize(50);
stroke(5);
text("Puntaje: "+score,700,50);

if(keyDown("s")){
    gameState=PLAY;
}
if(gameState===PLAY){
    halo.changeAnimation("running",haloImg);
    if(touches.length > 0 && keyDown("space")&& halo.y>=550){
        halo.velocityY=-25
        halo.changeAnimation("brinco",halobrinco); 
        score=score+1;
        touches = [];
    }  
   if(keyWentDown("space")){
    halo.changeAnimation("brinco",halobrinco); 
    }
opcion=Math.round(random(1,5));       
halo.velocityY=halo.velocityY+2;
halo.collide(piso);

tanques();
if(halo.isTouching(grupoTanque)){
    grupoTanque.setVelocityXEach(0);
    grupoTanque.setLifetimeEach(-1);
    console.log("Tanque tocado");
    halo.velocityY=0;
    halo.velocityX=0;
    gameState=END;
}


}else if(gameState===END){
if(keyDown("r")){
    gameState=PLAY;
   grupoTanque.setLifetimeEach(1);
  score=0;
}
}



/*if(keyDown("UP_ARROW")){
    halo.velocityY=-2;
    halo.velocityX=0;
}
if(keyDown("DOWN_ARROW")){
    halo.velocityY=2;
    halo.velocityX=0;
}
if(keyDown("LEFT_ARROW")){
    halo.velocityY=0;
    halo.velocityX=-2;
}
if(keyDown("RIGHT_ARROW")){
    halo.velocityY=0;
    halo.velocityX=2;
}*/
if(touches.length>0) {      
    reset();
    touches = [];
  }
   
drawSprites();
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    trex.changeAnimation("running",trex_running);
    
    score = 0;
    
  }
  
function tanques(){
if(frameCount%60===0){
tanque=createSprite(Math.round(random(50,250)),770,50,50);
tanque.scale=0.1;
tanque.velocityX=50;
tanque.lifetime=150;
switch(opcion){
        case 1:
            tanque.addImage(tanque1);
        break;
        case 2:
            tanque.addImage(tanque2);
        break;
        case 3:
            tanque.addImage(tanque3);
        break;
        case 4:
            tanque.addImage(tanque4);
        break;
        case 5:
            tanque.addImage(tanque5);
        break;
        default:
            window.alert("Error");
        break;

}
grupoTanque.add(tanque);
}
}