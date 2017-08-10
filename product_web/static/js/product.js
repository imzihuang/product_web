
var dataAll;
var aboutOut=$(".track-sign-up").val();
var aboutOut_href=$(".track-sign-up").attr("href");
if($("#current_keyword").val()==""){
  apply();
}
else{
  putkeyword();

}
if(aboutOut_href=="signin.html"){
  $(".product_name a").attr("onclick","change();return false");
  $(".likeList a img").attr("onclick","change();return false");
  $(".thumbnail a").eq(0).attr("onclick","change();return false"); console.log(9);
}
function putkeyword(){
 var data = {
  keyword:$("#current_keyword").val(),
  like_query:1
}
$.ajax({
  type: "GET",
  url:"/product/product_os",
  async: false,
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
      str_='<div class="col-sm-6 col-md-2"><div class="thumbnail"><a href="'+msg.data[i].links+'"><img src="'+msg.data[i].img_path+
      '"alt="通用的占位符缩略图"></a><div class="caption text-left"><p class="product_name"><a href="'+msg.data[i].links+'">'+
      msg.data[i].theme+'</a></p><p class="color_gray">'+
      msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>￥'+
      msg.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>￥'+
      msg.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">'+
      show_postage(msg.data[i].postage_price)+'</span></p><a class="atimedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
      '<p class="aboutHelp"><a>how to claim ?</a></p>'+
      '<div class="likeList"><img src="img/start.png" class="startimg"/><a ><img src="img/unlike.png" id="'+msg.data[i].id+'"></a><span class="likecount">'+(parseInt(msg.data[i].like_count)+parseInt(msg.data[i].like_add_count))+'</span></div>'+
      '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen"></i></a>'+
      '<a class="share share_twitter" onclick="sharetwitter('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen"></i></a>'+
      '<a class="share share_google" onclick="sharegoogle('+"'"+window.location.href+"'"+')"><i class="fa fa-google areapen"></i></a></span></div></div></div></div></div>'
      str=str+str_;
    }
    $("#listPart").append(str);
    for(var i=0;i<msg.data.length;i++){
      if(msg.data[i].recommend==true)
      {
       pop_='<div class="col-sm-12 col-md-12"><div class="thumbnail"><img src="'+msg.data[i].img_path+
       '"alt="通用的占位符缩略图"><div class="caption"><p><a href="'+msg.data[i].links+'">'+msg.data[i].theme+
       '</a></p></div></div></div>'
       pop=pop+pop_;
     }
   }
   $("#product_popular").append(pop);
   for(var j=0;j<msg.data.length;j++){
    var now_date = new Date;
    var str_current_date = msg.data[j].count_down_at;
    var current_date = new Date(str_current_date);
    var strclass = ' .countdown' + j;
    if (current_date>now_date) {
      $(strclass).parent().attr("style", "display:block;");
      $(strclass).downCount({
        date: str_current_date,
        offset:8,
      });
    }else{
      $(strclass).parent().attr("style", "display:none;");
    }
  }
},
error:function(){
  console.log("error");
}
});
}
$(".share_google").mouseover(function(){
  $(this).next(".weichat").css("display","block");
});
$(".share_google").mouseout(function(){
  $(this).next(".weichat").css("display","none");
});
//ajax
function apply(){
  $.ajax({
    type: "GET",
    url:"/product/product_os",
    async: false,
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
       str_='<div class="col-sm-6 col-md-2"><div class="thumbnail"><a href="'+msg.data[i].links+'"><img src="'+msg.data[i].img_path+
       '"alt="通用的占位符缩略图"></a><div class="caption text-left"><p class="product_name"><a href="'+msg.data[i].links+'">'+
       msg.data[i].theme+'</a></p><p class="color_gray">'+
       msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>￥'+
       msg.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>￥'+
       msg.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">'+
       show_postage(msg.data[i].postage_price)+'</span></p><a class="atimedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
       '<p class="aboutHelp"><a>how to claim ?</a></p>'+
       '<div class="likeList"><img src="img/start.png" class="startimg"/><a ><img src="img/unlike.png" id="'+msg.data[i].id+'"></a><span class="likecount">'+(parseInt(msg.data[i].like_count)+parseInt(msg.data[i].like_add_count))+'</span></div>'+
       '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen" title="Facebook"></i></a>'+
       '<a class="share share_twitter" onclick="sharetwitter('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen" ></i></a>'+
       '<a class="share share_google" onclick="sharegoogle('+"'"+window.location.href+"'"+')"><i class="fa fa-google areapen"></i></a></span></div></div></div></div></div>'
       str=str+str_;
     }   
     $("#listPart").append(str);  
     for(var i=0;i<msg.data.length;i++){
      if(msg.data[i].recommend==true)
      {
        pop_='<div class="col-sm-12 col-md-12"><div class="thumbnail"><img src="'+msg.data[i].img_path+
        '"alt="通用的占位符缩略图"><div class="caption"><p><a href="'+msg.data[i].links+'">'+msg.data[i].theme+
        '</a></p></div></div></div>'
        pop=pop+pop_;
      }
    }
    $("#product_popular").append(pop);
    for(var j=0;j<msg.data.length;j++){
      var now_date = new Date;
      var str_current_date = msg.data[j].count_down_at;
      var current_date = new Date(str_current_date);
      var strclass = ' .countdown' + j;
      if (current_date>now_date) {
        $(strclass).parent().attr("style", "display:block;");
        $(strclass).downCount({
          date: str_current_date,
          offset:8,
        });
      }else{
        $(strclass).parent().attr("style", "display:none;");
      }
    }
  },
});
}
//ajax

