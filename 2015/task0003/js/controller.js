var controller = function(){};

controller.prototype = {

	//note全读取
	read: function(){
		var note = m.note;
		list.innerHTML = '';
		for(var i in note){
			var task = document.createElement('div');
			task.innerHTML = '<div class="task-pa relative"><input class="task" type="text" value="'+note[i].name+'" placeholder="TODO" maxlength="15"><a class="deleter" href="javascript:void(0)"></a></div>';
			list.appendChild(task)
		}
	},

	//note全写入
	write: function(){
		var inputs = list.getElementsByTagName('input');
		var obj = {};
		for(var i=0;i < inputs.length;i++){
			obj[i] = {
				name: inputs[i].value,
				content: ''
			}
		}
		m.note = obj;
	},

	trimTask: function(obj){
		var newObj = {};
		var k = 0;
		for(var i in obj){
			if(obj[i].name == ""){
				continue;
			}
			newObj[k++] = obj[i];
		}
		return newObj;
	},

	save: function(){
		localStorage.clear();
		localStorage.note = JSON.stringify(this.trimTask(m.note));
	},

	plus: function(){
		var task = document.createElement('div');
		task.innerHTML = '<div class="task-pa relative"><input class="task" type="text" value="'+''+'" placeholder="TODO" maxlength="15"><a class="deleter" href="javascript:void(0)"></a></div>';
		list.appendChild(task);
	}


}

var c = new controller;

window.onload = function(){
	if(!localStorage.note){
		localStorage.note = JSON.stringify({0:{name:'我的第一个任务'}})
	}
	m.note = JSON.parse(localStorage.note);
	c.read();
}

window.onkeyup = function(){
	c.write();
	c.save();
}