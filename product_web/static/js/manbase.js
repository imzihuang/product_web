company_os();

function down_base(method,start,end){
	var dowen_a = document.createElement('a');
	var down_url = "/product/excel_os?method="+method+'&start='+start+'&end='+end;
	dowen_a.href = down_url;
    //dowen_a.download = "proposed_file_name";
    dowen_a.click();
}
$('#editcompanyBtn').click(function(){
	var oldName=$('#showname').html();
	$('input').val("");
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
		  		async: true,
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
		async: true,
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
	$('input').val("");
	$("#pvpumethoderror").html("");
	$("#pvpustarterror").html("");
	$("#pvpuenderror").html("");
	layerIndex=layer.open({
	  title:'显示pv/pu',
	  type: 1,
	  skin: 'layui-layer-demo', //样式类名
	  anim: 2,
	  shadeClose: true, //开启遮罩关闭
	  btn: ['确定', '取消'] ,//按钮
	  content: $('#editpvpu'),
	  yes: function(){ 
	  	if($("#pvpumethod").val()==""){
	  		$("#pvpumethoderror").html("请输入pu/pv！");
	  	}
	  	if($("#pvpustart").val()==""){
	  		$("#pvpustarterror").html("请输入开始时间！");
	  	}
	  	if($("#pvpuend").val()==""){
	  		$("#pvpuenderror").html("请输入截止时间！");
	  	}
	  	if($("#pvpumethod").val()!="" && $("#pvpustart").val()!="" && $("#pvpuend").val()!=""){
	  		var data = {
	  			method:$("#pvpumethod").val(),
	  			page:$("#pvpupage").val(),
	  			start:$("#pvpustart").val(),
	  			end:$("#pvpuend").val()
	  		};
	  		$.ajax({
	  			type: "get",
	  			url:"/product/pvpu_os",
	  			async: true,
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
	  }
	});
});
$('#downpv').click(function(){
	$('input').val("");
	$("#pvstarterror").html("");
	$("#pvenderror").html("");
	layerIndex=layer.open({
	  title:'获取pv',
	  type: 1,
	  skin: 'layui-layer-demo', //样式类名
	  anim: 2,
	  shadeClose: true, //开启遮罩关闭
	  btn: ['确定', '取消'] ,//按钮
	  content: $('#editpv'),
	  yes: function(){ 
	  	if($("#pvstart").val()==""){
	  		$("#pvstarterror").html("请输入开始时间！");
	  	}
	  	if($("#pvend").val()==""){
	  		$("#pvenderror").html("请输入截止时间！");
	  	}
	  	if($("#pvstart").val()!="" && $("#pvend").val()!=""){
	  		var data = {
	  			start:$("#pvstart").val(),
	  			end:$("#pvend").val()
	  		};
	  		down_base('pv',data.start,data.end);
	  	}
	  }
	});
});
$('#downpu').click(function(){
	$('input').val("");
	$("#pustarterror").html("");
	$("#puenderror").html("");
	layerIndex=layer.open({
	  title:'获取pu',
	  type: 1,
	  skin: 'layui-layer-demo', //样式类名
	  anim: 2,
	  shadeClose: true, //开启遮罩关闭
	  btn: ['确定', '取消'] ,//按钮
	  content: $('#editpu'),
	  yes: function(){ 
	  	if($("#pustart").val()==""){
	  		$("#pustarterror").html("请输入开始时间！");
	  	}
	  	if($("#puend").val()==""){
	  		$("#puenderror").html("请输入截止时间！");
	  	}
	  	if($("#pustart").val()!="" && $("#puend").val()!=""){
	  		var data = {
	  			start:$("#pustart").val(),
	  			end:$("#puend").val()
	  		};
	  		down_base('pu',data.start,data.end);
	  	}
	  }
	});
});
$("#showuser").click(function(){
	$.ajax({
		type: "get",
		url:"/product/user_all",
		async: true,
		success: function(msg) {
			console.log(msg);
			$("#usertbody").find("tr").remove();
			var str;
			for(var i=0;i<msg.data.length;i++){
				str+='<tr class="gradeX"><td class="center">'+msg.data[i].name+
				'</td><td class="center">'+msg.data[i].pwd+
				'</td><td class="center">'+msg.data[i].reset_pwd+
				'</td><td class="center">'+msg.data[i].age+
				'</td><td class="center">'+msg.data[i].telephone+
				'</td><td class="center">'+msg.data[i].email+
				'</td><td class="center">'+msg.data[i].birthday_at+
				'</td><td class="center">'+msg.data[i].created_at+
				'</td><td class="center">'+msg.data[i].updated_at+
				'</td></tr>';	
			}   
			$("#usertbody").append(str);
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

function gomk(){
	window.location.href="/manage/mankeyword.html";
}

function gomp(){
	window.location.href="/manage/manproduct.html";
}