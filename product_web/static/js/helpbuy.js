var aboutOut_href=$(".track-sign-up").attr("href");
if(aboutOut_href=="signin.html"){
  $(".wordRight a").attr("onclick","change();return false");
}
function helpemail(){
  layerIndex=layer.open({
    title:'请先登录',
    type: 1,
    skin: 'layui-layer-demo', //样式类名
    anim: 2,
    shadeClose: true, //开启遮罩关闭
    btn: ['确定', '取消'] ,//按钮
    content: $('#helpemail'),
    yes: function(){

    }

  });
};
function change(){
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
};
function signin(){
 window.location.href="/product/signin.html";
}