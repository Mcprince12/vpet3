class Food{
    constructor(x, y, width, height, foodStock, lastfed){
        this.width = width;
        this.height = height;
        this.image = loadImage("images/Milk.png");
    }

    getFoodStock(){
        var foodStockRef = database.ref('foodStock');
        foodStockRef.on("value", function(data){
        foodStock = data.val();
        });
    }

    updateFoodStock(){
        database.ref('/').update({
            foodStock: stock
        })
    }

    deductFood(){

    }

   display(){
       var x=80, y=100;

       imageMode(CENTER);
       image(this.image, 720, 220, 70,70);

       if(this.foodStock!=0){
        for(var i=0; i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50
            }
            image(this.image, x, y, 50, 50);
            x+x+30;
        }
       }
   }

   bedroom(){
    background(bedroomImg, 550, 500);
   }

   garden(){
    background(gardenImg, 550, 500);
   }

   washroom(){
    background(washRoomImg, 550, 500);
   }
}