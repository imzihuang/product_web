apply();
var aboutOut=$(".track-sign-up").val();
var dataAll;
function apply(){
  $.ajax({
    type: "GET",
    url:"/product/keyword_os",
    async: false,
    success: function(msg) {console.log(msg);
      dataAll=msg;
      var str="";
      for(var i=0;i<msg.data.length;i++){
       str_='<div class="col-sm-6 col-md-3"><div class="thumbnail"><img src="'+msg.data[i].img_path+
       '"alt="通用的占位符缩略图"><div class="caption text-left"><p class="product_name"><a onclick=keyword_os("'+ msg.data[i].name +'")>'+
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
       var strclass="";  
       var strname="";
       var current_obj=$(this);
     for(var j=0;j<msg.data.length;j++){
       strclass='.countdown'+j;
       console.log(strclass);
       strname=msg.data[j].count_down_at;console.log(strname);
       $(strclass).downCount({
         date: strname,
         offset: +10
       }, function () {
       });console.log($(strclass).html());
       if($(strclass).val()=="00日00:00:00"){console.log(00);
         $(strclass).parent().html('');
       }
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
        keyword_id:imgId
    };
    $.ajax({
        type: "post",
        url:"/product/like_keyword",
        async: false,
        data:data,
        success: function(msg) {
            current_obj.parent().parent().find(".likecount").html(msg.count);
        },
        error:function(){

        }
    });
});



function keyword_os(keyword){
  window.location.href='/product/product.html?keyword='+keyword;
}
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
 //分享到新浪微博
//参数：要分享的链接
function shareQZone(hrefName){
  window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(hrefName));
  return false;
}

function shareFacebook(hrefName){
  window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(hrefName)+encodeURIComponent(document.title));
  return false;
}
function search(){
  var str="";
  var str_="";
  for(var i=0;i<dataAll.data.length;i++){
    if(dataAll.data[i].theme==$("#homeSearch").val()){
      str_='<div class="col-sm-6 col-md-3"><div class="thumbnail"><img src="'+dataAll.data[i].img_path+
      '"alt="通用的占位符缩略图"><div class="caption text-left"><p class="product_name"><a onclick=keyword_os("'+ dataAll.data[i].name +'")>'+
      dataAll.data[i].theme+'</a></p><p class="color_gray">'+
      dataAll.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>'+
      dataAll.data[i].ori_price+'￥</a></span>&nbsp;&nbsp;<span class="color_gray"><a>'+
      dataAll.data[i].con_price+'￥</a></span>&nbsp;&nbsp;<span class="color_gray_block">postage:'+
      dataAll.data[i].postage_price+'￥</span></p><a id="timedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
      '<p class="aboutHelp"><a>how to claim it?</a></p>'+
      '<div class="likeList"><img src="img/start.png" class="startimg"/><span class="likecount">'+(parseInt(dataAll.data[i].like_count)+parseInt(dataAll.data[i].like_add_count))+'</span><a ><img src="img/unlike.png" id="'+dataAll.data[i].id+'"></a></div>'+
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
           if(strname==""){
            $("#timedown").html('');console.log(02);
          }
          else{
           $(strclass).downCount({
             date: strname,
             offset: +10
           }, function () {
             $("#timedown").html('');console.log(02);
           }); 
         }  
       }  
}

$(".product_name a").click(function(){
  if(aboutOut=="Sign In"){
   window.location.href='/product/login.html';
 }
});