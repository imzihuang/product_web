var dataAll;
var aboutOut=$(".track-sign-up").val();
var aboutOut_href=$(".track-sign-up").attr("href");
if($("#current_keyword").val()==""){
  apply();
}
else{
  putkeyword();
}

function putkeyword(){
 var data = {
  keyword:$("#current_keyword").val(),
  like_query:1
}
$.ajax({
  type: "GET",
  url:"/product/product_os",
  async: true,
  data:data,
  success: function(msg) {
    dataAll=msg;
    var str="";
    var str_="";
    var pop="";
    var pop_="";
    var show_postage = function (postage_price) {
      if (postage_price<=0){
        return "&free shipping";
      }
      return "&postage:￥"+postage_price;
    };
    for(var i=0;i<msg.data.length;i++){
      str_='<div class="col-sm-6 col-md-2"><div class="thumbnail"><a href="'+msg.data[i].links+'" class="phonePleft"><img src="'+msg.data[i].img_path+
      '"alt="images"></a><div class="caption text-left phonePright"><p class="product_name"><a href="'+msg.data[i].links+'">'+
      msg.data[i].theme+'</a></p><p class="color_gray by">'+
      msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>￥'+
      msg.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>￥'+
      msg.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">'+
      show_postage(msg.data[i].postage_price)+'</span></p><a class="atimedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><span class="dayPart"><li><span class="days">00</span><span>days</span></li></span><span class="timePart"><li><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span></span></li></span></ul></a>'+
      '<p class="aboutHelp"><a onclick="howclaim()">How to buy?</a></p>'+
      '<div class="likeList"><img src="img/start.png" class="startimg"/><a ><img src="img/unlike.png" id="'+msg.data[i].id+'" onclick="like(this)"></a><span class="likecount">'+(parseInt(msg.data[i].like_count)+parseInt(msg.data[i].like_add_count))+'</span></div>'+
      '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen"></i></a>'+
      '<a class="share share_twitter" onclick="sharetwitter('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen"></i></a>'+
      '<a class="share share_google" onclick="sharegoogle('+"'"+window.location.href+"'"+')"><i class="fa fa-google areapen"></i></a></span></div></div></div></div></div>'
      str=str+str_;
    }
    $("#listPart").append(str);

    for(var i=0;i<msg.data.length;i++){
      if(msg.data[i].recommend==true)
      {
       pop_='<div class="col-sm-12 col-md-12"><div class="thumbnail"><a href="'+msg.data[i].links+'"><img src="'+msg.data[i].img_path+
       '"alt="images"></a><div class="caption"><p><a href="'+msg.data[i].links+'">'+msg.data[i].theme+
       '</a></p></div></div></div>'
       pop=pop+pop_;
     }
   }
   $("#product_popular").append(pop);
   if(aboutOut_href=="signin.html"){
    $(".product_name a").attr("onclick","change();return false");//产品名称
    $("#listPart a img").attr("onclick","change();return false");//点赞图片和产品图片
    $("#product_popular img").attr("onclick","change();return false");//今days主打图片
    $("#product_popular .caption p a").attr("onclick","change();return false");//今days主打名称
  }
   for(var j=0;j<msg.data.length;j++){
      var now_date = new Date(msg.data[j].now_at);
      var str_current_date = msg.data[j].count_down_at;
      var current_date = new Date(str_current_date);
      var strclass = ' .countdown' + j;
      var aboutday_ = ' .countdown' + j + " .dayPart" + " .days";
      var aboutday = ' .countdown' + j + " .dayPart";
      var abouttime=' .countdown' + j + " .timePart";
      if (current_date>now_date) {
        $(strclass).parent().attr("style", "display:block;");
        $(strclass).downCount({
          date: str_current_date,
          offset:8,
        });
      }else{
        $(strclass).parent().attr("style", "display:none;");
      }
      if(current_date-now_date>86400000){
         $(abouttime).html("");
      }
      else{
         $(aboutday).html("");
      }
    }
},
error:function(){
  console.log("error");
}
});
}