$('.likeList a img').click(function(){console.log(1);
  var imgId=$(this).attr("id");
  var current_obj = $(this);
  current_obj.attr("src","img/like.png");console.log(2);
  var data = {
    product_id:imgId
  };

  $.ajax({
    type: "post",
    url:"/product/like_product",
    async: false,
    data:data,
    success: function(msg) {
      current_obj.parent().parent().find(".likecount").html(msg.count);
    },
    error:function(){
    }
  });
});

function logout(){
  $.ajax({
    type: "post",
    url:"/product/logout",
    async: false,
    success: function(msg) {
      window.location.href='/product/login.html';
    },
    error:function(){

    }
  });

}

function productsearch(){
  var str="";
  var str_="";
  var tag=$("#productSearch").val();
  if(tag==""){
    for(var i=0;i<dataAll.data.length;i++){
      str_='<div class="col-sm-6 col-md-2"><div class="thumbnail"><a href="'+msg.data[i].links+'"><img src="'+dataAll.data[i].img_path+
      '"alt="通用的占位符缩略图"></a><div class="caption text-left"><p class="product_name"><a href="'+dataAll.data[i].links+'">'+
      dataAll.data[i].theme+'</a></p><p class="color_gray">'+
      dataAll.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>￥'+
      dataAll.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>￥'+
      dataAll.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">postage:￥'+
      dataAll.data[i].postage_price+'</span></p><a id="timedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
      '<p class="aboutHelp"><a>how to claim ?</a></p>'+
      '<div class="likeList"><img src="img/start.png" class="startimg"/><a ><img src="img/unlike.png" id="'+dataAll.data[i].id+'"></a><span class="likecount">'+dataAll.data[i].like_count+'</span></div>'+
      '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen" title="Facebook"></i></a>'+
      '<a class="share share_twitter" onclick="sharetwitter('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen"></i></a>'+
      '<a class="share share_google" onclick="sharegoogle('+"'"+window.location.href+"'"+')"><i class="fa fa-google areapen"></i></a></span></div></div></div></div></div>'
      str=str+str_;
    }
    $("#listPart").html("");
    $("#listPart").append(str);
  }else{
    for(var i=0;i<dataAll.data.length;i++){
      if(dataAll.data[i].name.indexOf(tag)!=-1||dataAll.data[i].theme.indexOf(tag)!=-1||dataAll.data[i].description.indexOf(tag)!=-1){
        str_='<div class="col-sm-6 col-md-2"><div class="thumbnail"><a href="'+msg.data[i].links+'"><img src="'+dataAll.data[i].img_path+
        '"alt="通用的占位符缩略图"></a><div class="caption text-left"><p class="product_name"><a href="'+dataAll.data[i].links+'">'+
        dataAll.data[i].theme+'</a></p><p class="color_gray">'+
        dataAll.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>￥'+
        dataAll.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>￥'+
        dataAll.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">postage:￥'+
        dataAll.data[i].postage_price+'</span></p><a id="timedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
        '<p class="aboutHelp"><a>how to claim ?</a></p>'+
        '<div class="likeList"><img src="img/start.png" class="startimg"/><img src="img/unlike.png" id="'+dataAll.data[i].id+'"></a><span class="likecount">'+dataAll.data[i].like_count+'</span><a ><img src="img/unlike.png" id="'+dataAll.data[i].id+'"></a></div>'+
        '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen" title="Facebook"></i></a>'+
        '<a class="share share_twitter" onclick="sharetwitter('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen"></i></a>'+
        '<a class="share share_google" onclick="sharegoogle('+"'"+window.location.href+"'"+')"><i class="fa fa-google areapen"></i></a></span></div></div></div></div></div>'
        str=str+str_;
      }
    }
    $("#listPart").html("");
    $("#listPart").append(str);
  }
  var aboutOut_href=$(".track-sign-up").attr("href");
  if(aboutOut_href=="signin.html"){
    $(".likeList a img").attr("onclick","change();return false");
    $(".thumbnail a").eq(0).attr("onclick","change();return false");
  }
  for(var j=0;j<dataAll.data.length;j++){
   var strname="";
   var strclass="";
   var strclass='.countdown'+j;
   strname=dataAll.data[j].count_down_at;

   $(strclass).downCount({
     date: strname
   }, function () {

   })
 }
}
function change(){console.log(111);
  layerIndex=layer.open({
    title:'请先登录',
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

function login(){
  var data = {
    user_name:$("#form-username").val(),
    pwd:$("#form-password").val()
  }
  $.ajax({
    type: "POST",
    url:"/product/login",
    async: false,
    data:data,
    success: function(msg) {
      var data = JSON.parse(msg);
      if(data.state==0){
        layer.closeAll();
        layer.msg('登录成功', {
          icon: 1,
                      time: 800//2s后自动关闭
                    });
        window.location.reload();
      }
      else if(data.state==1){
        $("#confirmMsg").html("用户名不存在！");
      }
      else{
        $("#confirmpassword").html("密码错误！");
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
