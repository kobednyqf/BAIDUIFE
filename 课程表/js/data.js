//data.js
//数理301的课程
var shuli301= [{	day:1 , course:{1:"线性代数",2:"高等数学",3:"大学物理",4:"离散数学"}	},
		   {	day:2 , course:{1:"数据结构",2:"算法导论",3:"大学英语",4:"高等数学"}	},
		   {	day:3 , course:{1:"大学语文",2:"复变函数",3:"图像处理",4:null}	},
		   {	day:4 , course:{1:"数据结构",2:"离散数学",3:"大学英语",4:"编译原理"}	},
		   {	day:5 , course:{1:"线性代数",2:"通信原理",3:"C语言",4:null}	}];
//本地的js数据


//数理302的课程
var shuli302= [{	day:1 , course:{1:null,2:"高等数学",3:"大学物理",4:"离散数学"}	},
		   {	day:2 , course:{1:null,2:"离散数学",3:"大学英语",4:"高等数学"}	},
		   {	day:3 , course:{1:null,2:"复变函数",3:"图像处理",4:null}	},
		   {	day:4 , course:{1:null,2:"离散数学",3:"大学英语",4:"编译原理"}	},
		   {	day:5 , course:{1:null,2:"通信原理",3:"C语言",4:null}	}];

//数理303的课程
var shuli303= [{	day:1 , course:{1:null,2:"C语言",3:null,4:null}	},
		   {	day:2 , course:{1:null,2:"C语言",3:null,4:null}	},
		   {	day:3 , course:{1:null,2:"MATLAB",3:null,4:null}	},
		   {	day:4 , course:{1:null,2:"MATLAB",3:null,4:null}	},
		   {	day:5 , course:{1:null,2:"汇编",3:null,4:null}	}];


//数理304的课程
var shuli304= [{	day:1 , course:{1:null,2:"汇编",3:null,4:null}	},
		   {	day:2 , course:{1:null,2:"汇编",3:null,4:null}	},
		   {	day:3 , course:{1:null,2:"汇编",3:null,4:null}	},
		   {	day:4 , course:{1:null,2:"嵌入式开发",3:null,4:null}	},
		   {	day:5 , course:{1:null,2:"汇编",3:null,4:null}	}];

//操场的课程
var caochang= [{	day:1 , course:{1:null,2:"体育",3:null,4:null}	},
		   {	day:2 , course:{1:null,2:"体育",3:null,4:null}	},
		   {	day:3 , course:{1:null,2:"体育",3:null,4:null}	},
		   {	day:4 , course:{1:null,2:"体育",3:null,4:null}	},
		   {	day:5 , course:{1:null,2:"体育",3:null,4:null}	}];

//把所有的课程综合到一个数组data
var data = [{name:'数理301',list:shuli301},
			{name:'数理302',list:shuli302},
			{name:'数理303',list:shuli303},
			{name:'数理304',list:shuli304},
			{name:"操场",list:caochang}];

//使用方法遵循JSON调用方法
//例如data[0].list[0].course[1] 得到"线性代数"
//data[0].list[0].day 得到"1"