company_os();
function down_base(method){
	var dowen_a = document.createElement('a');
	var down_url = "/product/excel_os?method="+method;
	dowen_a.href = down_url;
    //dowen_a.download = "proposed_file_name";
    dowen_a.click();
}
$('#editcompanyBtn').click(function(){
	layerIndex=layer.open({
		title:'编辑公司信息',
		type: 1,
		  skin: 'layui-layer-demo', //样式类名
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  btn: ['确定', '取消'] ,//按钮
		  content: $('#editcompany'),
		  yes: function(){ 	
		  }
		});
});
function company_os(){
	$.ajax({
		type: "GET",
		url:"/product/company_os",
		async: false,
		success: function(msg) {
			console.log(msg);
			var str="";
			$("#companymain").append(str);
		},

	});
}