
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
			}, function() {
				console.log(valArr)
				delData(valArr);
				layer.closeAll();
				layer.msg('删除成功', {
				icon: 1,
				time:600
			});
			$('#delInfo').attr("disabled","disabled");
			$('#delInfo').attr('class','btn btn-default btn-myown');
			}, function() {
			});
		} else {
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
		for(var i=0;i<valArr.length;i++){
			$('#trId_'+valArr[i]).remove();
		}
	}
	
	$('#delInfo1').click(function() {
		var valArr1 = new Array;
		getValArr1(valArr1);
		if(valArr1.length > 0) {
			layer.confirm('您确定删除吗？', {
				btn: ['确定', '取消'] //按钮
			}, function() {
				console.log(valArr1)
				delData1(valArr1);
				layer.closeAll();
				$('#delInfo1').attr("disabled","disabled");
				$('#delInfo1').attr('class','btn btn-default btn-myown');
			}, function() {});
		} else {
			$('#delInfo1').attr("disabled","disabled");
		}
	});
	
	function getValArr1(valArr1) {
		$("#tbodyAll :checkbox").each(function(indexe, elee) {
			if($(elee).prop("checked")) {
				valArr1.push(indexe);
			}
		});
	}
	
	function delData1(valArr1){
		for(var i=0;i<valArr1.length;i++){
			$('#trIdAll_'+valArr1[i]).remove();
		}
	}
	
	//==========
	var layerIndex;
	//添加
	$('#addInfo').click(function(){
		layerIndex=layer.open({
		title:'添加关键字',
		  type: 1,
		  skin: 'layui-layer-demo', //样式类名
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  btn: ['确定', '取消'] ,//按钮
		  content: $('#addInfoContent'),
		   yes: function(){
		  	layer.closeAll();
		    layer.msg('添加成功', {
		    	icon: 1,
			    time: 800//2s后自动关闭
			  });
		  }
		});
	});
	$('.areapen').click(function(){
		layerIndex=layer.open({
		title:'修改关键字',
		  type: 1,
		  skin: 'layui-layer-demo', //样式类名
		  closeBtn: 0, //不显示关闭按钮
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  btn: ['确定', '取消'] ,//按钮
		  content: $('#editAreaContent'),
		   yes: function(){
		  	layer.closeAll();
		    layer.msg('添加成功', {
		    	icon: 1,
			    time: 800//2s后自动关闭
			  });
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

$('#file-zh').fileinput({
    uploadUrl: '/upload/upload',
    language: 'zh',
    allowedFileExtensions : ['jpg', 'png','gif', 'doc'],
    maxFileCount: 1,
    enctype: 'multipart/form-data',
    uploadExtraData: function(previewId, index) {   //额外参数的关键点
                var obj = {};
                obj.bucket = '123456';
                obj.a11123a = 'lzh----------------';
                return obj;
            },
    ajaxSettings: {//这个是因为我使用了SpringSecurity框架，有csrf跨域提交防御，所需需要设置这个值
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', '1234');
            }
        }
});
$('#file-zh-TW').fileinput({
    language: 'zh-TW',
    uploadUrl: '#',
    allowedFileExtensions : ['jpg', 'png','gif'],
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
/*
$(".file").on('fileselect', function(event, n, l) {
    alert('File Selected. Name: ' + l + ', Num: ' + n);
});
*/
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
/*
$('#file-4').on('fileselectnone', function() {
    alert('Huh! You selected no files.');
});
$('#file-4').on('filebrowse', function() {
    alert('File browse clicked for #file-4');
});
*/
$(document).ready(function() {
    $("#test-upload").fileinput({
        'showPreview' : false,
        'allowedFileExtensions' : ['jpg', 'png','gif'],
        'elErrorContainer': '#errorBlock'
    });
    /*
    $("#test-upload").on('fileloaded', function(event, file, previewId, index) {
        alert('i = ' + index + ', id = ' + previewId + ', file = ' + file.name);
    });
    */
});
function get_token() {
    $.ajax({
      url: url,
      data: data,
      success: success,
      dataType: dataType
    });
}

$('#file-zh_add').fileinput({
    uploadUrl: '/upload/upload',
    language: 'zh',
    allowedFileExtensions : ['jpg', 'png','gif', 'doc'],
    maxFileCount: 1,
    enctype: 'multipart/form-data',
    uploadExtraData: function(previewId, index) {   //额外参数的关键点
                var obj = {};
                obj.bucket = '123456';
                obj.a11123a = 'lzh----------------';
                return obj;
            },
    ajaxSettings: {//这个是因为我使用了SpringSecurity框架，有csrf跨域提交防御，所需需要设置这个值
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', '1234');
            }
        }
});
$('#file-zh-TW').fileinput({
    language: 'zh-TW',
    uploadUrl: '#',
    allowedFileExtensions : ['jpg', 'png','gif'],
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
/*
$(".file").on('fileselect', function(event, n, l) {
    alert('File Selected. Name: ' + l + ', Num: ' + n);
});
*/
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
/*
$('#file-4').on('fileselectnone', function() {
    alert('Huh! You selected no files.');
});
$('#file-4').on('filebrowse', function() {
    alert('File browse clicked for #file-4');
});
*/
$(document).ready(function() {
    $("#test-upload").fileinput({
        'showPreview' : false,
        'allowedFileExtensions' : ['jpg', 'png','gif'],
        'elErrorContainer': '#errorBlock'
    });
    /*
    $("#test-upload").on('fileloaded', function(event, file, previewId, index) {
        alert('i = ' + index + ', id = ' + previewId + ', file = ' + file.name);
    });
    */
});
function get_token() {
    $.ajax({
      url: url,
      data: data,
      success: success,
      dataType: dataType
    });
}
