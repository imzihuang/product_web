
var dataAll;
var aboutOut=$(".track-sign-up").val();console.log(aboutOut);
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
  async: false,
  data:data,
  success: function(msg) {
   dataAll=msg;
   var str="";
   var str_="";
   for(var i=0;i<msg.data.length;i++){
    str_='<div class="col-sm-6 col-md-3"><div class="thumbnail"><img src="'+msg.data[i].img_path+
    '"alt="通用的占位符缩略图"><div class="caption text-left"><p class="product_name"><a>'+
    msg.data[i].theme+'</a></p><p class="color_gray">'+
    msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>'+
    msg.data[i].ori_price+'￥</a></span>&nbsp;&nbsp;<span class="color_gray"><a>'+
    msg.data[i].con_price+'￥</a></span>&nbsp;&nbsp;<span class="color_gray_block">postage:'+
    msg.data[i].postage_price+'￥</span></p><a id="timedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
    '<p class="aboutHelp"><a>how to claim it?</a></p>'+
    '<div class="likeList"><img src="img/start.png" class="startimg"/><span class="likecount">'+(parseInt(msg.data[i].like_count)+parseInt(msg.data[i].like_add_count))+'</span><a ><img src="img/unlike.png" id="'+msg.data[i].id+'"></a></div>'+
    '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen" title="Facebook"></i></a><a class="share share_twitter" onclick="shareQZone('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen" title="twitter"></i></a><a class="share share_google"><i class="fa fa-google areapen" title="google"></i></a></span></div></div></div></div></div>'
    str=str+str_;
  }   
  $("#listPart").append(str);  
  for(var j=0;j<msg.data.length;j++){
    var strname="";
    var strclass="";
    var strclass='.countdown'+j;
    strname=msg.data[j].count_down_at;

    $(strclass).downCount({
      date: strname,
      offset: +10
    }, function () {

    }); 
    
  } 
},
error:function(){
  console.log("error");
}
});
}
    //ajax
    function apply(){
      $.ajax({
        type: "GET",
        url:"/product/product_os",
        async: false,
        success: function(msg) {console.log(msg);
          dataAll=msg;
          var str="";
          var str_="";
          for(var i=0;i<msg.data.length;i++){
           str_='<div class="col-sm-6 col-md-3"><div class="thumbnail"><img src="'+msg.data[i].img_path+
           '"alt="通用的占位符缩略图"><div class="caption text-left"><p class="product_name"><a>'+
           msg.data[i].theme+'</a></p><p class="color_gray">'+
           msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>'+
           msg.data[i].ori_price+'￥</a></span>&nbsp;&nbsp;<span class="color_gray"><a>'+
           msg.data[i].con_price+'￥</a></span>&nbsp;&nbsp;<span class="color_gray_block">postage:'+
           msg.data[i].postage_price+'￥</span></p><a id="timedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
           '<p class="aboutHelp"><a>how to claim it?</a></p>'+
           '<div class="likeList"><img src="img/start.png" class="startimg"/><span class="likecount">'+(parseInt(msg.data[i].like_count)+parseInt(msg.data[i].like_add_count))+'</span><a ><img src="img/unlike.png" id="'+msg.data[i].id+'"></a></div>'+
           '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen" title="Facebook"></i></a><a class="share share_twitter" onclick="shareQZone('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen" title="twitter"></i></a><a class="share share_google"><i class="fa fa-google areapen" title="google"></i></a></span></div></div></div></div></div>'
           str=str+str_;
         }   
         $("#listPart").append(str);  
         for(var j=0;j<msg.data.length;j++){
           var strname="";
           var strclass="";
           var strclass='.countdown'+j;
           strname=msg.data[j].count_down_at;

           $(strclass).downCount({
             date: strname,
             offset: +10
           }, function () {
             $(this).parent().html('');
           }); 
           
         }
       },
     });
    }
    //ajax

    $('.likeList a img').click(function(){
      var imgId=$(this).attr("id");
      var current_obj = $(this);
      current_obj.attr("src","img/like.png");
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
    //
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

    function productsearch(){console.log(223);
      var str="";
      var str_="";
      for(var i=0;i<dataAll.data.length;i++){
        if(dataAll.data[i].name==$("#productSearch").val()){
          str_='<div class="col-sm-6 col-md-3"><div class="thumbnail"><img src="'+dataAll.data[i].img_path+
          '"alt="通用的占位符缩略图"><div class="caption text-left"><p class="product_name"><a>'+
          dataAll.data[i].theme+'</a></p><p class="color_gray">'+
          dataAll.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>'+
          dataAll.data[i].ori_price+'￥</a></span>&nbsp;&nbsp;<span class="color_gray"><a>'+
          dataAll.data[i].con_price+'￥</a></span>&nbsp;&nbsp;<span class="color_gray_block">postage:'+
          dataAll.data[i].postage_price+'￥</span></p><a id="timedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
          '<p class="aboutHelp"><a>how to claim it?</a></p>'+
          '<div class="likeList"><img src="img/start.png" class="startimg"/><span class="likecount">'+dataAll.data[i].like_count+'</span><a ><img src="img/unlike.png" id="'+dataAll.data[i].id+'"></a></div>'+
          '<div class="likeList"><span class="f_left"><a class="share share_face" onclick="shareFacebook('+"'"+window.location.href+"'"+')"><i class="fa fa-facebook areapen" title="Facebook"></i></a><a class="share share_twitter" onclick="shareQZone('+"'"+window.location.href+"'"+')"><i class="fa fa-twitter areapen" title="twitter"></i></a><a class="share share_google"><i class="fa fa-google areapen" title="google"></i></a></span></div></div></div></div></div>'
          str=str+str_;
        }
      }
      $("#listPart").html("");
      $("#listPart").append(str);
      for(var j=0;j<dataAll.data.length;j++){
       var strname="";
       var strclass="";
       var strclass='.countdown'+j;
       strname=dataAll.data[j].count_down_at;

       $(strclass).downCount({
         date: strname,
         offset: +10
       }, function () {
        $(this).parent().html('');
      }); 

     }
   }


   function change(){
    var aboutOut=$(".track-sign-up").attr("href");
    if(aboutOut=="signin.html"){
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
    }
    else{
      window.location.href=$(this).attr("href");
    }
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
        console.log(msg);
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

