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
			str='<div style="margin: 10px 0;"><label>公司名称：</label><span>'+msg.data.name+
			'</span></div><div style="margin: 10px 0;"><label>邮箱：</label><span>'+msg.data.email+
			'</span></div><div style="margin: 10px 0;"><label>电话号码：</label><span>'+msg.data.telephone+
			'</span></div><div style="margin: 10px 0;"><label>公司地址：</label><span>'+msg.data.address+
			'</span></div><div style="margin: 10px 0;"><label>国家：</label><span>'+msg.data.country+
			'</span></div><div style="margin: 10px 0;"><label>省份：</label><span>'+msg.data.city+
			'</span></div><div style="margin: 10px 0;"><label>城市：</label><span>'+msg.data.province+
			'</span></div><div style="margin: 10px 0;"><label>描述：</label><span>'+msg.data.description+
			'</span></div>'
			$("#companymain").append(str);
		},

	});
}