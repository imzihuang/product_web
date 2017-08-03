
function down_base(method){
    var dowen_a = document.createElement('a');
    var down_url = "/product/excel_os?method="+method;
    dowen_a.href = down_url;
    //dowen_a.download = "proposed_file_name";
    dowen_a.click();
}