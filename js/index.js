// 请求吕梁天气情况数据
// var b;
// $.ajax({
// 	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=吕梁",
// 	type: "get",
//   // 减少跨地域的阻碍
// 	dataType: "jsonp",

// 	success:function(obj){
//      // console.log(obj.data.weather);
//     b=obj.data.weather;
//     console.log(b);
// 	}
// })
// 请求各个城市的天气情况
var city_box;
$.ajax({
  url:"https://www.toutiao.com/stream/widget/local_weather/city/",
  type: "get",
  // 减少跨地域的阻碍
  dataType: "jsonp",
  success:function(obj){
     city_box=obj.data;
    // console.log(city_box);
     ff(city_box);
  }
})

function ff( city_box){
    // 渲染城市
   for( var m in city_box){ 
       var h3=document.createElement("h3");
       h3.className="title1";
       h3.innerHTML=m;
       var remen_city=document.querySelector(".remen_city");
       remen_city.appendChild(h3);

      var name=document.createElement("ul");
          name.className="name";
          remen_city.appendChild(name);
      // 渲染市
        for(var n in city_box[m]){
           var li=document.createElement("li");
           li.className="k";
           li.innerHTML=n;
          name.appendChild(li);
        }        
   }
}
function update(b){
  // 获取当前城市
  var city_name=document.querySelector(".city");
  city_name.innerHTML=b.city_name;
  // 获取当前温度
  var temperature=document.querySelector(".temperature");
     temperature.innerHTML=b.current_temperature+"°";
  // 获取当前天气情况
  var condition=document.querySelector(".condition");
      condition.innerHTML=b.dat_condition;
  // 今天最高温
  var dat_high_temperature=document.querySelector("#dat_high_temperature");
      dat_high_temperature.innerHTML=b.dat_high_temperature;
// 今天最低温
  var dat_low_temperature=document.querySelector("#dat_low_temperature");
    dat_low_temperature.innerHTML=b.dat_low_temperature+"°";
    // 今天的天气情况
    var day_condition=document.querySelector(".text-3");
       day_condition.innerHTML=b.day_condition;

// 明天最高温
  var tomorrow_high_temperature=document.querySelector("#tomorrow_high_temperature");
      tomorrow_high_temperature.innerHTML=b.tomorrow_high_temperature;
// 明天最低温
   var tomorrow_low_temperature=document.querySelector("#tomorrow_low_temperature");
   tomorrow_low_temperature.innerHTML=b.tomorrow_low_temperature+"°";
   // 明天的天气情况
   var tomorrow_condition=document.querySelector("#tianqi");
       tomorrow_condition.innerHTML=b.tomorrow_condition;
 // 今天icon
   var dat_weather_icon_id=document.querySelector(".text-4");
       dat_weather_icon_id.style=`background-image:url(img/${b.dat_weather_icon_id}.png)`;
      // 明天icon
 var tomorrow_weather_icon_id=document.querySelector(".text-5");
      tomorrow_weather_icon_id.style=`background-image:url(img/${b.tomorrow_weather_icon_id}.png)`;
// 未来24小时情况
var str="";
   b.hourly_forecast.forEach((item,index)=>{
     console.log(item, index);
     str=str+`
       <div class="gundong-now">
             <h1>${item.hour}:00</h1>
             <div class="now-1" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
             <h2>${item.temperature}°</h2>
       </div>
     `
   $(".gundong").html(str);

   })
   // 近期天气情况
   var str2="";
   b.forecast_list.forEach((item,index)=>{
      console.log(item, index);
      str2=str2+`
              <div class="con">
              <div class="con-date">
                ${item.date.slice(5,7)}/${item.date.slice(8,10)}
              </div>
              <h1>${item.condition}</h1>
              <div class="con-date1" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
              <div class="con-hig">${item.high_temperature}°</div>
              <div class="con-low">${item.low_temperature}°</div>
              <h2>${item.wind_direction}</h2>
              <h2 class="fly">${item.wind_level}</h2>
           </div>
             `
      $(".warp").html(str2);
   })
     // 渲染城市
//    for( var m in city_box){ 
//        var h3=document.createElement("h3");
//        h3.className="title1";
//        h3.innerHTML=m;
//        var remen_city=document.querySelector(".remen_city");
//        remen_city.appendChild(h3);

//       var name=document.createElement("ul");
//           name.className="name";
//           remen_city.appendChild(name);
//       // 渲染市
//         for(var n in city_box[m]){
//            var li=document.createElement("li");
//            li.className="k";
//            li.innerHTML=n;
//           name.appendChild(li);
//         }        
//    }
 }
function AJAX(str){
   var url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
   $.ajax({
    url:url1,
    dataType:"jsonp",
    type:"get",
   success:function(obj){
   // 获取数据
    var b=obj.data.weather;
    // 渲染数据
       update(b);   
    // 让城市盒子消失
    $(".city1").css({"display":"none"});
    $(".hid").addClass('blod');
   }
    }) 
  }
  window.onload=function()
  {   
    $(".k").on("click",function(){
      var cityh=this.innerHTML;
      AJAX(cityh);
    })
      $(".city").on("click",function(){
      $(".city1").css({"display":"block"});
    })
      $("input").on("focus",function(){
        $(".button").html("搜索");
      })
      var but=document.querySelector(".button");
       // console.log(but);
       but.onclick=function(){
         var text=but.innerText;
          if(text=="取消"){
            $(".city1").css({"display":"none"});
          }
          else{
            // 获取input中的内容
            var str1=document.querySelector("input").value;
             for( var i in  city_box){
                for(var j in  city_box[i]) {
                  if(str1==j){ 
                    AJAX(str1);
                     return;
                 }
               }
             }              
          alert("没有该城市")
          }
       }
    }
     
