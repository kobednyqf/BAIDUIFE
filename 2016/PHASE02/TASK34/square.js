var doc = document;
var wrap = doc.getElementById('wrap');
var table = doc.getElementById('table');
var square = doc.getElementById('square');
var compiler = doc.getElementById('compiler');
var input = doc.getElementById('input');
var timer;

function addEvent(element,event,listener){
  if(element.addEventListener){
      element.addEventListener(event,listener,false);//不捕获
  }
  else if(element.attachEvent){
      element.attachEvent("on"+event,listener);
  }
  else{
      element["on"+event] = listener;
  }
}

function createSpace() {
    for (var i = 0; i < 10; i++) {
        var row = doc.createElement("tr");
        for (var j = 0; j < 10; j++) {
            var data = doc.createElement("td");
            table.appendChild(data);
        }
        table.appendChild(row);
    }
}



window.onload = function(){
	createSpace();
}



var controller = function Controller(){
	this.direct = 'top';
}

controller.prototype.setD = function(d){
	this.direct = d;
}

controller.prototype.move = function(d){
	this.turnDirect(d);
	if(this.checkWall(d))
		return false;//有墙就停下来
	else{
		switch(d){
			case 'top':
			square.style.bottom = parseInt(square.style.bottom)+53+"px";
			break;
			case 'bottom':
			square.style.bottom = parseInt(square.style.bottom)-53+"px";
			break;
			case 'left':
			square.style.left = parseInt(square.style.left)-53+"px";
			break;
			case 'right':
			square.style.left = parseInt(square.style.left)+53+"px";
			break;

		}
	}
}

controller.prototype.turnDirect = function(d){
	var word_0 = "";
	var word_1 = "";
	if(d==this.direct){
		return true;
	}
	else{
		switch(this.direct){
			case 'top':
				word_0 = 0;
				break;
			case 'bottom':
				word_0 = 180;
				break;
			case 'left':
				word_0 = 270;
				break;
			case 'right':
				word_0 = 90;
				break;
		}
		switch(d){
			case 'top':
				word_1 = 0;
				break;
			case 'bottom':
				word_1 = 180;
				break;
			case 'left':
				word_1 = 270;
				break;
			case 'right':
				word_1 = 90;
				break;
		}
		if(word_0==0&&word_1==270)
			word_0 = 360;
		else if(word_0==270&&word_1==0)
			word_1 = 360;
		square.setAttribute("class","square rotate"+word_0+"-"+word_1);
	}
	this.setD(d);
}

controller.prototype.checkWall = function(d){
	var x = parseInt(square.style.left);
	var y = parseInt(square.style.bottom);
	var wall;
	switch(d){
			case 'top':
				if(y == 477)
					wall = true;
				else
					wall = false;
				break;
			case 'bottom':
				if(y == 0)
					wall = true;
				else
					wall = false;
				break;
			case 'left':
				if(x == 0)
					wall = true;
				else
					wall = false;
				break;
			case 'right':
				if(x == 477)
					wall = true;
				else
					wall = false;
				break;
	}
	return wall;
}

controller.prototype.compile = function(tox,toy){
	clearTimeout(timer);
	timer = null;
	var x = parseInt(square.style.left);
	var y = parseInt(square.style.bottom);
	if(tox*53==x&&toy*53==y)
		return true;
	else if(tox*53 > x){
		//toleft
		c.move('right');
	}
	else if(tox*53 < x){
		//toright
		c.move('left');
	}
	//
	else if(toy*53 > y){
		c.move('top');
	}
	else if(toy*53 < y){
		c.move('bottom');
	}
	timer = setTimeout(function(){c.compile(tox,toy)},100);//递归
}



var c = new controller();
addEvent(compiler,'click',function(){
	var tx;
	var ty;
	var str = input.value;
	var reg =/MOV[ ]{0,10}\([ ]{0,10}([1][0]|[1-9])[ ]{0,10},[ ]{0,10}([1][0]|[1-9])[ ]{0,10}\)/ig;
	if(!reg.test(str))
		return false;
	else{
		tx = str.match(/[ ]{0,10}([1][0]|[1-9])[ ]{0,10},/ig)[0].replace(/,/,"");
		ty = str.match(/,[ ]{0,10}([1][0]|[1-9])[ ]{0,10}/ig)[0].replace(/,/,"");
	}
	c.compile(tx-1,ty-1);
})