function apply(){
  $.ajax({
    type: "GET",
    url:"/product/product_os",
    async: true,
    success: function(msg) {
      dataAll=msg;
      var str="";
      var str_="";
      var pop="";
      var pop_="";
      var show_postage = function (postage_price) {
        if (postage_price<=0){
          return "&free shipping";
        }
        return "&postage:￥"+postage_price;
      };
      for(var i=0;i<msg.data.length;i++){
       str_='<div class="col-sm-6 col-md-2"><div class="thumbnail"><a href="'+msg.data[i].links+'" class="phonePleft"><img src="'+msg.data[i].img_path+
       '"alt="images"></a><div class="caption text-left phonePright"><p class="product_name"><a href="'+msg.data[i].links+'">'+
       msg.data[i].theme+'</a></p><p class="color_gray by">'+
       msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>￥'+
       msg.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>￥'+
       msg.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">'+
       show_postage(msg.data[i].postage_price)+'</span></p><a class="atimedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><span class="dayPart"><li><span class="days">00</span><span>days</span></li></span><span class="timePart"><li><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span></span></li></span></ul></a>'+
       '<p class="aboutHelp"><a onclick="howclaim()">How to buy?</a></p>'+
       '<div class="likeList"><img src="img/start.png" class="startimg"/><a ><img src="img/unlike.png" id="'+msg.data[i].id+'" onclick="like(this)"></a><span class="likecount">'+(parseInt(msg.data[i].like_count)+parseInt(msg.data[i].like_add_count))+'</span></div>'+
       '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen" title="Facebook"></i></a>'+
       '<a class="share share_twitter" onclick="sharetwitter('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen" ></i></a>'+
       '<a class="share share_google" onclick="sharegoogle('+"'"+window.location.href+"'"+')"><i class="fa fa-google areapen"></i></a></span></div></div></div></div></div>'
       str=str+str_;
     }   
     $("#listPart").append(str); 

     for(var i=0;i<msg.data.length;i++){
      if(msg.data[i].recommend==true)
      { 
        pop_='<div class="col-sm-12 col-md-12"><div class="thumbnail"><a href="'+msg.data[i].links+'"><img src="'+msg.data[i].img_path+
        '"alt="images"></a><div class="caption"><p><a href="'+msg.data[i].links+'">'+msg.data[i].theme+
        '</a></p></div></div></div>'
        pop=pop+pop_;
      }
    }
    $("#product_popular").append(pop);
    if(aboutOut_href=="signin.html"){
      $(".product_name a").attr("onclick","change();return false");//产品名称
      $("#listPart a img").attr("onclick","change();return false");//点赞图片和产品图片
      $("#product_popular img").attr("onclick","change();return false");//今days主打图片
      $("#product_popular .caption p a").attr("onclick","change();return false");//今days主打名称
    }
   for(var j=0;j<msg.data.length;j++){
      var now_date = new Date(msg.data[j].now_at);
      var str_current_date = msg.data[j].count_down_at;
      var current_date = new Date(str_current_date);
      var strclass = ' .countdown' + j;
      var aboutday_ = ' .countdown' + j + " .dayPart" + " .days";
      var aboutday = ' .countdown' + j + " .dayPart";
      var abouttime=' .countdown' + j + " .timePart";
      if (current_date>now_date) {
        $(strclass).parent().attr("style", "display:block;");
        $(strclass).downCount({
          date: str_current_date,
          offset:8,
        });
      }else{
        $(strclass).parent().attr("style", "display:none;");
      }
      if(current_date-now_date>86400000){
         $(abouttime).html("");
      }
      else{
         $(aboutday).html("");
      }
    }
  },
});
}

function logout(){
  $.ajax({
    type: "post",
    url:"/product/logout",
    async: true,
    success: function(msg) {
      window.location.href='/product/login.html';
    },
    error:function(){

    }
  });
}

