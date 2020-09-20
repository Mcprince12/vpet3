//Create variables here
var dog, happyDog, dogImg;
var database;
var foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;
var changeGameState, readGameState;
var bedRoomImg, gardenImg, washRoomImg;
var sadDogImg;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedRoomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Wash Room.png");
  sadDogImg = loadImage("images/deadDog.png");
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();
  
  dog = createSprite(250, 250, 50, 50);
  dog.addImage(dogImg);

  foodObj = new Food(50, 100, 10, 30, foodStock, lastFed);

  feedPet = createButton("Feed The Dog");
  feedPet.position(700, 95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add The Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  changeGameState=database.ref('gameState');
  
  readGameState = database.ref('gameState');
  readGameState.on("value", function(data){
      gameState = data.val();
  });

  
  
}


function draw() { 
  background(color(46, 139, 87));

  fedTime=database.ref('FeedTime');
  
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12+ " PM", 350, 30);
  }else if(lastFed===0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : "+lastFed+" AM", 350, 30);
  }

  foodObj.display();

  drawSprites();
  //add styles here

  text("STOCK", 250, 200);
  if(gameState!="hungry"){
    feedPet.hide();
    addFood.hide();
    dog.remove();
  }else{
    feedPet.show();
    addFood.show();
    dog.addImage(sadDogImg);
  }
  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update('Playing');
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update('Sleeping');
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update('Bathing');
    foodObj.washroom();
  }else{
    update('Hungry');
    foodObj.display();
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
  drawSprites();
}

function feedDog(){

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    Feedtime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });

  
}

function update(state){
    database.ref('/').update({
        gameState:state
    });
}

