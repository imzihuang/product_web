
$(function() {
	//全选按钮
	$("#zx_checkedAllBtn").click(function() {
		if(this.checked) {
			$("#tbody :checkbox").prop("checked", true);
		} else {
			$("#tbody :checkbox").prop("checked", false);
		}
		allchk();
	});

	$("#tbody :checkbox").click(function(){
		allchk();
	})
	//全选
	function allchk() {
		$('#delInfo').attr("disabled",false); 
		var chknum = $("#tbody :checkbox").size(); //选项总个数 
		var chk = 0;
		$("#tbody :checkbox").each(function(index,ele) {
			$(this).parents('tr').attr('id',"trId_"+index);
			if($(this).prop("checked") == true) {
				chk++;
			}
		});
		if(chknum == chk) { //全选 
			$("input[name=allcheck]").prop("checked", true);
		} else { //不全选 
			$("input[name=allcheck]").prop("checked", false);
		}
		if(chk>=1){
				$('#delInfo').attr('class','btn btn-primary btn-myown');
		}else{
			$('#delInfo').attr('class','btn btn-default btn-myown');
		}
	}
	/*=================================*/

	//============
		//删除选中项
	$('#delInfo').click(function() {
		var valArr = new Array;
		getValArr(valArr);
		
		if(valArr.length > 0) {
			layer.confirm('您确定删除吗？', {
				btn: ['确定', '取消'] //按钮
			}, 
			function() {
				console.log(valArr);
				var nameStr=new Array;
				for(var i=0;i<valArr.length;i++){
                 nameStr[i]=$("#tbody tr").eq(valArr[i]).find("td:eq(2)").html();
				}
				var nameDelete="";
				for(var j=0;j<nameStr.length-1;j++){
					nameDelete=nameDelete+nameStr[j]+'|';
				}
				nameDelete=nameDelete+nameStr[nameStr.length-1];
				//
				var data = {
                    product_name:nameDelete
                };
                console.log(data);
				$.ajax({
                    type: "post",
                    url:"/product/product_os_del",
                    async: false,
                    data:data,
                    success: function(msg) {
                        // var data = JSON.parse(msg);
                        if(msg.state==10)
                        {
                        	window.location.href="/product/login.html";
                        }else{
                        console.log(msg);
                        delData(valArr);
                        layer.closeAll();
						layer.msg('删除成功', {
						icon: 1,
						time:600
					    });
					    window.location.reload();
					    productadd();
                        }
                    },
                    error:function(){
                        layer.closeAll();
						layer.msg('删除失败', {
						icon: 1,
						time:600
					    });
                    }
                });
				//
			    $('#delInfo').attr("disabled","disabled");
			    $('#delInfo').attr('class','btn btn-default btn-myown');
			},
			 function() {
			});
		} 
		else {
			$('#delInfo').attr("disabled","disabled");
		}
	});
	
	function getValArr(valArr) {
		$("#tbody :checkbox").each(function(index, ele) {
			if($(ele).prop("checked")) {
				valArr.push(index);
			}
		});
	}
	
	function delData(valArr){
		console.log(valArr);
		for(var i=0;i<valArr.length;i++){
			$('#trId_'+valArr[i]).remove();
		}
	}
	
	
	//==========
	var layerIndex;
	//添加
	$('#addInfo').click(function(){
		$('input').val("");
		$(".fileinput-remove-button").click();
		$(".rm_html").html("");
		$(".btn-file").removeAttr("disabled");
		// $(".fileinput-cancel-button").addClass("hide");
		layerIndex=layer.open({
		title:'添加产品',
		  type: 1,
		  skin: 'layui-layer-demo', //样式类名
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  btn: ['确定', '取消'] ,//按钮
		  content: $('#addInfoContent'),
		   yes: function(){
             $("#addInfoContent .fileinput-upload-button").click();
             $(".btn-file").removeAttr("disabled");
             $(".rm_html").html("");
			  	if($("#add_name").val()==""){
                   $(".add_name_error").html("产品名不能为空!");
                }
                if($("#add_source").val()==""){
                   $(".add_source_error").html("来源不能为空!");
                }
                if($("#add_theme").val()==""){
                   $(".add_theme_error").html("主题不能为空!");
                }
		  }
		
		});
	});

	$('body').on("click",".areapen",function(){
		var old_name=$(this).parent().parent().find(".userMessage").html();
        $('input').val("");
        $(".btn-file").removeAttr("disabled");
        $("#edit_product_name").val(old_name);
		layerIndex=layer.open({
		title:'修改产品信息',
		  type: 1,
		  skin: 'layui-layer-demo', //样式类名
		  closeBtn: 0, //不显示关闭按钮
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  btn: ['确定', '取消'] ,//按钮
		  content: $('#editAreaContent'),
		   yes: function(){
              var data = {};
                if($("#edit_product_name").val()!=""){
                   data.product_name=$("#edit_product_name").val();
                }
                if($("#edit_new_name").val()!=""){
                   data.new_name=$("#edit_new_name").val();
                }
                if($("#edit_source").val()!=""){
                   data.source=$("#edit_source").val();
                }
                if($("#edit_theme").val()!=""){
                   data.theme=$("#edit_theme").val();
                }
                if($("#edit_ori_price").val()!=""){
                   data.ori_price=$("#edit_ori_price").val();
                }
                if($("#edit_con_price").val()!=""){
                   data.con_price=$("#edit_con_price").val();
                }
                if($("#edit_postage_price").val()!=""){
                   data.postage_price=$("#edit_postage_price").val();
                }
                if($("#edit_count_down_at").val()!=""){
                   data.count_down_at=$("#edit_count_down_at").val();
                }
                if($("#edit_description").val()!=""){
                   data.description=$("#edit_description").val();
                }
                if($("#edit_like_add_count").val()!=""){
                   data.like_add_count=$("#edit_like_add_count").val();
                }
                if($("#edit_links").val()!=""){
                   data.links=$("#edit_links").val();
                }
                 if($("#edit_sort_num").val()!=""){
                   data.sort_num=$("#edit_sort_num").val();
                }
                if($("#edit_recommend").val()=="是"){data.recommend = 1;}
				else{data.recommend = 0;}
              $.ajax({
                    type: "PUT",
                    url:"/product/product_os_update",
                    async: false,
                    data:data,
                    success: function(msg) {
                        // var data = JSON.parse(msg);
                         if(msg.state==10)
                        {
                        	window.location.href="/product/login.html";
                        }else{
                        console.log(msg);
                        layer.closeAll();
						    layer.msg('修改成功', {
						    	icon: 1,
							    time: 800//2s后自动关闭
							  });
						productadd();
                        }
                    },
                    error:function(){
                        console.log("error");
                        	layer.closeAll();
						    layer.msg('修改失败', {
						    	icon: 1,
							    time: 800//2s后自动关闭
							  });
                    }
                });
             //
		  
		  }
		});
	});
	$('body').on("click",".photopen",function(){
		// $("#file-zh_edit").removeAttr("disabled");
		$(".rm_html").html("");
		var p_name=$(this).parent().parent().find(".userMessage").html();
        $("#editphoto_product_name").val(p_name);
        $(".fileinput-remove-button").click();
		$(".btn-file").removeAttr("disabled");
		// $(".fileinput-cancel-button").addClass("hide");
		layerIndex=layer.open({
		title:'修改图片信息',
		  type: 1,
		  skin: 'layui-layer-demo', //样式类名
		  closeBtn: 0, //不显示关闭按钮
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  btn: ['确定', '取消'] ,//按钮
		  content: $('#editphoto'),
		   yes: function(){
		   	$("#editphoto .fileinput-upload-button").click();
		   	$(".btn-file").removeAttr("disabled");

		  }
		});
	});
		
	$('.fa-exclamation-circle').mouseover(function() {
		$(this).next('.hiddenIntroduce').show();
	});
	$('.fa-exclamation-circle').mouseout(function() {
		$(this).next('.hiddenIntroduce').hide();
	});
	
	$('.fa-close').click(function() {
	layer.confirm('确定删除吗？', {
		btn: ['确定', '取消'] //按钮
	}, function() {
		layer.msg('删除成功', {
			icon: 1,
			time: 600
		});
	}, function() {});
});
});


	productadd();
	$("#zx_checkedAllBtn").click();
	$("#zx_checkedAllBtn").click();
	function productadd(){
	 $.ajax({
            type: "GET",
            url:"/product/product_os",
            async: false,
            success: function(msg) {
                $("#tbody").find("tr").remove();
                 var str;
                for(var i=0;i<msg.data.length;i++){
					str+='<tr class="gradeX"><td><input type="checkbox" class="zx_checkedBtn"></td><td class="centerSort">'+i+
					'</td><td class="userMessage">'+msg.data[i].name+'</td><td class="center">'+msg.data[i].img_path+
					'</td><td class="center">'+msg.data[i].source+'</td><td class="center">'+msg.data[i].theme+
					'</td><td class="center">'+msg.data[i].ori_price+'</td><td class="center">'+msg.data[i].con_price+
					'</td><td class="center">'+msg.data[i].postage_price+'</td><td class="center">'+msg.data[i].description+
					'</td><td class="center">'+msg.data[i].like_add_count+
					'</td><td class="center">'+msg.data[i].sort_num+
					'</td><td class="center">'+msg.data[i].recommend+
					'</td><td><i class="fa fa-pencil areapen" title="更新信息"></i>&nbsp;&nbsp;<i class="fa fa-photo photopen" title="更新图片"></i></td></tr>';	
                   }   
                    $("#tbody").append(str);
                    
            },
                
            });
	}

    $('#file-zh_add').fileinput({
        uploadUrl: '/product/product_os',
        //language: 'zh',
        allowedFileExtensions : ['jpg', 'png','gif'],
        maxFileCount: 1,
		showCaption: false,
        enctype: 'multipart/form-data',
        uploadExtraData: function(previewId, index) {   //额外参数的关键点
			var obj = {};
			if($("#add_name").val()!=""){
			obj.product_name = $("#add_name").val();
		    }
		    if($("#add_source").val()!=""){
			obj.source = $("#add_source").val();
		    }
		    if($("#add_theme").val()!=""){
			obj.theme = $("#add_theme").val();
		    }
		    if($("#add_ori_price").val()!=""){
			obj.ori_price = $("#add_ori_price").val();
	    	}
	    	if($("#add_con_price").val()!=""){
			obj.con_price = $("#add_con_price").val();
	    	}
	    	if($("#add_postage_price").val()!=""){
			obj.postage_price = $("#add_postage_price").val();
		    }
		    if($("#add_description").val()!=""){
			obj.description = $("#add_description").val();
		    }
		    if($("#add_links").val()!=""){
			obj.links = $("#add_links").val();
		    }
		    if($("#add_sort_num").val()!=""){
			obj.sort_num = $("#add_sort_num").val();
		    }
			if($("#add_recommend").val()=="是")
			   {obj.recommend = 1;}
			else{obj.recommend = 0;}
			return obj;
		},
        ajaxSettings: {//这个是因为我使用了SpringSecurity框架，有csrf跨域提交防御，所需需要设置这个值
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRFToken', '1234');
                }
            }
    }).on('fileuploaded', function(event, data, previewId, index) {console.log(113);
                if($("#add_name").val()==""){
                   $(".add_name_error").html("产品名不能为空!");
                }
                if($("#add_source").val()==""){
                   $(".add_source_error").html("来源不能为空!");
                }
                if($("#add_theme").val()==""){
                   $(".add_theme_error").html("主题不能为空!");
                }
                if($("#add_name").val()!=""&&$("#add_source").val()!=""&&$("#add_theme").val()!=""){
			      productadd();
			      $('input').val("");
			      $(".fileinput-remove-button").click();
	                    layer.closeAll();
						    layer.msg('添加成功', {
						    	icon: 1,
							    time: 800//2s后自动关闭
							  });
						window.location.reload();
                }   
		
    });
    $('#file-zh_edit').fileinput({
        uploadUrl: '/product/product_os_update',
        //language: 'zh',
        allowedFileExtensions : ['jpg', 'png','gif'],
        maxFileCount: 1,
		showCaption: false,
        enctype: 'multipart/form-data',
        uploadExtraData: function(previewId, index) {   //额外参数的关键点
			var obj = {};
			obj.product_name = $("#editphoto_product_name").val();
			return obj;

		},
        ajaxSettings: {//这个是因为我使用了SpringSecurity框架，有csrf跨域提交防御，所需需要设置这个值
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRFToken', '1234');
                }
            }
    }).on('fileuploaded', function(event, data, previewId, index) {console.log(111);
			      	$(".rm_html").html("");
			      	productadd();
			      	$(".fileinput-remove-button").click();
	                    layer.closeAll();
						    layer.msg('修改成功', {
						    	icon: 1,
							    time: 800//2s后自动关闭
							  });
				    window.location.reload();
			     
    });
    $("#file-0").fileinput({
        'allowedFileExtensions' : ['jpg', 'png','gif'],
    });
    $("#file-1").fileinput({
        uploadUrl: '#', // you must set a valid URL here else you will get an error
        allowedFileExtensions : ['jpg', 'png','gif'],
        overwriteInitial: false,
        maxFileSize: 1000,
        maxFilesNum: 1,
        //allowedFileTypes: ['image', 'video', 'flash'],
        slugCallback: function(filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
	});
	$("#file-3").fileinput({
		showUpload: false,
		showCaption: false,
		browseClass: "btn btn-primary btn-lg",
		fileType: "any",
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
	});
	$("#file-4").fileinput({
		uploadExtraData: {kvId: '10'}
	});
    $(".btn-warning").on('click', function() {
        if ($('#file-4').attr('disabled')) {
            $('#file-4').fileinput('enable');
        } else {
            $('#file-4').fileinput('disable');
        }
    });    
    $(".btn-info").on('click', function() {
        $('#file-4').fileinput('refresh', {previewClass:'bg-info'});
    });
   
    $(document).ready(function() {
        $("#test-upload").fileinput({
            'showPreview' : false,
            'allowedFileExtensions' : ['jpg', 'png','gif'],
            'elErrorContainer': '#errorBlock'
        });
    });

  

function gomk(){
	window.location.href="/manage/mankeyword.html";
}

function gobase(){
	window.location.href="/manage/manbase.html";
}