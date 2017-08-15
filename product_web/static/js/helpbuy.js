var aboutOut_href=$(".track-sign-up").attr("href");
if(aboutOut_href=="signin.html"){
  $(".wordRight a").attr("onclick","change();return false");
}
function helpemail(){
  $('input').val("");
  $('textarea').val("");
  $("#confirmhelp").html("");
  layerIndex=layer.open({
    title:'Please fill in the topic and content',
    type: 1,
    skin: 'layui-layer-demo', //样式类名
    anim: 2,
    shadeClose: true, //开启遮罩关闭
    btn: ['confirm', 'cancel'] ,//按钮
    content: $('#helpemail'),
    yes: function(){
    //
     var data = {
        message:$("#heleMag").val(),
        subject:$("#helpThem").val()
      }
      $.ajax({
        type: "POST",
        url:"/product/send_email",
        async: false,
        data:data,
        success: function(msg) {
          var data = JSON.parse(msg);
          if(data.state==0){
            layer.closeAll();
            layer.msg('Send a success', {
              icon: 1,
              time: 800//2s后自动关闭
            });
            window.location.reload();
          }
            
        },
        error:function(){
          if(data.state==1){
            $("#confirmhelp").html("Company email format error!");
          }
          else if(data.state==2){
            $("#confirmhelp").html("Messages or topics cannot be empty!");
          }
          else{
            $("#confirmhelp").html("Failed to send email, resubmit!");
          }   
        }
      });
    //
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
};
function signin(){
 window.location.href="/product/signin.html";
}
