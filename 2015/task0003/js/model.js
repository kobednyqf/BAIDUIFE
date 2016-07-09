var doc = document;
var l = $('.l')[0];
var list = $('.list')[0];


var model = function(){
	this.note = {}
};

model.prototype = {

	clear:function(){}

}

var m = new model;