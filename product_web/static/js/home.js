
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
                   '"alt="通用的占位符缩略图"><div class="caption text-left"><p class="product_name"><a>'+
                   msg.data[i].name+'</a></p><p class="color_gray">'+
                   msg.data[i].source+'</p><p class="howmuch"><span class="color_red"><a>'+
                   msg.data[i].ori_price+'</a></span>&nbsp;&nbsp;<span class="color_gray"><a>'+
                   msg.data[i].con_price+'</a></span>&nbsp;&nbsp;<span class="color_gray_block">'+
                   msg.data[i].postage_price+'</span></p><a><span class="timedown">Start for you in：</span><ul class="countdown"><li> <span class="hours">00</span><span> :</span></li><li> <span class="minutes">00</span><span> :</span></li><li> <span class="seconds">00</span><span> </span></li></ul></a><p class="aboutHelp"><a>how to claim it?</a></p><div class="likeList"><span class="f_left"><a>share</a></span><span class="likecount">100</span><a ><img src="img/unlike.png"></a></div></div></div></div>'
                   $('.countdown').downCount({
						date: msg.data[i].count_down_at,
						offset: +10
					}, function () {
						
					});  
                   str=str+str_;
                   }   
                    $("#listPart").append(str);    
            },
        });
    }
    //ajax

	$('.likeList a img').click(function(){
		if($(this).attr("src")==="img/unlike.png"){
			$(this).attr("src","img/like.png");
		}
		else{
			$(this).attr("src","img/unlike.png");
		}
	});
	// $('.countdown').downCount({
	// 	date: '12/24/2017 12:44:00',
	// 	offset: +10
	// }, function () {
	// 	alert('倒计时结束!');
	// });  
});
	
function search(){
	var data = {
	    product_name:$("#homeSearch").val()
	}
	$.ajax({
	    type: "GET",
	    url:"/product/product_os",
	    async: false,
	    data:data,
	    success: function(msg) {
	        var data = JSON.parse(msg);
	        console.log(msg);    
	    },
	    error:function(){
	        console.log("error");
	    }
	});
}


