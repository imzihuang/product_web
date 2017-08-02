
$(document).ready(function(){
	apply();
    //ajax
    function apply(){
      $.ajax({
            type: "GET",
            url:"/product/keyword_os",
            async: false,
            success: function(msg) {
                // $("#listPart").find("div").remove();
                console.log(msg);
                var str="";
                for(var i=0;i<msg.data.length;i++){
					str_='<div class="col-sm-6 col-md-3"><div class="thumbnail"><img src="'+msg.data[i].img_path+
                   '"alt="通用的占位符缩略图"><div class="caption text-left"><p class="product_name"><a onclick=keyword_os("'+ msg.data[i].name +'")>'+
                   msg.data[i].name+'</a></p><p class="color_gray">'+
                   msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>'+
                   msg.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>'+
                   msg.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">'+
                   msg.data[i].postage_price+'</span></p><a id="timedown"><span class="timedown">Start for you in：</span><ul class="countdown'+i+' countdown"><li><span class="days">00</span><span>日</span><span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a>'+
                   '<p class="aboutHelp"><a>how to claim it?</a></p>'+
                   '<div class="likeList"><span class="f_left"><a class="share share_face"><i class="fa fa-facebook areapen" title="Facebook"></i></a><a class="share share_twitter"><i class="fa fa-twitter areapen" title="twitter"></i></a><a class="share share_google"><i class="fa fa-google areapen" title="google"></i></a><a class="share share_envelope"><i class="fa fa-envelope areapen" title="envelope"></i></a></span>'+
                   '<span class="likecount">'+msg.data[i].like_count+'</span><a ><img src="img/unlike.png" id="'+msg.data[i].id+'"></a></div></div></div></div>'
                   
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
    //分享到新浪微博
	//参数：要分享的链接
	function shareSina(hrefName){
	    window.open('http://v.t.sina.com.cn/share/share.php?url=' + encodeURIComponent(hrefName));
	    return false;
	}
	$('.likeList a img').click(function(){
    var imgId=$(this).attr("id");
    console.log(imgId);
		if($(this).attr("src")==="img/unlike.png"){
			$(this).attr("src","img/like.png");
		}
		else{
			$(this).attr("src","img/unlike.png");
		}
    //
    var data = {
                keyword_id:imgId
            };
    console.log(data);
    $.ajax({
            type: "post",
            url:"/product/like_keyword",
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
	
function keyword_os(keyword){
  window.location.href='/product/product.html?keyword='+keyword;
}

function logout(){
  $.cookie('user_name', null);console.log(1);
  jQuery.cookie=function(name,value,options){
      if(typeof value!='undefined'){
          options=options||{};
          if(value===null){
              value='';
              options.expires=-1;
          }
          var expires='';
          if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){
               var date;
              if(typeof options.expires=='number'){
                  date=new Date();
                  date.setTime(date.getTime()+(options.expires * 24 * 60 * 60 * 1000));
               }else{
                  date=options.expires;
              }
              expires=';expires='+date.toUTCString();
           }
          var path=options.path?';path='+options.path:'';
          var domain=options.domain?';domain='+options.domain:'';
          var secure=options.secure?';secure':'';
          document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');
       }else{
          var cookieValue=null;
          if(document.cookie&&document.cookie!=''){
              var cookies=document.cookie.split(';');
              for(var i=0;i<cookies.length;i++){
                  var cookie=jQuery.trim(cookies[i]);
                  if(cookie.substring(0,name.length+1)==(name+'=')){
                      cookieValue=decodeURIComponent(cookie.substring(name.length+1));
                      break;
                  }
              }
          }
          return cookieValue;
      }
  };
}
