$( document ).ready(function() {
  console.log("Ready!!");

  var myRover = {
   position: [0,0], 
   direction: 'N'
  };


  function goForward(rover) {
   switch(rover.direction) {
     case 'N':
       rover.position[0]++;
       break;
     case 'E':
       rover.position[1]++;
       break;
     case 'S':
       rover.position[0]--;
       break;
     case 'W':
       rover.position[1]--;
       break;
   };
  }  

  function goBack(rover) {
   switch(rover.direction) {
     case 'N':
       rover.position[0]--
       break;
     case 'E':
       rover.position[1]--
       break;
     case 'S':
       rover.position[0]++
       break;
     case 'W':
       rover.position[1]++
       break;
   };
  }

  function turnLeft(rover) {
   switch(rover.direction) {
     case 'N':
       rover.direction = 'W'
       break;
     case 'E':
       rover.direction = 'N'
       break;
     case 'S':
       rover.direction = 'E'
       break;
     case 'W':
       rover.direction = 'S'
       break;
   };
  }

  function turnRight(rover) {
   switch(rover.direction) {
     case 'N':
       rover.direction = 'E'
       break;
     case 'E':
       rover.direction = 'S'
       break;
     case 'S':
       rover.direction = 'W'
       break;
     case 'W':
       rover.direction = 'N'
       break;
   };
  }

  function readPath(path, rover){
    pathOk = path.toUpperCase();
    for (var i=0;i<pathOk.length;i++){
      if (pathOk[i]==='F') {
        goForward(rover);
        console.log("Before gofor New Pos: [" + rover.position[0] + ", " + rover.position[1] + "]"); 
        if (checkObstacles(rover)){
          console.log("Tienes un/a "+checkObstacles(rover)+" en tu camino");
          goBack(rover);
          return;
        }
        checkPosition(rover);
        $(".canvas_script" ).append( "ctx.lineTo(100,150);" );
        // ctx.lineTo(rover.position[0]*50,rover.position[1]*50); 

      } else if (pathOk[i]==='B') {
        goBack(rover);      
        console.log("Before go back New Pos: [" + rover.position[0] + ", " + rover.position[1] + "]"); 
        if (checkObstacles(rover)){
          console.log("Tienes un/a "+checkObstacles(rover)+" en tu camino");
          goForward(rover);
          return;
        }
        checkPosition(rover);

      } else if (pathOk[i]==='R') {
        turnRight(rover);
        console.log("Turn right");
      } else if (pathOk[i]==='L') {
        turnLeft(rover);
        console.log("Turn left");
      }

      console.log("loop: "+i+", position="+rover.position);
    }
  }  


  function checkPosition(rover){
   for (var i=0; i<2; i++){
     if (rover.position[i] == 10){
       rover.position[i] = 0;
     }
     else if(rover.position[i] == -1){
       rover.position[i] = 9;
     }
   }
  }

  function checkObstacles(rover){
   obstaclesObjct={};
   obstaclesObjct["piedra"] = [0,5];
   obstaclesObjct["bache"] = [7,8];
   obstaclesObjct["marciano"] = [1,2];
   obstaclesObjct["objeto no identificado"] = [2,0];
   for (var obstacle in obstaclesObjct){
     if (rover.position[0] === obstaclesObjct[obstacle][0] && rover.position[1] === obstaclesObjct[obstacle][1]){
       return obstacle;
     }
   }
   return false;
  }

  newpath = prompt("Insert new path: ");
  readPath(newpath,myRover);
});
