company_os();
var oldName=$('#showname').html();
function down_base(method){
	var dowen_a = document.createElement('a');
	var down_url = "/product/excel_os?method="+method;
	dowen_a.href = down_url;
    //dowen_a.download = "proposed_file_name";
    dowen_a.click();
}
$('#editcompanyBtn').click(function(){
	$("#companyoldname").val(oldName);
	layerIndex=layer.open({
		title:'编辑公司信息',
		type: 1,
		  skin: 'layui-layer-demo', //样式类名
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  btn: ['确定', '取消'] ,//按钮
		  content: $('#editcompany'),
		  yes: function(){ 
		  	var data = {
		  		old_name:$("#companyoldname").val(),
		  		new_name:$("#companyname").val(),
		  		email:$("#companyemail").val(),
		  		telephone:$("#companytelephone").val(),
		  		address:$("#companyaddress").val(),
		  		country:$("#companycountry").val(),
		  		province:$("#companyprovince").val(),
		  		city:$("#companycity").val(),
		  		description:$("#companydescription").val()
		  	};
		  	$.ajax({
		  		type: "post",
		  		url:"/product/company_os",
		  		async: false,
		  		data:data,
		  		success: function(msg) {
		  			console.log(msg);
		  			$("#companymain").find("div").remove();
		  			company_os();
		  			layer.closeAll();
		  			layer.msg('修改成功', {
		  				icon: 1,
		  				time:600
		  			});
		  		},
		  		error:function(){
		  			layer.closeAll();
		  			layer.msg('修改失败', {
		  				icon: 1,
		  				time:600
		  			});
		  		}
		  	});
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
			str='<div style="margin: 10px 0;"><label>公司名称：</label><span id="showname">'+msg.data.name+
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
$('#showpvpu').click(function(){
	layerIndex=layer.open({
	  title:'显示pv/pu',
	  type: 1,
	  skin: 'layui-layer-demo', //样式类名
	  anim: 2,
	  shadeClose: true, //开启遮罩关闭
	  btn: ['确定', '取消'] ,//按钮
	  content: $('#editpvpu'),
	  yes: function(){ 
	  	var data = {
	  		method:$("#pvpumethod").val(),
	  		page:$("#pvpupage").val(),
	  		start:$("#pvpustart").val(),
	  		end:$("#pvpuend").val()
	  	};
	  	$.ajax({
	  		type: "get",
	  		url:"/product/pvpu_os",
	  		async: false,
	  		data:data,
	  		success: function(msg) {
	  			console.log(msg);
	  			$("#pvputbody").find("tr").remove();
	  			var str;
	  			for(var i=0;i<msg.data.length;i++){
	  				str+='<tr class="gradeX"><td class="center">'+msg.data[i].count+
	  				'</td><td class="center">'+msg.data[i].html+
	  				'</td><td class="center">'+msg.data[i].ip+
	  				'</td></tr>';	
	  			}   
	  			$("#pvputbody").append(str);
	  			layer.closeAll();
	  			layer.msg('获取成功', {
	  				icon: 1,
	  				time:600
	  			});
	  		},
	  		error:function(){
	  			layer.closeAll();
	  			layer.msg('获取失败', {
	  				icon: 1,
	  				time:600
	  			});
	  		}
	  	});
	  }
	});
});
$("#showuser").click(function(){
	$.ajax({
		type: "get",
		url:"/product/user_all",
		async: false,
		data:data,
		success: function(msg) {
			console.log(msg);
			$("#usertbody").find("tr").remove();
			// var str;
			// for(var i=0;i<msg.data.length;i++){
			// 	str+='<tr class="gradeX"><td class="center">'+msg.data[i].count+
			// 	'</td><td class="center">'+msg.data[i].html+
			// 	'</td><td class="center">'+msg.data[i].ip+
			// 	'</td></tr>';	
			// }   
			// $("#usertbody").append(str);
			layer.closeAll();
			layer.msg('获取成功', {
				icon: 1,
				time:600
			});
		},
		error:function(){
			layer.closeAll();
			layer.msg('获取失败', {
				icon: 1,
				time:600
			});
		}
	});
});