/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

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
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

var note = {radio:"day",city:"北京"};
var rainbow = ["#4285F4","#EA4335","#FBBC05","#34A853"];
/**
 * 渲染图表
 */
function renderChart() {
  var json = aqiSourceData[note.city][note.radio[0]];
  //console.log(json);
  var wrap = document.getElementsByClassName('aqi-chart-wrap')[0];
  var l = json.length;
  var count =0;
  var helper = [];
  wrap.innerHTML = "";
  for(var i in json){
    if(count==4)
      count = 0;
    //var div = document.createElement("div");
    //div.style.cssText.height = 0.7*json[i];
    //div.style.cssText.width = 92/l+"%";
    //div.style.cssText.backgroundColor = rainbow[count++];
    //div.style.cssText.left = 100/l*i+"%";
    //div.style.cssText = "height:"+0.7*json[i]+";width:"+92/l+"%;background:"+rainbow[count++]+";left:"+100/l*i+"%;";
    helper.push("<div style=\"height:"+0.7*json[i]+"px;width:" + 92/l + "%;background:" + rainbow[count++] + ";left:" + 100/l*i + "%;\"></div>");
    //已经兼容IE7
    wrap.innerHTML = helper.join('');
  }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var now = [];
  var graTime = document.getElementsByName("gra-time");
  for(var i=0;i<graTime.length;i++){
    if(graTime[i].checked == true){
        now.push(graTime[i].value)
    }
  }
  if(note.radio==now[0]){
    //为改变
    return false
  }
  else{
    note.radio = now[0];
    renderChart();
  }
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var now = []
  var cs = document.getElementById("city-select");
  now.push(cs.value);
  if(note.city == now[0]){
    return false;
  }
  else{
    note.city = now[0];
    renderChart();
  }
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTime = document.getElementsByName("gra-time");
  for(var i=0;i<graTime.length;i++){
    addEvent(graTime[i],'click',graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cs = document.getElementById("city-select");
  addEvent(cs,'change',citySelectChange);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中

  var data = [];
  var w_clock = 0;
  var w_adder = 0;
  var m_clock = 0;
  var m_note = undefined;
  var m_adder = 0;
  //
  //把各个城市名字区分压入json
  for(var i in aqiSourceData){
      data[i] = {d:[],w:[],m:[]};
      for(var j in aqiSourceData[i]){
        //压day
        data[i].d.push(aqiSourceData[i][j]);

        //压week
        w_adder += aqiSourceData[i][j];
        w_clock++;
        if(w_clock%7 == 0){
          data[i].w.push(w_adder/7);
          w_adder=0;//reset
          w_clock=0;//reset
        }

        //压month
        var now=j.split("").splice(5)[0]+j.split("").splice(5)[1];
        if(m_note!=undefined && now!=m_note){
          data[i].m.push(m_adder/m_clock);
          //console.log("push=m");
          m_adder=0;//reset
          m_clock=0;//reset
          m_note=now;//reset
        }
        m_adder += aqiSourceData[i][j];
        m_clock++;
        m_note = now;
        //console.log(now)
        //console.log(m_clock)

      }
      //压入剩下的
      if(w_clock>0)
        data[i].w.push(w_adder/w_clock);
      if(m_clock>0)
        data[i].m.push(m_adder/m_clock);
      w_adder=0;//reset
      m_adder=0;//reset
      w_clock=0;//reset
      m_clock=0;//reset
      m_note=undefined;//reset

  }

  aqiSourceData = data;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
