class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,300);
    car1.addImage(car1i);


    car2 = createSprite(300,300);
    car2.addImage(car2i);

    car3 = createSprite(500,300);
    car3.addImage(car3i);

    car4 = createSprite(700,300);
    car4.addImage(car4i);

    cars = [car1,car2,car3,car4];



  }

  

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    player.getCarsAtEnd();
    

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      //indice de la matriz
      var index = 0;
      //X y Y posicion de los autos
      var x = 280;
      var y;

      //var display_position = 130;
      for(var plr in allPlayers){
        //agrega 1 al index para cada jugador
        index = index+1;
        //posicion de lo sautos con poca separacion entre ellos en coordenada x
        x = x + 280;
        // usa el formulario de la base de datos para mostrar la direccion de los autos en la coordenada Y
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if(index === player.index){
          stroke(0);
          fill("red");
          textSize(15);
          text(player.name, x-25,y+65);
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }

        //display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyWentDown(UP_ARROW) && player.index !== null){
      player.distance +=25
      player.update();
      //console.log(player.distance);
    }
    
    if(player.distance > 5250){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
  }

  end(){
    console.log("no pos se acabo xdd");
    console.log(player.rank);
  }
}
