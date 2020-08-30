var ball,database,pos;

function setup(){

    database = firebase.database();

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballpositionref = database.ref('ball/position');
    ballpositionref.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if( pos != undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    drawSprites();
    }
}

/*function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}*/

function writePosition(myx,myy){
    database.ref('ball/position').set({
        'x' : pos.x + myx,
        'y' : pos.y + myy
    })
}

function readPosition(data){

    pos = data.val();

    console.log(pos);
    ball.x = pos.x;
    ball.y = pos.y;

}

function showError(){
    console.log("Error reading from the database");
}
