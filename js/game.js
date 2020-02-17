
const KEY_CODE = { 
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32
}
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const DIRECTIONS = {
    LEFT:-1,
    RIGHT:1,
    STOP:0
}

const GAME_STATE = {
    gameOver : false,
    shooting : false,
    direction: 0,
    playerLasers : [],
    enemies: [],
    enemyLasers : [],
    enemyLasersCoolDown: 1000,
    enemyLastShoot:0
}


function createEnemies($container){

    let distance = -70;
    let space = 50;
    let enemyWidth = 40;

    for(var i = 1; i<=8; i++){
        distance += space + enemyWidth;
        GAME_STATE.enemies.push(new Enemy($container, distance , 50));
    }
}

function init(){
    const $container = document.querySelector(".game");
    GAME_STATE.player = new Player($container,GAME_WIDTH / 2, GAME_HEIGHT - 50);
    createEnemies($container);
}



function onKeyDown(e){
    if(e.keyCode === KEY_CODE.LEFT){
        GAME_STATE.direction = DIRECTIONS.LEFT;
    } else if(e.keyCode === KEY_CODE.RIGHT){
        GAME_STATE.direction = DIRECTIONS.RIGHT;
    } else if(e.keyCode === KEY_CODE.SPACE){
        GAME_STATE.shooting = true;
    }
}

function onKeyUp(e){
    if(e.keyCode === KEY_CODE.LEFT){
        GAME_STATE.direction = DIRECTIONS.STOP;
    }else if(e.keyCode === KEY_CODE.RIGHT){
        GAME_STATE.direction = DIRECTIONS.STOP;
    }else if(e.keyCode === KEY_CODE.SPACE){
        GAME_STATE.shooting = false;
    }
}

function colision(area1, area2) {
    return !(
      area2.left > area1.right ||
      area2.right < area1.left ||
      area2.top > area1.bottom ||
      area2.bottom < area1.top
    );
  }

function drawPlayerLasers(){
    if(GAME_STATE.shooting){
        let laser = GAME_STATE.player.shoot();
        if(laser != null){
            GAME_STATE.playerLasers.push(laser);
        }
    }
    GAME_STATE.playerLasers.forEach(laser => {
        laser.move();
        if(laser.y <= 0){
            laser.destroy();
        }
    });
    GAME_STATE.playerLasers = GAME_STATE.playerLasers.filter(laser => !laser.isDead);
}

function drawEnemies(){
    GAME_STATE.enemies.forEach(enemy => enemy.move());
}

function enemyRandomSoot(){
    let currentTime = Date.now();
    if(currentTime > GAME_STATE.enemyLastShoot + GAME_STATE.enemyLasersCoolDown){
         var min=0; 
        var max=GAME_STATE.enemies.length-1;  
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        let laser = GAME_STATE.enemies[random].shoot();
        if(laser != null){
            GAME_STATE.enemyLasers.push(laser);
            GAME_STATE.enemyLastShoot = currentTime;
        }   
    }
}

function drawEnemyLasers(){
    
    GAME_STATE.enemyLasers.forEach(laser => {
        laser.move();
        if(laser.y >= GAME_HEIGHT){
            laser.destroy();
        }
    });
    GAME_STATE.enemyLasers = GAME_STATE.enemyLasers.filter(laser => !laser.isDead);

}

function drawEnemyColision(){
    GAME_STATE.enemies.forEach(enemy =>{

        GAME_STATE.playerLasers.forEach(laser => {
            if(colision(laser.area(), enemy.area())){
                enemy.destroy();
                laser.destroy();
            }
        });

    });
    GAME_STATE.enemies = GAME_STATE.enemies.filter(enemy => !enemy.isDead);
    GAME_STATE.playerLasers = GAME_STATE.playerLasers.filter(laser => !laser.isDead);

}

function drawPlayerColision(){

    GAME_STATE.enemies.forEach(enemy =>{
        if(colision(enemy.area(), GAME_STATE.player.area())){
            GAME_STATE.gameOver = true;
        }
    });

    GAME_STATE.enemyLasers.forEach(laser =>{
        if(colision(laser.area(), GAME_STATE.player.area())){
            GAME_STATE.gameOver = true;
        }
    });
    
}

function draw(){
    GAME_STATE.player.move(GAME_STATE.direction);
    drawEnemies();
    enemyRandomSoot();
    drawEnemyLasers();
    drawPlayerLasers();
    drawPlayerColision();
    drawEnemyColision();

    if(GAME_STATE.gameOver){
        alert("GAME OVER");
    }else{
        window.requestAnimationFrame(draw);
    }
    
}

init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(draw);