function productsearch(){console.log(1);
  var str="";
  var str_="";
  var pop="";
  var pop_="";
  var tag=$("#productSearch").val();
  if(tag==""){
    for(var i=0;i<dataAll.data.length;i++){
      str_='<div class="col-sm-6 col-md-2"><div class="thumbnail"><a href="'+dataAll.data[i].links+'" class="phonePleft"><img src="'+dataAll.data[i].img_path+
      '"alt="images"></a><div class="caption text-left phonePright"><p class="product_name"><a href="'+dataAll.data[i].links+'">'+
      dataAll.data[i].theme+'</a></p><p class="color_gray by">'+
      dataAll.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>￥'+
      dataAll.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>￥'+
      dataAll.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">postage:￥'+
      dataAll.data[i].postage_price+'</span></p><a class="atimedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><span class="dayPart"><li><span class="days">00</span><span>days</span></li></span><span class="timePart"><li><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span></span></li></span></ul></a>'+
      '<p class="aboutHelp"><a onclick="howclaim()">How to buy?</a></p>'+
      '<div class="likeList"><img src="img/start.png" class="startimg"/><a ><img src="img/unlike.png" id="'+dataAll.data[i].id+'" onclick="like(this)"></a><span class="likecount">'+dataAll.data[i].like_count+'</span></div>'+
      '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen" title="Facebook"></i></a>'+
      '<a class="share share_twitter" onclick="sharetwitter('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen"></i></a>'+
      '<a class="share share_google" onclick="sharegoogle('+"'"+window.location.href+"'"+')"><i class="fa fa-google areapen"></i></a></span></div></div></div></div></div>'
      str=str+str_;
    }
    $("#listPart").html("");
    $("#listPart").append(str);
     for(var i=0;i<dataAll.data.length;i++){
      if(dataAll.data[i].recommend==true)
      { 
        pop_='<div class="col-sm-12 col-md-12"><div class="thumbnail"><a href="'+dataAll.data[i].links+'"><img src="'+dataAll.data[i].img_path+
        '"alt="images"></a><div class="caption"><p><a href="'+dataAll.data[i].links+'">'+dataAll.data[i].theme+
        '</a></p></div></div></div>'
        pop=pop+pop_;
      }
    }
    $("#product_popular").append(pop);
  }else{
    for(var i=0;i<dataAll.data.length;i++){
      if(dataAll.data[i].name.indexOf(tag)!=-1||dataAll.data[i].theme.indexOf(tag)!=-1||dataAll.data[i].description.indexOf(tag)!=-1){
        str_='<div class="col-sm-6 col-md-2"><div class="thumbnail"><a href="'+dataAll.data[i].links+'" class="phonePleft"><img src="'+dataAll.data[i].img_path+
        '"alt="images"></a><div class="caption text-left phonePright"><p class="product_name"><a href="'+dataAll.data[i].links+'">'+
        dataAll.data[i].theme+'</a></p><p class="color_gray by">'+
        dataAll.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>￥'+
        dataAll.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>￥'+
        dataAll.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">postage:￥'+
        dataAll.data[i].postage_price+'</span></p><a class="atimedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><span class="dayPart"><li><span class="days">00</span><span>days</span></li></span><span class="timePart"><li><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span></span></li></span></ul></a>'+
        '<p class="aboutHelp"><a onclick="howclaim()">How to buy?</a></p>'+
        '<div class="likeList"><img src="img/start.png" class="startimg"/><a><img src="img/unlike.png" id="'+dataAll.data[i].id+'" onclick="like(this)"></a><span class="likecount">'+dataAll.data[i].like_count+'</span></div>'+
        '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen" title="Facebook"></i></a>'+
        '<a class="share share_twitter" onclick="sharetwitter('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen"></i></a>'+
        '<a class="share share_google" onclick="sharegoogle('+"'"+window.location.href+"'"+')"><i class="fa fa-google areapen"></i></a></span></div></div></div></div></div>'
        str=str+str_;
      }
    }
    $("#listPart").html("");
    $("#listPart").append(str);
     for(var i=0;i<dataAll.data.length;i++){
      if(dataAll.data[i].recommend==true)
      { 
        pop_='<div class="col-sm-12 col-md-12"><div class="thumbnail"><a href="'+dataAll.data[i].links+'"><img src="'+dataAll.data[i].img_path+
        '"alt="images"></a><div class="caption"><p><a href="'+dataAll.data[i].links+'">'+dataAll.data[i].theme+
        '</a></p></div></div></div>'
        pop=pop+pop_;
      }
    }
    $("#product_popular").append(pop);
  }
  var aboutOut_href=$(".track-sign-up").attr("href");
  if(aboutOut_href=="signin.html"){
    $(".product_name a").attr("onclick","change();return false");//产品名称
    $("#listPart a img").attr("onclick","change();return false");//点赞图片和产品图片
    $("#product_popular img").attr("onclick","change();return false");//今days主打图片
    $("#product_popular .caption p a").attr("onclick","change();return false");//今days主打名称
  }
  for(var j=0;j<dataAll.data.length;j++){
      var now_date = new Date(dataAll.data[j].now_at);
      var str_current_date = dataAll.data[j].count_down_at;
      var current_date = new Date(str_current_date);
      var strclass = ' .countdown' + j;
      var aboutday_ = ' .countdown' + j + " .dayPart" + " .days";
      var aboutday = ' .countdown' + j + " .dayPart";
      var abouttime=' .countdown' + j + " .timePart";
      if (current_date>now_date) {
        $(strclass).parent().attr("style", "display:block;");
        $(strclass).downCount({
          date: str_current_date,
          offset:8,
        });
      }else{
        $(strclass).parent().attr("style", "display:none;");
      }
      if(current_date-now_date>86400000){
         $(abouttime).html("");
      }
      else{
         $(aboutday).html("");
      }
    }
}

