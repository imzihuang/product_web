
$(document).ready(function(){
	  if($("#current_keyword").val()==""){console.log(1);
      apply();
    }
    else{
        putkeyword();console.log(2);
        
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
                   console.log(msg);
                   var str="";
                   var str_="";
                   for(var i=0;i<msg.data.length;i++){
                   str_='<div class="col-sm-6 col-md-3"><div class="thumbnail"><img src="'+msg.data[i].img_path+
                   '"alt="通用的占位符缩略图"><div class="caption text-left"><p class="product_name"><a>'+
                   msg.data[i].name+'</a></p><p class="color_gray">'+
                   msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>'+
                   msg.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>'+
                   msg.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">'+
                   msg.data[i].postage_price+'</span></p><a id="timedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
                   '<p class="aboutHelp"><a>how to claim it?</a></p>'+
                   '<div class="likeList"><span class="f_left"><a class="share share_face"><i class="fa fa-facebook areapen" title="Facebook"></i></a><a class="share share_twitter"><i class="fa fa-twitter areapen" title="twitter"></i></a><a class="share share_google"><i class="fa fa-google areapen" title="google"></i></a><a class="share share_envelope"><i class="fa fa-envelope areapen" title="envelope"></i></a></span>'+
                   '<span class="likecount">'+msg.data[i].like_count+'</span><a ><img src="img/unlike.png"id="'+msg.data[i].id+'"></a></div></div></div></div>'
                   
                   str=str+str_;
                   }   
                    $("#listPart").append(str);  
                    for(var j=0;j<msg.data.length;j++){
                      var strname="";
                      var strclass="";
                      var strclass='.countdown'+j;
                      strname=msg.data[j].count_down_at;
                      console.log(strname);
                      $(strclass).downCount({
                      date: strname,
                      offset: +10
                    }, function () {
                      $("#timedown").html('<span class="timedown">Start!</span>');
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
            success: function(msg) {
                // $("#listPart").find("div").remove();
                console.log(msg);
                var str="";
                var str_="";
                for(var i=0;i<msg.data.length;i++){
					      str_='<div class="col-sm-6 col-md-3"><div class="thumbnail"><img src="'+msg.data[i].img_path+
                   '"alt="通用的占位符缩略图"><div class="caption text-left"><p class="product_name"><a>'+
                   msg.data[i].name+'</a></p><p class="color_gray">'+
                   msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>'+
                   msg.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>'+
                   msg.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">'+
                   msg.data[i].postage_price+'</span></p><a id="timedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
                   '<p class="aboutHelp"><a>how to claim it?</a></p>'+
                   '<div class="likeList"><span class="f_left"><a class="share share_face"><i class="fa fa-facebook areapen" title="Facebook"></i></a><a class="share share_twitter"><i class="fa fa-twitter areapen" title="twitter"></i></a><a class="share share_google"><i class="fa fa-google areapen" title="google"></i></a><a class="share share_envelope"><i class="fa fa-envelope areapen" title="envelope"></i></a></span>'+
                   '<span class="likecount">'+msg.data[i].like_count+'</span><a ><img src="img/unlike.png"id="'+msg.data[i].id+'"></a></div></div></div></div>'
                   
                   str=str+str_;
                   }   
                    $("#listPart").append(str);  
                    for(var j=0;j<msg.data.length;j++){
                    	var strname="";
                    	var strclass="";
                    	var strclass='.countdown'+j;
                    	strname=msg.data[j].count_down_at;
                      console.log(strname);
	                    $(strclass).downCount({
        							date: strname,
        							offset: +10
        						}, function () {
        							$("#timedown").html('<span class="timedown">Start!</span>');
        						}); 
        					}  
            },
        });
    }
    //ajax

	$('.likeList a img').click(function(){
    var imgId=$(this).attr("id");
    console.log(imgId);
    $(this).attr("src","img/like.png");
    //
    var data = {
                product_id:imgId
            };
    console.log(data);
    $.ajax({
            type: "post",
            url:"/product/like_product",
            async: false,
            data:data,
            success: function(msg) {
              console.log(msg);
              $(".likecount").html(msg.count);
                    },
            error:function(){
                           
                 }
            });
    //
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
$(".product_name a").click(function(){
  if($(".track-sign-up").val()!="Log Out"){
     window.location.href='/product/login.html';
  }
});