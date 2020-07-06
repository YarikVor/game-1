/*
* Як проходе шлях гри:
*   Load -> Create -> Main -> Update -> PreDraw -> Draw
*
* Як проходе цикл гри:
*   Main -> Update -> Draw -> Main...
*
* */


//#Дані:

//-->Гравець
let	player = {
	x : 20,
	y : 320,
	speed : 5,
	isControl : false,
};
//-->Контроль клавіш
let isKeyDown, isKeyUp, isKey;
isKey = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//-->Позиція миші
let mousepos = {x:0,y:0};
//-->Зображення

let spr_grass = new Image(),
    spr_pig = new Image(),
    spr_box = new Image();
    spr_grass.src   = 'img/grass.png';
    spr_pig.src     = "img/pig.png";
    spr_box.src     = "img/box.png";

//--> Ящики та падіння:
let box;
box = [
//   наявне ,x  ,y  ,швидкість
];

let Time_spam =200; //ms

//--Time

let timeBegin;
let timeEnd = new Date();
let runtime;
let run = true;
window.run = run;

//--Ім'я
var plays;

/*_________________________________________________________________________*/

//#Функції:

//--> Координати миші
document.getElementById("canvas").addEventListener("mousemove", function (event) {
    mousepos.x = event.pageX - 8;
    mousepos.y = event.pageY - 8;
}, )
//-->Коли клавіша натиснута
window.onkeydown = function(event){
    isKeyDown = event.keyCode;
    if (isKey.indexOf(isKeyDown) == -1){
        isKey[isKey.indexOf(0)] = isKeyDown;
    }
};

//-->Коли клавіша відтиснута
window.onkeyup = function(event){
    isKeyUp = event.keyCode;
    if (isKeyDown == isKeyUp){
        isKeyDown = 0;
    }
    if (isKey.indexOf(isKeyUp) >= 0){
        isKey[isKey.indexOf(isKeyUp)] = 0;
    }
};

//-->Клавіатура нажата
function onKeyPressed(value){
    return (isKey.indexOf(value) >= 0) ? true : false;
}

//-->

var example = document.getElementById("canvas"),
	ctx 	= example.getContext('2d');
example.width  = 854;
example.height = 480;

var example1 = document.getElementById("canvas1"),
    ctx1 	= example1.getContext('2d');
example1.width  = 854;
example1.height = 480;

var example2   = document.getElementById("canvas2"),
    ctx2         = example2.getContext('2d');
example2.width   = 854;
example2.height  = 480;

let int_Load = 0;

function Load() {

    spr_pig.onload  = function () {
        int_Load+=1
    }
    spr_grass.onload = function () {
        int_Load+=1
    }
    spr_box.onload = function () {
        int_Load+=1
    }
    if (int_Load >= 3){
        Create();
    }else {
        setTimeout(Load, 100)
    }
}

function Create() {
    plays = prompt("Ваше ім'я");
    while (!plays) {
        plays = prompt("Ваше ім'я");
    }
    timeBegin = new Date();
    window.plays = plays;
    setTimeout(SpawningBox, Time_spam);
    PreDraw();
    Main();
}

function Main(){
	Update();
	Draw();
	setTimeout(Main, 16.5)
}

function Update() {
	if (onKeyPressed(65) ){
		player.x -= player.speed;
	} else if (onKeyPressed(68)){
		player.x += player.speed;
	}
	document.cookie= '';
    document.cookie = `sec = ${runtime}; max-age = 0.17;`;
    document.cookie = `name = ${plays}; max-age = 0.17;`;
    document.cookie = `run = ${run}; max-age = 0.17`;
    if (Time_spam > 15){
        Time_spam -= 0.02;
    }
    if (run){
	    timeEnd = new Date();
	    runtime = timeEnd - timeBegin;
    }
	for(let i = 0; i<box.length; i++){
	    if (box[i][1]-32<=player.x && box[i][1]+32>=player.x && box[i][2]+32>=player.y && box[i][2]<=player.y ){
            box[i]=[false,0,-32,0];
            run = false;
        }
        if (box[i][0] == true){
            box[i][2]+=box[i][3];
            box[i][3]+=0.2;
        }
        if (box[i][2]>=330){
            box[i]=[false,0,-32,0];
        }

    }
}

function PreDraw() {
    spr_grass.onload;
    for(var i = 0; i<=26; i++) {
        ctx1.drawImage(spr_grass, i*32, 352, 32, 32);
        console.log("ssss")
    }
    ctx1.fillStyle = 'rgb(132,0,0)';
    ctx1.fillRect(0,384,854,96);
}

function Draw() {
    ctx.clearRect(0,0,854,480);
	ctx.drawImage(spr_pig, player.x, player.y, 32, 32);
	for(let i = 0; i<box.length; i++){
        ctx.drawImage(spr_box, box[i][1], box[i][2], 32, 32);
    }
    ctx.fillText(`${Math.floor(runtime/1000)}` ,20, 20);
}

function SpawningBox(){
    for (var i = 0; i <= box.length; i++){
        if(i == box.length){
            box.push([true, Math.floor(Math.random() * 23) * 38, -32, Math.floor(Math.random() * 10) / 10]);
            break;
        } else
        if(box[i][0] == false){
            box[i] = [true, Math.floor(Math.random() * 23) * 38, -32, Math.floor(Math.random() * 10) / 10];
            break;
        }
    }
    setTimeout(SpawningBox, Time_spam)
}
Load();