function change(){
  layerIndex=layer.open({
    title:'Please login first',
    type: 1,
    skin: 'layui-layer-demo', //样式类名
    anim: 2,
    shadeClose: true, //开启遮罩关闭
    btn:false,//按钮
    content: $('#gologin'),
    yes: function(){

    }

  });
};

function howclaim(){
  layerIndex=layer.open({
    title:'How to buy',
    type: 1,
    skin: 'layui-layer-demo', //样式类名
    anim: 2,
    shadeClose: true, //开启遮罩关闭
    btn:false,//按钮
    content: $('#howclaim'),
    yes: function(){

    }

  });
};

function login(){
  var data = {
    user_name:$("#form-username").val(),
    pwd:$("#form-password").val()
  }
  $.ajax({
    type: "POST",
    url:"/product/login",
    async: true,
    data:data,
    success: function(msg) {
      var data = JSON.parse(msg);
      if(data.state==0){
        layer.closeAll();
        layer.msg('Login successful', {
          icon: 1,
                      time: 800//2s后自动关闭
                    });
        window.location.reload();
      }
      else if(data.state==1){
        $("#confirmMsg").html("User name does not exist!");
      }
      else{
        $("#confirmpassword").html("Password error!");
      }     
    },
    error:function(){
      console.log("error");
    }
  });
}

function signin(){
 window.location.href="/product/signin.html";
}

//参数：要分享的链接
function sharetwitter(hrefName){
  window.open('http://twitter.com/home?status='+encodeURIComponent(hrefName));
  return false;
}

function shareFacebook(hrefName){
  window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(hrefName)+encodeURIComponent(document.title));
  return false;
}

function sharegoogle(hrefName){
  window.open('http://www.google.com/bookmarks/mark?op=add&bkmk='+encodeURIComponent(hrefName));
  return false;
}
//点赞
function like(m){
  var imgId = $(m).attr("id");
  var current_obj = $(m);
  $(m).attr("src","img/like.png");
  var data = {
    product_id:imgId
  };
  $.ajax({
    type: "post",
    url:"/product/like_product",
    async: true,
    data:data,
    success: function(msg) {
      current_obj.parent().parent().find(".likecount").html(msg.count);
    },
    error:function(){

    }
  });
}