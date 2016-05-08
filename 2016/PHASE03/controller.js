//controller.js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var controller = function Controller(){};
var c = new controller();
//渲染最初的出口
controller.prototype.drawExit = function(){
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0,0,5,10);
	ctx.fillStyle = "#43D7AA";
}


//渲染地图
controller.prototype.drawMap = function(){
	ctx.fillStyle = "#AAAAAA";
	for(var i=0;i<30;i++){
		for(var j=0;j<60;j++){
			if(m.matrix[i][j]==1){
				ctx.fillRect(j*5,i*5,5,5);
			}
		}
	}
}

//清空地图
controller.prototype.clearMap = function(){
	ctx.fillStyle = "#000000";
	ctx.clearRect(0,0,300,150);
}


//渲染玩家
controller.prototype.drawPlayer = function(){
	ctx.fillStyle = "#43D7AA";
	ctx.fillRect(p.x*5,p.y*5,5,5);
}


//渲染作弊



//渲染胜利






//c
//地图初始化
c.init = function(){
	c.clearMap();
	m.createMap();
	c.drawExit();
	c.drawMap();
}

//玩家移
c.playerMove = function(d){
	c.clearMap();
	c.drawExit();
	c.drawMap();
	switch(d){
		case 38:
		p.up();
		break;
		case 40:
		p.down();
		break;
		case 37:
		p.left();
		break;
		case 39:
		p.right();
		break;
	}
	c.drawPlayer();
}

//渲染作弊草地块
c.pushGrass = function(){
	p.cheat();
	ctx.fillStyle = "#8BF3D9";
	for(var i=0;i<30;i++){
		for(var j=0;j<60;j++){
			if(m.matrix[i][j] == -1){
				ctx.fillRect(j*5,i*5,5,5);
			}
		}
	}
	m.removeGrass();//抹除草
}

c.checkWin = function(){
	if(p.x==0&&(p.y==0||p.y==1)){
		c.clearMap();
		m.win();
		c.drawMap();
		ctx.fillStyle="#43D7AA";
		ctx.font="20px Arial";
		ctx.fillText("YOU WIN",100,80);
	}
	else
		return false;
}

document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==38 || e && e.keyCode==37 || e && e.keyCode==39 || e && e.keyCode==40){
		c.playerMove(e.keyCode);
	}
	else if(e && e.keyCode==32){
		c.pushGrass();
	}
	c.checkWin();
}; 

window.onload = function(){
	c.init();
	c.drawPlayer();
}

