//model.js

//地图model初始化
var map = function Map(){
	this.matrix=[];
	for(var i=0;i<30;i++){
		this.matrix[i]=[];
		for(var j=0;j<60;j++){
			this.matrix[i][j]=0;
		}
	}
}
var m = new map();


//地图随机生成逻辑
map.prototype.createMap = function(){
	for(var i=0;i<30;i++){
		for(var j=0;j<60;j++){
			if(i==0&&j==0 || i==1&&j==0 || i==20&&j==40)
				continue;
			//跳过出口和玩家出生位置
			if(Math.random()>0.65){
				this.matrix[i][j]=1;
			}
		}
	}
}
//生成草
map.prototype.creatGrass = function(i,j){
	if(i>=30 || i<=-1 || j>=60 || j<=-1)
		return false;
	if((i==0 && j==0) || (i==1&&j==0))
		return false;
	this.matrix[i][j]=-1;
}
//抹除草
map.prototype.removeGrass = function(i,j){
	for(var i=0;i<30;i++){
		for(var j=0;j<60;j++){
			if(this.matrix[i][j]==-1){
				this.matrix[i][j]=0;
			}
		}
	}
}

//胜利model
map.prototype.win = function(){
	for(var i=0;i<30;i++){
		for(var j=0;j<60;j++){
			this.matrix[i][j]=0;
		}
	}
}



//玩家model初始化
var player = function Player(){
	this.x=40;
	this.y=20;
};
var p = new player();


//玩家model位置数值改变逻辑
player.prototype.up = function(){
	if(p.crashInto(this.x,this.y-1))
		return false;
	this.y--;
}
player.prototype.down = function(){
	if(p.crashInto(this.x,this.y+1))
		return false;
	this.y++;
}
player.prototype.left = function(){
	if(p.crashInto(this.x-1,this.y))
		return false;
	this.x--;
}
player.prototype.right = function(){
	if(p.crashInto(this.x+1,this.y))
		return false;
	this.x++;
}
//player判断碰壁弹回
player.prototype.crashInto = function(q,w){
	if(w>=30 || w<=-1 || q>=60 || q<=-1)
		return true;
	else if(m.matrix[w][q]==1)
		return true;
}


//作弊model
p.cheat = function(){
		m.creatGrass(this.y-1,this.x);
		m.creatGrass(this.y+1,this.x);
		m.creatGrass(this.y,this.x+1);
		m.creatGrass(this.y,this.x-1);
		m.creatGrass(this.y+1,this.x+1);
		m.creatGrass(this.y+1,this.x-1);
		m.creatGrass(this.y-1,this.x+1);
		m.creatGrass(this.y-1,this.x-1);
}


