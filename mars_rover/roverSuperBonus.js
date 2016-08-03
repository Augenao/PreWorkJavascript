var rover1 = {
  position: [0,0], 
  direction: 'N'
};
var rover2 = {
  position: [9,9], 
  direction: 'S'
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

function readPath(path1, rover1, path2, rover2){
  path1Up = path1.toUpperCase();
  path2Up = path2.toUpperCase();
  path1Up.length > path2Up.length ? pathOk=path1Up : pathOk=path2Up;
  for (var i=0;i<pathOk.length;i++){
    if(!generalCheck(path1Up[i],rover1,rover2)){
      return;
    }
    console.log("loop: "+i+", Rover1="+rover1.position+" Rover2="+rover2.position);
    if(!generalCheck(path2Up[i],rover2,rover1)){
      return;
    }
    console.log("loop: "+i+", Rover1="+rover1.position+" Rover2="+rover2.position);
  }
}

function generalCheck (action, roverA, roverB){
  if (action==='F') {
    goForward(roverA);
    console.log("Before gofor New Pos: [" + roverA.position[0] + ", " + roverA.position[1] + "]"); 
    if (checkObstacles(roverA)){
      console.log("STOP!!Tienes un/a "+checkObstacles(roverA)+" en tu camino");
      goBack(roverA);
      return false;
    } 
    if (checkCollision(roverA,roverB)){
      console.log("STOP!!Se va a producir una colision entre rovers");
      goBack(roverA);
      return false; 
    }
    checkPosition(roverA);  
  } else if (action==='B') {
    goBack(roverA);      
    console.log("Before go back New Pos: [" + roverA.position[0] + ", " + roverA.position[1] + "]"); 
    if (checkObstacles(roverA)){
      console.log("Tienes un/a "+checkObstacles(roverA)+" en tu camino");
      goForward(roverA);
      return false;
    }
    if (checkCollision(roverA,roverB)){
      console.log("STOP!!Se va a producir una colision entre rovers");
      goForward(roverA);
      return false; 
    }
    checkPosition(roverA);
  } else if (action==='R') {
    turnRight(roverA);
    console.log("Turn right");
  } else if (action==='L') {
    turnLeft(roverA);
    console.log("Turn left");
  }

  return true;
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

function checkCollision(roverA,roverB){
  return (roverA.position[0] === roverB.position[0] && roverA.position[1] === roverB.position[1]);
}

newpath1 = prompt("Insert a new path for the rover1: ");
newpath2 = prompt("Insert a new path for the rover2: ");
readPath(newpath1,rover1,newpath2,rover2);

